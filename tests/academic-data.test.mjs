import test from 'node:test';
import assert from 'node:assert/strict';
import {empty} from '../dist/js/model.js';
import {academicNodes,activityDefinitions,activityById,nextActivityForNode} from '../dist/js/academic-data.js';
import {validateVaultState} from '../dist/js/vault.js';

const node=academicNodes.find(item=>item.kind==='topic');

test('the verified Electric Charges and Fields topic slice carries current-session provenance and no invented references',()=>{
  const topics=academicNodes.filter(item=>item.chapterId==='physics-1-1'&&item.kind==='topic');
  assert.equal(topics.length,6);
  assert.ok(topics.every(item=>item.source.session==='2026-27'&&item.source.status==='verified'&&item.source.pdfPage===12));
  assert.ok(topics.every(item=>!item.source.url.includes('ncert')&&!/page=\d+/.test(item.source.url)));
  assert.ok(activityDefinitions.every(item=>item.steps.length>=3&&item.completionEvidence.length>=2&&item.estimatedMinutes>0));
});

test('unmarked topic progress produces no inferred next activity',()=>{
  assert.equal(nextActivityForNode(node.id,undefined,{}),undefined);
  assert.equal(nextActivityForNode(node.id,{status:'not-started',updatedAt:'2026-11-21'},{}).kind,'first-learning');
});

test('first-learning completion proposes practice and does not itself claim topic mastery',()=>{
  const learn=activityDefinitions.find(activity=>activity.nodeId===node.id&&activity.kind==='first-learning');
  const practice=activityDefinitions.find(activity=>activity.nodeId===node.id&&activity.kind==='practice');
  const next=nextActivityForNode(node.id,{status:'not-started',updatedAt:'2026-11-21'}, {[learn.id]:{activityId:learn.id,status:'completed',completedSteps:learn.steps.map(step=>step.id),understanding:'Okay',updatedAt:'2026-11-21'}});
  assert.equal(next.id,practice.id);
});

test('legacy vault profiles gain empty academic state without losing existing tasks or progress',()=>{
  const legacy=empty();legacy.name='Aastha';legacy.tasks.push({id:'old-task',title:'Personal task',day:'2026-11-23',time:'',minutes:25,subject:'',chapter:'',priority:'Normal',due:'',done:false});
  legacy.progress['physics-1-1']={status:'Learning'};
  const restored=validateVaultState(legacy);
  assert.deepEqual(restored.tasks.map(task=>task.id),['old-task']);
  assert.equal(restored.progress['physics-1-1'].status,'Learning');
  assert.deepEqual(restored.academic.topicProgress,{});
  assert.deepEqual(restored.academic.activities,{});
});
