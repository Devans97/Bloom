/**
 * CBSE Class XII Organic Chemistry Conversion Roadmap & Distinction Test Solver UI
 * Subject: Chemistry (043)
 * Features: Multi-step synthetic pathway explorer, 29 named reactions registry,
 * instant distinction test solver for pairs of organic compounds, and reagent selector.
 */
import { cbseNamedReactions } from './data/cbse-organic-reactions.js';
export const cbseDistinctionTests = [
    {
        id: 'dist-01',
        compoundA: 'Ethanol (CH3CH2OH)',
        compoundB: 'Methanol (CH3OH)',
        testReagent: 'Iodoform Test (I2 + NaOH, warm)',
        observationA: 'Forms a bright yellow crystalline precipitate of Iodoform (CHI3) with characteristic antiseptic odor.',
        observationB: 'No yellow precipitate forms; solution remains clear.',
        chemicalEquationA: 'CH3CH2OH + 4 I2 + 6 NaOH -> CHI3 v (yellow) + HCOONa + 5 NaI + 5 H2O',
        chemicalEquationB: 'CH3OH + I2 + NaOH -> No Reaction',
        cbseExamFrequency: 'Very High'
    },
    {
        id: 'dist-02',
        compoundA: 'Phenol (C6H5OH)',
        compoundB: 'Benzoic Acid (C6H5COOH)',
        testReagent: 'Sodium Bicarbonate (NaHCO3) 5% solution',
        observationA: 'No effervescence (Phenol is a weaker acid than carbonic acid H2CO3).',
        observationB: 'Brisk effervescence with evolution of colorless CO2 gas which turns lime water milky.',
        chemicalEquationA: 'C6H5OH + NaHCO3 -> No Reaction',
        chemicalEquationB: 'C6H5COOH + NaHCO3 -> C6H5COONa + H2O + CO2 ^',
        cbseExamFrequency: 'Guaranteed'
    },
    {
        id: 'dist-03',
        compoundA: 'Propanal (CH3CH2CHO)',
        compoundB: 'Propanone (CH3COCH3)',
        testReagent: 'Tollens\' Reagent [Ammoniacal AgNO3] / Fehling\'s Solution',
        observationA: 'Forms a glistening silver mirror on the inner wall of the test tube (or red Cu2O ppt with Fehling\'s).',
        observationB: 'No silver mirror formed (Ketones do not reduce Tollens\' reagent).',
        chemicalEquationA: 'CH3CH2CHO + 2 [Ag(NH3)2]^+ + 3 OH^- -> CH3CH2COO^- + 2 Ag v (silver mirror) + 4 NH3 + 2 H2O',
        chemicalEquationB: 'CH3COCH3 + [Ag(NH3)2]^+ -> No Reaction',
        cbseExamFrequency: 'Guaranteed'
    },
    {
        id: 'dist-04',
        compoundA: 'Aniline (C6H5NH2)',
        compoundB: 'N-Methylaniline (C6H5NHCH3)',
        testReagent: 'Carbylamine Test (CHCl3 + alcoholic KOH, warm)',
        observationA: 'Extremely offensive, nauseating foul smell of phenyl isocyanide (carbylamine).',
        observationB: 'No foul smell (secondary amines do not undergo carbylamine reaction).',
        chemicalEquationA: 'C6H5NH2 + CHCl3 + 3 KOH -> C6H5-NC (foul smell) + 3 KCl + 3 H2O',
        chemicalEquationB: 'C6H5NHCH3 + CHCl3 + KOH -> No Reaction',
        cbseExamFrequency: 'Very High'
    },
    {
        id: 'dist-05',
        compoundA: 'Propan-1-ol (CH3CH2CH2OH)',
        compoundB: 'Propan-2-ol [CH3CH(OH)CH3]',
        testReagent: 'Iodoform Test (I2 + NaOH)',
        observationA: 'No yellow precipitate (primary alcohol without CH3-CH(OH)- group).',
        observationB: 'Bright yellow crystalline precipitate of iodoform (CHI3) forms.',
        chemicalEquationA: 'CH3CH2CH2OH + I2 + NaOH -> No Reaction',
        chemicalEquationB: 'CH3CH(OH)CH3 + 4 I2 + 6 NaOH -> CHI3 v (yellow) + CH3COONa + 5 NaI + 5 H2O',
        cbseExamFrequency: 'High'
    },
    {
        id: 'dist-06',
        compoundA: 'Acetaldehyde (CH3CHO)',
        compoundB: 'Benzaldehyde (C6H5CHO)',
        testReagent: 'Fehling\'s Solution (A + B, heat)',
        observationA: 'Red precipitate of cuprous oxide (Cu2O) forms (aliphatic aldehyde reduces Fehling\'s).',
        observationB: 'No red precipitate formed (aromatic aldehydes fail to reduce Fehling\'s solution).',
        chemicalEquationA: 'CH3CHO + 2 Cu^(2+) + 5 OH^- -> CH3COO^- + Cu2O v (red) + 3 H2O',
        chemicalEquationB: 'C6H5CHO + Fehling\'s -> No Reaction',
        cbseExamFrequency: 'High'
    }
];
export const cbseSyntheticRoadmaps = [
    {
        id: 'road-01',
        title: 'Step-Up Series: Methanol to Ethanol',
        startingMaterial: 'Methanol (CH3OH)',
        targetProduct: 'Ethanol (CH3CH2OH)',
        numberOfSteps: 3,
        strategyHeading: 'Carbon Chain Ascending via Cyanide Nucleophilic Substitution',
        steps: [
            {
                stepNumber: 1,
                reagentAndCondition: 'PCl5 or SOCl2 (Thionyl chloride / Pyridine)',
                intermediateProduct: 'Chloromethane (CH3Cl)',
                reactionType: 'Nucleophilic substitution of hydroxyl group',
                cbseKeyNote: 'SOCl2 is preferred because byproducts SO2 and HCl are gases, leaving pure alkyl halide.'
            },
            {
                stepNumber: 2,
                reagentAndCondition: 'Ethanolic KCN (Potassium cyanide), heat',
                intermediateProduct: 'Ethanenitrile (CH3CN)',
                reactionType: 'Carbon chain extension nucleophilic substitution',
                cbseKeyNote: 'KCN is ionic, so ambident cyanide attacks via carbon, ascending the chain by one carbon.'
            },
            {
                stepNumber: 3,
                reagentAndCondition: '(i) Complete acidic hydrolysis H3O+ to CH3COOH, then (ii) LiAlH4 / ether reduction',
                intermediateProduct: 'Ethanol (CH3CH2OH)',
                reactionType: 'Hydrolysis followed by powerful hydride reduction',
                cbseKeyNote: 'Direct reduction of CH3CN with Na/C2H5OH (Mendius) gives ethylamine CH3CH2NH2; treating with HNO2 gives ethanol.'
            }
        ]
    },
    {
        id: 'road-02',
        title: 'Step-Down Series: Ethanoic Acid to Methanamine',
        startingMaterial: 'Ethanoic Acid (CH3COOH)',
        targetProduct: 'Methanamine (CH3NH2)',
        numberOfSteps: 2,
        strategyHeading: 'Carbon Chain Descending via Hoffmann Bromamide Degradation',
        steps: [
            {
                stepNumber: 1,
                reagentAndCondition: 'NH3 (Ammonia), heat (Delta)',
                intermediateProduct: 'Ethanamide (CH3CONH2)',
                reactionType: 'Ammonolysis of carboxylic acid via ammonium ethanoate',
                cbseKeyNote: 'CH3COOH + NH3 -> CH3COONH4 -(heat)-> CH3CONH2 + H2O.'
            },
            {
                stepNumber: 2,
                reagentAndCondition: 'Br2 + 4 NaOH (or Br2/KOH, warm)',
                intermediateProduct: 'Methanamine (CH3NH2)',
                reactionType: 'Hoffmann Bromamide Degradation Reaction',
                cbseKeyNote: 'Yields primary amine with ONE LESS carbon atom than the parent amide. Byproduct is Na2CO3.'
            }
        ]
    },
    {
        id: 'road-03',
        title: 'Aromatic Conversion: Aniline to Phenol',
        startingMaterial: 'Aniline (C6H5NH2)',
        targetProduct: 'Phenol (C6H5OH)',
        numberOfSteps: 2,
        strategyHeading: 'Diazotization followed by Warm Hydrolysis',
        steps: [
            {
                stepNumber: 1,
                reagentAndCondition: 'NaNO2 + dil. HCl at 273 - 278 K (0 - 5 °C)',
                intermediateProduct: 'Benzenediazonium Chloride (C6H5N2+ Cl-)',
                reactionType: 'Diazotization of primary aromatic amine',
                cbseKeyNote: 'Strict temperature control between 0-5 °C is mandatory; above 5 °C diazonium salt decomposes violently.'
            },
            {
                stepNumber: 2,
                reagentAndCondition: 'Warm water (H2O, 50-60 °C) or dil. H2SO4 boil',
                intermediateProduct: 'Phenol (C6H5OH)',
                reactionType: 'Nucleophilic substitution of diazonium group with OH',
                cbseKeyNote: 'Quantitative conversion with evolution of inert N2 gas: C6H5N2+ Cl- + H2O -> C6H5OH + N2 ^ + HCl.'
            }
        ]
    }
];
export class ReactionRoadmapUI {
    container;
    activeTab = 'distinction-solver';
    selectedDistinctionId = 'dist-01';
    selectedRoadmapId = 'road-01';
    constructor(container) {
        this.container = container;
    }
    render() {
        this.container.innerHTML = `
      <div class="reaction-roadmap-root" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 1200px; margin: 0 auto; color: var(--color-ink, #1f2937); font-family: system-ui, -apple-system, sans-serif;">
        <!-- Header -->
        <header style="background: linear-gradient(135deg, #065f46 0%, #059669 100%); color: #ffffff; padding: 28px 32px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(5, 150, 105, 0.3);">
          <span style="display: inline-block; padding: 4px 12px; background: rgba(255, 255, 255, 0.2); border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">CBSE Chemistry 043</span>
          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.02em;">Organic Synthesis & Distinction Hub</h1>
          <p style="margin: 6px 0 0 0; font-size: 15px; opacity: 0.9; max-width: 720px;">Master multi-step conversion roadmaps, instant one-step chemical distinction tests, and all 29 official CBSE named organic reactions with mechanistic clarity.</p>

          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="tab-distinction" style="padding: 10px 18px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${this.activeTab === 'distinction-solver' ? 'background: #ffffff; color: #065f46;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">Chemical Distinction Solver</button>
            <button id="tab-roadmaps" style="padding: 10px 18px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${this.activeTab === 'synthetic-roadmaps' ? 'background: #ffffff; color: #065f46;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">Conversion Roadmaps</button>
            <button id="tab-named" style="padding: 10px 18px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; ${this.activeTab === 'named-reactions' ? 'background: #ffffff; color: #065f46;' : 'background: rgba(255, 255, 255, 0.2); color: #ffffff;'}">29 Named Reactions Registry</button>
          </div>
        </header>

        <!-- Dynamic Content Body -->
        <main>
          ${this.renderActiveTabContent()}
        </main>
      </div>
    `;
        this.bindEvents();
    }
    renderActiveTabContent() {
        if (this.activeTab === 'distinction-solver') {
            return this.renderDistinctionSolver();
        }
        else if (this.activeTab === 'synthetic-roadmaps') {
            return this.renderSyntheticRoadmaps();
        }
        else {
            return this.renderNamedReactions();
        }
    }
    renderDistinctionSolver() {
        const activeTest = cbseDistinctionTests.find(t => t.id === this.selectedDistinctionId) || cbseDistinctionTests[0];
        return `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px;">
        <!-- Left Side: Distinction Pairs List -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 12px;">Frequent Board Test Pairs</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${cbseDistinctionTests.map(t => {
            const isSelected = t.id === this.selectedDistinctionId;
            return `
                <button class="distinction-select-btn" data-id="${t.id}" style="text-align: left; padding: 12px; border: 1px solid ${isSelected ? '#10b981' : '#f3f4f6'}; border-radius: 8px; background: ${isSelected ? '#ecfdf5' : '#f9fafb'}; cursor: pointer;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <span style="font-size: 11px; font-weight: 700; color: #059669; background: #d1fae5; padding: 2px 6px; border-radius: 4px;">${t.cbseExamFrequency}</span>
                  </div>
                  <div style="font-size: 13px; font-weight: 700; color: #1f2937;">${t.compoundA}</div>
                  <div style="font-size: 11px; color: #6b7280; margin: 2px 0;">versus</div>
                  <div style="font-size: 13px; font-weight: 700; color: #1f2937;">${t.compoundB}</div>
                </button>
              `;
        }).join('')}
          </div>
        </div>

        <!-- Right Side: Official Distinction Solver Panel -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
              <span style="font-size: 12px; font-weight: 700; background: #ecfdf5; color: #047857; padding: 3px 8px; border-radius: 6px;">One-Step Distinguishing Reagent</span>
              <h2 style="margin: 8px 0 0 0; font-size: 22px; font-weight: 800; color: #111827;">${activeTest.testReagent}</h2>
            </div>
            <div style="background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 8px;">
              CBSE Step Rubric: 2 Marks
            </div>
          </div>

          <!-- Comparison Table -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
            <!-- Compound A Card -->
            <div class="notebook-ruled-paper" style="padding: 18px; border-left: 3.5px solid #2563eb;">
              <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 800; color: #1e3a8a;">${activeTest.compoundA}</h3>
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Observed Result</div>
              <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">${activeTest.observationA}</div>
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">✍️ Handwritten Balanced Equation</div>
              <div class="handwritten-reaction-strip" style="margin-top: 4px;">
                ${activeTest.chemicalEquationA}
              </div>
            </div>

            <!-- Compound B Card -->
            <div class="notebook-ruled-paper" style="padding: 18px; border-left: 3.5px solid #dc2626;">
              <h3 style="margin: 0 0 8px 0; font-size: 17px; font-weight: 800; color: #1e3a8a;">${activeTest.compoundB}</h3>
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">Observed Result</div>
              <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.4;">${activeTest.observationB}</div>
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">✍️ Handwritten Balanced Equation</div>
              <div class="handwritten-reaction-strip" style="margin-top: 4px;">
                ${activeTest.chemicalEquationB}
              </div>
            </div>
          </div>

          <!-- Marking Advice Box -->
          <div class="notebook-ruled-paper" style="border-left: 4px solid #3b82f6 !important; padding: 14px 18px; font-size: 13.5px; color: #1e40af;">
            <strong style="text-transform: uppercase; font-size: 11px; letter-spacing: 0.04em;">✍️ CBSE Examiner Distinction Criterion:</strong> In board examinations, simply writing "Reaction takes place" carries 0 marks. You MUST clearly state the specific visible observation (e.g., "Yellow precipitate of CHI₃", "Silver mirror on test tube walls", "Brisk effervescence of CO₂", "Pungent foul odor of carbylamine") and write the balanced chemical equation.
          </div>
        </div>
      </div>
    `;
    }
    renderSyntheticRoadmaps() {
        const activeRoadmap = cbseSyntheticRoadmaps.find(r => r.id === this.selectedRoadmapId) || cbseSyntheticRoadmaps[0];
        return `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 24px;">
        <!-- Left Side: Roadmap List -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 12px;">Standard Synthetic Roadmaps</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${cbseSyntheticRoadmaps.map(r => {
            const isSelected = r.id === this.selectedRoadmapId;
            return `
                <button class="roadmap-select-btn" data-id="${r.id}" style="text-align: left; padding: 12px; border: 1px solid ${isSelected ? '#059669' : '#f3f4f6'}; border-radius: 8px; background: ${isSelected ? '#ecfdf5' : '#f9fafb'}; cursor: pointer;">
                  <div style="font-size: 11px; font-weight: 700; color: #059669; margin-bottom: 4px;">${r.numberOfSteps} Steps Conversion</div>
                  <div style="font-size: 13px; font-weight: 700; color: #1f2937;">${r.title}</div>
                </button>
              `;
        }).join('')}
          </div>
        </div>

        <!-- Right Side: Step-by-Step Pathway Cards -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
          <div style="margin-bottom: 20px;">
            <span style="font-size: 12px; font-weight: 700; background: #d1fae5; color: #065f46; padding: 3px 8px; border-radius: 6px;">${activeRoadmap.strategyHeading}</span>
            <h2 style="margin: 8px 0 4px 0; font-size: 22px; font-weight: 800; color: #111827;">${activeRoadmap.title}</h2>
            <div style="font-size: 13px; color: #4b5563;">Convert: <strong>${activeRoadmap.startingMaterial}</strong> -> <strong>${activeRoadmap.targetProduct}</strong></div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${activeRoadmap.steps.map(s => `
              <div style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; background: #ffffff; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 12px; font-weight: 700; background: #f3f4f6; color: #374151; padding: 2px 8px; border-radius: 4px;">Step ${s.stepNumber}: ${s.reactionType}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
                  <div>
                    <div style="font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase;">Reagents & Conditions</div>
                    <div style="font-size: 13.5px; font-weight: 600; color: #059669;">${s.reagentAndCondition}</div>
                  </div>
                  <div>
                    <div style="font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase;">Product / Intermediate</div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #1e3a8a;">${s.intermediateProduct}</div>
                  </div>
                </div>
                <div style="font-size: 12px; color: #4b5563; background: #f9fafb; padding: 6px 10px; border-radius: 4px; border-left: 3px solid #10b981;">
                  <strong>Board Rationale:</strong> ${s.cbseKeyNote}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    }
    renderNamedReactions() {
        return `
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
          <div>
            <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #111827;">All 29 Official CBSE Named Reactions</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">Directly tested in Section B (2m) and Section C (3m) of the CBSE Chemistry paper.</p>
          </div>
          <input id="input-search-named" type="text" placeholder="Search named reactions..." style="padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; width: 240px;">
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 16px;">
          ${cbseNamedReactions.map((r) => `
            <div class="named-reaction-card notebook-ruled-paper" style="padding: 16px; border-left: 3.5px solid #059669;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px;">${r.chapterId}</span>
                <span style="font-size: 11px; font-weight: 700; color: #047857; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">${r.mechanismType}</span>
              </div>
              <h3 style="margin: 0 0 6px 0; font-size: 16.5px; font-weight: 800; color: #111827;">${r.name}</h3>
              <div style="font-size: 12px; color: #4b5563; margin-bottom: 8px;"><strong>Reagents:</strong> ${r.reagents} (${r.conditions})</div>
              <div class="handwritten-reaction-strip" style="font-size: 19px; padding: 10px 14px; margin-bottom: 8px; line-height: 1.45;">
                ${r.balancedEquation}
              </div>
              <div style="font-family: 'Caveat', 'Kalam', cursive; font-size: 18px; color: #334155; line-height: 1.4; font-weight: 600;">
                <strong style="font-family: system-ui, sans-serif; font-size: 11px; color: #64748b; text-transform: uppercase;">Synthetic Utility:</strong> ${r.syntheticUtility}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }
    bindEvents() {
        this.container.querySelector('#tab-distinction')?.addEventListener('click', () => {
            this.activeTab = 'distinction-solver';
            this.render();
        });
        this.container.querySelector('#tab-roadmaps')?.addEventListener('click', () => {
            this.activeTab = 'synthetic-roadmaps';
            this.render();
        });
        this.container.querySelector('#tab-named')?.addEventListener('click', () => {
            this.activeTab = 'named-reactions';
            this.render();
        });
        this.container.querySelectorAll('.distinction-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (id) {
                    this.selectedDistinctionId = id;
                    this.render();
                }
            });
        });
        this.container.querySelectorAll('.roadmap-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (id) {
                    this.selectedRoadmapId = id;
                    this.render();
                }
            });
        });
        const searchNamed = this.container.querySelector('#input-search-named');
        searchNamed?.addEventListener('input', () => {
            const q = searchNamed.value.toLowerCase().trim();
            this.container.querySelectorAll('.named-reaction-card').forEach(card => {
                const text = (card.textContent || '').toLowerCase();
                card.style.display = text.includes(q) ? 'block' : 'none';
            });
        });
    }
}
