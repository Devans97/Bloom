/**
 * CBSE Class XII Practicals Laboratory & External Examiner Viva-Voce Simulator UI
 * Subject: Physics (042), Chemistry (043), Physical Education (048)
 * Features: Qualitative Salt Analysis deductive tree, Titration calculation validator,
 * and External Examiner Viva-Voce interactive flashcard training engine.
 */

import { cbsePhysicsPracticals, CBSEPhysicsPractical } from './data/cbse-practicals-physics.js';
import { cbseSaltRadicals, cbseTitrations, cbseFunctionalGroupTests, SaltRadicalSpec } from './data/cbse-practicals-chemistry.js';
import { cbseFitnessTestBattery, cbseMajorSportsSpecs, cbsePEVivaQuestions } from './data/cbse-practicals-pe.js';

export interface PracticalsLabState {
  activeSubject: 'physics' | 'chemistry' | 'pe';
  activeTab: 'manual' | 'viva-flashcards' | 'titration-calc';
  selectedExpId: string;
  vivaCardIndex: number;
  isVivaAnswerRevealed: boolean;
  knownVivaIds: Set<string>;
}

export class PracticalsLabUI {
  private container: HTMLElement;
  private state: PracticalsLabState = {
    activeSubject: 'chemistry',
    activeTab: 'manual',
    selectedExpId: 'prac-phy-a-01',
    vivaCardIndex: 0,
    isVivaAnswerRevealed: false,
    knownVivaIds: new Set<string>()
  };

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render(): void {
    const sub = this.state.activeSubject;
    const tab = this.state.activeTab;

    this.container.innerHTML = `
      <div class="practicals-lab-root" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 1200px; margin: 0 auto; color: var(--color-ink, #1f2937); font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header Banner -->
        <header style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; padding: 28px 32px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.3);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
            <div>
              <span style="display: inline-block; padding: 4px 12px; background: rgba(255, 255, 255, 0.2); border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">CBSE Practical Exam (30 Marks)</span>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">Laboratory Manual & Viva-Voce Studio</h1>
              <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9; max-width: 700px;">Full experimental procedures, error formulas, salt analysis deduction schemes, and real external examiner Viva questions for maximum practical marks.</p>
            </div>

            <!-- Subject Selectors -->
            <div style="display: flex; gap: 8px; background: rgba(255, 255, 255, 0.15); padding: 6px; border-radius: 12px;">
              <button class="prac-sub-btn" data-sub="physics" style="padding: 8px 14px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${sub === 'physics' ? 'background: #ffffff; color: #4f46e5;' : 'background: transparent; color: #ffffff;'}">Physics</button>
              <button class="prac-sub-btn" data-sub="chemistry" style="padding: 8px 14px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${sub === 'chemistry' ? 'background: #ffffff; color: #4f46e5;' : 'background: transparent; color: #ffffff;'}">Chemistry</button>
              <button class="prac-sub-btn" data-sub="pe" style="padding: 8px 14px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${sub === 'pe' ? 'background: #ffffff; color: #4f46e5;' : 'background: transparent; color: #ffffff;'}">Physical Education</button>
            </div>
          </div>

          <!-- Feature Tabs -->
          <div style="display: flex; gap: 12px; margin-top: 20px;">
            <button class="prac-tab-btn" data-tab="manual" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${tab === 'manual' ? 'background: #ffffff; color: #4f46e5;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">Experiment Manuals</button>
            <button class="prac-tab-btn" data-tab="viva-flashcards" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${tab === 'viva-flashcards' ? 'background: #ffffff; color: #4f46e5;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">Viva-Voce Flashcard Trainer</button>
            ${sub === 'chemistry' ? `
              <button class="prac-tab-btn" data-tab="titration-calc" style="padding: 8px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; ${tab === 'titration-calc' ? 'background: #ffffff; color: #4f46e5;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">Titration Calculator</button>
            ` : ''}
          </div>
        </header>

        <!-- Main Workspace -->
        <main>
          ${this.renderActiveTabContent()}
        </main>
      </div>
    `;

    this.bindEvents();
  }

  private renderActiveTabContent(): string {
    if (this.state.activeTab === 'viva-flashcards') {
      return this.renderVivaFlashcards();
    } else if (this.state.activeTab === 'titration-calc') {
      return this.renderTitrationCalculator();
    } else {
      return this.renderExperimentManual();
    }
  }

  private renderExperimentManual(): string {
    const sub = this.state.activeSubject;

    if (sub === 'physics') {
      return `
        <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px;">
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 12px;">Physics Practicals (Class 12)</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${cbsePhysicsPracticals.map(p => `
                <button class="exp-nav-btn" data-id="${p.id}" style="text-align: left; padding: 10px 12px; border: 1px solid ${p.id === this.state.selectedExpId ? '#6366f1' : '#f3f4f6'}; border-radius: 8px; background: ${p.id === this.state.selectedExpId ? '#eef2ff' : '#f9fafb'}; cursor: pointer;">
                  <span style="font-size: 11px; font-weight: 700; color: #4f46e5; display: block; margin-bottom: 2px;">${p.section} • Exp ${p.experimentNumber}</span>
                  <span style="font-size: 13px; font-weight: 700; color: #1f2937;">${p.title}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
            ${this.renderPhysicsExpDetails()}
          </div>
        </div>
      `;
    } else if (sub === 'chemistry') {
      return `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Salt Analysis Systematic Scheme -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
            <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #111827;">Systematic Qualitative Analysis (Salt Analysis Scheme)</h2>
            <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #6b7280;">Official step-by-step detection of 1 acid radical (anion) and 1 basic radical (cation) carrying 8 marks.</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px;">
              ${cbseSaltRadicals.map(r => `
                <div class="notebook-ruled-paper" style="padding: 16px; border-left: 3.5px solid #2563eb;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <span style="font-size: 11px; font-weight: 700; background: ${r.radicalType.includes('anion') ? '#fef3c7' : '#e0e7ff'}; color: ${r.radicalType.includes('anion') ? '#92400e' : '#3730a3'}; padding: 2px 6px; border-radius: 4px;">${r.group}</span>
                    <span style="font-size: 20px; font-weight: 700; font-family: 'Caveat', 'Kalam', cursive; color: #1e3a8a;">${r.formula}</span>
                  </div>
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 800; color: #1f2937;">${r.name} Radical</h3>
                  <div style="font-size: 12px; color: #4b5563; margin-bottom: 8px;"><strong>Preliminary:</strong> ${r.preliminaryTest}</div>
                  <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px;">
                    <div style="font-size: 11px; font-weight: 700; color: #059669; text-transform: uppercase;">Confirmatory Test: ${r.confirmatoryTests[0]?.testName}</div>
                    <div style="font-size: 12.5px; color: #1f2937; margin: 4px 0;">${r.confirmatoryTests[0]?.observation}</div>
                    <div class="handwritten-reaction-strip" style="font-size: 18px; padding: 8px 12px; margin-top: 6px;">${r.confirmatoryTests[0]?.chemicalEquation}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
          <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #111827;">SAI Khelo India Physical Fitness Test Protocol</h2>
          <p style="margin: 0 0 16px 0; font-size: 13.5px; color: #6b7280;">Official battery of tests administered for CBSE Class 12 practical examination (30 Marks).</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px;">
            ${cbseFitnessTestBattery.map(f => `
              <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: #f9fafb;">
                <span style="font-size: 11px; font-weight: 700; background: #ecfdf5; color: #047857; padding: 2px 6px; border-radius: 4px;">Metric: ${f.scoringMetric}</span>
                <h3 style="margin: 8px 0 4px 0; font-size: 16px; font-weight: 700; color: #111827;">${f.testName}</h3>
                <div style="font-size: 12px; font-weight: 600; color: #4f46e5; margin-bottom: 8px;">Measures: ${f.componentMeasured}</div>
                <div style="font-size: 12px; color: #4b5563; line-height: 1.4;">${f.protocolSteps[0]}</div>
                <div style="margin-top: 10px; font-size: 11.5px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 8px;">
                  <strong>Class 12 Norm (Boys/Girls):</strong> Excellent: ${f.class12Norms[0].excellent}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  private renderPhysicsExpDetails(): string {
    const exp = cbsePhysicsPracticals.find(p => p.id === this.state.selectedExpId) || cbsePhysicsPracticals[0];

    return `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 14px; margin-bottom: 16px;">
          <div>
            <span style="font-size: 12px; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 6px;">${exp.section} • Experiment ${exp.experimentNumber}</span>
            <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #111827;">${exp.title}</h2>
          </div>
          <span style="font-size: 12px; font-weight: 700; background: #ecfdf5; color: #065f46; padding: 4px 10px; border-radius: 8px;">Practical Score: 7 Marks</span>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #4f46e5; margin-bottom: 2px;">Aim of Experiment</div>
          <p style="margin: 0; font-size: 13.5px; color: #334155; line-height: 1.4;">${exp.aim}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 800; color: #111827;">✍️ Working Practical Formulas & Principles</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${exp.workingFormulae.map(f => `
              <div class="handwritten-formula-plate" style="padding: 12px 18px; border-left: 4px solid #2563eb;">
                <div style="font-size: 11px; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">
                  ${f.name}
                </div>
                <div class="handwritten-formula-text" style="font-size: 22px; color: #1e3a8a; font-weight: 700; line-height: 1.45;">
                  ${f.formula}
                </div>
                <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 18px; color: #334155; margin-top: 4px; font-weight: 600;">
                  <span style="font-family: system-ui, sans-serif; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">Variables:</span> ${f.symbolMeanings}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1f2937;">Circuit / Ray Blueprint</h3>
          <div style="background: #f0fdf4; border: 1px dashed #22c55e; border-radius: 8px; padding: 12px 14px; font-size: 13px; color: #166534; line-height: 1.4;">
            ${exp.circuitOrRayDiagramDescription}
          </div>
        </div>

        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #1f2937;">Sample Observation Table Readings</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left;">
            <thead>
              <tr style="background: #f3f4f6; color: #374151;">
                ${exp.observationTableHeaders.map(h => `<th style="padding: 8px 10px; border: 1px solid #e5e7eb;">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${exp.sampleObservationData.map(row => `
                <tr>
                  <td style="padding: 8px 10px; border: 1px solid #e5e7eb; font-weight: 600;">${row.sNo}</td>
                  ${Object.values(row.readings).map(v => `<td style="padding: 8px 10px; border: 1px solid #e5e7eb;">${v}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  private renderVivaFlashcards(): string {
    const allViva: { question: string; expectedAnswer: string; examinerFocus: string; subject: string }[] = [];

    cbsePhysicsPracticals.forEach(p => p.vivaVoceQuestions.forEach(v => allViva.push({ ...v, subject: 'Physics' })));
    cbseTitrations.forEach(t => t.vivaVoceQuestions.forEach(v => allViva.push({ ...v, subject: 'Chemistry' })));
    cbsePEVivaQuestions.forEach(v => allViva.push({ ...v, subject: 'Physical Education' }));

    const filteredViva = allViva.filter(v => v.subject.toLowerCase() === this.state.activeSubject);
    const totalCount = filteredViva.length;
    const cardIdx = Math.min(this.state.vivaCardIndex, totalCount - 1);
    const currentViva = filteredViva[cardIdx];

    if (!currentViva) {
      return '<p>No viva cards available for this subject.</p>';
    }

    return `
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 32px; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <span style="font-size: 12px; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 4px 10px; border-radius: 6px;">External Examiner Viva Card ${cardIdx + 1} of ${totalCount}</span>
          <span style="font-size: 12px; font-weight: 700; color: #6b7280;">Subject: ${currentViva.subject}</span>
        </div>

        <!-- Question Box -->
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 28px 24px; min-height: 180px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 24px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 8px;">Examiner Prompt</div>
          <div style="font-size: 18px; font-weight: 700; color: #0f172a; line-height: 1.5; max-width: 640px;">
            "${currentViva.question}"
          </div>
          <div style="font-size: 12px; color: #6366f1; font-weight: 600; margin-top: 12px;">Examiner Focus: ${currentViva.examinerFocus}</div>
        </div>

        <!-- Answer Reveal Box -->
        ${this.state.isVivaAnswerRevealed ? `
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #166534; margin-bottom: 4px;">Expected Model Answer (Full Marks)</div>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #14532d;">${currentViva.expectedAnswer}</p>
          </div>
        ` : `
          <button id="btn-reveal-viva" style="padding: 12px 28px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; background: #4f46e5; color: #ffffff; cursor: pointer; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);">
            Reveal Expected Answer
          </button>
        `}

        <!-- Navigation Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 16px;">
          <button id="btn-prev-viva" ${cardIdx === 0 ? 'disabled' : ''} style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: ${cardIdx === 0 ? 'not-allowed' : 'pointer'}; background: #ffffff; opacity: ${cardIdx === 0 ? '0.5' : '1'};">
            Previous Card
          </button>

          <button id="btn-next-viva" ${cardIdx === totalCount - 1 ? 'disabled' : ''} style="padding: 8px 20px; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: ${cardIdx === totalCount - 1 ? 'not-allowed' : 'pointer'}; background: #4f46e5; color: #ffffff; opacity: ${cardIdx === totalCount - 1 ? '0.5' : '1'};">
            Next Viva Card
          </button>
        </div>
      </div>
    `;
  }

  private renderTitrationCalculator(): string {
    return `
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px; max-width: 800px; margin: 0 auto;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800; color: #111827;">Redox Titration Molarity & Strength Calculator</h2>
        <p style="margin: 0 0 20px 0; font-size: 13.5px; color: #6b7280;">Input your laboratory burette readings to verify your molarity calculations against official CBSE formulas.</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">Standard Mohr's Salt Molarity (M)</label>
            <input id="input-m-mohr" type="number" step="0.001" value="0.050" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">Pipette Volume of Mohr's Salt (mL)</label>
            <input id="input-v-mohr" type="number" step="0.1" value="20.0" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">Concordant KMnO4 Burette Reading (mL)</label>
            <input id="input-v-kmno4" type="number" step="0.1" value="20.0" style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 6px;">KMnO4 Molar Mass (g/mol)</label>
            <input type="text" value="158.04 g/mol" disabled style="width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; background: #f3f4f6;">
          </div>
        </div>

        <button id="btn-calc-titration" style="width: 100%; padding: 12px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; background: #059669; color: #ffffff; cursor: pointer; margin-bottom: 20px;">
          Calculate Molarity & Strength
        </button>

        <div id="titration-results-box" style="display: none; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 18px;">
          <h3 style="margin: 0 0 10px 0; font-size: 15px; font-weight: 700; color: #166534;">Verified Laboratory Results</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #15803d; text-transform: uppercase;">Molarity of KMnO4 (M)</div>
              <div id="res-molarity" style="font-size: 18px; font-weight: 800; color: #166534; font-family: monospace;">-</div>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: #15803d; text-transform: uppercase;">Strength of KMnO4 (g/L)</div>
              <div id="res-strength" style="font-size: 18px; font-weight: 800; color: #166534; font-family: monospace;">-</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    this.container.querySelectorAll('.prac-sub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = (e.currentTarget as HTMLElement).getAttribute('data-sub') as any;
        if (sub) {
          this.state.activeSubject = sub;
          this.state.vivaCardIndex = 0;
          this.state.isVivaAnswerRevealed = false;
          this.render();
        }
      });
    });

    this.container.querySelectorAll('.prac-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).getAttribute('data-tab') as any;
        if (tab) {
          this.state.activeTab = tab;
          this.render();
        }
      });
    });

    this.container.querySelectorAll('.exp-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) {
          this.state.selectedExpId = id;
          this.render();
        }
      });
    });

    this.container.querySelector('#btn-reveal-viva')?.addEventListener('click', () => {
      this.state.isVivaAnswerRevealed = true;
      this.render();
    });

    this.container.querySelector('#btn-prev-viva')?.addEventListener('click', () => {
      if (this.state.vivaCardIndex > 0) {
        this.state.vivaCardIndex--;
        this.state.isVivaAnswerRevealed = false;
        this.render();
      }
    });

    this.container.querySelector('#btn-next-viva')?.addEventListener('click', () => {
      this.state.vivaCardIndex++;
      this.state.isVivaAnswerRevealed = false;
      this.render();
    });

    this.container.querySelector('#btn-calc-titration')?.addEventListener('click', () => {
      const mMohr = parseFloat((this.container.querySelector('#input-m-mohr') as HTMLInputElement).value) || 0.05;
      const vMohr = parseFloat((this.container.querySelector('#input-v-mohr') as HTMLInputElement).value) || 20.0;
      const vKmno4 = parseFloat((this.container.querySelector('#input-v-kmno4') as HTMLInputElement).value) || 20.0;

      // Formula: (M_KMnO4 * V_KMnO4) / 1 = (M_Mohr * V_Mohr) / 5
      // M_KMnO4 = (M_Mohr * V_Mohr) / (5 * V_KMnO4)
      const mKmno4 = (mMohr * vMohr) / (5 * vKmno4);
      const strength = mKmno4 * 158.04;

      const resultsBox = this.container.querySelector('#titration-results-box') as HTMLElement;
      const resMol = this.container.querySelector('#res-molarity') as HTMLElement;
      const resStr = this.container.querySelector('#res-strength') as HTMLElement;

      if (resultsBox && resMol && resStr) {
        resultsBox.style.display = 'block';
        resMol.textContent = `${mKmno4.toFixed(4)} M`;
        resStr.textContent = `${strength.toFixed(2)} g/L`;
      }
    });
  }
}
