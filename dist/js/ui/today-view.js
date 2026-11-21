/**
 * BLOOM — Today View
 * Faithful to the Apple Liquid Glass aesthetic and editorial design tokens.
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
    const targetMinutes = Math.round(availability.availableMinutes * 0.7);
    const completedTasksCount = todayTasks.filter(t => t.done).length;
    const remainingTasksCount = todayTasks.length - completedTasksCount;
    const progressPercent = targetMinutes > 0 ? Math.min(100, Math.round((actualMinutes / targetMinutes) * 100)) : 0;
    // Next board exam calculation (Physics is first on 16 Feb 2027)
    const nextExamDate = new Date('2027-02-16T10:30:00+05:30');
    const now = new Date();
    const diffTime = nextExamDate.getTime() - now.getTime();
    const daysAway = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const heroSubject = heroTask ? getSubject(heroTask.subjectId) : null;
    const flowerCount = state.garden.bloomsEarned || 1;
    const availHours = (availability.availableMinutes / 60).toFixed(1);
    return `
    <div class="page today-page">
      <div class="dashboard-greeting">
        <div>
          <p class="eyebrow">YOUR BOARD PREPARATION, A LITTLE CLEARER</p>
          <h1>Hello, ${learnerName}.</h1>
          <p>One thoughtful step at a time.</p>
        </div>
        <a class="dashboard-garden" href="#tools" data-nav="tools">
          ${icon('leaf')} <span>${flowerCount} ${flowerCount === 1 ? 'flower' : 'flowers'} in bloom</span>
        </a>
      </div>

      ${heroTask ? `
        <section class="focus-band" aria-label="Suggested next step">
          <div class="focus-content">
            <p class="eyebrow">YOUR NEXT STUDY STEP</p>
            <div class="subject subject-${heroTask.subjectId}">${heroSubject?.title || heroTask.subjectId}</div>
            <h2>${heroTask.title}</h2>
            <p>${heroTask.recommendationReason || heroTask.learningObjective}</p>
            <div>
              <button type="button" class="button primary" data-action="open-study-workspace" data-task-id="${heroTask.id}">
                ${icon('play')} Start studying
              </button>
            </div>
          </div>
          <div class="focus-art" aria-hidden="true">
            <img src="./art/cosmos.webp" alt="Cosmos bloom">
            <i></i><i></i><i></i>
          </div>
        </section>
      ` : `
        <section class="focus-band" aria-label="Schedule is clear">
          <div class="focus-content">
            <p class="eyebrow">TODAY’S SCHEDULE IS CLEAR</p>
            <h2>No pending tasks for today</h2>
            <p>Generate a balanced plan based on your current CBSE preparation and available hours.</p>
            <div>
              <button type="button" class="button primary" data-action="propose-plan" data-day="${todayStr}">
                ${icon('leaf')} Propose Today’s Plan
              </button>
            </div>
          </div>
          <div class="focus-art" aria-hidden="true">
            <img src="./art/cosmos.webp" alt="Cosmos bloom">
            <i></i><i></i><i></i>
          </div>
        </section>
      `}

      <section class="day-pulse" aria-label="Today’s actual study activity">
        <div class="pulse-main">
          <div class="pulse-ring" style="--progress: ${progressPercent};" role="img" aria-label="${progressPercent}% of study target">
            <span>${progressPercent}%<small>of target</small></span>
          </div>
          <div>
            <p class="eyebrow">TODAY, AT YOUR PACE</p>
            <h2>${actualMinutes}m <span>studied</span></h2>
            <p>${targetMinutes > 0 ? `${targetMinutes}m suggested target` : 'Set your availability'} · ${plannedMinutes}m planned</p>
          </div>
        </div>
        <div class="pulse-detail">
          <strong>${completedTasksCount}<span> / ${todayTasks.length}</span></strong>
          <span>activities complete</span>
          <small>${remainingTasksCount} remaining</small>
        </div>
        <div class="pulse-detail">
          <strong>${todaySessions.length}</strong>
          <span>focus sessions saved</span>
          <small>${Math.max(0, targetMinutes - actualMinutes)}m to target</small>
        </div>
      </section>

      <div class="dashboard-columns">
        <section class="today-plan">
          <div class="section-head">
            <div>
              <h2>Your day, considered.</h2>
              <p>${availHours}h available before study breaks and rest</p>
            </div>
            <a href="#planner" class="button quiet">Open planner ${icon('arrow-right')}</a>
          </div>

          <div class="daily-commitments">
            <label class="switch" style="display:inline-flex; align-items:center; gap:8px;">
              <input type="checkbox" data-action="toggle-school" data-day="${todayStr}" ${availability.school ? 'checked' : ''}>
              <span></span>
              <span style="font-size:12px; font-weight:600;">School today</span>
            </label>
            <label class="switch" style="display:inline-flex; align-items:center; gap:8px; margin-left:14px;">
              <input type="checkbox" data-action="toggle-tuition" data-day="${todayStr}" ${availability.tuition ? 'checked' : ''}>
              <span></span>
              <span style="font-size:12px; font-weight:600;">Tuition today</span>
            </label>
          </div>

          ${todayTasks.length > 0 ? `
            <div class="rows">
              ${todayTasks.slice(0, 4).map(task => `
                <article class="task-row ${task.done ? 'done' : ''}">
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
                </article>
              `).join('')}
            </div>
          ` : `
            <div class="companion-empty" style="padding:28px 16px; text-align:center; background:#fff8; border-radius:12px; margin-top:14px;">
              <p style="color:var(--soft); margin-bottom:12px;">Your time is ready.<br>Let’s give it a useful shape.</p>
              <button type="button" class="button outline" data-action="propose-plan" data-day="${todayStr}">
                ${icon('leaf')} Suggest today’s plan
              </button>
            </div>
          `}
        </section>

        <section class="academic-glance">
          <div class="section-head">
            <h2>The bigger picture</h2>
            <a href="#academics" class="button quiet">Academics ${icon('arrow-right')}</a>
          </div>
          <p class="academic-number" style="font-size:36px; font-family:var(--display); color:var(--ink);">${progress.learnedCount}<span> / ${progress.totalChapters}</span></p>
          <p style="color:var(--soft); font-size:13px; margin:4px 0 12px;">chapters learned, based on your own status</p>
          <div class="progress-track" role="progressbar" aria-label="Chapters learned" aria-valuenow="${progress.learnedCount}" aria-valuemax="${progress.totalChapters}">
            <span class="progress-fill" style="transform: scaleX(${progress.overallPercent / 100});"></span>
          </div>
          <div class="academic-attention" style="display:flex; gap:12px; margin-top:14px; font-size:12px; color:var(--soft);">
            <span><strong style="color:var(--ink);">${progress.learningCount}</strong> learning</span>
            <span><strong style="color:var(--ink);">${progress.needsRevisionCount}</strong> reviews due</span>
            <span><strong style="color:var(--ink);">${progress.unknownCount}</strong> unmarked</span>
          </div>
          <small style="display:block; margin-top:12px; color:var(--soft); font-size:11px;">Unmarked means unknown. School coverage never counts as your learning.</small>
        </section>
      </div>

      <section class="exam-strip" aria-label="Next board exam">
        <div class="exam-icon">${icon('leaf')}</div>
        <div>
          <p class="eyebrow">NEXT BOARD EXAM</p>
          <h2>Physics</h2>
          <p>Monday, 16 February 2027 · ${daysAway} days away</p>
        </div>
        <a href="#academics/physics" class="button outline">Physics syllabus</a>
      </section>

      <footer class="page-foot">
        <span>Make room for learning.</span>
        <a href="#tools" data-nav="tools">See your real progress ${icon('arrow-right')}</a>
      </footer>
    </div>
  `;
}
