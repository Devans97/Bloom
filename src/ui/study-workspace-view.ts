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
    <div class="workspace-backdrop" data-workspace-id="${task.id}">
      <div class="workspace-panel liquid-glass-panel">
        <header class="workspace-header">
          <div class="workspace-meta">
            <span class="subject-tag subject-${task.subjectId}">${subject?.title || task.subjectId}</span>
            <span class="activity-type-badge">${task.activityType.replace('_', ' ')}</span>
            <span class="duration-badge">${icon('timer', 14)} ${task.minutes} min</span>
          </div>
          <button type="button" class="btn-icon close-workspace" data-action="close-workspace" aria-label="Close Study Workspace">
            ${icon('x', 20)}
          </button>
        </header>

        <div class="workspace-body">
          <div class="workspace-main">
            <h1 class="workspace-title">${task.title}</h1>
            <p class="workspace-chapter">${chapter?.title || 'Chapter Study'} · ${chapter?.unitGroup || ''}</p>

            ${task.recommendationReason ? `
              <div class="why-card glass-subcard">
                <span class="why-label">${icon('sparkles', 15)} Why this is next</span>
                <p class="why-text">${task.recommendationReason}</p>
              </div>
            ` : ''}

            <section class="workspace-section">
              <h2 class="section-heading">${icon('bookmark', 16)} Learning Objective</h2>
              <div class="objective-card glass-subcard">
                <p>${task.learningObjective || 'Master core concepts and verify independent understanding through practice.'}</p>
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon('clipboard-check', 16)} Actionable Steps (${completedIndices.size}/${steps.length})</h2>
              <div class="steps-list">
                ${steps.map((step, idx) => {
                  const isDone = completedIndices.has(idx);
                  return `
                    <label class="step-item ${isDone ? 'step-completed' : ''}">
                      <input type="checkbox" class="step-checkbox" data-task-id="${task.id}" data-step-index="${idx}" ${isDone ? 'checked' : ''}>
                      <span class="step-number">${idx + 1}</span>
                      <span class="step-text">${step}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon('book-open', 16)} Verified Sourced Resources</h2>
              <div class="resources-list">
                ${(task.resourceRefs && task.resourceRefs.length ? task.resourceRefs : [chapter?.ncertRef || 'NCERT Class XII Text']).map(ref => `
                  <div class="resource-card glass-subcard">
                    <span class="resource-icon">${icon('shield-check', 16)}</span>
                    <div class="resource-info">
                      <strong>${ref}</strong>
                      <span class="provenance-note">Official CBSE Syllabus Prescribed Reference</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <section class="workspace-section">
              <h2 class="section-heading">${icon('alert-circle', 16)} Got Stuck or Found a Mistake?</h2>
              <button type="button" class="btn secondary log-mistake-btn" data-action="open-mistake-drawer" data-task-id="${task.id}" data-chapter-id="${task.chapterId}">
                ${icon('plus', 16)} Log Doubt / Mistake to Journal
              </button>
            </section>
          </div>

          <aside class="workspace-sidebar">
            <div class="focus-timer-card liquid-glass-card">
              <h3 class="timer-card-title">${icon('timer', 18)} Focus Session</h3>
              <div class="timer-display" id="workspace-timer-display">25:00</div>
              <div class="timer-controls">
                <button type="button" class="btn primary timer-btn" id="timer-start-pause" data-action="timer-toggle">
                  ${icon('play', 16)} <span id="timer-btn-label">Start Focus</span>
                </button>
                <button type="button" class="btn quiet timer-btn-reset" data-action="timer-reset">
                  ${icon('rotate-ccw', 16)}
                </button>
              </div>
              <p class="timer-hint">Counts actual studied seconds. Saved upon task completion.</p>
            </div>

            <div class="completion-card liquid-glass-card">
              <h3 class="completion-card-title">${icon('check', 18)} Mark Complete</h3>
              <p class="completion-hint">How did this activity feel? Select your shared clarity rating to calibrate your next spaced review:</p>

              <div class="rating-selector">
                <button type="button" class="rating-btn rating-easy" data-action="complete-task" data-task-id="${task.id}" data-rating="Easy">
                  <strong>Easy</strong>
                  <span>Review in 7 days</span>
                </button>
                <button type="button" class="rating-btn rating-okay" data-action="complete-task" data-task-id="${task.id}" data-rating="Okay">
                  <strong>Okay</strong>
                  <span>Review in 3 days</span>
                </button>
                <button type="button" class="rating-btn rating-difficult" data-action="complete-task" data-task-id="${task.id}" data-rating="Difficult">
                  <strong>Difficult</strong>
                  <span>Review tomorrow</span>
                </button>
              </div>

              <div class="evidence-box">
                <small><strong>Completion evidence:</strong> ${task.completionEvidence || 'Self-checked and rating logged.'}</small>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;
}
