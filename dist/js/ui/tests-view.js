/**
 * BLOOM — Tests View
 * Official 2027 Board Exam Date Sheet & School Test Tracking.
 */
import { icon } from './icons.js';
import { CBSE_SUBJECTS, getSubject } from '../curriculum.js';
import { daysDifference, getIsoDate } from '../planner-engine.js';
export function renderTestsView(state) {
    const todayStr = getIsoDate();
    const sortedSchoolTests = [...state.tests].sort((a, b) => a.day.localeCompare(b.day));
    return `
    <div class="page tests-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">DATES & COVERAGE</p>
          <h1>Tests</h1>
        </div>
        <button type="button" class="button outline" data-action="open-add-test-modal">
          ${icon('plus')} Add test
        </button>
      </div>

      <section class="import-banner" style="background:#f2e4e9; border: 1px solid var(--line); border-radius:14px; padding:24px 28px; margin-bottom:28px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <p class="eyebrow">YOUR SCHOOL PLANNER</p>
          <h2 style="font-size:24px; margin:4px 0;">Record your upcoming school tests</h2>
          <p style="color:var(--soft); font-size:13px;">Add your pre-board or unit test dates and chapters to prioritize study recommendations.</p>
        </div>
        <button type="button" class="button primary" data-action="open-add-test-modal">
          ${icon('plus')} Add school test
        </button>
      </section>

      <section style="margin-bottom: 36px;">
        <div class="section-head">
          <h2>School tests</h2>
          <span class="muted">${sortedSchoolTests.length} recorded</span>
        </div>

        <div class="rows">
          ${sortedSchoolTests.length > 0 ? sortedSchoolTests.map(test => {
        const daysAway = daysDifference(todayStr, test.day);
        const sub = getSubject(test.subjectId);
        return `
              <article class="test-row">
                <div class="row-main">
                  <span class="subject subject-${test.subjectId}">${sub?.title || test.subjectId}</span>
                  <strong>${test.title}</strong>
                  <small>${test.coverageChapterIds?.length || 0} confirmed chapters · ${daysAway >= 0 ? `${daysAway} days away` : 'Completed'}</small>
                </div>
                <span class="row-time">${test.day}</span>
                <button type="button" class="tool" data-action="delete-test" data-test-id="${test.id}" title="Delete test">
                  ${icon('trash')}
                </button>
              </article>
            `;
    }).join('') : `
            <div class="empty-line" style="padding: 24px; text-align: center; color: var(--soft);">
              No upcoming school tests added. Add one above to tailor your study plan.
            </div>
          `}
        </div>
      </section>

      <section class="board-list">
        <div class="section-head">
          <div>
            <h2>Official Board Examinations</h2>
            <p>CBSE Class XII · 2027 · 10:30 am–1:30 pm IST</p>
          </div>
          <a class="button outline" href="https://www.cbse.gov.in" target="_blank" rel="noreferrer">
            Official dates ${icon('arrow-up-right')}
          </a>
        </div>

        <div class="rows">
          ${CBSE_SUBJECTS.map(subject => {
        const daysAway = daysDifference(todayStr, subject.examDate);
        const dateStr = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(subject.examDate + 'T10:30:00Z'));
        return `
              <article class="test-row">
                <div class="row-main">
                  <strong>${subject.title}</strong>
                  <small>Subject Code: ${subject.code} · ${subject.theoryMarks} Theory + ${subject.internalMarks} Internal</small>
                </div>
                <div style="text-align: right;">
                  <span class="row-time" style="font-weight: 600; color: var(--ink);">${dateStr}</span>
                  <small style="display: block; color: var(--green); font-size: 11px;">${daysAway > 0 ? `${daysAway} days away` : 'Today'}</small>
                </div>
              </article>
            `;
    }).join('')}
        </div>
      </section>
    </div>
  `;
}
