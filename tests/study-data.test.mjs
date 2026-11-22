import test from 'node:test';
import assert from 'node:assert/strict';
import {studyDefaults,focusElapsed,recoverFocus,saveFocusSession,resultError,topicEvidence,scoreTrend,recordedErrorEvidence} from '../dist/js/study-data.js';

test('study workspace starts with no recorded sessions, mistakes or results',()=>{
  const data=studyDefaults();assert.deepEqual(data.sessions,[]);assert.deepEqual(data.mistakes,[]);assert.deepEqual(data.results,[]);assert.equal(data.activeFocus,null);
});
test('focus timer counts actual running time, preserves pause and caps at the planned duration',()=>{
  const active={id:'s',title:'Synthetic session',subject:'physics',chapter:'',targetSeconds:60,elapsedMs:10000,runningSince:100000,kind:'focus'};
  assert.equal(focusElapsed(active,105000),15000);
  assert.equal(focusElapsed({...active,runningSince:null},105000),10000);
  assert.equal(focusElapsed(active,500000),60000);
  assert.equal(focusElapsed(active,90000),10000);
});
test('reopening an interrupted session keeps only its durable checkpoint',()=>{
  const active={id:'s',title:'Synthetic session',subject:'physics',chapter:'',taskId:'task-a',targetSeconds:1500,elapsedMs:45000,runningSince:100000,kind:'focus'};
  const recovered=recoverFocus(active);
  assert.equal(recovered.runningSince,null);
  assert.equal(focusElapsed(recovered,10000000),45000);
  assert.equal(recovered.taskId,'task-a');
  assert.equal(active.runningSince,100000);
  assert.equal(recoverFocus(null),null);
});
test('saving focus retains task linkage and notes without fabricating planned minutes',()=>{
  const data=studyDefaults();
  data.activeFocus={id:'session-a',title:'Synthetic learning',subject:'physics',chapter:'physics-1-1',taskId:'task-a',targetSeconds:1500,elapsedMs:65000,runningSince:null,kind:'focus'};
  const next=saveFocusSession(data,'2026-11-21','  Check the signs.  ',100000);
  assert.equal(next.sessions[0].seconds,65);
  assert.equal(next.sessions[0].taskId,'task-a');
  assert.equal(next.sessions[0].note,'Check the signs.');
  assert.equal(next.activeFocus,null);
  assert.equal(data.sessions.length,0);
  assert.deepEqual(saveFocusSession(next,'2026-11-21'),next);
  const repeated=saveFocusSession({...next,activeFocus:data.activeFocus},'2026-11-21','',110000);
  assert.equal(repeated.sessions.length,1);
});
test('break records remain separate and an unstarted timer creates no activity',()=>{
  const data=studyDefaults();
  data.activeFocus={id:'b',title:'Break',subject:'',chapter:'',targetSeconds:300,elapsedMs:0,runningSince:null,kind:'break'};
  assert.equal(saveFocusSession(data,'2026-11-21'),data);
  data.activeFocus.elapsedMs=12500;
  const next=saveFocusSession(data,'2026-11-21','',100000);
  assert.equal(next.sessions[0].kind,'break');
  assert.equal(next.sessions[0].seconds,12);
  assert.equal(next.sessions.filter(s=>s.kind==='focus').length,0);
});
const total={id:'a',title:'Synthetic checked test',day:'2026-11-21',subject:'physics',score:35,max:70,questions:[],note:'',source:'manual'};
test('total-only test results never generate chapter evidence',()=>{
  assert.equal(resultError(total),'');assert.deepEqual(topicEvidence([total]),[]);
});
test('question records must match the examiner total and have valid ranges',()=>{
  const q={id:'q',label:'1',score:3,max:5,chapter:'physics-1-1',category:'',note:''};
  assert.match(resultError({...total,questions:[q]}),/add up/);
  assert.equal(resultError({...total,score:3,max:5,questions:[q]}),'');
  assert.match(resultError({...total,score:3,max:5,questions:[{...q,score:6}]}),/question’s marks/);
  assert.match(resultError({...total,score:6,max:10,questions:[q,{...q,id:'q2'}]}),/unique label/);
});
test('topic evidence uses confirmed mappings only and reports sample sizes',()=>{
  const result={...total,score:7,max:10,questions:[{id:'q',label:'1',score:3,max:5,chapter:'physics-1-1',category:'Concept',note:''},{id:'q2',label:'2',score:4,max:5,chapter:'',category:'',note:''}]};
  assert.deepEqual(topicEvidence([result]),[{chapter:'physics-1-1',score:3,max:5,questions:1,tests:1}]);
});
test('score trends preserve subject boundaries and chronological order',()=>{
  assert.deepEqual(scoreTrend([{...total,id:'b',day:'2026-11-22'},total,{...total,id:'m',subject:'math'}],'physics').map(r=>r.id),['a','b']);
});
test('repeated error summaries use only the categories attached to recorded questions',()=>{
  const q={id:'q',label:'1',score:3,max:5,chapter:'',category:'Calculation',note:''};
  assert.deepEqual(recordedErrorEvidence([total,{...total,id:'b',questions:[q]},{...total,id:'c',questions:[{...q,id:'q2'},{...q,id:'q3',category:''}]}]),[{category:'Calculation',questions:2,tests:2}]);
});
