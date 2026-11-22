import { chapters, subjects } from './curriculum.js';
import { parsePlannerText, plannerIdentity, validPlannerDate, type PlannerCandidate } from './import-parser.js';
import { esc, type Host } from './host.js';
import type { StudyTest } from './model.js';

const localAsset = (path: string) => new URL('../vendor/'+path,import.meta.url).href;
const MAX_BYTES = 12*1024*1024;
const MAX_PAGES = 12;
type OCRWorker = { recognize(image: HTMLCanvasElement): Promise<{data:{text:string}}>; terminate(): Promise<unknown> };
type TesseractAPI = { createWorker(language:string,oem:number,options:Record<string,unknown>): Promise<OCRWorker> };
let ocrScript: Promise<TesseractAPI> | undefined;
const aborted = (signal?:AbortSignal) => { if(signal?.aborted) throw new DOMException('Reading cancelled.','AbortError'); };

function getOCR(): Promise<TesseractAPI> {
  return ocrScript ??= new Promise((resolve,reject)=>{
    const existing=(globalThis as typeof globalThis & {Tesseract?:TesseractAPI}).Tesseract;
    if(existing){resolve(existing);return;}
    const script=document.createElement('script');script.src=localAsset('tesseract/tesseract.min.js');script.async=true;
    script.onload=()=>{
      const api=(globalThis as typeof globalThis & {Tesseract?:TesseractAPI}).Tesseract;
      if(api)resolve(api);else {ocrScript=undefined;reject(new Error('The local text reader could not start. Use the text editor below.'));}
    };
    script.onerror=()=>{ocrScript=undefined;reject(new Error('The local text reader is unavailable. Reopen BLOOM online once to cache it, or paste the planner text.'));};
    document.head.append(script);
  });
}

/** PDF text and OCR run locally; the source file is held in memory and never saved. */
export async function extractDocument(file:File,onProgress:(message:string)=>void=()=>{},signal?:AbortSignal):Promise<string>{
  if(file.size>MAX_BYTES)throw new Error('Choose a file up to 12 MB. Split a larger PDF into smaller files.');
  if(!file.size)throw new Error('That file is empty. Choose another PDF or image.');
  const pdf=file.type==='application/pdf'||/\.pdf$/i.test(file.name);
  const image=/^image\/(png|jpeg|webp)$/.test(file.type)||/\.(png|jpe?g|webp)$/i.test(file.name);
  if(!pdf&&!image)throw new Error('Choose a PDF, JPG, PNG or WebP. Convert HEIC images to JPG first.');
  aborted(signal);
  let worker:OCRWorker|undefined;
  let pdfTask:{promise:Promise<any>;destroy():Promise<void>}|undefined;
  let documentProxy:{destroy():Promise<void>}|undefined;
  const cancel=()=>{void worker?.terminate().catch(()=>{});void pdfTask?.destroy().catch(()=>{});};
  signal?.addEventListener('abort',cancel,{once:true});
  async function recognize(canvas:HTMLCanvasElement):Promise<string>{
    aborted(signal);
    if(!worker){
      onProgress('Preparing the on-device text reader…');
      const api=await getOCR();aborted(signal);
      worker=await api.createWorker('eng',1,{
        workerPath:localAsset('tesseract/worker.min.js'),workerBlobURL:false,
        corePath:localAsset('tesseract-core/'),langPath:localAsset('tessdata/'),
        logger:(event:{status?:string;progress?:number})=>{if(event.status==='recognizing text')onProgress('Reading text on this device… '+Math.round((event.progress??0)*100)+'%');},
      });
    }
    aborted(signal);
    const result=await worker.recognize(canvas);aborted(signal);return result.data.text;
  }
  try{
    if(image){
      onProgress('Opening image…');
      const url=URL.createObjectURL(file);
      try{
        const img=new Image();img.src=url;await img.decode();aborted(signal);
        if(img.naturalWidth*img.naturalHeight>40_000_000)throw new Error('This image is too large to read smoothly. Choose a smaller image or crop the planner.');
        const scale=Math.min(1,2200/Math.max(img.naturalWidth,img.naturalHeight));
        const canvas=document.createElement('canvas');canvas.width=Math.round(img.naturalWidth*scale);canvas.height=Math.round(img.naturalHeight*scale);
        const ctx=canvas.getContext('2d');if(!ctx)throw new Error('This browser could not open the image. Paste the text instead.');
        ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
        const text=await recognize(canvas);canvas.width=canvas.height=0;return text;
      }finally{URL.revokeObjectURL(url);}
    }
    onProgress('Opening PDF…');
    const pdfjs=await (new Function('url','return import(url)') as (url:string)=>Promise<any>)(localAsset('pdfjs/pdf.mjs'));
    aborted(signal);pdfjs.GlobalWorkerOptions.workerSrc=localAsset('pdfjs/pdf.worker.mjs');
    pdfTask=pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false,enableXfa:false,
      standardFontDataUrl:localAsset('pdfjs/standard_fonts/'),cMapUrl:localAsset('pdfjs/cmaps/'),cMapPacked:true});
    const doc=await pdfTask!.promise;documentProxy=doc;
    if(doc.numPages>MAX_PAGES)throw new Error('This PDF has '+doc.numPages+' pages. Read up to 12 pages at once; split the PDF and import each part.');
    const pages:string[]=[];
    for(let n=1;n<=doc.numPages;n++){
      aborted(signal);onProgress('Reading PDF page '+n+' of '+doc.numPages+'…');
      const page=await doc.getPage(n),content=await page.getTextContent();
      const rows=new Map<number,{x:number;text:string}[]>();
      for(const item of content.items){
        if(!('str' in item)||!item.str.trim())continue;
        const y=Math.round(item.transform[5]/3)*3;
        if(!rows.has(y))rows.set(y,[]);
        rows.get(y)!.push({x:item.transform[4],text:item.str});
      }
      let text=[...rows.entries()].sort((a,b)=>b[0]-a[0]).map(([,items])=>items.sort((a,b)=>a.x-b.x).map(x=>x.text).join(' ')).join('\n');
      if(text.replace(/\s/g,'').length<20){
        onProgress('Page '+n+' is a scan. Reading its image on this device…');
        const natural=page.getViewport({scale:1}),scale=Math.min(2,2000/Math.max(natural.width,natural.height)),viewport=page.getViewport({scale});
        const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
        const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Could not open the scanned page. Upload a clear JPG instead.');
        await page.render({canvasContext:ctx,canvas,viewport,background:'#ffffff'}).promise;
        text=await recognize(canvas);canvas.width=canvas.height=0;
      }
      pages.push(text);page.cleanup();
      await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
    }
    return pages.join('\n\n');
  }catch(error){
    if(signal?.aborted)throw new DOMException('Reading cancelled.','AbortError');
    if(error instanceof Error&&/password/i.test(error.message))throw new Error('This PDF is locked. Choose an unlocked copy or paste the planner text.');
    throw error;
  }finally{
    signal?.removeEventListener('abort',cancel);
    await worker?.terminate().catch(()=>{});await documentProxy?.destroy().catch(()=>{});
  }
}

const subjectOptions = (value:string) => '<option value="">Choose subject</option>'+subjects.map(s=>`<option value="${s.id}"${s.id===value?' selected':''}>${esc(s.title)}</option>`).join('');
const rowKey = (el:HTMLElement)=>el.closest<HTMLElement>('[data-import-row]')?.dataset.importRow??'';

export function openPlannerImport(host:Host):void{
  let raw='',rows:PlannerCandidate[]=[],abort:AbortController|undefined,closed=false;
  const dialog=host.show('Upload test planner',`<div class="planner-import"><p class="import-intro">Choose your monthly planner. BLOOM reads it on this device; you review every date and subject before adding anything.</p><label class="import-file">Choose PDF or photo<input id="planner-upload" type="file" accept="application/pdf,image/png,image/jpeg,image/webp,.pdf,.png,.jpg,.jpeg,.webp"></label><small class="muted">PDF, JPG, PNG or WebP · up to 12 MB · PDFs up to 12 pages. The original file is not stored or sent anywhere.</small><div class="import-progress" role="status" aria-live="polite" hidden><span class="import-spinner" aria-hidden="true"></span><p></p><button type="button" class="button outline" data-import-cancel>Cancel reading</button></div><p class="form-error" id="import-error" role="alert"></p><details class="import-text"><summary>Paste or correct planner text</summary><label>Planner text<textarea id="planner-text" rows="8" placeholder="Paste the dates and subjects from your planner"></textarea></label><button type="button" class="button outline" data-import-read>Find tests in text</button></details><section class="import-review" hidden><div class="section-head"><h3>Check the tests</h3><button type="button" class="button quiet" data-import-add>Add a row</button></div><p class="muted">Correct any reading errors, then choose which tests to add. Leave coverage blank if it is not supplied.</p><div id="import-rows"></div><div class="dialog-actions"><button type="button" class="button primary" data-import-confirm>Add selected tests</button></div></section></div>`);
  const root=dialog.querySelector<HTMLElement>('.planner-import')!;
  const upload=root.querySelector<HTMLInputElement>('#planner-upload')!,textInput=root.querySelector<HTMLTextAreaElement>('#planner-text')!;
  const error=root.querySelector<HTMLElement>('#import-error')!,progress=root.querySelector<HTMLElement>('.import-progress')!,review=root.querySelector<HTMLElement>('.import-review')!;
  dialog.addEventListener('close',()=>{closed=true;abort?.abort();},{once:true});
  const busy=(reading:boolean)=>{upload.disabled=reading;progress.hidden=!reading;root.querySelector<HTMLButtonElement>('[data-import-read]')!.disabled=reading;};
  function renderRows(){
    review.hidden=false;
    root.querySelector('#import-rows')!.innerHTML=rows.map((row,i)=>`<article class="import-row" data-import-row="${esc(row.id)}"><div class="import-row-head"><label class="checkline"><input type="checkbox" name="selected"${row.selected?' checked':''}>Include test ${i+1}</label><button type="button" class="button quiet" data-import-remove aria-label="Remove test ${i+1}">Remove</button></div><label>Test name<input name="title" maxlength="100" required value="${esc(row.title)}"></label><div class="form-pair"><label>Date<input name="day" type="date" value="${esc(row.day)}" required></label><label>Subject<select name="subject">${subjectOptions(row.subject)}</select></label></div>${row.warnings.length?`<p class="import-warning">${esc(row.warnings.join(' '))}</p>`:''}<details><summary>Chapter coverage (optional)</summary><div class="coverage">${chapters.filter(c=>c.subject===row.subject).map(c=>`<label class="checkline"><input name="coverage" type="checkbox" value="${c.id}"${row.coverage.includes(c.id)?' checked':''}>${esc(c.title)}</label>`).join('')||'<p class="muted">Choose a subject to set coverage.</p>'}</div></details>${row.source?`<details class="import-source"><summary>Original source row</summary><p>${esc(row.source)}</p></details>`:''}</article>`).join('')||'<p class="import-empty">No clear dates and subjects were found. Correct the text above, or add a row with the information you can verify.</p>';
  }
  function readText(){
    error.textContent='';raw=textInput.value;
    if(!raw.trim()){error.textContent='Choose a file or paste planner text first.';return;}
    rows=parsePlannerText(raw);renderRows();
    root.querySelector('#import-rows')?.scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function syncRows(){
    for(const el of root.querySelectorAll<HTMLElement>('[data-import-row]')){
      const row=rows.find(x=>x.id===el.dataset.importRow);if(!row)continue;
      row.title=el.querySelector<HTMLInputElement>('[name="title"]')!.value.trim();row.day=el.querySelector<HTMLInputElement>('[name="day"]')!.value;
      row.subject=el.querySelector<HTMLSelectElement>('[name="subject"]')!.value;row.selected=el.querySelector<HTMLInputElement>('[name="selected"]')!.checked;
      row.coverage=[...el.querySelectorAll<HTMLInputElement>('[name="coverage"]:checked')].map(x=>x.value);
    }
  }
  upload.addEventListener('change',async()=>{
    const file=upload.files?.[0];if(!file)return;
    abort?.abort();abort=new AbortController();error.textContent='';busy(true);
    const currentAbort=abort;
    try{
      const text=await extractDocument(file,message=>{if(!closed&&abort===currentAbort)progress.querySelector('p')!.textContent=message;},currentAbort.signal);
      if(closed||abort!==currentAbort)return;textInput.value=text;root.querySelector<HTMLDetailsElement>('.import-text')!.open=true;readText();
    }catch(e){if(!closed&&abort===currentAbort)error.textContent=e instanceof Error?e.message:'Could not read that file. Try another file or paste its text.';}
    finally{if(!closed&&abort===currentAbort){busy(false);upload.value='';}}
  });
  root.addEventListener('change',e=>{
    const el=e.target as HTMLInputElement;if(el.name!=='subject')return;
    syncRows();const row=rows.find(x=>x.id===rowKey(el));if(row)row.coverage=[];renderRows();
  });
  root.addEventListener('click',async e=>{
    const el=(e.target as Element).closest<HTMLElement>('button');if(!el)return;
    if(el.hasAttribute('data-import-cancel')){abort?.abort();abort=undefined;busy(false);upload.value='';error.textContent='Reading cancelled. Nothing was added.';return;}
    if(el.hasAttribute('data-import-read')){readText();return;}
    if(el.hasAttribute('data-import-add')){syncRows();rows.push({id:crypto.randomUUID(),title:'',day:'',subject:'',coverage:[],source:'',warnings:[],selected:true});renderRows();return;}
    if(el.hasAttribute('data-import-remove')){syncRows();rows=rows.filter(x=>x.id!==rowKey(el));renderRows();return;}
    if(!el.hasAttribute('data-import-confirm'))return;
    syncRows();error.textContent='';
    const selected=rows.filter(x=>x.selected);
    if(!selected.length){error.textContent='Select at least one test to add.';return;}
    const invalid=selected.find(x=>!x.title||!validPlannerDate(x.day)||!subjects.some(s=>s.id===x.subject));
    if(invalid){error.textContent='Each selected test needs a name, valid date and subject. Uncheck a row you cannot confirm yet.';return;}
    const next=structuredClone(host.getState());
    const known=new Set(next.tests.map(plannerIdentity));let count=0,duplicates=0;
    for(const row of selected){
      const key=plannerIdentity(row);if(known.has(key)){duplicates++;continue;}
      const test:StudyTest={id:crypto.randomUUID(),title:row.title,day:row.day,subject:row.subject,coverage:row.coverage.filter(id=>chapters.some(c=>c.id===id&&c.subject===row.subject))};
      next.tests.push(test);known.add(key);count++;
    }
    if(!count){error.textContent='These tests already exist. No duplicate tests were added.';return;}
    el.setAttribute('disabled','');
    if(await host.commit(next,`${count} ${count===1?'test':'tests'} added.${duplicates?' '+duplicates+' duplicate '+(duplicates===1?'row':'rows')+' skipped.':''}`)){if(dialog.open)await host.closeDialog(dialog);host.navigate('tests');}
    else el.removeAttribute('disabled');
  });
}
