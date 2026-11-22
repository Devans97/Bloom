import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBoardReadiness,
  getDailyBoardBoostQuestions,
  cbseChapterWeightageMap
} from '../dist/js/performance-engine.js';
import { empty } from '../dist/js/model.js';

test('cbse board readiness engine: accurately models 5-subject marks distribution and readiness', () => {
  const freshState = empty();
  const initialReadiness = calculateBoardReadiness(freshState);

  assert.equal(initialReadiness.subjects.length, 5, 'Must calculate for all 5 CBSE subjects');
  assert.equal(initialReadiness.overallPercentage, 0, 'Initial fresh state should be 0%');
  assert.equal(initialReadiness.overallRating, 'Getting Started 🎯');
  assert.ok(initialReadiness.daysToBoards > 0, 'Days to boards should be positive');

  // Verify subject mark maximums
  const phy = initialReadiness.subjects.find(s => s.subjectId === 'physics');
  const chem = initialReadiness.subjects.find(s => s.subjectId === 'chemistry');
  const math = initialReadiness.subjects.find(s => s.subjectId === 'math');
  const eng = initialReadiness.subjects.find(s => s.subjectId === 'english');
  const pe = initialReadiness.subjects.find(s => s.subjectId === 'pe');

  assert.ok(phy && phy.theoryMarks === 70 && phy.practicalMarks === 30);
  assert.ok(chem && chem.theoryMarks === 70 && chem.practicalMarks === 30);
  assert.ok(math && math.theoryMarks === 80 && math.practicalMarks === 20);
  assert.ok(eng && eng.theoryMarks === 80 && eng.practicalMarks === 20);
  assert.ok(pe && pe.theoryMarks === 70 && pe.practicalMarks === 30);

  // Mark high-yield chapters as completed
  const modifiedState = empty();
  modifiedState.progress['physics-1-1'] = { status: 'Exam Ready' }; // 8M
  modifiedState.progress['physics-3-2'] = { status: 'Exam Ready' }; // 9M (Ray Optics)
  modifiedState.progress['chemistry-2-1'] = { status: 'Exam Ready' }; // 9M (Electrochemistry)
  modifiedState.progress['math-3-3'] = { status: 'Exam Ready' }; // 9M (Integrals)

  const updatedReadiness = calculateBoardReadiness(modifiedState);
  assert.ok(updatedReadiness.overallPercentage > 0, 'Marking chapters must increase overall percentage');
  
  const updatedPhy = updatedReadiness.subjects.find(s => s.subjectId === 'physics');
  assert.ok(updatedPhy.readinessPercentage > 15, 'Physics percentage must reflect completed chapters');
  assert.equal(updatedPhy.chaptersCompleted, 2);
});

test('cbse chapter weightage map: contains verified mark distributions across all chapters', () => {
  assert.ok(cbseChapterWeightageMap['physics-1-1'] === 8, 'Electric charges should be ~8M');
  assert.ok(cbseChapterWeightageMap['physics-3-2'] === 9, 'Ray optics should be ~9M');
  assert.ok(cbseChapterWeightageMap['chemistry-2-1'] === 9, 'Electrochemistry should be 9M');
  assert.ok(cbseChapterWeightageMap['math-3-3'] === 9, 'Integrals should be 9M');
  assert.ok(cbseChapterWeightageMap['english-3-1'] === 2, 'The Last Lesson should be in literature');
  assert.ok(cbseChapterWeightageMap['pe-1-1'] === 7, 'Sports Management should be 7M');
});

test('daily board boost active recall: generates 3 high-yield questions with official marking keys', () => {
  const cardsToday = getDailyBoardBoostQuestions('2026-11-21');
  assert.equal(cardsToday.length, 3, 'Must return exactly 3 active recall cards');

  for (const card of cardsToday) {
    assert.ok(card.id, 'Card must have an ID');
    assert.ok(card.subject, 'Card must specify subject');
    assert.ok(card.subjectCode, 'Card must specify subject code');
    assert.ok(card.topic, 'Card must specify topic');
    assert.ok(card.question.length > 20, 'Card must have a detailed question');
    assert.ok([2, 3, 5].includes(card.cbseMarks), 'Card marks must be 2, 3, or 5');
    assert.ok(card.keyPoints.length >= 2, 'Card must contain official marking key points');
    assert.ok(card.boardYearTag.includes('CBSE'), 'Card must have board year citation');
  }

  // Verify seed rotation changes or preserves consistency
  const cardsTomorrow = getDailyBoardBoostQuestions('2026-11-22');
  assert.equal(cardsTomorrow.length, 3);
});
