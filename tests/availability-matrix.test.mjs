import test from 'node:test';
import assert from 'node:assert/strict';
import { initialAppState } from '../dist/js/storage.js';
import { calculateAvailability } from '../dist/js/planner-engine.js';

test('all four daily school and tuition combinations independently calculate availability', () => {
  const state = initialAppState();
  const day = '2026-11-23'; // Monday
  state.profile.wakeTime = '07:00';
  state.profile.sleepTime = '23:00'; // 16 waking hours = 960 minutes
  state.profile.schoolStart = '08:00';
  state.profile.schoolEnd = '14:00'; // 6 hours
  state.profile.tuitionStart = '17:00';
  state.profile.tuitionEnd = '21:00'; // 4 hours
  state.profile.travelMinutes = 0;

  // Combination 1: No School, No Tuition (Full day free)
  state.dayOverrides[day] = { school: false, tuition: false };
  const a1 = calculateAvailability(state, day);
  assert.equal(a1.availableMinutes, 960);
  assert.equal(a1.school, false);
  assert.equal(a1.tuition, false);

  // Combination 2: School Only (16h - 6h = 10h = 600 min)
  state.dayOverrides[day] = { school: true, tuition: false };
  const a2 = calculateAvailability(state, day);
  assert.equal(a2.availableMinutes, 600);
  assert.equal(a2.school, true);
  assert.equal(a2.tuition, false);

  // Combination 3: Tuition Only (16h - 4h = 12h = 720 min)
  state.dayOverrides[day] = { school: false, tuition: true };
  const a3 = calculateAvailability(state, day);
  assert.equal(a3.availableMinutes, 720);
  assert.equal(a3.school, false);
  assert.equal(a3.tuition, true);

  // Combination 4: Both School and Tuition (16h - 6h - 4h = 6h = 360 min)
  state.dayOverrides[day] = { school: true, tuition: true };
  const a4 = calculateAvailability(state, day);
  assert.equal(a4.availableMinutes, 360);
  assert.equal(a4.school, true);
  assert.equal(a4.tuition, true);
});

test('Sundays default to tuition-free unless explicitly overridden', () => {
  const state = initialAppState();
  const sunday = '2026-11-22';
  const aDefault = calculateAvailability(state, sunday);
  assert.equal(aDefault.tuition, false);

  // Explicit override on Sunday
  state.dayOverrides[sunday] = { school: false, tuition: true };
  const aOverridden = calculateAvailability(state, sunday);
  assert.equal(aOverridden.tuition, true);
});
