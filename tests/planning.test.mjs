import test from 'node:test';
import assert from 'node:assert/strict';
import {empty, minute, plus} from '../dist/js/model.js';
import {chapters} from '../dist/js/curriculum.js';
import {academicNodes} from '../dist/js/academic-data.js';
import {availability,generatePlan,personalizedSuggestions,dailyMetrics,academicMetrics,rescueBacklog,defaultPlanningProfile} from '../dist/js/planning.js';

const day='2026-11-23';
const profile=()=>({...defaultPlanningProfile(),wake:'07:00',sleep:'23:00',schoolDays:[],tuitionDays:[],meals:[{start:'13:00',end:'13:30',label:'Lunch'},{start:'21:00',end:'21:30',label:'Dinner'}]});
const task=(id,extra={})=>({id,title:'Learn electric fields',day,time:'',minutes:25,subject:'physics',chapter:'',priority:'Normal',due:'',done:false,...extra});
const dayOverride=(school,tuition)=>({start:'07:00',end:'23:00',school,tuition,limit:180});
const physics=chapters.find(c=>c.subject==='physics');
const chemistry=chapters.find(c=>c.subject==='chemistry');
const topicsFor=(s,subject)=>academicNodes.filter(node=>node.subjectId===subject&&node.kind==='topic');
const markTopic=(s,node,status='not-started',rating)=>{s.academic.topicProgress[node.id]={status,updatedAt:day,...(rating?{rating}:{})};};

test('all four daily school and tuition combinations independently change available time',()=>{
  const s=empty(),p={...profile(),meals:[]};
  const values=[];
  for(const [school,tuition] of [[false,false],[true,false],[false,true],[true,true]]){
    s.days[day]=dayOverride(school,tuition);
    const a=availability(s,day,p);values.push(a.availableMinutes);
    assert.equal(a.school,school);assert.equal(a.tuition,tuition);
  }
  assert.deepEqual(values,[960,600,720,360]);
});

test('Sundays and weekdays obey only selected recurrence or independent date overrides',()=>{
  const s=empty(),p={...profile(),schoolDays:[1],tuitionDays:[0]};
  assert.equal(availability(s,'2026-11-22',p).tuition,true);
  assert.equal(availability(s,day,p).school,true);
  assert.equal(availability(s,day,p).tuition,false);
  s.days[day]=dayOverride(false,true);
  assert.equal(availability(s,day,p).school,false);
  assert.equal(availability(s,day,p).tuition,true);
});

test('sleep, meals, travel and personal commitments subtract their union without double counting',()=>{
  const s=empty(),p={...profile(),wake:'08:00',sleep:'22:00',schoolStart:'09:00',schoolEnd:'12:00',schoolDays:[1],travelMinutes:30,
    meals:[{start:'12:00',end:'13:00',label:'Lunch'}],commitments:[{start:'12:30',end:'13:30',label:'Rest'}]};
  const a=availability(s,day,p);
  // 14 waking hours minus 08:30–13:30, with overlap counted once.
  assert.equal(a.availableMinutes,540);
  assert.deepEqual(a.usableWindows,[{start:480,end:510},{start:810,end:1320}]);
  assert.equal(a.conflicts.length,0);
});

test('missing routine never creates invented availability; invalid personal commitments fail closed',()=>{
  assert.equal(availability(empty(),day).availableMinutes,0);
  const p={...profile(),commitments:[{start:'15:00',end:'14:00',label:'Uncertain appointment'}]};
  const a=availability(empty(),day,p);
  assert.equal(a.availableMinutes,0);assert.ok(a.conflicts.length);
});

test('generated sessions avoid commitments, saved activities and each other, with real breaks',()=>{
  const s=empty(),p={...profile(),schoolDays:[1],tuitionDays:[1],travelMinutes:10};
  for(const node of [...topicsFor(s,'physics').slice(0,3)])markTopic(s,node);
  s.tasks.push(task('existing',{time:'15:00',minutes:30}));
  const before=structuredClone(s),draft=generatePlan(s,day,p,{targetMinutes:180});
  assert.deepEqual(s,before,'generation is a proposal, never a write');
  assert.ok(draft.blocks.length>0);
  for(const block of draft.blocks){
    const start=minute(block.time),end=start+block.minutes;
    assert.ok(draft.availability.usableWindows.some(w=>start>=w.start&&end<=w.end));
    assert.ok(end<=895||start>=935,'leave five minutes around saved 15:00–15:30');
  }
  for(let i=1;i<draft.blocks.length;i++)assert.ok(minute(draft.blocks[i].time)>=minute(draft.blocks[i-1].time)+draft.blocks[i-1].minutes+p.breakMinutes);
  assert.ok(draft.breaks.length>0);
});

test('session length and preferred period answers change the actual proposal',()=>{
  const s=empty(),short={...profile(),sessionMinutes:15,preferredPeriods:['evening']};
  for(const node of topicsFor(s,'physics').slice(0,4))markTopic(s,node);
  const longer={...short,sessionMinutes:45,preferredPeriods:['morning']};
  const a=generatePlan(s,day,short,{targetMinutes:90}),b=generatePlan(s,day,longer,{targetMinutes:90});
  assert.ok(a.blocks.length>0&&b.blocks.length>0);
  assert.ok(a.blocks.every(t=>t.minutes===15));
  assert.ok(b.blocks.every(t=>t.minutes<=45));
  assert.ok(b.blocks.some(t=>t.minutes>15));
  assert.ok(minute(a.blocks[0].time)>=1020);
  assert.ok(minute(b.blocks[0].time)<720);
});

test('near tests rank confirmed topic activities and never turn unmarked topics into work',()=>{
  const s=empty(),p=profile(),topic=topicsFor(s,'physics')[0],other=topicsFor(s,'physics')[1];
  markTopic(s,topic,'not-started');
  s.tests.push({id:'school-physics',title:'School Physics test',day:plus(day,3),subject:'physics',coverage:[topic.chapterId]});
  const ideas=personalizedSuggestions(s,day,p);
  assert.equal(ideas[0].topicId,topic.id);
  assert.equal(ideas[0].activity,'learn');
  assert.match(ideas[0].reason,/School Physics test/);
  assert.equal(ideas.some(x=>x.topicId===other.id),false);
  assert.ok(generatePlan(s,day,p,{targetMinutes:60}).blocks.some(x=>x.activityId===ideas[0].activityId));
});

test('difficulty rating changes topic priority without changing the official allocation scope',()=>{
  const s=empty(),[a,b]=topicsFor(s,'physics');
  markTopic(s,a,'practice-needed','Easy');markTopic(s,b,'practice-needed','Difficult');
  const ideas=personalizedSuggestions(s,'2027-04-01',profile());
  assert.equal(ideas[0].topicId,b.id);
  assert.equal(ideas[1].topicId,a.id);
});

test('daily targets leave rest time, adapt to day load and never equate availability with study',()=>{
  const s=empty(),p=profile();for(const node of academicNodes)markTopic(s,node,'not-started');
  const free=generatePlan(s,day,p);
  s.days[day]={...dayOverride(true,true),limit:undefined};
  const busy=generatePlan(s,day,p);
  assert.ok(free.targetMinutes>busy.targetMinutes);
  assert.ok(free.targetMinutes<free.availability.availableMinutes);
  assert.ok(busy.blocks.reduce((n,t)=>n+t.minutes,0)<=busy.targetMinutes);
});

test('a large first-use backlog still produces a manageable default study plan',()=>{
  const proposal=generatePlan(empty(),day,defaultPlanningProfile());
  assert.equal(proposal.targetMinutes,0);
  assert.equal(proposal.blocks.length,0);
  assert.ok(proposal.notes.some(note=>note.includes('Record a topic status')));
});

test('metrics distinguish actual focus from estimates and breaks, and preserve unknown progress',()=>{
  const s=empty(),p=profile();s.days[day]={...dayOverride(false,false),limit:240};
  s.tasks.push(task('done',{done:true,minutes:60}),task('left',{minutes:30}));
  s.study.sessions.push({id:'focus',title:'Focus',subject:'physics',chapter:'',day,seconds:9000,kind:'focus',endedAt:day+'T12:00:00Z'},
    {id:'break',title:'Break',subject:'',chapter:'',day,seconds:600,kind:'break',endedAt:day+'T12:10:00Z'});
  const daily=dailyMetrics(s,day,p);
  assert.equal(daily.actualMinutes,150);assert.equal(daily.targetPercent,62.5);
  assert.equal(daily.plannedMinutes,90);assert.equal(daily.remainingMinutes,30);
  assert.equal(daily.completedTasks,1);assert.equal(daily.remainingTasks,1);assert.equal(daily.completedSessions,1);
  const emptyAcademic=academicMetrics(s,day);
  assert.equal(emptyAcademic.learned,0);assert.equal(emptyAcademic.unknown,chapters.length);assert.equal(emptyAcademic.percent,0);
  s.progress[physics.id]={status:'Completed'};s.progress[chemistry.id]={status:'Learning',rating:'Difficult'};
  const academic=academicMetrics(s,day);
  assert.equal(academic.learned,1);assert.equal(academic.learning,1);assert.equal(academic.difficult,1);assert.equal(academic.known,2);
  assert.ok(Math.abs(academic.percent-100/chapters.length)<1e-10);
});

test('applying a proposal cannot generate a duplicate activity, but other topics in that chapter remain eligible',()=>{
  const s=empty(),p=profile();for(const node of topicsFor(s,'physics').slice(0,3))markTopic(s,node);const first=generatePlan(s,day,p,{targetMinutes:75});
  s.tasks.push(...first.blocks);
  const again=generatePlan(s,day,p,{targetMinutes:75});
  const savedActivityIDs=new Set(s.tasks.map(task=>task.activityId).filter(Boolean));
  assert.ok(again.blocks.every(task=>!savedActivityIDs.has(task.activityId)));
  assert.equal(new Set([...first.blocks,...again.blocks].map(t=>t.activityId)).size,first.blocks.length+again.blocks.length);
});

test('saved schedule conflicts remain visible and block additional generated work',()=>{
  const s=empty(),p={...profile(),tuitionDays:[1]};
  s.tasks.push(task('collision',{time:'18:00'}));
  const proposal=generatePlan(s,day,p);
  assert.ok(proposal.conflicts.some(x=>x.includes('outside')));assert.equal(proposal.blocks.length,0);
  assert.equal(s.tasks[0].time,'18:00');
});

test('sessions crossing preferred-period boundaries still leave a full break',()=>{
  const s=empty(),p={...profile(),wake:'11:35',sleep:'13:00',meals:[],sessionMinutes:25,breakMinutes:10};
  markTopic(s,topicsFor(s,'physics')[0]);
  const draft=generatePlan(s,day,p,{targetMinutes:75});
  assert.equal(draft.blocks[0].time,'11:35');
  for(let i=1;i<draft.blocks.length;i++)assert.ok(minute(draft.blocks[i].time)>=minute(draft.blocks[i-1].time)+draft.blocks[i-1].minutes+10);
});

test('backlog rescue spreads unchanged-duration activities over days without mutating history',()=>{
  const s=empty(),p={...profile(),maxStudyMinutes:100};
  for(let i=0;i<6;i++)s.tasks.push(task('old-'+i,{day:plus(day,-2),minutes:25}));
  const before=structuredClone(s),rescue=rescueBacklog(s,day,p,5);
  assert.deepEqual(s,before);
  assert.equal(rescue.blocks.length,6);assert.equal(rescue.unplaced,0);
  const counts={};for(const t of rescue.blocks){counts[t.day]=(counts[t.day]??0)+1;assert.equal(t.minutes,25);assert.equal(t.originalDay,plus(day,-2));}
  assert.ok(Object.values(counts).every(x=>x<=2));
  assert.ok(Object.keys(counts).length>=3);
});
