export interface PaperAttempt { id:string; resource:string; subject:string; title:string; day:string; note:string; }
export interface PracticalItem { id:string; subject:string; title:string; kind:'Practical'|'Viva'|'Project'|'File'|'Other'; due:string; done:boolean; completedAt?:string; }
export interface WritingPractice { id:string; title:string; subject:string; prompt:string; answer:string; checks:string[]; createdAt:string; updatedAt:string; }
export interface FutureLetter { id:string; title:string; body:string; reveal:string; createdAt:string; }
export interface ReminderPreferences { enabled:boolean; quietFrom:string; quietTo:string; notified:string[]; }
export interface LifeData { achievements:boolean; papers:PaperAttempt[]; practicals:PracticalItem[]; writing:WritingPractice[]; letters:FutureLetter[]; reminders:ReminderPreferences; }
export const lifeDefaults=():LifeData=>({achievements:false,papers:[],practicals:[],writing:[],letters:[],reminders:{enabled:true,quietFrom:'22:00',quietTo:'07:00',notified:[]}});

export interface GardenEvidence { tasks:{done:boolean}[]; reviews:unknown[]; study?:{sessions:{kind:string;seconds:number}[]}; }
export function gardenStats(state:GardenEvidence){
  const completed=state.tasks.filter(task=>task.done).length;
  const reviews=state.reviews.length;
  const seconds=(state.study?.sessions??[]).filter(session=>session.kind==='focus').reduce((sum,session)=>sum+Math.max(0,session.seconds),0);
  const focusMinutes=Math.floor(seconds/60), focusGrowth=Math.floor(seconds/1500);
  const growth=completed+reviews+focusGrowth;
  return {completed,reviews,focusMinutes,growth,flowers:Math.floor(growth/5),leaves:growth%5};
}
export function quietNow(from:string,to:string,date=new Date()):boolean{
  if(!/^\d\d:\d\d$/.test(from)||!/^\d\d:\d\d$/.test(to)||from===to)return false;
  const now=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(date);
  return from<to?now>=from&&now<to:now>=from||now<to;
}
