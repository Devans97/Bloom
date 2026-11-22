import test from 'node:test';
import assert from 'node:assert/strict';
import {
  gardenStats,
  quietNow,
  lifeDefaults
} from '../dist/js/life-data.js';

test('bloom garden: non-punitive growth honors completed tasks, reviews, and focus minutes', () => {
  const evidence = {
    tasks: [
      { done: true },
      { done: true },
      { done: false } // undone task does not subtract or punish
    ],
    reviews: [
      { id: 'rev-1' },
      { id: 'rev-2' },
      { id: 'rev-3' }
    ],
    study: {
      sessions: [
        { kind: 'focus', seconds: 1500 }, // 25 min = 1 growth
        { kind: 'focus', seconds: 3000 }, // 50 min = 2 growth
        { kind: 'break', seconds: 600 }   // breaks do not add flower growth
      ]
    }
  };

  const stats = gardenStats(evidence);
  assert.equal(stats.completed, 2);
  assert.equal(stats.reviews, 3);
  assert.equal(stats.focusMinutes, 75); // (1500 + 3000) / 60
  // focusGrowth = (1500 + 3000) / 1500 = 3
  // total growth = 2 (tasks) + 3 (reviews) + 3 (focusGrowth) = 8
  assert.equal(stats.growth, 8);
  assert.equal(stats.flowers, 1); // 8 / 5 = 1 flower
  assert.equal(stats.leaves, 3);  // 8 % 5 = 3 leaves
});

test('quiet hours: correctly handles overnight windows across midnight', () => {
  // Quiet window: 22:00 to 07:00 IST
  const midnight = new Date('2026-11-21T18:45:00.000Z'); // 00:15 IST next day
  const morning = new Date('2026-11-21T03:00:00.000Z');  // 08:30 IST morning
  const lateEvening = new Date('2026-11-21T17:00:00.000Z'); // 22:30 IST night

  assert.equal(quietNow('22:00', '07:00', midnight), true);
  assert.equal(quietNow('22:00', '07:00', lateEvening), true);
  assert.equal(quietNow('22:00', '07:00', morning), false);

  // Same day window: 14:00 to 16:00 IST
  const afternoon = new Date('2026-11-21T09:30:00.000Z'); // 15:00 IST
  assert.equal(quietNow('14:00', '16:00', afternoon), true);
});

test('life defaults: initializes safe, empty state with respectful reminder quiet hours', () => {
  const defaults = lifeDefaults();
  assert.equal(defaults.achievements, false);
  assert.deepEqual(defaults.papers, []);
  assert.deepEqual(defaults.practicals, []);
  assert.deepEqual(defaults.writing, []);
  assert.deepEqual(defaults.letters, []);
  assert.equal(defaults.reminders.enabled, true);
  assert.equal(defaults.reminders.quietFrom, '22:00');
  assert.equal(defaults.reminders.quietTo, '07:00');
});
