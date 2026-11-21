import test from 'node:test';
import assert from 'node:assert/strict';
import { initialAppState } from '../dist/js/storage.js';
import { rescueBacklogTasks } from '../dist/js/planner-engine.js';

test('backlog rescue redistributes missed tasks over upcoming days without mutating original records', () => {
  const state = initialAppState();
  const pastDay = '2026-11-20';
  const today = '2026-11-23';

  // Add 3 uncompleted tasks in the past
  state.tasks.push(
    {
      id: 'task-1',
      title: 'Master Coulomb Law',
      day: pastDay,
      minutes: 25,
      subjectId: 'physics',
      chapterId: 'phy-1',
      activityType: 'concept',
      learningObjective: 'Understand electric force',
      steps: ['Read NCERT', 'Derive vector form', 'Reflect'],
      completedStepIndices: [],
      resourceRefs: ['NCERT Section 1.6'],
      completionEvidence: 'Notes',
      recommendationReason: 'Overdue',
      priority: 'High',
      done: false,
      origin: 'generated'
    },
    {
      id: 'task-2',
      title: 'Practice Raoult Law',
      day: pastDay,
      minutes: 25,
      subjectId: 'chemistry',
      chapterId: 'chem-1',
      activityType: 'numerical',
      learningObjective: 'Solve colligative property problems',
      steps: ['Recall formula', 'Solve 2 problems'],
      completedStepIndices: [],
      resourceRefs: ['NCERT Section 1.5'],
      completionEvidence: 'Calculations',
      recommendationReason: 'Overdue',
      priority: 'Normal',
      done: false,
      origin: 'generated'
    }
  );

  const rescued = rescueBacklogTasks(state, today);
  assert.equal(rescued.length, 2);
  assert.ok(rescued.every(t => t.day >= today), 'All rescued tasks must be scheduled on or after today');
  assert.ok(rescued.every(t => t.id.startsWith('rescue-')), 'Rescued tasks have traceable IDs');
  assert.match(rescued[0].recommendationReason, /Backlog rescue from 2026-11-20/);

  // Original state tasks are unmutated until approval
  assert.equal(state.tasks[0].day, pastDay);
});
