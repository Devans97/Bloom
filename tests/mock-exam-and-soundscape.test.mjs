/**
 * Automated Test Suite: CBSE Mock Examination Simulator & Cognitive Soundscape Engine
 * Verifies paper generation compliance against CBSE official blueprints across all 5 subjects,
 * diagnostic evaluation algorithms, and audio synthesizer state transitions.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCBSEDiagnosticPaper, evaluateTestDiagnostics, CBSE_BLUEPRINTS } from '../dist/js/diagnostic-engine.js';
import { soundSynthesizer } from '../dist/js/audio-synthesizer.js';

test('cbse mock exam generator: produces valid blueprint papers for all 5 official subjects', () => {
  const subjects = ['physics', 'chemistry', 'math', 'english', 'pe'];

  for (const sub of subjects) {
    const paper = generateCBSEDiagnosticPaper(sub);
    const blueprint = CBSE_BLUEPRINTS[sub];

    assert.ok(paper && typeof paper === 'object', `Paper must be an object for ${sub}`);
    assert.strictEqual(paper.totalMarks, blueprint.totalMarks, `Total marks mismatch for ${sub}`);
    assert.strictEqual(paper.durationHours, Math.round(blueprint.durationMinutes / 60), `Duration mismatch for ${sub}`);
    assert.ok(paper.questions.length >= 10, `Question bank too small for diagnostic assembly in ${sub}`);

    // Verify question schema
    for (const q of paper.questions) {
      assert.ok(q.id && q.id.length > 2, 'Question ID missing');
      assert.ok(q.section && q.section.length === 1, 'Section code missing');
      assert.ok(q.marks >= 1 && q.marks <= 5, 'Question marks must be between 1 and 5');
      assert.ok(q.questionText && q.questionText.length > 10, 'Question text missing');
      assert.ok(q.markingScheme && q.markingScheme.length > 5, 'Marking scheme / model answer missing');
    }
  }
});

test('cbse diagnostic evaluator: accurately categorizes chapter competencies and identifies weak areas', () => {
  const mockEvaluations = [
    { chapterId: 'physics-1-1', maxMarks: 10, scoredMarks: 9 },   // 90% -> Mastered
    { chapterId: 'physics-1-2', maxMarks: 10, scoredMarks: 7.5 }, // 75% -> Competent
    { chapterId: 'physics-1-3', maxMarks: 10, scoredMarks: 5.5 }, // 55% -> Needs Work
    { chapterId: 'physics-2-1', maxMarks: 10, scoredMarks: 3 }    // 30% -> Critical Review
  ];

  const result = evaluateTestDiagnostics('mock-eval-01', 'physics', mockEvaluations);

  assert.strictEqual(result.totalMarksScored, 25);
  assert.strictEqual(result.maxMarks, 40);
  assert.strictEqual(result.overallPercentage, 62.5);

  const diagMap = new Map(result.chapterDiagnostics.map(d => [d.chapterId, d]));
  assert.strictEqual(diagMap.get('physics-1-1')?.strengthCategory, 'Mastered');
  assert.strictEqual(diagMap.get('physics-1-2')?.strengthCategory, 'Competent');
  assert.strictEqual(diagMap.get('physics-1-3')?.strengthCategory, 'Needs Work');
  assert.strictEqual(diagMap.get('physics-2-1')?.strengthCategory, 'Critical Review');

  // Verify recommended focus list includes chapters needing work or critical review
  assert.ok(result.recommendedFocusChapters.includes('physics-1-3'));
  assert.ok(result.recommendedFocusChapters.includes('physics-2-1'));
  assert.ok(!result.recommendedFocusChapters.includes('physics-1-1'));
});

test('cognitive soundscape engine: safe state management and volume boundaries', () => {
  const initial = soundSynthesizer.getState();
  assert.strictEqual(typeof initial.isPlaying, 'boolean');
  assert.strictEqual(typeof initial.volume, 'number');

  // Test volume clamping
  soundSynthesizer.setVolume(0.8);
  assert.strictEqual(soundSynthesizer.getState().volume, 0.8);

  soundSynthesizer.setVolume(1.5); // Should cap at 1.0
  assert.strictEqual(soundSynthesizer.getState().volume, 1.0);

  soundSynthesizer.setVolume(-0.5); // Should clamp to 0.0
  assert.strictEqual(soundSynthesizer.getState().volume, 0.0);

  // Restore safe volume
  soundSynthesizer.setVolume(0.4);
  assert.strictEqual(soundSynthesizer.getState().volume, 0.4);
});
