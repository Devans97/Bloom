import test from 'node:test';
import assert from 'node:assert/strict';
import { getRevisionIntervalDays, addDays } from '../dist/js/planner-engine.js';
import { computeAcademicProgress } from '../dist/js/academic-engine.js';
import { initialAppState } from '../dist/js/storage.js';
import { CBSE_CHAPTERS } from '../dist/js/curriculum.js';

test('shared clarity rating produces exact revision intervals', () => {
  assert.equal(getRevisionIntervalDays('Easy'), 7);
  assert.equal(getRevisionIntervalDays('Okay'), 3);
  assert.equal(getRevisionIntervalDays('Difficult'), 1);

  const today = '2026-11-23';
  assert.equal(addDays(today, getRevisionIntervalDays('Easy')), '2026-11-30');
  assert.equal(addDays(today, getRevisionIntervalDays('Okay')), '2026-11-26');
  assert.equal(addDays(today, getRevisionIntervalDays('Difficult')), '2026-11-24');
});

test('academic progress starts honest with unmarked chapters as unknown', () => {
  const state = initialAppState();
  const prog = computeAcademicProgress(state);

  assert.equal(prog.totalChapters, CBSE_CHAPTERS.length);
  assert.equal(prog.learnedCount, 0);
  assert.equal(prog.overallPercent, 0);
  assert.equal(prog.unknownCount, CBSE_CHAPTERS.length);
});
