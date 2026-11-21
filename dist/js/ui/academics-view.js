/**
 * BLOOM — Academics & Syllabus View
 * Authentic two-column layout matching Apple Liquid Glass & CBSE official syllabus provenance.
 */
import { icon } from './icons.js';
import { CBSE_SUBJECTS, CBSE_CHAPTERS, getSubject } from '../curriculum.js';
import { computeAcademicProgress, buildActionableActivity } from '../academic-engine.js';
export function renderAcademicsView(state, activeSubjectId = 'physics', selectedChapterId) {
    const currentSubject = getSubject(activeSubjectId) || CBSE_SUBJECTS[0];
    const chapters = CBSE_CHAPTERS.filter(c => c.subjectId === currentSubject.id);
    const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];
    const progress = computeAcademicProgress(state);
    const activeChapProgress = state.chapterProgress[activeChapter.id];
    const activeStatus = activeChapProgress?.status || 'Not started';
    return `
    <div class="page academics-page">
      <div class="section-head intro">
        <div>
          <p class="eyebrow">CBSE CLASS XII · 2026–27</p>
          <h1>Your academic world</h1>
          <p class="muted">Choose a chapter to see its verified scope and recorded learning.</p>
        </div>
      </div>

      <div class="subject-tabs" aria-label="Subjects">
        ${CBSE_SUBJECTS.map(s => `
          <button type="button" class="button outline" data-action="switch-subject" data-subject-id="${s.id}" aria-pressed="${currentSubject.id === s.id}">
            ${s.title}
          </button>
        `).join('')}
      </div>

      <div class="academic-two-column">
        <aside class="academic-chapters">
          <div class="section-head">
            <div>
              <h2>${currentSubject.title}</h2>
              <p class="muted">${chapters.length} syllabus chapters</p>
            </div>
          </div>
          ${chapters.map(c => {
        const p = state.chapterProgress[c.id];
        const isMarked = p && p.status !== 'Not started';
        return `
              <button type="button" class="academic-chapter ${c.id === activeChapter.id ? 'selected' : ''}" data-action="select-chapter" data-chapter-id="${c.id}">
                <strong>${c.title}</strong>
                <small>${c.unitGroup} · ${isMarked ? p.status : 'Unmarked'}</small>
              </button>
            `;
    }).join('')}
        </aside>

        <div class="academic-chapter-content">
          <section class="academic-hierarchy">
            <div class="section-head">
              <div>
                <p class="eyebrow">${activeChapter.unitGroup}</p>
                <h2>${activeChapter.title}</h2>
                <p class="muted">${activeChapter.ncertRef} · ${currentSubject.title}</p>
              </div>
              <span class="verification-badge" style="display:inline-flex; align-items:center; gap:6px; background:var(--sage); color:var(--green); border-radius:99px; padding:6px 12px; font-size:11px; font-weight:700;">
                ${icon('check')} CBSE 2026–27 verified
              </span>
            </div>

            <!-- Chapter Status Picker -->
            <div style="background:#fff8; border:1px solid var(--line); border-radius:14px; padding:18px 20px; margin: 16px 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div>
                <strong style="font-size:14px; display:block;">Your Chapter Status</strong>
                <small style="color:var(--soft);">Unmarked means unknown until you set it.</small>
              </div>
              <div style="display:flex; gap:10px; align-items:center;">
                <select class="status-select" data-action="update-chapter-status" data-chapter-id="${activeChapter.id}" style="min-height:38px; border-radius:8px; border:1px solid var(--line); padding:6px 12px; font-size:13px; background:var(--white);">
                  <option value="Not started" ${activeStatus === 'Not started' ? 'selected' : ''}>Not started</option>
                  <option value="Learning" ${activeStatus === 'Learning' ? 'selected' : ''}>Learning</option>
                  <option value="Learned" ${activeStatus === 'Learned' ? 'selected' : ''}>Learned</option>
                  <option value="Practising" ${activeStatus === 'Practising' ? 'selected' : ''}>Practising</option>
                  <option value="Needs revision" ${activeStatus === 'Needs revision' ? 'selected' : ''}>Needs revision</option>
                  <option value="Exam ready" ${activeStatus === 'Exam ready' ? 'selected' : ''}>Exam ready</option>
                </select>
                ${activeChapProgress?.rating ? `
                  <span class="status marked">${activeChapProgress.rating}</span>
                ` : ''}
              </div>
            </div>

            <p class="academic-note" style="color:var(--soft); font-size:12px; line-height:1.6; margin: 0 0 20px;">
              Topic titles and core concepts below come from the current Class XII ${currentSubject.title} syllabus.
            </p>

            <div class="topic-list">
              ${activeChapter.topics.map(topic => {
        const learnAct = buildActionableActivity(topic, activeChapter, 'learning');
        const practiceAct = buildActionableActivity(topic, activeChapter, 'practice');
        return `
                  <article class="topic-card" data-topic-id="${topic.id}">
                    <div class="topic-card-head">
                      <div>
                        <p class="eyebrow">VERIFIED TOPIC</p>
                        <h3 style="font-size: 18px; margin: 4px 0;">${topic.title}</h3>
                      </div>
                      <span class="status marked">${topic.ncertRef}</span>
                    </div>

                    <div style="margin: 10px 0; font-size: 13px; color: var(--soft); line-height: 1.6;">
                      <strong>Core Principles:</strong> ${topic.coreConcepts.join(' · ')}
                      ${topic.keyDerivations?.length ? `<br><strong>Key Derivations:</strong> ${topic.keyDerivations.join(', ')}` : ''}
                      ${topic.keyFormulas?.length ? `<br><strong>Key Formulas:</strong> ${topic.keyFormulas.join(', ')}` : ''}
                    </div>

                    <div class="next-activity-card" style="margin-top: 14px;">
                      <div>
                        <p class="eyebrow">NEXT ACTIVITY · CONCEPT LEARNING</p>
                        <h4>${learnAct.title}</h4>
                        <p>${learnAct.learningObjective}</p>
                        <small>${learnAct.expectedMinutes} min · Verified NCERT Activity</small>
                      </div>
                      <button type="button" class="button primary" data-action="launch-topic-activity" data-topic-id="${topic.id}" data-chapter-id="${activeChapter.id}" data-mode="learning">
                        ${icon('play')} Learn Concepts
                      </button>
                    </div>

                    <div class="next-activity-card" style="margin-top: 10px; background: linear-gradient(135deg, #eaf2eb9c, #fff9 75%); border-color: #49634f35;">
                      <div>
                        <p class="eyebrow" style="color: var(--green);">PRACTICE & NUMERICALS</p>
                        <h4>${practiceAct.title}</h4>
                        <p>${practiceAct.learningObjective}</p>
                        <small>${practiceAct.expectedMinutes} min · Board-Pattern Questions</small>
                      </div>
                      <button type="button" class="button outline" data-action="launch-topic-activity" data-topic-id="${topic.id}" data-chapter-id="${activeChapter.id}" data-mode="practice">
                        ${icon('play')} Practice Questions
                      </button>
                    </div>
                  </article>
                `;
    }).join('')}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}
