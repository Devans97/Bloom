/**
 * Global Command Palette & Omnisearch Engine (Cmd + K / Ctrl + K)
 * Instant index across all 61 CBSE chapters, 20 derivations, 10 math proofs,
 * 29 named organic reactions, 40+ formulas, writing templates, and studios.
 */
import { chapters } from './curriculum.js';
import { cbsePhysicsDerivations } from './data/cbse-derivations.js';
import { cbseMathTheorems } from './data/cbse-math-theorems.js';
import { cbseNamedReactions } from './data/cbse-organic-reactions.js';
import { cbseFormulaHandbook } from './data/cbse-formula-handbook.js';
import { cbseEnglishChapters, cbseWritingFormats } from './data/cbse-english-literature-rubrics.js';
import { cbsePosturalDeformities, cbseBiomechanicsTopics } from './data/cbse-pe-mastery.js';
import { icon } from './icons.js';
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export class CommandPalette {
    static instance = null;
    container = null;
    items = [];
    filteredItems = [];
    selectedIndex = 0;
    navigateCallback;
    canOpenCallback = () => true;
    constructor(navigateCallback, canOpenCallback) {
        this.navigateCallback = navigateCallback;
        if (canOpenCallback)
            this.canOpenCallback = canOpenCallback;
        this.buildIndex();
        this.setupDOM();
        this.bindGlobalShortcuts();
    }
    static init(navigateCallback, canOpenCallback) {
        if (!CommandPalette.instance) {
            CommandPalette.instance = new CommandPalette(navigateCallback, canOpenCallback);
        }
        else if (canOpenCallback) {
            CommandPalette.instance.canOpenCallback = canOpenCallback;
        }
        return CommandPalette.instance;
    }
    buildIndex() {
        const list = [];
        // 1. Studios & Core Tools
        const studios = [
            { id: 'der-lab', title: 'Derivation & Theorem Lab', sub: 'Master 20 Physics derivations & 10 Math proofs with step marking', route: 'derivations', badge: 'Studio', kw: ['physics', 'math', 'proofs', 'derivations'] },
            { id: 'org-hub', title: 'Organic Synthesis & Distinction Hub', sub: '29 named reactions and one-step chemical tests', route: 'roadmaps', badge: 'Studio', kw: ['chemistry', 'reactions', 'distinction', 'reagents'] },
            { id: 'mock-sim', title: 'Mock Exam Simulator', sub: '3-hour timed board exam with section palette & marking schemes', route: 'mock-exam', badge: 'Studio', kw: ['exam', 'test', 'blueprint', 'timed', 'timer'] },
            { id: 'form-hb', title: 'Master Formula Handbook', sub: 'SI units, dimensional formulas, and rapid equation search', route: 'formulas', badge: 'Studio', kw: ['formulas', 'equations', 'si units', 'dimensions'] },
            { id: 'sound-gen', title: 'Cognitive Focus Soundscape', sub: '10Hz Alpha and 40Hz Gamma binaural beats sound generator', route: 'soundscape', badge: 'Studio', kw: ['audio', 'binaural', 'sound', 'noise', 'focus'] },
            { id: 'eng-hub', title: 'English Literature & Writing Studio', sub: 'Flamingo, Vistas, poetic devices, and word-capped writing rubrics', route: 'english-studio', badge: 'Studio', kw: ['english', 'notice', 'letter', 'job application', 'literature'] },
            { id: 'pe-hub', title: 'PE Fixture & Sports Science Studio', sub: 'Knockout tournament calculator, byes, deformities, and yoga', route: 'pe-studio', badge: 'Studio', kw: ['pe', 'tournament', 'fixture', 'byes', 'sports', 'yoga'] },
            { id: 'prac-lab', title: 'Lab Practicals & Viva Manual', sub: 'Qualitative salt analysis, redox titrations & Viva-voce flashcards', route: 'practicals', badge: 'Studio', kw: ['practicals', 'viva', 'experiments', 'salt analysis', 'titration'] }
        ];
        for (const s of studios) {
            list.push({
                id: s.id,
                category: 'Studio',
                title: s.title,
                subtitle: s.sub,
                badge: s.badge,
                route: s.route,
                keywords: s.kw
            });
        }
        // 2. Physics Derivations
        for (const d of cbsePhysicsDerivations) {
            list.push({
                id: d.id,
                category: 'Derivation',
                title: d.title,
                subtitle: `${d.chapterId} · ${d.finalFormula} · ${d.marksWeightage} Marks`,
                badge: 'Physics',
                route: 'derivations',
                keywords: [d.title, d.chapterId, d.finalFormula, 'derivation', 'physics']
            });
        }
        // 3. Math Theorems
        for (const t of cbseMathTheorems) {
            list.push({
                id: t.id,
                category: 'Math Theorem',
                title: t.title,
                subtitle: `${t.chapterId} · ${t.theoremStatement.slice(0, 75)}... · ${t.marksWeightage} Marks`,
                badge: 'Math',
                route: 'derivations',
                keywords: [t.title, t.chapterId, 'math', 'theorem', 'proof']
            });
        }
        // 4. Organic Reactions & Distinctions
        for (const r of cbseNamedReactions) {
            list.push({
                id: r.id,
                category: 'Organic Reaction',
                title: r.name,
                subtitle: `${r.reagents} ⟶ ${r.products.join(', ')}`,
                badge: 'Chemistry',
                route: 'roadmaps',
                keywords: [r.name, r.reagents, ...r.products, 'reaction', 'organic', 'chemistry']
            });
            if (r.distinctionRole) {
                list.push({
                    id: `${r.id}-distinction`,
                    category: 'Organic Reaction',
                    title: `Distinction Test: ${r.name}`,
                    subtitle: r.distinctionRole,
                    badge: 'Distinction',
                    route: 'roadmaps',
                    keywords: [r.name, 'distinction', 'test', r.distinctionRole]
                });
            }
        }
        // 5. Formulas
        for (const f of cbseFormulaHandbook) {
            list.push({
                id: f.id,
                category: 'Formula',
                title: `${f.plainTextExpression}: ${f.name}`,
                subtitle: `${f.chapterName} · SI Unit: ${f.derivedSIUnit} · ${f.dimensionalFormula ?? ''}`,
                badge: f.subjectId.toUpperCase(),
                route: 'formulas',
                keywords: [f.name, f.plainTextExpression, f.chapterName, f.derivedSIUnit, 'formula', f.subjectId]
            });
        }
        // 6. English Writing Formats & Chapters
        for (const wf of cbseWritingFormats) {
            list.push({
                id: wf.id,
                category: 'Writing Format',
                title: wf.title,
                subtitle: `${wf.wordLimit} · ${wf.marks} Marks · Official CBSE Rubric`,
                badge: 'English',
                route: 'english-studio',
                keywords: [wf.title, wf.wordLimit, 'writing', 'format', 'english']
            });
        }
        for (const ech of cbseEnglishChapters) {
            list.push({
                id: ech.id,
                category: 'Chapter',
                title: ech.title,
                subtitle: `${ech.book} · By ${ech.authorOrPoet} · ${ech.centralTheme.slice(0, 60)}...`,
                badge: 'English',
                route: 'english-studio',
                keywords: [ech.title, ech.authorOrPoet, ech.book, 'english', 'literature']
            });
        }
        // 7. PE Topics
        for (const def of cbsePosturalDeformities) {
            list.push({
                id: def.id,
                category: 'PE Science',
                title: def.name,
                subtitle: `Region: ${def.affectedRegion} · Asanas: ${def.recommendedAsanas.join(', ')}`,
                badge: 'PE',
                route: 'pe-studio',
                keywords: [def.name, def.affectedRegion, 'posture', 'deformity', 'pe']
            });
        }
        for (const bio of cbseBiomechanicsTopics) {
            list.push({
                id: bio.id,
                category: 'PE Science',
                title: bio.title,
                subtitle: bio.physicalPrinciple.slice(0, 80) + '...',
                badge: 'PE',
                route: 'pe-studio',
                keywords: [bio.title, 'biomechanics', 'newton', 'levers', 'pe']
            });
        }
        // 8. All 61 CBSE Syllabus Chapters
        for (const c of chapters) {
            list.push({
                id: c.id,
                category: 'Chapter',
                title: c.title,
                subtitle: `${c.subject.toUpperCase()} · ${c.allocation}`,
                badge: c.subject.toUpperCase(),
                route: 'syllabus',
                keywords: [c.title, c.subject, c.allocation, 'chapter', 'syllabus']
            });
        }
        this.items = list;
        this.filteredItems = list.slice(0, 8);
    }
    setupDOM() {
        const dialog = document.createElement('dialog');
        dialog.id = 'bloom-command-palette-dialog';
        dialog.style.cssText = `
      position: fixed;
      top: 15%;
      left: 50%;
      transform: translateX(-50%);
      width: min(640px, 92vw);
      max-height: 520px;
      padding: 0;
      border: 1px solid var(--border, #cbd5e1);
      border-radius: 16px;
      background: var(--surface, #ffffff);
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05);
      color: var(--text, #0f172a);
      overflow: hidden;
      z-index: 10000;
    `;
        dialog.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border, #e2e8f0); background: var(--surface, #ffffff);">
        <span style="color: var(--primary, #0284c7); display: flex;">${icon('search')}</span>
        <input id="palette-search-input" type="text" placeholder="Search derivations, formulas, reactions, chapters, English, PE... (Esc to close)" autocomplete="off" style="width: 100%; border: none; outline: none; background: transparent; font-size: 1.05rem; font-weight: 500; color: inherit; font-family: inherit;">
        <span style="font-size: 0.75rem; font-weight: 700; background: var(--surface-alt, #f1f5f9); border: 1px solid var(--border, #e2e8f0); color: var(--muted, #64748b); padding: 0.2rem 0.5rem; border-radius: 6px;">ESC</span>
      </div>
      <div id="palette-results-list" style="max-height: 400px; overflow-y: auto; padding: 0.5rem;"></div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 1.25rem; background: var(--surface-alt, #f8fafc); border-top: 1px solid var(--border, #e2e8f0); font-size: 0.75rem; color: var(--muted, #64748b);">
        <span>↑↓ Navigate · ↵ Select · Esc Close</span>
        <span style="font-weight: 600;">BLOOM Omnisearch</span>
      </div>
    `;
        document.body.appendChild(dialog);
        this.container = dialog;
        const input = dialog.querySelector('#palette-search-input');
        input.addEventListener('input', () => this.handleSearch(input.value));
        input.addEventListener('keydown', (e) => this.handleKeydown(e));
        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog)
                this.close();
        });
    }
    bindGlobalShortcuts() {
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                if (!this.canOpenCallback())
                    return;
                e.preventDefault();
                this.open();
            }
        });
    }
    open() {
        if (!this.canOpenCallback())
            return;
        if (!this.container)
            return;
        this.selectedIndex = 0;
        this.filteredItems = this.items.slice(0, 10);
        this.renderResults();
        if (!this.container.open) {
            this.container.showModal();
        }
        const input = this.container.querySelector('#palette-search-input');
        input.value = '';
        setTimeout(() => input.focus(), 50);
    }
    close() {
        if (this.container && this.container.open) {
            this.container.close();
        }
    }
    handleSearch(query) {
        const q = query.trim().toLowerCase();
        this.selectedIndex = 0;
        if (!q) {
            this.filteredItems = this.items.slice(0, 10);
        }
        else {
            this.filteredItems = this.items
                .filter(item => {
                return item.title.toLowerCase().includes(q) ||
                    item.subtitle.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.keywords.some(k => k.toLowerCase().includes(q));
            })
                .slice(0, 15);
        }
        this.renderResults();
    }
    renderResults() {
        if (!this.container)
            return;
        const listEl = this.container.querySelector('#palette-results-list');
        if (this.filteredItems.length === 0) {
            listEl.innerHTML = `
        <div style="padding: 2rem 1rem; text-align: center; color: var(--muted, #64748b);">
          <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.25rem;">No matches found</p>
          <small>Try searching for a concept, formula, author, or reaction (e.g. "Lensmaker", "Aldol", "Byes", "Indigo")</small>
        </div>
      `;
            return;
        }
        listEl.innerHTML = this.filteredItems.map((item, idx) => `
      <div class="palette-item ${idx === this.selectedIndex ? 'selected' : ''}" data-index="${idx}" style="display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.65rem 0.85rem; border-radius: 8px; cursor: pointer; background: ${idx === this.selectedIndex ? 'var(--surface-alt, #f1f5f9)' : 'transparent'}; border: 1px solid ${idx === this.selectedIndex ? 'var(--border, #cbd5e1)' : 'transparent'};">
        <div style="min-width: 0; flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.15rem;">
            <span style="font-size: 0.7rem; font-weight: 700; background: rgba(2, 132, 199, 0.1); color: #0284c7; padding: 0.15rem 0.4rem; border-radius: 4px;">${esc(item.category)}</span>
            <strong style="font-size: 0.88rem; color: var(--text, #0f172a); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(item.title)}</strong>
          </div>
          <p style="font-size: 0.78rem; color: var(--muted, #64748b); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(item.subtitle)}</p>
        </div>
        <span style="font-size: 0.72rem; font-weight: 600; color: var(--muted, #64748b); background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); padding: 0.2rem 0.45rem; border-radius: 4px; flex-shrink: 0;">${esc(item.badge)}</span>
      </div>
    `).join('');
        listEl.querySelectorAll('.palette-item').forEach(el => {
            el.addEventListener('click', () => {
                const idx = Number(el.dataset.index);
                this.selectItem(idx);
            });
            el.addEventListener('mouseenter', () => {
                this.selectedIndex = Number(el.dataset.index);
                this.renderResults();
            });
        });
    }
    handleKeydown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredItems.length);
            this.renderResults();
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % Math.max(1, this.filteredItems.length);
            this.renderResults();
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            this.selectItem(this.selectedIndex);
        }
        else if (e.key === 'Escape') {
            this.close();
        }
    }
    selectItem(index) {
        const item = this.filteredItems[index];
        if (!item)
            return;
        this.close();
        if (item.action) {
            item.action();
        }
        else if (item.route) {
            this.navigateCallback(item.route);
        }
    }
}
