/**
 * BLOOM — Master Application Controller & Router
 * Built completely fresh for CBSE Class XII 2027 (Aastha).
 */

import type { AppState, ActionableTask, SubjectId, Rating, MistakeEntry } from './types.js';
import { loadAppState, saveAppState, initialAppState } from './storage.js';
import { getIsoDate, generatePlanProposal, rescueBacklogTasks, addDays, getRevisionIntervalDays } from './planner-engine.js';
import { getChapter, getTopic, getSubject } from './curriculum.js';
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
  private selectedPlannerDate = getIsoDate();
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

    // Check if onboarding needs to be shown
    if (!this.state.profile.onboardingComplete) {
      this.showOnboarding();
    }
  }

  private setupRoutes() {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '') || 'today';
      const [route, param] = hash.split('/');
      this.currentRoute = route || 'today';
      if (route === 'academics' && param) {
        this.activeSubjectId = param as SubjectId;
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
        contentHtml = renderPlannerView(this.state, this.selectedPlannerDate);
        break;
      case 'academics':
        contentHtml = renderAcademicsView(this.state, this.activeSubjectId);
        break;
      case 'tests':
        contentHtml = renderTestsView(this.state);
        break;
      case 'tools':
      case 'more':
        contentHtml = renderToolsView(this.state);
        break;
      default:
        contentHtml = renderTodayView(this.state);
    }

    const navHtml = `
      <nav class="floating-glass-nav" aria-label="Main Navigation">
        <div class="nav-capsule liquid-glass-panel">
          <a href="#today" class="nav-item ${this.currentRoute === 'today' ? 'active' : ''}" data-nav="today">
            ${icon('sun', 18)}
            <span>Today</span>
          </a>
          <a href="#planner" class="nav-item ${this.currentRoute === 'planner' ? 'active' : ''}" data-nav="planner">
            ${icon('calendar', 18)}
            <span>Planner</span>
          </a>
          <a href="#academics" class="nav-item ${this.currentRoute === 'academics' ? 'active' : ''}" data-nav="academics">
            ${icon('book-open', 18)}
            <span>Academics</span>
          </a>
          <a href="#tests" class="nav-item ${this.currentRoute === 'tests' ? 'active' : ''}" data-nav="tests">
            ${icon('clipboard-check', 18)}
            <span>Tests</span>
          </a>
          <a href="#tools" class="nav-item ${this.currentRoute === 'tools' || this.currentRoute === 'more' ? 'active' : ''}" data-nav="tools">
            ${icon('flower', 18)}
            <span>Your Space</span>
          </a>
        </div>
      </nav>
    `;

    appEl.innerHTML = `
      <div class="app-layout">
        ${navHtml}
        <main class="main-content" id="main-content">
          ${contentHtml}
        </main>
        <div id="modal-container"></div>
      </div>
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
            window.location.hash = `#academics/${subId}`;
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

        // Close Study Workspace
        case 'close-workspace': {
          this.stopTimer();
          this.activeWorkspaceTask = null;
          const modalContainer = document.getElementById('modal-container');
          if (modalContainer) modalContainer.innerHTML = '';
          this.render();
          break;
        }

        // Complete task with reflection rating (Easy/Okay/Difficult)
        case 'complete-task': {
          const taskId = target.getAttribute('data-task-id');
          const rating = target.getAttribute('data-rating') as Rating;
          if (taskId && this.activeWorkspaceTask && this.activeWorkspaceTask.id === taskId) {
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

            // Garden growth points (earn 10 points per completed activity)
            this.state.garden.growthPoints += 10;
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

        // Toggle Quick Task Done Checkbox
        case 'quick-toggle-task': {
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

        // Propose Plan & Show Preview Modal
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

        // Add idea to plan directly
        case 'add-idea-to-plan': {
          const ideaData = target.getAttribute('data-idea');
          if (ideaData) {
            const parsed = JSON.parse(ideaData);
            const newTask: ActionableTask = {
              id: `task-${this.selectedPlannerDate}-${parsed.chapterId}-${Date.now().toString(36)}`,
              title: parsed.title,
              day: this.selectedPlannerDate,
              minutes: parsed.minutes || 25,
              subjectId: parsed.subjectId,
              chapterId: parsed.chapterId,
              topicId: parsed.topicId,
              activityType: parsed.activityType || 'concept',
              learningObjective: parsed.objective || '',
              steps: parsed.steps || [],
              completedStepIndices: [],
              resourceRefs: parsed.resourceRefs || [],
              completionEvidence: parsed.completionEvidence || '',
              recommendationReason: parsed.reason || '',
              priority: 'Normal',
              done: false,
              origin: 'student'
            };
            this.state.tasks.push(newTask);
            await this.persist();
            this.render();
          }
          break;
        }

        // Launch specific topic activity from Academics
        case 'launch-topic-activity': {
          const chapId = target.getAttribute('data-chapter-id');
          const topId = target.getAttribute('data-topic-id');
          const mode = (target.getAttribute('data-mode') || 'learning') as 'learning' | 'practice';

          const chap = getChapter(chapId || '');
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
              recommendationReason: `Direct launch from Academics · ${mode} mode`,
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

        // Timer controls in Workspace
        case 'timer-toggle': {
          this.toggleTimer();
          break;
        }
        case 'timer-reset': {
          this.resetTimer();
          break;
        }

        // Log Mistake drawer/modal
        case 'open-mistake-drawer':
        case 'open-new-mistake-modal': {
          const chapId = target.getAttribute('data-chapter-id') || '';
          this.showMistakeModal(chapId);
          break;
        }

        // Save Mistake Entry
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

        // Schedule Mistake Retry
        case 'schedule-mistake-retry': {
          const mistakeId = target.getAttribute('data-mistake-id');
          const m = this.state.mistakes.find(item => item.id === mistakeId);
          if (m) {
            const chap = getChapter(m.chapterId);
            const top = chap?.topics[0];
            const retryTask: ActionableTask = {
              id: `retry-${m.id}`,
              title: `Re-solve: ${m.questionDesc}`,
              day: getIsoDate(),
              minutes: 15,
              subjectId: m.subjectId,
              chapterId: m.chapterId,
              topicId: m.topicId,
              activityType: 'mistake_retry',
              learningObjective: `Overcome ${m.rootCause.replace('_', ' ')}: ${m.studentNotes}`,
              steps: [
                'Review the previous mistake notes and where logic failed.',
                'Re-solve the full problem on blank paper without looking at hints.',
                'Verify steps and mark mistake as resolved.'
              ],
              completedStepIndices: [],
              resourceRefs: top ? [top.ncertRef] : [],
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

        // Add School Test modal
        case 'open-add-test-modal': {
          this.showAddTestModal();
          break;
        }

        // Save School Test
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

        // Onboarding navigation
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
          const travel = Number((document.getElementById('ob-travel') as HTMLInputElement)?.value) || 20;

          this.state.profile.wakeTime = wake || '07:00';
          this.state.profile.sleepTime = sleep || '23:00';
          this.state.profile.schoolStart = sStart || '08:00';
          this.state.profile.schoolEnd = sEnd || '14:00';
          this.state.profile.tuitionStart = tStart || '17:00';
          this.state.profile.tuitionEnd = tEnd || '21:00';
          this.state.profile.travelMinutes = travel;

          this.onboardingStep = 3;
          this.showOnboarding();
          break;
        }
        case 'choose-session-len': {
          const mins = Number(target.getAttribute('data-mins'));
          this.state.profile.sessionMinutes = mins;
          this.showOnboarding();
          break;
        }
        case 'choose-break-len': {
          const mins = Number(target.getAttribute('data-mins'));
          this.state.profile.breakMinutes = mins;
          this.showOnboarding();
          break;
        }
        case 'toggle-diff-subject': {
          const subId = target.getAttribute('data-subject-id') as SubjectId;
          if (subId) {
            const list = this.state.profile.difficultSubjects;
            if (list.includes(subId)) {
              this.state.profile.difficultSubjects = list.filter(id => id !== subId);
            } else {
              this.state.profile.difficultSubjects.push(subId);
            }
            this.showOnboarding();
          }
          break;
        }
        case 'complete-onboarding': {
          this.state.profile.onboardingComplete = true;
          // Generate initial proposed plan for today
          const initialPlan = generatePlanProposal(this.state, getIsoDate());
          if (initialPlan.blocks.length > 0) {
            this.state.tasks.push(...initialPlan.blocks);
          }
          await this.persist();
          this.closeModal();
          this.render();
          break;
        }

        // Close generic modal
        case 'close-modal': {
          this.closeModal();
          break;
        }
      }
    });

    // Checkbox changes for interactive checklist in study workspace
    document.addEventListener('change', async (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('step-checkbox')) {
        const input = target as HTMLInputElement;
        const stepIdx = Number(input.getAttribute('data-step-index'));
        if (this.activeWorkspaceTask) {
          const current = new Set(this.activeWorkspaceTask.completedStepIndices || []);
          if (input.checked) current.add(stepIdx);
          else current.delete(stepIdx);
          this.activeWorkspaceTask.completedStepIndices = Array.from(current);
          await this.persist();
          this.renderActiveWorkspace();
        }
      }

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

      // Update Chapter rating in Academics
      if (target.classList.contains('rating-select')) {
        const select = target as HTMLSelectElement;
        const chapId = select.getAttribute('data-chapter-id');
        if (chapId) {
          const current = this.state.chapterProgress[chapId] || { status: 'Not started' };
          current.rating = (select.value as Rating) || undefined;
          this.state.chapterProgress[chapId] = current;
          await this.persist();
          this.render();
        }
      }
    });
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
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon('sparkles', 18)} Proposed Study Schedule</h2>
              <p class="modal-subtitle">${proposal.day} · ${proposal.blocks.length} activities proposed (${proposal.plannedMinutes} min)</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon('x', 18)}
            </button>
          </header>

          <div class="modal-body">
            <p class="proposal-intro">
              BLOOM generated these activities based on your confirmed CBSE priorities, verified marks scope, and available study windows. Review before applying:
            </p>

            <div class="proposed-blocks-list">
              ${proposal.blocks.map(b => `
                <div class="proposal-block-item glass-subcard">
                  <div class="block-time">${b.time || 'Flex'}</div>
                  <div class="block-details">
                    <div class="block-title-row">
                      <strong>${b.title}</strong>
                      <span class="subject-tag subject-${b.subjectId}">${getSubject(b.subjectId)?.title}</span>
                    </div>
                    <span class="block-reason">${b.recommendationReason}</span>
                    <span class="block-duration">${icon('timer', 13)} ${b.minutes} min · ${b.activityType.replace('_', ' ')}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="modal-actions">
              <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
              <button type="button" class="btn primary" data-action="approve-plan-proposal" data-proposal-blocks='${JSON.stringify(proposal.blocks).replace(/'/g, "&#39;")}'>
                ${icon('check', 16)} Approve & Save Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private showMistakeModal(prefillChapterId = '') {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon('alert-circle', 18)} Log Doubt or Mistake</h2>
              <p class="modal-subtitle">Capturing mistakes immediately transforms them into spaced retries.</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon('x', 18)}
            </button>
          </header>

          <div class="modal-body">
            <div class="form-stack">
              <label class="form-field">
                <span>Subject & Chapter</span>
                <select id="m-chap" class="glass-select">
                  <option value="phy-1" ${prefillChapterId === 'phy-1' ? 'selected' : ''}>Physics: Electric Charges & Fields</option>
                  <option value="phy-2" ${prefillChapterId === 'phy-2' ? 'selected' : ''}>Physics: Electrostatic Potential & Capacitance</option>
                  <option value="phy-3" ${prefillChapterId === 'phy-3' ? 'selected' : ''}>Physics: Current Electricity</option>
                  <option value="phy-9" ${prefillChapterId === 'phy-9' ? 'selected' : ''}>Physics: Ray Optics</option>
                  <option value="chem-1" ${prefillChapterId === 'chem-1' ? 'selected' : ''}>Chemistry: Solutions</option>
                  <option value="chem-2" ${prefillChapterId === 'chem-2' ? 'selected' : ''}>Chemistry: Electrochemistry</option>
                  <option value="math-1" ${prefillChapterId === 'math-1' ? 'selected' : ''}>Math: Continuity & Differentiability</option>
                  <option value="math-3" ${prefillChapterId === 'math-3' ? 'selected' : ''}>Math: Integrals</option>
                </select>
              </label>

              <label class="form-field">
                <span>Question or Concept Problem</span>
                <input type="text" id="m-desc" class="glass-input" placeholder="e.g. Lens Maker focal length shift in water" required>
              </label>

              <label class="form-field">
                <span>Root Cause of Error</span>
                <select id="m-cause" class="glass-select">
                  <option value="conceptual">Concept Gap / Misunderstanding</option>
                  <option value="calculation">Calculation or Sign Convention Slip</option>
                  <option value="formula_recall">Formula Forgotten / Incomplete</option>
                  <option value="presentation">Presentation / Step Justification</option>
                  <option value="misread_question">Misread Question Details</option>
                </select>
              </label>

              <label class="form-field">
                <span>What went wrong?</span>
                <textarea id="m-notes" class="glass-textarea" placeholder="Explain where your thinking faltered..."></textarea>
              </label>

              <label class="form-field">
                <span>Correct Method or Key Takeaway</span>
                <textarea id="m-correction" class="glass-textarea" placeholder="Note the right equation or principle..."></textarea>
              </label>

              <div class="modal-actions">
                <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
                <button type="button" class="btn primary" data-action="save-mistake-entry">
                  ${icon('check', 16)} Save to Mistake Journal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private showAddTestModal() {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card liquid-glass-panel">
          <header class="modal-header">
            <div>
              <h2 class="modal-title">${icon('plus', 18)} Add School Test</h2>
              <p class="modal-subtitle">Save a confirmed test to automatically prioritize its syllabus.</p>
            </div>
            <button type="button" class="btn-icon" data-action="close-modal" aria-label="Close">
              ${icon('x', 18)}
            </button>
          </header>

          <div class="modal-body">
            <div class="form-stack">
              <label class="form-field">
                <span>Test Name</span>
                <input type="text" id="test-title" class="glass-input" placeholder="e.g. Pre-Board 1 Physics" required>
              </label>

              <label class="form-field">
                <span>Subject</span>
                <select id="test-sub" class="glass-select">
                  <option value="physics">Physics (042)</option>
                  <option value="chemistry">Chemistry (043)</option>
                  <option value="math">Mathematics (041)</option>
                  <option value="english">English Core (301)</option>
                  <option value="pe">Physical Education (048)</option>
                </select>
              </label>

              <label class="form-field">
                <span>Test Date</span>
                <input type="date" id="test-date" class="glass-input" value="${addDays(getIsoDate(), 7)}" required>
              </label>

              <label class="form-field">
                <span>Maximum Marks</span>
                <input type="number" id="test-max" class="glass-input" value="70" min="10" max="100">
              </label>

              <div class="modal-actions">
                <button type="button" class="btn quiet" data-action="close-modal">Cancel</button>
                <button type="button" class="btn primary" data-action="save-school-test">
                  ${icon('check', 16)} Save Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Timer Management
  private initTimerForTask(task: ActionableTask) {
    this.stopTimer();
    this.timerTotalAllocated = (task.minutes || 25) * 60;
    this.timerSeconds = this.timerTotalAllocated;
    this.timerSessionElapsed = 0;
    this.timerRunning = false;
  }

  private toggleTimer() {
    if (this.timerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  private startTimer() {
    if (this.timerRunning) return;
    this.timerRunning = true;
    this.updateTimerControlsUI();

    this.timerInterval = window.setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.timerSessionElapsed++;
        this.updateTimerDisplay();
      } else {
        this.stopTimer();
        alert('Focus session complete! Time to reflect and log your understanding rating.');
      }
    }, 1000);
  }

  private pauseTimer() {
    this.timerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerControlsUI();
  }

  private stopTimer() {
    this.pauseTimer();
  }

  private resetTimer() {
    this.pauseTimer();
    this.timerSeconds = this.timerTotalAllocated;
    this.updateTimerDisplay();
  }

  private updateTimerDisplay() {
    const displayEl = document.getElementById('workspace-timer-display');
    if (!displayEl) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    displayEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  private updateTimerControlsUI() {
    const btnEl = document.getElementById('timer-start-pause');
    const labelEl = document.getElementById('timer-btn-label');
    if (!btnEl || !labelEl) return;

    if (this.timerRunning) {
      labelEl.textContent = 'Pause';
      btnEl.classList.add('timer-running');
    } else {
      labelEl.textContent = 'Resume';
      btnEl.classList.remove('timer-running');
    }
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  const app = new BloomApp();
  app.init().catch(err => console.error('Error starting BLOOM:', err));
});
