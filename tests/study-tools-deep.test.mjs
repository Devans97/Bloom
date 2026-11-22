import test from 'node:test';
import assert from 'node:assert/strict';
import {
  studyDefaults,
  saveFocusSession,
  focusElapsed,
  recoverFocus,
  resultError,
  topicEvidence,
  scoreTrend,
  recordedErrorEvidence,
  errorCategories
} from '../dist/js/study-data.js';

test('study tools: focus elapsed calculation is capped at target seconds and monotonic', () => {
  const active = {
    id: 'session-1',
    title: 'Focus on Electric Charges',
    subject: 'physics',
    chapter: 'physics-1-1',
    targetSeconds: 1500, // 25 min
    elapsedMs: 60000,    // 1 min already elapsed
    runningSince: 1000,
    kind: 'focus'
  };

  // 10 seconds later
  const elapsed = focusElapsed(active, 11000);
  assert.equal(elapsed, 70000);

  // Far in the future: must cap at targetSeconds * 1000
  const capped = focusElapsed(active, 10000000);
  assert.equal(capped, 1500000);
});

test('focus recovery: tab reload stops running timer and preserves durable checkpoint', () => {
  const active = {
    id: 'session-2',
    title: 'Derivations Review',
    subject: 'physics',
    chapter: 'physics-1-1',
    targetSeconds: 1800,
    elapsedMs: 300000, // 5 min
    runningSince: Date.now() - 50000,
    kind: 'focus'
  };

  const recovered = recoverFocus(active);
  assert.ok(recovered);
  assert.equal(recovered.runningSince, null);
  assert.equal(recovered.elapsedMs, 300000);
});

test('test analysis validator: strictly catches arithmetic mismatches and missing labels', () => {
  // Missing required fields
  assert.notEqual(
    resultError({ title: '', day: '2026-11-21', subject: 'physics', score: 20, max: 25, questions: [] }),
    ''
  );

  // Score exceeding maximum
  assert.notEqual(
    resultError({ title: 'Midterm', day: '2026-11-21', subject: 'physics', score: 30, max: 25, questions: [] }),
    ''
  );

  // Negative marks
  assert.notEqual(
    resultError({ title: 'Midterm', day: '2026-11-21', subject: 'physics', score: -5, max: 25, questions: [] }),
    ''
  );

  // Question sum mismatch
  const mismatched = {
    id: 'test-1',
    title: 'Unit Test',
    day: '2026-11-21',
    subject: 'physics',
    score: 25,
    max: 30,
    note: '',
    source: 'manual',
    questions: [
      { id: 'q1', label: 'Q1', score: 10, max: 15, chapter: 'physics-1-1', category: 'Concept', note: '' },
      { id: 'q2', label: 'Q2', score: 10, max: 10, chapter: 'physics-1-2', category: 'Calculation', note: '' }
      // Sum is 20/25, but test total claims 25/30!
    ]
  };
  assert.notEqual(resultError(mismatched), '');

  // Valid test
  const valid = {
    id: 'test-2',
    title: 'Unit Test Valid',
    day: '2026-11-21',
    subject: 'physics',
    score: 20,
    max: 25,
    note: '',
    source: 'manual',
    questions: [
      { id: 'q1', label: 'Q1', score: 10, max: 15, chapter: 'physics-1-1', category: 'Concept', note: '' },
      { id: 'q2', label: 'Q2', score: 10, max: 10, chapter: 'physics-1-2', category: 'Calculation', note: '' }
    ]
  };
  assert.equal(resultError(valid), '');
});

test('topic evidence & score trends: correctly aggregate chapter statistics across tests', () => {
  const tests = [
    {
      id: 't1',
      title: 'Diagnostic 1',
      day: '2026-11-01',
      subject: 'chemistry',
      score: 18,
      max: 20,
      note: '',
      source: 'manual',
      questions: [
        { id: 'q1', label: 'Q1', score: 8, max: 10, chapter: 'chemistry-1-1', category: 'Concept', note: '' },
        { id: 'q2', label: 'Q2', score: 10, max: 10, chapter: 'chemistry-2-1', category: 'Calculation', note: '' }
      ]
    },
    {
      id: 't2',
      title: 'Diagnostic 2',
      day: '2026-11-15',
      subject: 'chemistry',
      score: 15,
      max: 20,
      note: '',
      source: 'manual',
      questions: [
        { id: 'q1', label: 'Q1', score: 5, max: 10, chapter: 'chemistry-1-1', category: 'Concept', note: '' },
        { id: 'q2', label: 'Q2', score: 10, max: 10, chapter: 'chemistry-2-1', category: 'Presentation', note: '' }
      ]
    }
  ];

  const evidence = topicEvidence(tests);
  assert.equal(evidence.length, 2);

  const ch1 = evidence.find(e => e.chapter === 'chemistry-1-1');
  assert.ok(ch1);
  assert.equal(ch1.score, 13);
  assert.equal(ch1.max, 20);
  assert.equal(ch1.questions, 2);
  assert.equal(ch1.tests, 2);

  const ch2 = evidence.find(e => e.chapter === 'chemistry-2-1');
  assert.ok(ch2);
  assert.equal(ch2.score, 20);
  assert.equal(ch2.max, 20);

  // Score trend must be sorted chronologically
  const trend = scoreTrend(tests, 'chemistry');
  assert.equal(trend[0].day, '2026-11-01');
  assert.equal(trend[1].day, '2026-11-15');

  // Error categories frequency
  const errors = recordedErrorEvidence(tests);
  assert.ok(errors.some(e => e.category === 'Concept' && e.questions === 2));
});
