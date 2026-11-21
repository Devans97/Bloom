/**
 * BLOOM — Planner View
 * Authentic layout matching Apple Liquid Glass & editorial styling.
 */
import { icon } from './icons.js';
import { getSubject } from '../curriculum.js';
import { calculateAvailability, getIsoDate, addDays, getRankedStudyIdeas } from '../planner-engine.js';
export function renderPlannerView(state, selectedDate, mode = 'list') {
    const activeDate = selectedDate || getIsoDate();
    const availability = calculateAvailability(state, activeDate);
    const tasks = state.tasks.filter(t => t.day === activeDate);
    const ideas = getRankedStudyIdeas(state, activeDate).slice(0, 8);
    const prevDate = addDays(activeDate, -1);
    const nextDate = addDays(activeDate, 1);
    const doneCount = tasks.filter(t => t.done).length;
    const plannedMinutes = tasks.reduce((acc, t) => acc + t.minutes, 0);
    const targetMinutes = Math.round(availability.availableMinutes * 0.7);
    // Focus sessions studied today
    const studiedMinutes = Math.floor(state.focusSessions
        .filter(s => s.day === activeDate)
        .reduce((acc, s) => acc + s.seconds, 0) / 60);
    const dateHeading = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(new Date(activeDate + 'T12:00:00Z'));
    const availHours = (availability.availableMinutes / 60).toFixed(1);
    return `
    <div class="page planner-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">YOUR STUDY PLAN</p>
          <h1>Planner</h1>
        </div>
        <div class="toolbar">
          <button type="button" class="button outline" data-action="propose-plan" data-day="${activeDate}">
            ${icon('leaf')} Suggest a plan
          </button>
          <button type="button" class="button primary" data-action="open-add-custom-task" data-day="${activeDate}">
            ${icon('plus')} Add task
          </button>
        </div>
      </div>

      <div class="toolbar" style="margin-bottom: 20px;">
        <div class="date-tools">
          <button type="button" class="tool" data-action="change-date" data-day="${prevDate}" title="Previous day">
            ${icon('chevron-left')}
          </button>
          <input type="date" id="planner-date-input" value="${activeDate}" data-action="select-date">
          <button type="button" class="tool" data-action="change-date" data-day="${nextDate}" title="Next day">
            ${icon('chevron-right')}
          </button>
        </div>

        <div class="segments" aria-label="Plan view">
          <button type="button" data-action="planner-mode" data-value="list" aria-pressed="${mode === 'list'}">
            ${icon('list')} Checklist
          </button>
          <button type="button" data-action="planner-mode" data-value="time" aria-pressed="${mode === 'time'}">
            ${icon('calendar-range')} Timetable
          </button>
        </div>
      </div>

      <section class="planner-availability" style="padding: 22px; background: #fff8; border-radius: 12px; border: 1px solid var(--line); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <p class="eyebrow">${dateHeading}</p>
          <h2 style="font-size: 26px; margin: 4px 0;">${targetMinutes}m <span style="font-size: 15px; color: var(--soft); font-weight: normal;">suggested study</span></h2>
          <p style="color: var(--soft); font-size: 13px;">${availHours}h available · ${plannedMinutes}m planned · ${studiedMinutes}m studied</p>
        </div>

        <div class="attendance-controls" style="display: flex; gap: 14px; align-items: center;">
          <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
            <input type="checkbox" data-action="toggle-school" data-day="${activeDate}" ${availability.school ? 'checked' : ''}>
            <span></span>
            <span style="font-size:12px; font-weight:600;">School today</span>
          </label>
          <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
            <input type="checkbox" data-action="toggle-tuition" data-day="${activeDate}" ${availability.tuition ? 'checked' : ''}>
            <span></span>
            <span style="font-size:12px; font-weight:600;">Tuition today</span>
          </label>
          <button type="button" class="button quiet" data-action="rescue-backlog" data-day="${activeDate}" title="Rescue past due items into today">
            ${icon('rotate-ccw')} Rescue Backlog
          </button>
        </div>
      </section>

      <p class="planning-explanation" style="color:var(--soft); font-size:13px; margin: 0 0 24px;">
        Study blocks follow your chapter progress, tests and session rhythm, with breaks between them. Changes stay a proposal until you approve.
      </p>

      <div class="planner-grid">
        <section>
          <div class="section-head">
            <h2>${mode === 'time' ? 'Timetable' : 'Tasks'}</h2>
            <span class="muted">${doneCount} / ${tasks.length} done</span>
          </div>

          <div class="rows">
            ${tasks.length > 0 ? tasks.map(task => `
              <article class="task-row ${task.done ? 'done' : ''}" data-task-id="${task.id}">
                <input type="checkbox" class="task-check" data-action="quick-toggle-task" data-task-id="${task.id}" ${task.done ? 'checked' : ''} aria-label="Mark task done">
                <div class="row-main">
                  <span class="subject subject-${task.subjectId}">${getSubject(task.subjectId)?.title || task.subjectId}</span>
                  <strong>${task.title}</strong>
                  <small>${task.recommendationReason || task.learningObjective}</small>
                </div>
                <span class="row-time">${task.minutes} min</span>
                <button type="button" class="tool" data-action="open-study-workspace" data-task-id="${task.id}" title="Open study workspace">
                  ${icon('play')}
                </button>
                <button type="button" class="tool" data-action="delete-task" data-task-id="${task.id}" title="Delete task">
                  ${icon('trash')}
                </button>
              </article>
            `).join('') : `
              <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
                No tasks scheduled for this day. Click "Suggest a plan" or add an activity from the suggestions rail.
              </div>
            `}
          </div>
        </section>

        <section>
          <div class="section-head">
            <h2>Suggested study</h2>
          </div>

          <div class="rows">
            ${ideas.length > 0 ? ideas.map(idea => `
              <article class="idea" style="display: flex; gap: 12px; align-items: center; padding: 12px 6px; border-bottom: 1px solid var(--line);">
                <div class="row-main" style="flex: 1; min-width: 0;">
                  <span class="subject subject-${idea.subjectId}">${getSubject(idea.subjectId)?.title || idea.subjectId}</span>
                  <strong>${idea.title}</strong>
                  <small style="color: var(--soft);">${idea.reason} · ${idea.minutes} min</small>
                </div>
                <button type="button" class="tool" data-action="add-idea-task" data-chapter-id="${idea.chapterId}" data-subject-id="${idea.subjectId}" title="Add to today's plan">
                  ${icon('plus')}
                </button>
              </article>
            `).join('') : `
              <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
                No study suggestions found. Update your syllabus topic statuses to receive tailored activities.
              </div>
            `}
          </div>
        </section>
      </div>
    </div>
  `;
}
