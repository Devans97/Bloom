/**
 * BLOOM — Today View
 * Designed for calm clarity on iPad and phone.
 */
import { icon } from './icons.js';
import { getSubject } from '../curriculum.js';
import { calculateAvailability, getIsoDate, getRankedStudyIdeas } from '../planner-engine.js';
import { computeAcademicProgress } from '../academic-engine.js';
export function renderTodayView(state) {
    const todayStr = getIsoDate();
    const learnerName = state.profile.name || 'Aastha';
    const availability = calculateAvailability(state, todayStr);
    const progress = computeAcademicProgress(state);
    const todayTasks = state.tasks.filter(t => t.day === todayStr);
    const nextPendingTask = todayTasks.find(t => !t.done);
    // If no task is scheduled today, pick top prioritized recommendation
    let heroTask = nextPendingTask || null;
    if (!heroTask && todayTasks.length === 0) {
        const ideas = getRankedStudyIdeas(state, todayStr);
        if (ideas.length > 0) {
            const topIdea = ideas[0];
            heroTask = {
                id: `hero-${topIdea.chapterId}`,
                title: topIdea.title,
                day: todayStr,
                minutes: topIdea.minutes,
                subjectId: topIdea.subjectId,
                chapterId: topIdea.chapterId,
                topicId: topIdea.topicId,
                activityType: topIdea.activityType,
                learningObjective: topIdea.objective,
                steps: topIdea.steps,
                completedStepIndices: [],
                resourceRefs: topIdea.resourceRefs,
                completionEvidence: topIdea.completionEvidence,
                recommendationReason: topIdea.reason,
                priority: 'High',
                done: false,
                origin: 'generated'
            };
        }
    }
    // Calculate actual studied time from focus sessions today
    const todaySessions = state.focusSessions.filter(s => s.day === todayStr);
    const actualSeconds = todaySessions.reduce((acc, s) => acc + s.seconds, 0);
    const actualMinutes = Math.floor(actualSeconds / 60);
    const plannedMinutes = todayTasks.reduce((acc, t) => acc + t.minutes, 0);
    const completedTasksCount = todayTasks.filter(t => t.done).length;
    return `
    <div class="page-container today-page">
      <header class="greeting-header">
        <p class="eyebrow-text">YOUR BOARD PREPARATION, A LITTLE CLEARER</p>
        <h1 class="greeting-title">Hello, ${learnerName}.</h1>
        <p class="greeting-subtitle">One thoughtful step at a time.</p>
      </header>

      ${heroTask ? `
        <section class="hero-study-card liquid-glass-panel">
          <div class="hero-card-content">
            <span class="hero-eyebrow">YOUR NEXT STUDY STEP</span>
            <div class="hero-meta">
              <span class="subject-tag subject-${heroTask.subjectId}">${getSubject(heroTask.subjectId)?.title || heroTask.subjectId}</span>
              <span class="activity-type-badge">${heroTask.activityType.replace('_', ' ')}</span>
            </div>
            <h2 class="hero-task-title">${heroTask.title}</h2>
            <p class="hero-task-reason">${heroTask.recommendationReason || 'Highest priority for upcoming board readiness.'}</p>
            <div class="hero-details">
              <span>${icon('timer', 15)} ${heroTask.minutes} minutes</span>
              ${heroTask.time ? `<span>${icon('calendar', 15)} Scheduled at ${heroTask.time}</span>` : ''}
            </div>
            <button type="button" class="btn primary hero-action-btn" data-action="open-study-workspace" data-task-id="${heroTask.id}">
              ${icon('play', 18)} Start studying
            </button>
          </div>
          <div class="hero-card-art" aria-hidden="true">
            <div class="botanical-flourish"></div>
          </div>
        </section>
      ` : `
        <section class="hero-study-card liquid-glass-panel empty-hero">
          <div class="hero-card-content">
            <span class="hero-eyebrow">TODAY’S SCHEDULE IS CLEAR</span>
            <h2 class="hero-task-title">No pending tasks for today</h2>
            <p class="hero-task-reason">Generate a balanced plan based on your current CBSE preparation and available hours.</p>
            <button type="button" class="btn primary" data-action="propose-plan" data-day="${todayStr}">
              ${icon('sparkles', 18)} Propose Today’s Plan
            </button>
          </div>
        </section>
      `}

      <!-- Metrics Row -->
      <section class="metrics-grid">
        <div class="metric-card liquid-glass-card">
          <span class="metric-label">TODAY’S RECORDED FOCUS</span>
          <div class="metric-value-row">
            <strong class="metric-number">${actualMinutes}</strong>
            <span class="metric-unit">min studied</span>
          </div>
          <span class="metric-sub">${todaySessions.length} recorded focus sessions</span>
        </div>

        <div class="metric-card liquid-glass-card">
          <span class="metric-label">ACTIVITIES COMPLETED</span>
          <div class="metric-value-row">
            <strong class="metric-number">${completedTasksCount}</strong>
            <span class="metric-unit">/ ${todayTasks.length} planned</span>
          </div>
          <span class="metric-sub">${todayTasks.length - completedTasksCount} remaining today</span>
        </div>

        <div class="metric-card liquid-glass-card">
          <span class="metric-label">FREE USABLE TIME</span>
          <div class="metric-value-row">
            <strong class="metric-number">${Math.floor(availability.availableMinutes / 60)}h ${availability.availableMinutes % 60}m</strong>
          </div>
          <span class="metric-sub">after school and tuition</span>
        </div>
      </section>

      <!-- Today's Routine & Schedule Grid -->
      <div class="today-two-col">
        <section class="routine-panel liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">Today's Routine & Overrides</h3>
              <p class="panel-subtitle">Independent school and tuition commitments</p>
            </div>
          </div>

          <div class="commitment-toggles">
            <label class="toggle-control">
              <span class="toggle-label">${icon('book-open', 16)} School Today</span>
              <input type="checkbox" class="toggle-switch" data-action="toggle-school" data-day="${todayStr}" ${availability.school ? 'checked' : ''}>
            </label>

            <label class="toggle-control">
              <span class="toggle-label">${icon('clipboard-check', 16)} Tuition Today</span>
              <input type="checkbox" class="toggle-switch" data-action="toggle-tuition" data-day="${todayStr}" ${availability.tuition ? 'checked' : ''}>
            </label>
          </div>

          <p class="panel-hint">
            ${availability.school && availability.tuition ? 'Both school and tuition are active today.' :
        availability.school ? 'School only is active today; tuition time is open for study.' :
            availability.tuition ? 'No school today; morning & afternoon are open for study.' :
                'Neither school nor tuition today; full day is available for flexible study.'}
          </p>
        </section>

        <section class="syllabus-summary-panel liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h3 class="panel-title">The Bigger Picture</h3>
              <p class="panel-subtitle">CBSE Class XII 2027 Coverage</p>
            </div>
            <a href="#academics" class="link-action" data-nav="academics">View all ${icon('arrow-right', 14)}</a>
          </div>

          <div class="progress-bar-container">
            <div class="progress-fill" style="width: ${progress.overallPercent}%;"></div>
          </div>

          <div class="progress-stats-row">
            <span><strong>${progress.learnedCount}</strong> / ${progress.totalChapters} chapters learned</span>
            <span><strong>${progress.overallPercent}%</strong> self-reported coverage</span>
          </div>

          <p class="provenance-disclaimer">
            ${progress.unknownCount} chapters have no personal status yet. Unmarked means unknown; BLOOM never invents progress.
          </p>
        </section>
      </div>

      <!-- Today's Task List -->
      <section class="today-plan-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h3 class="panel-title">Today's Study Schedule (${todayTasks.length} activities)</h3>
            <p class="panel-subtitle">Click any task to enter your interactive Study Workspace</p>
          </div>
          <div class="panel-actions">
            <button type="button" class="btn secondary" data-action="propose-plan" data-day="${todayStr}">
              ${icon('sparkles', 15)} Propose additions
            </button>
            <a href="#planner" class="btn quiet" data-nav="planner">Open Planner</a>
          </div>
        </div>

        ${todayTasks.length ? `
          <div class="task-items-list">
            ${todayTasks.map(task => {
        const sub = getSubject(task.subjectId);
        return `
                <div class="task-card liquid-glass-subcard ${task.done ? 'task-done' : ''}" data-task-id="${task.id}">
                  <div class="task-card-left">
                    <button type="button" class="task-check-btn" data-action="quick-toggle-task" data-task-id="${task.id}" aria-label="Mark task done">
                      ${task.done ? icon('check', 16) : ''}
                    </button>
                    <div class="task-info" data-action="open-study-workspace" data-task-id="${task.id}">
                      <h4 class="task-item-title">${task.title}</h4>
                      <div class="task-item-meta">
                        <span class="subject-tag subject-${task.subjectId}">${sub?.title || task.subjectId}</span>
                        <span>${icon('timer', 13)} ${task.minutes} min</span>
                        ${task.time ? `<span>${task.time}</span>` : ''}
                        ${task.activityType ? `<span class="activity-pill">${task.activityType.replace('_', ' ')}</span>` : ''}
                      </div>
                    </div>
                  </div>
                  <button type="button" class="btn quiet btn-sm" data-action="open-study-workspace" data-task-id="${task.id}">
                    Study ${icon('arrow-right', 14)}
                  </button>
                </div>
              `;
    }).join('')}
          </div>
        ` : `
          <div class="empty-state-card">
            <p class="empty-text">No activities scheduled for today yet.</p>
            <button type="button" class="btn primary" data-action="propose-plan" data-day="${todayStr}">
              ${icon('plus', 16)} Generate Proposed Plan for Today
            </button>
          </div>
        `}
      </section>
    </div>
  `;
}
