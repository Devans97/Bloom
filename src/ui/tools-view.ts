/**
 * BLOOM — Your Space / Tools View
 * Mistake Journal, Bloom Garden, Practicals & Vault Security.
 */

import type { AppState, MistakeEntry } from '../types.js';
import { icon } from './icons.js';
import { getSubject, getChapter } from '../curriculum.js';

export function renderToolsView(state: AppState): string {
  const mistakes = state.mistakes;
  const garden = state.garden;
  const learner = state.profile;

  return `
    <div class="page tools-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">PERSONAL STUDY SPACE & VAULT</p>
          <h1>Your Space</h1>
          <p class="muted">All your study tools, mistake journal, and privacy controls in one place.</p>
        </div>
      </div>

      <section class="profile-top" style="display:flex; align-items:center; gap:16px; margin-bottom:28px; padding:20px; background:#fff8; border-radius:14px; border:1px solid var(--line);">
        <span class="avatar" style="width:64px; height:64px; font-size:24px; border-radius:50%; display:grid; place-items:center; background:var(--blush); color:var(--rose-dark); font-weight:700;">
          ${learner.name[0] || 'A'}
        </span>
        <div style="flex:1;">
          <h2 style="font-size:24px; margin:0;">${learner.name}</h2>
          <p class="muted" style="margin:2px 0 0; font-size:13px;">CBSE Class XII · 2027 · Private Local Vault</p>
        </div>
        <button type="button" class="button outline" data-action="open-onboarding" title="Update settings">
          ${icon('pencil')} Routine & Settings
        </button>
      </section>

      <div class="planner-grid" style="grid-template-columns: 1fr 1fr; gap: 24px;">
        <!-- Mistake Journal -->
        <section style="background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px;">
          <div class="section-head">
            <div>
              <h2>Mistake Journal</h2>
              <p class="muted">${mistakes.length} error logs · scheduled retry for root causes</p>
            </div>
            <button type="button" class="button outline" data-action="open-new-mistake-modal">
              ${icon('plus')} Log mistake
            </button>
          </div>

          <div class="rows">
            ${mistakes.length > 0 ? mistakes.map(m => {
              const sub = getSubject(m.subjectId);
              return `
                <article class="task-row ${m.resolved ? 'done' : ''}">
                  <div class="row-main">
                    <span class="subject subject-${m.subjectId}">${sub?.title || m.subjectId}</span>
                    <strong>${m.questionDesc}</strong>
                    <small>Cause: ${m.rootCause.replace('_', ' ')} · ${m.studentNotes}</small>
                  </div>
                  <div style="display:flex; gap:6px;">
                    ${!m.resolved ? `
                      <button type="button" class="button quiet" data-action="schedule-mistake-retry" data-mistake-id="${m.id}" title="Schedule retry">
                        ${icon('rotate-ccw')}
                      </button>
                    ` : `
                      <span class="status marked">${icon('check')} Mastered</span>
                    `}
                  </div>
                </article>
              `;
            }).join('') : `
              <div class="empty-line" style="padding:20px; text-align:center; color:var(--soft);">
                No mistakes logged yet. When you get stuck on a question or numerical, log it here to automatically schedule a spaced retry.
              </div>
            `}
          </div>
        </section>

        <!-- Bloom Garden -->
        <section style="background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="section-head">
              <div>
                <h2>Bloom Garden</h2>
                <p class="muted">Reflects your genuine study focus. Never withers.</p>
              </div>
            </div>

            <div style="text-align:center; padding:30px 10px;">
              <div style="font-size:64px; margin-bottom:12px;">🌸</div>
              <h3 style="font-size:20px; margin:0 0 6px;">${garden.plantType} · Level ${garden.level}</h3>
              <p class="muted" style="font-size:13px; font-style:italic;">"True understanding grows with steady, calm steps."</p>
              <div style="margin-top:16px; display:inline-flex; align-items:center; gap:8px; padding:6px 14px; background:var(--sage); color:var(--green); border-radius:99px; font-size:12px; font-weight:600;">
                ${garden.growthPoints} growth points · ${garden.bloomsEarned} blooms earned
              </div>
            </div>
          </div>

          <div style="border-top:1px solid var(--line); padding-top:16px; font-size:12px; color:var(--soft);">
            Flowers bloom when focus sessions are completed and rated honestly.
          </div>
        </section>
      </div>

      <!-- Privacy & Vault Section -->
      <section style="margin-top:28px; background:#fff8; border-radius:14px; border:1px solid var(--line); padding:24px;">
        <div class="section-head">
          <div>
            <h2>Privacy & Vault Security</h2>
            <p class="muted">Aastha is the sole student. Zero third-party cloud trackers. AES-256-GCM encrypted local storage.</p>
          </div>
          <span style="display:inline-flex; align-items:center; gap:6px; color:var(--green); font-size:12px; font-weight:700;">
            ${icon('shield-check')} AES-256 Encrypted
          </span>
        </div>

        <div class="rows">
          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid var(--line);">
            <div>
              <strong>Encryption Status</strong>
              <small style="display:block; color:var(--soft);">Web Crypto PBKDF2 (250,000 iterations) + AES-GCM-256</small>
            </div>
            <span class="status marked">Secured</span>
          </div>

          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0; border-bottom:1px solid var(--line);">
            <div>
              <strong>Target Examination</strong>
              <small style="display:block; color:var(--soft);">Exclusively CBSE Class XII 2027 (No JEE, No external syllabi)</small>
            </div>
            <span class="status marked">CBSE XII Only</span>
          </div>

          <div class="settings-row" style="display:flex; justify-content:space-between; align-items:center; padding:14px 0;">
            <div>
              <strong>Local Backup & Reset</strong>
              <small style="display:block; color:var(--soft);">Export your study record or reset to clean state.</small>
            </div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="button outline" data-action="export-state">Export JSON</button>
              <button type="button" class="button quiet" data-action="reset-state" style="color:#923a43;">Reset Data</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
