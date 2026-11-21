/**
 * BLOOM — Conversational First-Login Onboarding & Personalisation Flow
 * Strict fulfillment of Spec A5.
 */

import type { AppState, LearnerProfile } from '../types.js';
import { icon } from './icons.js';
import { CBSE_SUBJECTS } from '../curriculum.js';

export function renderOnboardingModal(state: AppState, currentStep = 1): string {
  const p = state.profile;

  return `
    <div class="modal-backdrop" id="onboarding-modal">
      <div class="onboarding-card liquid-glass-panel">
        <header class="onboarding-header">
          <div class="onboarding-progress-dots">
            ${[1, 2, 3, 4, 5].map(step => `
              <span class="step-dot ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}">${step}</span>
            `).join('')}
          </div>
          <span class="step-counter-text">Step ${currentStep} of 5</span>
        </header>

        <div class="onboarding-body">
          ${currentStep === 1 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">WELCOME TO BLOOM</span>
              <h2 class="onboarding-title">Let’s tailor your CBSE preparation, Aastha.</h2>
              <p class="onboarding-desc">BLOOM is your private Class XII companion. Exactly five board subjects, zero JEE distraction, and no fake history.</p>

              <div class="subject-confirmation-box glass-subcard">
                <strong>Your Five Confirmed Board Subjects (2027):</strong>
                <ul class="onboarding-subject-list">
                  ${CBSE_SUBJECTS.map(s => `
                    <li><span class="subject-tag subject-${s.id}">${s.code} · ${s.title}</span></li>
                  `).join('')}
                </ul>
                <small class="onboarding-hint">Yoga is part of Physical Education (Unit 3), not a separate board subject.</small>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="2">
                  Continue ${icon('arrow-right', 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 2 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">DAILY COMMITMENTS</span>
              <h2 class="onboarding-title">When do you usually wake and attend commitments?</h2>
              <p class="onboarding-desc">School and tuition are independent. You can override any individual date later with one click.</p>

              <div class="onboarding-form-grid">
                <label class="form-field">
                  <span>Wake-up time</span>
                  <input type="time" class="glass-input" id="ob-wake" value="${p.wakeTime || '07:00'}">
                </label>

                <label class="form-field">
                  <span>Sleep time</span>
                  <input type="time" class="glass-input" id="ob-sleep" value="${p.sleepTime || '23:00'}">
                </label>

                <label class="form-field">
                  <span>School hours</span>
                  <div class="time-range-row">
                    <input type="time" class="glass-input" id="ob-school-start" value="${p.schoolStart || '08:00'}">
                    <span>to</span>
                    <input type="time" class="glass-input" id="ob-school-end" value="${p.schoolEnd || '14:00'}">
                  </div>
                </label>

                <label class="form-field">
                  <span>Tuition hours</span>
                  <div class="time-range-row">
                    <input type="time" class="glass-input" id="ob-tuition-start" value="${p.tuitionStart || '17:00'}">
                    <span>to</span>
                    <input type="time" class="glass-input" id="ob-tuition-end" value="${p.tuitionEnd || '21:00'}">
                  </div>
                </label>

                <label class="form-field">
                  <span>Travel buffer (minutes each way)</span>
                  <input type="number" class="glass-input" id="ob-travel" min="0" max="60" value="${p.travelMinutes || 20}">
                </label>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="1">Back</button>
                <button type="button" class="btn primary" data-action="save-ob-step-2" data-step="3">
                  Next ${icon('arrow-right', 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 3 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">STUDY RHYTHM</span>
              <h2 class="onboarding-title">How do you prefer to study?</h2>
              <p class="onboarding-desc">Select your preferred focus block length and rest intervals.</p>

              <div class="onboarding-form-grid">
                <div class="form-field">
                  <span>Preferred study session length</span>
                  <div class="pill-options-row">
                    ${[25, 45, 60].map(mins => `
                      <button type="button" class="pill-choice ${p.sessionMinutes === mins ? 'selected' : ''}" data-action="choose-session-len" data-mins="${mins}">
                        ${mins} min blocks
                      </button>
                    `).join('')}
                  </div>
                </div>

                <div class="form-field">
                  <span>Rest break between blocks</span>
                  <div class="pill-options-row">
                    ${[5, 10, 15].map(mins => `
                      <button type="button" class="pill-choice ${p.breakMinutes === mins ? 'selected' : ''}" data-action="choose-break-len" data-mins="${mins}">
                        ${mins} min rest
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="2">Back</button>
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="4">
                  Next ${icon('arrow-right', 16)}
                </button>
              </div>
            </div>
          ` : currentStep === 4 ? `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">ACADEMIC EMPHASIS</span>
              <h2 class="onboarding-title">Which subjects do you want more help with?</h2>
              <p class="onboarding-desc">Physics is noted as your most demanding subject, but other subjects can also receive focused time.</p>

              <div class="subject-difficulty-selector">
                ${CBSE_SUBJECTS.map(s => {
                  const isDiff = p.difficultSubjects.includes(s.id);
                  return `
                    <label class="subject-diff-choice glass-subcard ${isDiff ? 'checked' : ''}">
                      <input type="checkbox" data-action="toggle-diff-subject" data-subject-id="${s.id}" ${isDiff ? 'checked' : ''}>
                      <span class="subject-tag subject-${s.id}">${s.code} · ${s.title}</span>
                      <span class="diff-tag">${isDiff ? 'Needs focus & help' : 'Standard balance'}</span>
                    </label>
                  `;
                }).join('')}
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="3">Back</button>
                <button type="button" class="btn primary" data-action="onboarding-next" data-step="5">
                  Review & Confirm ${icon('arrow-right', 16)}
                </button>
              </div>
            </div>
          ` : `
            <div class="onboarding-step-content">
              <span class="onboarding-eyebrow">ALL SET</span>
              <h2 class="onboarding-title">Your personalised companion is ready, Aastha.</h2>
              <p class="onboarding-desc">Click below to generate your proposed first study schedule. BLOOM will propose balanced sessions and wait for your approval.</p>

              <div class="summary-review-card glass-subcard">
                <p><strong>Learner:</strong> ${p.name || 'Aastha'} (CBSE Class XII 2027)</p>
                <p><strong>Routine:</strong> Wake ${p.wakeTime || '07:00'}, Sleep ${p.sleepTime || '23:00'}</p>
                <p><strong>Study rhythm:</strong> ${p.sessionMinutes || 25}m sessions with ${p.breakMinutes || 5}m mindful breaks</p>
                <p><strong>Priority subjects:</strong> ${p.difficultSubjects.join(', ') || 'Physics'}</p>
              </div>

              <div class="onboarding-actions">
                <button type="button" class="btn quiet" data-action="onboarding-prev" data-step="4">Back</button>
                <button type="button" class="btn primary btn-lg" data-action="complete-onboarding">
                  ${icon('sparkles', 18)} Finish Setup & Open BLOOM
                </button>
              </div>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
}
