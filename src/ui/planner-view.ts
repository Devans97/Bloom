/**
 * BLOOM — Planner View
 * Features: Timetable/Checklist, independent date overrides, reviewable proposals, and actionable suggestions.
 */

import type { AppState, ActionableTask } from '../types.js';
import { icon } from './icons.js';
import { getSubject, getChapter } from '../curriculum.js';
import { calculateAvailability, getIsoDate, addDays, getRankedStudyIdeas } from '../planner-engine.js';

export function renderPlannerView(state: AppState, selectedDate?: string): string {
  const activeDate = selectedDate || getIsoDate();
  const availability = calculateAvailability(state, activeDate);
  const tasks = state.tasks.filter(t => t.day === activeDate);
  const ideas = getRankedStudyIdeas(state, activeDate).slice(0, 8);

  const prevDate = addDays(activeDate, -1);
  const nextDate = addDays(activeDate, 1);

  return `
    <div class="page-container planner-page">
      <!-- Date Bar & Controls -->
      <header class="planner-header liquid-glass-panel">
        <div class="date-navigator">
          <button type="button" class="btn quiet date-nav-btn" data-action="change-date" data-day="${prevDate}">
            ${icon('arrow-left', 18)}
          </button>
          <div class="current-date-info">
            <h1 class="active-date-heading">${new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(activeDate + 'T12:00:00Z'))}</h1>
            <span class="active-date-sub">${tasks.length} activities scheduled · ${Math.floor(availability.availableMinutes / 60)}h ${availability.availableMinutes % 60}m available</span>
          </div>
          <button type="button" class="btn quiet date-nav-btn" data-action="change-date" data-day="${nextDate}">
            ${icon('arrow-right', 18)}
          </button>
        </div>

        <div class="planner-top-actions">
          <div class="date-commitments">
            <label class="toggle-pill ${availability.school ? 'active' : ''}">
              <input type="checkbox" data-action="toggle-school" data-day="${activeDate}" ${availability.school ? 'checked' : ''}>
              <span>School</span>
            </label>
            <label class="toggle-pill ${availability.tuition ? 'active' : ''}">
              <input type="checkbox" data-action="toggle-tuition" data-day="${activeDate}" ${availability.tuition ? 'checked' : ''}>
              <span>Tuition</span>
            </label>
          </div>

          <button type="button" class="btn secondary" data-action="rescue-backlog" data-day="${activeDate}">
            ${icon('rotate-ccw', 15)} Rescue Backlog
          </button>
          <button type="button" class="btn primary" data-action="propose-plan" data-day="${activeDate}">
            ${icon('sparkles', 15)} Propose Plan
          </button>
        </div>
      </header>

      <!-- Two column planner layout -->
      <div class="planner-layout">
        <!-- Main Scheduled Tasks List -->
        <main class="planner-main-column">
          <div class="column-card liquid-glass-panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">Scheduled Activities</h2>
                <p class="panel-subtitle">Click any activity to open the interactive Study Workspace</p>
              </div>
              <button type="button" class="btn quiet btn-sm" data-action="open-add-custom-task" data-day="${activeDate}">
                ${icon('plus', 14)} Add custom activity
              </button>
            </div>

            ${tasks.length ? `
              <div class="planner-task-list">
                ${tasks.map(task => {
                  const sub = getSubject(task.subjectId);
                  return `
                    <div class="planner-task-card liquid-glass-subcard ${task.done ? 'task-done' : ''}" data-task-id="${task.id}">
                      <div class="task-drag-handle" aria-hidden="true">⋮⋮</div>
                      <button type="button" class="task-check-btn" data-action="quick-toggle-task" data-task-id="${task.id}" aria-label="Toggle completed">
                        ${task.done ? icon('check', 16) : ''}
                      </button>
                      <div class="task-content" data-action="open-study-workspace" data-task-id="${task.id}">
                        <div class="task-title-row">
                          <h3 class="task-title">${task.title}</h3>
                          <span class="subject-tag subject-${task.subjectId}">${sub?.title || task.subjectId}</span>
                        </div>
                        <p class="task-reason">${task.recommendationReason || ''}</p>
                        <div class="task-footer">
                          <span>${icon('timer', 14)} ${task.minutes} min</span>
                          ${task.time ? `<span>${task.time}</span>` : ''}
                          <span class="activity-pill">${task.activityType.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <div class="task-actions">
                        <button type="button" class="btn-icon" data-action="delete-task" data-task-id="${task.id}" aria-label="Delete task">
                          ${icon('trash', 16)}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `
              <div class="empty-state-card">
                <p class="empty-text">No study activities scheduled for this date.</p>
                <div class="empty-actions">
                  <button type="button" class="btn primary" data-action="propose-plan" data-day="${activeDate}">
                    ${icon('sparkles', 16)} Propose Balanced Schedule
                  </button>
                </div>
              </div>
            `}
          </div>
        </main>

        <!-- Right Side: Actionable Suggestions Rail -->
        <aside class="planner-side-rail">
          <div class="column-card liquid-glass-panel">
            <div class="panel-head">
              <div>
                <h2 class="panel-title">Recommended Study</h2>
                <p class="panel-subtitle">Actionable next activities based on your CBSE priorities</p>
              </div>
            </div>

            <div class="suggested-ideas-list">
              ${ideas.map(idea => {
                const sub = getSubject(idea.subjectId);
                return `
                  <div class="idea-card liquid-glass-subcard">
                    <div class="idea-top">
                      <span class="subject-tag subject-${idea.subjectId}">${sub?.title || idea.subjectId}</span>
                      <span class="duration-badge">${idea.minutes}m</span>
                    </div>
                    <h4 class="idea-title">${idea.title}</h4>
                    <p class="idea-reason">${idea.reason}</p>
                    <div class="idea-actions">
                      <button type="button" class="btn secondary btn-sm" data-action="add-idea-to-plan" data-idea='${JSON.stringify({
                        title: idea.title,
                        subjectId: idea.subjectId,
                        chapterId: idea.chapterId,
                        topicId: idea.topicId,
                        activityType: idea.activityType,
                        objective: idea.objective,
                        steps: idea.steps,
                        resourceRefs: idea.resourceRefs,
                        completionEvidence: idea.completionEvidence,
                        minutes: idea.minutes,
                        reason: idea.reason
                      }).replace(/'/g, "&#39;")}'>
                        ${icon('plus', 14)} Add to today
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}
