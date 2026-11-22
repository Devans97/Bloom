/**
 * CBSE Class XII Master Formula Handbook UI Studio
 * Subject: Physics (042), Chemistry (043), Mathematics (041)
 * Features: Instant symbol and name search, SI unit & dimensional formula inspection,
 * variable breakdowns, copy-to-clipboard, and chapter filtering.
 */

import { cbseFormulaHandbook, CBSEFormulaItem } from './data/cbse-formula-handbook.js';

export class FormulaHandbookUI {
  private container: HTMLElement;
  private selectedSubject: 'all' | 'physics' | 'chemistry' | 'math' = 'all';
  private searchQuery: string = '';

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(): void {
    const filtered = this.getFilteredFormulas();

    this.container.innerHTML = `
      <div class="formula-handbook-root" style="display: flex; flex-direction: column; gap: 24px; padding: 24px 24px 96px 24px; max-width: 1200px; margin: 0 auto; color: var(--color-ink, #1f2937); font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header -->
        <header style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 28px 32px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
            <div>
              <span style="display: inline-block; padding: 4px 12px; background: rgba(255, 255, 255, 0.15); border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">CBSE Board Master Formulae</span>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">Formula Handbook & Dimensional Vault</h1>
              <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.85; max-width: 680px; color: #e2e8f0;">Complete compendium of essential board formulas with authentic handwritten notes, SI units, dimensional representations, variable legends, and boundary conditions.</p>
            </div>

            <!-- Subject Filter Pills -->
            <div style="display: flex; gap: 8px; background: rgba(255, 255, 255, 0.1); padding: 6px; border-radius: 12px;">
              ${this.renderSubjectBtn('all', 'All Subjects')}
              ${this.renderSubjectBtn('physics', 'Physics')}
              ${this.renderSubjectBtn('chemistry', 'Chemistry')}
              ${this.renderSubjectBtn('math', 'Mathematics')}
            </div>
          </div>

          <!-- Search Bar -->
          <div style="margin-top: 20px;">
            <input id="formula-search-input" type="text" placeholder="Search by formula name, symbol (e.g. Nernst, Gauss, LCR, Lensmaker, Skew)..." value="${this.searchQuery}" style="width: 100%; box-sizing: border-box; padding: 12px 16px; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 10px; background: rgba(255, 255, 255, 0.1); color: #ffffff; font-size: 14px; outline: none; backdrop-filter: blur(8px);">
          </div>
        </header>

        <!-- Stats Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px;">
          <span>Showing <strong>${filtered.length}</strong> verified formulas</span>
          <span>100% Offline • 0 Lag Search</span>
        </div>

        <!-- Formulas Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 18px;">
          ${filtered.map(f => this.renderFormulaCard(f)).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  private renderSubjectBtn(sub: 'all' | 'physics' | 'chemistry' | 'math', label: string): string {
    const isSelected = this.selectedSubject === sub;
    return `
      <button class="f-sub-btn" data-sub="${sub}" style="padding: 8px 14px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${isSelected ? 'background: #ffffff; color: #0f172a;' : 'background: transparent; color: #ffffff;'}">
        ${label}
      </button>
    `;
  }

  private renderFormulaCard(f: CBSEFormulaItem): string {
    const subjectColor = f.subjectId === 'physics' ? '#3b82f6' : f.subjectId === 'chemistry' ? '#10b981' : '#8b5cf6';
    const subjectBg = f.subjectId === 'physics' ? '#eff6ff' : f.subjectId === 'chemistry' ? '#ecfdf5' : '#f5f3ff';

    return `
      <div class="formula-card" style="background: #fffdfc; border: 1px solid #f1ece5; border-left: 4px solid ${subjectColor}; border-radius: 14px; padding: 18px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s ease, box-shadow 0.15s ease;">
        <div>
          <!-- Top Tag Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 11px; font-weight: 700; background: ${subjectBg}; color: ${subjectColor}; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.04em;">
              ${f.subjectId} • ${f.chapterName}
            </span>
            <span style="font-size: 11px; font-weight: 700; background: ${f.boardFrequency === 'Guaranteed' ? '#fef3c7' : '#ecfdf5'}; color: ${f.boardFrequency === 'Guaranteed' ? '#92400e' : '#065f46'}; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              ${f.boardFrequency === 'Guaranteed' ? '★ ' : '● '}${f.boardFrequency}
            </span>
          </div>

          <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 800; color: #111827; letter-spacing: -0.01em;">${f.name}</h3>

          <!-- Authentic Handwritten Formula Plate -->
          <div class="handwritten-formula-plate" style="margin-bottom: 14px;">
            <div style="font-size: 10.5px; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
              <span>✍️ Board Formula · Handwritten Notes</span>
              <span style="height: 1px; flex: 1; background: rgba(245,158,11,0.25);"></span>
            </div>
            <div class="handwritten-formula-text" style="font-size: 26px; padding: 2px 0;">
              ${f.plainTextExpression}
            </div>
          </div>

          <!-- Handwritten Dimensions & SI Unit Badges -->
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 14px;">
            ${f.dimensionalFormula ? `
              <div class="handwritten-dimensions" style="display: inline-flex; align-items: center; gap: 6px; background: #fffbeb; border: 1.5px dashed #f59e0b; border-radius: 8px; padding: 4px 10px;">
                <span style="font-size: 10.5px; font-weight: 700; color: #92400e; text-transform: uppercase;">📐 Dimensions:</span>
                <span class="handwritten-math ink-royal-blue" style="font-size: 20px;">${f.dimensionalFormula}</span>
              </div>
            ` : ''}
            <div style="display: inline-flex; align-items: center; gap: 5px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 4px 10px; font-size: 11.5px; color: #166534; font-weight: 600;">
              <span>⚡ SI Unit:</span> <strong class="handwritten-math ink-topper-green" style="font-size: 18px;">${f.derivedSIUnit}</strong>
            </div>
          </div>

          <!-- Handwritten Revision Notes & Variables Legend -->
          <div class="notebook-ruled-paper" style="padding: 14px 16px; margin-bottom: 14px;">
            <div style="font-size: 11px; font-weight: 700; color: #854d0e; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span>📝 Handwritten Variable Index</span>
              <span style="height: 1px; flex: 1; background: rgba(234,179,8,0.3);"></span>
            </div>
            <ul style="margin: 0; padding-left: 20px; font-family: 'Caveat', 'Kalam', 'Patrick Hand', cursive, sans-serif; font-size: 20px; font-weight: 600; line-height: 1.55; color: #1e293b;">
              ${f.variablesLegend.map(v => `
                <li style="margin-bottom: 4px;">
                  <strong class="ink-royal-blue" style="font-weight: 700; font-size: 22px;">${v.symbol}</strong>
                  <span style="color: #334155;"> = ${v.meaning}</span>
                  <span class="ink-topper-green" style="font-size: 18px; font-weight: 700;"> (${v.siUnit})</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div>
          <!-- Boundary Condition in Red Note Ink -->
          <div style="font-family: 'Caveat', 'Kalam', 'Patrick Hand', cursive, sans-serif; font-size: 18px; font-weight: 600; color: #991b1b; background: #fef2f2; border-left: 3.5px solid #dc2626; border-radius: 0 8px 8px 0; padding: 8px 12px; margin-bottom: 12px; line-height: 1.4;">
            <span style="font-family: system-ui, sans-serif; font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-right: 4px;">⚠️ Boundary Condition:</span>
            ${f.conditionsAndLimitations}
          </div>

          <!-- Copy Button -->
          <button class="btn-copy-formula button outline" data-formula="${encodeURIComponent(f.plainTextExpression)}" style="width: 100%; justify-content: center; font-size: 12.5px; font-weight: 700; border-radius: 8px; padding: 8px; cursor: pointer; transition: all 0.15s ease;">
            📋 Copy Formula to Clipboard
          </button>
        </div>
      </div>
    `;
  }

  private getFilteredFormulas(): CBSEFormulaItem[] {
    return cbseFormulaHandbook.filter(f => {
      const matchSub = this.selectedSubject === 'all' || f.subjectId === this.selectedSubject;
      const q = this.searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        f.name.toLowerCase().includes(q) ||
        f.chapterName.toLowerCase().includes(q) ||
        f.plainTextExpression.toLowerCase().includes(q) ||
        f.variablesLegend.some(v => v.symbol.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q));

      return matchSub && matchQuery;
    });
  }

  private bindEvents(): void {
    this.container.querySelectorAll('.f-sub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = (e.currentTarget as HTMLElement).getAttribute('data-sub') as any;
        if (sub) {
          this.selectedSubject = sub;
          this.render();
        }
      });
    });

    const searchInput = this.container.querySelector('#formula-search-input') as HTMLInputElement;
    searchInput?.addEventListener('input', () => {
      this.searchQuery = searchInput.value;
      const filtered = this.getFilteredFormulas();
      const countEl = this.container.querySelector('header + div span strong');
      if (countEl) {
        countEl.textContent = filtered.length.toString();
      }
      const grid = this.container.querySelector('div[style*="grid-template-columns: repeat(auto-fill"]');
      if (grid) {
        grid.innerHTML = filtered.map(f => this.renderFormulaCard(f)).join('');
        this.bindCopyButtons();
      }
    });

    this.bindCopyButtons();
  }

  private bindCopyButtons(): void {
    this.container.querySelectorAll('.btn-copy-formula').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const el = e.currentTarget as HTMLElement;
        const formula = decodeURIComponent(el.getAttribute('data-formula') || '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(formula).then(() => {
            const originalText = el.textContent;
            el.textContent = '✓ Copied!';
            el.style.background = '#ecfdf5';
            el.style.color = '#065f46';
            setTimeout(() => {
              el.textContent = originalText;
              el.style.background = '#ffffff';
              el.style.color = '#374151';
            }, 1500);
          });
        }
      });
    });
  }
}
