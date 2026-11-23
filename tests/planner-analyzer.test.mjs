import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePlannerText } from '../dist/js/import-parser.js';
import { matchChapterCoverage, generateStudySessionsForTests, SAMPLE_CBSE_PLANNER } from '../dist/js/planner-analyzer.js';

test('planner analyzer: matches chapter coverage accurately from test text', () => {
  const phyLine = '28/11/2026 Physics Periodic Test: Electric Charges and Fields, Electrostatic Potential';
  const phyMatched = matchChapterCoverage(phyLine, 'physics');
  assert.ok(phyMatched.includes('physics-1-1'), 'Should match Electric Charges and Fields');
  assert.ok(phyMatched.includes('physics-1-2'), 'Should match Electrostatic Potential');

  const chemLine = '02/12/2026 Chemistry Unit Test: Solutions and Electrochemistry';
  const chemMatched = matchChapterCoverage(chemLine, 'chemistry');
  assert.ok(chemMatched.includes('chemistry-1-1'), 'Should match Solutions');
  assert.ok(chemMatched.includes('chemistry-2-1'), 'Should match Electrochemistry');

  const mathLine = '05/12/2026 Mathematics Assessment: Matrices and Determinants';
  const mathMatched = matchChapterCoverage(mathLine, 'math');
  assert.ok(mathMatched.includes('math-2-1'), 'Should match Matrices');
  assert.ok(mathMatched.includes('math-2-2'), 'Should match Determinants');
});

test('planner analyzer: automatically generates tailored study sessions before test dates', () => {
  const candidates = parsePlannerText(SAMPLE_CBSE_PLANNER);
  assert.equal(candidates.length, 5, 'Should parse all 5 sample tests');

  for (const c of candidates) {
    c.coverage = matchChapterCoverage(c.source, c.subject);
  }

  const sessions = generateStudySessionsForTests(candidates, undefined, '2026-11-23');
  assert.ok(sessions.length >= 10, 'Should generate robust schedule of prep sessions');

  // Verify structure of first session
  const s0 = sessions[0];
  assert.ok(s0.id, 'Session should have unique id');
  assert.ok(s0.title, 'Session should have title');
  assert.ok(s0.day, 'Session should have scheduled day');
  assert.ok(s0.time, 'Session should have scheduled time');
  assert.ok(s0.minutes > 0, 'Session should have duration');
  assert.equal(s0.priority, 'High', 'Test prep session should be High priority');
  assert.ok(s0.reason, 'Session should have a reason');

  // Verify sessions are before test dates
  for (const s of sessions) {
    assert.ok(s.day <= s.due, `Session day ${s.day} should be on or before test due date ${s.due}`);
  }
});
