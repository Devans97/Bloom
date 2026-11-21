/**
 * BLOOM — Dedicated Interactive Study Workspace
 * Strict fulfillment of Spec A7, A8, and A9.
 */

import type { ActionableTask, AppState, Rating } from '../types.js';
import { icon } from './icons.js';
import { getChapter, getSubject } from '../curriculum.js';

export function renderStudyWorkspace(task: ActionableTask, state: AppState): string {
  const chapter = getChapter(task.chapterId);
  const subject = getSubject(task.subjectId);
  const steps = task.steps || [
    'Review the fundamental concepts in your textbook.',
    'Work through a representative problem or illustration.',
    'Reflect on your level of clarity and log doubts.'
  ];
  const completedIndices = new Set(task.completedStepIndices || []);

  return `
    <div class="workspace-backdrop" data-workspace-id="${task.id}" style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
      <div class="activity-workspace" style="width:min(860px,100%); background:var(--paper); border:1px solid var(--line); border-radius:24px; box-shadow:0 24px 70px rgba(0,0,0,0.25); max-height:92vh; overflow-y:auto; padding:clamp(20px,3.5vw,36px);">
        
        <div class="activity-nav" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <button type="button" class="button quiet" data-action="close-workspace">
            ${icon('arrow-left')} Close Workspace
          </button>
          <span style="font-size:12px; font-weight:700; color:var(--rose-dark); letter-spacing:.08em;">
            ${subject?.title || task.subjectId} · ${task.minutes} MIN
          </span>
        </div>

        <div class="section-head intro" style="margin-bottom:20px;">
          <div>
            <p class="eyebrow">${subject?.title || task.subjectId} · ${chapter?.title || 'CHAPTER'}</p>
            <h1 style="font-size:32px; font-family:var(--display);">${task.title}</h1>
            <p class="muted">${chapter?.unitGroup || ''} · ${chapter?.ncertRef || ''}</p>
          </div>
        </div>

        <!-- Focus Timer Card -->
        <div style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <p class="eyebrow" style="margin:0 0 4px;">FOCUS SESSION</p>
            <div id="workspace-timer-display" style="font-size:38px; font-family:var(--display); font-weight:700; color:var(--rose-dark); letter-spacing:1px;">
              25:00
            </div>
          </div>
          <div style="display:flex; gap:10px;">
            <button type="button" class="button primary" id="timer-start-pause" data-action="timer-toggle">
              ${icon('play')} <span id="timer-btn-label">Start Focus</span>
            </button>
            <button type="button" class="button outline" data-action="timer-reset">
              ${icon('rotate-ccw')} Reset
            </button>
          </div>
        </div>

        <!-- Learning Objective -->
        <div class="activity-reason" style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px;">
          <strong style="display:block; font-size:15px; margin-bottom:6px;">Your learning objective</strong>
          <p style="margin:0; font-size:14px; line-height:1.6; color:var(--ink);">${task.learningObjective || 'Master core concepts and verify independent understanding through practice.'}</p>
          ${task.recommendationReason ? `<p class="muted" style="font-size:12px; margin-top:8px;">${task.recommendationReason}</p>` : ''}
        </div>

        <!-- Step-by-step checklist -->
        <section class="activity-steps" style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px;">
          <div class="section-head" style="margin-bottom:14px;">
            <div>
              <p class="eyebrow">STEP-BY-STEP CHECKLIST</p>
              <h2 style="font-size:20px;">What to do</h2>
            </div>
            <small style="color:var(--soft); font-size:11px;">Complete each step before reflection</small>
          </div>

          <div style="display:grid; gap:8px;">
            ${steps.map((step, idx) => {
              const isDone = completedIndices.has(idx);
              return `
                <label style="display:grid; grid-template-columns:22px 1fr; align-items:start; gap:12px; padding:12px; border-radius:10px; background:${isDone ? 'var(--sage)' : 'var(--white)'}; border:1px solid ${isDone ? 'var(--green)' : 'var(--line)'}; cursor:pointer;">
                  <input type="checkbox" data-action="toggle-step" data-task-id="${task.id}" data-step-index="${idx}" ${isDone ? 'checked' : ''} style="margin-top:3px; accent-color:var(--rose);">
                  <div>
                    <small style="display:block; color:var(--rose-dark); font-size:10px; font-weight:700;">STEP ${idx + 1}</small>
                    <span style="font-size:13px; line-height:1.5; ${isDone ? 'text-decoration:line-through; color:var(--green);' : ''}">${step}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </section>

        <!-- Doubt / Mistake Logger Drawer trigger -->
        <div style="background:#fff8; border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:14px; display:block;">Got stuck or made an error?</strong>
            <p class="muted" style="margin:2px 0 0; font-size:12px;">Log it to your Mistake Journal to schedule a focused retry session.</p>
          </div>
          <button type="button" class="button outline" data-action="open-new-mistake-modal" data-task-id="${task.id}" data-chapter-id="${task.chapterId}">
            ${icon('plus')} Log Doubt / Mistake
          </button>
        </div>

        <!-- Reflection / Understanding Rating -->
        <fieldset class="activity-reflection" style="border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:24px; background:#fff8;">
          <legend style="padding:0 8px; font-size:13px; font-weight:700; color:var(--ink);">How did this session feel?</legend>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Easy" style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center;">
                😊 Easy
              </span>
            </label>
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Okay" checked style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center; background:var(--blush); border-color:var(--rose);">
                😐 Okay
              </span>
            </label>
            <label style="flex:1; cursor:pointer;">
              <input type="radio" name="reflection-rating" value="Difficult" style="position:absolute; opacity:0;">
              <span class="button outline" style="width:100%; border-radius:10px; text-align:center;">
                🤔 Difficult
              </span>
            </label>
          </div>
        </fieldset>

        <!-- Workspace Footer Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; border-top:1px solid var(--line); padding-top:20px;">
          <button type="button" class="button outline" data-action="close-workspace">
            Save and continue later
          </button>
          <button type="button" class="button primary" data-action="finish-workspace-task" data-task-id="${task.id}">
            ${icon('check')} Complete this activity
          </button>
        </div>

      </div>
    </div>
  `;
}
