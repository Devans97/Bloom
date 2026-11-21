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

  return `
    <div class="page-container tools-page">
      <header class="tools-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">PERSONAL STUDY VAULT & TOOLS</span>
          <h1 class="page-title">Your Space</h1>
          <p class="page-subtitle">Mistake Journal, tranquil garden growth, practicals, and private settings.</p>
        </div>
      </header>

      <!-- Grid of Tools -->
      <div class="tools-grid">
        <!-- Mistake Journal Card -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon('alert-circle', 18)} Mistake Journal (${mistakes.length})</h2>
              <p class="panel-subtitle">Turn errors into mastery. Scheduled retry activities target root causes.</p>
            </div>
            <button type="button" class="btn secondary btn-sm" data-action="open-new-mistake-modal">
              ${icon('plus', 14)} Add Entry
            </button>
          </div>

          ${mistakes.length ? `
            <div class="mistakes-stack">
              ${mistakes.map(m => {
                const sub = getSubject(m.subjectId);
                const chap = getChapter(m.chapterId);
                return `
                  <div class="mistake-item glass-subcard ${m.resolved ? 'mistake-resolved' : ''}">
                    <div class="mistake-item-top">
                      <span class="subject-tag subject-${m.subjectId}">${sub?.title || m.subjectId}</span>
                      <span class="root-cause-badge cause-${m.rootCause}">${m.rootCause.replace('_', ' ')}</span>
                      <span class="mistake-date">${m.date}</span>
                    </div>

                    <h4 class="mistake-question">${m.questionDesc}</h4>
                    <p class="mistake-chap-label">${chap?.title || ''}</p>

                    <div class="mistake-notes-block">
                      <p><strong>What went wrong:</strong> ${m.studentNotes}</p>
                      ${m.correctApproach ? `<p><strong>Key lesson / correction:</strong> ${m.correctApproach}</p>` : ''}
                    </div>

                    <div class="mistake-actions">
                      ${!m.resolved ? `
                        <button type="button" class="btn primary btn-sm" data-action="schedule-mistake-retry" data-mistake-id="${m.id}">
                          ${icon('rotate-ccw', 14)} Schedule Retry Session
                        </button>
                        <button type="button" class="btn quiet btn-sm" data-action="toggle-mistake-resolved" data-mistake-id="${m.id}">
                          Mark Resolved
                        </button>
                      ` : `
                        <span class="resolved-badge">${icon('check', 14)} Mastered</span>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          ` : `
            <div class="empty-state-card">
              <p class="empty-text">No mistakes logged yet. When you hit a stumbling block in numericals or questions, log it here to automatically schedule a retry.</p>
              <button type="button" class="btn secondary btn-sm" data-action="open-new-mistake-modal">
                ${icon('plus', 14)} Log your first mistake note
              </button>
            </div>
          `}
        </section>

        <!-- Bloom Garden Card -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon('flower', 18)} Bloom Garden</h2>
              <p class="panel-subtitle">Calm reflection on your real focus. Never withers or penalizes missed days.</p>
            </div>
          </div>

          <div class="garden-stage-display glass-subcard">
            <div class="garden-plant-visual">
              <div class="botanical-bloom-icon" aria-hidden="true">🌸</div>
            </div>
            <div class="garden-status-text">
              <h3 class="plant-name">${garden.plantType} · Level ${garden.level}</h3>
              <p class="plant-quote">"True understanding grows with steady, calm steps."</p>
              <div class="growth-metric">
                <span>Growth Points: <strong>${garden.growthPoints}</strong> (earned through saved focus sessions)</span>
                <span>Blooms Achieved: <strong>${garden.bloomsEarned}</strong></span>
              </div>
            </div>
          </div>

          <p class="provenance-disclaimer">
            Garden progress is built on genuine focus sessions recorded by you. If you take a rest day, your garden calmly waits for your return.
          </p>
        </section>

        <!-- Practicals & Project Tracker -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon('clipboard-check', 18)} CBSE Practicals & Internal Assessment</h2>
              <p class="panel-subtitle">Official 30-mark (Science/PE) and 20-mark (Math/English) guidelines.</p>
            </div>
          </div>

          <div class="practicals-list">
            <div class="practical-row glass-subcard">
              <div>
                <strong>Physics (042) — 30 Marks Practical</strong>
                <p>Two experiments (one from each section: 7+7), practical record file (5), one activity from each section (3+3), viva voce (5).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Chemistry (043) — 30 Marks Practical</strong>
                <p>Volumetric analysis (8), Salt analysis (8), Content based experiment (6), Project work (4), Class record and viva (4).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Physical Education (048) — 30 Marks Practical</strong>
                <p>Physical fitness test (6), Proficiency in games/sports (7), Yogic practices (7), Record file (5), Viva voce (5).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>English Core (301) — 20 Marks Assessment</strong>
                <p>Listening test (5), Speaking skills presentation (5), Project file & viva (10).</p>
              </div>
            </div>

            <div class="practical-row glass-subcard">
              <div>
                <strong>Mathematics (041) — 20 Marks Internal Assessment</strong>
                <p>Periodic tests best 2 out of 3 (10), Mathematics activities record file & viva (10).</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Security, Privacy & App Settings -->
        <section class="tool-section-card liquid-glass-panel">
          <div class="panel-head">
            <div>
              <h2 class="panel-title">${icon('lock', 18)} Privacy & Vault Protection</h2>
              <p class="panel-subtitle">Aastha alone holds data access. Zero cloud surveillance.</p>
            </div>
          </div>

          <div class="settings-stack">
            <div class="setting-row">
              <div>
                <strong>Local Vault Encryption (AES-GCM 256-bit)</strong>
                <p>Optionally seal your private records with a passphrase so no one on this device can read them without it.</p>
              </div>
              <button type="button" class="btn secondary btn-sm" data-action="open-vault-modal">
                ${state.vaultPassphraseSet ? icon('unlock', 14) + ' Change Passphrase' : icon('lock', 14) + ' Enable Passphrase'}
              </button>
            </div>

            <div class="setting-row">
              <div>
                <strong>Encrypted JSON Data Backup</strong>
                <p>Download a complete, offline encrypted copy of your preparation profile and records.</p>
              </div>
              <button type="button" class="btn secondary btn-sm" data-action="export-vault-backup">
                Download Backup
              </button>
            </div>

            <div class="setting-row">
              <div>
                <strong>Reduced Motion</strong>
                <p>Minimize UI spring animations and transitions for calmer navigation.</p>
              </div>
              <input type="checkbox" class="toggle-switch" data-action="toggle-reduced-motion" ${state.reduceMotion ? 'checked' : ''}>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}
