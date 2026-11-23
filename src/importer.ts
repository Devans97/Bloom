import { chapters, subjects } from './curriculum.js';
import { parsePlannerText, plannerIdentity, validPlannerDate, type PlannerCandidate } from './import-parser.js';
import { matchChapterCoverage, generateStudySessionsForTests, SAMPLE_CBSE_PLANNER } from './planner-analyzer.js';
import { esc, type Host } from './host.js';
import type { StudyTest, Task } from './model.js';

const localAsset = (path: string) => new URL('../vendor/'+path,import.meta.url).href;
const MAX_BYTES = 15*1024*1024;
const MAX_PAGES = 15;
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
  if(file.size>MAX_BYTES)throw new Error('Choose a file up to 15 MB. Split a larger PDF into smaller files.');
  if(!file.size)throw new Error('That file is empty. Choose another PDF, document or image.');
  const pdf=file.type==='application/pdf'||/\.pdf$/i.test(file.name);
  const image=/^image\/(png|jpeg|webp)$/.test(file.type)||/\.(png|jpe?g|webp)$/i.test(file.name);
  const isText=/\.(txt|csv|tsv|json|md)$/i.test(file.name)||/^text\//.test(file.type)||file.type==='application/json';
  if(!pdf&&!image&&!isText)throw new Error('Choose a PDF, CSV, TXT, JPG, PNG or WebP document. Convert HEIC images to JPG first.');
  if(isText){
    onProgress('Reading document…');
    return await file.text();
  }
  aborted(signal);
  let worker:OCRWorker|undefined;
  let pdfTask:{promise:Promise<any>;destroy():Promise<void>}|undefined;
  let documentProxy:{destroy():Promise<void>}|undefined;
  const cancel=()=>{void worker?.terminate().catch(()=>{});void pdfTask?.destroy().catch(()=>{});};
  signal?.addEventListener('abort',cancel,{once:true});
  async function recognize(canvas:HTMLCanvasElement):Promise<string>{
    aborted(signal);
    try {
      if(!worker){
        onProgress('Preparing on-device text reader…');
        const api=await getOCR();aborted(signal);
        worker=await api.createWorker('eng',1,{
          workerPath:localAsset('tesseract/worker.min.js'),workerBlobURL:false,
          corePath:localAsset('tesseract-core/'),langPath:localAsset('tessdata/'),
          logger:(event:{status?:string;progress?:number})=>{if(event.status==='recognizing text')onProgress('Reading text on this device… '+Math.round((event.progress??0)*100)+'%');},
        });
      }
      aborted(signal);
      const result=await worker.recognize(canvas);aborted(signal);return result.data.text;
    } catch(err) {
      console.warn('OCR unavailable:', err);
      return '';
    }
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
    if(doc.numPages>MAX_PAGES)throw new Error('This PDF has '+doc.numPages+' pages. Read up to 15 pages at once; split the PDF and import each part.');
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
        const ocrText=await recognize(canvas);canvas.width=canvas.height=0;
        if(ocrText)text=ocrText;
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
  let raw='',rows:PlannerCandidate[]=[],plannedSessions:Task[]=[],abort:AbortController|undefined,closed=false;
  const dialog=host.show('Upload test planner',`<div class="planner-import">
    <div class="import-quick-sample">
      <button type="button" class="button quiet outline sample-planner-btn" data-import-sample>⚡ Load CBSE 2026–27 Sample Test Schedule</button>
    </div>
    <p class="import-intro">Upload your test planner or schedule. BLOOM instantly analyzes it on the backend and automatically prepares tailored study sessions leading up to your exams.</p>
    <label class="import-file" id="planner-dropzone">
      <span>📄 Drop test planner PDF, CSV or photo here, or <u>click to browse</u></span>
      <input id="planner-upload" type="file" accept="application/pdf,image/png,image/jpeg,image/webp,text/plain,text/csv,text/tab-separated-values,application/json,.pdf,.png,.jpg,.jpeg,.webp,.txt,.csv,.tsv,.json,.md">
    </label>
    <small class="muted">PDF, CSV, TXT, JPG, PNG or WebP · Instant backend analysis with zero delay. Your records remain private on this device.</small>
    
    <div class="import-progress" role="status" aria-live="polite" hidden>
      <span class="import-spinner" aria-hidden="true"></span>
      <p>Analyzing test planner…</p>
      <button type="button" class="button outline" data-import-cancel>Cancel reading</button>
    </div>
    
    <p class="form-error" id="import-error" role="alert"></p>
    
    <details class="import-text">
      <summary>Paste or view analyzed planner text</summary>
      <label>Planner text<textarea id="planner-text" rows="7" placeholder="Paste test dates, subjects and chapters from your planner"></textarea></label>
      <button type="button" class="button outline" data-import-read>Re-analyze text</button>
    </details>
    
    <section class="import-review" hidden>
      <div class="section-head">
        <div>
          <p class="eyebrow">EXAM SCHEDULE</p>
          <h3>Check the tests</h3>
        </div>
        <button type="button" class="button quiet" data-import-add>+ Add a row</button>
      </div>
      <p class="muted">Review test dates and covered chapters. Uncheck any row you do not wish to include.</p>
      <div id="import-rows"></div>
      
      <div id="import-sessions-mount"></div>
      
      <div class="dialog-actions">
        <button type="button" class="button primary" data-import-confirm-sessions>🌟 Add Tests & Schedule Study Sessions</button>
        <button type="button" class="button outline" data-import-confirm>Add Tests Only</button>
      </div>
    </section>
  </div>`);

  const root=dialog.querySelector<HTMLElement>('.planner-import')!;
  const upload=root.querySelector<HTMLInputElement>('#planner-upload')!,textInput=root.querySelector<HTMLTextAreaElement>('#planner-text')!;
  const error=root.querySelector<HTMLElement>('#import-error')!,progress=root.querySelector<HTMLElement>('.import-progress')!,review=root.querySelector<HTMLElement>('.import-review')!;
  
  dialog.addEventListener('close',()=>{closed=true;abort?.abort();},{once:true});
  const busy=(reading:boolean,message='Analyzing test planner…')=>{
    upload.disabled=reading;
    progress.hidden=!reading;
    if(reading)progress.querySelector('p')!.textContent=message;
    root.querySelector<HTMLButtonElement>('[data-import-read]')!.disabled=reading;
  };

  function renderRows(){
    review.hidden=false;
    root.querySelector('#import-rows')!.innerHTML=rows.map((row,i)=>`<article class="import-row" data-import-row="${esc(row.id)}">
      <div class="import-row-head">
        <label class="checkline"><input type="checkbox" name="selected"${row.selected?' checked':''}><strong>Include test ${i+1}</strong></label>
        <button type="button" class="button quiet" data-import-remove aria-label="Remove test ${i+1}">Remove</button>
      </div>
      <label>Test name<input name="title" maxlength="100" required value="${esc(row.title)}"></label>
      <div class="form-pair">
        <label>Date<input name="day" type="date" value="${esc(row.day)}" required></label>
        <label>Subject<select name="subject">${subjectOptions(row.subject)}</select></label>
      </div>
      ${row.warnings.length?`<p class="import-warning">${esc(row.warnings.join(' '))}</p>`:''}
      <details ${row.coverage.length?'open':''}>
        <summary>Chapter coverage (${row.coverage.length ? `${row.coverage.length} chapters matched` : 'optional'})</summary>
        <div class="coverage">
          ${chapters.filter(c=>c.subject===row.subject).map(c=>`<label class="checkline"><input name="coverage" type="checkbox" value="${c.id}"${row.coverage.includes(c.id)?' checked':''}>${esc(c.title)}</label>`).join('')||'<p class="muted">Choose a subject to set coverage.</p>'}
        </div>
      </details>
      ${row.source?`<details class="import-source"><summary>Original source row</summary><p>${esc(row.source)}</p></details>`:''}
    </article>`).join('')||'<p class="import-empty">No clear dates and subjects were found. Correct the text above, or add a row with the information you can verify.</p>';

    // Render planned study sessions
    const sessionsMount=root.querySelector<HTMLElement>('#import-sessions-mount');
    if(sessionsMount){
      if(plannedSessions.length>0){
        sessionsMount.innerHTML=`
          <section class="import-sessions-card">
            <div class="section-head">
              <div>
                <p class="eyebrow">TAILORED EXAM PREPARATION</p>
                <h3>📅 ${plannedSessions.length} Study Sessions Generated</h3>
              </div>
              <span class="sessions-ready-badge">⚡ Auto-Scheduled</span>
            </div>
            <p class="muted">High-yield revision, board numericals, and formula sprints mapped directly to the days before each test.</p>
            <div class="planned-sessions-list">
              ${plannedSessions.map(s => {
                const subjObj = subjects.find(sub => sub.id === s.subject);
                return `<article class="planned-session-item">
                  <div class="session-item-header">
                    <span class="session-subj-pill badge-${s.subject}">${esc(subjObj?.title || s.subject)}</span>
                    <span class="session-datetime">📅 ${esc(s.day)} · ⏰ ${esc(s.time)} · ⏱ ${s.minutes} min</span>
                  </div>
                  <strong class="session-title">${esc(s.title)}</strong>
                  <small class="session-reason">${esc(s.reason || '')}</small>
                </article>`;
              }).join('')}
            </div>
          </section>
        `;
      } else {
        sessionsMount.innerHTML='';
      }
    }

    const confirmBtn=root.querySelector<HTMLButtonElement>('[data-import-confirm-sessions]');
    if(confirmBtn){
      confirmBtn.textContent=plannedSessions.length
        ? `🌟 Add Tests & Schedule Study Sessions (${plannedSessions.length})`
        : '🌟 Add Tests & Schedule Study Sessions';
    }
  }

  function readText(){
    error.textContent='';raw=textInput.value;
    if(!raw.trim()){error.textContent='Choose a file or paste planner text first.';return;}
    rows=parsePlannerText(raw);
    for (const row of rows) {
      if (row.subject && (!row.coverage || !row.coverage.length)) {
        row.coverage = matchChapterCoverage(row.source || row.title, row.subject);
      }
    }
    plannedSessions = generateStudySessionsForTests(rows, host.getState());
    renderRows();
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
    abort?.abort();abort=new AbortController();error.textContent='';
    busy(true, 'Uploading planner for instant backend analysis…');
    const currentAbort=abort;

    try{
      let backendSuccess=false;
      // 1. Attempt high-speed backend analysis
      try {
        const formData=new FormData();
        formData.append('file', file);
        const res=await fetch('/api/analyze-planner', {
          method: 'POST',
          body: formData,
          signal: currentAbort.signal
        });
        if(res.ok){
          const json=await res.json();
          if(json.success && Array.isArray(json.candidates)){
            raw=json.text||'';
            textInput.value=raw;
            rows=json.candidates;
            plannedSessions=json.plannedSessions||[];
            root.querySelector<HTMLDetailsElement>('.import-text')!.open=true;
            renderRows();
            backendSuccess=true;
          }
        }
      } catch(backendErr) {
        // Backend unavailable; proceed to local on-device extraction
      }

      // 2. Client-side fallback if backend was unavailable
      if(!backendSuccess){
        const text=await extractDocument(file,message=>{
          if(!closed&&abort===currentAbort)progress.querySelector('p')!.textContent=message;
        },currentAbort.signal);
        if(closed||abort!==currentAbort)return;
        textInput.value=text;
        root.querySelector<HTMLDetailsElement>('.import-text')!.open=true;
        readText();
      }
    }catch(e){
      if(!closed&&abort===currentAbort)error.textContent=e instanceof Error?e.message:'Could not read that file. Try another file or paste its text.';
    }finally{
      if(!closed&&abort===currentAbort){busy(false);upload.value='';}
    }
  });

  root.addEventListener('change',e=>{
    const el=e.target as HTMLInputElement;if(el.name!=='subject')return;
    syncRows();
    const row=rows.find(x=>x.id===rowKey(el));
    if(row){
      row.coverage=matchChapterCoverage(row.source||row.title, row.subject);
      plannedSessions=generateStudySessionsForTests(rows, host.getState());
    }
    renderRows();
  });

  root.addEventListener('click',async e=>{
    const el=(e.target as Element).closest<HTMLElement>('button');if(!el)return;
    if(el.hasAttribute('data-import-cancel')){abort?.abort();abort=undefined;busy(false);upload.value='';error.textContent='Reading cancelled. Nothing was added.';return;}
    if(el.hasAttribute('data-import-read')){readText();return;}
    if(el.hasAttribute('data-import-sample')){
      error.textContent='';
      raw=SAMPLE_CBSE_PLANNER;
      textInput.value=raw;
      root.querySelector<HTMLDetailsElement>('.import-text')!.open=true;
      readText();
      return;
    }
    if(el.hasAttribute('data-import-add')){
      syncRows();
      rows.push({id:crypto.randomUUID(),title:'',day:'',subject:'',coverage:[],source:'',warnings:[],selected:true});
      renderRows();
      return;
    }
    if(el.hasAttribute('data-import-remove')){
      syncRows();
      rows=rows.filter(x=>x.id!==rowKey(el));
      plannedSessions=generateStudySessionsForTests(rows, host.getState());
      renderRows();
      return;
    }

    // Add Tests & Schedule Study Sessions
    if(el.hasAttribute('data-import-confirm-sessions')){
      syncRows();
      error.textContent='';
      const selected=rows.filter(x=>x.selected);
      if(!selected.length){error.textContent='Select at least one test to add.';return;}
      const invalid=selected.find(x=>!x.title||!validPlannerDate(x.day)||!subjects.some(s=>s.id===x.subject));
      if(invalid){error.textContent='Each selected test needs a name, valid date and subject. Uncheck a row you cannot confirm yet.';return;}

      const next=structuredClone(host.getState());
      const known=new Set(next.tests.map(plannerIdentity));
      let count=0,duplicates=0;
      for(const row of selected){
        const key=plannerIdentity(row);
        if(known.has(key)){duplicates++;continue;}
        const test:StudyTest={
          id:crypto.randomUUID(),
          title:row.title,
          day:row.day,
          subject:row.subject,
          coverage:row.coverage.filter(id=>chapters.some(c=>c.id===id&&c.subject===row.subject))
        };
        next.tests.push(test);
        known.add(key);
        count++;
      }

      // Schedule planned sessions
      const existingTaskKeys=new Set(next.tasks.map(t=>`${t.day}|${t.subject}|${t.title.toLowerCase().trim()}`));
      let sessionsAdded=0;
      for(const session of plannedSessions){
        const key=`${session.day}|${session.subject}|${session.title.toLowerCase().trim()}`;
        if(!existingTaskKeys.has(key)){
          next.tasks.push(session);
          existingTaskKeys.add(key);
          sessionsAdded++;
        }
      }

      if(!count&&!sessionsAdded){
        error.textContent='These tests and study sessions already exist. No duplicate records were added.';
        return;
      }

      el.setAttribute('disabled','');
      const msg=`${count} ${count===1?'test':'tests'} added & ${sessionsAdded} study sessions scheduled!`;
      if(await host.commit(next,msg)){
        if(dialog.open)await host.closeDialog(dialog);
        host.navigate('planner');
      } else {
        el.removeAttribute('disabled');
      }
      return;
    }

    // Add Tests Only
    if(el.hasAttribute('data-import-confirm')){
      syncRows();
      error.textContent='';
      const selected=rows.filter(x=>x.selected);
      if(!selected.length){error.textContent='Select at least one test to add.';return;}
      const invalid=selected.find(x=>!x.title||!validPlannerDate(x.day)||!subjects.some(s=>s.id===x.subject));
      if(invalid){error.textContent='Each selected test needs a name, valid date and subject. Uncheck a row you cannot confirm yet.';return;}
      const next=structuredClone(host.getState());
      const known=new Set(next.tests.map(plannerIdentity));
      let count=0,duplicates=0;
      for(const row of selected){
        const key=plannerIdentity(row);
        if(known.has(key)){duplicates++;continue;}
        const test:StudyTest={
          id:crypto.randomUUID(),
          title:row.title,
          day:row.day,
          subject:row.subject,
          coverage:row.coverage.filter(id=>chapters.some(c=>c.id===id&&c.subject===row.subject))
        };
        next.tests.push(test);
        known.add(key);
        count++;
      }
      if(!count){error.textContent='These tests already exist. No duplicate tests were added.';return;}
      el.setAttribute('disabled','');
      if(await host.commit(next,`${count} ${count===1?'test':'tests'} added.${duplicates?' '+duplicates+' duplicate '+(duplicates===1?'row':'rows')+' skipped.':''}`)){
        if(dialog.open)await host.closeDialog(dialog);
        host.navigate('tests');
      } else {
        el.removeAttribute('disabled');
      }
      return;
    }
  });
}
