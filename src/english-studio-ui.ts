/**
 * Interactive CBSE Class XII English Core (Code 301) Studio UI
 * Provides Writing Format Builders with real-time word counters,
 * Flamingo & Vistas literary analysis, and Poetic Devices Reference Engine.
 */

import { cbseEnglishChapters, cbseWritingFormats, WritingFormatRubric, EnglishChapterAnalysis } from './data/cbse-english-literature-rubrics.js';
import { icon } from './icons.js';

export class EnglishStudioUI {
  private mount: HTMLElement;
  private activeTab: 'writing' | 'literature' | 'poetic-devices' = 'writing';
  private selectedFormatId: string = 'write-notice';
  private selectedChapterId: string = 'eng-fl-p01';
  private searchKeyword: string = '';
  private practiceText: string = '';

  constructor(mount: HTMLElement) {
    this.mount = mount;
  }

  public render(): void {
    this.mount.innerHTML = `
      <div class="english-studio-container" style="max-width: 1040px; margin: 0 auto; padding: 1.5rem 1rem;">
        <header class="studio-header" style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <span style="background: rgba(224, 76, 56, 0.12); color: #c2331f; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em;">CBSE XII · English Core 301</span>
            <span style="font-size: 0.85rem; color: var(--muted, #64748b);">Official 80-Mark Theory Reference</span>
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 0.5rem 0; color: var(--text, #0f172a);">English Literature & Writing Studio</h1>
          <p style="color: var(--muted, #64748b); font-size: 1rem; margin: 0;">Official CBSE marking rubrics, word-capped writing templates, character psychology, and poetic devices.</p>
        </header>

        <!-- Studio Navigation Tabs -->
        <nav class="studio-tabs" style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border, #e2e8f0); margin-bottom: 1.75rem;">
          <button class="studio-tab-btn ${this.activeTab === 'writing' ? 'active' : ''}" data-tab="writing" style="padding: 0.75rem 1.25rem; font-weight: 600; font-size: 0.95rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'writing' ? 'var(--primary, #0284c7)' : 'transparent'}; color: ${this.activeTab === 'writing' ? 'var(--primary, #0284c7)' : 'var(--muted, #64748b)'}; cursor: pointer;">
            ${icon('pencil')} Writing Section Rubrics
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'literature' ? 'active' : ''}" data-tab="literature" style="padding: 0.75rem 1.25rem; font-weight: 600; font-size: 0.95rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'literature' ? 'var(--primary, #0284c7)' : 'transparent'}; color: ${this.activeTab === 'literature' ? 'var(--primary, #0284c7)' : 'var(--muted, #64748b)'}; cursor: pointer;">
            ${icon('book-open')} Flamingo & Vistas Deep Dive
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'poetic-devices' ? 'active' : ''}" data-tab="poetic-devices" style="padding: 0.75rem 1.25rem; font-weight: 600; font-size: 0.95rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'poetic-devices' ? 'var(--primary, #0284c7)' : 'transparent'}; color: ${this.activeTab === 'poetic-devices' ? 'var(--primary, #0284c7)' : 'var(--muted, #64748b)'}; cursor: pointer;">
            ${icon('sparkles')} Poetic Devices Engine
          </button>
        </nav>

        <main id="english-studio-content">
          ${this.renderActiveTabContent()}
        </main>
      </div>
    `;

    this.bindEvents();
  }

  private renderActiveTabContent(): string {
    if (this.activeTab === 'writing') return this.renderWritingTab();
    if (this.activeTab === 'literature') return this.renderLiteratureTab();
    if (this.activeTab === 'poetic-devices') return this.renderPoeticDevicesTab();
    return '';
  }

  private renderWritingTab(): string {
    const currentFormat = cbseWritingFormats.find(f => f.id === this.selectedFormatId) || cbseWritingFormats[0];
    const wordsCount = this.practiceText.trim() ? this.practiceText.trim().split(/\s+/).length : 0;
    const isExceeded = currentFormat.wordLimit === '50 words' ? wordsCount > 50 : wordsCount > 150;

    return `
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left sidebar format selector -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1rem;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted, #64748b); margin: 0 0 0.75rem 0;">Writing Skills (CBSE 20 Marks)</h3>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${cbseWritingFormats.map(fmt => `
              <button class="format-select-btn ${fmt.id === this.selectedFormatId ? 'selected' : ''}" data-format-id="${fmt.id}" style="text-align: left; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid ${fmt.id === this.selectedFormatId ? 'var(--primary, #0284c7)' : 'transparent'}; background: ${fmt.id === this.selectedFormatId ? 'rgba(2, 132, 199, 0.08)' : 'transparent'}; color: ${fmt.id === this.selectedFormatId ? 'var(--primary, #0284c7)' : 'var(--text, #1e293b)'}; font-weight: ${fmt.id === this.selectedFormatId ? '700' : '500'}; font-size: 0.9rem; cursor: pointer;">
                <div>${fmt.title}</div>
                <small style="font-size: 0.75rem; color: var(--muted, #64748b);">${fmt.marks} Marks · ${fmt.wordLimit}</small>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Right main panel -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div>
              <h2 style="font-size: 1.35rem; font-weight: 800; margin: 0 0 0.25rem 0;">${currentFormat.title}</h2>
              <span style="font-size: 0.85rem; background: var(--surface-alt, #f1f5f9); padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 600; color: var(--text, #334155);">${currentFormat.wordLimit}</span>
              <span style="font-size: 0.85rem; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 600; margin-left: 0.5rem;">${currentFormat.marks} Marks Weightage</span>
            </div>
            <button id="copy-template-btn" style="display: flex; align-items: center; gap: 0.4rem; padding: 0.5rem 0.85rem; background: var(--surface-alt, #f8fafc); border: 1px solid var(--border, #cbd5e1); border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer;">
              ${icon('copy')} Copy Template
            </button>
          </div>

          <!-- Official CBSE Marking Scheme Breakdown -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">Official CBSE Marking Rubric</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
              ${currentFormat.markingBreakdown.map(b => `
                <div style="background: var(--surface-alt, #f8fafc); border-left: 3px solid var(--primary, #0284c7); border-radius: 0 8px 8px 0; padding: 0.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                    <strong style="font-size: 0.85rem;">${b.category}</strong>
                    <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary, #0284c7);">${b.marks} Mark${b.marks > 1 ? 's' : ''}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--muted, #475569); margin: 0; line-height: 1.35;">${b.criteria}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Official Template Box -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">✍️ Official CBSE Board Exam Format Skeleton (Ruled Sheet)</h4>
            <div class="notebook-ruled-paper" style="padding: 16px 20px; border-left: 3.5px solid #2563eb;">
              <pre style="background: transparent; color: #0f172a; padding: 0; margin: 0; font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; font-weight: 600; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${this.escapeHtml(currentFormat.officialTemplate)}</pre>
            </div>
          </div>

          <!-- Interactive Practice Box with Real-time Word Counter -->
          <div style="margin-bottom: 1.5rem; background: var(--surface-alt, #f8fafc); border: 1px solid var(--border, #cbd5e1); border-radius: 8px; padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <label for="practice-input" style="font-size: 0.85rem; font-weight: 700;">Draft & Practice Mode</label>
              <div style="font-size: 0.85rem; font-weight: 700; color: ${isExceeded ? '#dc2626' : '#16a34a'};">
                ${wordsCount} Words ${isExceeded ? '⚠️ Exceeds limit!' : '✓ Within limit'}
              </div>
            </div>
            <textarea id="practice-input" placeholder="Type or paste your answer here to monitor word count and formatting..." style="width: 100%; min-height: 140px; padding: 0.75rem; border-radius: 6px; border: 1px solid var(--border, #cbd5e1); font-family: inherit; font-size: 0.9rem; resize: vertical; box-sizing: border-box;">${this.escapeHtml(this.practiceText)}</textarea>
          </div>

          <!-- High-Scoring Model Answer -->
          <details style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem 1rem;">
            <summary style="font-weight: 700; color: #166534; cursor: pointer; font-size: 0.9rem;">
              Inspect Exemplary Model Answer (${currentFormat.modelAnswer.wordCount} words)
            </summary>
            <div style="margin-top: 0.75rem; font-size: 0.85rem; color: #1e293b;">
              <p style="font-weight: 600; color: #14532d; margin-bottom: 0.5rem;">Q: ${this.escapeHtml(currentFormat.modelAnswer.question)}</p>
              <div class="notebook-ruled-paper" style="padding: 16px 20px; border-left: 3.5px solid #059669; margin-top: 8px;">
                <pre style="background: transparent; color: #1e3a8a; padding: 0; margin: 0; font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; font-weight: 600; white-space: pre-wrap; line-height: 1.6;">${this.escapeHtml(currentFormat.modelAnswer.content)}</pre>
              </div>
              <div style="margin-top: 0.5rem;">
                <strong style="font-size: 0.8rem; color: #166534;">Examiner's Remarks:</strong>
                <ul style="margin: 0.25rem 0 0 1.25rem; font-size: 0.8rem; color: #15803d;">
                  ${currentFormat.modelAnswer.examinerNotes.map(n => `<li>${n}</li>`).join('')}
                </ul>
              </div>
            </div>
          </details>
        </section>
      </div>
    `;
  }

  private renderLiteratureTab(): string {
    const chapter = cbseEnglishChapters.find(c => c.id === this.selectedChapterId) || cbseEnglishChapters[0];

    return `
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left chapters list -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1rem; max-height: 750px; overflow-y: auto;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted, #64748b); margin: 0 0 0.75rem 0;">Prescribed Literature</h3>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${cbseEnglishChapters.map(ch => `
              <button class="chapter-select-btn ${ch.id === this.selectedChapterId ? 'selected' : ''}" data-chapter-id="${ch.id}" style="text-align: left; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid ${ch.id === this.selectedChapterId ? 'var(--primary, #0284c7)' : 'transparent'}; background: ${ch.id === this.selectedChapterId ? 'rgba(2, 132, 199, 0.08)' : 'transparent'}; color: ${ch.id === this.selectedChapterId ? 'var(--primary, #0284c7)' : 'var(--text, #1e293b)'}; font-weight: ${ch.id === this.selectedChapterId ? '700' : '500'}; font-size: 0.88rem; cursor: pointer;">
                <div>${ch.title}</div>
                <small style="font-size: 0.75rem; color: var(--muted, #64748b);">${ch.book} · ${ch.authorOrPoet}</small>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Right chapter details -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.3rem;">
              <span style="font-size: 0.75rem; background: var(--surface-alt, #f1f5f9); padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 700; color: var(--muted, #475569);">${chapter.book}</span>
              <span style="font-size: 0.75rem; color: var(--muted, #64748b);">Chapter ${chapter.chapterNumber}</span>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; margin: 0 0 0.25rem 0;">${chapter.title}</h2>
            <p style="font-size: 0.95rem; color: var(--primary, #0284c7); font-weight: 600; margin: 0;">By ${chapter.authorOrPoet}</p>
          </div>

          <!-- Central Theme & Core Philosophy -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
              <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.4rem 0;">Central Theme</h4>
              <p style="font-size: 0.88rem; color: #1e293b; margin: 0; line-height: 1.4;">${chapter.centralTheme}</p>
            </div>
            <div style="background: #fdf4ff; border: 1px solid #f0abfc; border-radius: 8px; padding: 1rem;">
              <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #86198f; margin: 0 0 0.4rem 0;">Core Philosophy</h4>
              <p style="font-size: 0.88rem; color: #701a75; margin: 0; line-height: 1.4;">${chapter.corePhilosophy}</p>
            </div>
          </div>

          <!-- Comprehensive Summary Bullet Points -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">Key Plot & Narrative Milestones</h4>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.88rem; color: #334155; line-height: 1.55;">
              ${chapter.summaryPoints.map(pt => `<li style="margin-bottom: 0.4rem;">${pt}</li>`).join('')}
            </ul>
          </div>

          <!-- Character Sketches -->
          ${chapter.characters.length > 0 ? `
            <div style="margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">Character Psychology & CBSE Significance</h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${chapter.characters.map(c => `
                  <div style="background: #f8fafc; border-left: 3px solid #3b82f6; border-radius: 0 8px 8px 0; padding: 0.85rem 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
                      <strong style="font-size: 0.95rem; color: #1e293b;">${c.name}</strong>
                      <span style="font-size: 0.75rem; color: #64748b;">${c.role}</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.4rem;">
                      ${c.traits.map(t => `<span style="background: #e2e8f0; font-size: 0.72rem; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 600;">${t}</span>`).join('')}
                    </div>
                    <p style="font-size: 0.82rem; color: #475569; margin: 0 0 0.4rem 0;"><strong>Dilemma:</strong> ${c.psychologicalDilemma}</p>
                    <div style="font-size: 0.82rem; color: #0369a1; font-style: italic;">${c.keyQuotes.join(' ')}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Frequent Board Exam Questions -->
          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">High-Yield Board Questions & Answer Keys</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${chapter.frequentBoardQuestions.map(q => `
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.85rem;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
                    <span style="font-size: 0.88rem; font-weight: 700; color: #166534;">${q.question}</span>
                    <span style="font-size: 0.75rem; font-weight: 700; background: #dcfce7; color: #15803d; padding: 0.2rem 0.4rem; border-radius: 4px;">${q.marks} Marks</span>
                  </div>
                  <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.82rem; color: #166534; line-height: 1.45;">
                    ${q.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </div>
    `;
  }

  private renderPoeticDevicesTab(): string {
    const allDevices = cbseEnglishChapters.flatMap(c => c.poeticDevices || []);

    return `
      <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 0.25rem 0;">Master Poetic Devices Solver</h2>
          <p style="font-size: 0.9rem; color: var(--muted, #64748b); margin: 0;">Extracted line-by-line from Class 12 Flamingo poetry with official CBSE marking significance.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          ${allDevices.map(d => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
                <span style="font-size: 0.75rem; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 0.2rem 0.5rem; border-radius: 4px;">${d.device}</span>
                <span style="font-size: 0.75rem; color: #64748b;">${d.poem}</span>
              </div>
              <blockquote style="margin: 0.5rem 0; font-family: Georgia, serif; font-size: 0.95rem; color: #0f172a; border-left: 3px solid #6366f1; padding-left: 0.75rem;">
                "${d.line}"
              </blockquote>
              <p style="font-size: 0.82rem; color: #334155; margin: 0.5rem 0 0.3rem 0; line-height: 1.4;">${d.explanation}</p>
              <div style="font-size: 0.78rem; color: #166534; background: #f0fdf4; padding: 0.3rem 0.5rem; border-radius: 4px; margin-top: 0.4rem;">
                <strong>Examiner Key:</strong> ${d.markingSignificance}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  private bindEvents(): void {
    // Tab switching
    this.mount.querySelectorAll<HTMLButtonElement>('.studio-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab as 'writing' | 'literature' | 'poetic-devices';
        if (tab) {
          this.activeTab = tab;
          this.render();
        }
      });
    });

    // Format selection
    this.mount.querySelectorAll<HTMLButtonElement>('.format-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.formatId;
        if (id) {
          this.selectedFormatId = id;
          this.practiceText = '';
          this.render();
        }
      });
    });

    // Chapter selection
    this.mount.querySelectorAll<HTMLButtonElement>('.chapter-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.chapterId;
        if (id) {
          this.selectedChapterId = id;
          this.render();
        }
      });
    });

    // Copy template button
    const copyBtn = this.mount.querySelector<HTMLButtonElement>('#copy-template-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const currentFormat = cbseWritingFormats.find(f => f.id === this.selectedFormatId);
        if (currentFormat && navigator.clipboard) {
          await navigator.clipboard.writeText(currentFormat.officialTemplate);
          copyBtn.innerHTML = `${icon('check')} Copied!`;
          setTimeout(() => {
            copyBtn.innerHTML = `${icon('copy')} Copy Template`;
          }, 2000);
        }
      });
    }

    // Real-time word counter input
    const textarea = this.mount.querySelector<HTMLTextAreaElement>('#practice-input');
    if (textarea) {
      textarea.addEventListener('input', () => {
        this.practiceText = textarea.value;
        const currentFormat = cbseWritingFormats.find(f => f.id === this.selectedFormatId) || cbseWritingFormats[0];
        const words = this.practiceText.trim() ? this.practiceText.trim().split(/\s+/).length : 0;
        const isExceeded = currentFormat.wordLimit === '50 words' ? words > 50 : words > 150;
        const counterEl = this.mount.querySelector<HTMLElement>('#english-studio-content div div div div[style*="font-weight: 700"]');
        if (counterEl) {
          counterEl.textContent = `${words} Words ${isExceeded ? '⚠️ Exceeds limit!' : '✓ Within limit'}`;
          counterEl.style.color = isExceeded ? '#dc2626' : '#16a34a';
        }
      });
    }
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
