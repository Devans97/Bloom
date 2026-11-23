import test from 'node:test';
import assert from 'node:assert/strict';
import { renderAcademicHub } from '../dist/js/academic-ui.js';

function createMockState() {
  return {
    name: 'Devansh',
    tasks: [],
    tests: [],
    days: {},
    progress: {},
    onboarding: { step: 4, completed: true },
    study: { sessions: [], results: [], mistakes: [], activeFocus: null, breakMinutes: 10, focusMinutes: 45 },
    life: { reminders: { enabled: false, quietStart: '22:00', quietEnd: '07:00' }, achievements: false, routine: { morning: [], evening: [] } },
    academic: { topicProgress: {}, activities: {} },
    reduceMotion: false,
    darkMode: false,
    tourStatus: 'completed',
    tourStep: 0,
    vault: { locked: false, key: null }
  };
}

test('academic UI fast selection: renders 1-click mastery banner and topic controls', () => {
  const state = createMockState();
  const html = renderAcademicHub('physics', 'physics-1-1', state, new Set());

  // Verify chapter mastery banner
  assert.ok(html.includes('chapter-mastery-banner'), 'Should include chapter-mastery-banner');
  assert.ok(html.includes('data-action="quick-chapter-rating"'), 'Should include quick chapter rating buttons');
  assert.ok(html.includes('data-rating="Easy"'), 'Should include Easy button');
  assert.ok(html.includes('data-rating="Okay"'), 'Should include Okay button');
  assert.ok(html.includes('data-rating="Difficult"'), 'Should include Difficult button');

  // Verify mini difficulty buttons on chapter shelf
  assert.ok(html.includes('chapter-card-mini-diff'), 'Should render mini difficulty controls on chapter shelf');
  assert.ok(html.includes('mini-diff-chip diff-easy'), 'Should include mini Easy chip');
  assert.ok(html.includes('mini-diff-chip diff-okay'), 'Should include mini Okay chip');
  assert.ok(html.includes('mini-diff-chip diff-difficult'), 'Should include mini Difficult chip');

  // Verify topic fast controls
  assert.ok(html.includes('topic-fast-controls'), 'Should render topic fast controls');
  assert.ok(html.includes('topic-status-pill'), 'Should render topic status pills');
  assert.ok(html.includes('data-action="quick-topic-status"'), 'Should wire quick-topic-status action');
  assert.ok(html.includes('data-action="quick-topic-rating"'), 'Should wire quick-topic-rating action');
  assert.ok(html.includes('data-status="not-started"'), 'Should include not-started status pill');
  assert.ok(html.includes('data-status="learning"'), 'Should include learning status pill');
  assert.ok(html.includes('data-status="learned"'), 'Should include learned status pill');
  assert.ok(html.includes('data-status="practice-needed"'), 'Should include practice-needed status pill');
  assert.ok(html.includes('data-status="revision-due"'), 'Should include revision-due status pill');
});

test('academic UI fast selection: reflects active state and batch toolbar', () => {
  const state = createMockState();
  state.progress['physics-1-1'] = {
    status: 'Needs revision',
    rating: 'Difficult',
    last: '2026-11-23'
  };
  state.academic.topicProgress['physics-042-xii-2026-27-ch01-topic01'] = {
    status: 'learning',
    rating: 'Okay',
    updatedAt: new Date().toISOString()
  };

  const selectedSet = new Set(['physics-1-1', 'physics-1-2']);
  const html = renderAcademicHub('physics', 'physics-1-1', state, selectedSet);

  // Active difficulty on chapter
  assert.ok(html.includes('diff-chip diff-difficult active'), 'Difficult chip should have active class');
  assert.ok(html.includes('clarity-badge rating-difficult'), 'Clarity badge should show rating-difficult');

  // Active topic controls
  assert.ok(html.includes('diff-btn diff-okay active'), 'Topic Okay button should be active');
  assert.ok(html.includes('topic-rating-tag rating-okay'), 'Topic should show active Okay tag');

  // Batch toolbar when selectedSet is non-empty
  assert.ok(html.includes('academic-batch-bar'), 'Should show academic batch bar');
  assert.ok(html.includes('data-action="academic-batch-rating"'), 'Should show academic-batch-rating actions');
  assert.ok(html.includes('data-action="academic-batch-status"'), 'Should show academic-batch-status actions');
  assert.ok(html.includes('2 selected'), 'Should show count of selected chapters');
});
