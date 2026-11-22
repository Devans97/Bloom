import { chapters, subjects, subjectById } from './curriculum.js';
import { calendarTests, clock, gap, minute, plus, type State, type Suggestion, type Task } from './model.js';
import { academicNodes,activityById,nextActivityForNode,type AcademicActivityKind } from './academic-data.js';

export interface TimeRange { start:string; end:string; label:string; }
export interface MinuteWindow { start:number; end:number; }
export interface PlanningProfile {
  wake:string; sleep:string;
  schoolStart:string; schoolEnd:string; tuitionStart:string; tuitionEnd:string;
  /** Travel minutes for each journey, before and after an enabled commitment. */
  travelMinutes:number; sessionMinutes:number; breakMinutes:number;
  preferredPeriods:('morning'|'afternoon'|'evening')[];
  difficultSubjects:string[]; confidentSubjects:string[];
  focus:'learning'|'revision'|'balanced';
  meals:TimeRange[]; commitments:TimeRange[];
  schoolDays:number[]; tuitionDays:number[];
  maxStudyMinutes?:number; medium?:string; motivation?:'gentle'|'structured';
}
/** Editable setup presets. An empty attendance list never assumes a recurring day. */
export const defaultPlanningProfile=():PlanningProfile=>({wake:'07:00',sleep:'23:00',schoolStart:'08:00',schoolEnd:'14:00',tuitionStart:'17:00',tuitionEnd:'21:00',travelMinutes:0,sessionMinutes:25,breakMinutes:5,preferredPeriods:[],difficultSubjects:[],confidentSubjects:[],focus:'balanced',meals:[],commitments:[],schoolDays:[],tuitionDays:[]});
export interface Availability {
  school:boolean; tuition:boolean; windows:MinuteWindow[]; usableWindows:MinuteWindow[];
  commitments:TimeRange[]; availableMinutes:number; freeMinutes:number;
  notes:string[]; conflicts:string[];
}
export interface PlanOptions { targetMinutes?:number; earliestMinute?:number; testId?:string; includeBacklog?:boolean; }
export interface PlanProposal {
  blocks:Task[]; breaks:TimeRange[]; availability:Availability; targetMinutes:number;
  unplaced:number; notes:string[]; conflicts:string[];
}
export interface AcademicCount {
  total:number; known:number; unknown:number; learned:number; learning:number;
  notStarted:number; needsRevision:number; difficult:number; due:number; percent:number;
}
export interface PersonalSuggestion extends Suggestion {
  activity:'learn'|'revise'|'practise'|'retry'; activityId?:string; topicId?:string; testId?:string; testDay?:string;
  dueReview:boolean; allocation:number; reviewAge:number; clarity:number;
}

const validTime=(value:unknown):value is string=>typeof value==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const bounded=(value:number|undefined,fallback:number,min:number,max:number)=>Number.isFinite(value)?Math.max(min,Math.min(max,Math.round(value!))):fallback;
const profileOf=(state:State,profile?:PlanningProfile)=>profile??(state as State&{personalisation?:PlanningProfile}).personalisation;
const length=(windows:MinuteWindow[])=>windows.reduce((sum,w)=>sum+w.end-w.start,0);
const intersects=(a:MinuteWindow,b:MinuteWindow)=>a.start<b.end&&a.end>b.start;
const learned=(status:string|undefined)=>Boolean(status&&['Completed','Practising','Revised','Exam Ready','Learned','Needs revision'].includes(status));
const needsLearning=(status:string|undefined)=>status==='Pending'||status==='Not started'||status==='Learning';

/** Invalid ranges never become free time. End 00:00 explicitly means midnight. */
function range(start:string,end:string):MinuteWindow|null {
  if(!validTime(start)||!validTime(end))return null;
  const a=minute(start),b=end==='00:00'?1440:minute(end);
  return b>a?{start:a,end:b}:null;
}
function union(windows:MinuteWindow[]):MinuteWindow[] {
  const output:MinuteWindow[]=[];
  for(const w of windows.filter(w=>w.end>w.start).sort((a,b)=>a.start-b.start)){
    const last=output.at(-1);
    if(last&&last.end>=w.start)last.end=Math.max(last.end,w.end);
    else output.push({...w});
  }
  return output;
}
function subtract(windows:MinuteWindow[],blocked:MinuteWindow[]):MinuteWindow[] {
  let free=union(windows);
  for(const block of union(blocked))free=free.flatMap(w=>!intersects(w,block)?[w]:[
    ...(w.start<block.start?[{start:w.start,end:block.start}]:[]),
    ...(w.end>block.end?[{start:block.end,end:w.end}]:[]),
  ]);
  return free;
}

/** No mutation. Day flags override weekly preferences independently. */
export function availability(state:State,date:string,provided?:PlanningProfile):Availability {
  const profile=profileOf(state,provided),override=state.days[date];
  const weekday=new Date(date+'T12:00:00Z').getUTCDay();
  const school=override?.school??(profile?profile.schoolDays.includes(weekday):state.defaults?.school??false);
  const tuition=override?.tuition??(profile?profile.tuitionDays.includes(weekday):state.defaults?.tuition??false);
  const notes:string[]=[],conflicts:string[]=[],blocks:TimeRange[]=[];
  let waking:MinuteWindow[]=[];
  if(profile){
    const awake=range(profile.wake,profile.sleep);
    if(awake)waking=[awake];else notes.push('Add valid wake-up and sleep times to calculate your day.');
  }else{
    const d=override??state.defaults;
    if(d){
      const main=range(d.start,d.end);if(main)waking.push(main);
      if(d.lateStart&&d.lateEnd){const late=range(d.lateStart,d.lateEnd);if(late)waking.push(late);}
      else if(d.lateStart)notes.push('Add an end time for your later study window.');
    }else notes.push('Confirm your routine to find suitable study time.');
  }
  const travel=bounded(profile?.travelMinutes,0,0,180);
  function addCommitment(enabled:boolean,start:string,end:string,label:string){
    if(!enabled)return;
    const interval=range(start,end);
    if(!interval){conflicts.push('Check the '+label.toLowerCase()+' start and end times.');waking=[];return;}
    blocks.push({start,end,label});
    if(travel){
      if(interval.start>0)blocks.push({start:clock(Math.max(0,interval.start-travel)),end:start,label:label+' travel'});
      if(interval.end<1440)blocks.push({start:end,end:clock(Math.min(1439,interval.end+travel)),label:label+' travel'});
    }
  }
  addCommitment(school,profile?.schoolStart??'08:00',profile?.schoolEnd??'14:00','School');
  addCommitment(tuition,profile?.tuitionStart??'17:00',profile?.tuitionEnd??'21:00','Tuition');
  for(const item of [...(profile?.meals??[]),...(profile?.commitments??[])]){
    if(range(item.start,item.end))blocks.push({...item});
    else {conflicts.push('Check the times for '+(item.label||'your commitment')+'.');waking=[];}
  }
  const blocked=blocks.map(b=>range(b.start,b.end)).filter((w):w is MinuteWindow=>Boolean(w));
  const usableWindows=subtract(waking,blocked);
  const timed=state.tasks.filter(t=>t.day===date&&t.time);
  const breakMinutes=bounded(profile?.breakMinutes,state.study.breakMinutes,1,30);
  const occupied:MinuteWindow[]=[];
  const savedIntervals:MinuteWindow[]=[];
  for(const task of timed){
    if(!validTime(task.time)||!Number.isFinite(task.minutes)||task.minutes<=0){conflicts.push('Check the time for “'+task.title+'”.');continue;}
    const w={start:minute(task.time),end:minute(task.time)+task.minutes};
    if(!usableWindows.some(f=>w.start>=f.start&&w.end<=f.end))conflicts.push('“'+task.title+'” is outside your available time.');
    if(savedIntervals.some(other=>intersects(w,other)))conflicts.push('“'+task.title+'” overlaps another saved activity.');
    savedIntervals.push(w);
    occupied.push({start:Math.max(0,w.start-breakMinutes),end:Math.min(1440,w.end+breakMinutes)});
  }
  const windows=subtract(usableWindows,occupied);
  return {school,tuition,windows,usableWindows,commitments:blocks.sort((a,b)=>a.start.localeCompare(b.start)),availableMinutes:length(usableWindows),freeMinutes:length(windows),notes,conflicts};
}

/** Ranked evidence, never fabricated mastery. Official allocation remains at its published scope. */
export function personalizedSuggestions(state:State,date:string,provided?:PlanningProfile):PersonalSuggestion[] {
  const profile=profileOf(state,provided),tests=calendarTests(state).filter(t=>gap(date,t.day)>=0).sort((a,b)=>a.day.localeCompare(b.day));
  const already=state.tasks.filter(t=>t.day===date);
  const session=bounded(profile?.sessionMinutes,state.study.focusMinutes,10,90);
  const ideas:PersonalSuggestion[]=[];
  for(const node of academicNodes){
    const chapter=chapters.find(item=>item.id===node.chapterId),progress=state.academic.topicProgress[node.id];
    if(!chapter||!progress)continue;
    const activity=nextActivityForNode(node.id,progress,state.academic.activities);if(!activity)continue;
    if(already.some(task=>task.activityId===activity.id))continue;
    const test=tests.find(item=>item.coverage.includes(node.chapterId)&&gap(date,item.day)<=14);
    const due=Boolean(progress.nextReview&&progress.nextReview<=date);
    const reasons:string[]=[];
    if(test)reasons.push('Part of your confirmed '+test.title+' · '+(gap(date,test.day)===0?'today':gap(date,test.day)+' days away'));
    if(due)reasons.push(progress.nextReview===date?'Topic review is due today':'Topic review is overdue');
    if(progress.rating==='Difficult')reasons.push('You rated this topic Difficult');
    if(reasons.length===0)reasons.push(progress.status==='not-started'?'You marked this topic not started':progress.status==='practice-needed'?'You marked this topic for practice':progress.status==='revision-due'?'You marked this topic for revision':'This is the next activity for your recorded topic progress');
    const activityKind:PersonalSuggestion['activity']=activity.kind==='first-learning'||activity.kind==='concept-check'?'learn':activity.kind==='active-recall'?'revise':'practise';
    ideas.push({key:activity.id,activityId:activity.id,topicId:node.id,title:activity.title,reason:reasons.join(' · '),subject:node.subjectId,chapter:node.chapterId,minutes:Math.min(session,activity.estimatedMinutes),activity:activityKind,
      testId:test?.id,testDay:test?.day,dueReview:due,
      allocation:chapter.allocationMarks===null?-1:chapter.allocationMarks/(subjectById(chapter.subject)?.max??100),
      reviewAge:progress.lastStudied?Math.max(0,gap(progress.lastStudied,date)):0,
      clarity:progress.rating==='Difficult'?3:progress.rating==='Okay'?2:progress.rating==='Easy'?1:0,
    });
  }
  return ideas.sort((a,b)=>{
    if(Boolean(a.testId)!==Boolean(b.testId))return a.testId?-1:1;
    if(a.testDay&&b.testDay&&a.testDay!==b.testDay)return a.testDay.localeCompare(b.testDay);
    const academic=b.allocation-a.allocation||b.reviewAge-a.reviewAge||b.clarity-a.clarity;
    if(academic)return academic;
    const difficult=Number(profile?.difficultSubjects.includes(b.subject))-Number(profile?.difficultSubjects.includes(a.subject));
    if(difficult)return difficult;
    if(profile&&profile.focus!=='balanced'){
      const wantsLearning=profile?.focus==='learning';
      const preferred=(x:PersonalSuggestion)=>wantsLearning?x.activity==='learn':x.dueReview;
      const preference=Number(preferred(b))-Number(preferred(a));if(preference)return preference;
    }
    return a.key.localeCompare(b.key);
  });
}

function recommendedMinutes(state:State,date:string,profile:PlanningProfile|undefined,available:Availability,candidates:PersonalSuggestion[]):number {
  const planned=state.tasks.filter(t=>t.day===date).reduce((sum,t)=>sum+Math.max(0,t.minutes),0);
  const backlog=state.tasks.filter(t=>t.day<date&&!t.done).slice(0,2).reduce((sum,t)=>sum+Math.max(0,t.minutes),0);
  const workload=planned+candidates.reduce((sum,x)=>sum+x.minutes,0)+backlog;
  // Leave most uncommitted waking time open; the 2.5h ceiling is never a demand.
  const capacity=Math.floor(available.availableMinutes*.4/5)*5;
  const ceiling=bounded(profile?.maxStudyMinutes,150,0,600);
  return Math.max(0,Math.min(ceiling,capacity,workload));
}
function targetFor(state:State,date:string,profile:PlanningProfile|undefined,available:Availability,candidates:PersonalSuggestion[],requested?:number):number {
  const explicit=requested??state.days[date]?.limit;
  return explicit!==undefined?bounded(explicit,0,0,1440):recommendedMinutes(state,date,profile,available,candidates);
}
function orderedWindows(windows:MinuteWindow[],profile?:PlanningProfile):MinuteWindow[]{
  const periods={morning:{start:0,end:720},afternoon:{start:720,end:1020},evening:{start:1020,end:1440}};
  const order=profile?.preferredPeriods.length?profile.preferredPeriods:['morning','afternoon','evening'] as const;
  const names=[...order,...(['morning','afternoon','evening'] as const).filter(p=>!order.includes(p))];
  return names.flatMap(name=>windows.map(w=>({start:Math.max(w.start,periods[name].start),end:Math.min(w.end,periods[name].end)})).filter(w=>w.end>w.start));
}

/** A reviewable proposal. Saved activities are never modified by generation. */
export function generatePlan(state:State,date:string,provided?:PlanningProfile,options:PlanOptions={}):PlanProposal {
  const profile=profileOf(state,provided),available=availability(state,date,profile);
  let candidates=personalizedSuggestions(state,date,profile);
  const selectedTest=options.testId?calendarTests(state).find(t=>t.id===options.testId):undefined;
  if(selectedTest)candidates=candidates.filter(x=>x.testId===selectedTest.id||selectedTest.coverage.includes(x.chapter)||x.dueReview);
  const targetMinutes=targetFor(state,date,profile,available,candidates,options.targetMinutes);
  const planned=state.tasks.filter(t=>t.day===date).reduce((sum,t)=>sum+Math.max(0,t.minutes),0);
  const notes=[...available.notes],conflicts=[...available.conflicts];
  let windows=orderedWindows(available.windows.map(w=>({...w,start:Math.max(w.start,options.earliestMinute??0)})).filter(w=>w.end>w.start),profile);
  const blocks:Task[]=[],breaks:TimeRange[]=[];
  const duration=bounded(profile?.sessionMinutes,state.study.focusMinutes,10,90),rest=bounded(profile?.breakMinutes,state.study.breakMinutes,1,30);
  let budget=Math.max(0,targetMinutes-planned);
  if(planned>available.availableMinutes)conflicts.push('Your saved plan exceeds the available time. Review it before adding more.');
  if(conflicts.length)return {blocks,breaks,availability:available,targetMinutes,unplaced:candidates.length,notes,conflicts};

  // Protect another subject alongside the nearest test, without pretending every topic needs revision.
  const nearest=candidates.find(x=>x.testId),protectedIdea=nearest&&candidates.find(x=>x.subject!==nearest.subject&&(x.dueReview||x.activity==='learn'||x.activity==='retry'));
  if(protectedIdea&&budget>=duration*2){
    candidates=[candidates[0],protectedIdea,...candidates.slice(1).filter(x=>x.key!==protectedIdea.key)];
    notes.push('One session protects another subject alongside your nearest test.');
  }
  const seen=new Set(state.tasks.filter(t=>t.day===date).map(t=>t.id));
  if(options.includeBacklog!==false){
    const backlog=state.tasks.filter(t=>t.day<date&&!t.done&&!state.tasks.some(other=>other.id!==t.id&&other.originalDay===t.day&&other.chapter===t.chapter&&other.day>=date));
    const next=backlog.sort((a,b)=>a.day.localeCompare(b.day)).slice(0,2);
    for(const task of next){
      if(seen.has(task.id)||candidates.some(c=>c.rollover?.id===task.id))continue;
      candidates.splice(nearest?2:0,0,{key:'roll-'+task.id,title:task.title,reason:'Continue your own unfinished task from '+task.day,subject:task.subject,chapter:task.chapter,minutes:Math.min(task.minutes,duration),rollover:task,activity:'retry',dueReview:false,allocation:-1,reviewAge:0,clarity:0});
    }
  }
  const placedActivities=new Set<string>();
  for(const idea of candidates){
    if(budget<10)break;
    if(idea.activityId&&placedActivities.has(idea.activityId))continue;
    const desired=Math.min(idea.minutes,duration,budget);
    const window=windows.find(w=>w.end-w.start>=desired);
    if(!window)continue;
    const start=window.start;
    const id=idea.rollover?.id??'plan-'+date+'-'+idea.key;
    if(seen.has(id))continue;
    const block:Task={id,title:idea.title,day:date,time:clock(start),minutes:desired,subject:idea.subject,chapter:idea.chapter,priority:idea.testId?'High':'Normal',due:idea.testDay??'',done:false,reason:idea.reason,...(idea.activityId?{activityId:idea.activityId}:{}),...(idea.rollover?{originalDay:idea.rollover.originalDay??idea.rollover.day}:{})};
    blocks.push(block);seen.add(id);if(idea.activityId)placedActivities.add(idea.activityId);
    budget-=desired;
    const end=start+desired;
    const breakEnd=Math.min(available.usableWindows.find(w=>start>=w.start&&end<=w.end)?.end??end,end+rest);
    windows=orderedWindows(subtract(windows,[{start:Math.max(0,start-rest),end:Math.min(1440,end+rest)}]),profile);
    if(breakEnd>end)breaks.push({start:clock(end),end:clock(breakEnd),label:'Rest and reset'});
  }
  const unplaced=candidates.filter(c=>!blocks.some(b=>c.rollover?b.id===c.rollover.id:c.activityId?b.activityId===c.activityId:b.id==='plan-'+date+'-'+c.key)).length;
  if(!blocks.length&&!candidates.length)notes.push('Add a chapter status or test coverage for a more specific plan.');
  if(unplaced)notes.push('Other topic activities stay available for another day; nothing has been moved or removed.');
  if(!candidates.length)notes.push('Record a topic status in Academics to receive a specific learning activity. Unmarked topics are not treated as unfinished work.');
  if(targetMinutes>available.availableMinutes)notes.push('Your chosen target is larger than today’s available time. The proposal only uses time that fits.');
  return {blocks:blocks.sort((a,b)=>a.time.localeCompare(b.time)),breaks:breaks.sort((a,b)=>a.start.localeCompare(b.start)),availability:available,targetMinutes,unplaced,notes,conflicts};
}

export function dailyMetrics(state:State,date:string,provided?:PlanningProfile){
  const profile=profileOf(state,provided),available=availability(state,date,profile),ideas=personalizedSuggestions(state,date,profile);
  const tasks=state.tasks.filter(t=>t.day===date),sessions=state.study.sessions.filter(s=>s.day===date&&s.kind==='focus');
  const plannedMinutes=tasks.reduce((sum,t)=>sum+Math.max(0,t.minutes),0);
  const actualMinutes=sessions.reduce((sum,s)=>sum+Math.max(0,s.seconds),0)/60;
  const targetMinutes=targetFor(state,date,profile,available,ideas);
  return {targetMinutes,recommendedMinutes:recommendedMinutes(state,date,profile,available,ideas),plannedMinutes,actualMinutes,
    remainingMinutes:tasks.filter(t=>!t.done).reduce((sum,t)=>sum+Math.max(0,t.minutes),0),
    remainingTargetMinutes:Math.max(0,targetMinutes-actualMinutes),targetPercent:targetMinutes>0?Math.min(100,actualMinutes/targetMinutes*100):null,
    completedTasks:tasks.filter(t=>t.done).length,totalTasks:tasks.length,remainingTasks:tasks.filter(t=>!t.done).length,completedSessions:sessions.length};
}

export function academicMetrics(state:State,date:string):AcademicCount&{subjects:(AcademicCount&{subject:string})[]}{
  function count(ids:string[]):AcademicCount {
    const progress=ids.map(id=>state.progress[id]);
    const known=progress.filter(Boolean).length;
    const complete=progress.filter(p=>learned(p?.status)).length;
    return {total:ids.length,known,unknown:ids.length-known,learned:complete,
      learning:progress.filter(p=>p?.status==='Learning').length,
      notStarted:progress.filter(p=>p?.status==='Pending'||(p?.status as string)==='Not started').length,
      needsRevision:progress.filter(p=>(p?.status as string)==='Needs revision').length,
      difficult:progress.filter(p=>p?.rating==='Difficult').length,
      due:progress.filter(p=>Boolean(p?.next&&p.next<=date)||(p?.status as string)==='Needs revision').length,
      percent:ids.length?complete/ids.length*100:0};
  }
  return {...count(chapters.map(c=>c.id)),subjects:subjects.map(s=>({subject:s.id,...count(chapters.filter(c=>c.subject===s.id).map(c=>c.id))}))};
}

/** Spread missed activities over the next week, retaining their identity until approved. */
export function rescueBacklog(state:State,start:string,provided?:PlanningProfile,days=7):PlanProposal {
  const draft=structuredClone(state),blocks:Task[]=[],breaks:TimeRange[]=[],notes:string[]=[];
  const pending=state.tasks.filter(t=>!t.done&&t.day<start).sort((a,b)=>a.day.localeCompare(b.day));
  const profile=profileOf(state,provided),rest=bounded(profile?.breakMinutes,state.study.breakMinutes,1,30);
  let index=0;
  for(let offset=0;offset<Math.min(14,Math.max(1,days))&&index<pending.length;offset++){
    const day=plus(start,offset),available=availability(draft,day,profile);
    if(available.conflicts.length)continue;
    const metrics=dailyMetrics(draft,day,profile);
    let budget=Math.max(0,metrics.targetMinutes-metrics.plannedMinutes),placed=0;
    const windows=orderedWindows(available.windows,profile);
    while(index<pending.length&&placed<2){
      const task=pending[index];
      // Preserve a custom task's duration; never silently truncate work during rescue.
      const window=windows.find(w=>w.end-w.start>=task.minutes);
      if(!window||task.minutes>budget)break;
      const moved={...task,day,time:clock(window.start),originalDay:task.originalDay??task.day,reason:'Rescue proposal · unfinished from '+task.day};
      blocks.push(moved);draft.tasks=draft.tasks.map(t=>t.id===task.id?moved:t);
      window.start+=task.minutes+rest;budget-=task.minutes;index++;placed++;
    }
  }
  if(index<pending.length)notes.push((pending.length-index)+' activities need more available time; they remain unchanged.');
  notes.push('At most two unfinished activities are proposed per day. Your current plan changes only after approval.');
  return {blocks,breaks,availability:availability(state,start,profile),targetMinutes:dailyMetrics(state,start,profile).targetMinutes,unplaced:pending.length-index,notes,conflicts:[]};
}
