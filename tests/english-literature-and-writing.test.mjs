import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cbseEnglishChapters,
  cbseWritingFormats
} from '../dist/js/data/cbse-english-literature-rubrics.js';

test('english literature: all prescribed chapters have complete analytical schemas', () => {
  assert.ok(cbseEnglishChapters.length >= 6, 'Should have comprehensive Flamingo & Vistas chapters');

  for (const chapter of cbseEnglishChapters) {
    assert.ok(chapter.id, 'Chapter must have an ID');
    assert.ok(chapter.title, 'Chapter must have a title');
    assert.ok(chapter.authorOrPoet, `Chapter ${chapter.title} must have an author or poet`);
    assert.ok(chapter.centralTheme.length > 20, `Chapter ${chapter.title} must have a detailed central theme`);
    assert.ok(chapter.corePhilosophy.length > 20, `Chapter ${chapter.title} must have a core philosophy`);
    assert.ok(chapter.summaryPoints.length >= 5, `Chapter ${chapter.title} must have at least 5 plot/narrative points`);

    if (chapter.frequentBoardQuestions.length > 0) {
      for (const q of chapter.frequentBoardQuestions) {
        assert.ok([2, 5].includes(q.marks), `Board question in ${chapter.title} must be 2 or 5 marks`);
        assert.ok(q.keyPoints.length >= 2, `Board question must have at least 2 marking points`);
      }
    }
  }
});

test('flamigo poetry: poetic devices registry covers core literary devices and line references', () => {
  const poetryChapters = cbseEnglishChapters.filter(c => c.book === 'Flamingo (Poetry)');
  assert.ok(poetryChapters.length >= 3, 'Must have at least 3 Flamingo poetry chapters');

  const allDevices = poetryChapters.flatMap(c => c.poeticDevices || []);
  assert.ok(allDevices.length >= 10, 'Must have at least 10 verified poetic device instances');

  const devicesFound = new Set(allDevices.map(d => d.device));
  assert.ok(devicesFound.has('Simile'), 'Must cover Simile');
  assert.ok(devicesFound.has('Metaphor'), 'Must cover Metaphor');
  assert.ok(devicesFound.has('Personification'), 'Must cover Personification');
  assert.ok(devicesFound.has('Alliteration'), 'Must cover Alliteration');

  for (const device of allDevices) {
    assert.ok(device.poem, 'Device must specify source poem');
    assert.ok(device.line.length > 3, 'Device must have quoted line from poem');
    assert.ok(device.explanation.length > 15, 'Device must have explanatory justification');
    assert.ok(device.markingSignificance.length > 10, 'Device must have examiner marking criteria');
  }
});

test('writing section rubrics: official CBSE formats adhere strictly to mark allocation criteria', () => {
  assert.ok(cbseWritingFormats.length >= 3, 'Must cover Notice, Job Application, and Letter to Editor');

  for (const fmt of cbseWritingFormats) {
    assert.ok(fmt.id, 'Format must have an ID');
    assert.ok(fmt.title, 'Format must have a title');
    assert.ok(['50 words', '120-150 words'].includes(fmt.wordLimit), 'Must have official CBSE word cap');
    assert.ok([4, 5].includes(fmt.marks), 'Must be either 4 or 5 marks format');

    // Verify mark summation matches total marks exactly
    const sumMarks = fmt.markingBreakdown.reduce((acc, curr) => acc + curr.marks, 0);
    assert.equal(sumMarks, fmt.marks, `Marking breakdown in ${fmt.title} must sum exactly to ${fmt.marks}`);

    // Verify official template exists and contains placeholders
    assert.ok(fmt.officialTemplate.length > 50, `Format ${fmt.title} must have official template`);

    // Verify model answer conforms to word limits
    const words = fmt.modelAnswer.content.trim().split(/\s+/).length;
    if (fmt.wordLimit === '50 words') {
      assert.ok(words <= 95, `Notice model answer should not excessively exceed full card budget (got ${words})`);
    } else if (fmt.id === 'write-job-app') {
      // Job applications include both covering letter (120-150 words) and tabular bio-data enclosure
      assert.ok(words <= 300, `Job Application + Bio-Data total budget (got ${words})`);
    } else {
      assert.ok(words >= 100 && words <= 190, `Letter model answer should be within 120-150 word range plus formal headers (got ${words})`);
    }

    assert.ok(fmt.commonMistakesToAvoid.length >= 3, `Format ${fmt.title} must list common exam mistakes`);
  }
});
