import test from 'node:test';
import assert from 'node:assert/strict';
import { CBSE_CHAPTERS } from '../dist/js/curriculum.js';
import { buildActionableActivity } from '../dist/js/academic-engine.js';
import { initialAppState } from '../dist/js/storage.js';
import { getRankedStudyIdeas, generatePlanProposal } from '../dist/js/planner-engine.js';

test('generated activities must be actionable and never generic "Prepare [chapter]"', () => {
  const phyChapter = CBSE_CHAPTERS.find(c => c.subjectId === 'physics');
  assert.ok(phyChapter);
  const topic = phyChapter.topics[0];
  assert.ok(topic);

  // Test learning mode
  const act = buildActionableActivity(topic, phyChapter, 'learning');
  assert.ok(act.title.length > 5);
  assert.doesNotMatch(act.title, /^Prepare\s+/i, 'Never generate generic "Prepare [chapter]"');
  assert.ok(act.learningObjective.length > 10);
  assert.ok(Array.isArray(act.steps) && act.steps.length >= 3);
  assert.ok(act.resourceRefs.length > 0);
  assert.ok(act.completionEvidence.length > 5);

  // Test proposal generation from state
  const state = initialAppState();
  state.chapterProgress[phyChapter.id] = { status: 'Learning' };
  const proposal = generatePlanProposal(state, '2026-11-23');
  assert.ok(proposal.blocks.length > 0);

  for (const block of proposal.blocks) {
    assert.doesNotMatch(block.title, /^Prepare\s+/i);
    assert.ok(block.learningObjective.length > 10);
    assert.ok(block.steps.length >= 3);
    assert.ok(block.resourceRefs.length > 0);
    assert.ok(block.completionEvidence.length > 5);
    assert.equal(block.origin, 'generated');
  }
});
