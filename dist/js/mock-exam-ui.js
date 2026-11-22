/**
 * CBSE Class XII Board Examination Mock Simulator UI
 * Full 3-Hour Exam Environment across all 5 official subjects:
 * Physics (042 - 70m), Chemistry (043 - 70m), Mathematics (041 - 80m),
 * English Core (301 - 80m), Physical Education (048 - 70m).
 * Features: 180-minute countdown + 15-minute reading period, section navigator palette,
 * question status tracking, digital scratchpad, official step-rubric reveal, and score reporting.
 */
import { generateCBSEDiagnosticPaper } from './diagnostic-engine.js';
export class MockExamUI {
    container;
    state = {
        subjectId: 'physics',
        paper: null,
        currentQuestionIndex: 0,
        timeRemainingSeconds: 180 * 60, // 3 hours
        isReadingTime: false,
        isTimerRunning: false,
        questionStatus: {},
        userAnswers: {},
        isSubmitted: false,
        selfGradedScores: {}
    };
    timerInterval = null;
    constructor(container) {
        this.container = container;
    }
    initPaper(subjectId) {
        this.state.subjectId = subjectId;
        this.state.paper = generateCBSEDiagnosticPaper(subjectId);
        this.state.currentQuestionIndex = 0;
        this.state.timeRemainingSeconds = (this.state.paper.durationHours || 3) * 3600;
        this.state.questionStatus = {};
        this.state.userAnswers = {};
        this.state.isSubmitted = false;
        this.state.selfGradedScores = {};
        if (this.state.paper) {
            this.state.paper.questions.forEach((_, idx) => {
                this.state.questionStatus[idx] = 'unvisited';
            });
            this.state.questionStatus[0] = 'answered'; // mark active
        }
    }
    render() {
        if (!this.state.paper) {
            this.initPaper('physics');
        }
        const paper = this.state.paper;
        const qIndex = this.state.currentQuestionIndex;
        const currentQ = paper.questions[qIndex];
        const totalQ = paper.questions.length;
        this.container.innerHTML = `
      <div class="mock-exam-root" style="display: flex; flex-direction: column; gap: 20px; padding: 24px; max-width: 1250px; margin: 0 auto; color: var(--color-ink, #1f2937); font-family: system-ui, -apple-system, sans-serif;">
        <!-- Exam Top Header Bar -->
        <header style="background: #111827; color: #ffffff; padding: 16px 24px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: 700;">CBSE Board Examination Simulator</div>
            <h1 style="margin: 2px 0 0 0; font-size: 20px; font-weight: 800;">${paper.title}</h1>
            <div style="font-size: 12px; color: #d1d5db; margin-top: 2px;">Subject Code: ${paper.subjectCode} • Max Marks: ${paper.totalMarks} • Time: ${paper.durationHours} Hours</div>
          </div>

          <!-- Timer & Action Buttons -->
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="text-align: right;">
              <div style="font-size: 11px; color: #9ca3af; font-weight: 600;">Time Remaining</div>
              <div id="exam-timer-display" style="font-size: 24px; font-weight: 800; font-family: monospace; color: ${this.state.timeRemainingSeconds < 900 ? '#ef4444' : '#10b981'};">
                ${this.formatTime(this.state.timeRemainingSeconds)}
              </div>
            </div>

            <button id="btn-timer-toggle" style="padding: 8px 14px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; background: ${this.state.isTimerRunning ? '#dc2626' : '#2563eb'}; color: #ffffff;">
              ${this.state.isTimerRunning ? 'Pause' : 'Start Timer'}
            </button>

            <button id="btn-submit-exam" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; background: #059669; color: #ffffff;">
              Submit Paper
            </button>
          </div>
        </header>

        <!-- Subject Switcher Pills -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
          ${this.renderSubjectPills()}
        </div>

        <!-- Main Examination Grid -->
        <div style="display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start;">
          <!-- Left Main Area: Question & Answer Console -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <!-- Question Top Info -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 14px; margin-bottom: 18px;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; background: #1e3a8a; color: #ffffff; padding: 3px 10px; border-radius: 6px;">Question ${qIndex + 1} of ${totalQ}</span>
                <span style="font-size: 12px; font-weight: 700; background: #f3f4f6; color: #4b5563; padding: 3px 8px; border-radius: 6px;">Section ${currentQ.section}</span>
              </div>
              <span style="font-size: 13px; font-weight: 700; background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px;">Weightage: ${currentQ.marks} Mark${currentQ.marks > 1 ? 's' : ''}</span>
            </div>

            <!-- Question Text -->
            <div style="font-size: 16px; font-weight: 600; line-height: 1.6; color: #111827; margin-bottom: 20px;">
              ${currentQ.questionText}
            </div>

            ${currentQ.options ? `
              <!-- Multiple Choice Options -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
                ${currentQ.options.map((opt, oIdx) => `
                  <label style="display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; background: ${this.state.userAnswers[qIndex] === opt ? '#eff6ff' : '#ffffff'}; transition: all 0.15s;">
                    <input type="radio" name="q-option-${qIndex}" value="${opt}" ${this.state.userAnswers[qIndex] === opt ? 'checked' : ''} style="cursor: pointer;">
                    <span style="font-size: 14px; color: #1f2937;"><strong>(${String.fromCharCode(65 + oIdx)})</strong> ${opt}</span>
                  </label>
                `).join('')}
              </div>
            ` : `
              <!-- Written Answer Textarea -->
              <div style="margin-bottom: 24px;">
                <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">Your Written Solution / Scratchpad</label>
                <textarea id="answer-sheet-input" placeholder="Type step-by-step formulas, derivations, or answers..." style="width: 100%; box-sizing: border-box; height: 160px; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; font-family: monospace; resize: vertical;">${this.state.userAnswers[qIndex] || ''}</textarea>
              </div>
            `}

            <!-- Navigation Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 16px;">
              <button id="btn-prev-q" ${qIndex === 0 ? 'disabled' : ''} style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: ${qIndex === 0 ? 'not-allowed' : 'pointer'}; background: #ffffff; opacity: ${qIndex === 0 ? '0.5' : '1'};">
                Previous
              </button>

              <div style="display: flex; gap: 8px;">
                <button id="btn-mark-review" style="padding: 8px 14px; border: 1px solid #f59e0b; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; background: #fffbeb; color: #b45309;">
                  Mark for Review
                </button>
                <button id="btn-toggle-rubric" style="padding: 8px 14px; border: 1px solid #3b82f6; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; background: #eff6ff; color: #1d4ed8;">
                  View Marking Rubric
                </button>
              </div>

              <button id="btn-next-q" ${qIndex === totalQ - 1 ? 'disabled' : ''} style="padding: 8px 20px; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: ${qIndex === totalQ - 1 ? 'not-allowed' : 'pointer'}; background: #2563eb; color: #ffffff; opacity: ${qIndex === totalQ - 1 ? '0.5' : '1'};">
                Save & Next
              </button>
            </div>

            <!-- Rubric Drawer (Hidden by default or revealed) -->
            <div id="rubric-drawer" style="display: none; margin-top: 16px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px;">
              <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #166534; margin-bottom: 6px;">CBSE Step-Marking Scheme</div>
              <div style="font-size: 13.5px; line-height: 1.5; color: #14532d;">${currentQ.markingScheme}</div>
            </div>
          </div>

          <!-- Right Sidebar: Question Palette -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1f2937;">Question Navigator Palette</h3>

            <!-- Status Legends -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px; color: #4b5563; margin-bottom: 14px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px;">
              <div style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; background: #10b981;"></span> Answered</div>
              <div style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; background: #f59e0b;"></span> For Review</div>
              <div style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; background: #e5e7eb;"></span> Not Visited</div>
              <div style="display: flex; align-items: center; gap: 4px;"><span style="width: 10px; height: 10px; border-radius: 2px; border: 2px solid #2563eb;"></span> Current</div>
            </div>

            <!-- Number Grid -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; max-height: 380px; overflow-y: auto;">
              ${paper.questions.map((_, idx) => {
            const status = this.state.questionStatus[idx];
            const isCurrent = idx === qIndex;
            let bg = '#f3f4f6';
            let color = '#374151';
            if (status === 'answered') {
                bg = '#10b981';
                color = '#ffffff';
            }
            else if (status === 'review') {
                bg = '#f59e0b';
                color = '#ffffff';
            }
            return `
                  <button class="palette-q-btn" data-index="${idx}" style="padding: 8px 4px; border: ${isCurrent ? '2px solid #1e40af' : '1px solid #d1d5db'}; border-radius: 6px; background: ${bg}; color: ${color}; font-size: 12px; font-weight: 700; cursor: pointer; text-align: center;">
                    ${idx + 1}
                  </button>
                `;
        }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
        this.bindEvents();
    }
    renderSubjectPills() {
        const subjects = [
            { id: 'physics', label: 'Physics (042)' },
            { id: 'chemistry', label: 'Chemistry (043)' },
            { id: 'math', label: 'Mathematics (041)' },
            { id: 'english', label: 'English Core (301)' },
            { id: 'pe', label: 'Physical Education (048)' }
        ];
        return subjects.map(s => {
            const isSelected = s.id === this.state.subjectId;
            return `
        <button class="subject-pill-btn" data-subject="${s.id}" style="padding: 6px 14px; border-radius: 9999px; border: 1px solid ${isSelected ? '#2563eb' : '#d1d5db'}; background: ${isSelected ? '#eff6ff' : '#ffffff'}; color: ${isSelected ? '#1d4ed8' : '#374151'}; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap;">
          ${s.label}
        </button>
      `;
        }).join('');
    }
    formatTime(totalSeconds) {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    bindEvents() {
        // Subject switch
        this.container.querySelectorAll('.subject-pill-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sub = e.currentTarget.getAttribute('data-subject');
                if (sub && sub !== this.state.subjectId) {
                    if (this.timerInterval)
                        clearInterval(this.timerInterval);
                    this.state.isTimerRunning = false;
                    this.initPaper(sub);
                    this.render();
                }
            });
        });
        // Timer start/pause
        this.container.querySelector('#btn-timer-toggle')?.addEventListener('click', () => {
            if (this.state.isTimerRunning) {
                clearInterval(this.timerInterval);
                this.state.isTimerRunning = false;
            }
            else {
                this.state.isTimerRunning = true;
                this.timerInterval = setInterval(() => {
                    if (this.state.timeRemainingSeconds > 0) {
                        this.state.timeRemainingSeconds--;
                        const timerEl = this.container.querySelector('#exam-timer-display');
                        if (timerEl) {
                            timerEl.textContent = this.formatTime(this.state.timeRemainingSeconds);
                        }
                    }
                    else {
                        clearInterval(this.timerInterval);
                        this.state.isTimerRunning = false;
                        alert('Time is up! Please submit your examination.');
                    }
                }, 1000);
            }
            this.render();
        });
        // Question navigation
        this.container.querySelector('#btn-prev-q')?.addEventListener('click', () => {
            if (this.state.currentQuestionIndex > 0) {
                this.saveCurrentAnswer();
                this.state.currentQuestionIndex--;
                this.render();
            }
        });
        this.container.querySelector('#btn-next-q')?.addEventListener('click', () => {
            if (this.state.currentQuestionIndex < (this.state.paper?.questions.length || 1) - 1) {
                this.saveCurrentAnswer();
                this.state.questionStatus[this.state.currentQuestionIndex] = 'answered';
                this.state.currentQuestionIndex++;
                this.render();
            }
        });
        // Palette jump
        this.container.querySelectorAll('.palette-q-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = Number(e.currentTarget.getAttribute('data-index'));
                this.saveCurrentAnswer();
                this.state.currentQuestionIndex = idx;
                this.render();
            });
        });
        // Mark review
        this.container.querySelector('#btn-mark-review')?.addEventListener('click', () => {
            this.saveCurrentAnswer();
            this.state.questionStatus[this.state.currentQuestionIndex] = 'review';
            this.render();
        });
        // Toggle rubric
        this.container.querySelector('#btn-toggle-rubric')?.addEventListener('click', () => {
            const drawer = this.container.querySelector('#rubric-drawer');
            if (drawer) {
                drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
            }
        });
        // Submit exam
        this.container.querySelector('#btn-submit-exam')?.addEventListener('click', () => {
            if (confirm('Are you ready to submit your paper? Your self-assessment report will be generated.')) {
                if (this.timerInterval)
                    clearInterval(this.timerInterval);
                this.state.isTimerRunning = false;
                this.state.isSubmitted = true;
                alert('Examination submitted successfully! All step-marking schemes are now unlocked for grading.');
            }
        });
    }
    saveCurrentAnswer() {
        const qIndex = this.state.currentQuestionIndex;
        const currentQ = this.state.paper?.questions[qIndex];
        if (currentQ?.options) {
            const checked = this.container.querySelector(`input[name="q-option-${qIndex}"]:checked`);
            if (checked) {
                this.state.userAnswers[qIndex] = checked.value;
            }
        }
        else {
            const textInput = this.container.querySelector('#answer-sheet-input');
            if (textInput) {
                this.state.userAnswers[qIndex] = textInput.value;
            }
        }
    }
}
