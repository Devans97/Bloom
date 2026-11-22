/**
 * CBSE Class XII Chemistry (043) - Official Question Bank & Step-Marking Rubrics
 * 2026-2027 Examination Blueprint Standard
 * Authentic CBSE questions across Sections A to E with complete step-marking rubrics.
 */

export interface ChemistryStepRubricItem {
  step: string;
  marks: number;
}

export interface CBSEChemistryQuestion {
  id: string;
  chapterId: string;
  subjectId: 'chemistry';
  section: 'A' | 'B' | 'C' | 'D' | 'E';
  marks: 1 | 2 | 3 | 4 | 5;
  questionType: 'MCQ' | 'Assertion-Reason' | 'VSA' | 'SA' | 'Case-Study' | 'LA';
  questionText: string;
  mcqOptions?: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOption?: 'A' | 'B' | 'C' | 'D';
  casePassage?: string;
  subQuestions?: { questionNumber: string; text: string; marks: number }[];
  stepRubrics: ChemistryStepRubricItem[];
  modelAnswer: string;
  examinerNotes: string;
}

export const cbseChemistryQuestionBank: CBSEChemistryQuestion[] = [
  // SECTION A: 1-Mark MCQs
  {
    id: 'che-q-001',
    chapterId: 'chemistry-1-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'Which of the following concentration units is temperature-independent?',
    mcqOptions: [
      { key: 'A', text: 'Molarity (M)' },
      { key: 'B', text: 'Molality (m)' },
      { key: 'C', text: 'Normality (N)' },
      { key: 'D', text: 'Formality (F)' }
    ],
    correctOption: 'B',
    stepRubrics: [
      { step: 'Identify mass-based definition of molality: moles of solute per kg of solvent', marks: 0.5 },
      { step: 'Conclude that mass does not change with temperature, unlike volume', marks: 0.5 }
    ],
    modelAnswer: 'Option (B): Molality (m). Molality is defined as the number of moles of solute per kilogram of solvent. Since mass is invariant with temperature, molality is temperature-independent. In contrast, molarity and normality involve solution volume, which expands or contracts with temperature changes.',
    examinerNotes: 'Mole fraction and mass percentage are also temperature-independent, but molality is the standard board exam answer.'
  },
  {
    id: 'che-q-002',
    chapterId: 'chemistry-3-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'For a first-order chemical reaction, the unit of the rate constant k is:',
    mcqOptions: [
      { key: 'A', text: 'mol L^-1 s⁻¹' },
      { key: 'B', text: 'L mol^-1 s⁻¹' },
      { key: 'C', text: 's⁻¹' },
      { key: 'D', text: 'mol^2 L^-2 s⁻¹' }
    ],
    correctOption: 'C',
    stepRubrics: [
      { step: 'General formula for unit of k: (mol/L)^(1-n) s⁻¹', marks: 0.5 },
      { step: 'For n = 1: (mol/L)^0 s⁻¹ = s⁻¹', marks: 0.5 }
    ],
    modelAnswer: 'Option (C): s⁻¹. General unit of rate constant is (mol/L)^(1-n) · (time)^-1. For a first order reaction where n = 1: (mol/L)^(1-1) · s⁻¹ = s⁻¹ (or time^-1).',
    examinerNotes: 'Check units when identifying reaction order from numerical rate constants in word problems.'
  },
  {
    id: 'che-q-003',
    chapterId: 'chemistry-5-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'The IUPAC name of the complex [Co(NH3)5(CO3)]Cl is:',
    mcqOptions: [
      { key: 'A', text: 'Pentaamminecarbonatocobalt(III) chloride' },
      { key: 'B', text: 'Carbonatopentaamminecobalt(III) chloride' },
      { key: 'C', text: 'Pentaamminecarbonatocobalt(II) chloride' },
      { key: 'D', text: 'Pentaamminechlorocobalt(III) carbonate' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Alphabetical order of ligands: ammine before carbonato', marks: 0.5 },
      { step: 'Calculate oxidation state of Co: x + 0 - 2 = +1 => x = +3', marks: 0.5 }
    ],
    modelAnswer: 'Option (A): Pentaamminecarbonatocobalt(III) chloride. Ligands are listed alphabetically: "ammine" precedes "carbonato". Oxidation state: x + 5(0) + (-2) + (-1) = 0 => x = +3. Hence Cobalt(III).',
    examinerNotes: 'Spelling note: "ammine" has double m for NH3 ligand, unlike organic "amine" with single m.'
  },
  {
    id: 'che-q-004',
    chapterId: 'chemistry-6-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'Assertion-Reason',
    questionText: 'Assertion (A): tert-Butyl bromide undergoes nucleophilic substitution primarily by SN1 mechanism.\nReason (R): The tert-butyl carbocation intermediate is highly stabilized by 9 hyperconjugative structures and inductive effect.',
    mcqOptions: [
      { key: 'A', text: 'Both (A) and (R) are true, and (R) is the correct explanation of (A).' },
      { key: 'B', text: 'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).' },
      { key: 'C', text: '(A) is true, but (R) is false.' },
      { key: 'D', text: '(A) is false, but (R) is true.' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Evaluate Assertion: 3° alkyl halides prefer SN1 due to steric hindrance to backside attack (True)', marks: 0.5 },
      { step: 'Evaluate Reason: tert-butyl cation stability governs the rate-determining step in SN1 (True and explains A)', marks: 0.5 }
    ],
    modelAnswer: 'Option (A): Both (A) and (R) are true, and (R) is the correct explanation of (A). In SN1 mechanism, the rate-determining step is the formation of a carbocation. The tertiary carbocation (CH3)3C+ is stabilized by the +I inductive effect of three methyl groups and nine hyperconjugative alpha-hydrogens, lowering activation energy for C-Br heterolysis.',
    examinerNotes: 'SN1 reactivity order is strictly 3° > 2° > 1° > methyl.'
  },

  // SECTION B: 2-Mark VSA Questions
  {
    id: 'che-q-005',
    chapterId: 'chemistry-1-1',
    subjectId: 'chemistry',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'State Henry’s law. Mention two important practical or industrial applications of Henry’s law.',
    stepRubrics: [
      { step: 'Statement of Henry’s law with mathematical equation: p = KH · x', marks: 1.0 },
      { step: 'Two applications: Carbonated soft drinks under pressure, and scuba diving tanks with He dilution to prevent bends', marks: 1.0 }
    ],
    modelAnswer: '1. Henry’s Law states that at a constant temperature, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas present above the surface of the liquid or solution: p = KH · x, where p is partial pressure, x is mole fraction of gas, and KH is Henry’s law constant.\n2. Applications:\n- In the manufacture of carbonated soft drinks, the bottle is sealed under high pressure to increase the solubility of CO2 gas.\n- Deep-sea scuba divers breathe air diluted with 11.7% Helium to avoid painful and fatal decompression sickness ("the bends") caused by nitrogen gas bubbles forming in the blood when ascending.',
    examinerNotes: 'A higher KH value at a given pressure indicates LOWER gas solubility.'
  },
  {
    id: 'che-q-006',
    chapterId: 'chemistry-7-1',
    subjectId: 'chemistry',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'How will you distinguish between Ethanol and Propan-2-ol, and between Propan-1-ol and Propan-2-ol using simple chemical tests? Give chemical equations.',
    stepRubrics: [
      { step: 'Distinguish Propan-1-ol from Propan-2-ol using Iodoform Test with yellow ppt equation for Propan-2-ol', marks: 1.0 },
      { step: 'Distinguish Ethanol from Propan-2-ol using Lucas Reagent (turbidity time difference)', marks: 1.0 }
    ],
    modelAnswer: '1. Propan-1-ol and Propan-2-ol (Iodoform Test):\nPropan-2-ol contains the CH3-CH(OH)- group and gives a positive Iodoform test: upon warming with I2 and aqueous NaOH, it forms a bright yellow precipitate of Iodoform (CHI3) with a characteristic medicinal smell.\nCH3-CH(OH)-CH3 + 4 I2 + 6 NaOH -> CHI3 (yellow ppt) + CH3-COONa + 5 NaI + 5 H2O\nPropan-1-ol gives NO yellow precipitate.\n\n2. Ethanol and Propan-2-ol (Lucas Test):\nEthanol is a primary (1°) alcohol and does not produce turbidity at room temperature with Lucas reagent (anhyd. ZnCl2 + conc. HCl).\nPropan-2-ol is a secondary (2°) alcohol and produces turbidity within 5 minutes at room temperature due to insoluble alkyl chloride formation.',
    examinerNotes: 'Lucas test only works to distinguish between different classes of alcohols (1° vs 2° vs 3°), not within the same class.'
  },

  // SECTION C: 3-Mark SA Questions
  {
    id: 'che-q-007',
    chapterId: 'chemistry-2-1',
    subjectId: 'chemistry',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Calculate the EMF of the following cell at 298 K:\nMg(s) | Mg2+(0.001 M) || Cu2+(0.0001 M) | Cu(s)\nGiven: E°(Mg2+/Mg) = -2.37 V, E°(Cu2+/Cu) = +0.34 V. (log 10 = 1).',
    stepRubrics: [
      { step: 'Write overall cell redox reaction and identify n = 2 electrons', marks: 0.5 },
      { step: 'Calculate E°_cell = E0_cathode - E0_anode = +0.34 - (-2.37) = +2.71 V', marks: 0.5 },
      { step: 'Write Nernst equation: E_cell = E°_cell - (0.0591 / n) · log([Mg2+] / [Cu2+])', marks: 1.0 },
      { step: 'Substitute concentrations and calculate final EMF with correct unit (V)', marks: 1.0 }
    ],
    modelAnswer: '1. Cell Reaction:\nAnode (oxidation): Mg(s) -> Mg2+(aq) + 2 e-\nCathode (reduction): Cu2+(aq) + 2 e- -> Cu(s)\nOverall: Mg(s) + Cu2+(aq) -> Mg2+(aq) + Cu(s) [n = 2 moles of electrons]\n\n2. Standard EMF:\nE0_cell = E0_cathode - E0_anode = E°(Cu2+/Cu) - E°(Mg2+/Mg)\nE0_cell = 0.34 - (-2.37) = 0.34 + 2.37 = +2.71 V.\n\n3. Nernst Equation at 298 K:\nE_cell = E°_cell - (0.0591 / n) · log10( [Mg2+] / [Cu2+] )\nE_cell = 2.71 - (0.0591 / 2) · log10( 0.001 / 0.0001 )\nE_cell = 2.71 - 0.02955 · log10( 10 )\nSince log10(10) = 1:\nE_cell = 2.71 - 0.02955 = 2.68045 V ≈ 2.68 V.',
    examinerNotes: 'Check signs when calculating E°_cell; subtracting a negative standard potential results in addition.'
  },
  {
    id: 'che-q-008',
    chapterId: 'chemistry-3-1',
    subjectId: 'chemistry',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'A first-order reaction takes 40 minutes for 30% decomposition. Calculate its half-life (t₁/₂). (Given: log 10 = 1, log 7 = 0.8451).',
    stepRubrics: [
      { step: 'State first-order rate formula: k = (2.303 / t) · log([R]₀ / [R])', marks: 0.5 },
      { step: 'Identify [R] = [R]₀ - 0.30[R]₀ = 0.70[R]₀', marks: 0.5 },
      { step: 'Calculate k = (2.303 / 40) · log(10 / 7)', marks: 1.0 },
      { step: 'Calculate t₁/₂ = 0.693 / k with correct unit (min)', marks: 1.0 }
    ],
    modelAnswer: '1. For a first order reaction:\nk = (2.303 / t) · log10( [R]₀ / [R] )\nAt t = 40 min, 30% decomposition has occurred, so [R] = 100 - 30 = 70 (or 0.70 [R]₀).\n\n2. Compute rate constant k:\nk = (2.303 / 40) · log10( 100 / 70 ) = (2.303 / 40) · log10( 10 / 7 )\nlog10(10 / 7) = log10(10) - log10(7) = 1.0000 - 0.8451 = 0.1549\nk = (2.303 / 40) · 0.1549 = 0.3567 / 40 = 0.008918 min⁻¹.\n\n3. Calculate Half-Life (t₁/₂):\nt_1/2 = 0.693 / k = 0.693 / 0.008918 = 77.7 min.',
    examinerNotes: 'Common student error is taking [R] = 30 instead of the remaining concentration [R] = 70.'
  },

  // SECTION D: 4-Mark Case-Study Question
  {
    id: 'che-q-009',
    chapterId: 'chemistry-1-1',
    subjectId: 'chemistry',
    section: 'D',
    marks: 4,
    questionType: 'Case-Study',
    questionText: 'Read the following passage and answer the questions that follow:\n\nColligative properties of solutions depend exclusively on the number of solute particles and not on their chemical nature. When a solute undergoes dissociation or association in a solvent, the observed colligative properties deviate from theoretically calculated values. To account for this discrepancy, van ’t Hoff introduced factor i, defined as the ratio of normal molar mass to observed abnormal molar mass: i = Normal Molar Mass / Observed Molar Mass = Total moles of particles after association/dissociation / Initial moles of particles. For association, i < 1, while for dissociation, i > 1.',
    subQuestions: [
      {
        questionNumber: '(i)',
        text: 'What is the expected value of van ’t Hoff factor i for an aqueous solution of potassium ferrocyanide K4[Fe(CN)6] assuming complete dissociation?',
        marks: 1
      },
      {
        questionNumber: '(ii)',
        text: 'Why does benzoic acid dissolved in benzene show a van ’t Hoff factor close to 0.5?',
        marks: 1
      },
      {
        questionNumber: '(iii)',
        text: 'A 0.01 M aqueous solution of AlCl3 has a higher boiling point elevation than a 0.01 M aqueous solution of NaCl. Explain why with numerical van ’t Hoff factors.',
        marks: 2
      }
    ],
    stepRubrics: [
      { step: 'Part (i): Dissociation into 4 K+ and 1 [Fe(CN)6]4- => i = 5', marks: 1.0 },
      { step: 'Part (ii): Benzoic acid dimerizes via intermolecular hydrogen bonding in non-polar benzene (2 C6H5COOH <=> (C6H5COOH)2) => i = 1/2 = 0.5', marks: 1.0 },
      { step: 'Part (iii): AlCl3 dissociates into 4 ions (i = 4) whereas NaCl dissociates into 2 ions (i = 2)', marks: 1.0 },
      { step: 'Part (iii): Δ Tb = i · Kb · m => AlCl3 produces twice as many particles, doubling boiling point elevation', marks: 1.0 }
    ],
    modelAnswer: '(i) Complete dissociation of potassium ferrocyanide:\nK4[Fe(CN)6](aq) -> 4 K+(aq) + [Fe(CN)6]4-(aq)\nTotal particles = 4 + 1 = 5 ions. Therefore, van ’t Hoff factor i = 5.\n\n(ii) In non-polar solvents like benzene, benzoic acid undergoes dimerization due to intermolecular hydrogen bonding between two molecules forming a cyclic dimer:\n2 C6H5COOH <=> (C6H5COOH)2\nTwo molecules associate into one particle, so i = 1/2 = 0.5.\n\n(iii) Elevation in boiling point is given by Δ Tb = i · Kb · m.\n- For NaCl: NaCl -> Na+ + Cl- (2 ions, i = 2), so effective concentration = 2 · 0.01 = 0.02 molal.\n- For AlCl3: AlCl3 -> Al3+ + 3 Cl- (4 ions, i = 4), so effective concentration = 4 · 0.01 = 0.04 molal.\nSince AlCl3 produces double the number of particles in solution compared to equimolar NaCl, its boiling point elevation Δ Tb is twice as large.',
    examinerNotes: 'Check part (i): students often break coordination entity [Fe(CN)6] into 6 cyanides and iron, which is incorrect because the complex ion does not ionize.'
  },

  // SECTION E: 5-Mark Long Answer Question
  {
    id: 'che-q-010',
    chapterId: 'chemistry-8-1',
    subjectId: 'chemistry',
    section: 'E',
    marks: 5,
    questionType: 'LA',
    questionText: '(a) An organic compound (A) with molecular formula C8H8O forms an orange-red precipitate with 2,4-DNP reagent and gives a yellow precipitate on heating with I2 in the presence of NaOH. It neither reduces Tollens’ nor Fehling’s reagent, nor does it decolorize bromine water or Baeyer’s reagent. On drastic oxidation with chromic acid, it gives a carboxylic acid (B) having molecular formula C7H6O2. Identify compounds (A) and (B) and write the chemical reactions involved.\n(b) Write the mechanism of acid-catalyzed dehydration of ethanol to yield ethene.',
    stepRubrics: [
      { step: 'Deduce compound (A) as Acetophenone (C6H5-CO-CH3) from 2,4-DNP and iodoform tests', marks: 1.0 },
      { step: 'Deduce compound (B) as Benzoic acid (C6H5-COOH) from oxidation', marks: 1.0 },
      { step: 'Write chemical equations for iodoform test and oxidation', marks: 1.0 },
      { step: 'Step 1 of dehydration: Protonation of ethanol to oxonium ion', marks: 0.5 },
      { step: 'Step 2 of dehydration: Carbocation formation (rate-determining step)', marks: 1.0 },
      { step: 'Step 3 of dehydration: Elimination of proton to form ethene', marks: 0.5 }
    ],
    modelAnswer: '(a) Deduction of Compounds (A) and (B):\n1. (A) forms orange-red precipitate with 2,4-DNP, indicating it contains a carbonyl group (>C=O).\n2. (A) gives a yellow precipitate with I2 and NaOH, proving it contains a methyl ketone group (-CO-CH3).\n3. (A) does not reduce Tollens’ or Fehling’s reagent, so it is a ketone, not an aldehyde.\n4. (A) does not decolorize Br2 water, indicating no aliphatic carbon-carbon double bonds.\n5. Subtracting -CO-CH3 (C2H3O) from C8H8O leaves C6H5-, which is a phenyl ring.\nTherefore, Compound (A) is Acetophenone (C6H5-CO-CH3).\n6. Drastic oxidation of acetophenone with chromic acid oxidizes the side chain to Benzoic acid (C6H5-COOH), which matches formula C7H6O2. Hence Compound (B) is Benzoic acid.\nReactions:\n- Iodoform: C6H5-CO-CH3 + 3 I2 + 4 NaOH -> CHI3 (yellow ppt) + C6H5-COONa + 3 NaI + 3 H2O\n- Oxidation: C6H5-CO-CH3 + [O] --K2Cr2O7/H2SO4--> C6H5-COOH + CO2 + H2O\n\n(b) Mechanism of Dehydration of Ethanol (at 443 K):\n- Step 1: Protonation of alcohol:\nCH3-CH2-OH + H+ <=> CH3-CH2-OH2+ (Protonated alcohol / Ethyloxonium ion) [Fast]\n- Step 2: Formation of carbocation (Slow, rate-determining step):\nCH3-CH2-OH2+ --slow--> CH3-CH2+ (Ethyl carbocation) + H2O\n- Step 3: Deprotonation to form alkene:\nCH3-CH2+ -> CH2=CH2 (Ethene) + H+ [Fast]',
    examinerNotes: 'Dehydration at 443 K produces ethene (elimination); dehydration at 413 K produces diethyl ether (substitution).'
  },
  {
    id: 'che-q-011',
    chapterId: 'chemistry-4-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'Assertion-Reason',
    questionText: 'Given below are two statements labeled Assertion (A) and Reason (R).\nAssertion (A): The basic character of hydroxides of lanthanoids decreases from La(OH)3 to Lu(OH)3.\nReason (R): Due to lanthanoid contraction, the ionic size of Ln^(3+) decreases from La^(3+) to Lu^(3+), which increases the covalent character of the Ln-OH bond according to Fajan\'s rules.',
    mcqOptions: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A).' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).' },
      { key: 'C', text: '(A) is true but (R) is false.' },
      { key: 'D', text: '(A) is false and (R) is also false.' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Correct option A with reasoning linking smaller cation size to higher polarising power and covalency', marks: 1.0 }
    ],
    modelAnswer: 'Correct Option: (A). As we move from La^(3+) to Lu^(3+), the ionic radius decreases continuously due to lanthanoid contraction. According to Fajan\'s rules, smaller cations have higher charge density and polarising power, which increases the covalent character of the Ln-OH bond and makes cleaving the bond to release OH^- ions more difficult. Therefore, basic strength decreases from La(OH)3 (most basic) to Lu(OH)3 (least basic).',
    examinerNotes: 'Direct application of Lanthanoid contraction consequences and Fajan\'s rules.'
  },
  {
    id: 'che-q-012',
    chapterId: 'chemistry-5-1',
    subjectId: 'chemistry',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'The IUPAC name of the coordination compound [Co(NH3)5(CO3)]Cl is:',
    mcqOptions: [
      { key: 'A', text: 'Pentaamminecarbonatocobalt(III) chloride' },
      { key: 'B', text: 'Carbonatopentaamminecobalt(III) chloride' },
      { key: 'C', text: 'Pentaamminecarbonatocobalt(II) chloride' },
      { key: 'D', text: 'Pentaamminechlorocobalt(III) carbonate' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Option A: alphabetical ligand order (ammine before carbonato) and cobalt in +3 oxidation state', marks: 1.0 }
    ],
    modelAnswer: 'Ligands are named alphabetically: "ammine" (NH3) precedes "carbonato" (CO3^(2-)). Oxidation state of cobalt: Co + 5(0) + (-2) + (-1) = 0 => Co = +3. Hence the IUPAC name is Pentaamminecarbonatocobalt(III) chloride. Option (A).',
    examinerNotes: 'Check oxidation state: carbonate has -2 charge and chloride has -1 charge.'
  },
  {
    id: 'che-q-013',
    chapterId: 'chemistry-9-1',
    subjectId: 'chemistry',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'How will you distinguish between primary (1°), secondary (2°), and tertiary (3°) aliphatic amines using the Hinsberg test? Write chemical observations and reactions involved.',
    stepRubrics: [
      { step: '1° amine forms N-alkylbenzenesulphonamide soluble in alkali (NaOH) due to acidic H on nitrogen', marks: 1.0 },
      { step: '2° amine forms N,N-dialkylbenzenesulphonamide insoluble in alkali; 3° amine does not react', marks: 1.0 }
    ],
    modelAnswer: 'The Hinsberg reagent is benzenesulphonyl chloride (C6H5SO2Cl).\n1. Primary (1°) Amine: Reacts with C6H5SO2Cl to form N-alkylbenzenesulphonamide. The hydrogen attached to nitrogen is strongly acidic due to the strong electron-withdrawing sulphonyl group (-SO2-). Hence, it dissolves readily in aqueous potassium hydroxide or sodium hydroxide:\nC6H5SO2Cl + R-NH2 -> C6H5SO2NH-R (ppt) + HCl; C6H5SO2NH-R + KOH -> C6H5SO2N^-(K^+)R (clear soluble solution) + H2O.\n\n2. Secondary (2°) Amine: Reacts to form N,N-dialkylbenzenesulphonamide. Since it lacks any acidic hydrogen atom attached to nitrogen, the precipitate is completely insoluble in alkali (NaOH/KOH):\nC6H5SO2Cl + R2NH -> C6H5SO2NR2 (insoluble ppt) + HCl.\n\n3. Tertiary (3°) Amine: Does not possess any replaceable hydrogen on nitrogen, so it does NOT react with benzenesulphonyl chloride under ordinary conditions.',
    examinerNotes: 'Crucial to specify solubility in alkali (1° soluble, 2° insoluble).'
  },
  {
    id: 'che-q-014',
    chapterId: 'chemistry-2-1',
    subjectId: 'chemistry',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Calculate the electromotive force (emf) of the following electrochemical cell at 298 K:\nNi(s) | Ni^(2+) (0.01 M) || Ag^+ (0.1 M) | Ag(s)\nGiven: E°(Ni2+/Ni) = -0.25 V and E°(Ag+/Ag) = +0.80 V. (log 10 = 1).',
    stepRubrics: [
      { step: 'Balanced cell reaction Ni + 2 Ag+ -> Ni2+ + 2 Ag and n = 2 electrons', marks: 0.5 },
      { step: 'Standard cell potential E°_cell = E0_cathode - E0_anode = +0.80 - (-0.25) = +1.05 V', marks: 0.5 },
      { step: 'Nernst equation formula E_cell = E° - (0.0591 / n) · log([Ni2+] / [Ag+]^2)', marks: 1.0 },
      { step: 'Log substitution log(0.01 / 0.01) = log(1) = 0 => E_cell = 1.05 V', marks: 1.0 }
    ],
    modelAnswer: '1. Cell Reactions:\nAnode (oxidation): Ni(s) -> Ni^(2+)(aq) + 2 e^-\nCathode (reduction): 2 Ag^+(aq) + 2 e^- -> 2 Ag(s)\nOverall cell reaction: Ni(s) + 2 Ag^+(aq) -> Ni^(2+)(aq) + 2 Ag(s)\nNumber of electrons transferred: n = 2.\n\n2. Standard Cell Potential:\nE^0_cell = E^0_cathode - E^0_anode = E°(Ag+/Ag) - E°(Ni2+/Ni)\nE^0_cell = +0.80 V - (-0.25 V) = +1.05 V.\n\n3. Nernst Equation at 298 K:\nE_cell = E°_cell - (0.0591 / n) · log Q\nE_cell = 1.05 - (0.0591 / 2) · log([Ni^(2+)] / [Ag^+]^2)\n\n4. Substituting Concentrations:\n[Ni^(2+)] = 0.01 M = 10⁻² M\n[Ag^+] = 0.1 M = 10⁻¹ M => [Ag^+]^2 = (10⁻¹)^2 = 10⁻² M\nQ = [Ni^(2+)] / [Ag^+]^2 = 10⁻² / 10⁻² = 1\nlog Q = log(1) = 0.\n\nTherefore: E_cell = 1.05 - (0.0591 / 2) · 0 = +1.05 V.',
    examinerNotes: 'Crucial: [Ag+] must be squared in the reaction quotient Q.'
  },
  {
    id: 'che-q-015',
    chapterId: 'chemistry-2-1',
    subjectId: 'chemistry',
    section: 'D',
    marks: 4,
    questionType: 'Case-Study',
    questionText: 'Read the following passage on Lead Storage Batteries and answer the sub-questions that follow:',
    casePassage: 'A secondary battery is one which, after being discharged, can be recharged by passing an electric current through it in the opposite direction. The most widely used secondary cell is the Lead Storage Battery utilized in automobiles and inverters. It consists of a lead anode and a grid of lead packed with lead dioxide (PbO2) as the cathode, with an electrolytic solution of 38% sulfuric acid (density ~ 1.30 g/mL). During discharge, spongy lead is oxidized and lead dioxide is reduced, both forming insoluble lead sulfate (PbSO4) while consuming sulfuric acid, which decreases the density of the electrolyte.',
    subQuestions: [
      { questionNumber: '1', text: 'Write the overall chemical reaction that occurs during the discharge of a lead storage battery.', marks: 1 },
      { questionNumber: '2', text: 'Why does the density of sulfuric acid decrease during discharge?', marks: 1 },
      { questionNumber: '3', text: 'Write the cathode reaction during the recharging of the lead storage battery.', marks: 2 }
    ],
    stepRubrics: [
      { step: 'Subpart 1: Pb(s) + PbO2(s) + 2 H2SO4(aq) -> 2 PbSO4(s) + 2 H2O(l)', marks: 1.0 },
      { step: 'Subpart 2: H2SO4 is consumed and water is produced during discharge, diluting the electrolyte', marks: 1.0 },
      { step: 'Subpart 3: Reversed cathode reaction on recharging: PbSO4(s) + 2 H2O(l) -> PbO2(s) + SO4^(2-) + 4 H^+ + 2 e^-', marks: 2.0 }
    ],
    modelAnswer: '1. Overall Discharge Reaction:\nPb(s) + PbO2(s) + 2 H2SO4(aq) -> 2 PbSO4(s) + 2 H2O(l)\n\n2. H2SO4 is consumed in the reaction while water is produced, which dilutes the electrolytic solution and lowers its specific gravity (density drops from 1.30 g/mL to below 1.20 g/mL).\n\n3. During recharging, external current reverses the cell reactions. The positive electrode (cathode during discharge) now acts as the anode of an electrolytic cell:\nPbSO4(s) + 2 H2O(l) -> PbO2(s) + SO4^(2-)(aq) + 4 H^+(aq) + 2 e^-.\n(At the other electrode: PbSO4(s) + 2 e^- -> Pb(s) + SO4^(2-)(aq)).',
    examinerNotes: 'Check that student specifies recharging reverses the electrode processes.'
  }
];

export const chemistryQuestionById = (id: string): CBSEChemistryQuestion | undefined =>
  cbseChemistryQuestionBank.find(q => q.id === id);

export const chemistryQuestionsForSection = (section: 'A' | 'B' | 'C' | 'D' | 'E'): CBSEChemistryQuestion[] =>
  cbseChemistryQuestionBank.filter(q => q.section === section);
