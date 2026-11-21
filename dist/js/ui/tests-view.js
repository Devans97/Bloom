/**
 * BLOOM — Tests & Test Analysis View
 * Verified Board Examination schedule and School Test tracking.
 */
import { icon } from './icons.js';
import { CBSE_SUBJECTS, getSubject, getChapter } from '../curriculum.js';
import { daysDifference, getIsoDate } from '../planner-engine.js';
export function renderTestsView(state) {
    const todayStr = getIsoDate();
    const schoolTests = state.tests;
    return `
    <div class="page-container tests-page">
      <header class="tests-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">DATES & TEST READINESS</span>
          <h1 class="page-title">Tests & Examinations</h1>
          <p class="page-subtitle">Confirmed official board dates and your personal school test schedule.</p>
        </div>
        <button type="button" class="btn primary" data-action="open-add-test-modal">
          ${icon('plus', 16)} Add School Test
        </button>
      </header>

      <!-- Official Board Examination Date Sheet -->
      <section class="board-dates-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">${icon('shield-check', 18)} Verified 2027 Main Board Date Sheet</h2>
            <p class="panel-subtitle">Official CBSE Date Sheet Circular (06 November 2026) · 10:30 AM – 1:30 PM IST</p>
          </div>
        </div>

        <div class="board-dates-table-wrapper">
          <table class="glass-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Official Date</th>
                <th>Countdown</th>
                <th>Structure</th>
              </tr>
            </thead>
            <tbody>
              ${CBSE_SUBJECTS.map(s => {
        const diff = daysDifference(todayStr, s.examDate);
        return `
                  <tr>
                    <td><strong>${s.title}</strong></td>
                    <td><code>${s.code}</code></td>
                    <td>${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(s.examDate + 'T12:00:00Z'))}</td>
                    <td><span class="badge ${diff <= 30 ? 'badge-urgent' : 'badge-normal'}">${diff > 0 ? `${diff} days` : diff === 0 ? 'Today' : 'Completed'}</span></td>
                    <td>${s.theoryMarks} Th + ${s.internalMarks} Pr/IA</td>
                  </tr>
                `;
    }).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- School Tests Section -->
      <section class="school-tests-section liquid-glass-panel">
        <div class="panel-head">
          <div>
            <h2 class="panel-title">Your Confirmed School Tests (${schoolTests.length})</h2>
            <p class="panel-subtitle">Entered manually or confirmed from school planner. BLOOM never invents test coverage.</p>
          </div>
        </div>

        ${schoolTests.length ? `
          <div class="school-tests-grid">
            ${schoolTests.map(test => {
        const sub = getSubject(test.subjectId);
        const daysLeft = daysDifference(todayStr, test.day);
        const coverageChapters = test.coverageChapterIds.map(id => getChapter(id)?.title).filter(Boolean);
        return `
                <div class="test-card liquid-glass-subcard">
                  <div class="test-card-top">
                    <span class="subject-tag subject-${test.subjectId}">${sub?.title || test.subjectId}</span>
                    <span class="test-date-badge">${test.day} (${daysLeft >= 0 ? `${daysLeft}d away` : 'Past'})</span>
                  </div>

                  <h3 class="test-name">${test.title}</h3>

                  <div class="test-coverage-info">
                    <strong>Included Syllabus (${coverageChapters.length} chapters):</strong>
                    <p class="coverage-list">${coverageChapters.join(', ') || 'General syllabus'}</p>
                  </div>

                  ${test.scoredMarks !== undefined ? `
                    <div class="score-display-box glass-subcard">
                      <span>Recorded Score:</span>
                      <strong>${test.scoredMarks} / ${test.maxMarks}</strong>
                      <small>(${Math.round((test.scoredMarks / test.maxMarks) * 100)}%)</small>
                    </div>
                  ` : `
                    <button type="button" class="btn secondary btn-sm" data-action="open-enter-score-modal" data-test-id="${test.id}">
                      ${icon('edit', 14)} Enter Test Score
                    </button>
                  `}
                </div>
              `;
    }).join('')}
          </div>
        ` : `
          <div class="empty-state-card">
            <p class="empty-text">No upcoming school tests added yet.</p>
            <button type="button" class="btn secondary" data-action="open-add-test-modal">
              ${icon('plus', 16)} Add your next school test
            </button>
          </div>
        `}
      </section>
    </div>
  `;
}
