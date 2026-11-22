export const errorCategories = ['Concept', 'Calculation', 'Presentation', 'Careless', 'Other'] as const;
export type ErrorCategory = typeof errorCategories[number];
export interface FocusSession { id:string; title:string; subject:string; chapter:string; day:string; seconds:number; kind:'focus'|'break'; endedAt:string; taskId?:string; note?:string; rating?:'Easy'|'Okay'|'Difficult'; }
export interface ActiveFocus { id:string; title:string; subject:string; chapter:string; targetSeconds:number; elapsedMs:number; runningSince:number|null; kind:'focus'|'break'; taskId?:string; startedDay?:string; }
export interface Mistake { id:string; subject:string; chapter:string; category:ErrorCategory; note:string; source:string; due:string; resolved:boolean; retries:string[]; question?:string; correctApproach?:string; }
export interface QuestionResult { id:string; label:string; score:number; max:number; chapter:string; category:string; note:string; }
export interface TestResult { id:string; title:string; day:string; subject:string; score:number; max:number; questions:QuestionResult[]; note:string; source:'manual'|'checked sheet'; sourceName?:string; }
export interface StudyData { sessions:FocusSession[]; mistakes:Mistake[]; results:TestResult[]; activeFocus:ActiveFocus|null; focusMinutes:number; breakMinutes:number; }
export const studyDefaults=():StudyData=>({sessions:[],mistakes:[],results:[],activeFocus:null,focusMinutes:25,breakMinutes:5});
export function focusElapsed(active:ActiveFocus,now=Date.now()):number {
  return Math.min(active.targetSeconds*1000,Math.max(0,active.elapsedMs+(active.runningSince===null?0:Math.max(0,now-active.runningSince))));
}
/** A reopened tab has no evidence of attention since its last durable checkpoint. */
export function recoverFocus(active:ActiveFocus|null):ActiveFocus|null {
  return active?{...active,elapsedMs:Math.min(active.targetSeconds*1000,Math.max(0,active.elapsedMs)),runningSince:null}:null;
}
/** Saving is idempotent by session ID; elapsed break time stays separate from study. */
export function saveFocusSession(data:StudyData,day:string,note='',now=Date.now()):StudyData {
  const active=data.activeFocus;
  if(!active)return data;
  const seconds=Math.floor(focusElapsed(active,now)/1000);
  if(seconds<1)return data;
  const session:FocusSession={id:active.id,title:active.title,subject:active.subject,chapter:active.chapter,day,seconds,kind:active.kind,endedAt:new Date(now).toISOString(),...(active.taskId?{taskId:active.taskId}:{}),...(note.trim()?{note:note.trim()}: {})};
  return {...data,sessions:data.sessions.some(s=>s.id===active.id)?data.sessions:[...data.sessions,session],activeFocus:null};
}
export function resultError(result:Pick<TestResult,'title'|'day'|'subject'|'score'|'max'|'questions'>):string {
  if(!result.title.trim()||!result.day||!result.subject)return 'Enter the test name, subject and date.';
  if(!Number.isFinite(result.max)||result.max<=0||!Number.isFinite(result.score)||result.score<0||result.score>result.max)return 'Marks must be between zero and the maximum, and the maximum must be greater than zero.';
  const labels=new Set<string>();
  for(const q of result.questions){
    if(!q.label.trim()||labels.has(q.label.trim().toLowerCase()))return 'Each question needs its own unique label.';
    labels.add(q.label.trim().toLowerCase());
    if(!Number.isFinite(q.max)||q.max<=0||!Number.isFinite(q.score)||q.score<0||q.score>q.max)return 'Check each question’s marks and maximum.';
  }
  if(result.questions.length){
    const marks=result.questions.reduce((n,q)=>n+q.score,0), max=result.questions.reduce((n,q)=>n+q.max,0);
    if(Math.abs(marks-result.score)>.001||Math.abs(max-result.max)>.001)return 'Question marks must add up to the saved total and maximum. Include all marked questions, or save total-only.';
  }
  return '';
}
export function topicEvidence(results:TestResult[]):{chapter:string; score:number; max:number; questions:number; tests:number}[]{
  const records=new Map<string,{chapter:string; score:number; max:number; questions:number; tests:Set<string>}>();
  for(const test of results)for(const q of test.questions){
    if(!q.chapter)continue;
    const record=records.get(q.chapter)??{chapter:q.chapter,score:0,max:0,questions:0,tests:new Set<string>()};
    record.score+=q.score;record.max+=q.max;record.questions++;record.tests.add(test.id);records.set(q.chapter,record);
  }
  return [...records.values()].map(x=>({...x,tests:x.tests.size})).sort((a,b)=>a.score/a.max-b.score/b.max);
}
export function scoreTrend(results:TestResult[],subject:string):TestResult[]{return results.filter(x=>x.subject===subject).sort((a,b)=>a.day.localeCompare(b.day));}
export function recordedErrorEvidence(results:TestResult[]):{category:string;questions:number;tests:number}[]{
  const counts=new Map<string,{category:string;questions:number;tests:Set<string>}>();
  for(const result of results)for(const question of result.questions){
    if(!question.category)continue;
    const value=counts.get(question.category)??{category:question.category,questions:0,tests:new Set<string>()};
    value.questions++;value.tests.add(result.id);counts.set(question.category,value);
  }
  return [...counts.values()].map(x=>({category:x.category,questions:x.questions,tests:x.tests.size})).sort((a,b)=>b.questions-a.questions);
}
