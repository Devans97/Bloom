/**
 * CBSE Class XII Derivation & Theorem Interactive Lab UI
 * Subject: Physics (042) & Mathematics (041)
 * Features: Step-by-step recall testing, hidden step toggle, whiteboard diagrams,
 * mark allocation tracking, board trap warnings, and self-evaluation score recording.
 */
import { cbsePhysicsDerivations } from './data/cbse-derivations.js';
import { cbseMathTheorems } from './data/cbse-math-theorems.js';
export class DerivationLabUI {
    container;
    state = {
        selectedId: 'phy-der-01',
        isMath: false,
        practiceMode: false,
        revealedSteps: new Set(),
        userNotes: {},
        selfScores: {}
    };
    constructor(container) {
        this.container = container;
    }
    render() {
        const activePhysicsDerivation = cbsePhysicsDerivations.find(d => d.id === this.state.selectedId);
        const activeMathTheorem = cbseMathTheorems.find(t => t.id === this.state.selectedId);
        const isCurrentMath = this.state.isMath;
        const currentItem = isCurrentMath ? activeMathTheorem : activePhysicsDerivation;
        this.container.innerHTML = `
      <div class="derivation-lab-root" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 1200px; margin: 0 auto; color: var(--color-ink, #1f2937); font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header Banner -->
        <header style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 28px 32px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
            <div>
              <span style="display: inline-block; padding: 4px 12px; background: rgba(255, 255, 255, 0.2); border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">CBSE Board Master Toolkit</span>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">Derivation & Theorem Studio</h1>
              <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9; max-width: 680px;">Master all 20 essential Physics derivations and 10 core Mathematics proofs with strict step-marking criteria, diagrams, and recall training.</p>
            </div>
            <div class="studio-filter-bar" style="display: flex; gap: 10px; align-items: center; background: rgba(255, 255, 255, 0.15); padding: 6px 8px; border-radius: 12px; backdrop-filter: blur(8px); overflow-x: auto; -webkit-overflow-scrolling: touch; max-width: 100%;">
              <button id="btn-toggle-physics" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${!isCurrentMath ? 'background: #ffffff; color: #1e3a8a; box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : 'background: transparent; color: #ffffff;'}">Physics (042)</button>
              <button id="btn-toggle-math" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${isCurrentMath ? 'background: #ffffff; color: #1e3a8a; box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : 'background: transparent; color: #ffffff;'}">Mathematics (041)</button>
            </div>
          </div>
        </header>

        <!-- Main Workspace Grid -->
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px; align-items: start;">
          <!-- Left Sidebar: Selection List -->
          <aside style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            <div style="margin-bottom: 14px;">
              <label for="input-search-items" style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">Search Derivations</label>
              <input id="input-search-items" type="text" placeholder="e.g. Gauss, Lensmaker, Skew..." style="width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
            </div>

            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; margin-bottom: 8px;">
              ${isCurrentMath ? 'Mathematics Theorems' : 'Physics Derivations'} (${isCurrentMath ? cbseMathTheorems.length : cbsePhysicsDerivations.length})
            </div>

            <div id="derivation-list-container" style="display: flex; flex-direction: column; gap: 6px; max-height: 600px; overflow-y: auto; padding-right: 4px;">
              ${this.renderSidebarList(isCurrentMath)}
            </div>
          </aside>

          <!-- Right Content Area: Active Derivation Details -->
          <main style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
            ${currentItem ? this.renderActiveItemContent(currentItem, isCurrentMath) : '<p>Select a derivation to begin.</p>'}
          </main>
        </div>
      </div>
    `;
        this.bindEvents();
    }
    renderSidebarList(isMath) {
        const list = isMath ? cbseMathTheorems : cbsePhysicsDerivations;
        return list.map((item) => {
            const isSelected = item.id === this.state.selectedId;
            return `
        <button class="derivation-nav-btn" data-id="${item.id}" style="text-align: left; padding: 10px 12px; border: 1px solid ${isSelected ? '#3b82f6' : '#f3f4f6'}; border-radius: 8px; background: ${isSelected ? '#eff6ff' : '#f9fafb'}; cursor: pointer; transition: all 0.15s;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-size: 11px; font-weight: 700; color: ${isSelected ? '#1d4ed8' : '#6b7280'};">${item.chapterId}</span>
            <span style="font-size: 11px; font-weight: 700; background: ${isSelected ? '#bfdbfe' : '#e5e7eb'}; color: ${isSelected ? '#1e3a8a' : '#374151'}; padding: 2px 6px; border-radius: 4px;">${item.marksWeightage} Marks</span>
          </div>
          <div style="font-size: 13px; font-weight: 600; color: ${isSelected ? '#1e3a8a' : '#1f2937'}; line-height: 1.3;">${item.title}</div>
        </button>
      `;
        }).join('');
    }
    renderActiveItemContent(item, isMath) {
        const isPhysics = !isMath;
        const physItem = isPhysics ? item : null;
        const mathItem = !isPhysics ? item : null;
        const totalMarks = item.marksWeightage;
        const isPractice = this.state.practiceMode;
        const prereqs = physItem ? physItem.assumptions : (mathItem?.prerequisites || []);
        return `
      <div>
        <!-- Title and Controls Bar -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px; border-bottom: 1px solid #f3f4f6; padding-bottom: 16px;">
          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
              <span style="background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 700;">Chapter: ${item.chapterId}</span>
              <span style="background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 700;">Weightage: ${totalMarks} Marks</span>
            </div>
            <h2 style="margin: 0; font-size: 22px; font-weight: 800; color: #111827;">${item.title}</h2>
          </div>

          <!-- Practice Mode Switch -->
          <div style="display: flex; align-items: center; gap: 10px; background: #f3f4f6; padding: 6px 12px; border-radius: 8px;">
            <span style="font-size: 13px; font-weight: 600; color: #374151;">Practice Mode (Hide Steps)</span>
            <input id="toggle-practice-mode" type="checkbox" ${isPractice ? 'checked' : ''} style="cursor: pointer; width: 18px; height: 18px;">
          </div>
        </div>

        <!-- Prerequisites & Statement -->
        <div class="notebook-ruled-paper" style="padding: 16px 20px; margin-bottom: 20px; border-left: 4px solid #2563eb;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #1e40af; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
            <span>✍️ Statement & Governing Law · Handwritten Formulation</span>
            <span style="height: 1px; flex: 1; background: rgba(37,99,235,0.2);"></span>
          </div>
          <div class="handwritten-formula-text" style="font-size: 24px; color: #1e3a8a; line-height: 1.45; margin-bottom: 8px;">
            ${isPhysics ? physItem?.finalFormula : mathItem?.theoremStatement}
          </div>
          <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 18px; color: #475569; font-weight: 600;">
            <strong style="font-family: system-ui, sans-serif; font-size: 11.5px; text-transform: uppercase; color: #64748b;">Prerequisites / Assumptions:</strong> ${prereqs.join(' • ')}
          </div>
        </div>

        ${physItem?.diagramDescription ? `
          <!-- Diagram Blueprint Box -->
          <div style="background: #f0fdf4; border: 1.5px dashed #22c55e; border-radius: 12px; padding: 14px 18px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 11.5px; font-weight: 800; color: #15803d; text-transform: uppercase; letter-spacing: 0.04em;">📐 Board Ray / Circuit Diagram Blueprint</span>
              <span style="font-size: 11px; background: #dcfce7; color: #166534; padding: 2px 7px; border-radius: 4px; font-weight: 700;">Worth 1.0 Mark in CBSE</span>
            </div>
            <p style="margin: 0; font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; line-height: 1.45; color: #14532d; font-weight: 600;">${physItem.diagramDescription}</p>
          </div>
        ` : ''}

        <!-- Steps Section -->
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #111827; letter-spacing: -0.01em;">
              ✍️ Handwritten Step-by-Step Derivation Breakdown
            </h3>
            ${isPractice ? `
              <button id="btn-reveal-all" style="font-size: 12px; font-weight: 700; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 4px 10px; cursor: pointer;">Reveal All Steps</button>
            ` : ''}
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${this.renderSteps(item, isPractice)}
          </div>
        </div>

        ${physItem?.commonMistakes ? `
          <!-- Board Pitfalls Alert Box in Teacher Red -->
          <div class="notebook-ruled-paper" style="border-left: 4px solid #dc2626 !important; padding: 16px 20px; margin-top: 24px; background: #fffdfb !important;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="font-size: 11.5px; font-weight: 800; color: #b91c1c; text-transform: uppercase; letter-spacing: 0.05em;">⚠️ CBSE Examiner Warning: Common Board Traps</span>
            </div>
            <ul style="margin: 0; padding-left: 20px; font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; color: #991b1b; font-weight: 600; line-height: 1.5;">
              ${physItem.commonMistakes.map((trap) => `<li style="margin-bottom: 4px;">${trap}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
    }
    renderSteps(item, isPractice) {
        const isPhysics = 'steps' in item;
        const steps = isPhysics ? item.steps : item.proofSteps;
        return steps.map(step => {
            const stepNo = step.stepNumber;
            const isRevealed = !isPractice || this.state.revealedSteps.has(stepNo);
            const mathExpr = step.mathExpression;
            const text = step.description || step.statement;
            const reasoning = step.reasoning || step.justification;
            return `
        <div class="handwritten-step-card" data-step="${stepNo}" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 11.5px; font-weight: 800; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px;">Step ${stepNo}</span>
            <div style="display: flex; gap: 8px; align-items: center;">
              ${isPractice ? `
                <button class="btn-toggle-step" data-step="${stepNo}" style="font-size: 12px; font-weight: 600; color: #2563eb; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 3px 8px; cursor: pointer;">
                  ${isRevealed ? 'Hide' : 'Reveal Step'}
                </button>
              ` : ''}
            </div>
          </div>

          <div style="font-size: 14.5px; font-weight: 600; color: #0f172a; margin-bottom: 8px; line-height: 1.45;">
            ${text}
          </div>

          ${isRevealed ? `
            <!-- Authentic Handwritten Deduction Plate -->
            <div class="handwritten-formula-plate" style="margin: 10px 0; padding: 12px 18px; border-left: 3.5px solid #2563eb;">
              <div class="handwritten-formula-text" style="font-size: 23px; color: #1e3a8a; line-height: 1.45; font-weight: 700;">
                ${mathExpr}
              </div>
            </div>
            ${reasoning ? `
              <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 18px; color: #065f46; background: #f0fdf4; border-left: 3px solid #059669; padding: 6px 12px; border-radius: 0 6px 6px 0; margin-top: 6px; font-weight: 600;">
                <span style="font-family: system-ui, sans-serif; font-size: 11px; font-weight: 800; text-transform: uppercase; color: #047857;">✍️ CBSE Rubric Step Requirement:</span> ${reasoning}
              </div>
            ` : ''}
          ` : `
            <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; padding: 18px; border-radius: 8px; text-align: center; color: #64748b; font-size: 13.5px; font-family: 'Caveat', 'Kalam', cursive; font-weight: 600;">
              [Hidden in Practice Mode · Write your derivation step below, then reveal to verify]
            </div>
            <textarea class="step-practice-input" data-step="${stepNo}" placeholder="Type your handwritten derivation formula or reasoning..." style="width: 100%; box-sizing: border-box; margin-top: 8px; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 18px; font-family: 'Caveat', 'Kalam', cursive; resize: vertical; min-height: 55px; background: #fffefb;">${this.state.userNotes[stepNo] || ''}</textarea>
          `}
        </div>
      `;
        }).join('');
    }
    bindEvents() {
        // Subject toggles
        this.container.querySelector('#btn-toggle-physics')?.addEventListener('click', () => {
            this.state.isMath = false;
            this.state.selectedId = cbsePhysicsDerivations[0].id;
            this.state.revealedSteps.clear();
            this.render();
        });
        this.container.querySelector('#btn-toggle-math')?.addEventListener('click', () => {
            this.state.isMath = true;
            this.state.selectedId = cbseMathTheorems[0].id;
            this.state.revealedSteps.clear();
            this.render();
        });
        // Navigation buttons
        this.container.querySelectorAll('.derivation-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (id) {
                    this.state.selectedId = id;
                    this.state.revealedSteps.clear();
                    this.render();
                }
            });
        });
        // Practice mode switch
        const togglePractice = this.container.querySelector('#toggle-practice-mode');
        togglePractice?.addEventListener('change', () => {
            this.state.practiceMode = togglePractice.checked;
            this.state.revealedSteps.clear();
            this.render();
        });
        // Step reveal buttons
        this.container.querySelectorAll('.btn-toggle-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const step = Number(e.currentTarget.getAttribute('data-step'));
                if (this.state.revealedSteps.has(step)) {
                    this.state.revealedSteps.delete(step);
                }
                else {
                    this.state.revealedSteps.add(step);
                }
                this.render();
            });
        });
        // Reveal all
        this.container.querySelector('#btn-reveal-all')?.addEventListener('click', () => {
            const activeList = this.state.isMath ? cbseMathTheorems : cbsePhysicsDerivations;
            const current = activeList.find((i) => i.id === this.state.selectedId);
            if (current) {
                const count = 'steps' in current ? current.steps.length : current.proofSteps.length;
                for (let i = 1; i <= count; i++) {
                    this.state.revealedSteps.add(i);
                }
                this.render();
            }
        });
        // Search filter
        const searchInput = this.container.querySelector('#input-search-items');
        searchInput?.addEventListener('input', () => {
            const q = searchInput.value.toLowerCase().trim();
            this.container.querySelectorAll('.derivation-nav-btn').forEach(btn => {
                const text = (btn.textContent || '').toLowerCase();
                btn.style.display = text.includes(q) ? 'block' : 'none';
            });
        });
        // User practice notes input
        this.container.querySelectorAll('.step-practice-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const step = Number(e.target.getAttribute('data-step'));
                this.state.userNotes[step] = e.target.value;
            });
        });
    }
}
