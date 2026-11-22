/**
 * Interactive CBSE Class XII Physical Education (Code 048) Studio UI
 * Provides automated Knockout & League Fixture computation with Bye distributions,
 * Postural Deformity corrective therapy, and Lifestyle Disease Yoga Protocols.
 */
import { calculateKnockoutFixture, calculateLeagueMatches, calculateHarvardFitnessIndex, cbsePosturalDeformities, cbseLifestyleYogaProtocols, cbseBiomechanicsTopics, priceProtocolDetails } from './data/cbse-pe-mastery.js';
import { icon } from './icons.js';
export class PEStudioUI {
    mount;
    activeTab = 'fixtures';
    teamsCount = 11;
    selectedDeformityId = 'def-kyphosis';
    selectedDiseaseId = 'lifestyle-obesity';
    // PFI form state
    pfiDuration = 300;
    pfiPulse1 = 75;
    pfiPulse2 = 65;
    pfiPulse3 = 55;
    constructor(mount) {
        this.mount = mount;
    }
    render() {
        this.mount.innerHTML = `
      <div class="pe-studio-container" style="max-width: 1040px; margin: 0 auto; padding: 1.5rem 1rem;">
        <header class="studio-header" style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
            <span style="background: rgba(16, 185, 129, 0.12); color: #047857; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em;">CBSE XII · Physical Education 048</span>
            <span style="font-size: 0.85rem; color: var(--muted, #64748b);">Official 70-Mark Theory Reference</span>
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 0.5rem 0; color: var(--text, #0f172a);">PE Mastery & Tournament Studio</h1>
          <p style="color: var(--muted, #64748b); font-size: 1rem; margin: 0;">Official Knockout fixture generator, Bye calculations, postural corrective therapies, and sports biomechanics.</p>
        </header>

        <!-- Studio Navigation Tabs -->
        <nav class="studio-tabs" style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border, #e2e8f0); margin-bottom: 1.75rem; overflow-x: auto;">
          <button class="studio-tab-btn ${this.activeTab === 'fixtures' ? 'active' : ''}" data-tab="fixtures" style="padding: 0.75rem 1.1rem; font-weight: 600; font-size: 0.9rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'fixtures' ? '#10b981' : 'transparent'}; color: ${this.activeTab === 'fixtures' ? '#047857' : 'var(--muted, #64748b)'}; cursor: pointer; white-space: nowrap;">
            ${icon('trophy')} Fixture Calculator
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'posture' ? 'active' : ''}" data-tab="posture" style="padding: 0.75rem 1.1rem; font-weight: 600; font-size: 0.9rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'posture' ? '#10b981' : 'transparent'}; color: ${this.activeTab === 'posture' ? '#047857' : 'var(--muted, #64748b)'}; cursor: pointer; white-space: nowrap;">
            ${icon('activity')} Postural Deformities
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'yoga' ? 'active' : ''}" data-tab="yoga" style="padding: 0.75rem 1.1rem; font-weight: 600; font-size: 0.9rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'yoga' ? '#10b981' : 'transparent'}; color: ${this.activeTab === 'yoga' ? '#047857' : 'var(--muted, #64748b)'}; cursor: pointer; white-space: nowrap;">
            ${icon('sparkles')} Yoga & Lifestyle
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'biomechanics' ? 'active' : ''}" data-tab="biomechanics" style="padding: 0.75rem 1.1rem; font-weight: 600; font-size: 0.9rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'biomechanics' ? '#10b981' : 'transparent'}; color: ${this.activeTab === 'biomechanics' ? '#047857' : 'var(--muted, #64748b)'}; cursor: pointer; white-space: nowrap;">
            ${icon('zap')} Biomechanics
          </button>
          <button class="studio-tab-btn ${this.activeTab === 'pfi' ? 'active' : ''}" data-tab="pfi" style="padding: 0.75rem 1.1rem; font-weight: 600; font-size: 0.9rem; background: none; border: none; border-bottom: 2px solid ${this.activeTab === 'pfi' ? '#10b981' : 'transparent'}; color: ${this.activeTab === 'pfi' ? '#047857' : 'var(--muted, #64748b)'}; cursor: pointer; white-space: nowrap;">
            ${icon('heart')} PFI Calculator & PRICE
          </button>
        </nav>

        <main id="pe-studio-content">
          ${this.renderActiveTabContent()}
        </main>
      </div>
    `;
        this.bindEvents();
    }
    renderActiveTabContent() {
        if (this.activeTab === 'fixtures')
            return this.renderFixturesTab();
        if (this.activeTab === 'posture')
            return this.renderPostureTab();
        if (this.activeTab === 'yoga')
            return this.renderYogaTab();
        if (this.activeTab === 'biomechanics')
            return this.renderBiomechanicsTab();
        if (this.activeTab === 'pfi')
            return this.renderPFITab();
        return '';
    }
    renderFixturesTab() {
        const calc = calculateKnockoutFixture(this.teamsCount);
        const leagueMatches = calculateLeagueMatches(this.teamsCount);
        return `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left input panel -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 1rem 0;">Tournament Parameters</h3>
          
          <label style="display: block; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.5rem;">
            Total Number of Teams (N):
            <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
              <input type="number" id="teams-input" min="2" max="64" value="${this.teamsCount}" style="width: 100%; padding: 0.5rem 0.75rem; border: 1px solid var(--border, #cbd5e1); border-radius: 6px; font-size: 1rem; font-weight: 700;">
              <button id="calc-fixture-btn" style="padding: 0.5rem 1rem; background: #10b981; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">Solve</button>
            </div>
          </label>

          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.75rem;">
            <span style="font-size: 0.75rem; color: var(--muted, #64748b); width: 100%;">Popular CBSE Board Exam values:</span>
            ${[9, 11, 13, 17, 19, 21, 23, 27].map(n => `
              <button class="quick-team-btn" data-n="${n}" style="padding: 0.25rem 0.5rem; font-size: 0.78rem; border: 1px solid var(--border, #cbd5e1); background: ${this.teamsCount === n ? '#dcfce7' : '#f8fafc'}; color: ${this.teamsCount === n ? '#15803d' : '#334155'}; border-radius: 4px; cursor: pointer; font-weight: 600;">
                N = ${n}
              </button>
            `).join('')}
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border, #e2e8f0);">
            <strong style="font-size: 0.8rem; text-transform: uppercase; color: var(--muted, #64748b);">Quick Formulas</strong>
            <ul style="margin: 0.5rem 0 0 1rem; font-size: 0.78rem; color: #475569; line-height: 1.5;">
              <li>Knockout Matches: <strong>N - 1</strong></li>
              <li>Next Power of 2: <strong>2<sup>n</sup></strong></li>
              <li>Byes: <strong>2<sup>n</sup> - N</strong></li>
              <li>Upper Half: <strong>(N + 1) / 2</strong></li>
              <li>Lower Half: <strong>(N - 1) / 2</strong></li>
              <li>Single League: <strong>N(N-1) / 2</strong></li>
            </ul>
          </div>
        </aside>

        <!-- Right calculation results -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 0.25rem 0;">Official CBSE Fixture Breakdown (N = ${this.teamsCount})</h2>
              <span style="font-size: 0.85rem; color: #047857; font-weight: 600;">Tournament Type: Single Elimination (Knockout)</span>
            </div>
            <span style="font-size: 0.85rem; background: #f0fdf4; color: #166534; padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 700; border: 1px solid #bbf7d0;">
              ${calc.numberOfRounds} Rounds
            </span>
          </div>

          <!-- Mathematical Deductions Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="notebook-ruled-paper" style="padding: 0.85rem; border-left: 3.5px solid #2563eb;">
              <small style="color: #1e40af; font-size: 0.75rem; text-transform: uppercase; font-weight: 700;">Total Matches</small>
              <div class="handwritten-math ink-royal-blue" style="font-size: 1.6rem; margin-top: 0.2rem;">${calc.totalMatches}</div>
              <small style="font-family: 'Caveat', 'Kalam', cursive; font-size: 1.05rem; color: #475569; font-weight: 600;">Formula: N - 1 = ${this.teamsCount} - 1</small>
            </div>
            <div class="notebook-ruled-paper" style="padding: 0.85rem; border-left: 3.5px solid #059669;">
              <small style="color: #047857; font-size: 0.75rem; text-transform: uppercase; font-weight: 700;">Total Byes</small>
              <div class="handwritten-math ink-topper-green" style="font-size: 1.6rem; margin-top: 0.2rem;">${calc.totalByes}</div>
              <small style="font-family: 'Caveat', 'Kalam', cursive; font-size: 1.05rem; color: #475569; font-weight: 600;">Formula: ${calc.nextPowerOfTwo} - ${this.teamsCount}</small>
            </div>
            <div class="notebook-ruled-paper" style="padding: 0.85rem; border-left: 3.5px solid #d97706;">
              <small style="color: #b45309; font-size: 0.75rem; text-transform: uppercase; font-weight: 700;">Upper / Lower Half</small>
              <div class="handwritten-math" style="font-size: 1.6rem; color: #b45309; margin-top: 0.2rem;">${calc.teamsUpperHalf} / ${calc.teamsLowerHalf}</div>
              <small style="font-family: 'Caveat', 'Kalam', cursive; font-size: 1.05rem; color: #475569; font-weight: 600;">Upper: ${calc.teamsUpperHalf} · Lower: ${calc.teamsLowerHalf}</small>
            </div>
            <div class="notebook-ruled-paper" style="padding: 0.85rem; border-left: 3.5px solid #7c3aed;">
              <small style="color: #6d28d9; font-size: 0.75rem; text-transform: uppercase; font-weight: 700;">Byes Distribution</small>
              <div class="handwritten-math" style="font-size: 1.6rem; color: #6d28d9; margin-top: 0.2rem;">${calc.byesUpperHalf} / ${calc.byesLowerHalf}</div>
              <small style="font-family: 'Caveat', 'Kalam', cursive; font-size: 1.05rem; color: #475569; font-weight: 600;">Upper: ${calc.byesUpperHalf} · Lower: ${calc.byesLowerHalf}</small>
            </div>
          </div>

          <!-- Step-by-Step Bye Assignment Sequence -->
          <div style="margin-bottom: 1.5rem; background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 8px; padding: 1rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; color: #9d174d; text-transform: uppercase; margin: 0 0 0.5rem 0;">CBSE Mandatory Bye Assignment Sequence</h4>
            <ol style="margin: 0; padding-left: 1.25rem; font-size: 0.82rem; color: #831843; line-height: 1.5;">
              ${calc.byeAssignmentRule.map(r => `<li>${r}</li>`).join('')}
            </ol>
          </div>

          <!-- Visual Fixture Preview Table -->
          <div>
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.6rem 0;">Round 1 Roster & Bye Placements</h4>
            <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead style="background: #f1f5f9; color: #475569; font-size: 0.75rem; text-transform: uppercase;">
                  <tr>
                    <th style="padding: 0.6rem 0.8rem; border-bottom: 1px solid #cbd5e1;">Team #</th>
                    <th style="padding: 0.6rem 0.8rem; border-bottom: 1px solid #cbd5e1;">Half</th>
                    <th style="padding: 0.6rem 0.8rem; border-bottom: 1px solid #cbd5e1;">Round 1 Status</th>
                    <th style="padding: 0.6rem 0.8rem; border-bottom: 1px solid #cbd5e1;">Advances To</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generateFixtureRows(calc)}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    `;
    }
    generateFixtureRows(calc) {
        const rows = [];
        const N = calc.totalTeams;
        const upperLimit = calc.teamsUpperHalf;
        for (let i = 1; i <= N; i++) {
            const isUpper = i <= upperLimit;
            const halfName = isUpper ? 'Upper Half' : 'Lower Half';
            // Simple indicator for bye based on standard allocation
            const hasBye = (calc.totalByes > 0) && (i === N || // 1st bye: Last of lower
                i === 1 || // 2nd bye: 1st of upper
                (calc.totalByes >= 3 && i === upperLimit + 1) || // 3rd bye: 1st of lower
                (calc.totalByes >= 4 && i === upperLimit) // 4th bye: Last of upper
            );
            rows.push(`
        <tr style="border-bottom: 1px solid #f1f5f9; background: ${hasBye ? '#f0fdf4' : '#ffffff'};">
          <td style="padding: 0.5rem 0.8rem; font-weight: 700;">Team ${i}</td>
          <td style="padding: 0.5rem 0.8rem; color: #64748b;">${halfName}</td>
          <td style="padding: 0.5rem 0.8rem;">
            ${hasBye ? '<span style="color: #15803d; font-weight: 700;">🌟 Awarded BYE</span>' : '<span style="color: #475569;">Plays Round 1 Match</span>'}
          </td>
          <td style="padding: 0.5rem 0.8rem; font-weight: 600; color: #0284c7;">
            ${hasBye ? 'Direct to Round 2' : 'Winner of R1 Match'}
          </td>
        </tr>
      `);
        }
        return rows.join('');
    }
    renderPostureTab() {
        const deformity = cbsePosturalDeformities.find(d => d.id === this.selectedDeformityId) || cbsePosturalDeformities[0];
        return `
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left selector -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1rem;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.75rem 0;">Common Deformities</h3>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${cbsePosturalDeformities.map(d => `
              <button class="deformity-select-btn ${d.id === this.selectedDeformityId ? 'selected' : ''}" data-def-id="${d.id}" style="text-align: left; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid ${d.id === this.selectedDeformityId ? '#10b981' : 'transparent'}; background: ${d.id === this.selectedDeformityId ? 'rgba(16, 185, 129, 0.08)' : 'transparent'}; color: ${d.id === this.selectedDeformityId ? '#047857' : 'var(--text, #1e293b)'}; font-weight: ${d.id === this.selectedDeformityId ? '700' : '500'}; font-size: 0.88rem; cursor: pointer;">
                <div>${d.name}</div>
                <small style="font-size: 0.75rem; color: var(--muted, #64748b);">Region: ${d.affectedRegion}</small>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Right deformity details -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <span style="font-size: 0.75rem; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700;">Region: ${deformity.affectedRegion}</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0.4rem 0 0.2rem 0;">${deformity.name}</h2>
            <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.45;">${deformity.anatomicalDescription}</p>
          </div>

          <!-- Primary Causes & Corrective Exercises -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem;">
              <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #b91c1c; margin: 0 0 0.4rem 0;">Primary Causes</h4>
              <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.8rem; color: #991b1b; line-height: 1.4;">
                ${deformity.primaryCauses.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
              <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #15803d; margin: 0 0 0.4rem 0;">Corrective Exercises</h4>
              <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.8rem; color: #166534; line-height: 1.4;">
                ${deformity.correctiveExercises.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Prescribed Yogic Asanas -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.5rem 0;">Prescribed Yogic Asanas for Correction</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${deformity.recommendedAsanas.map(a => `
                <span style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 0.82rem; font-weight: 700; padding: 0.35rem 0.65rem; border-radius: 6px;">
                  🧘 ${a}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Contraindications -->
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 0.85rem;">
            <strong style="font-size: 0.8rem; color: #92400e; text-transform: uppercase;">Medical Warning / Contraindications:</strong>
            <ul style="margin: 0.25rem 0 0 1.2rem; font-size: 0.8rem; color: #78350f;">
              ${deformity.contraindications.map(ci => `<li>${ci}</li>`).join('')}
            </ul>
          </div>
        </section>
      </div>
    `;
    }
    renderYogaTab() {
        const proto = cbseLifestyleYogaProtocols.find(p => p.id === this.selectedDiseaseId) || cbseLifestyleYogaProtocols[0];
        return `
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left selector -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1rem;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 0.75rem 0;">5 Lifestyle Diseases</h3>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            ${cbseLifestyleYogaProtocols.map(p => `
              <button class="disease-select-btn ${p.id === this.selectedDiseaseId ? 'selected' : ''}" data-dis-id="${p.id}" style="text-align: left; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid ${p.id === this.selectedDiseaseId ? '#10b981' : 'transparent'}; background: ${p.id === this.selectedDiseaseId ? 'rgba(16, 185, 129, 0.08)' : 'transparent'}; color: ${p.id === this.selectedDiseaseId ? '#047857' : 'var(--text, #1e293b)'}; font-weight: ${p.id === this.selectedDiseaseId ? '700' : '500'}; font-size: 0.88rem; cursor: pointer;">
                <div>${p.disease}</div>
                <small style="font-size: 0.75rem; color: var(--muted, #64748b);">${p.asanas.length} Prescribed Asanas</small>
              </button>
            `).join('')}
          </div>
        </aside>

        <!-- Right yoga protocol -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0 0 0.25rem 0;">Yoga Therapy for ${proto.disease}</h2>
            <p style="font-size: 0.88rem; color: #475569; margin: 0; line-height: 1.45;"><strong>Pathology:</strong> ${proto.pathology}</p>
          </div>

          <!-- Asanas Detailed Breakdown -->
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            ${proto.asanas.map(a => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.4rem;">
                  <strong style="font-size: 0.95rem; color: #047857;">${a.name}</strong>
                  <span style="font-size: 0.78rem; color: #64748b;">${a.englishTranslation}</span>
                </div>
                <div style="margin-bottom: 0.5rem;">
                  <strong style="font-size: 0.78rem; color: var(--muted, #64748b); text-transform: uppercase;">Procedure:</strong>
                  <ol style="margin: 0.2rem 0 0 1.2rem; font-size: 0.8rem; color: #334155; line-height: 1.4;">
                    ${a.procedureSteps.map(s => `<li>${s}</li>`).join('')}
                  </ol>
                </div>
                <div style="background: #f0fdf4; border-radius: 6px; padding: 0.5rem; margin-bottom: 0.4rem; font-size: 0.78rem; color: #166534;">
                  <strong>Physiological Benefits:</strong> ${a.physiologicalBenefits.join(' ')}
                </div>
                <div style="font-size: 0.75rem; color: #991b1b;">
                  <strong>Contraindications:</strong> ${a.contraindications.join(' ')}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
    }
    renderBiomechanicsTab() {
        return `
      <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <div style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 0.25rem 0;">Sports Biomechanics & Newton's Laws</h2>
          <p style="font-size: 0.9rem; color: var(--muted, #64748b); margin: 0;">Kinematic laws, lever mechanics, and angular momentum applied to high-performance sports.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${cbseBiomechanicsTopics.map(t => `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.25rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: #047857; margin: 0 0 0.3rem 0;">${t.title}</h3>
              <p style="font-size: 0.85rem; font-weight: 600; color: #1e293b; margin: 0 0 0.75rem 0;">${t.physicalPrinciple}</p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                ${t.cbseApplications.map(app => `
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.75rem;">
                    <strong style="font-size: 0.82rem; color: #0284c7;">🎯 ${app.sport}</strong>
                    <p style="font-size: 0.78rem; color: #334155; margin: 0.3rem 0; line-height: 1.35;">${app.mechanism}</p>
                    <small style="font-size: 0.75rem; color: #15803d; font-weight: 600;">Advantage: ${app.kineticAdvantage}</small>
                  </div>
                `).join('')}
              </div>

              <div style="background: #fefce8; border-left: 3px solid #eab308; padding: 0.5rem 0.75rem; font-size: 0.78rem; color: #854d0e;">
                <strong>Examiner Tip:</strong> ${t.examinerTips}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
    }
    renderPFITab() {
        const pfiRes = calculateHarvardFitnessIndex(this.pfiDuration, this.pfiPulse1, this.pfiPulse2, this.pfiPulse3);
        return `
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; align-items: start;">
        <!-- Left PFI Calculator -->
        <aside style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
          <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--muted, #64748b); margin: 0 0 1rem 0;">Harvard Step Test PFI</h3>

          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.6rem;">
            Test Duration (Seconds):
            <input type="number" id="pfi-dur" value="${this.pfiDuration}" min="30" max="300" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 0.2rem;">
          </label>

          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.6rem;">
            Pulse 1 (1 to 1.5 min):
            <input type="number" id="pfi-p1" value="${this.pfiPulse1}" min="30" max="150" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 0.2rem;">
          </label>

          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.6rem;">
            Pulse 2 (2 to 2.5 min):
            <input type="number" id="pfi-p2" value="${this.pfiPulse2}" min="30" max="150" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 0.2rem;">
          </label>

          <label style="display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 0.75rem;">
            Pulse 3 (3 to 3.5 min):
            <input type="number" id="pfi-p3" value="${this.pfiPulse3}" min="30" max="150" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 0.2rem;">
          </label>

          <button id="calc-pfi-btn" style="width: 100%; padding: 0.6rem; background: #10b981; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
            Compute PFI Score
          </button>

          <div style="margin-top: 1.25rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.85rem; text-align: center;">
            <small style="color: #166534; font-size: 0.75rem; text-transform: uppercase;">Fitness Index Score</small>
            <div style="font-size: 1.8rem; font-weight: 800; color: #15803d; margin: 0.2rem 0;">${pfiRes.pfi}</div>
            <span style="font-size: 0.82rem; font-weight: 700; background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px;">Rating: ${pfiRes.rating}</span>
          </div>
        </aside>

        <!-- Right PRICE Protocol & Sports Injuries -->
        <section style="background: var(--surface, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <div style="border-bottom: 1px solid var(--border, #e2e8f0); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 0.25rem 0;">${priceProtocolDetails.description}</h2>
            <p style="font-size: 0.85rem; color: #b91c1c; font-weight: 600; margin: 0;">${priceProtocolDetails.contraindicationMnemonic}</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${priceProtocolDetails.steps.map(s => `
              <div style="display: flex; gap: 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem; align-items: center;">
                <div style="width: 38px; height: 38px; border-radius: 50%; background: #10b981; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">
                  ${s.letter}
                </div>
                <div>
                  <strong style="font-size: 0.9rem; color: #0f172a;">${s.name}</strong>
                  <p style="font-size: 0.8rem; color: #475569; margin: 0.2rem 0 0 0; line-height: 1.35;">${s.action}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    `;
    }
    bindEvents() {
        // Tab switching
        this.mount.querySelectorAll('.studio-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                if (tab) {
                    this.activeTab = tab;
                    this.render();
                }
            });
        });
        // Quick team buttons
        this.mount.querySelectorAll('.quick-team-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const n = Number(btn.dataset.n);
                if (n) {
                    this.teamsCount = n;
                    this.render();
                }
            });
        });
        // Custom team calculate button
        const calcBtn = this.mount.querySelector('#calc-fixture-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', () => {
                const input = this.mount.querySelector('#teams-input');
                if (input && Number(input.value) >= 2) {
                    this.teamsCount = Number(input.value);
                    this.render();
                }
            });
        }
        // Deformity selector
        this.mount.querySelectorAll('.deformity-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.defId;
                if (id) {
                    this.selectedDeformityId = id;
                    this.render();
                }
            });
        });
        // Disease selector
        this.mount.querySelectorAll('.disease-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.disId;
                if (id) {
                    this.selectedDiseaseId = id;
                    this.render();
                }
            });
        });
        // PFI calculate button
        const pfiBtn = this.mount.querySelector('#calc-pfi-btn');
        if (pfiBtn) {
            pfiBtn.addEventListener('click', () => {
                const dur = Number(this.mount.querySelector('#pfi-dur')?.value);
                const p1 = Number(this.mount.querySelector('#pfi-p1')?.value);
                const p2 = Number(this.mount.querySelector('#pfi-p2')?.value);
                const p3 = Number(this.mount.querySelector('#pfi-p3')?.value);
                if (dur && p1) {
                    this.pfiDuration = dur;
                    this.pfiPulse1 = p1;
                    this.pfiPulse2 = p2 || 0;
                    this.pfiPulse3 = p3 || 0;
                    this.render();
                }
            });
        }
    }
}
