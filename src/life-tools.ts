import { subjects, subjectById, chapterById } from './curriculum.js';
import { today, gap, labelDay, type State } from './model.js';
import { icon } from './icons.js';
import { type Host, esc } from './host.js';
import { lifeDefaults, gardenStats, quietNow, type LifeData, type PaperAttempt, type PracticalItem, type WritingPractice, type FutureLetter } from './life-data.js';

// These URLs are the five subject pairs recorded in docs/cbse-source-register.md.
const paperNames:Record<string,string>={physics:'Physics',chemistry:'Chemistry',english:'EnglishCore',math:'Maths',pe:'PhysicalEducation'};
const officialBase='https://cbseacademic.nic.in/web_material/SQP/ClassXII_2026_27/';
const sourceIndex='https://cbseacademic.nic.in/SQP_CLASSXii_2026-27.html';
const previousIndex='https://www.cbse.gov.in/cbsenew/question-paper.html';
const markingIndex='https://www.cbse.gov.in/cbsenew/marking-scheme.html';
const practiceChecks=[['question','I answered the question that was asked.'],['method','I checked my method, key terms or supporting evidence.'],['presentation','I checked units, working and presentation where relevant.'],['scheme','I compared my answer with the official marking scheme.']] as const;
const kinds=['Practical','Viva','Project','File','Other'] as const;
let registered=false;
const data=(state:State):LifeData=>({...lifeDefaults(),...state.life,reminders:{...lifeDefaults().reminders,...state.life?.reminders}});
const dateText=(day:string)=>day?labelDay(day,true):'No date';
const subjectOptions=(selected='')=>subjects.map(subject=>`<option value="${subject.id}"${subject.id===selected?' selected':''}>${esc(subject.title)}</option>`).join('');
const button=(action:string,label:string,key='',className='outline',glyph='')=>`<button type="button" class="button ${className}" data-life-action="${action}" data-value="${esc(key)}">${glyph?icon(glyph):''}<span>${esc(label)}</span></button>`;
const link=(url:string,label:string)=>`<a href="${esc(url)}" class="button outline" target="_blank" rel="noreferrer">${esc(label)} ${icon('arrow-up-right')}</a>`;
const heading=(eyebrow:string,title:string,copy:string,action='')=>`<div class="section-head intro"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="life-intro">${esc(copy)}</p></div>${action}</div>`;
const empty=(glyph:string,title:string,copy:string,action='')=>`<div class="life-empty">${icon(glyph)}<h3>${esc(title)}</h3><p>${esc(copy)}</p>${action}</div>`;
const submit=(label:string,extra='')=>`<p class="form-error" data-life-error role="alert"></p><div class="dialog-actions">${extra}<button type="submit" class="button primary">${esc(label)} ${icon('check')}</button></div>`;
const formValue=(form:FormData,name:string)=>String(form.get(name)??'').trim();
const validDay=(value:string)=>/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value+'T00:00:00Z'))&&new Date(value+'T00:00:00Z').toISOString().slice(0,10)===value;
const err=(dialog:HTMLDialogElement,message:string)=>{const el=dialog.querySelector('[data-life-error]');if(el)el.textContent=message;};
const clone=(host:Host)=>{const next=structuredClone(host.getState());next.life=data(next);return next;};
const scheme=(subject:string)=>officialBase+paperNames[subject]+'-MS.pdf';

function flower(index:number,stage:number){
  const petals=Array.from({length:5},(_,petal)=>`<ellipse cx="30" cy="19" rx="5.6" ry="11" transform="rotate(${petal*72} 30 28)" class="garden-petal"/>`).join('');
  return `<svg class="garden-flower growth-${stage}" style="--plant-delay:${Math.min(index*40,360)}ms" viewBox="0 0 60 110" role="img" aria-label="${stage===5?'Earned bloom':'Growing plant'}"><path d="M30 102Q34 64 30 30" class="garden-stem"/><path d="M31 81Q9 76 12 61Q30 62 32 78M32 66Q51 63 50 47Q34 49 31 65" class="garden-leaf"/><g class="garden-head">${petals}<circle cx="30" cy="28" r="5"/></g></svg>`;
}
function gardenPage(host:Host){
  const state=host.getState(), life=data(state), stats=gardenStats(state);
  const earned=[stats.completed>=1?['First step','A study task completed.']:null,stats.reviews>=1?['A fresh look','Your first recorded revision.']:null,stats.focusMinutes>=25?['A little focus','25 actual focused minutes.']:null,stats.completed>=10?['Steady growth','10 study tasks completed.']:null].filter((item):item is string[]=>Boolean(item));
  const plants=Array.from({length:Math.min(12,stats.flowers)},(_,index)=>flower(index,5)).join('')+(stats.leaves?flower(Math.min(12,stats.flowers),stats.leaves):'');
  return `<div class="page life-page">${heading('GROW AT YOUR OWN PACE','Bloom Garden','A little record of the effort you actually put in.')}
  <section class="garden-scene ${stats.growth?'has-growth':''}" aria-label="Your earned garden"><div class="garden-sun" aria-hidden="true"></div>${stats.growth?`<div class="garden-plants">${plants}</div><p class="garden-caption">${stats.flowers} ${stats.flowers===1?'bloom':'blooms'} · ${stats.leaves} ${stats.leaves===1?'leaf':'leaves'} toward the next</p>`:`<div class="garden-start"><span aria-hidden="true">${icon('sprout')}</span><h2>Room to grow.</h2><p>Your first recorded study activity plants the beginning. There is no streak to protect.</p>${button('go-focus','Start a focus session','','primary','arrow-right')}</div>`}</section>
  <div class="life-stat-row"><div><strong>${stats.completed}</strong><span>tasks completed</span></div><div><strong>${stats.reviews}</strong><span>reviews recorded</span></div><div><strong>${stats.focusMinutes}</strong><span>focused minutes</span></div></div>
  <p class="life-note">One leaf for each completed task or recorded review, plus one for each 25 focused minutes. Five leaves make a bloom. These are activity markers, not a measure of mastery. Missed days never take anything away.</p>
  <section class="life-section"><div class="section-head"><div><h2>Small milestones</h2><p>Show the milestones you have earned, if you find them helpful.</p></div><label class="switch"><span class="sr">Show achievements</span><input type="checkbox" data-life-preference="achievements"${life.achievements?' checked':''}><span></span></label></div>${life.achievements?(earned.length?`<div class="milestone-list">${earned.map(([title,copy])=>`<article>${icon('flower-2')}<div><h3>${esc(title)}</h3><p>${esc(copy)}</p></div></article>`).join('')}</div>`:`<p class="life-note">Your milestones will appear as you record study activity.</p>`):'<p class="life-note">Achievements are off. Your garden still grows quietly.</p>'}</section></div>`;
}
function resourcesPage(host:Host){
  const state=host.getState(),life=data(state);
  return `<div class="page life-page">${heading('OFFICIAL MATERIAL · YOUR PRACTICE','Resources','CBSE papers, marking schemes and your own practical checklist.')}
  <section><div class="section-head"><div><h2>2026–27 sample papers</h2><p><a href="${sourceIndex}" target="_blank" rel="noreferrer">Official CBSE source</a> · Class XII</p></div></div><div class="resource-grid">${subjects.map(subject=>{
    const count=life.papers.filter(item=>item.resource==='sqp-'+subject.id).length;
    return `<article class="resource-item"><span class="subject">${esc(subject.title)}</span><h3>Official sample paper</h3><p>${count?`${count} ${count===1?'attempt':'attempts'} recorded`:'No practice attempt recorded'}</p><div class="life-actions">${link(officialBase+paperNames[subject.id]+'-SQP.pdf','Paper')}${link(scheme(subject.id),'Marking scheme')}${button('paper-add','Record attempt','sqp-'+subject.id,'quiet','check')}</div></article>`;
  }).join('')}</div></section>
  <section class="life-section"><div class="section-head"><div><h2>Previous papers</h2><p>Select the correct subject, year and set on CBSE’s website.</p></div></div><div class="life-actions">${link(previousIndex,'CBSE question papers')}${link(markingIndex,'CBSE marking schemes')}${button('paper-custom','Record a paper','','quiet','plus')}</div></section>
  <section class="life-section"><div class="section-head"><h2>Your paper practice</h2></div>${life.papers.length?`<div class="rows">${[...life.papers].sort((a,b)=>b.day.localeCompare(a.day)).map(item=>`<article class="life-row"><div><strong>${esc(item.title)}</strong><small>${esc(subjectById(item.subject)?.title)} · ${esc(dateText(item.day))}</small>${item.note?`<p>${esc(item.note)}</p>`:''}</div>${button('paper-edit','Edit',item.id,'quiet')}${button('paper-delete','Remove',item.id,'quiet')}</article>`).join('')}</div>`:empty('book-open','Your practice starts here.','Open an official paper, then record only the attempts you actually make.')}</section>
  <section class="life-section"><div class="section-head"><div><h2>Practicals, projects & viva</h2><p>Use the official syllabus and your school’s instructions to add your checklist.</p></div>${button('practical-add','Add item','','primary','plus')}</div><div class="life-actions">${subjects.map(subject=>link(subject.source,subject.title+' syllabus')).join('')}</div><p class="life-note">Your personal practical dates come from school. This checklist starts empty; BLOOM does not invent experiment lists or deadlines.</p>${life.practicals.length?`<div class="rows">${life.practicals.map(item=>`<article class="life-row ${item.done?'life-done':''}"><label class="life-check"><input type="checkbox" data-life-practical="${esc(item.id)}"${item.done?' checked':''}><span><strong>${esc(item.title)}</strong><small>${esc(subjectById(item.subject)?.title)} · ${esc(item.kind)}${item.due?' · '+esc(dateText(item.due)):''}</small></span></label>${button('practical-edit','Edit',item.id,'quiet')}${button('practical-delete','Remove',item.id,'quiet')}</article>`).join('')}</div>`:empty('clipboard-list','Your checklist, at your pace.','Add a file, project, practical or viva item when you know what school requires.')}</section></div>`;
}
function writingPage(host:Host){
  const entries=[...data(host.getState()).writing].sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
  return `<div class="page life-page">${heading('WRITE · CHECK · IMPROVE','Answer practice','Keep an answer, compare it with a marking scheme, and review your own work.',button('writing-add','New practice','','primary','plus'))}
  <p class="life-note">BLOOM does not grade your answer or invent feedback. These notes and checks are your own review.</p>${entries.length?`<div class="writing-grid">${entries.map(item=>`<article class="writing-item"><span class="subject">${esc(subjectById(item.subject)?.title)}</span><h2>${esc(item.title)}</h2><p>${esc(item.prompt||'Your own answer practice')}</p><small>${item.checks.length} of ${practiceChecks.length} self-checks · Saved ${esc(dateText(item.updatedAt.slice(0,10)))}</small><div class="life-actions">${button('writing-view','Open practice',item.id,'outline','arrow-right')}${button('writing-delete','Remove',item.id,'quiet')}</div></article>`).join('')}</div>`:empty('pencil','A little practice goes a long way.','Save your own question and answer here. Add the self-review checks after comparing your work.',button('writing-add','Write your first answer','','primary','plus'))}</div>`;
}
function lettersPage(host:Host){
  const letters=data(host.getState()).letters;
  return `<div class="page life-page">${heading('A NOTE FOR LATER','Future letters','Write something you would like to come back to.',button('letter-add','Write a letter','','primary','plus'))}
  <p class="life-note">BLOOM reveals the letter here on your chosen date. You can edit your own letter at any time. The reveal date is a display choice, not a timed encryption lock.</p>${letters.length?`<div class="letter-list">${[...letters].sort((a,b)=>a.reveal.localeCompare(b.reveal)).map(letter=>`<article class="letter-item"><span class="letter-mark" aria-hidden="true">${icon('heart')}</span><div><h2>${esc(letter.title)}</h2><p>${letter.reveal<=today()?'Ready to read':'Opens '+esc(dateText(letter.reveal))}</p></div><div class="life-actions">${letter.reveal<=today()?button('letter-read','Read',letter.id,'primary','arrow-right'):''}${button('letter-edit','Edit',letter.id,'quiet')}${button('letter-delete','Remove',letter.id,'quiet')}</div></article>`).join('')}</div>`:empty('heart','Something for your future self.','A reminder, a hope, or a few kind words. It stays empty until you write.',button('letter-add','Write a letter','','primary','plus'))}</div>`;
}

function dueItems(state:State){
  const date=today();
  const reviews=Object.entries(state.progress).filter(([,progress])=>progress.next&&progress.next<=date).map(([id,progress])=>({key:'review-'+id+'-'+progress.next,kind:'Review',title:chapterById(id)?.title??'A chapter is ready for another look.',day:progress.next!,route:'review'}));
  const tests=state.tests.filter(test=>gap(date,test.day)>=0&&gap(date,test.day)<=7).map(test=>({key:'test-'+test.id+'-'+test.day,kind:'Test',title:test.title,day:test.day,route:'tests'}));
  return [...reviews,...tests].sort((a,b)=>a.day.localeCompare(b.day));
}
function remindersPage(host:Host){
  const state=host.getState(),prefs=data(state).reminders,items=dueItems(state),permission='Notification' in window?Notification.permission:'unsupported';
  return `<div class="page life-page">${heading('A GENTLE NUDGE','Reminders','Your due reviews and upcoming school tests, in one quiet place.')}
  <section class="reminder-settings"><h2>Your preferences</h2><form id="life-reminder-form"><label class="checkline"><input name="enabled" type="checkbox"${prefs.enabled?' checked':''}> Show in-app reminders</label><div class="form-pair"><label>Quiet hours · from<input type="time" name="quietFrom" value="${prefs.quietFrom}" required></label><label>Until<input type="time" name="quietTo" value="${prefs.quietTo}" required></label></div><small class="muted">Quiet hours use India time. Equal start and finish turns quiet hours off.</small>${submit('Save preferences')}</form><div class="life-actions">${permission==='granted'?'<span class="life-note">Device permission is enabled.</span>':permission==='denied'?'<span class="life-note">Device reminders are blocked. You can change this in your browser settings.</span>':permission==='unsupported'?'<span class="life-note">This browser does not support device notifications.</span>':button('notification-permission','Enable device notifications','','outline','bell')}</div><p class="life-note">Device reminders are checked only while BLOOM is open and visible, outside quiet hours. The app does not schedule background notifications or claim reliable delivery when it is closed.</p></section>
  <section class="life-section"><div class="section-head"><h2>Coming up</h2></div>${!prefs.enabled?empty('bell','Reminders are resting.','Turn in-app reminders back on whenever you want.'):items.length?`<div class="rows">${items.map(item=>`<article class="life-row"><div><strong>${esc(item.kind)}</strong><p>${esc(item.title)}</p><small>${esc(dateText(item.day))}</small></div>${button('go-'+item.route,'Open','','outline','arrow-right')}</article>`).join('')}</div>`:empty('sun','Nothing needs a nudge.','Due reviews and school tests in the next week appear only when you record them.')}</section></div>`;
}

export function renderLifePage(page:string,host:Host):string{
  if(page==='garden')return gardenPage(host);
  if(page==='resources')return resourcesPage(host);
  if(page==='writing')return writingPage(host);
  if(page==='letters')return lettersPage(host);
  if(page==='reminders')return remindersPage(host);
  return '';
}

function editPaper(host:Host,existing?:PaperAttempt,resource=''){
  const subject=existing?.subject??(resource.startsWith('sqp-')?resource.slice(4):subjects[0].id),isOfficial=resource.startsWith('sqp-')||existing?.resource.startsWith('sqp-');
  const title=existing?.title??(isOfficial?`${subjectById(subject)?.title} · CBSE sample paper 2026–27`:'');
  const dialog=host.show(existing?'Edit paper attempt':'Record a paper attempt',`<form id="life-paper-form"><label>Paper name<input name="title" required maxlength="120" value="${esc(title)}"></label><div class="form-pair"><label>Subject<select name="subject">${subjectOptions(subject)}</select></label><label>Attempt date<input name="day" type="date" required value="${existing?.day??today()}" max="${today()}"></label></div><label>Your note <span class="muted">(optional)</span><textarea name="note" rows="3" maxlength="1800">${esc(existing?.note??'')}</textarea></label><p class="life-note">Record an attempt you actually made. For marks and question analysis, use Test results.</p>${submit('Save attempt')}</form>`);
  dialog.querySelector('form')!.onsubmit=async event=>{
    event.preventDefault();const form=new FormData(event.currentTarget as HTMLFormElement),day=formValue(form,'day'),title=formValue(form,'title'),subject=formValue(form,'subject');
    if(!title||!subjectById(subject)||!validDay(day)||day>today()){err(dialog,'Enter a title, subject and a valid attempt date on or before today.');return;}
    const item:PaperAttempt={id:existing?.id??crypto.randomUUID(),resource:existing?.resource??resource,subject,title,day,note:formValue(form,'note')};
    const next=clone(host),index=next.life.papers.findIndex(x=>x.id===item.id);if(index<0)next.life.papers.push(item);else next.life.papers[index]=item;
    await host.commit(next,'Paper attempt saved.');
  };
}
function editPractical(host:Host,existing?:PracticalItem){
  const dialog=host.show(existing?'Edit checklist item':'Add a checklist item',`<form><label>Item name<input name="title" value="${esc(existing?.title??'')}" required maxlength="150"></label><div class="form-pair"><label>Subject<select name="subject">${subjectOptions(existing?.subject)}</select></label><label>Type<select name="kind">${kinds.map(kind=>`<option${existing?.kind===kind?' selected':''}>${kind}</option>`).join('')}</select></label></div><label>School deadline <span class="muted">(optional)</span><input name="due" type="date" value="${existing?.due??''}"></label>${submit('Save item')}</form>`);
  dialog.querySelector('form')!.onsubmit=async event=>{
    event.preventDefault();const form=new FormData(event.currentTarget as HTMLFormElement),title=formValue(form,'title'),subject=formValue(form,'subject'),kind=formValue(form,'kind') as PracticalItem['kind'],due=formValue(form,'due');
    if(!title||!subjectById(subject)||!kinds.includes(kind)||(due&&!validDay(due))){err(dialog,'Enter the item name and subject, and check the optional date.');return;}
    const item:PracticalItem={id:existing?.id??crypto.randomUUID(),title,subject,kind,due,done:existing?.done??false,completedAt:existing?.completedAt};
    const next=clone(host),index=next.life.practicals.findIndex(x=>x.id===item.id);if(index<0)next.life.practicals.push(item);else next.life.practicals[index]=item;
    await host.commit(next,'Checklist saved.');
  };
}
function editWriting(host:Host,existing?:WritingPractice){
  const subject=existing?.subject??subjects[0].id;
  const dialog=host.show(existing?'Your answer practice':'New answer practice',`<form class="writing-form"><label>Practice title<input name="title" required maxlength="120" value="${esc(existing?.title??'')}"></label><label>Subject<select name="subject">${subjectOptions(subject)}</select></label><label>Question or prompt<textarea name="prompt" rows="2" maxlength="4000">${esc(existing?.prompt??'')}</textarea></label><label>Your answer<textarea name="answer" rows="8" required maxlength="30000">${esc(existing?.answer??'')}</textarea></label><a class="life-scheme-link" href="${scheme(subject)}" target="_blank" rel="noreferrer">Open the official 2026–27 marking scheme ${icon('arrow-up-right')}</a><fieldset class="life-checklist"><legend>Your self-review</legend>${practiceChecks.map(([key,label])=>`<label class="checkline"><input name="checks" type="checkbox" value="${key}"${existing?.checks.includes(key)?' checked':''}>${label}</label>`).join('')}</fieldset><p class="life-note">This is your own checklist, not an official score or automated assessment.</p>${submit('Save practice')}</form>`);
  dialog.querySelector<HTMLSelectElement>('[name="subject"]')!.onchange=event=>{const subject=(event.currentTarget as HTMLSelectElement).value;dialog.querySelector<HTMLAnchorElement>('.life-scheme-link')!.href=scheme(subject);};
  dialog.querySelector('form')!.onsubmit=async event=>{
    event.preventDefault();const form=new FormData(event.currentTarget as HTMLFormElement),title=formValue(form,'title'),subject=formValue(form,'subject'),answer=formValue(form,'answer');
    if(!title||!answer||!subjectById(subject)){err(dialog,'Add a title, subject and your answer.');return;}
    const item:WritingPractice={id:existing?.id??crypto.randomUUID(),title,subject,prompt:formValue(form,'prompt'),answer,checks:form.getAll('checks').map(String).filter(key=>practiceChecks.some(([id])=>id===key)),createdAt:existing?.createdAt??new Date().toISOString(),updatedAt:new Date().toISOString()};
    const next=clone(host),index=next.life.writing.findIndex(x=>x.id===item.id);if(index<0)next.life.writing.push(item);else next.life.writing[index]=item;
    await host.commit(next,'Answer practice saved.');
  };
}
function editLetter(host:Host,existing?:FutureLetter){
  const dialog=host.show(existing?'Edit your letter':'A note to your future self',`<form><label>Title<input name="title" value="${esc(existing?.title??'')}" required maxlength="100"></label><label>Open on<input name="reveal" value="${existing?.reveal??''}" type="date" required></label><label>Your letter<textarea name="body" rows="9" maxlength="25000" required>${esc(existing?.body??'')}</textarea></label><p class="life-note">Choose the date when you would like BLOOM to show your letter. You can still edit or remove it.</p>${submit('Save letter')}</form>`);
  dialog.querySelector('form')!.onsubmit=async event=>{
    event.preventDefault();const form=new FormData(event.currentTarget as HTMLFormElement),title=formValue(form,'title'),reveal=formValue(form,'reveal'),body=formValue(form,'body');
    if(!title||!body||!validDay(reveal)){err(dialog,'Add a title, letter and valid opening date.');return;}
    const letter:FutureLetter={id:existing?.id??crypto.randomUUID(),title,reveal,body,createdAt:existing?.createdAt??new Date().toISOString()};
    const next=clone(host),index=next.life.letters.findIndex(x=>x.id===letter.id);if(index<0)next.life.letters.push(letter);else next.life.letters[index]=letter;
    await host.commit(next,'Your letter is saved.');
  };
}
function confirmRemove(host:Host,kind:'papers'|'practicals'|'writing'|'letters',id:string){
  const next=clone(host),item=next.life[kind].find(x=>x.id===id);if(!item)return;
  const dialog=host.show('Remove this item?',`<form><p>${esc(item.title)}</p><p class="life-note">This removes the saved item from BLOOM.</p>${submit('Remove item')}</form>`);
  dialog.querySelector('form')!.onsubmit=async event=>{event.preventDefault();const state=clone(host);(state.life[kind] as {id:string}[])=(state.life[kind] as {id:string}[]).filter(x=>x.id!==id);await host.commit(state,'Item removed.');};
}

let notifying=false;
async function foregroundReminders(host:Host){
  if(notifying||document.visibilityState!=='visible'||!('Notification'in window)||Notification.permission!=='granted')return;
  const state=host.getState(),life=data(state),prefs=life.reminders;
  if(!state.name||!prefs.enabled||quietNow(prefs.quietFrom,prefs.quietTo))return;
  const item=dueItems(state).find(item=>!prefs.notified.includes(today()+':'+item.key));if(!item)return;
  notifying=true;
  try{
    const notification=new Notification('A little nudge from BLOOM',{body:item.kind==='Test'?'An upcoming test is in your plan.':'A recorded review is due when you are ready.',tag:'bloom-'+today()+':'+item.key,icon:'./art/mark.svg'});
    notification.onclick=()=>{window.focus();host.navigate('reminders');notification.close();};
    const next=clone(host);next.life.reminders.notified=[...next.life.reminders.notified,today()+':'+item.key].slice(-200);await host.commit(next);
  }catch{/* Browsers can reject foreground notifications; the due list still works. */}
  finally{notifying=false;}
}
export function initLifeTools(host:Host){
  if(registered)return;registered=true;
  document.addEventListener('click',async event=>{
    const target=(event.target as Element).closest<HTMLElement>('[data-life-action]');if(!target)return;
    const action=target.dataset.lifeAction,key=target.dataset.value??'',life=data(host.getState());
    if(action?.startsWith('go-')){host.navigate(action.slice(3));return;}
    switch(action){
      case 'paper-add':editPaper(host,undefined,key);break;
      case 'paper-custom':editPaper(host);break;
      case 'paper-edit':{const item=life.papers.find(item=>item.id===key);if(item)editPaper(host,item);break;}
      case 'paper-delete':confirmRemove(host,'papers',key);break;
      case 'practical-add':editPractical(host);break;
      case 'practical-edit':{const item=life.practicals.find(item=>item.id===key);if(item)editPractical(host,item);break;}
      case 'practical-delete':confirmRemove(host,'practicals',key);break;
      case 'writing-add':editWriting(host);break;
      case 'writing-view':{const item=life.writing.find(item=>item.id===key);if(item)editWriting(host,item);break;}
      case 'writing-delete':confirmRemove(host,'writing',key);break;
      case 'letter-add':editLetter(host);break;
      case 'letter-edit':{const item=life.letters.find(item=>item.id===key);if(item)editLetter(host,item);break;}
      case 'letter-read':{
        const letter=life.letters.find(letter=>letter.id===key);if(!letter||letter.reveal>today())return;
        host.show(letter.title,`<div class="letter-body">${esc(letter.body)}</div><p class="life-note">Written ${esc(dateText(letter.createdAt.slice(0,10)))}</p>`);break;
      }
      case 'letter-delete':confirmRemove(host,'letters',key);break;
      case 'notification-permission':{
        if(!('Notification'in window)){host.announce('This browser does not support device notifications.');return;}
        try{const permission=await Notification.requestPermission();host.announce(permission==='granted'?'Device reminders enabled while BLOOM is open.':'In-app reminders remain available.');host.navigate('reminders');}catch{host.announce('Device permission could not be requested. In-app reminders still work.');}break;
      }
    }
  });
  document.addEventListener('change',async event=>{
    const input=event.target as HTMLInputElement;
    if(input.dataset.lifePreference==='achievements'){const next=clone(host);next.life.achievements=input.checked;await host.commit(next,input.checked?'Milestones are on.':'Milestones are off.');}
    if(input.dataset.lifePractical){const next=clone(host),item=next.life.practicals.find(item=>item.id===input.dataset.lifePractical);if(item){item.done=input.checked;item.completedAt=item.done?new Date().toISOString():undefined;await host.commit(next,item.done?'Checklist item complete.':'Checklist item reopened.');}}
  });
  document.addEventListener('submit',async event=>{
    const element=event.target as HTMLFormElement;if(element.id!=='life-reminder-form')return;
    event.preventDefault();const form=new FormData(element),from=formValue(form,'quietFrom'),to=formValue(form,'quietTo');
    if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(from)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(to))return;
    const next=clone(host);next.life.reminders={...next.life.reminders,enabled:form.has('enabled'),quietFrom:from,quietTo:to};await host.commit(next,'Reminder preferences saved.');
  });
  window.setInterval(()=>foregroundReminders(host),60000);
}
