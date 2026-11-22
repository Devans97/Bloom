/**
 * CBSE Class XII Chemistry (043) - Official Laboratory Manual & Practical Examination System
 * 2026-2027 Blueprint Standard (30 Marks Scheme)
 * Authentic Qualitative Salt Analysis Schemes (Acid & Basic Radicals),
 * Volumetric Redox Titrations (Mohr's Salt & Oxalic Acid vs KMnO4),
 * Organic Functional Group Systematic Tests, and Official External Examiner Viva-Voce Banks.
 */

import { FormulaSpec, PracticalObservationRow, VivaVoceItem } from './cbse-practicals-physics.js';

export interface ConfirmatoryTest {
  testName: string;
  procedure: string;
  observation: string;
  chemicalEquation: string;
}

export interface SaltRadicalSpec {
  radicalType: 'acid-radical-anion' | 'basic-radical-cation';
  name: string;
  formula: string;
  group: string;
  groupReagent: string;
  preliminaryTest: string;
  confirmatoryTests: ConfirmatoryTest[];
  interferingRadicalNote?: string;
}

export interface TitrationExperiment {
  id: string;
  title: string;
  aim: string;
  apparatusRequired: string[];
  chemicalReagents: string[];
  reactionTheory: string;
  ionicEquation: string;
  indicator: string;
  endPoint: string;
  molarityCalculationFormula: FormulaSpec;
  sampleTitrationData: PracticalObservationRow[];
  vivaVoceQuestions: VivaVoceItem[];
}

export interface FunctionalGroupTest {
  groupName: string;
  formula: string;
  reagent: string;
  procedure: string;
  observation: string;
  inference: string;
}

export const cbseSaltRadicals: SaltRadicalSpec[] = [
  // Anion: Carbonate (CO3 2-)
  {
    radicalType: 'acid-radical-anion',
    name: 'Carbonate',
    formula: 'CO₃²⁻',
    group: 'Dilute H2SO4 Group',
    groupReagent: 'Dilute Sulfuric Acid (H2SO4)',
    preliminaryTest: 'Treat pinch of salt with dil H2SO4: Brisk effervescence with evolution of colorless, odorless gas which turns lime water milky.',
    confirmatoryTests: [
      {
        testName: 'Lime Water Test',
        procedure: 'Pass the evolved gas through freshly prepared lime water [Ca(OH)2].',
        observation: 'Lime water turns milky due to insoluble CaCO3 precipitate; on prolonged passage of gas, milkiness disappears due to soluble Ca(HCO3)2.',
        chemicalEquation: 'Ca(OH)2 + CO2 -> CaCO3 (insoluble white) + H2O; CaCO3 + H2O + CO2 -> Ca(HCO3)2 (soluble)'
      },
      {
        testName: 'Magnesium Sulfate Test',
        procedure: 'To aqueous salt solution, add MgSO4 solution.',
        observation: 'White precipitate formed only on heating/boiling.',
        chemicalEquation: 'Mg^(2+) + 2 HCO3^- -(heat)-> MgCO3 v (white) + H2O + CO2'
      }
    ]
  },

  // Anion: Chloride (Cl-)
  {
    radicalType: 'acid-radical-anion',
    name: 'Chloride',
    formula: 'Cl⁻',
    group: 'Concentrated H2SO4 Group',
    groupReagent: 'Concentrated Sulfuric Acid (H2SO4)',
    preliminaryTest: 'Warm salt with conc. H2SO4: Pungent colorless choking gas (HCl) evolved giving dense white fumes when a glass rod dipped in NH4OH is brought near the test tube mouth.',
    confirmatoryTests: [
      {
        testName: 'Silver Nitrate (AgNO3) Test',
        procedure: 'Acidify water extract of salt with dilute HNO3, then add AgNO3 solution.',
        observation: 'Curdy white precipitate formed, which is insoluble in dilute HNO3 but completely soluble in ammonium hydroxide (NH4OH).',
        chemicalEquation: 'Cl^- + Ag^+ -> AgCl v (curdy white); AgCl + 2 NH4OH -> [Ag(NH3)2]^+ + Cl^- + 2 H2O (soluble diamminesilver complex)'
      },
      {
        testName: 'Chromyl Chloride Test',
        procedure: 'Mix solid salt with solid potassium dichromate (K2Cr2O7) in 1:2 ratio, add concentrated H2SO4 and heat gently. Pass evolved reddish-brown vapors into NaOH solution. Add lead acetate and acetic acid to yellow solution.',
        observation: 'Reddish-brown vapors of chromyl chloride (CrO2Cl2) turn NaOH yellow (Na2CrO4). Adding (CH3COO)2Pb gives a canary yellow precipitate of lead chromate (PbCrO4).',
        chemicalEquation: '4 NaCl + K2Cr2O7 + 6 H2SO4 -> 2 CrO2Cl2 ^ (red-brown) + 2 KHSO4 + 4 NaHSO4 + 3 H2O; CrO2Cl2 + 4 NaOH -> Na2CrO4 (yellow) + 2 NaCl + 2 H2O; Na2CrO4 + (CH3COO)2Pb -> PbCrO4 v (canary yellow) + 2 CH3COONa'
      }
    ]
  },

  // Anion: Nitrate (NO3-)
  {
    radicalType: 'acid-radical-anion',
    name: 'Nitrate',
    formula: 'NO₃⁻',
    group: 'Concentrated H2SO4 Group',
    groupReagent: 'Concentrated Sulfuric Acid (H2SO4) + Copper Turnings',
    preliminaryTest: 'Heat salt with conc H2SO4 and copper turnings: Dense reddish-brown gas (NO2) evolved and solution turns greenish-blue due to Cu(NO3)2 formation.',
    confirmatoryTests: [
      {
        testName: 'Brown Ring Test',
        procedure: 'To aqueous salt solution, add freshly prepared ferrous sulfate (FeSO4) solution. Incline the test tube and slowly pour concentrated H2SO4 along the inner wall without shaking.',
        observation: 'A dark brown ring of nitroso ferrous sulfate [Fe(H2O)5(NO)]^(2+) forms at the liquid junction interface.',
        chemicalEquation: 'NO3^- + 3 Fe^(2+) + 4 H^+ -> NO + 3 Fe^(3+) + 2 H2O; [Fe(H2O)6]^(2+) + NO -> [Fe(H2O)5(NO)]^(2+) (brown ring complex) + H2O'
      }
    ]
  },

  // Anion: Sulfate (SO4 2-)
  {
    radicalType: 'acid-radical-anion',
    name: 'Sulfate',
    formula: 'SO₄²⁻',
    group: 'Special (Independent) Group',
    groupReagent: 'Barium Chloride (BaCl2) in dilute HCl',
    preliminaryTest: 'To aqueous salt solution, add dil. HCl followed by BaCl2 solution: Immediate thick white precipitate insoluble in concentrated HCl and concentrated HNO3.',
    confirmatoryTests: [
      {
        testName: 'Barium Chloride Test',
        procedure: 'Add BaCl2 to acidified aqueous salt extract.',
        observation: 'White precipitate of BaSO4 insoluble in concentrated acids.',
        chemicalEquation: 'SO4^(2-) + Ba^(2+) -> BaSO4 v (white crystalline ppt)'
      },
      {
        testName: 'Lead Acetate Test',
        procedure: 'Acidify salt solution with acetic acid, add lead acetate solution.',
        observation: 'White precipitate of PbSO4 soluble in hot ammonium acetate solution.',
        chemicalEquation: 'SO4^(2-) + Pb^(2+) -> PbSO4 v (white); PbSO4 + 2 CH3COONH4 -> (CH3COO)2Pb + (NH4)2SO4 (soluble)'
      }
    ]
  },

  // Cation: Zero Group - Ammonium (NH4+)
  {
    radicalType: 'basic-radical-cation',
    name: 'Ammonium',
    formula: 'NH₄⁺',
    group: 'Zero Group',
    groupReagent: 'Sodium Hydroxide (NaOH)',
    preliminaryTest: 'Heat solid salt with 10% NaOH solution: Pungent ammonia smell; evolved gas turns moist red litmus blue and gives dense white fumes with glass rod dipped in concentrated HCl.',
    confirmatoryTests: [
      {
        testName: 'Nessler\'s Reagent Test',
        procedure: 'Pass evolved ammonia or add Nessler\'s reagent (alkaline K2[HgI4]) to aqueous salt solution.',
        observation: 'Brown precipitate or intense brown coloration of iodide of Millon\'s base.',
        chemicalEquation: '2 K2[HgI4] + NH3 + 3 KOH -> H2N-Hg-O-Hg-I v (iodide of Millon\'s base, brown ppt) + 7 KI + 2 H2O'
      }
    ]
  },

  // Cation: Group I - Lead (Pb 2+)
  {
    radicalType: 'basic-radical-cation',
    name: 'Lead',
    formula: 'Pb²⁺',
    group: 'Group I',
    groupReagent: 'Dilute Hydrochloric Acid (HCl)',
    preliminaryTest: 'To original solution (O.S.), add dilute HCl: Heavy white precipitate of lead chloride (PbCl2) soluble in hot water and recrystallizing as glistening white needles on cooling.',
    confirmatoryTests: [
      {
        testName: 'Potassium Iodide (KI) Test',
        procedure: 'To hot water solution of PbCl2 ppt, add KI solution.',
        observation: 'Golden yellow precipitate of lead iodide (PbI2), which dissolves in boiling water and reappears as glittering golden spangles on cooling.',
        chemicalEquation: 'Pb^(2+) + 2 I^- -> PbI2 v (golden yellow spangles)'
      },
      {
        testName: 'Potassium Chromate (K2CrO4) Test',
        procedure: 'To hot solution of PbCl2, add K2CrO4 solution.',
        observation: 'Bright yellow precipitate of lead chromate (PbCrO4) insoluble in acetic acid but soluble in NaOH.',
        chemicalEquation: 'Pb^(2+) + CrO4^(2-) -> PbCrO4 v (bright yellow)'
      }
    ]
  },

  // Cation: Group II - Copper (Cu 2+)
  {
    radicalType: 'basic-radical-cation',
    name: 'Copper',
    formula: 'Cu²⁺',
    group: 'Group II',
    groupReagent: 'H2S gas in presence of dilute HCl',
    preliminaryTest: 'Pass H2S through warm acidified O.S.: Black precipitate of copper sulfide (CuS). Dissolve ppt in 50% dilute HNO3.',
    confirmatoryTests: [
      {
        testName: 'Ammonium Hydroxide Complexation Test',
        procedure: 'Add NH4OH dropwise to dissolved blue solution until in excess.',
        observation: 'Initial pale blue ppt of Cu(OH)2 dissolves in excess NH4OH to give an intense deep royal blue solution of tetraamminecopper(II) complex.',
        chemicalEquation: 'Cu^(2+) + 4 NH3 -> [Cu(NH3)4]^(2+) (deep royal blue complex)'
      },
      {
        testName: 'Potassium Ferrocyanide Test',
        procedure: 'Acidify copper solution with acetic acid and add K4[Fe(CN)6] solution.',
        observation: 'Distinctive chocolate-brown precipitate of copper ferrocyanide Cu2[Fe(CN)6].',
        chemicalEquation: '2 Cu^(2+) + [Fe(CN)6]^(4-) -> Cu2[Fe(CN)6] v (chocolate brown ppt)'
      }
    ]
  },

  // Cation: Group III - Aluminium (Al 3+)
  {
    radicalType: 'basic-radical-cation',
    name: 'Aluminium',
    formula: 'Al³⁺',
    group: 'Group III',
    groupReagent: 'NH4OH in presence of excess solid NH4Cl',
    preliminaryTest: 'Boil O.S. with conc HNO3, add excess solid NH4Cl, cool and add excess NH4OH: Gelatinous white precipitate of aluminium hydroxide [Al(OH)3].',
    confirmatoryTests: [
      {
        testName: 'Lake Test (Aluminon / Blue Lake)',
        procedure: 'Dissolve gelatinous white ppt in dil HCl. Add 2 drops of blue litmus solution (turns red in acid). Add NH4OH dropwise along sides until alkaline.',
        observation: 'A floating blue gelatinous precipitate ("blue lake") forms in a clear, colorless liquid medium due to adsorption of litmus dye by Al(OH)3.',
        chemicalEquation: 'Al(OH)3 adsorbs litmus dye to form colloidal blue lake'
      }
    ]
  }
];

export const cbseTitrations: TitrationExperiment[] = [
  // Titration 1: KMnO4 vs Mohr's Salt
  {
    id: 'titr-chem-01',
    title: 'Redox Titration: Standard Mohr\'s Salt vs Unknown KMnO4',
    aim: 'To determine the molarity and strength of a given potassium permanganate (KMnO4) solution by titrating it against a standard M/20 (0.05 M) solution of Mohr\'s salt [FeSO4.(NH4)2SO4.6H2O].',
    apparatusRequired: [
      'Burette (50 mL) with stand and clamp',
      'Pipette (20 mL)',
      'Conical flask (250 mL)',
      'Funnel, burette tile (white), wash bottle, measuring flask (250 mL)',
      'Chemical balance and weight box'
    ],
    chemicalReagents: [
      'Mohr\'s salt crystals [FeSO4.(NH4)2SO4.6H2O, molar mass = 392.14 g/mol]',
      'Potassium permanganate solution (~M/100 KMnO4)',
      'Dilute sulfuric acid (2 M H2SO4)',
      'Distilled water'
    ],
    reactionTheory: 'Potassium permanganate (KMnO4) is a powerful oxidizing agent in acidic medium. It oxidizes ferrous ions (Fe2+) in Mohr\'s salt to ferric ions (Fe3+) while Mn(VII) is reduced to colorless Mn(II). KMnO4 acts as its own internal indicator (self-indicator). The stoichiometric molar ratio is 1 KMnO4 : 5 Mohr\'s salt (Fe2+).',
    ionicEquation: 'MnO4^- + 8 H^+ + 5 Fe^(2+) -> Mn^(2+) + 5 Fe^(3+) + 4 H2O',
    indicator: 'KMnO4 acts as a self-indicator (no external indicator required).',
    endPoint: 'Color change from colorless to permanent faint pink (persisting for at least 30-60 seconds).',
    molarityCalculationFormula: {
      name: 'Molarity Equation for KMnO4 vs Mohr\'s Salt',
      formula: '(M_KMnO4 · V_KMnO4) / 1 = (M_Mohr · V_Mohr) / 5',
      symbolMeanings: 'M_KMnO4 = unknown molarity, V_KMnO4 = concordant burette reading (mL), M_Mohr = 0.05 M (M/20), V_Mohr = 20.0 mL (pipette volume)'
    },
    sampleTitrationData: [
      { sNo: 1, readings: { 'Initial Reading (mL)': 0.0, 'Final Reading (mL)': 20.2, 'Volume Used (mL)': 20.2 } },
      { sNo: 2, readings: { 'Initial Reading (mL)': 20.2, 'Final Reading (mL)': 40.2, 'Volume Used (mL)': 20.0 } },
      { sNo: 3, readings: { 'Initial Reading (mL)': 0.0, 'Final Reading (mL)': 20.0, 'Volume Used (mL)': 20.0 } }
    ],
    vivaVoceQuestions: [
      {
        question: 'Why is Mohr\'s salt preferred over simple ferrous sulfate (FeSO4) as a primary standard?',
        expectedAnswer: 'Simple ferrous sulfate crystals effloresce in air and undergo rapid atmospheric oxidation to basic ferric sulfate. Mohr\'s salt is a stable double salt that does not undergo atmospheric oxidation readily and has high purity and known stoichiometric composition.',
        examinerFocus: 'Primary standard requirements.'
      },
      {
        question: 'Why is dilute H2SO4 added during the titration, and why can dilute HCl or HNO3 NOT be used?',
        expectedAnswer: 'H2SO4 provides the necessary acidic medium without interfering in the redox reaction. Dilute HCl cannot be used because KMnO4 would oxidize HCl to chlorine gas (2 Cl^- -> Cl2), consuming extra KMnO4. Dilute HNO3 cannot be used because it is itself a strong oxidizing agent and would oxidize Fe2+ directly, leading to underestimation of KMnO4 volume.',
        examinerFocus: 'Acid selection rationale in redox titrations.'
      },
      {
        question: 'Why do we read the upper meniscus for KMnO4 in the burette?',
        expectedAnswer: 'KMnO4 solution is deeply colored (dark purple/violet), making the lower meniscus invisible; hence the upper meniscus is observed for all readings.',
        examinerFocus: 'Burette reading technique.'
      }
    ]
  },

  // Titration 2: KMnO4 vs Oxalic Acid
  {
    id: 'titr-chem-02',
    title: 'Redox Titration: Standard Oxalic Acid vs Unknown KMnO4',
    aim: 'To determine the molarity and strength of given KMnO4 solution using a standard M/40 (0.025 M) solution of oxalic acid [(COOH)2.2H2O].',
    apparatusRequired: [
      'Burette (50 mL), pipette (20 mL), conical flask (250 mL), bunsen burner, tripod stand, wire gauze, thermometer'
    ],
    chemicalReagents: [
      'Oxalic acid crystals [(COOH)2.2H2O, molar mass = 126.07 g/mol]',
      'Potassium permanganate solution (~M/100 KMnO4)',
      'Dilute sulfuric acid (2 M H2SO4)'
    ],
    reactionTheory: 'Oxalic acid reduces MnO4^- to Mn^(2+) while being oxidized to CO2 gas. At room temperature, the reaction between oxalate ions and permanganate is extremely sluggish due to electrostatic repulsion between negatively charged MnO4^- and C2O4^(2-) ions. The solution must be heated to 60-70 degrees Celsius. The Mn^(2+) ions formed act as an autocatalyst, accelerating subsequent decolorization.',
    ionicEquation: '2 MnO4^- + 16 H^+ + 5 C2O4^(2-) -> 2 Mn^(2+) + 10 CO2 ^ + 8 H2O',
    indicator: 'KMnO4 acts as self-indicator.',
    endPoint: 'Colorless to permanent faint pink.',
    molarityCalculationFormula: {
      name: 'Molarity Equation for KMnO4 vs Oxalic Acid',
      formula: '(M_KMnO4 · V_KMnO4) / 2 = (M_Oxalic · V_Oxalic) / 5',
      symbolMeanings: 'Stoichiometric ratio: 2 moles KMnO4 react with 5 moles Oxalic acid'
    },
    sampleTitrationData: [
      { sNo: 1, readings: { 'Initial Reading (mL)': 0.0, 'Final Reading (mL)': 19.9, 'Volume Used (mL)': 19.9 } },
      { sNo: 2, readings: { 'Initial Reading (mL)': 19.9, 'Final Reading (mL)': 39.7, 'Volume Used (mL)': 19.8 } },
      { sNo: 3, readings: { 'Initial Reading (mL)': 0.0, 'Final Reading (mL)': 19.8, 'Volume Used (mL)': 19.8 } }
    ],
    vivaVoceQuestions: [
      {
        question: 'Why is the conical flask heated to 60-70 °C in oxalic acid titration, whereas Mohr\'s salt titration is performed cold?',
        expectedAnswer: 'The reaction between MnO4^- and C2O4^(2-) involves ions of like negative charge, resulting in high activation energy. Heating to 60-70 °C overcomes this barrier. In contrast, Mohr\'s salt involves oppositely charged ions (MnO4^- and Fe2+), which react instantaneously at room temperature.',
        examinerFocus: 'Chemical kinetics of redox reactions.'
      },
      {
        question: 'Why does the initial drop of KMnO4 take several seconds to decolorize, while subsequent drops decolorize instantaneously?',
        expectedAnswer: 'This is an autocatalytic reaction. Initially, no Mn^(2+) ions are present. As the reaction proceeds, the generated Mn^(2+) ions act as an autocatalyst, drastically accelerating the reaction rate for all subsequent drops.',
        examinerFocus: 'Autocatalysis concept.'
      }
    ]
  }
];

export const cbseFunctionalGroupTests: FunctionalGroupTest[] = [
  {
    groupName: 'Carboxylic Acid (-COOH)',
    formula: '-COOH',
    reagent: 'Sodium Bicarbonate (NaHCO3) 5% solution',
    procedure: 'Add a pinch of organic compound to 2 mL saturated NaHCO3 solution in a clean test tube.',
    observation: 'Brisk effervescence with evolution of colorless, odorless gas (CO2) which turns lime water milky.',
    inference: 'Confirms presence of carboxylic acid group (-COOH): RCOOH + NaHCO3 -> RCOONa + H2O + CO2 ^.'
  },
  {
    groupName: 'Phenolic (-OH)',
    formula: 'Ar-OH',
    reagent: 'Neutral Ferric Chloride (FeCl3)',
    procedure: 'Dissolve compound in water/alcohol, add 2-3 drops of freshly prepared neutral FeCl3 solution.',
    observation: 'Intense violet, blue, or green coloration.',
    inference: 'Confirms presence of phenolic hydroxyl group: 6 C6H5OH + Fe^(3+) -> [Fe(OC6H5)6]^(3-) (violet complex) + 6 H^+.'
  },
  {
    groupName: 'Aldehyde (-CHO)',
    formula: '-CHO',
    reagent: 'Tollens\' Reagent [Ammoniacal Silver Nitrate]',
    procedure: 'To 2 mL organic sample, add 1 mL freshly prepared Tollens\' reagent and heat in a boiling water bath for 5 minutes without shaking.',
    observation: 'A shiny silver mirror coats the inner wall of the test tube, or a greyish-black precipitate of metallic silver forms.',
    inference: 'Confirms aldehyde group: RCHO + 2 [Ag(NH3)2]^+ + 3 OH^- -> RCOO^- + 2 Ag v (silver mirror) + 4 NH3 + 2 H2O.'
  },
  {
    groupName: 'Ketone (>C=O)',
    formula: 'R-CO-R\'',
    reagent: 'm-Dinitrobenzene and Sodium Hydroxide',
    procedure: 'Add 0.1 g m-dinitrobenzene to 1 mL compound, then add 1 mL dilute NaOH and shake.',
    observation: 'Appearance of intense violet/purple coloration which slowly fades.',
    inference: 'Confirms ketonic carbonyl group (>C=O).'
  },
  {
    groupName: 'Primary Amine (-NH2)',
    formula: '-NH₂',
    reagent: 'Carbylamine Test [Chloroform (CHCl3) and Alcoholic KOH]',
    procedure: 'Gently warm a small pinch of organic substance with 2 drops of chloroform and 1 mL alcoholic KOH under a fume hood.',
    observation: 'Extremely offensive, nauseating foul smell of isocyanide (carbylamine).',
    inference: 'Confirms primary amine (aliphatic or aromatic -NH2): R-NH2 + CHCl3 + 3 KOH -> R-NC (isocyanide) + 3 KCl + 3 H2O.'
  }
];
