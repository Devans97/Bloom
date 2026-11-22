import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects, chapters } from '../dist/js/curriculum.js';
import { academicNodes, activityDefinitions, verifiedTopicNodes, nodeById, activitiesForNode } from '../dist/js/academic-data.js';

test('curriculum integrity: every single one of the 61 CBSE chapters has verified topic nodes', () => {
  for (const chapter of chapters) {
    const topics = academicNodes.filter(n => n.chapterId === chapter.id && (n.kind === 'topic' || n.kind === 'concept'));
    assert.ok(
      topics.length > 0,
      `Chapter ${chapter.id} (${chapter.title} in ${chapter.subject}) has 0 topic nodes! All chapters must be fully transcribed.`
    );
  }
});

test('curriculum coverage: all 5 CBSE subjects have comprehensive topic representation', () => {
  const subjectIds = ['physics', 'chemistry', 'math', 'english', 'pe'];
  for (const subId of subjectIds) {
    const subTopics = verifiedTopicNodes.filter(t => t.subjectId === subId);
    assert.ok(
      subTopics.length >= 10,
      `Subject ${subId} must have at least 10 verified topic nodes, found ${subTopics.length}`
    );
  }
});

test('provenance audit: every verified topic has authentic 2026-27 CBSE source without pseudo-links', () => {
  for (const topic of verifiedTopicNodes) {
    assert.equal(topic.source.session, '2026-27', `Topic ${topic.id} has invalid session: ${topic.source.session}`);
    assert.equal(topic.source.status, 'verified', `Topic ${topic.id} has invalid status: ${topic.source.status}`);
    assert.ok(
      topic.source.url.startsWith('https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/'),
      `Topic ${topic.id} URL does not point to official CBSE repository: ${topic.source.url}`
    );
    assert.ok(
      !topic.source.url.includes('#page='),
      `Topic ${topic.id} URL must not contain hash anchor: ${topic.source.url}`
    );
    assert.ok(
      typeof topic.source.pdfPage === 'number' && topic.source.pdfPage > 0,
      `Topic ${topic.id} must specify valid pdfPage number, found ${topic.source.pdfPage}`
    );
  }
});

test('actionable activity contract: every topic has 4 standardized activities with strict evidence criteria', () => {
  for (const topic of verifiedTopicNodes) {
    const activities = activitiesForNode(topic.id);
    assert.equal(
      activities.length,
      4,
      `Topic ${topic.id} should have exactly 4 activities (learn, practice, recall, assessment), found ${activities.length}`
    );

    const kinds = activities.map(a => a.kind);
    assert.ok(kinds.includes('first-learning'), `Topic ${topic.id} missing first-learning`);
    assert.ok(kinds.includes('practice'), `Topic ${topic.id} missing practice`);
    assert.ok(kinds.includes('active-recall'), `Topic ${topic.id} missing active-recall`);
    assert.ok(kinds.includes('assessment'), `Topic ${topic.id} missing assessment`);

    for (const act of activities) {
      assert.ok(
        act.steps.length >= 3,
        `Activity ${act.id} must have >= 3 steps, found ${act.steps.length}`
      );
      assert.ok(
        act.completionEvidence.length >= 2,
        `Activity ${act.id} must have >= 2 completion evidence criteria, found ${act.completionEvidence.length}`
      );
      assert.ok(
        act.estimatedMinutes > 0 && act.estimatedMinutes <= 120,
        `Activity ${act.id} must have realistic estimatedMinutes (1-120), found ${act.estimatedMinutes}`
      );
    }
  }
});
