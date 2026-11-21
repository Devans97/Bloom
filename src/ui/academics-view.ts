/**
 * BLOOM — Academics & Syllabus View
 * Full hierarchical explorer with CBSE official provenance.
 */

import type { AppState, SubjectId, ChapterStatus, Rating } from '../types.js';
import { icon } from './icons.js';
import { CBSE_SUBJECTS, CBSE_CHAPTERS, getSubject } from '../curriculum.js';
import { daysDifference, getIsoDate } from '../planner-engine.js';
import { computeAcademicProgress } from '../academic-engine.js';

export function renderAcademicsView(state: AppState, activeSubjectId: SubjectId = 'physics'): string {
  const todayStr = getIsoDate();
  const currentSubject = getSubject(activeSubjectId) || CBSE_SUBJECTS[0];
  const chapters = CBSE_CHAPTERS.filter(c => c.subjectId === currentSubject.id);
  const progress = computeAcademicProgress(state);
  const subStats = progress.subjectStats[currentSubject.id];

  const examDaysAway = daysDifference(todayStr, currentSubject.examDate);

  return `
    <div class="page-container academics-page">
      <header class="academics-header liquid-glass-panel">
        <div>
          <span class="eyebrow-text">OFFICIAL CBSE CLASS XII 2026-27</span>
          <h1 class="page-title">Academics & Syllabus</h1>
          <p class="page-subtitle">Track your learning status topic by topic. Unmarked means unknown until you set it.</p>
        </div>

        <!-- 5 Subject Tab Pills -->
        <nav class="subject-tabs-nav" aria-label="Subjects">
          ${CBSE_SUBJECTS.map(s => `
            <button type="button" class="subject-nav-pill ${s.id === currentSubject.id ? 'active' : ''}" data-action="switch-subject" data-subject-id="${s.id}">
              <span class="sub-pill-code">${s.code}</span>
              <span class="sub-pill-title">${s.title}</span>
            </button>
          `).join('')}
        </nav>
      </header>

      <!-- Subject Overview Card -->
      <section class="subject-meta-card liquid-glass-panel">
        <div class="sub-meta-top">
          <div>
            <span class="subject-tag subject-${currentSubject.id}">CBSE ${currentSubject.code} · ${currentSubject.title}</span>
            <h2 class="sub-headline">${currentSubject.title} Board Examination</h2>
            <p class="sub-exam-details">
              ${new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(currentSubject.examDate + 'T12:00:00Z'))} · ${currentSubject.examTime}
            </p>
          </div>
          <div class="sub-countdown-box glass-subcard">
            <strong class="countdown-days">${examDaysAway > 0 ? examDaysAway : 0}</strong>
            <span>days until board paper</span>
          </div>
        </div>

        <div class="sub-meta-details-row">
          <span><strong>Assessment Structure:</strong> ${currentSubject.theoryMarks} Theory + ${currentSubject.internalMarks} Practical / Internal</span>
          <span><strong>Learned:</strong> ${subStats.learned} of ${subStats.total} chapters (${subStats.percent}%)</span>
        </div>

        <div class="sub-official-note glass-subcard">
          <span class="note-icon">${icon('shield-check', 16)}</span>
          <p>${currentSubject.officialNote} <a href="${currentSubject.syllabusUrl}" target="_blank" rel="noopener" class="official-link">Official CBSE Syllabus PDF ${icon('external-link', 12)}</a></p>
        </div>
      </section>

      <!-- Chapters & Topics List -->
      <section class="chapters-accordion-section">
        <h3 class="section-title">Course Units & Chapters</h3>

        <div class="chapters-stack">
          ${chapters.map(chap => {
            const p = state.chapterProgress[chap.id];
            const status: ChapterStatus = p?.status || 'Not started';
            const rating: Rating | undefined = p?.rating;

            return `
              <article class="chapter-card liquid-glass-panel" data-chapter-id="${chap.id}">
                <div class="chapter-header-row">
                  <div class="chapter-info">
                    <span class="unit-group-pill">${chap.unitGroup}</span>
                    <h4 class="chapter-title">${chap.title}</h4>
                    <span class="ncert-text">${chap.ncertRef}</span>
                  </div>

                  <div class="chapter-status-controls">
                    <div class="select-wrapper">
                      <label class="sr-only" for="status-${chap.id}">Status for ${chap.title}</label>
                      <select id="status-${chap.id}" class="glass-select status-select" data-action="update-chapter-status" data-chapter-id="${chap.id}">
                        <option value="Not started" ${status === 'Not started' ? 'selected' : ''}>Not started</option>
                        <option value="Learning" ${status === 'Learning' ? 'selected' : ''}>Learning</option>
                        <option value="Learned" ${status === 'Learned' ? 'selected' : ''}>Learned</option>
                        <option value="Practising" ${status === 'Practising' ? 'selected' : ''}>Practising</option>
                        <option value="Needs revision" ${status === 'Needs revision' ? 'selected' : ''}>Needs revision</option>
                        <option value="Exam ready" ${status === 'Exam ready' ? 'selected' : ''}>Exam ready</option>
                      </select>
                    </div>

                    <div class="select-wrapper">
                      <label class="sr-only" for="rating-${chap.id}">Clarity for ${chap.title}</label>
                      <select id="rating-${chap.id}" class="glass-select rating-select" data-action="update-chapter-rating" data-chapter-id="${chap.id}">
                        <option value="" ${!rating ? 'selected' : ''}>No Rating</option>
                        <option value="Difficult" ${rating === 'Difficult' ? 'selected' : ''}>Difficult</option>
                        <option value="Okay" ${rating === 'Okay' ? 'selected' : ''}>Okay</option>
                        <option value="Easy" ${rating === 'Easy' ? 'selected' : ''}>Easy</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Topics list under this chapter -->
                <div class="topics-container">
                  <span class="topics-heading">Prescribed Topics & Learning Activities:</span>
                  <div class="topics-grid">
                    ${chap.topics.map(top => `
                      <div class="topic-subcard glass-subcard">
                        <div class="topic-header">
                          <h5 class="topic-title">${top.title}</h5>
                          <span class="topic-ref">${top.ncertRef}</span>
                        </div>

                        <ul class="core-concepts-pills">
                          ${top.coreConcepts.map(c => `<li>${c}</li>`).join('')}
                        </ul>

                        <div class="topic-actions-row">
                          <button type="button" class="btn quiet btn-sm" data-action="launch-topic-activity" data-chapter-id="${chap.id}" data-topic-id="${top.id}" data-mode="learning">
                            ${icon('book-open', 14)} Learn
                          </button>
                          <button type="button" class="btn quiet btn-sm" data-action="launch-topic-activity" data-chapter-id="${chap.id}" data-topic-id="${top.id}" data-mode="practice">
                            ${icon('clipboard-check', 14)} Practice Questions
                          </button>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      </section>
    </div>
  `;
}
