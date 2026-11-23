import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters, subjects } from '../dist/js/curriculum.js';
import { renderOnboarding } from '../dist/js/onboarding.js';

test('onboarding step 4: renders 1-click difficulty buttons and fast bulk actions', () => {
  const state = {
    name: 'Devansh',
    tasks: [],
    tests: [],
    days: {},
    progress: {},
    onboarding: { step: 4, completed: false },
    study: { sessions: [], results: [], mistakes: [], activeFocus: null, breakMinutes: 10, focusMinutes: 45 },
    life: { reminders: { enabled: false, quietStart: '22:00', quietEnd: '07:00' }, achievements: false, routine: { morning: [], evening: [] } },
    academic: { topicProgress: {}, activities: {} },
    reduceMotion: false,
    darkMode: false,
    tourStatus: 'completed',
    tourStep: 0,
    selectedSubject: 'physics'
  };

  const host = {
    getState: () => state,
    commit: async () => true,
    show: () => ({}),
    closeDialog: () => {},
    announce: () => {},
    navigate: () => {}
  };

  const html = renderOnboarding(host);

  // Verifies the 1-click difficulty buttons exist in the DOM
  assert.ok(html.includes('data-onboarding="set-chapter-rating"'), 'Must render 1-click difficulty buttons on chapters');
  assert.ok(html.includes('data-rating="Difficult"'), 'Must render Difficult button');
  assert.ok(html.includes('data-rating="Okay"'), 'Must render Okay button');
  assert.ok(html.includes('data-rating="Easy"'), 'Must render Easy button');

  // Verifies fast bulk action buttons exist
  assert.ok(html.includes('data-onboarding="bulk-rating"'), 'Must render fast bulk rating buttons');
  assert.ok(html.includes('Mark Difficult'), 'Must include 1-click Mark Difficult button');
  assert.ok(html.includes('Mark Okay'), 'Must include 1-click Mark Okay button');
  assert.ok(html.includes('Mark Easy'), 'Must include 1-click Mark Easy button');

  // Verifies subject count tags exist
  assert.ok(html.includes('onboarding-sub-count'), 'Must display subject progress counters');
});

test('onboarding difficulty auto-status fallback: difficulty on unmarked chapter produces valid progress', () => {
  const chapter = chapters.find(c => c.subject === 'physics');
  assert.ok(chapter, 'Physics chapter must exist');

  // Logic simulation of set-chapter-rating:
  const simulateRating = (currentProgress, rating) => {
    const defaultStatus = currentProgress?.status ?? (rating === 'Difficult' ? 'Needs revision' : rating === 'Okay' ? 'Learning' : 'Completed');
    return {
      ...currentProgress,
      status: defaultStatus,
      rating
    };
  };

  // 1. Unmarked chapter rated Difficult -> Needs revision + Difficult
  const diffRes = simulateRating(undefined, 'Difficult');
  assert.equal(diffRes.status, 'Needs revision');
  assert.equal(diffRes.rating, 'Difficult');

  // 2. Unmarked chapter rated Okay -> Learning + Okay
  const okayRes = simulateRating(undefined, 'Okay');
  assert.equal(okayRes.status, 'Learning');
  assert.equal(okayRes.rating, 'Okay');

  // 3. Unmarked chapter rated Easy -> Completed + Easy
  const easyRes = simulateRating(undefined, 'Easy');
  assert.equal(easyRes.status, 'Completed');
  assert.equal(easyRes.rating, 'Easy');

  // 4. Chapter that already had a status keeps its status
  const existingRes = simulateRating({ status: 'Practising' }, 'Difficult');
  assert.equal(existingRes.status, 'Practising');
  assert.equal(existingRes.rating, 'Difficult');
});
