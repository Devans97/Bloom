import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, subjectById } from '../dist/js/curriculum.js';
import { empty, today, plus, suggestions, conflict, freeSlot, markDone, defaultDay, dayFor } from '../dist/js/model.js';
import {academicNodes,activityDefinitions} from '../dist/js/academic-data.js';

test('a fresh profile does not invent personal study history or tasks', () => {
  const state=empty();
  assert.equal(state.tasks.length,0);
  assert.deepEqual(state.progress,{});
  assert.deepEqual(state.reviews,[]);
  assert.deepEqual(suggestions(state,today()),[],'unmarked topics stay unknown and do not create chapter-level tasks');
});

test('Aastha routine defaults reflect her supplied schedule and remain overridable', () => {
  const state=empty();
  state.defaults={...defaultDay};
  assert.deepEqual(defaultDay,{start:'14:30',end:'17:00',school:false,tuition:true,limit:150,lateStart:'21:00'});
  assert.equal(dayFor(state,'2026-11-20').tuition,true);
  assert.equal(dayFor(state,'2026-11-22').tuition,false);
  state.days['2026-11-22']={...defaultDay,tuition:true,school:true};
  assert.equal(dayFor(state,'2026-11-22').tuition,true);
  assert.equal(dayFor(state,'2026-11-22').school,true);
  assert.deepEqual(state.progress,{});
});

test('official dates and the CBSE chapter catalogue are public source facts', () => {
  assert.equal(subjectById('physics').date,'2027-02-16');
  assert.equal(subjectById('math').date,'2027-03-09');
  assert.ok(chapters.length>45);
  assert.ok(chapters.every(c=>c.id&&c.title&&c.allocationGroup));
  assert.ok(chapters.filter(c=>c.subject==='physics').every(c=>c.marks===undefined));
});

test('an explicitly entered eligible test with entered coverage generates a truthful suggestion', () => {
  const state=empty(), day=today(), chapter=chapters.find(c=>c.subject==='physics');
  const topic=academicNodes.find(node=>node.chapterId===chapter.id&&node.kind==='topic');
  state.academic.topicProgress[topic.id]={status:'learning',updatedAt:day};
  state.tests.push({id:'entered-test',title:'School Physics test',day:plus(day,2),subject:'physics',coverage:[chapter.id]});
  const item=suggestions(state,day).find(x=>x.activityId===activityDefinitions.find(a=>a.nodeId===topic.id&&a.kind==='first-learning').id);
  assert.ok(item);
  assert.match(item.reason,/School Physics test/);
});

test('a pending chapter with due revision gets a sourced personal reason', () => {
  const state=empty(), day=today(), chapter=chapters.find(c=>c.subject==='chemistry');
  const topic=academicNodes.find(node=>node.chapterId===chapter.id&&node.kind==='topic');
  state.academic.topicProgress[topic.id]={status:'revision-due',rating:'Difficult',nextReview:day,updatedAt:day};
  const item=suggestions(state,day).find(x=>x.chapter===chapter.id);
  assert.ok(item);
  assert.match(item.reason,/due today/);
});

test('checking off a scheduled task does not silently update chapter mastery', () => {
  const state=empty(), day=today(), chapter=chapters.find(c=>c.subject==='math');
  state.progress[chapter.id]={status:'Practising'};
  state.tasks.push({id:'session',title:'Practise '+chapter.title,day,time:'16:00',minutes:20,subject:'math',chapter:chapter.id,priority:'Normal',due:'',done:false});
  markDone(state,'session',day,'Difficult');
  assert.equal(state.tasks[0].done,true);
  assert.equal(state.progress[chapter.id].status,'Practising');
  assert.equal(state.progress[chapter.id].rating,undefined);
  assert.equal(state.reviews.length,0);
});

test('no time is auto-selected when Aastha has not entered study availability', () => {
  const state=empty();
  assert.equal(freeSlot(state,{id:'x',title:'My study task',day:today(),time:'',minutes:20,subject:'physics',chapter:'',priority:'Normal',due:'',done:false}), '');
});

test('the later study window starts after tuition without inventing an end time', () => {
  const state=empty(), day=today();
  state.defaults={...defaultDay};
  state.days[day]={...defaultDay,tuition:true};
  const late={id:'late',title:'My later study',day,time:'21:15',minutes:25,subject:'physics',chapter:'',priority:'Normal',due:'',done:false};
  assert.equal(conflict(state,late),'');
  assert.match(conflict(state,{...late,time:'20:30'}),/overlaps tuition/);
  state.tasks.push({...late,id:'occupied',time:'14:30',minutes:150});
  assert.equal(freeSlot(state,late),'21:00');
  state.days[day]={...defaultDay,lateStart:undefined};
  assert.match(conflict(state,late),/outside your study windows/);
});

test('conflicts are detected for tasks that Aastha places in the same time', () => {
  const state=empty();
  state.defaults={start:'15:00',end:'21:00',school:false,tuition:false,limit:180};
  state.tasks.push({id:'first',title:'First task',day:today(),time:'16:00',minutes:45,subject:'physics',chapter:'',priority:'Normal',due:'',done:false});
  const issue=conflict(state,{id:'second',title:'Second task',day:today(),time:'16:30',minutes:30,subject:'chemistry',chapter:'',priority:'Normal',due:'',done:false});
  assert.match(issue,/overlaps/);
});
