/**
 * BLOOM — Master Application Controller & Router
 * Built completely fresh for CBSE Class XII 2027 (Aastha).
 */

import type { AppState, ActionableTask, SubjectId, Rating, MistakeEntry } from './types.js';
import { loadAppState, saveAppState, initialAppState } from './storage.js';
import { getIsoDate, generatePlanProposal, rescueBacklogTasks, addDays, getRevisionIntervalDays } from './planner-engine.js';
import { getChapter, getTopic, getSubject, CBSE_CHAPTERS, CBSE_SUBJECTS } from './curriculum.js';
import { buildActionableActivity } from './academic-engine.js';
import { icon } from './ui/icons.js';

// Views
import { renderTodayView } from './ui/today-view.js';
import { renderPlannerView } from './ui/planner-view.js';
import { renderAcademicsView } from './ui/academics-view.js';
import { renderTestsView } from './ui/tests-view.js';
import { renderToolsView } from './ui/tools-view.js';
import { renderStudyWorkspace } from './ui/study-workspace-view.js';
import { renderOnboardingModal } from './ui/onboarding-view.js';

class BloomApp {
  private state: AppState = initialAppState();
  private currentRoute = 'today';
  private activeSubjectId: SubjectId = 'physics';
  private selectedChapterId = 'phy-1';
  private selectedPlannerDate = getIsoDate();
  private plannerMode: 'list' | 'time' = 'list';
  private activeWorkspaceTask: ActionableTask | null = null;
  private onboardingStep = 1;

  // Focus Timer State
  private timerSeconds = 25 * 60;
  private timerTotalAllocated = 25 * 60;
  private timerInterval: number | null = null;
  private timerRunning = false;
  private timerSessionElapsed = 0;

  async init() {
    this.state = await loadAppState();
    this.setupRoutes();
    this.setupGlobalEvents();
    this.render();

    // Show onboarding if not complete
    if (!this.state.profile.onboardingComplete) {
      this.showOnboarding();
    }
  }

  private setupRoutes() {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '') || 'today';
      const [route, param, subParam] = hash.split('/');
      this.currentRoute = route || 'today';
      if (route === 'academics') {
        if (param) this.activeSubjectId = param as SubjectId;
        if (subParam) this.selectedChapterId = subParam;
      }
      this.render();
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  private async persist() {
    await saveAppState(this.state);
  }

  private render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    let contentHtml = '';
    switch (this.currentRoute) {
      case 'today':
        contentHtml = renderTodayView(this.state);
        break;
      case 'planner':
        contentHtml = renderPlannerView(this.state, this.selectedPlannerDate, this.plannerMode);
        break;
      case 'academics':
      case 'syllabus':
        contentHtml = renderAcademicsView(this.state, this.activeSubjectId, this.selectedChapterId);
        break;
      case 'tests':
        contentHtml = renderTestsView(this.state);
        break;
      case 'tools':
      case 'more':
      case 'profile':
        contentHtml = renderToolsView(this.state);
        break;
      default:
        contentHtml = renderTodayView(this.state);
    }

    const learnerName = this.state.profile.name || 'Aastha';
    const todayDateFormatted = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(new Date());

    appEl.innerHTML = `
      <div class="layout">
        <aside class="sidebar" aria-label="Sidebar navigation">
          <a href="#today" class="wordmark">
            <img src="./art/mark.svg" alt="BLOOM emblem">
            <span>BLOOM</span>
          </a>
          <p class="sidebar-label eyebrow">STUDY SPACE</p>
          <nav aria-label="Main navigation">
            <a href="#today" data-nav="today" ${this.currentRoute === 'today' ? 'aria-current="page"' : ''}>
              ${icon('sun')}
              <span>Today</span>
            </a>
            <a href="#planner" data-nav="planner" ${this.currentRoute === 'planner' ? 'aria-current="page"' : ''}>
              ${icon('calendar')}
              <span>Planner</span>
            </a>
            <a href="#academics" data-nav="academics" ${this.currentRoute === 'academics' || this.currentRoute === 'syllabus' ? 'aria-current="page"' : ''}>
              ${icon('book-open')}
              <span>Syllabus</span>
            </a>
            <a href="#tests" data-nav="tests" ${this.currentRoute === 'tests' ? 'aria-current="page"' : ''}>
              ${icon('clipboard-list')}
              <span>Tests</span>
            </a>
            <a href="#tools" data-nav="tools" ${this.currentRoute === 'tools' || this.currentRoute === 'more' || this.currentRoute === 'profile' ? 'aria-current="page"' : ''}>
              ${icon('flower')}
              <span>Your Space</span>
            </a>
          </nav>
          <button type="button" class="profile-button" data-action="open-tools">
            <span class="avatar">${learnerName[0] || 'A'}</span>
            <span>
              <strong>${learnerName}</strong>
              <small>CBSE XII · 2027</small>
            </span>
          </button>
        </aside>

        <div class="workspace">
          <header class="topbar">
            <div>${todayDateFormatted}</div>
            <div class="session">CBSE XII · 2027</div>
          </header>
          <main class="page-content" id="content">
            ${contentHtml}
          </main>
        </div>
      </div>
      <div id="modal-container"></div>
    `;

    // Re-render active study workspace if open
    if (this.activeWorkspaceTask) {
      this.renderActiveWorkspace();
    }
  }

  private renderActiveWorkspace() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer || !this.activeWorkspaceTask) return;

    modalContainer.innerHTML = renderStudyWorkspace(this.activeWorkspaceTask, this.state);
    this.updateTimerDisplay();
  }

  private setupGlobalEvents() {
    document.addEventListener('click', async (e) => {
      const target = (e.target as HTMLElement).closest('[data-action]') as HTMLElement | null;
      if (!target) return;

      const action = target.getAttribute('data-action');
      const day = target.getAttribute('data-day') || getIsoDate();

      switch (action) {
        // Toggle School commitment independently
        case 'toggle-school': {
          const isChecked = (target as HTMLInputElement).checked;
          this.state.dayOverrides[day] = {
            ...(this.state.dayOverrides[day] || { school: false, tuition: true }),
            school: isChecked
          };
          await this.persist();
          this.render();
          break;
        }

        // Toggle Tuition commitment independently
        case 'toggle-tuition': {
          const isChecked = (target as HTMLInputElement).checked;
          this.state.dayOverrides[day] = {
            ...(this.state.dayOverrides[day] || { school: false, tuition: true }),
            tuition: isChecked
          };
          await this.persist();
          this.render();
          break;
        }

        // Switch Academics Subject
        case 'switch-subject': {
          const subId = target.getAttribute('data-subject-id') as SubjectId;
          if (subId) {
            this.activeSubjectId = subId;
            const chaps = CBSE_CHAPTERS.filter(c => c.subjectId === subId);
            if (chaps.length > 0) this.selectedChapterId = chaps[0].id;
            window.location.hash = `#academics/${subId}`;
          }
          break;
        }

        // Select Chapter in Academics
        case 'select-chapter': {
          const chapId = target.getAttribute('data-chapter-id');
          if (chapId) {
            this.selectedChapterId = chapId;
            this.render();
          }
          break;
        }

        // Change Date in Planner
        case 'change-date': {
          const newDay = target.getAttribute('data-day');
          if (newDay) {
            this.selectedPlannerDate = newDay;
            this.render();
          }
          break;
        }

        // Switch Planner Mode (Checklist / Timetable)
        case 'planner-mode': {
          const mode = target.getAttribute('data-value') as 'list' | 'time';
          if (mode) {
            this.plannerMode = mode;
            this.render();
          }
          break;
        }

        // Open Study Workspace for a task
        case 'open-study-workspace': {
          const taskId = target.getAttribute('data-task-id');
          const task = this.state.tasks.find(t => t.id === taskId);
          if (task) {
            this.activeWorkspaceTask = task;
            this.initTimerForTask(task);
            this.renderActiveWorkspace();
          } else {
            // Check if hero proposal
            const ideas = generatePlanProposal(this.state, getIsoDate());
            if (ideas.blocks.length > 0) {
              const proposed = ideas.blocks[0];
              this.state.tasks.push(proposed);
              this.activeWorkspaceTask = proposed;
              this.initTimerForTask(proposed);
              await this.persist();
              this.render();
            }
          }
          break;
        }

        // Launch Topic Activity directly from Academics
        case 'launch-topic-activity': {
          const chapId = target.getAttribute('data-chapter-id') || '';
          const topId = target.getAttribute('data-topic-id') || '';
          const mode = (target.getAttribute('data-mode') || 'learning') as 'learning' | 'practice';

          const chap = getChapter(chapId);
          const top = chap?.topics.find(t => t.id === topId);
          if (chap && top) {
            const act = buildActionableActivity(top, chap, mode);
            const task: ActionableTask = {
              id: `direct-${Date.now()}`,
              title: act.title,
              day: getIsoDate(),
              minutes: act.expectedMinutes,
              subjectId: chap.subjectId,
              chapterId: chap.id,
              topicId: top.id,
              activityType: act.activityType,
              learningObjective: act.learningObjective,
              steps: act.steps,
              completedStepIndices: [],
              resourceRefs: act.resourceRefs,
              completionEvidence: act.completionEvidence,
              recommendationReason: `Direct launch from Syllabus · ${mode} mode`,
              priority: 'Normal',
              done: false,
              origin: 'student'
            };
            this.state.tasks.push(task);
            this.activeWorkspaceTask = task;
            this.initTimerForTask(task);
            await this.persist();
            this.render();
          }
          break;
        }

        // Close Study Workspace
        case 'close-workspace': {
          this.stopTimer();
          this.activeWorkspaceTask = null;
          const modalContainer = document.getElementById('modal-container');
          if (modalContainer) modalContainer.innerHTML = '';
          this.render();
          break;
        }

        // Complete Activity from Study Workspace
        case 'finish-workspace-task': {
          const taskId = target.getAttribute('data-task-id');
          if (taskId && this.activeWorkspaceTask && this.activeWorkspaceTask.id === taskId) {
            const ratingInput = document.querySelector('input[name="reflection-rating"]:checked') as HTMLInputElement | null;
            const rating: Rating = (ratingInput?.value as Rating) || 'Okay';

            this.activeWorkspaceTask.done = true;
            this.activeWorkspaceTask.completedAt = new Date().toISOString();
            this.activeWorkspaceTask.understandingRating = rating;

            // Record focus session
            const sessionSecs = this.timerSessionElapsed > 0 ? this.timerSessionElapsed : (this.activeWorkspaceTask.minutes * 60);
            this.state.focusSessions.push({
              id: `focus-${Date.now()}`,
              taskId: this.activeWorkspaceTask.id,
              subjectId: this.activeWorkspaceTask.subjectId,
              chapterId: this.activeWorkspaceTask.chapterId,
              topicId: this.activeWorkspaceTask.topicId,
              day: this.activeWorkspaceTask.day,
              seconds: sessionSecs,
              completedAt: new Date().toISOString()
            });

            // Update chapter progress & next spaced revision date
            const chapterId = this.activeWorkspaceTask.chapterId;
            const revDays = getRevisionIntervalDays(rating);
            this.state.chapterProgress[chapterId] = {
              status: 'Learned',
              rating,
              lastStudied: getIsoDate(),
              nextReview: addDays(getIsoDate(), revDays)
            };

            this.state.reviews.push({
              chapterId,
              date: getIsoDate(),
              rating
            });

            // Garden growth points
            this.state.garden.growthPoints += 15;
            if (this.state.garden.growthPoints >= 50 * this.state.garden.level) {
              this.state.garden.level++;
              this.state.garden.bloomsEarned++;
            }

            this.stopTimer();
            this.activeWorkspaceTask = null;
            await this.persist();
            this.render();
          }
          break;
        }

        // Toggle Step in Workspace
        case 'toggle-step': {
          const stepIdx = Number(target.getAttribute('data-step-index'));
          if (this.activeWorkspaceTask) {
            const current = new Set(this.activeWorkspaceTask.completedStepIndices || []);
            if (current.has(stepIdx)) current.delete(stepIdx);
            else current.add(stepIdx);
            this.activeWorkspaceTask.completedStepIndices = Array.from(current);
            await this.persist();
            this.renderActiveWorkspace();
          }
          break;
        }

        // Toggle Quick Task Done Checkbox
        case 'quick-toggle-task':
        case 'toggle-task': {
          const taskId = target.getAttribute('data-task-id');
          const task = this.state.tasks.find(t => t.id === taskId);
          if (task) {
            task.done = !task.done;
            if (task.done) {
              task.completedAt = new Date().toISOString();
              this.state.garden.growthPoints += 5;
            }
            await this.persist();
            this.render();
          }
          break;
        }

        // Delete Task
        case 'delete-task': {
          const taskId = target.getAttribute('data-task-id');
          if (taskId) {
            this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
            await this.persist();
            this.render();
          }
          break;
        }

        // Add Idea Task from Planner Suggestion Rail
        case 'add-idea-task': {
          const chapId = target.getAttribute('data-chapter-id');
          const subId = target.getAttribute('data-subject-id') as SubjectId;
          const chap = getChapter(chapId || '');
          if (chap && chap.topics.length > 0) {
            const top = chap.topics[0];
            const act = buildActionableActivity(top, chap, 'learning');
            this.state.tasks.push({
              id: `task-${this.selectedPlannerDate}-${chap.id}-${Date.now().toString(36)}`,
              title: act.title,
              day: this.selectedPlannerDate,
              minutes: act.expectedMinutes,
              subjectId: subId || chap.subjectId,
              chapterId: chap.id,
              topicId: top.id,
              activityType: act.activityType,
              learningObjective: act.learningObjective,
              steps: act.steps,
              completedStepIndices: [],
              resourceRefs: act.resourceRefs,
              completionEvidence: act.completionEvidence,
              recommendationReason: `Recommended preparation for ${chap.title}`,
              priority: 'Normal',
              done: false,
              origin: 'student'
            });
            await this.persist();
            this.render();
          }
          break;
        }

        // Propose Plan & Show Modal
        case 'propose-plan': {
          const planDay = target.getAttribute('data-day') || getIsoDate();
          const proposal = generatePlanProposal(this.state, planDay);
          this.showPlanProposalModal(proposal);
          break;
        }

        // Approve and Save Plan Proposal
        case 'approve-plan-proposal': {
          const jsonStr = target.getAttribute('data-proposal-blocks');
          if (jsonStr) {
            const blocks = JSON.parse(jsonStr) as ActionableTask[];
            this.state.tasks.push(...blocks);
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }

        // Rescue Backlog
        case 'rescue-backlog': {
          const fromDay = target.getAttribute('data-day') || getIsoDate();
          const rescued = rescueBacklogTasks(this.state, fromDay);
          if (rescued.length > 0) {
            this.state.tasks.push(...rescued);
            await this.persist();
            alert(`Rescued ${rescued.length} tasks and distributed them over the next week!`);
            this.render();
          } else {
            alert('No overdue or missed tasks found to rescue.');
          }
          break;
        }

        // Timer Controls
        case 'timer-toggle': {
          this.toggleTimer();
          break;
        }
        case 'timer-reset': {
          this.resetTimer();
          break;
        }

        // Modals
        case 'open-add-custom-task': {
          this.showAddCustomTaskModal(target.getAttribute('data-day') || getIsoDate());
          break;
        }
        case 'save-custom-task': {
          const title = (document.getElementById('task-title-input') as HTMLInputElement)?.value;
          const mins = Number((document.getElementById('task-mins-input') as HTMLInputElement)?.value) || 25;
          const chapId = (document.getElementById('task-chap-select') as HTMLSelectElement)?.value || 'phy-1';
          const chap = getChapter(chapId);
          if (title && chap) {
            this.state.tasks.push({
              id: `custom-${Date.now()}`,
              title,
              day: this.selectedPlannerDate,
              minutes: mins,
              subjectId: chap.subjectId,
              chapterId: chap.id,
              activityType: 'concept',
              learningObjective: `Independent study of ${title}`,
              steps: [
                'Read and understand the core concept.',
                'Practice questions on blank paper.',
                'Reflect on clarity and rate confidence.'
              ],
              completedStepIndices: [],
              resourceRefs: [chap.ncertRef],
              completionEvidence: 'Completed independent practice.',
              recommendationReason: 'Custom student task',
              priority: 'Normal',
              done: false,
              origin: 'student'
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }

        case 'open-new-mistake-modal': {
          const chapId = target.getAttribute('data-chapter-id') || '';
          this.showMistakeModal(chapId);
          break;
        }
        case 'save-mistake-entry': {
          const desc = (document.getElementById('m-desc') as HTMLInputElement)?.value;
          const notes = (document.getElementById('m-notes') as HTMLTextAreaElement)?.value;
          const correction = (document.getElementById('m-correction') as HTMLTextAreaElement)?.value;
          const cause = ((document.getElementById('m-cause') as HTMLSelectElement)?.value || 'conceptual') as MistakeEntry['rootCause'];
          const chapId = (document.getElementById('m-chap') as HTMLSelectElement)?.value || 'phy-1';
          const chap = getChapter(chapId);

          if (desc && chap) {
            this.state.mistakes.push({
              id: `mistake-${Date.now()}`,
              date: getIsoDate(),
              subjectId: chap.subjectId,
              chapterId: chap.id,
              questionDesc: desc,
              rootCause: cause,
              studentNotes: notes || '',
              correctApproach: correction || '',
              resolved: false
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }

        case 'schedule-mistake-retry': {
          const mistakeId = target.getAttribute('data-mistake-id');
          const m = this.state.mistakes.find(item => item.id === mistakeId);
          if (m) {
            const chap = getChapter(m.chapterId);
            const retryTask: ActionableTask = {
              id: `retry-${m.id}`,
              title: `Re-solve: ${m.questionDesc}`,
              day: getIsoDate(),
              minutes: 15,
              subjectId: m.subjectId,
              chapterId: m.chapterId,
              activityType: 'mistake_retry',
              learningObjective: `Overcome ${m.rootCause.replace('_', ' ')}: ${m.studentNotes}`,
              steps: [
                'Review previous mistake notes and where logic failed.',
                'Re-solve full problem on blank paper without looking at hints.',
                'Verify steps and mark mistake as resolved.'
              ],
              completedStepIndices: [],
              resourceRefs: chap ? [chap.ncertRef] : [],
              completionEvidence: 'Re-solved cleanly on paper with correct working.',
              recommendationReason: `Mistake Journal retry (${m.rootCause})`,
              priority: 'High',
              done: false,
              origin: 'student'
            };
            this.state.tasks.push(retryTask);
            await this.persist();
            alert('Retry activity added to today’s study plan!');
            this.render();
          }
          break;
        }

        case 'open-add-test-modal': {
          this.showAddTestModal();
          break;
        }
        case 'save-school-test': {
          const title = (document.getElementById('test-title') as HTMLInputElement)?.value;
          const day = (document.getElementById('test-date') as HTMLInputElement)?.value;
          const subId = (document.getElementById('test-sub') as HTMLSelectElement)?.value as SubjectId;
          const maxMarks = Number((document.getElementById('test-max') as HTMLInputElement)?.value) || 70;

          if (title && day && subId) {
            this.state.tests.push({
              id: `test-${Date.now()}`,
              title,
              day,
              subjectId: subId,
              coverageChapterIds: getChapter(subId) ? [subId] : [],
              maxMarks,
              isTotalOnly: true,
              confirmedByLearner: true
            });
            await this.persist();
            this.closeModal();
            this.render();
          }
          break;
        }

        case 'delete-test': {
          const testId = target.getAttribute('data-test-id');
          if (testId) {
            this.state.tests = this.state.tests.filter(t => t.id !== testId);
            await this.persist();
            this.render();
          }
          break;
        }

        case 'open-tools': {
          window.location.hash = '#tools';
          break;
        }

        case 'open-onboarding': {
          this.onboardingStep = 1;
          this.showOnboarding();
          break;
        }

        case 'close-modal': {
          this.closeModal();
          break;
        }

        // Onboarding flow
        case 'onboarding-next': {
          const nextStep = Number(target.getAttribute('data-step') || 1);
          this.onboardingStep = nextStep;
          this.showOnboarding();
          break;
        }
        case 'onboarding-prev': {
          const prevStep = Number(target.getAttribute('data-step') || 1);
          this.onboardingStep = prevStep;
          this.showOnboarding();
          break;
        }
        case 'save-ob-step-2': {
          const wake = (document.getElementById('ob-wake') as HTMLInputElement)?.value;
          const sleep = (document.getElementById('ob-sleep') as HTMLInputElement)?.value;
          const sStart = (document.getElementById('ob-school-start') as HTMLInputElement)?.value;
          const sEnd = (document.getElementById('ob-school-end') as HTMLInputElement)?.value;
          const tStart = (document.getElementById('ob-tuition-start') as HTMLInputElement)?.value;
          const tEnd = (document.getElementById('ob-tuition-end') as HTMLInputElement)?.value;

          if (wake) this.state.profile.wakeTime = wake;
          if (sleep) this.state.profile.sleepTime = sleep;
          if (sStart) this.state.profile.schoolStart = sStart;
          if (sEnd) this.state.profile.schoolEnd = sEnd;
          if (tStart) this.state.profile.tuitionStart = tStart;
          if (tEnd) this.state.profile.tuitionEnd = tEnd;

          await this.persist();
          this.onboardingStep = 3;
          this.showOnboarding();
          break;
        }
        case 'save-ob-step-3': {
          const diffSub = (document.querySelector('input[name="ob-diff"]:checked') as HTMLInputElement)?.value as SubjectId;
          if (diffSub) {
            this.state.profile.difficultSubjects = [diffSub];
          }
          await this.persist();
          this.onboardingStep = 4;
          this.showOnboarding();
          break;
        }
        case 'finish-onboarding': {
          this.state.profile.onboardingComplete = true;
          await this.persist();
          this.closeModal();
          this.render();
          break;
        }

        case 'export-state': {
          const blob = new Blob([JSON.stringify(this.state, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `bloom-study-vault-${getIsoDate()}.json`;
          a.click();
          break;
        }

        case 'reset-state': {
          if (confirm('Are you sure you want to reset all study progress and records?')) {
            this.state = initialAppState();
            await this.persist();
            this.render();
          }
          break;
        }
      }
    });

    // Checkbox and select changes
    document.addEventListener('change', async (e) => {
      const target = e.target as HTMLElement;

      // Update Chapter status in Academics
      if (target.classList.contains('status-select')) {
        const select = target as HTMLSelectElement;
        const chapId = select.getAttribute('data-chapter-id');
        if (chapId) {
          const current = this.state.chapterProgress[chapId] || { status: 'Not started' };
          current.status = select.value as AppState['chapterProgress'][string]['status'];
          this.state.chapterProgress[chapId] = current;
          await this.persist();
          this.render();
        }
      }

      // Planner date input
      if (target.id === 'planner-date-input') {
        const input = target as HTMLInputElement;
        if (input.value) {
          this.selectedPlannerDate = input.value;
          this.render();
        }
      }
    });
  }

  // Timer methods
  private initTimerForTask(task: ActionableTask) {
    this.stopTimer();
    this.timerSeconds = task.minutes * 60;
    this.timerTotalAllocated = task.minutes * 60;
    this.timerSessionElapsed = 0;
    this.timerRunning = false;
  }

  private toggleTimer() {
    if (this.timerRunning) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer() {
    this.timerRunning = true;
    this.updateTimerControls();
    this.timerInterval = window.setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.timerSessionElapsed++;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        alert('Focus session complete! Take a gentle rest.');
      }
    }, 1000);
  }

  private stopTimer() {
    this.timerRunning = false;
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerControls();
  }

  private resetTimer() {
    this.stopTimer();
    this.timerSeconds = this.timerTotalAllocated;
    this.timerSessionElapsed = 0;
    this.updateTimerDisplay();
  }

  private updateTimerDisplay() {
    const el = document.getElementById('workspace-timer-display');
    if (el) {
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }

  private updateTimerControls() {
    const label = document.getElementById('timer-btn-label');
    if (label) {
      label.textContent = this.timerRunning ? 'Pause Focus' : 'Start Focus';
    }
  }

  private closeModal() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) modalContainer.innerHTML = '';
  }

  private showOnboarding() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.innerHTML = renderOnboardingModal(this.state, this.onboardingStep);
    }
  }

  private showPlanProposalModal(proposal: ReturnType<typeof generatePlanProposal>) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(640px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">${proposal.day} · ${proposal.plannedMinutes} MIN</p>
              <h2 style="font-size:24px;">Proposed Study Schedule</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon('x')}
            </button>
          </div>

          <p style="color:var(--soft); font-size:13px; line-height:1.5; margin-bottom:18px;">
            BLOOM generated these activities based on your confirmed CBSE priorities, verified marks scope, and available study windows. Review before applying:
          </p>

          <div class="rows" style="max-height:360px; overflow-y:auto; margin-bottom:20px;">
            ${proposal.blocks.map(b => `
              <article class="task-row">
                <div class="row-main">
                  <span class="subject subject-${b.subjectId}">${getSubject(b.subjectId)?.title}</span>
                  <strong>${b.title}</strong>
                  <small>${b.recommendationReason} · ${b.minutes} min</small>
                </div>
              </article>
            `).join('')}
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="approve-plan-proposal" data-proposal-blocks='${JSON.stringify(proposal.blocks).replace(/'/g, "&#39;")}'>
              ${icon('check')} Approve & Save Plan
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private showMistakeModal(prefillChapterId = '') {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(540px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">MISTAKE JOURNAL</p>
              <h2 style="font-size:22px;">Log Doubt or Mistake</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon('x')}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Subject & Chapter
              <select id="m-chap" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_CHAPTERS.map(c => `
                  <option value="${c.id}" ${prefillChapterId === c.id ? 'selected' : ''}>
                    ${getSubject(c.subjectId)?.title}: ${c.title}
                  </option>
                `).join('')}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Root Cause
              <select id="m-cause" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                <option value="conceptual">Conceptual Misunderstanding</option>
                <option value="calculation">Calculation / Sign Error</option>
                <option value="formula_recall">Formula Recall Failure</option>
                <option value="misread_question">Misread Question Stem</option>
                <option value="presentation">Presentation / Units / Steps Omission</option>
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Question Description
              <input type="text" id="m-desc" placeholder="e.g. Q4 on Lens Maker's formula with differing radii" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              What Went Wrong
              <textarea id="m-notes" rows="3" placeholder="Forgot to apply Cartesian sign convention for R2" style="border-radius:8px; border:1px solid var(--line); padding:8px 10px; font-size:13px; font-family:inherit;"></textarea>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Key Takeaway / Correct Rule
              <textarea id="m-correction" rows="2" placeholder="Always sketch the principal axis and mark signs before calculating" style="border-radius:8px; border:1px solid var(--line); padding:8px 10px; font-size:13px; font-family:inherit;"></textarea>
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-mistake-entry">
              ${icon('check')} Save Mistake Note
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private showAddTestModal() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(480px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">SCHOOL TESTS</p>
              <h2 style="font-size:22px;">Add Upcoming Test</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon('x')}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Subject
              <select id="test-sub" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_SUBJECTS.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Test Title
              <input type="text" id="test-title" placeholder="e.g. Pre-Board 1 Physics" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Date
              <input type="date" id="test-date" value="${getIsoDate()}" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Maximum Marks
              <input type="number" id="test-max" value="70" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-school-test">
              ${icon('check')} Save Test
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private showAddCustomTaskModal(day: string) {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div style="position:fixed; inset:0; z-index:50; background:rgba(41,27,39,0.65); backdrop-filter:blur(8px); display:grid; place-items:center; padding:20px; overflow-y:auto;">
        <div style="width:min(480px,100%); background:var(--white); border:1px solid var(--line); border-radius:20px; box-shadow:0 24px 70px rgba(0,0,0,0.25); padding:28px;">
          <div class="section-head intro" style="margin-bottom:16px;">
            <div>
              <p class="eyebrow">${day}</p>
              <h2 style="font-size:22px;">Add Custom Study Activity</h2>
            </div>
            <button type="button" class="tool" data-action="close-modal" aria-label="Close">
              ${icon('x')}
            </button>
          </div>

          <div style="display:grid; gap:14px; margin-bottom:20px;">
            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Activity Title
              <input type="text" id="task-title-input" placeholder="e.g. Derive Lens Maker's Formula" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Chapter
              <select id="task-chap-select" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
                ${CBSE_CHAPTERS.map(c => `
                  <option value="${c.id}">${getSubject(c.subjectId)?.title}: ${c.title}</option>
                `).join('')}
              </select>
            </label>

            <label style="display:grid; gap:5px; font-size:12px; font-weight:600;">
              Allocated Minutes
              <input type="number" id="task-mins-input" value="30" step="5" min="10" max="180" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 10px; font-size:13px;">
            </label>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="button quiet" data-action="close-modal">Cancel</button>
            <button type="button" class="button primary" data-action="save-custom-task">
              ${icon('check')} Add to Plan
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new BloomApp();
  app.init().catch(console.error);
});
