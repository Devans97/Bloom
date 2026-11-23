import { chapters, chapterById, subjects, subjectById, dateSource } from './curriculum.js';
import { empty, today, plus, gap, labelDay, minute, clock, labelTime, defaultDay, dayFor, suggestions, conflict, freeSlot, commitments, focusTest, reserve, statuses, ratings, markDone, revisionDate,calendarTests,proposePlan, learningStatuses, statusLabel, type State, type Task, type Rating, type Suggestion, type Day, type Status, type StudyTest } from './model.js';
import { load, save, unlock, VaultLockedError } from './storage.js';
import { icon } from './icons.js';
import {type Host} from './host.js';
import {openPlannerImport} from './importer.js';
import {renderStudyPage,initStudyTools,startTaskFocus} from './study-tools.js';
import {renderLifePage,initLifeTools} from './life-tools.js';

import {availability,generatePlan,dailyMetrics,academicMetrics,personalizedSuggestions,rescueBacklog} from './planning.js';
import {renderOnboarding,initOnboarding,openPersonalisation} from './onboarding.js';
import {renderVaultPage,initVault} from './vault.js';
import {initMotion,captureLayout,animateLayout,animatePage,animateDialogExit,animateProgress,animateTaskCompletion,observeReveals,refreshNavIndicator} from './motion.js';
import {academicNodes,activityById,nextActivityForNode,type AcademicLearningStatus} from './academic-data.js';
import {saveAcademicActivity} from './academic-progress.js';
import {renderAcademicHub,renderAcademicWorkspace} from './academic-ui.js';
import {DerivationLabUI} from './derivation-lab-ui.js';
import {ReactionRoadmapUI} from './reaction-roadmap-ui.js';
import {MockExamUI} from './mock-exam-ui.js';
import {PracticalsLabUI} from './practicals-lab-ui.js';
import {FormulaHandbookUI} from './formula-handbook-ui.js';
import {SoundscapeUI} from './soundscape-ui.js';
import {EnglishStudioUI} from './english-studio-ui.js';
import {PEStudioUI} from './pe-studio-ui.js';
import {calculateBoardReadiness, getDailyBoardBoostQuestions, cbseHighYieldPresets} from './performance-engine.js';
import {CommandPalette} from './command-palette.js';

const app = document.querySelector<HTMLDivElement>('#app')!;
const modal = document.querySelector<HTMLDialogElement>('#dialog')!;
const notice = document.querySelector('#notice')!;
const tourUI = document.querySelector<HTMLDivElement>('#tour-ui')!;
const esc = (v:unknown) => String(v ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const nav = [['today','Today','sun'],['planner','Planner','calendar-days'],['syllabus','Academics','book-open'],['tests','Tests','clipboard-list'],['more','Your space','user']];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const selected = new Set<string>();
let state = empty(), page='today', date=today(), mode='list', subject='physics', academicChapterId='physics-1-1', activeActivityId='', busy=false, timer=0, justDone='', tourIndex=0, tourRunning=false, tourMode:'welcome'|'tour'|'tip'|null=null;
let calendarView='day',showAllIdeas=false;
const tourSteps=[
  {page:'today',target:'[data-tour="today"]',title:'Your next step',text:'Today starts with one clear suggestion, with a short reason.'},
  {page:'planner',target:'[data-tour="planner"]',title:'Make a plan',text:'Choose tasks and place them in the time that works for you, including later study.'},
  {page:'syllabus',target:'[data-tour="syllabus"]',title:'Your subjects',text:'Track your own learning here. Nothing is marked until you set it.'},
  {page:'syllabus',target:'[data-tour="progress"]',title:'Your progress',text:'See the statuses you have actually recorded and change them whenever you like.'},
];
const option = (v:string,label:string,current='') => `<option value="${esc(v)}"${v===current?' selected':''}>${esc(label)}</option>`;
const opts = (sub='',optional=true) => (optional?option('','No subject',sub):'')+subjects.map(x=>option(x.id,x.title,sub)).join('');
const chapterOpts = (sub:string,id='') => option('','No chapter',id)+chapters.filter(x=>x.subject===sub).map(x=>option(x.id,x.title,id)).join('');
const unitOpts = (subId:string, current='') => {
  const sub = subjects.find(s=>s.id===subId);
  if(!sub)return '';
  return sub.groups.map(([title, marks], index) => {
    const val = `${subId}-unit-${index}`;
    const markStr = marks !== null ? ` · ${marks} Marks` : '';
    return `<option value="${esc(val)}"${val===current?' selected':''}>${esc(title)}${markStr}</option>`;
  }).join('');
};
const btn = (a:string,label:string,i='',kind='quiet',v='') => `<button type="button" class="button ${kind}" data-action="${a}" data-value="${esc(v)}">${i?icon(i):''}<span>${esc(label)}</span></button>`;
const tool = (a:string,label:string,i:string,v='') => `<button type="button" class="tool" data-action="${a}" data-value="${esc(v)}" aria-label="${esc(label)}" title="${esc(label)}">${icon(i)}</button>`;
const badge = (id:string) => id?`<span class="subject subject-${esc(id)}">${esc(subjectById(id)?.title)}</span>`:'';
const avatar = () => state.avatar ? `<img class="avatar" src="${esc(state.avatar)}" alt="">` : `<span class="avatar" aria-hidden="true">${esc([...state.name.trim()].slice(0,1).join('').toUpperCase())}</span>`;
const tasks = (d:string) => state.tasks.filter(t=>t.day===d).sort((a,b)=>(a.time||'99:99').localeCompare(b.time||'99:99'));
const taskById = (id:string) => state.tasks.find(t=>t.id===id);
const form = () => modal.querySelector<HTMLFormElement>('form')!;
const val = (f:FormData,k:string) => String(f.get(k)??'').trim();
const checked = (value:boolean) => value?' checked':'';
const dateLabel = (day:string) => labelDay(day,true);
const errorLine = '<p class="form-error" data-error role="alert"></p>';
const actions = (label:string,extra='') => `<div class="dialog-actions">${extra}<button type="submit" class="button primary">${esc(label)} ${icon('check')}</button></div>`;
function announce(message:string) {
  notice.textContent=message;
  clearTimeout(timer); timer=window.setTimeout(()=>notice.textContent='',4100);
}
function overlay(message:string,buttons:string){
  tourMode='welcome';
  tourUI.innerHTML=`<div class="tour-scrim"></div><section class="welcome-card" role="dialog" aria-modal="true" aria-labelledby="tour-title"><img src="./art/mark.svg" alt=""><p class="eyebrow">A QUIETER WAY TO STUDY</p><h2 id="tour-title">Welcome, ${esc(state.name)}.</h2><p>${esc(message)}</p><div class="dialog-actions">${buttons}</div></section>`;
  tourUI.hidden=false;
}
function hideTour(){
  tourMode=null;tourUI.hidden=true;tourUI.innerHTML='';document.querySelectorAll('.tour-target').forEach(x=>x.classList.remove('tour-target'));
}
async function tourEnd(status:'skipped'|'complete'){
  tourRunning=false;hideTour();const next=structuredClone(state);next.tourStatus=status;await commit(next);
}
async function tourAt(index:number){
  tourIndex=index;
  if(index<0){await tourEnd('skipped');return;}
  if(index>=tourSteps.length){await tourEnd('complete');announce('You can replay the tour from Profile.');return;}
  tourRunning=true;
  tourMode='tour';
  if(state.tourStatus==='in-progress'&&state.tourStep!==index){const next=structuredClone(state);next.tourStep=index;await save(next);state=next;}
  const step=tourSteps[index];
  if(page!==step.page){route(step.page,false);requestAnimationFrame(()=>tourAt(index));return;}
  const target=document.querySelector<HTMLElement>(step.target);
  if(!target){if(index===0){await tourEnd('skipped');return;}await tourAt(index+1);return;}
  target.scrollIntoView({block:'center',behavior:state.reduceMotion||reduced.matches?'instant':'smooth'});
  if(!(state.reduceMotion||reduced.matches))await new Promise(resolve=>window.setTimeout(resolve,260));
  document.querySelectorAll('.tour-target').forEach(x=>x.classList.remove('tour-target'));
  target.classList.add('tour-target');
  const rect=target.getBoundingClientRect();
  const top=Math.max(12,Math.min(innerHeight-195,rect.bottom+12));
  const left=Math.max(12,Math.min(innerWidth-344,rect.left));
  const spotlight=tourUI.querySelector<HTMLElement>('.tour-spotlight');
  const card=`<section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" style="--tour-left:${left}px;--tour-top:${top}px"><p class="eyebrow">${index+1} OF ${tourSteps.length}</p><h2 id="tour-title">${esc(step.title)}</h2><p>${esc(step.text)}</p><div class="tour-footer">${btn('tour-back',index?'Back':'Skip','arrow-left')}${btn('tour-next',index===tourSteps.length-1?'Done':'Next','arrow-right','primary')}<button type="button" data-action="tour-skip" class="tour-skip">Skip tour</button></div></section>`;
  if(spotlight){
    spotlight.style.setProperty('--tour-x',`${Math.max(0,rect.left-7)}px`);spotlight.style.setProperty('--tour-y',`${Math.max(0,rect.top-7)}px`);spotlight.style.setProperty('--tour-w',`${rect.width+14}px`);spotlight.style.setProperty('--tour-h',`${rect.height+14}px`);
    tourUI.querySelector('.tour-card')?.remove();tourUI.insertAdjacentHTML('beforeend',card);
  }else tourUI.innerHTML=`<div class="tour-spotlight" style="--tour-x:${Math.max(0,rect.left-7)}px;--tour-y:${Math.max(0,rect.top-7)}px;--tour-w:${rect.width+14}px;--tour-h:${rect.height+14}px"></div>${card}`;
  tourUI.hidden=false;
  target.classList.add('tour-target');
  if(!(state.reduceMotion||reduced.matches))target.animate([{transform:'scale(.99)'},{transform:'scale(1)'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});
  tourUI.querySelector<HTMLButtonElement>('[data-action="tour-next"]')?.focus({preventScroll:true});
}
function welcome(){
  tourRunning=false;
  overlay('I’ll help organise your board preparation and find a useful next study step. Your progress stays yours to enter.',`${btn('tour-start','Show me around','arrow-right','primary')}${btn('tour-dismiss','I’ll explore myself','x','quiet')}`);
}
function repositionTour(){
  if(!tourRunning||tourUI.hidden)return;
  const target=document.querySelector<HTMLElement>(tourSteps[tourIndex]?.target);if(!target)return;
  const rect=target.getBoundingClientRect(), spotlight=tourUI.querySelector<HTMLElement>('.tour-spotlight'), card=tourUI.querySelector<HTMLElement>('.tour-card');
  if(spotlight){spotlight.style.setProperty('--tour-x',`${Math.max(0,rect.left-7)}px`);spotlight.style.setProperty('--tour-y',`${Math.max(0,rect.top-7)}px`);spotlight.style.setProperty('--tour-w',`${rect.width+14}px`);spotlight.style.setProperty('--tour-h',`${rect.height+14}px`);}
  if(card){card.style.setProperty('--tour-left',`${Math.max(12,Math.min(innerWidth-344,rect.left))}px`);card.style.setProperty('--tour-top',`${Math.max(12,Math.min(innerHeight-195,rect.bottom+12))}px`);}
}
function tip(key:string,title:string,text:string){
  if(state.tipsSeen.includes(key)||state.dismissedTips.includes(key)||state.reduceMotion||reduced.matches)return;
  const target=document.querySelector<HTMLElement>(`[data-tour="${key}"]`);if(!target)return;
  const rect=target.getBoundingClientRect(), left=Math.max(12,Math.min(innerWidth-320,rect.left)), top=Math.max(12,Math.min(innerHeight-130,rect.bottom+8));
  const next=structuredClone(state);next.tipsSeen=[...next.tipsSeen,key];save(next).then(()=>{state=next;});
  tourMode='tip';tourUI.innerHTML=`<section class="context-tip" role="status" style="--tip-left:${left}px;--tip-top:${top}px"><strong>${esc(title)}</strong><p>${esc(text)}</p><button data-action="tip-dismiss" data-value="${esc(key)}" aria-label="Dismiss tip">${icon('x')}</button></section>`;tourUI.hidden=false;
  window.setTimeout(()=>{if(tourUI.querySelector('.context-tip'))hideTour();},6500);
}
function error(message:string){
  const el=modal.querySelector('[data-error]');
  if(el)el.textContent=message;
}
async function commit(next:State, message='', close=true) {
  if(busy)return false;
  busy=true;
  try { await save(next); state=next; if(close&&modal.open)await animateDialogExit(modal); }
  catch { if(modal.open)error('Could not save on this device. Please try again.'); else announce('Could not save on this device.'); return false; }
  finally { busy=false; }
  render();
  if(message)announce(message);
  return true;
}
const brand = `<a class="wordmark" href="#today" data-nav="today"><img src="./art/mark.svg" alt="">BLOOM</a>`;
function shell(body:string) {
  return `<div class="layout"><aside class="sidebar">${brand}<p class="sidebar-label">STUDY SPACE</p>
  <nav aria-label="Main navigation"><i class="nav-indicator" aria-hidden="true"></i>${nav.map(([id,label,glyph])=>`<a href="#${id}" data-nav="${id}" ${page===id?'aria-current="page"':''}>${icon(glyph)}<span>${label}</span></a>`).join('')}</nav>
  <button class="profile-button" data-action="profile">${avatar()}<span><strong>${esc(state.name)}</strong><small>Personal study companion</small></span></button></aside>
  <div class="workspace"><header class="topbar"><span class="small-brand">BLOOM</span>
  <button class="topbar-search-trigger" data-action="open-palette" title="Search Everything (Cmd + K)">
    ${icon('search')} <span>Search formulas, derivations, chapters...</span> <kbd>⌘K</kbd>
  </button>
  <span class="session">CBSE XII · 2027</span><button class="mobile-profile" data-action="profile" aria-label="Open profile">${avatar()}</button></header>
  <main id="content" tabindex="-1">${body}</main></div></div>`;
}
function toTask(x:Suggestion,d=date):Task{
  return {id:x.rollover?.id??crypto.randomUUID(),title:x.title,day:d,time:'',minutes:x.minutes,subject:x.subject,chapter:x.chapter,priority:x.rollover?.priority??'Normal',due:x.rollover?.due??'',done:false,reason:x.rollover?.reason??x.reason,originalDay:x.rollover?.originalDay??x.rollover?.day,activityId:x.activityId};
}
function row(t:Task, editable=true){
  const primary=t.activityId?tool('launch-activity','Open study activity: '+t.title,'book-open',t.activityId):tool('complete',t.done?'Completed: '+t.title:'Mark complete: '+t.title,t.done?'circle-check':'check',t.id);
  return `<article class="task-row ${t.done?'done':''} ${t.id===justDone?'just-done':''}" data-tour="task-completion" ${editable&&!t.done&&!t.activityId?`draggable="true" data-drag="${esc(t.id)}"`:''}>${primary}
  <div class="row-main"><strong>${esc(t.title)}</strong><small>${t.subject?esc(subjectById(t.subject)?.title)+' · ':''}${t.minutes} min${t.due?' · Due '+esc(dateLabel(t.due)):''}</small></div><span class="row-time">${esc(t.time?labelTime(t.time):'Any time')}</span>${editable?tool('edit-task','Edit '+t.title,'pencil',t.id):''}</article>`;
}
const duration=(minutes:number)=>minutes<60?Math.round(minutes)+' min':Math.floor(minutes/60)+'h'+(Math.round(minutes%60)?' '+Math.round(minutes%60)+'m':'');
function todayPage(){
  const d=today(),list=tasks(d),next=list.find(t=>!t.done),metrics=dailyMetrics(state,d),academic=academicMetrics(state,d),avail=availability(state,d);
  const ideas=personalizedSuggestions(state,d),recommendation=ideas[0];
  const upcoming=calendarTests(state).filter(t=>t.day>=d).sort((a,b)=>a.day.localeCompare(b.day))[0];
  const readiness=calculateBoardReadiness(state);
  const recallCards=getDailyBoardBoostQuestions(d);
  const topRecall=recallCards[0];

  const head=next?`${badge(next.subject)}<h2>${esc(next.title)}</h2><p>${esc(next.reason||(next.time?'Planned for '+labelTime(next.time):'In today’s plan'))}</p><div class="next-meta">${icon('clock-3')} ${next.minutes} minutes · ${next.time?esc(labelTime(next.time)):'When you’re ready'}</div>${next.activityId?btn('launch-activity','Open study workspace','arrow-right','primary',next.activityId):btn('study','Start studying','arrow-right','primary',next.id)}`
    :recommendation?`${badge(recommendation.subject)}<h2>${esc(recommendation.title)}</h2><p>${esc(recommendation.reason)}</p><div class="next-meta">${icon('clock-3')} ${recommendation.minutes} minutes · Suggested, not yet scheduled</div>${recommendation.activityId?btn('launch-activity','Open study workspace','arrow-right','primary',recommendation.activityId):btn('propose-today','Build my study plan','arrow-right','primary')}`
    :`<h2>Choose your study focus to begin.</h2><p>Your confirmed CBSE Class XII subjects are ready. Start with full-chapter revision, high-yield 16–35 mark units, or board PYQs.</p>${btn('apply-guided-mission','⚡ Choose Board Study Plan','zap','primary')}`;
  const percent=metrics.targetPercent;

  return `<div class="page today-page">
    <div class="dashboard-greeting">
      <div>
        <p class="eyebrow">CBSE XII · 2027 · ${readiness.daysToBoards} DAYS AWAY</p>
        <h1>Hello, ${esc(state.name)}.</h1>
        <p class="muted">One thoughtful, high-yield step at a time.</p>
      </div>
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <a href="#syllabus" class="button outline" style="font-size:0.82rem;padding:0.4rem 0.75rem;min-height:36px;">
          ⚡ ${readiness.overallPercentage}% Board Ready
        </a>
        <a class="dashboard-garden" href="#garden" data-nav="garden">${icon('leaf')} Your garden ${icon('arrow-up-right')}</a>
      </div>
    </div>

    <!-- Clean Studio Quick Launcher -->
    <nav class="studio-quick-strip" aria-label="Study Studios">
      <a href="#derivations" class="studio-pill">
        <span class="ios-icon-tile ios-tile-indigo">${icon('zap')}</span>
        <span>Derivations</span>
      </a>
      <a href="#roadmaps" class="studio-pill">
        <span class="ios-icon-tile ios-tile-teal">${icon('flask-conical')}</span>
        <span>Roadmaps</span>
      </a>
      <a href="#formulas" class="studio-pill">
        <span class="ios-icon-tile ios-tile-amber">${icon('calculator')}</span>
        <span>Formulas</span>
      </a>
      <a href="#mock-exam" class="studio-pill">
        <span class="ios-icon-tile ios-tile-blue">${icon('file-text')}</span>
        <span>Mock Exam</span>
      </a>
      <a href="#english-studio" class="studio-pill">
        <span class="ios-icon-tile ios-tile-purple">${icon('feather')}</span>
        <span>English</span>
      </a>
      <a href="#pe-studio" class="studio-pill">
        <span class="ios-icon-tile ios-tile-orange">${icon('trophy')}</span>
        <span>PE Mastery</span>
      </a>
      <a href="#practicals" class="studio-pill">
        <span class="ios-icon-tile ios-tile-green">${icon('microscope')}</span>
        <span>Practicals</span>
      </a>
      <a href="#soundscape" class="studio-pill">
        <span class="ios-icon-tile ios-tile-pink">${icon('headphones')}</span>
        <span>Focus Audio</span>
      </a>
    </nav>

    <!-- Primary Focus Band -->
    <section class="focus-band" data-tour="today" aria-label="What should I study next?">
      <div class="focus-content">
        <p class="eyebrow">YOUR NEXT STUDY STEP</p>
        ${head}
      </div>
      <div class="focus-art" aria-hidden="true"><img src="./art/cosmos.webp" alt=""><i></i><i></i><i></i></div>
    </section>

    <!-- Balanced 2-Column Dashboard -->
    <div class="dashboard-columns">
      <!-- Left Column: Day Plan & Focus Pulse -->
      <section class="today-plan">
        <div class="section-head">
          <div>
            <h2>Today's Plan</h2>
            <p>${duration(avail.availableMinutes)} available · ${duration(metrics.actualMinutes)} studied</p>
          </div>
          ${btn('planner','Open planner','arrow-up-right','quiet')}
        </div>
        <div class="daily-commitments">
          <span>${icon('calendar-days')} ${avail.school?'School today':'No school today'}</span>
          <span>${icon('clock-3')} ${avail.tuition?'Tuition today':'No tuition today'}</span>
        </div>
        ${list.length?`<div class="rows">${list.slice(0,4).map(t=>row(t,false)).join('')}</div><div style="display:flex;gap:8px;margin-top:10px;">${btn('add-task','Add custom task','plus','outline')}${btn('apply-guided-mission','⚡ Board study plans','zap','quiet')}</div>`:
        `<div class="guided-mission-card" style="background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);border:1px solid rgba(0,0,0,0.06);border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.03);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <span class="ios-icon-tile ios-tile-indigo"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
            <div>
              <strong style="font-size:0.92rem;color:var(--ink);display:block;">CBSE Board Preparation Study Plans</strong>
              <small style="color:var(--soft);font-size:0.75rem;">Full chapters & high-yield 16–35 mark unit sprints</small>
            </div>
          </div>
          
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
            <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(255,255,255,0.7);border-radius:12px;border:1px solid rgba(0,0,0,0.04);">
              <span style="font-size:16px;">📚</span>
              <div style="flex:1;min-width:0;">
                <strong style="font-size:0.82rem;display:block;color:var(--ink);">Full-Chapter Mastery Sprints</strong>
                <small style="color:var(--soft);font-size:0.72rem;">Complete NCERT Theory + Derivations + 15 PYQs</small>
              </div>
              <span style="font-size:0.72rem;font-weight:700;color:#1e40af;background:#dbeafe;padding:2px 8px;border-radius:9999px;">Recommended</span>
            </div>

            <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(255,255,255,0.7);border-radius:12px;border:1px solid rgba(0,0,0,0.04);">
              <span style="font-size:16px;">📦</span>
              <div style="flex:1;min-width:0;">
                <strong style="font-size:0.82rem;display:block;color:var(--ink);">16–35 Mark Multi-Chapter Units</strong>
                <small style="color:var(--soft);font-size:0.72rem;">Electrostatics [16M], Calculus [35M], Organic [33M]</small>
              </div>
              <span style="font-size:0.72rem;font-weight:700;color:#15803d;background:#dcfce7;padding:2px 8px;border-radius:9999px;">Unit Sprint</span>
            </div>

            <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:rgba(255,255,255,0.7);border-radius:12px;border:1px solid rgba(0,0,0,0.04);">
              <span style="font-size:16px;">🎯</span>
              <div style="flex:1;min-width:0;">
                <strong style="font-size:0.82rem;display:block;color:var(--ink);">Past 5-Year Board PYQ Marathon</strong>
                <small style="color:var(--soft);font-size:0.72rem;">15–20 authentic questions with official marking steps</small>
              </div>
              <span style="font-size:0.72rem;font-weight:700;color:#7e22ce;background:#f3e8ff;padding:2px 8px;border-radius:9999px;">PYQs</span>
            </div>
          </div>

          <div style="display:flex;gap:8px;">
            <button type="button" class="button primary" data-action="apply-guided-mission" style="flex:1;font-size:0.8rem;min-height:36px;justify-content:center;">
              ⚡ Choose Board Study Plan
            </button>
            ${btn('add-task','+ Custom task','plus','outline')}
          </div>
        </div>`}
      </section>

      <!-- Right Column: iOS Soft Cards -->
      <section class="academic-glance">
        <!-- Daily Board Boost Active Recall Card -->
        <article class="recall-boost-card">
          <div class="recall-boost-header">
            <span class="recall-badge">
              <span class="ios-icon-tile ios-tile-blue" style="width:18px;height:18px;border-radius:5px;"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
              ${topRecall.subject} · ${topRecall.cbseMarks} Marks
            </span>
            <small class="recall-badge-year">${topRecall.boardYearTag}</small>
          </div>
          <strong class="recall-title">Daily Active Recall: ${topRecall.topic}</strong>
          <p class="recall-question">${topRecall.question}</p>
          <div id="recall-key-${topRecall.id}" class="recall-key-box" hidden>
            <strong>Official CBSE Marking Key:</strong>
            <ul>
              ${topRecall.keyPoints.map(p=>`<li>${p}</li>`).join('')}
            </ul>
          </div>
          <button type="button" class="button outline" data-action="reveal-recall" data-id="${topRecall.id}" style="width:100%;font-size:0.75rem;min-height:32px;padding:0.3rem 0.6rem;border-radius:10px;">Reveal Marking Key</button>
        </article>

        <!-- Compact Academic Progress -->
        <article class="mastery-overview-card">
          <div class="mastery-head">
            <strong>Syllabus Mastery</strong>
            <a href="#syllabus">View all ${icon('arrow-up-right')}</a>
          </div>
          <p class="academic-number">${academic.learned}<span> / ${academic.total}</span></p>
          <div class="progress-track" role="progressbar" aria-label="Chapters learned" aria-valuenow="${academic.learned}" aria-valuemax="${academic.total}">
            <span class="progress-fill" data-progress="${academic.percent/100}" data-progress-key="today-academic"></span>
          </div>
          <div class="academic-attention">
            <span><strong>${academic.learning}</strong> learning</span>
            <span><strong>${academic.due}</strong> reviews due</span>
            <span><strong>${academic.unknown}</strong> unmarked</span>
          </div>
        </article>
      </section>
    </div>

    ${upcoming?`<section class="exam-strip"><div class="exam-icon">${icon('clipboard-list')}</div><div><p class="eyebrow">${upcoming.id.startsWith('board-')?'NEXT BOARD EXAM':'COMING UP'}</p><h2>${esc(upcoming.title)}</h2><p>${esc(labelDay(upcoming.day,true))} · ${gap(d,upcoming.day)} days away${!upcoming.id.startsWith('board-')?' · '+(upcoming.coverage.length+' confirmed chapters'):''}</p></div>${btn('tests','Prepare','arrow-up-right','quiet')}</section>`:''}
    <footer class="page-foot"><span>Make room for learning.</span><a href="#insights" data-nav="insights">See your real progress ${icon('arrow-up-right')}</a></footer>
  </div>`;
}
function timetable(list:Task[],blocks:ReturnType<typeof commitments>, d:Day|null){
  const hours=[];
  const first=Math.min(d?Math.floor(minute(d.start)/60):8,...list.filter(t=>t.time).map(t=>Math.floor(minute(t.time)/60)),...blocks.map(b=>Math.floor(b.a/60)));
  const end=Math.max(d?Math.ceil(minute(d.end)/60):22,...list.filter(t=>t.time).map(t=>Math.ceil((minute(t.time)+t.minutes)/60)),...blocks.map(b=>Math.ceil(b.b/60)));
  for(let h=first;h<end;h++){
    const time=clock(d&&h===Math.floor(minute(d.start)/60)?Math.max(h*60,minute(d.start)):h*60), here=blocks.filter(b=>Math.floor(b.a/60)===h), items=list.filter(t=>t.time&&Math.floor(minute(t.time)/60)===h);
    hours.push(`<div class="hour" data-drop="${time}"><time>${esc(labelTime(time))}</time><div>${here.map(b=>`<p class="commitment">${esc(b.label)}</p>`).join('')}${items.map(t=>row(t)).join('')}${!here.length&&!items.length?tool('slot','Add task at '+labelTime(time),'plus',time):''}</div></div>`);
  }
  const late=d?.lateStart&&!d.lateEnd?`<div class="late-window"><div><strong>Later study · after 9 p.m.</strong><small>No finish time set</small></div>${btn('slot','Add a later study task','plus','outline',d.lateStart)}</div>`:'';
  return hours.join('')+late+(list.some(t=>!t.time)?'<h3>Any time</h3>'+list.filter(t=>!t.time).map(t=>row(t)).join(''):'');
}
function plannerPage(){
  const list=tasks(date), d=dayFor(state,date), focus=focusTest(state,date), blocks=commitments(state,date,focus?.subject), ideas=personalizedSuggestions(state,date),avail=availability(state,date),metrics=dailyMetrics(state,date);
  const invalid=list.filter(t=>!t.done&&t.time&&conflict(state,t));
  return `<div class="page"><div class="section-head intro"><div><p class="eyebrow">YOUR STUDY PLAN</p><h1>Planner</h1></div><div class="toolbar">${btn('apply-guided-mission','⚡ 1-Click Board Plan','zap','primary')}${btn('import-planner','Upload Planner','file-text','outline')}${btn('add-task','Add task','plus','outline')}${btn('propose-plan','Auto-schedule','leaf','quiet')}</div></div>
  <div class="calendar-tabs" aria-label="Calendar view">${['day','week','month'].map(v=>btn('calendar-view',v[0].toUpperCase()+v.slice(1),'',calendarView===v?'primary':'outline',v)).join('')}</div>
  ${calendarView==='day'?'':calendarMarkup()}
  <div class="toolbar"><div class="date-tools">${tool('prev','Previous day','chevron-left')}<label><span class="sr">Plan date</span><input id="plan-date" type="date" value="${date}"></label>${tool('next','Next day','chevron-right')}</div>
  <div class="segments" aria-label="Plan view">${[['list','Checklist','list'],['time','Timetable','calendar-range']].map(([m,label,i])=>`<button data-action="mode" data-value="${m}" aria-pressed="${mode===m}">${icon(i)} ${label}</button>`).join('')}</div></div>
  <section class="planner-availability" data-tour="planner"><div><p class="eyebrow">${esc(labelDay(date,true))}</p><h2>${duration(metrics.recommendedMinutes)} <span>suggested study</span></h2><p>${duration(avail.availableMinutes)} available · ${duration(metrics.plannedMinutes)} planned · ${duration(metrics.actualMinutes)} studied</p></div><div class="attendance-controls"><label><input type="checkbox" data-attendance="school"${checked(avail.school)}> School today</label><label><input type="checkbox" data-attendance="tuition"${checked(avail.tuition)}> Tuition today</label>${btn('personalisation-routine','Edit routine','pencil','quiet')}</div></section>
  <p class="planning-explanation">Study blocks follow your chapter progress, tests and session rhythm, with breaks between them. Changes stay a proposal until you approve.</p>
  ${focus?`<section class="prep-banner"><div><p class="eyebrow">PREPARING FOR</p><h2>${esc(focus.title)}</h2><p>${gap(date,focus.day)} days away · Your suggestions adapt to your completed work and clarity.</p></div>${btn('test-plan','Review preparation plan','arrow-right','outline',focus.id)}</section>`:`<p class="muted">Add a school test or upload its planner in Tests to shape your next suggestions. ${btn('import-planner','Upload Planner','file-text','outline')}</p>`}
  ${invalid.length?`<p class="warning">${invalid.length} ${invalid.length===1?'task needs':'tasks need'} a new time. Your existing plan is unchanged.</p>`:''}
  <div class="planner-grid"><section><div class="section-head"><h2>${mode==='time'?'Timetable':'Tasks'}</h2><span class="muted">${list.filter(t=>t.done).length} / ${list.length} done</span></div>
  <div class="rows">${mode==='time'?timetable(list,blocks,d):list.map(t=>row(t)).join('')||'<div class="empty-line">No tasks for this day.</div>'}</div></section>
  <section><div class="section-head"><h2>Suggested study</h2></div><div class="rows">${ideas.length?ideas.slice(0,showAllIdeas?ideas.length:8).map(x=>`<article class="idea" draggable="true" data-suggest="${esc(x.key)}"><div class="row-main">${badge(x.subject)}<strong>${esc(x.title)}</strong><small>${esc(x.reason)} · ${x.minutes} min</small></div>${tool('suggest','Add '+x.title,'plus',x.key)}</article>`).join(''):'<div class="empty-line">No suggestions for this day.</div>'}</div>${ideas.length>8?btn('all-ideas',showAllIdeas?'Show less':'See all suggestions','arrow-right'):''}</section></div></div>`;
}
function calendarMarkup(){
  const start=calendarView==='month'?date.slice(0,7)+'-01':date;
  const count=calendarView==='month'?new Date(Number(date.slice(0,4)),Number(date.slice(5,7)),0).getDate():7;
  return `<div class="calendar-grid ${calendarView==='month'?'month':''}">${Array.from({length:count},(_,i)=>{const d=plus(start,i),ts=tasks(d),exams=calendarTests(state).filter(t=>t.day===d);return `<button data-action="calendar-day" data-value="${d}" class="calendar-cell ${d===date?'selected':''}"><time>${esc(labelDay(d,true))}</time>${ts.length?`<span>${ts.filter(t=>!t.done).length} open · ${ts.filter(t=>t.done).length} done</span>`:'<span>Open day</span>'}${exams.map(t=>`<small>${esc(t.title)}</small>`).join('')}</button>`;}).join('')}</div>`;
}
function planDialog(testId='',rescue=false){
  const start=date,proposal=rescue?rescueBacklog(state,start):generatePlan(state,start,undefined,{testId});
  show(rescue?'A manageable way back':'Your proposed study day',`<form><p class="proposal-intro">${duration(proposal.targetMinutes)} of study, shaped around your real day. Review these sessions before adding them. Your existing plan stays unchanged.</p>${proposal.notes.map(note=>`<p class="muted">${esc(note)}</p>`).join('')}${proposal.unplaced?`<p class="warning">${proposal.unplaced} activities need another day. BLOOM has left room for rest.</p>`:''}${proposal.conflicts.map(note=>`<p class="warning">${esc(note)}</p>`).join('')}<div class="proposal-list">${proposal.blocks.map((t,i)=>`<label class="proposal-block"><input type="checkbox" name="proposed" value="${i}" checked><span><small>${esc(labelDay(t.day,true))} · ${esc(labelTime(t.time))} · ${t.minutes} min</small><strong>${esc(t.title)}</strong><span>${esc(t.reason)}</span></span></label>`).join('')||'<div class="companion-empty"><h3>No new sessions fit yet.</h3><p>Add chapter progress or adjust your availability. Existing sessions are kept.</p></div>'}</div>${proposal.breaks.length?`<p class="muted">${proposal.breaks.length} breaks included between study blocks.</p>`:''}${errorLine}${actions('Approve selected sessions',btn('close','Keep current plan'))}</form>`);
  form().onsubmit=async event=>{event.preventDefault();const indexes=new FormData(form()).getAll('proposed').map(Number),next=structuredClone(state);for(const index of indexes){const task=proposal.blocks[index];if(!task)continue;const issue=conflict(next,task);if(issue){error(issue+' No changes were saved.');return;}const old=next.tasks.findIndex(t=>t.id===task.id);if(old<0)next.tasks.push(task);else next.tasks[old]=task;}if(await commit(next,indexes.length+' study sessions approved.')){if(state.tourStatus==='pending')requestAnimationFrame(welcome);}};
}
async function applyBoardPlan(planKey: 'full-chapter' | 'unit-sprint' | 'pyq-marathon' | 'mock-exam', d = today()) {
  const plans = {
    'full-chapter': [
      {
        title: 'Electric Charges & Fields · Full Chapter Revision & Derivations',
        minutes: 45,
        subject: 'physics',
        chapter: 'physics-1-1',
        priority: 'High' as const,
        reason: 'Complete NCERT chapter concepts, Gauss Law derivations & key formulas'
      },
      {
        title: 'Solutions · Full Chapter Concept & Numerical Mastery',
        minutes: 45,
        subject: 'chemistry',
        chapter: 'chemistry-1-1',
        priority: 'High' as const,
        reason: 'Raoult Law, Colligative properties & NCERT numericals (7 Marks)'
      },
      {
        title: 'Electric Charges & Fields · 15 Board PYQs Marathon',
        minutes: 45,
        subject: 'physics',
        chapter: 'physics-1-1',
        priority: 'High' as const,
        reason: 'Past 5-year CBSE board examination questions with step marking'
      }
    ],
    'unit-sprint': [
      {
        title: 'Electrostatics & Current Electricity · 16-Mark Unit Revision',
        minutes: 60,
        subject: 'physics',
        chapter: 'physics-1-1',
        priority: 'High' as const,
        reason: 'Official CBSE Units 1 & 2 · Multi-chapter theory and circuit numericals'
      },
      {
        title: 'Organic Chemistry · 33-Mark Comprehensive Reactions & Conversions',
        minutes: 60,
        subject: 'chemistry',
        chapter: 'chemistry-6-1',
        priority: 'High' as const,
        reason: 'Official CBSE Units 6-10 · Name reactions, distinction tests & roadmaps'
      },
      {
        title: 'Calculus: Derivatives & Integrals · 35-Mark Problem Marathon',
        minutes: 60,
        subject: 'math',
        chapter: 'math-3-1',
        priority: 'High' as const,
        reason: 'Official CBSE Unit 3 · Continuity, AOD, integrals and differential equations'
      }
    ],
    'pyq-marathon': [
      {
        title: 'Physics 042 · 15 Authentic Board PYQs Marathon',
        minutes: 45,
        subject: 'physics',
        chapter: 'physics-1-1',
        priority: 'High' as const,
        reason: 'CBSE 2020-2025 past questions across 1M, 2M, 3M and 5M patterns'
      },
      {
        title: 'Chemistry 043 · 15 Authentic Board PYQs Marathon',
        minutes: 45,
        subject: 'chemistry',
        chapter: 'chemistry-1-1',
        priority: 'High' as const,
        reason: 'CBSE 2020-2025 past questions: Physical numericals & Organic conversions'
      },
      {
        title: 'Mathematics 041 · 15 Authentic Board PYQs Marathon',
        minutes: 45,
        subject: 'math',
        chapter: 'math-3-1',
        priority: 'High' as const,
        reason: 'CBSE 2020-2025 past questions: Calculus & Vector 3D proof problems'
      }
    ],
    'mock-exam': [
      {
        title: 'Physics 042 · Full Official Blueprint Mock Examination (70 Marks)',
        minutes: 180,
        subject: 'physics',
        chapter: 'physics-1-1',
        priority: 'High' as const,
        reason: 'Full 3-Hour timed board exam simulation: 33 questions Sections A through E'
      }
    ]
  };

  const selectedPlan = plans[planKey] || plans['full-chapter'];
  const ns = structuredClone(state);
  
  for (const item of selectedPlan) {
    const slot = freeSlot(ns, {
      id: crypto.randomUUID(),
      title: item.title,
      day: d,
      time: '',
      minutes: item.minutes,
      subject: item.subject,
      chapter: item.chapter,
      priority: item.priority,
      due: d,
      done: false
    });

    ns.tasks.push({
      id: crypto.randomUUID(),
      title: item.title,
      day: d,
      time: slot || '',
      minutes: item.minutes,
      subject: item.subject,
      chapter: item.chapter,
      priority: item.priority,
      due: d,
      done: false,
      reason: item.reason
    });
  }

  void host.closeDialog(modal);
  const planNames: Record<string, string> = {
    'full-chapter': 'Full-Chapter Board Mastery',
    'unit-sprint': '16–35M Unit Sprint',
    'pyq-marathon': 'Board PYQ Marathon',
    'mock-exam': '3-Hour Timed Mock Exam'
  };
  await commit(ns, `⚡ ${planNames[planKey] || 'Study Plan'} added to ${labelDay(d, true)}!`);
  render();
}
function boardPlanDialog(targetDay = date || today()){
  show('CBSE Board Study Plans', `
    <div class="task-composer-form" style="gap:14px;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:13px;color:#0f172a;">Target Date: ${esc(labelDay(targetDay, true))}</strong>
          <span style="font-size:11px;font-weight:700;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:9999px;">CBSE Class XII</span>
        </div>
        <p style="font-size:11.5px;color:#64748b;margin:4px 0 0;">Select a pre-calibrated multi-session study plan. Sprints schedule realistic study blocks with breaks into your available hours.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <!-- Card 1: Full-Chapter Mastery Sprint -->
        <article class="board-plan-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">📚</span>
              <div>
                <strong style="font-size:13.5px;color:#0f172a;">Full-Chapter Mastery Sprints</strong>
                <span style="display:block;font-size:11px;color:#1e40af;font-weight:700;">Recommended for Board Students</span>
              </div>
            </div>
            <span style="font-size:11px;font-weight:700;color:#15803d;background:#dcfce7;padding:3px 8px;border-radius:9999px;">2h 15m · 3 Blocks</span>
          </div>
          <p style="font-size:11.5px;color:#475569;margin:0;">Covers full chapter theory, NCERT derivations, and 15 authentic board questions. Solves chapters holistically across all exam sections (A–E).</p>
          <div style="background:#f1f5f9;border-radius:8px;padding:8px 10px;font-size:11px;color:#334155;display:flex;flex-direction:column;gap:4px;">
            <div>• <strong>Electric Charges & Fields</strong> · Full Chapter Revision & Derivations (45 min)</div>
            <div>• <strong>Solutions</strong> · Full Chapter Concept & Numerical Mastery (45 min)</div>
            <div>• <strong>Electric Charges & Fields</strong> · 15 Board PYQs Marathon (45 min)</div>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button type="button" class="button primary" data-action="apply-board-plan" data-value="full-chapter" style="font-size:12px;padding:6px 14px;">
              Add Full-Chapter Plan ✓
            </button>
          </div>
        </article>

        <!-- Card 2: High-Yield Unit Sprint -->
        <article class="board-plan-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">📦</span>
              <div>
                <strong style="font-size:13.5px;color:#0f172a;">High-Yield Unit Sprints (Multi-Chapter)</strong>
                <span style="display:block;font-size:11px;color:#7e22ce;font-weight:700;">16 to 35 Official CBSE Marks</span>
              </div>
            </div>
            <span style="font-size:11px;font-weight:700;color:#7e22ce;background:#f3e8ff;padding:3px 8px;border-radius:9999px;">3h 00m · 3 Blocks</span>
          </div>
          <p style="font-size:11.5px;color:#475569;margin:0;">Multi-chapter marathon connecting entire syllabus units. Secures major marks clusters across Electrostatics, Organic Chemistry, and Calculus.</p>
          <div style="background:#f1f5f9;border-radius:8px;padding:8px 10px;font-size:11px;color:#334155;display:flex;flex-direction:column;gap:4px;">
            <div>• <strong>Electrostatics & Current Electricity</strong> · 16-Mark Unit Revision (60 min)</div>
            <div>• <strong>Organic Chemistry</strong> · 33-Mark Comprehensive Reactions & Conversions (60 min)</div>
            <div>• <strong>Calculus: Derivatives & Integrals</strong> · 35-Mark Problem Marathon (60 min)</div>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button type="button" class="button primary" data-action="apply-board-plan" data-value="unit-sprint" style="font-size:12px;padding:6px 14px;">
              Add High-Yield Unit Plan ✓
            </button>
          </div>
        </article>

        <!-- Card 3: Board PYQ Marathon -->
        <article class="board-plan-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">🎯</span>
              <div>
                <strong style="font-size:13.5px;color:#0f172a;">Past 5-Year Board PYQ Marathon</strong>
                <span style="display:block;font-size:11px;color:#0284c7;font-weight:700;">45 Authentic Board Questions</span>
              </div>
            </div>
            <span style="font-size:11px;font-weight:700;color:#0284c7;background:#e0f2fe;padding:3px 8px;border-radius:9999px;">2h 15m · 3 Blocks</span>
          </div>
          <p style="font-size:11.5px;color:#475569;margin:0;">Solve 15 authentic board questions per subject with CBSE step-wise marking schemes to build speed and accuracy.</p>
          <div style="background:#f1f5f9;border-radius:8px;padding:8px 10px;font-size:11px;color:#334155;display:flex;flex-direction:column;gap:4px;">
            <div>• <strong>Physics 042</strong> · 15 Authentic Board PYQs Marathon (45 min)</div>
            <div>• <strong>Chemistry 043</strong> · 15 Authentic Board PYQs Marathon (45 min)</div>
            <div>• <strong>Mathematics 041</strong> · 15 Authentic Board PYQs Marathon (45 min)</div>
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button type="button" class="button primary" data-action="apply-board-plan" data-value="pyq-marathon" style="font-size:12px;padding:6px 14px;">
              Add PYQ Marathon Plan ✓
            </button>
          </div>
        </article>

        <!-- Card 4: Full 3-Hour Timed Mock Exam -->
        <article class="board-plan-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:18px;">⏱️</span>
              <div>
                <strong style="font-size:13.5px;color:#0f172a;">Full 3-Hour Timed CBSE Mock Exam</strong>
                <span style="display:block;font-size:11px;color:#b45309;font-weight:700;">Official Exam Blueprint (70 Marks)</span>
              </div>
            </div>
            <span style="font-size:11px;font-weight:700;color:#b45309;background:#fef3c7;padding:3px 8px;border-radius:9999px;">3h 00m · 1 Full Exam</span>
          </div>
          <p style="font-size:11.5px;color:#475569;margin:0;">Simulate actual exam hall conditions: Section A (MCQs), B (2M), C (3M), D (Case-study 4M), and E (5M Long Answer).</p>
          <div style="display:flex;justify-content:flex-end;margin-top:4px;">
            <button type="button" class="button outline" data-action="apply-board-plan" data-value="mock-exam" style="font-size:12px;padding:6px 14px;">
              Schedule 3-Hour Mock Exam ✓
            </button>
          </div>
        </article>
      </div>

      <div class="dialog-actions">
        <button type="button" class="button outline" data-action="add-task">Create Custom Task Instead</button>
        <button type="button" class="button quiet" data-action="close">Close</button>
      </div>
    </div>
  `);
}
function syllabusPage(){
  const sub=subjectById(subject)!, list=chapters.filter(c=>c.subject===subject);
  const tracked=list.filter(c=>state.progress[c.id]).length, ratio=list.length?tracked/list.length:0;
  return `<div class="page"><div class="intro"><p class="eyebrow">CBSE CLASS XII · 2026–27</p><h1>Your academic world.</h1></div>
  <div class="subject-tabs" aria-label="Subjects" data-tour="syllabus">${subjects.map(s=>`<button class="button outline" data-action="subject" data-value="${s.id}" aria-pressed="${subject===s.id}">${esc(s.title)}</button>`).join('')}</div>
  <div class="section-head syllabus-head"><div><h2>${esc(sub.title)}</h2><p>${list.filter(c=>['Completed','Practising','Revised','Exam Ready','Needs revision'].includes(state.progress[c.id]?.status)).length} of ${list.length} learned · ${tracked} with a status recorded · <a href="${sub.source}" target="_blank" rel="noreferrer">CBSE syllabus ${icon('arrow-up-right')}</a></p><div class="progress-track" data-tour="progress" role="progressbar" aria-label="${esc(sub.title)} chapters with a status recorded" aria-valuemin="0" aria-valuemax="${list.length}" aria-valuenow="${tracked}"><span class="progress-fill" data-progress="${ratio}" data-progress-key="syllabus-${subject}"></span></div></div>${btn('select-all',selected.size===list.length?'Clear selection':'Select all','check','outline')}</div>
  <p class="muted source-note">${esc(sub.note)}</p>
  <p class="personal-note">School teaching is complete. This tracker is for your own learning and revision, so nothing is marked until you choose a status.</p>
  <div class="bulk-bar"><label><span class="sr">Bulk status</span><select id="bulk-status">${option('','Set selected status')}${learningStatuses.map(x=>option(x,statusLabel(x))).join('')}</select></label><button class="button primary" data-action="bulk" ${selected.size?'':'disabled'}>Apply to ${selected.size}</button></div>
  <div class="rows">${list.map(c=>{
    const p=state.progress[c.id];
    return `<article class="chapter-row"><label class="chapter-check"><input type="checkbox" data-select="${c.id}"${checked(selected.has(c.id))}><span><strong>${esc(c.title)}</strong><small>${esc(c.allocation)}${c.allocationMarks===null?'':' · shares '+c.allocationMarks+' marks across this unit'}</small></span></label>
    <div class="chapter-right"><span class="status ${p?'marked':''}">${p?statusLabel(p.status):'Unmarked'}</span>${p?.next?`<small>Review ${esc(dateLabel(p.next))}</small>`:''}</div>${tool('chapter','Edit '+c.title,'pencil',c.id)}</article>`;
  }).join('')}</div></div>`;
}
function testsPage(){
  return `<div class="page"><div class="section-head intro"><div><p class="eyebrow">DATES & COVERAGE</p><h1>Tests</h1></div>${btn('add-test','Add test','plus','outline')}</div>
  <section class="import-banner"><div><p class="eyebrow">YOUR SCHOOL PLANNER</p><h2>Bring your test dates in.</h2><p>Upload a PDF or photo. Check the dates, subjects and chapters before adding them.</p></div>${btn('import-planner','Upload test planner','plus','primary')}</section>
  <section><div class="section-head"><h2>School tests</h2></div><div class="rows">${[...state.tests].sort((a,b)=>a.day.localeCompare(b.day)).map(t=>`<article class="test-row"><div class="row-main">${badge(t.subject)}<strong>${esc(t.title)}</strong><small>${t.coverage.length?`${t.coverage.length} chapters`:'Coverage not set'}</small></div><span class="row-time">${esc(dateLabel(t.day))}</span>${tool('edit-test','Edit '+t.title,'pencil',t.id)}</article>`).join('')||'<div class="empty-line">No school tests added.</div>'}</div></section>
  <section class="board-list"><div class="section-head"><div><h2>Board exams</h2><p>CBSE Class XII · 2027 · 10:30 am–1:30 pm IST</p></div><a class="button outline" href="${dateSource}" target="_blank" rel="noreferrer">Official dates ${icon('arrow-up-right')}</a></div>
  <div class="rows">${subjects.map(s=>`<article class="test-row"><div class="row-main"><strong>${esc(s.title)}</strong><small>Subject ${s.code}</small></div><span class="row-time">${esc(dateLabel(s.date))}</span></article>`).join('')}</div></section></div>`;
}
function profilePage(){
  return `<div class="page profile-page"><div class="intro"><p class="eyebrow">YOUR STUDY SPACE</p><h1>Profile</h1></div>
  <section><div class="profile-top">${avatar()}<div><h2>${esc(state.name)}</h2><p class="muted">Local preview</p></div>${tool('rename','Edit name','pencil')}</div>
  <div class="profile-actions"><label class="button outline file-button">${icon('image-plus')} ${state.avatar?'Change photo':'Choose photo'}<input id="avatar-input" type="file" accept="image/*" aria-label="${state.avatar?'Change photo':'Choose photo'}"></label>${state.avatar?btn('remove-photo','Remove photo','trash-2'):''}</div></section>
  <section class="settings-list"><h2>Personalisation</h2><div class="profile-actions">${btn('personalisation-routine','Daily routine','clock-3','outline')}${btn('personalisation-study','Study rhythm','sun','outline')}${btn('personalisation-priorities','Academic priorities','book-open','outline')}</div><h2>Preferences</h2><div class="rows"><div class="settings-row"><div><strong>Reduce motion</strong></div><label class="switch"><span class="sr">Reduce motion</span><input type="checkbox" id="motion"${checked(state.reduceMotion)}><span></span></label></div>
  <div class="settings-row"><strong>Evening colours</strong><label class="switch"><span class="sr">Evening colours</span><input type="checkbox" id="dark-mode"${checked(state.darkMode)}><span></span></label></div>
  <div class="settings-row"><div><strong>Typical study time</strong><small>${state.defaults?esc(labelTime(state.defaults.start)+' to '+labelTime(state.defaults.end)+(state.defaults.lateStart?' · later from '+labelTime(state.defaults.lateStart):'')):'Not set'}</small></div>${tool('routine','Edit typical study time','pencil')}</div>
  <div class="settings-row"><strong>Quick guide</strong>${btn('guide','Open guide','arrow-right')}</div><div class="settings-row"><strong>Show me around</strong>${btn('replay-tour','Replay tour','arrow-right')}</div></div></section><p class="local-note">Preview records and photos stay in this browser. Use sample information on shared devices.</p></div>`;
}
function morePage(){return `<div class="page"><div class="intro"><p class="eyebrow">MAKE IT YOURS</p><h1>Your space</h1><p class="muted">All your study tools, without crowding Today.</p></div><div class="space-links">${[['focus','Focus','A little time for one thing.'],['review','Revision & mistakes','Revisit what needs another look.'],['results','Test analysis','Record checked marks and notice progress.'],['insights','Progress','Your actual study activity.'],['derivations','Derivations & Theorems','Master 20 Physics derivations and 10 Math proofs with step marking.'],['roadmaps','Organic Synthesis & Distinction Hub','One-step distinction tests and 29 named organic reactions.'],['practicals','Lab Practicals & Viva','CBSE 30-mark practical manual, salt analysis, titrations & Viva cards.'],['mock-exam','Mock Exam Simulator','Full 3-hour timed board exam with section jumper and rubrics.'],['formulas','Master Formula Handbook','SI units, dimensional formulas, and rapid equation search.'],['soundscape','Cognitive Focus Soundscape','10Hz Alpha and 40Hz Gamma binaural beats focus generator.'],['english-studio','English Literature & Writing Studio','Official rubrics, word counters, character psychology & poetic devices.'],['pe-studio','PE Fixture & Sports Science Studio','Knockout tournament fixture generator, Byes math, postural therapy & PFI.'],['resources','Papers & practicals','Official papers and your school checklist.'],['writing','Answer-writing lab','Practise and review with a marking scheme.'],['letters','Letter to future you','A note for a day you choose.'],['reminders','Reminders','Gentle prompts, on your terms.'],['profile','Profile','Your photo, routine and accessibility.'],['vault','Privacy & sync','Lock, back up and connect your devices.']].map(([id,label,copy])=>`<a href="#${id}" data-nav="${id}"><div><h2>${label}</h2><p>${copy}</p></div>${icon('arrow-right')}</a>`).join('')}</div></div>`;}
function academicsPage(){return renderAcademicHub(subject,academicChapterId,state,selected);}
function academicWorkspacePage(){return renderAcademicWorkspace(activeActivityId,state);}
async function persistAcademicActivity(id:string,status:'paused'|'completed'){
  const definition=activityById(id),activityForm=document.querySelector<HTMLFormElement>('#academic-activity-form');
  if(!definition||!activityForm)return;
  const data=new FormData(activityForm),completedSteps=data.getAll('steps').map(String),attemptText=String(data.get('questionsAttempted')??'').trim(),correctText=String(data.get('questionsCorrect')??'').trim(),incorrectText=String(data.get('questionsIncorrect')??'').trim();
  const parseCount=(value:string)=>value===''?undefined:/^\d+$/.test(value)?Number(value):NaN;
  const attempted=parseCount(attemptText),correct=parseCount(correctText),incorrect=parseCount(incorrectText);
  if([attempted,correct,incorrect].some(value=>Number.isNaN(value))){announce('Enter whole numbers for question counts.');return;}
  const understanding=String(data.get('understanding')??'');
  const result=saveAcademicActivity(state,id,{status,completedSteps,questionsAttempted:attempted,questionsCorrect:correct,questionsIncorrect:incorrect,doubt:String(data.get('doubt')??''),notes:String(data.get('notes')??''),understanding:ratings.includes(understanding as Rating)?understanding as Rating:undefined},today());
  if('error'in result){announce(result.error);return;}
  const saved=await commit(result.state,status==='completed'?'Activity saved. Topic status remains yours to update.':'Progress saved. You can continue later.',false);
  if(saved&&status==='completed')route('syllabus');
}
const host:Host={getState:()=>state,commit,show:(title,html)=>{show(title,html);return modal;},closeDialog:dialog=>animateDialogExit(dialog??modal),announce,navigate:route};
const pages:Record<string,()=>string>={vault:()=>renderVaultPage(host),today:todayPage,planner:plannerPage,syllabus:academicsPage,academics:academicsPage,'academic-activity':academicWorkspacePage,tests:testsPage,profile:profilePage,more:morePage};
for(const id of ['focus','review','results','insights'])pages[id]=()=>renderStudyPage(id,host);
for(const id of ['garden','resources','writing','letters','reminders'])pages[id]=()=>renderLifePage(id,host);
for(const id of ['derivations','roadmaps','practicals','mock-exam','formulas','soundscape','english-studio','pe-studio'])pages[id]=()=>`<div class="page page-studio"><div id="studio-mount-root"></div></div>`;
initStudyTools(host);initLifeTools(host);initVault(host);initMotion();
CommandPalette.init(route, () => Boolean(state.onboarding?.completed));
initOnboarding(host,()=>{route('today');date=today();planDialog();});
function mountStudioIfActive(){
  const mount=document.querySelector<HTMLElement>('#studio-mount-root');
  if(!mount)return;
  if(page==='derivations')new DerivationLabUI(mount).render();
  else if(page==='roadmaps')new ReactionRoadmapUI(mount).render();
  else if(page==='practicals')new PracticalsLabUI(mount).render();
  else if(page==='mock-exam')new MockExamUI(mount).render();
  else if(page==='formulas')new FormulaHandbookUI(mount).render();
  else if(page==='soundscape')new SoundscapeUI(mount).render();
  else if(page==='english-studio')new EnglishStudioUI(mount).render();
  else if(page==='pe-studio')new PEStudioUI(mount).render();
}
function motion(){
  document.documentElement.classList.toggle('reduce',state.reduceMotion||reduced.matches);
  const root=document.querySelector<HTMLElement>('#content>.page');
  if(root)observeReveals(root,page);
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((el,index)=>animateProgress(el,el.dataset.progressKey??page+'-'+index,Number(el.dataset.progress)||0));
  if(justDone)animateTaskCompletion(justDone);
}
function render(){
  const previous=captureLayout();
  const isOnboarding = !state.onboarding?.completed;
  document.querySelectorAll('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]').forEach(el => el.remove());
  app.innerHTML=!isOnboarding?shell((pages[page]??todayPage)()):renderOnboarding(host);
  document.documentElement.classList.toggle('dark',state.darkMode);
  mountStudioIfActive();
  motion();animateLayout(previous);refreshNavIndicator();
}
function route(p:string, focus=true){
  if(!pages[p])p='today';
  if(page!==p)selected.clear();
  const previous=page,previousIndex=nav.findIndex(([id])=>id===previous),nextIndex=nav.findIndex(([id])=>id===p);
  const direction=previousIndex>=0&&nextIndex>=0&&previousIndex!==nextIndex?(nextIndex>previousIndex?'forward':'back'):'forward';
  const outgoing=document.querySelector<HTMLElement>('#content>.page')??undefined;
  page=p;
  if(location.hash!=='#'+p)history.replaceState(null,'','#'+p);
  window.scrollTo({top:0,behavior:state.reduceMotion||reduced.matches?'instant':'smooth'});
  render();animatePage(direction,outgoing);
  if(focus)document.querySelector<HTMLElement>('#content')?.focus({preventScroll:true});
}
function show(title:string,body:string){
  modal.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${esc(title)}</h2>${tool('close','Close','x')}</div>${body}`;
  if(!modal.open)modal.showModal();
  else modal.querySelector<HTMLElement>('input,select,button')?.focus();
}
function taskDialog(t?:Task,title='Add task',time=''){
  const b=t??{id:crypto.randomUUID(),title:'',day:date,time,minutes:45,subject:'physics',chapter:'',priority:'Normal' as const,due:'',done:false};
  const existing=taskById(b.id), moving=existing&&existing.day!==b.day;

  let curSubject = b.subject || 'physics';
  let curScope: 'chapter' | 'unit' | 'pyq' | 'topic' = 'chapter';
  let curChapter = b.chapter || (chapters.find(c => c.subject === curSubject)?.id ?? '');
  let curUnit = `${curSubject}-unit-0`;
  let curType = 'notes';
  let curQCount = 10;
  let curMinutes = b.minutes || 45;
  let curPriority: Task['priority'] = b.priority || 'Normal';
  let titleManuallyChanged = Boolean(existing && b.title);

  if (existing) {
    const tl = b.title.toLowerCase();
    if (tl.includes('unit') || tl.includes('mark marathon') || tl.includes('marks')) curScope = 'unit';
    else if (tl.includes('pyq') || tl.includes('past 5')) { curScope = 'pyq'; curType = 'pyq'; }
    else if (tl.includes('derivation') || tl.includes('drill')) curScope = 'topic';
    else curScope = 'chapter';

    if (tl.includes('pyq')) curType = 'pyq';
    else if (tl.includes('question') || tl.includes('exemplar') || tl.includes('ncert')) curType = 'questions';
    else if (tl.includes('short note') || tl.includes('formula')) curType = 'short-notes';
    else if (tl.includes('active recall') || tl.includes('flashcard')) curType = 'active-recall';
    else if (tl.includes('derivation') || tl.includes('proof')) curType = 'derivations';
    else if (tl.includes('mock') || tl.includes('test')) curType = 'mock';
    else if (tl.includes('revision')) curType = 'revision';
    else curType = 'notes';

    const qMatch = b.title.match(/(\d+)\s*Qs/i);
    if (qMatch) curQCount = parseInt(qMatch[1], 10) || 10;
  }

  const TASK_TYPES = [
    { id: 'notes', label: 'Full Chapter Revision', icon: '📚', defaultMin: 45, suffix: 'Full Chapter Revision & Concepts' },
    { id: 'pyq', label: 'PYQ Practice', icon: '🎯', defaultMin: 45, suffix: 'Board PYQs Practice', isQuestions: true },
    { id: 'questions', label: 'NCERT & Exemplar', icon: '🧪', defaultMin: 45, suffix: 'NCERT & Exemplar Problems', isQuestions: true },
    { id: 'short-notes', label: 'Formula & Short Notes', icon: '📑', defaultMin: 25, suffix: 'Formula & Short Notes' },
    { id: 'active-recall', label: 'Active Recall', icon: '⚡', defaultMin: 20, suffix: 'Active Recall Drill' },
    { id: 'derivations', label: 'Derivations & Proofs', icon: '📐', defaultMin: 35, suffix: 'Derivations & Proofs' },
    { id: 'mock', label: 'Timed Mock Test', icon: '⏱️', defaultMin: 60, suffix: 'Timed Mock Test' }
  ];

  const QUESTION_PRESETS = [
    { count: 5, min: 15, label: '5 Qs (~15m)' },
    { count: 10, min: 30, label: '10 Qs (~30m)' },
    { count: 15, min: 45, label: '15 Qs (~45m)' },
    { count: 20, min: 60, label: '20 Qs (~60m)' }
  ];

  const buildTitle = (scope: string, sub: string, chap: string, unitVal: string, typeId: string, qCount: number) => {
    const subObj = subjectById(sub);
    const tObj = TASK_TYPES.find(x => x.id === typeId) || TASK_TYPES[0];

    if (scope === 'unit') {
      const uIndex = parseInt(unitVal.split('-unit-')[1] || '0', 10);
      const group = subObj?.groups[uIndex];
      const unitName = group ? group[0] : (subObj?.title || 'CBSE');
      const marks = group && group[1] !== null ? ` (${group[1]} Marks)` : '';
      if (tObj.isQuestions) return `${unitName}${marks} · PYQ Practice (${qCount} Qs)`;
      return `${unitName}${marks} · Comprehensive Unit Revision`;
    }

    if (scope === 'pyq') {
      const ch = chapterById(chap);
      const prefix = ch ? ch.title : (subObj?.title ?? 'CBSE');
      return `${prefix} · Past 5 Years Board PYQs (${qCount} Qs)`;
    }

    if (scope === 'topic') {
      const ch = chapterById(chap);
      const prefix = ch ? ch.title : (subObj?.title ?? 'CBSE');
      return `${prefix} · Derivation & Topic Drill`;
    }

    // Default 'chapter' scope
    const ch = chapterById(chap);
    const prefix = ch ? ch.title : (subObj?.title ?? 'CBSE');
    if (tObj.isQuestions) {
      return `${prefix} · ${tObj.suffix} (${qCount} Qs)`;
    }
    return `${prefix} · ${tObj.suffix}`;
  };

  const getAutoSlot = (targetDay: string, dur: number) => {
    return freeSlot(state, {
      id: b.id,
      title: 'Study task',
      day: targetDay,
      time: '',
      minutes: dur,
      subject: curSubject,
      chapter: curChapter,
      priority: curPriority,
      due: b.due,
      done: false
    });
  };

  let curSlot = b.time || getAutoSlot(b.day, curMinutes);
  let curTitle = b.title || buildTitle(curScope, curSubject, curChapter, curUnit, curType, curQCount);
  const isQuestionType = TASK_TYPES.find(x => x.id === curType)?.isQuestions ?? false;

  show(title, `
    <form id="task-form" class="task-composer-form">
      <!-- 1. Subject Selector (Segmented Chips) -->
      <div class="composer-field">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <label class="composer-label">1. Subject</label>
          <span style="font-size:11px;font-weight:700;color:#64748b;">CBSE Class XII</span>
        </div>
        <div class="composer-subject-bar">
          ${subjects.map(s => `
            <button type="button" class="composer-sub-btn ${s.id === curSubject ? 'active' : ''}" data-sub="${s.id}">
              <span>${s.id === 'physics' ? '⚛️' : s.id === 'chemistry' ? '🧪' : s.id === 'math' ? '📐' : s.id === 'english' ? '📖' : '🏃'}</span>
              <strong>${s.title}</strong>
            </button>
          `).join('')}
        </div>
        <input type="hidden" name="subject" value="${curSubject}">
      </div>

      <!-- 2. Study Scope Selector -->
      <div class="composer-field">
        <label class="composer-label">2. Study Scope</label>
        <div class="composer-scope-bar">
          <button type="button" class="composer-scope-btn ${curScope === 'chapter' ? 'active' : ''}" data-scope="chapter">
            <span>📚</span>
            <strong>Full Chapter (Recommended)</strong>
          </button>
          <button type="button" class="composer-scope-btn ${curScope === 'unit' ? 'active' : ''}" data-scope="unit">
            <span>📦</span>
            <strong>Whole Unit (16–35M)</strong>
          </button>
          <button type="button" class="composer-scope-btn ${curScope === 'pyq' ? 'active' : ''}" data-scope="pyq">
            <span>🎯</span>
            <strong>Board PYQ Marathon</strong>
          </button>
          <button type="button" class="composer-scope-btn ${curScope === 'topic' ? 'active' : ''}" data-scope="topic">
            <span>🔬</span>
            <strong>Topic Drill</strong>
          </button>
        </div>
        <input type="hidden" name="study_scope" id="composer-scope-input" value="${curScope}">
      </div>

      <!-- 3. Target Scope Selection (Chapter or Unit Dropdown) -->
      <div class="composer-field" id="composer-chapter-box" ${curScope === 'unit' ? 'hidden' : ''}>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <label class="composer-label">3. Chapter</label>
          <span id="composer-chapter-weight" style="font-size:11px;color:#0284c7;font-weight:700;"></span>
        </div>
        <select name="chapter" id="composer-chapter-select" class="composer-select">
          ${chapterOpts(curSubject, curChapter)}
        </select>
      </div>

      <div class="composer-field" id="composer-unit-box" ${curScope === 'unit' ? '' : 'hidden'}>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <label class="composer-label">3. Official CBSE Unit</label>
          <span style="font-size:11px;color:#7e22ce;font-weight:700;">16 to 35 Marks Allocation</span>
        </div>
        <select name="unit_select" id="composer-unit-select" class="composer-select">
          ${unitOpts(curSubject, curUnit)}
        </select>
      </div>

      <!-- 4. Task Type Grid -->
      <div class="composer-field">
        <label class="composer-label">4. Task Type</label>
        <div class="composer-type-grid">
          ${TASK_TYPES.map(x => `
            <button type="button" class="composer-type-btn ${x.id === curType ? 'active' : ''}" data-type="${x.id}">
              <span class="type-icon">${x.icon}</span>
              <span class="type-text">${x.label}</span>
            </button>
          `).join('')}
        </div>
        <input type="hidden" name="task_type" value="${curType}">
      </div>

      <!-- 5. Dynamic Number of Questions (Only for PYQ / Question Practice) -->
      <div id="composer-questions-box" class="composer-questions-card" ${isQuestionType ? '' : 'hidden'}>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:12px;color:#166534;display:flex;align-items:center;gap:6px;">
            <span>🎯</span> Number of CBSE Questions to Practice
          </strong>
          <small style="color:#15803d;font-size:11px;font-weight:600;">~3 min per board question</small>
        </div>
        <div class="composer-q-chips">
          ${QUESTION_PRESETS.map(q => `
            <button type="button" class="composer-q-chip ${q.count === curQCount ? 'active' : ''}" data-count="${q.count}" data-min="${q.min}">
              ${q.label}
            </button>
          `).join('')}
          <div style="display:flex;align-items:center;gap:4px;margin-left:auto;">
            <input type="number" id="custom-q-count" min="1" max="100" placeholder="Qty" value="${[5,10,15,20].includes(curQCount) ? '' : curQCount}" style="width:58px;padding:4px 6px;font-size:11.5px;border-radius:6px;border:1px solid #86efac;text-align:center;">
            <span style="font-size:11px;color:#166534;font-weight:600;">Qs</span>
          </div>
        </div>
      </div>

      <!-- 6. Duration Selector (for non-question tasks) -->
      <div class="composer-field" id="composer-duration-box" ${isQuestionType ? 'hidden' : ''}>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <label class="composer-label">5. Duration</label>
          <div style="display:flex;align-items:center;gap:4px;">
            <input type="number" name="minutes" id="composer-minutes-input" min="5" max="240" required value="${curMinutes}" style="width:65px;padding:3px 6px;font-size:12px;font-weight:700;border-radius:6px;border:1px solid #cbd5e1;text-align:center;">
            <span style="font-size:11.5px;color:#64748b;font-weight:600;">min</span>
          </div>
        </div>
        <div class="composer-dur-chips">
          ${[25, 30, 45, 60, 90].map(m => `
            <button type="button" class="composer-dur-chip ${m === curMinutes ? 'active' : ''}" data-min="${m}">
              ${m} min ${m === 45 ? '⚡' : ''}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- 7. Automated Study Slot (No manual clock typing required!) -->
      <div class="composer-field">
        <div class="composer-autoslot-card" id="composer-autoslot-display">
          <div class="ios-icon-tile ios-tile-green" style="width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">⚡</div>
          <div style="flex:1;min-width:0;">
            <strong style="display:block;font-size:11.5px;color:#166534;">Auto-scheduled into study routine:</strong>
            <span id="autoslot-text" style="font-size:11px;color:#15803d;font-weight:600;">
              ${curSlot ? `${labelTime(curSlot)} – ${labelTime(clock(minute(curSlot) + curMinutes))} (Next open study window)` : 'Flexible / Any time today'}
            </span>
          </div>
          <button type="button" id="btn-toggle-time-override" style="background:none;border:none;color:#166534;font-size:11px;font-weight:700;text-decoration:underline;cursor:pointer;flex-shrink:0;">
            Custom time
          </button>
        </div>
        <div id="manual-time-container" style="display:${b.time && !existing ? 'block' : 'none'};margin-top:8px;">
          <div class="form-pair">
            <label>Date<input name="day" id="composer-day-input" type="date" value="${b.day}" required></label>
            <label>Clock Time<input name="time" id="composer-time-input" type="time" value="${curSlot}"></label>
          </div>
        </div>
        <input type="hidden" name="time_auto" id="composer-time-auto" value="${curSlot}">
      </div>

      <!-- 8. Task Name (Auto-Generated & Editable) -->
      <div class="composer-field">
        <label class="composer-label">Task Name <small style="font-size:10px;color:#94a3b8;font-weight:500;">(Auto-composed · edit anytime)</small></label>
        <input name="title" id="composer-title-input" required maxlength="140" value="${esc(curTitle)}" class="composer-title-input">
      </div>

      <!-- 9. Board Priority -->
      <div class="composer-field" style="display:flex;justify-content:space-between;align-items:center;background:#fffdfa;border:1px solid #fef3c7;border-radius:10px;padding:8px 12px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:13px;">🎯</span>
          <span style="font-size:12px;font-weight:600;color:#92400e;">CBSE Board Priority:</span>
        </div>
        <div class="composer-prio-buttons" style="display:flex;gap:4px;">
          <button type="button" class="composer-prio-btn ${curPriority === 'High' ? 'active' : ''}" data-prio="High">★ High Board Priority</button>
          <button type="button" class="composer-prio-btn ${curPriority !== 'High' ? 'active' : ''}" data-prio="Normal">Standard</button>
        </div>
        <input type="hidden" name="priority" id="composer-prio-input" value="${curPriority}">
      </div>

      <div id="preset-guidance-box" hidden></div>
      ${moving ? '<p class="muted">Move this unfinished task to the selected day.</p>' : ''}
      ${errorLine}
      <div id="slot-help"></div>
      ${actions(existing ? (moving ? 'Move task' : 'Save changes') : 'Add to plan ✓', existing ? btn('delete-task', 'Delete', 'trash-2', 'danger', b.id) : '')}
    </form>
  `);

  const titleInput = modal.querySelector<HTMLInputElement>('#composer-title-input');
  const subjectBtns = modal.querySelectorAll<HTMLButtonElement>('.composer-sub-btn');
  const subjectHidden = modal.querySelector<HTMLInputElement>('[name="subject"]');
  const scopeBtns = modal.querySelectorAll<HTMLButtonElement>('.composer-scope-btn');
  const scopeHidden = modal.querySelector<HTMLInputElement>('#composer-scope-input');
  const chapterBox = modal.querySelector<HTMLElement>('#composer-chapter-box');
  const chapterSelect = modal.querySelector<HTMLSelectElement>('#composer-chapter-select');
  const unitBox = modal.querySelector<HTMLElement>('#composer-unit-box');
  const unitSelect = modal.querySelector<HTMLSelectElement>('#composer-unit-select');
  const chapterWeight = modal.querySelector<HTMLElement>('#composer-chapter-weight');
  const typeBtns = modal.querySelectorAll<HTMLButtonElement>('.composer-type-btn');
  const questionsBox = modal.querySelector<HTMLElement>('#composer-questions-box');
  const durationBox = modal.querySelector<HTMLElement>('#composer-duration-box');
  const qChips = modal.querySelectorAll<HTMLButtonElement>('.composer-q-chip');
  const customQ = modal.querySelector<HTMLInputElement>('#custom-q-count');
  const minutesInput = modal.querySelector<HTMLInputElement>('#composer-minutes-input');
  const durChips = modal.querySelectorAll<HTMLButtonElement>('.composer-dur-chip');
  const autoSlotText = modal.querySelector<HTMLElement>('#autoslot-text');
  const timeAutoHidden = modal.querySelector<HTMLInputElement>('#composer-time-auto');
  const timeInput = modal.querySelector<HTMLInputElement>('#composer-time-input');
  const toggleTimeBtn = modal.querySelector<HTMLButtonElement>('#btn-toggle-time-override');
  const manualTimeContainer = modal.querySelector<HTMLElement>('#manual-time-container');
  const prioBtns = modal.querySelectorAll<HTMLButtonElement>('.composer-prio-btn');
  const prioHidden = modal.querySelector<HTMLInputElement>('#composer-prio-input');
  const guidanceBox = modal.querySelector<HTMLDivElement>('#preset-guidance-box');

  const updateWeight = () => {
    const ch = chapterById(curChapter);
    if (chapterWeight) {
      chapterWeight.textContent = ch && ch.allocationMarks !== null ? `CBSE Allocation: ${ch.allocationMarks} Marks` : '';
    }
    const preset = cbseHighYieldPresets.find(p => p.chapterId === curChapter);
    if (guidanceBox) {
      if (preset && curScope !== 'unit') {
        guidanceBox.hidden = false;
        guidanceBox.innerHTML = `
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-left:3px solid #16a34a;border-radius:10px;padding:8px 12px;margin:4px 0;font-size:11px;line-height:1.45;color:#166534;">
            <strong style="display:block;margin-bottom:2px;color:#15803d;font-size:11.5px;">🎯 Official CBSE ${preset.marks}-Mark Focus: ${esc(preset.title)}</strong>
            <small style="color:#166534;">${esc(preset.stepMarking[0] ?? '')}</small>
          </div>
        `;
      } else {
        guidanceBox.hidden = true;
      }
    }
  };
  updateWeight();

  const refreshSlot = () => {
    const slot = getAutoSlot(b.day, curMinutes);
    curSlot = slot;
    if (timeAutoHidden) timeAutoHidden.value = slot;
    if (timeInput && manualTimeContainer?.style.display === 'none') timeInput.value = slot;
    if (autoSlotText) {
      autoSlotText.textContent = slot
        ? `${labelTime(slot)} – ${labelTime(clock(minute(slot) + curMinutes))} (Next open study window)`
        : 'Flexible / Any time today';
    }
  };

  const refreshTitle = () => {
    if (!titleManuallyChanged && titleInput) {
      titleInput.value = buildTitle(curScope, curSubject, curChapter, curUnit, curType, curQCount);
    }
  };

  if (titleInput) {
    titleInput.addEventListener('input', () => {
      titleManuallyChanged = true;
    });
  }

  scopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scopeBtns.forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      curScope = (btn.dataset.scope as any) || 'chapter';
      if (scopeHidden) scopeHidden.value = curScope;

      if (curScope === 'unit') {
        if (chapterBox) chapterBox.hidden = true;
        if (unitBox) unitBox.hidden = false;
        if (guidanceBox) guidanceBox.hidden = true;
      } else {
        if (chapterBox) chapterBox.hidden = false;
        if (unitBox) unitBox.hidden = true;
      }

      if (curScope === 'pyq') {
        curType = 'pyq';
        typeBtns.forEach(x => x.classList.toggle('active', x.dataset.type === 'pyq'));
        if (questionsBox) questionsBox.hidden = false;
        if (durationBox) durationBox.hidden = true;
        curMinutes = curQCount * 3;
      } else if (curScope === 'unit') {
        curMinutes = 60;
        if (questionsBox) questionsBox.hidden = true;
        if (durationBox) durationBox.hidden = false;
      } else if (curScope === 'topic') {
        curType = 'derivations';
        typeBtns.forEach(x => x.classList.toggle('active', x.dataset.type === 'derivations'));
        if (questionsBox) questionsBox.hidden = true;
        if (durationBox) durationBox.hidden = false;
        curMinutes = 35;
      }

      if (minutesInput) minutesInput.value = String(curMinutes);
      durChips.forEach(c => c.classList.toggle('active', Number(c.dataset.min) === curMinutes));
      updateWeight();
      refreshSlot();
      refreshTitle();
    });
  });

  subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subjectBtns.forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      curSubject = btn.dataset.sub!;
      if (subjectHidden) subjectHidden.value = curSubject;
      if (chapterSelect) {
        chapterSelect.innerHTML = chapterOpts(curSubject);
        curChapter = chapterSelect.value;
      }
      if (unitSelect) {
        unitSelect.innerHTML = unitOpts(curSubject);
        curUnit = unitSelect.value || `${curSubject}-unit-0`;
      }
      updateWeight();
      refreshTitle();
    });
  });

  if (chapterSelect) {
    chapterSelect.addEventListener('change', () => {
      curChapter = chapterSelect.value;
      updateWeight();
      refreshTitle();
    });
  }

  if (unitSelect) {
    unitSelect.addEventListener('change', () => {
      curUnit = unitSelect.value;
      refreshTitle();
    });
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      curType = btn.dataset.type!;
      const tObj = TASK_TYPES.find(x => x.id === curType);
      if (tObj?.isQuestions) {
        if (questionsBox) questionsBox.hidden = false;
        if (durationBox) durationBox.hidden = true;
        curMinutes = curQCount * 3;
      } else {
        if (questionsBox) questionsBox.hidden = true;
        if (durationBox) durationBox.hidden = false;
        curMinutes = tObj?.defaultMin ?? 45;
      }
      if (minutesInput) minutesInput.value = String(curMinutes);
      durChips.forEach(c => c.classList.toggle('active', Number(c.dataset.min) === curMinutes));
      refreshSlot();
      refreshTitle();
    });
  });

  qChips.forEach(chip => {
    chip.addEventListener('click', () => {
      qChips.forEach(x => x.classList.remove('active'));
      chip.classList.add('active');
      curQCount = Number(chip.dataset.count);
      curMinutes = Number(chip.dataset.min);
      if (customQ) customQ.value = '';
      if (minutesInput) minutesInput.value = String(curMinutes);
      durChips.forEach(c => c.classList.toggle('active', Number(c.dataset.min) === curMinutes));
      refreshSlot();
      refreshTitle();
    });
  });

  if (customQ) {
    customQ.addEventListener('input', () => {
      const val = parseInt(customQ.value, 10);
      if (val > 0) {
        qChips.forEach(x => x.classList.remove('active'));
        curQCount = val;
        curMinutes = Math.min(240, Math.max(10, val * 3));
        if (minutesInput) minutesInput.value = String(curMinutes);
        durChips.forEach(c => c.classList.toggle('active', Number(c.dataset.min) === curMinutes));
        refreshSlot();
        refreshTitle();
      }
    });
  }

  durChips.forEach(chip => {
    chip.addEventListener('click', () => {
      durChips.forEach(x => x.classList.remove('active'));
      chip.classList.add('active');
      curMinutes = Number(chip.dataset.min);
      if (minutesInput) minutesInput.value = String(curMinutes);
      refreshSlot();
    });
  });

  if (minutesInput) {
    minutesInput.addEventListener('input', () => {
      const val = parseInt(minutesInput.value, 10);
      if (val >= 5 && val <= 240) {
        curMinutes = val;
        durChips.forEach(c => c.classList.toggle('active', Number(c.dataset.min) === curMinutes));
        refreshSlot();
      }
    });
  }

  if (toggleTimeBtn && manualTimeContainer) {
    toggleTimeBtn.addEventListener('click', () => {
      const isHidden = manualTimeContainer.style.display === 'none';
      manualTimeContainer.style.display = isHidden ? 'block' : 'none';
      toggleTimeBtn.textContent = isHidden ? 'Hide manual time' : 'Custom time';
    });
  }

  prioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prioBtns.forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      curPriority = btn.dataset.prio as Task['priority'];
      if (prioHidden) prioHidden.value = curPriority;
    });
  });

  form().onsubmit=async e=>{
    e.preventDefault();
    const f=new FormData(form());
    const sub=curSubject;
    const chapter=curChapter;
    const isManualTime = manualTimeContainer && manualTimeContainer.style.display !== 'none';
    const chosenTime = isManualTime ? (val(f,'time') || '') : (val(f,'time_auto') || '');
    const chosenDay = isManualTime ? (val(f,'day') || b.day) : b.day;
    const dur = Math.max(5, Math.min(240, Number(val(f,'minutes')) || 45));
    const titleVal = val(f,'title').trim() || buildTitle(curScope, sub, chapter, curUnit, curType, curQCount);

    const item:Task = {
      ...b,
      title: titleVal,
      day: chosenDay,
      time: chosenTime,
      minutes: dur,
      subject: sub,
      chapter: chapterById(chapter)?.subject === sub ? chapter : '',
      priority: curPriority,
      due: b.due || ''
    };

    const late = Boolean(item.due && item.day > item.due);
    const reason = late ? 'Choose a date on or before the due date.' : conflict(state, item);
    if(reason){
      error(reason);
      const alt = late ? '' : freeSlot(state, item);
      modal.querySelector('#slot-help')!.innerHTML = alt
        ? btn('use-slot', 'Use ' + labelTime(alt), 'clock-3', 'outline', alt)
        : '<small>Leave the time blank or pick another window.</small>';
      return;
    }
    const ns = structuredClone(state), idx = ns.tasks.findIndex(x => x.id === item.id);
    if(idx === -1) ns.tasks.push(item); else ns.tasks[idx] = item;
    if(await commit(ns, idx === -1 ? 'Task added.' : 'Changes saved.') && page === 'planner'){
      date = item.day;
      render();
    }
  };
}
function addSuggestion(key:string, at?:string, d=date){
  const x=suggestions(state,d).find(r=>r.key===key); if(!x)return;
  const t=toTask(x,d); t.time=at??freeSlot(state,t);
  taskDialog(t,x.rollover?'Move unfinished task':'Add suggested task');
}
function review(t:Task, study=false){
  if(t.done){announce('Task already complete.');return;}
  show(study?'Study now':'Complete task',`<form id="review-form"><p class="review-task">${esc(t.title)}</p>${t.chapter?`<fieldset class="rating"><legend>How did it feel?</legend>${[...ratings].reverse().map(x=>`<label><input type="radio" name="rating" value="${x}"><span>${x}</span></label>`).join('')}</fieldset><p id="next-review" class="muted" aria-live="polite"></p>`:''}${errorLine}${actions('Mark complete')}</form>`);
  form().onsubmit=async e=>{
    e.preventDefault();
    const r=val(new FormData(form()),'rating') as Rating, ns=structuredClone(state);
    markDone(ns,t.id,today(),ratings.includes(r)?r:undefined);
    justDone=t.id;
    if(await commit(ns,'Task complete.')){requestAnimationFrame(()=>tip('task-completion','A real study record','That completion is now part of your actual progress.'));window.setTimeout(()=>{document.querySelectorAll('.just-done').forEach(x=>x.classList.remove('just-done'));justDone='';},650);}
  };
}
function chapterDialog(id:string){
  const c=chapterById(id); if(!c)return;
  const p=state.progress[id];
  let curStatus = p?.status || '';
  let curRating = p?.rating || '';
  show(c.title,`<form id="chapter-dialog-form">
  <div style="margin-bottom:12px;">
    <label style="display:block;font-size:12px;font-weight:700;color:var(--muted,#64748b);text-transform:uppercase;margin-bottom:6px;">Study status</label>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      ${learningStatuses.map(x=>`<button type="button" class="button status-pick-btn ${curStatus===x?'primary':'outline'}" data-dialog-status="${x}" style="font-size:12px;padding:6px 10px;min-height:34px;">${statusLabel(x)}</button>`).join('')}
    </div>
    <input type="hidden" name="status" value="${curStatus}">
  </div>
  <div style="margin-bottom:12px;">
    <label style="display:block;font-size:12px;font-weight:700;color:var(--muted,#64748b);text-transform:uppercase;margin-bottom:6px;">Clarity / Difficulty</label>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button type="button" class="button diff-chip diff-easy ${curRating==='Easy'?'active':''}" data-dialog-rating="Easy" style="font-size:12px;padding:6px 12px;min-height:34px;">🟢 Easy</button>
      <button type="button" class="button diff-chip diff-okay ${curRating==='Okay'?'active':''}" data-dialog-rating="Okay" style="font-size:12px;padding:6px 12px;min-height:34px;">🟡 Okay</button>
      <button type="button" class="button diff-chip diff-difficult ${curRating==='Difficult'?'active':''}" data-dialog-rating="Difficult" style="font-size:12px;padding:6px 12px;min-height:34px;">🔴 Difficult</button>
      <button type="button" class="button quiet" data-dialog-rating="" style="font-size:11px;padding:6px 8px;min-height:34px;">Not rated</button>
    </div>
    <input type="hidden" name="rating" value="${curRating}">
  </div>
  <label>Next review<input name="next" type="date" value="${esc(p?.next??'')}"></label>${errorLine}${actions('Save progress')}</form>`);

  const formEl = form();
  formEl.querySelectorAll<HTMLButtonElement>('[data-dialog-status]').forEach(btn => {
    btn.onclick = () => {
      formEl.querySelectorAll('[data-dialog-status]').forEach(b => { b.classList.remove('primary'); b.classList.add('outline'); });
      btn.classList.remove('outline'); btn.classList.add('primary');
      curStatus = btn.dataset.dialogStatus as Status;
      (formEl.querySelector('input[name="status"]') as HTMLInputElement).value = curStatus;
    };
  });

  formEl.querySelectorAll<HTMLButtonElement>('[data-dialog-rating]').forEach(btn => {
    btn.onclick = () => {
      formEl.querySelectorAll('[data-dialog-rating]').forEach(b => b.classList.remove('active'));
      const r = btn.dataset.dialogRating || '';
      if (r) btn.classList.add('active');
      curRating = r as Rating;
      (formEl.querySelector('input[name="rating"]') as HTMLInputElement).value = curRating;
      if (curRating && !curStatus) {
        curStatus = curRating === 'Difficult' ? 'Needs revision' : curRating === 'Okay' ? 'Learning' : 'Completed';
        (formEl.querySelector('input[name="status"]') as HTMLInputElement).value = curStatus;
        const autoBtn = formEl.querySelector<HTMLButtonElement>(`[data-dialog-status="${curStatus}"]`);
        if (autoBtn) {
          formEl.querySelectorAll('[data-dialog-status]').forEach(b => { b.classList.remove('primary'); b.classList.add('outline'); });
          autoBtn.classList.remove('outline'); autoBtn.classList.add('primary');
        }
      }
    };
  });

  formEl.onsubmit=async e=>{
    e.preventDefault(); const f=new FormData(formEl);
    let rating=val(f,'rating') as Rating|'', status=val(f,'status') as Status|'';
    if (!status && rating) {
      status = rating === 'Difficult' ? 'Needs revision' : rating === 'Okay' ? 'Learning' : 'Completed';
    }
    if(!status || !statuses.includes(status as Status)){
      error('Choose a study status first.');
      return;
    }
    const ns=structuredClone(state);
    ns.progress[id]={
      ...p,
      status: status as Status,
      rating: ratings.includes(rating as Rating) ? rating as Rating : undefined,
      next: val(f,'next')||undefined
    };
    if(await commit(ns,'Progress saved.')&&rating==='Difficult')requestAnimationFrame(()=>tip('progress','A useful signal','BLOOM will bring this chapter back sooner because you marked it Difficult.'));
  };
}
function available(routine:boolean){
  const d=(routine?state.defaults:dayFor(state,date))??defaultDay;
  show(routine?'Typical study time':'Study time',`<form><div class="form-pair"><label>Before tuition · from<input name="start" type="time" value="${d.start}" required></label><label>Until<input name="end" type="time" value="${d.end}" required></label></div><label>Study minutes in this window<input name="limit" type="number" min="0" max="720" value="${d.limit}" required></label><label>Later study starts <span class="muted">(optional)</span><input name="lateStart" type="time" value="${d.lateStart??''}"></label><small class="muted">No fixed finish time is assumed for later study. Leave blank if you do not want this window.</small>
  <label class="checkline"><input name="school" type="checkbox"${checked(d.school)}> School and travel · 8:00 am–2:30 pm</label><label class="checkline"><input name="tuition" type="checkbox"${checked(d.tuition)}> Tuition · 5:00–9:00 pm</label>${errorLine}${actions('Save study time')}</form>`);
  form().onsubmit=async e=>{
    e.preventDefault();const f=new FormData(form());
    const edit:Day={start:val(f,'start'),end:val(f,'end'),limit:Number(val(f,'limit')),school:f.has('school'),tuition:f.has('tuition'),lateStart:val(f,'lateStart')||undefined};
    if(edit.start>=edit.end||edit.limit>minute(edit.end)-minute(edit.start)){error('Choose a study window long enough for those minutes.');return;}
    if(edit.lateStart&&edit.lateStart<edit.end){error('Later study must start after this study window.');return;}
    const ns=structuredClone(state);if(routine)ns.defaults=edit;else ns.days[date]=edit;
    const broken=ns.tasks.find(t=>t.day>=today()&&!t.done&&t.time&&!conflict(state,t)&&conflict(ns,t));
    if(broken){error('This would conflict with “'+broken.title+'”. Move that task first or choose a different study window.');return;}
    await commit(ns,'Study time saved.');
  };
}
function coverage(sub:string,ids:string[]){
  return chapters.filter(c=>c.subject===sub).map(c=>`<label class="checkline"><input name="coverage" value="${c.id}" type="checkbox"${checked(ids.includes(c.id))}>${esc(c.title)}</label>`).join('');
}
function testDialog(t?:StudyTest){
  const sub=t?.subject??subjects[0].id;
  show(t?'Edit test':'Add school test',`<form id="test-form"><label>Test name<input name="title" maxlength="100" value="${esc(t?.title??'')}" required autofocus></label><div class="form-pair"><label>Subject<select name="test-subject">${opts(sub,false)}</select></label><label>Date<input name="day" type="date" value="${t?.day??today()}" required></label></div>
  <details ${t?.coverage.length?'open':''}><summary>Chapter coverage</summary><div id="coverage" class="coverage">${coverage(sub,t?.coverage??[])}</div></details>${errorLine}${actions(t?'Save changes':'Add test',t?btn('delete-test','Delete','trash-2','danger',t.id):'')}</form>`);
  form().onsubmit=async e=>{
    e.preventDefault();const f=new FormData(form()), s=val(f,'test-subject'), title=val(f,'title'), day=val(f,'day');
    if(!title||!day||!subjectById(s)){error('Enter a name, subject and date.');return;}
    const item:StudyTest={id:t?.id??crypto.randomUUID(),title,day,subject:s,coverage:f.getAll('coverage').map(String).filter(c=>chapterById(c)?.subject===s)};
    const ns=structuredClone(state),i=ns.tests.findIndex(x=>x.id===item.id);if(i===-1)ns.tests.push(item);else ns.tests[i]=item;
    await commit(ns,'Test saved.');
  };
}
function guide(){
  show('A quick look at BLOOM',`<ol class="guide-list"><li><strong>Today</strong><span>Start with Physics, the subject you said feels hardest. Your own chapter progress stays blank until you add it.</span></li><li><strong>Planner</strong><span>Your usual 2:30–5:00 p.m. window and flexible after-9 p.m. study time are ready to edit. Add a school day or change tuition for today when needed.</span></li><li><strong>Syllabus</strong><span>Mark only what you have actually studied. Select several chapters to update them together.</span></li></ol><div class="dialog-actions">${btn('close','Skip guide','','quiet')}${btn('close','Done','check','primary')}</div>`);
}
async function photo(file:File){
  if(!file.type.startsWith('image/')||file.size>12*1024*1024){announce('Choose an image smaller than 12 MB.');return;}
  const url=URL.createObjectURL(file);
  try{
    const img=new Image();img.src=url;await img.decode();
    const size=Math.min(img.naturalWidth,img.naturalHeight);
    if(!size)throw Error('Empty image');
    const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
    const ctx=canvas.getContext('2d')!;ctx.fillStyle='#f9f6f4';ctx.fillRect(0,0,256,256);
    ctx.drawImage(img,(img.naturalWidth-size)/2,(img.naturalHeight-size)/2,size,size,0,0,256,256);
    await commit({...state,avatar:canvas.toDataURL('image/jpeg',.87)},'Profile photo saved.');
  }catch{announce('Could not open this photo. Try a JPG, PNG or WebP.');}
  finally{URL.revokeObjectURL(url);}
}
function remove(type:'task'|'test',id:string){
  show('Delete this '+type+'?',`<form><p>${esc(type==='task'?taskById(id)?.title:state.tests.find(t=>t.id===id)?.title)}</p>${errorLine}${actions('Delete',btn('close','Cancel'))}</form>`);
  form().onsubmit=async e=>{e.preventDefault();const ns=structuredClone(state);if(type==='task')ns.tasks=ns.tasks.filter(x=>x.id!==id);else ns.tests=ns.tests.filter(x=>x.id!==id);await commit(ns,type==='task'?'Task deleted.':'Test deleted.');};
}
document.addEventListener('click',async e=>{
  const el=(e.target as Element).closest<HTMLElement>('[data-action],[data-nav]');if(!el)return;
  if(el.dataset.nav){e.preventDefault();route(el.dataset.nav);return;}
  const a=el.dataset.action, key=el.dataset.value??'', t=taskById(key);
  switch(a){
    case 'close':void host.closeDialog(modal);break;
    case 'planner':date=today();route('planner');requestAnimationFrame(()=>tip('planner','Plan it your way','Add a task, choose a time, or leave it flexible for later.'));break;
    case 'syllabus':case 'tests':case 'profile':route(a);break;
    case 'start-physics':subject='physics';route('syllabus');break;
    case 'guide':guide();break;
    case 'import-planner':openPlannerImport(host);break;
    case 'propose-plan':planDialog();break;
    case 'propose-today':date=today();planDialog();break;
    case 'apply-guided-mission':
    case 'open-board-plans':
      boardPlanDialog(today());
      break;
    case 'apply-board-plan':
      await applyBoardPlan(key as any, date || today());
      break;
    case 'rescue-plan':planDialog('',true);break;
    case 'personalisation-routine':openPersonalisation(host,'day');break;
    case 'personalisation-study':openPersonalisation(host,'rhythm');break;
    case 'personalisation-priorities':openPersonalisation(host,'priorities');break;
    case 'test-plan':planDialog(key);break;
    case 'calendar-view':calendarView=key;render();break;
    case 'calendar-day':date=key;render();break;
    case 'all-ideas':showAllIdeas=!showAllIdeas;render();break;
    case 'replay-tour':tourIndex=0;save({...state,tourStatus:'in-progress',tourStep:0}).then(()=>{state={...state,tourStatus:'in-progress',tourStep:0};tourAt(0);});break;
    case 'tour-start':tourIndex=0;save({...state,tourStatus:'in-progress',tourStep:0}).then(()=>{state={...state,tourStatus:'in-progress',tourStep:0};tourAt(0);});break;
    case 'tour-dismiss':tourEnd('skipped');break;
    case 'tour-skip':tourEnd('skipped');break;
    case 'tour-next':tourAt(tourIndex+1);break;
    case 'tour-back':tourAt(tourIndex-1);break;
    case 'tip-dismiss':{
      const next=structuredClone(state);next.dismissedTips=[...new Set([...next.dismissedTips,key])];save(next).then(()=>{state=next;hideTour();});break;
    }
    case 'prev':case 'next':date=plus(date,a==='prev'?-1:1);render();document.getElementById('plan-date')?.focus();break;
    case 'mode':mode=key;render();document.querySelector<HTMLElement>('[data-action="mode"][aria-pressed="true"]')?.focus();break;
    case 'day':case 'routine':available(a==='routine');break;
    case 'add-task':taskDialog();break;
    case 'slot':taskDialog(undefined,'Add task',key);break;
    case 'edit-task':if(t)taskDialog(t,'Edit task');break;
    case 'suggest':addSuggestion(key);break;
    case 'today-suggestion':addSuggestion(key,undefined,today());break;
    case 'use-slot':form().querySelector<HTMLInputElement>('[name="time"]')!.value=key;error('');modal.querySelector('#slot-help')!.innerHTML='';form().querySelector<HTMLInputElement>('[name="time"]')?.focus();break;
    case 'study':if(t?.activityId){activeActivityId=t.activityId;route('academic-activity');}else if(t)startTaskFocus(host,t.id);break;
    case 'complete':if(t)review(t);break;
    case 'delete-task':remove('task',key);break;
    case 'delete-test':remove('test',key);break;
    case 'subject':subject=key;selected.clear();render();document.querySelector<HTMLElement>('[data-action="subject"][aria-pressed="true"]')?.focus();break;
    case 'academic-chapter':academicChapterId=key;route('syllabus');break;
    case 'launch-activity':activeActivityId=key;route('academic-activity');break;
    case 'back-academic':route('syllabus');break;
    case 'topic-status':document.querySelector<HTMLSelectElement>(`[data-topic-status="${CSS.escape(key)}"]`)?.focus();break;
    case 'save-topic-status':{
      const status=document.querySelector<HTMLSelectElement>(`[data-topic-status="${CSS.escape(key)}"]`)?.value as AcademicLearningStatus|undefined;
      if(!status||!['not-started','learning','learned','practice-needed','revision-due','assessment-ready','needs-work'].includes(status)){announce('Choose a topic status first.');return;}
      const next=structuredClone(state);next.academic.topicProgress[key]={...next.academic.topicProgress[key],status,updatedAt:new Date().toISOString()};
      await commit(next,'Topic status saved.');break;
    }
    case 'save-activity':await persistAcademicActivity(key,'paused');break;
    case 'complete-activity':await persistAcademicActivity(key,'completed');break;
    case 'begin-learning':{
      const next=structuredClone(state);next.academic.topicProgress[key]={...next.academic.topicProgress[key],status:'not-started',updatedAt:new Date().toISOString()};
      if(await commit(next,'Choose a learning status before continuing.'))document.querySelector<HTMLSelectElement>(`[data-topic-status="${CSS.escape(key)}"]`)?.focus();break;
    }
    case 'select-all':{
      const list=chapters.filter(c=>c.subject===subject);if(selected.size===list.length)selected.clear();else list.forEach(c=>selected.add(c.id));render();document.querySelector<HTMLElement>('[data-action="select-all"]')?.focus();break;
    }
    case 'bulk':{
      const status=document.querySelector<HTMLSelectElement>('#bulk-status')?.value as Status;
      if(!statuses.includes(status)){announce('Choose a study status first.');return;}
      const ns=structuredClone(state), count=selected.size;
      for(const id of selected)ns.progress[id]={...ns.progress[id],status};
      if(await commit(ns,count+' '+(count===1?'chapter':'chapters')+' updated.')){selected.clear();render();document.querySelector<HTMLElement>('[data-select]')?.focus();}
      break;
    }
    case 'chapter':chapterDialog(key);break;
    case 'add-test':testDialog();break;
    case 'edit-test':testDialog(state.tests.find(x=>x.id===key));break;
    case 'remove-photo':{const ns={...state};delete ns.avatar;await commit(ns,'Profile photo removed.');break;}
    case 'rename':{
      show('Edit name',`<form><label>Name or nickname<input name="name" required maxlength="36" value="${esc(state.name)}" autofocus></label>${errorLine}${actions('Save name')}</form>`);
      form().onsubmit=async ev=>{ev.preventDefault();const name=val(new FormData(form()),'name');if(name)await commit({...state,name},'Name saved.');};
      break;
    }
    case 'open-palette':CommandPalette.init(route).open();break;
    case 'quick-chapter-status':{
      const chId=el.dataset.chapter, st=el.dataset.status as Status|undefined;
      if(chId&&st){
        const next=structuredClone(state);
        if(st==='Pending')delete next.progress[chId];
        else next.progress[chId]={...next.progress[chId],status:st,last:today()};
        await commit(next,st==='Pending'?'Status reset.':'Chapter marked as '+st+'.');
      }
      break;
    }
    case 'quick-chapter-rating':{
      const chId=el.dataset.chapter, rating=el.dataset.rating as Rating|'';
      if(chId){
        const next=structuredClone(state);
        const current=next.progress[chId];
        if(!rating||current?.rating===rating){
          if(current){
            delete current.rating;
            if(!current.status||current.status==='Needs revision')delete next.progress[chId];
          }
          await commit(next,'Chapter difficulty reset.');
        }else{
          const defaultStatus:Status=current?.status??(rating==='Difficult'?'Needs revision':rating==='Okay'?'Learning':'Completed');
          next.progress[chId]={
            ...current,
            status:defaultStatus,
            rating,
            last:today()
          };
          await commit(next,`Chapter marked as ${rating}.`);
        }
      }
      break;
    }
    case 'quick-topic-status':{
      const topicId=el.dataset.topic, st=el.dataset.status as AcademicLearningStatus;
      if(topicId&&st){
        const next=structuredClone(state);
        next.academic.topicProgress[topicId]={
          ...next.academic.topicProgress[topicId],
          status:st,
          updatedAt:new Date().toISOString()
        };
        await commit(next,`Topic marked as ${st.replace(/-/g,' ')}.`);
      }
      break;
    }
    case 'quick-topic-rating':{
      const topicId=el.dataset.topic, rating=el.dataset.rating as Rating|'';
      if(topicId){
        const next=structuredClone(state);
        const current=next.academic.topicProgress[topicId];
        if(!rating||current?.rating===rating){
          if(current)delete current.rating;
          await commit(next,'Topic clarity reset.');
        }else{
          next.academic.topicProgress[topicId]={
            ...current,
            status:current?.status??'learning',
            rating,
            updatedAt:new Date().toISOString()
          };
          await commit(next,`Topic marked as ${rating}.`);
        }
      }
      break;
    }
    case 'toggle-academic-batch':{
      if(selected.size)selected.clear();
      else {
        const list=chapters.filter(c=>c.subject===subject);
        list.slice(0,3).forEach(c=>selected.add(c.id));
      }
      render();
      break;
    }
    case 'academic-select-all':{
      const list=chapters.filter(c=>c.subject===subject);
      if(selected.size===list.length)selected.clear();
      else list.forEach(c=>selected.add(c.id));
      render();
      break;
    }
    case 'academic-batch-rating':{
      const rating=el.dataset.rating as Rating;
      if(!rating||!selected.size)break;
      const next=structuredClone(state);
      const count=selected.size;
      for(const chId of selected){
        const current=next.progress[chId];
        const defaultStatus:Status=current?.status??(rating==='Difficult'?'Needs revision':rating==='Okay'?'Learning':'Completed');
        next.progress[chId]={
          ...current,
          status:defaultStatus,
          rating,
          last:today()
        };
      }
      selected.clear();
      await commit(next,`${count} chapter${count>1?'s':''} marked as ${rating}.`);
      break;
    }
    case 'academic-batch-status':{
      const st=el.dataset.status as Status;
      if(!st||!selected.size)break;
      const next=structuredClone(state);
      const count=selected.size;
      for(const chId of selected){
        if(st==='Pending')delete next.progress[chId];
        else next.progress[chId]={...next.progress[chId],status:st,last:today()};
      }
      selected.clear();
      await commit(next,`${count} chapter${count>1?'s':''} updated to ${st}.`);
      break;
    }
    case 'reveal-recall':{
      const qId=el.dataset.id;
      const keyBox=document.getElementById(`recall-key-${qId}`);
      if(keyBox){
        keyBox.hidden=!keyBox.hidden;
        el.textContent=keyBox.hidden?'Reveal Marking Key':'Hide Marking Key';
      }
      break;
    }
  }
});
document.addEventListener('change',async e=>{
  const el=e.target as HTMLInputElement;
  if(el.dataset.attendance){await attendance(el.dataset.attendance as 'school'|'tuition',el.checked);return;}
  if(el.id==='plan-date'&&el.value){date=el.value;render();document.getElementById('plan-date')?.focus();return;}
  if(el.id==='motion'){await commit({...state,reduceMotion:el.checked});document.getElementById('motion')?.focus();return;}
  if(el.id==='dark-mode'){await commit({...state,darkMode:el.checked});document.getElementById('dark-mode')?.focus();return;}
  if(el.id==='avatar-input'&&el.files?.[0]){await photo(el.files[0]);el.value='';return;}
  if(el.dataset.select){
    if(el.checked)selected.add(el.dataset.select);else selected.delete(el.dataset.select);
    const bulk=document.querySelector<HTMLButtonElement>('[data-action="bulk"]')!;bulk.disabled=!selected.size;bulk.textContent='Apply to '+selected.size;
    document.querySelector('[data-action="select-all"] span')!.textContent=selected.size===chapters.filter(c=>c.subject===subject).length?'Clear selection':'Select all';return;
  }
  if(el.dataset.selectAcademic){
    if(el.checked)selected.add(el.dataset.selectAcademic);else selected.delete(el.dataset.selectAcademic);
    render();
    return;
  }
  if(!modal.open)return;
  if(el.name==='subject'&&form().id==='task-form')form().querySelector<HTMLSelectElement>('[name="chapter"]')!.innerHTML=chapterOpts(el.value);
  if(el.name==='test-subject')modal.querySelector('#coverage')!.innerHTML=coverage(el.value,[]);
  if(el.name==='rating'&&form().id==='review-form'&&ratings.includes(el.value as Rating))modal.querySelector('#next-review')!.textContent='Suggested next review: '+dateLabel(revisionDate(today(),el.value as Rating));
});
let drag:{id?:string;suggestion?:string}|null=null;
document.addEventListener('dragstart',e=>{
  const el=(e.target as Element).closest<HTMLElement>('[data-drag],[data-suggest]');if(!el||!e.dataTransfer)return;
  drag={id:el.dataset.drag,suggestion:el.dataset.suggest};e.dataTransfer.setData('text/plain','bloom-task');e.dataTransfer.effectAllowed='move';
});
document.addEventListener('dragover',e=>{if(drag&&(e.target as Element).closest('[data-drop]'))e.preventDefault();});
document.addEventListener('dragend',()=>drag=null);
document.addEventListener('drop',e=>{
  const el=(e.target as Element).closest<HTMLElement>('[data-drop]');if(!drag||!el)return;
  e.preventDefault();const time=el.dataset.drop!;
  if(drag.suggestion)addSuggestion(drag.suggestion,time);
  else if(drag.id){const t=taskById(drag.id);if(t)taskDialog({...t,time},'Move task');}
  drag=null;
});
window.addEventListener('hashchange',()=>route(location.hash.slice(1)));
window.addEventListener('resize',()=>requestAnimationFrame(repositionTour));
window.addEventListener('scroll',()=>requestAnimationFrame(repositionTour),{passive:true});
window.addEventListener('keydown',e=>{
  if(e.key!=='Escape'||tourUI.hidden)return;
  e.preventDefault();
  if(tourMode==='tip')tourUI.querySelector<HTMLButtonElement>('[data-action="tip-dismiss"]')?.click();
  else if(tourMode==='tour'||tourMode==='welcome')tourEnd('skipped');
});
window.addEventListener('keydown',e=>{
  if(e.key!=='Tab'||tourUI.hidden)return;
  const dialog=tourUI.querySelector<HTMLElement>('[aria-modal="true"]');if(!dialog)return;
  const controls=[...dialog.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled])')];if(!controls.length)return;
  const first=controls[0],last=controls[controls.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
modal.addEventListener('cancel',event=>{event.preventDefault();void animateDialogExit(modal);});
reduced.addEventListener('change',()=>{if(reduced.matches)document.getAnimations().forEach(a=>a.cancel());motion();});
async function openApp(){
  try{
    state=await load();route(location.hash.slice(1),false);
    if(state.onboarding?.completed&&state.tourStatus==='in-progress')requestAnimationFrame(()=>tourAt(state.tourStep??0));
    if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>announce('Offline access is unavailable in this browser.'));
  }catch(error){
    if(error instanceof VaultLockedError){
      app.innerHTML=`<main id="content" class="setup"><div class="setup-inner">${brand}<p class="eyebrow">YOUR PRIVATE STUDY SPACE</p><h1>Welcome back.</h1><p>Your records are encrypted on this device. Enter your vault passphrase to open them.</p><form id="unlock-form"><label>Vault passphrase<input type="password" name="passphrase" autocomplete="current-password" required></label><p class="form-error" role="alert"></p><button class="button primary" type="submit">Unlock BLOOM ${icon('arrow-right')}</button></form></div></main>`;
      app.querySelector<HTMLFormElement>('form')!.onsubmit=async event=>{event.preventDefault();const f=event.currentTarget as HTMLFormElement,button=f.querySelector('button')!;button.disabled=true;try{state=await unlock(String(new FormData(f).get('passphrase')));route('today');}catch(e){f.querySelector('.form-error')!.textContent=e instanceof Error?e.message:'Could not unlock.';button.disabled=false;}};
    }else app.innerHTML=`<main id="content" class="page"><h1>BLOOM could not open</h1><p>${esc(error instanceof Error?error.message:'Browser storage could not be read.')}</p><p>Your saved records have not been replaced. Reload to try again.</p></main>`;
  }
}
void openApp();

async function attendance(kind:'school'|'tuition',enabled:boolean){
  const next=structuredClone(state),base=dayFor(state,date)??{...defaultDay},avail=availability(state,date);
  next.days[date]={...base,school:avail.school,tuition:avail.tuition,[kind]:enabled};
  const conflicts=next.tasks.filter(t=>t.day===date&&!t.done&&t.time&&conflict(next,t));
  if(!conflicts.length){if(await commit(next,'Day updated. Your approved sessions are unchanged.'))planDialog();return;}
  show('Your day has changed',`<form><p>${conflicts.length} approved sessions overlap the new commitment. They will stay in your plan until you choose new times.</p><div class="rows">${conflicts.map(t=>`<p>${esc(t.title)} · ${esc(labelTime(t.time))}</p>`).join('')}</div>${actions('Save commitment & review plan',btn('close','Keep previous day'))}</form>`);
  form().onsubmit=async event=>{event.preventDefault();if(await commit(next,'Commitment saved. Overlapping sessions are flagged.'))planDialog();};
}
