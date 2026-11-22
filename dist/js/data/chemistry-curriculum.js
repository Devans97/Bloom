import { createSource, CHEMISTRY_SYLLABUS_URL, buildActivitiesForTopic } from './curriculum-builder.js';
const chemistrySource = (section, page = 8) => createSource('Chemistry', '043', CHEMISTRY_SYLLABUS_URL, page, section, true);
export const chemistryTopicDefinitions = [
    // Chapter 1: Solutions (chemistry-1-1)
    {
        id: 'chemistry-043-xii-2026-27-u01-topic01',
        chapterId: 'chemistry-1-1',
        subjectId: 'chemistry',
        title: 'Solution types and concentration',
        officialScope: 'Types of solutions and expression of concentration of solutions.',
        source: chemistrySource('Class XII Theory, Unit 1: Solutions', 8),
        objective: 'Describe solution types and use a prescribed concentration expression with its units.',
        minutes: 30,
        learnSteps: [
            'Find the prescribed section for types of solutions and concentration expressions in NCERT Class XII Chemistry.',
            'List the solution types (solid, liquid, gaseous) and concentration terms: molarity (M), molality (m), mole fraction (x), ppm, and mass percentage.',
            'Explain temperature dependence of volume-based expressions (molarity) versus temperature-independent mass-based terms (molality, mole fraction).',
            'Compare your notes against the prescribed text; mark any term that still needs clarification.'
        ],
        practiceSteps: [
            'Choose one assigned or NCERT question about solution type or concentration calculation.',
            'Identify known quantities, required concentration formula, and units before calculating.',
            'Attempt the question independently, check it against worked solutions, and record a doubt if needed.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u01-topic02',
        chapterId: 'chemistry-1-1',
        subjectId: 'chemistry',
        title: 'Solubility and vapour pressure',
        officialScope: 'Solubility and vapour pressure of liquid solutions.',
        source: chemistrySource('Class XII Theory, Unit 1: Solutions', 8),
        objective: 'Explain syllabus-listed solubility, Henry’s law, and Raoult’s law for volatile and non-volatile solutes.',
        minutes: 25,
        learnSteps: [
            'Read the prescribed scope for gas solubility in liquids and state Henry’s law p = KH · x with its environmental/biological applications (scuba diving, carbonated beverages).',
            'State Raoult’s law for liquid-liquid solutions: partial vapour pressure π = pi0 · xi.',
            'Derive total vapour pressure equation P_total = pA0 + (pB0 - pA0) · xB and explain Dalton’s law of partial pressures for vapor phase composition.',
            'Check your summary against the source; do not add cases not listed in the current syllabus.'
        ],
        practiceSteps: [
            'Select a teacher-assigned or NCERT question on Henry’s law constant KH or Raoult’s law vapor pressure.',
            'Identify what the question gives and which relationship or definition is being assessed.',
            'Attempt it independently and compare with the assigned answer or explanation.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u01-topic03',
        chapterId: 'chemistry-1-1',
        subjectId: 'chemistry',
        title: 'Ideal and non-ideal solutions',
        officialScope: 'Ideal and non-ideal solutions.',
        source: chemistrySource('Class XII Theory, Unit 1: Solutions', 8),
        objective: 'Distinguish ideal and non-ideal solutions using intermolecular interactions and azeotropes.',
        minutes: 25,
        learnSteps: [
            'Read the prescribed explanation of ideal solutions: Delta_mix H = 0, Delta_mix V = 0, identical A-B, A-A, and B-B intermolecular attractions (e.g. n-hexane + n-heptane).',
            'Explain positive deviation from Raoult’s law: weaker A-B attractions, Delta_mix H > 0, Delta_mix V > 0, forms minimum boiling azeotrope (e.g. ethanol + water).',
            'Explain negative deviation from Raoult’s law: stronger A-B attractions via hydrogen bonding, Delta_mix H < 0, Delta_mix V < 0, forms maximum boiling azeotrope (e.g. chloroform + acetone).',
            'Sketch vapour pressure vs mole fraction curves for ideal, positive, and negative deviations.'
        ],
        practiceSteps: [
            'Choose one assigned question classifying binary liquid mixtures by deviation type.',
            'State the relevant defining thermodynamic conditions before writing the response.',
            'Check your response against NCERT examples and record any terminology to revisit.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u01-topic04',
        chapterId: 'chemistry-1-1',
        subjectId: 'chemistry',
        title: 'Colligative properties and molar mass',
        officialScope: 'Colligative properties and determination of molar mass, including abnormal molecular masses.',
        source: chemistrySource('Class XII Theory, Unit 1: Solutions', 8),
        objective: 'Apply the 4 colligative property formulas and calculate van ’t Hoff factor for association/dissociation.',
        minutes: 35,
        learnSteps: [
            'Define colligative properties as those depending solely on number of solute particles relative to total molecules.',
            'Derive relative lowering of vapour pressure (p0 - p)/p0 = xB = (wB · MA) / (MB · wA).',
            'Derive elevation of boiling point Δ Tb = Kb · m and depression of freezing point Δ Tf = Kf · m with cryogenic/ebullioscopic constants.',
            'State osmotic pressure equation Pi = C · R · T and explain why it is preferred for macromolecule molar mass determination.',
            'Introduce van ’t Hoff factor i = normal molar mass / abnormal molar mass = observed colligative property / calculated property, relating i to degree of dissociation alpha and association beta.'
        ],
        practiceSteps: [
            'Select one assigned or NCERT question calculating molar mass from freezing point depression or osmotic pressure.',
            'Determine van ’t Hoff factor i for electrolytes like K4[Fe(CN)6], BaCl2, and benzoic acid in benzene.',
            'Attempt the calculation, check units, and verify against worked textbook solutions.'
        ]
    },
    // Chapter 2: Electrochemistry (chemistry-2-1)
    {
        id: 'chemistry-043-xii-2026-27-u02-topic01',
        chapterId: 'chemistry-2-1',
        subjectId: 'chemistry',
        title: 'Galvanic cells, standard potential and Nernst equation',
        officialScope: 'Redox reactions, EMF of a cell, standard electrode potential, Nernst equation and its application to chemical cells.',
        source: chemistrySource('Class XII Theory, Unit 2: Electrochemistry', 8),
        objective: 'Apply the Nernst equation to compute cell EMF under non-standard concentrations and temperatures.',
        minutes: 35,
        learnSteps: [
            'Review Galvanic cell construction (Daniell cell: Zn|Zn2+ || Cu2+|Cu) and salt bridge functions (electrical neutrality, completes circuit).',
            'Define standard electrode potential E0 using Standard Hydrogen Electrode (SHE = 0.00 V).',
            'Derive Nernst equation at 298 K: E_cell = E0_cell - (0.0591 / n) · log10(Q).',
            'Connect cell potential to equilibrium constant: log10 Kc = (n · E0_cell) / 0.0591.'
        ],
        practiceSteps: [
            'Calculate EMF of non-standard electrochemical cells with specified reactant and product molarities.',
            'Determine equilibrium constant Kc and maximum electrical work Delta_r G0 = -n · F · E0_cell.',
            'Verify anode oxidation and cathode reduction cell representations.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u02-topic02',
        chapterId: 'chemistry-2-1',
        subjectId: 'chemistry',
        title: 'Conductance, Kohlrausch’s law and electrolysis',
        officialScope: 'Conductance in electrolytic solutions, specific and molar conductivity, variations of conductivity with concentration, Kohlrausch’s Law, electrolysis and law of electrolysis (elementary idea).',
        source: chemistrySource('Class XII Theory, Unit 2: Electrochemistry', 8),
        objective: 'Calculate conductivity and molar conductivity, and apply Kohlrausch’s law to weak electrolytes.',
        minutes: 35,
        learnSteps: [
            'Define conductance G = 1/R, specific conductivity kappa = G · (l/A), and molar conductivity Lambda_m = (1000 · kappa) / M.',
            'Explain concentration variations: kappa decreases with dilution; Lambda_m increases with dilution due to reduced interionic hindrance (strong) and increased degree of dissociation (weak).',
            'Analyze Debye-Huckel-Onsager equation Lambda_m = Lambda_m0 - A · sqrt(c) for strong electrolytes.',
            'State Kohlrausch’s law of independent migration of ions and calculate limiting molar conductivity Lambda_m0 and dissociation constant Ka for weak acids like CH3COOH.',
            'Summarize Faraday’s laws of electrolysis: m = Z · I · t and mass proportional to equivalent weights.'
        ],
        practiceSteps: [
            'Calculate degree of dissociation alpha = Lambda_m / Lambda_m0 and dissociation constant Ka for weak organic acids.',
            'Solve Faraday electrolysis problems computing mass of metal electroplated during specified duration and current.',
            'Verify units (S cm² mol^-1) and cell constant dimensions.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u02-topic03',
        chapterId: 'chemistry-2-1',
        subjectId: 'chemistry',
        title: 'Batteries, fuel cells and corrosion',
        officialScope: 'Dry cell-electrolytic cells and Galvanic cells, lead accumulator, fuel cells, corrosion.',
        source: chemistrySource('Class XII Theory, Unit 2: Electrochemistry', 8),
        objective: 'Write anode, cathode, and net reactions for primary/secondary cells, fuel cells, and rusting.',
        minutes: 30,
        learnSteps: [
            'Distinguish primary cells (irreversible, e.g. Leclanche dry cell, mercury cell) and secondary rechargeable cells.',
            'Write electrode reactions for Lead Storage Battery during discharging (spontaneous) and recharging (electrolytic).',
            'Explain H2-O2 Fuel Cell construction, porous carbon electrodes with platinum catalyst, and environmental efficiency advantages.',
            'Explain electrochemical mechanism of corrosion of iron: anode Fe oxidation, cathode O2 reduction in acidic medium, formation of rust Fe2O3·xH2O, and cathodic protection methods.'
        ],
        practiceSteps: [
            'Write complete chemical equations at anode and cathode for dry cells and lead accumulators.',
            'Explain why mercury cell maintains constant voltage throughout its operational life.',
            'Review barrier and sacrificial methods (galvanization) for corrosion prevention.'
        ]
    },
    // Chapter 3: Chemical Kinetics (chemistry-3-1)
    {
        id: 'chemistry-043-xii-2026-27-u03-topic01',
        chapterId: 'chemistry-3-1',
        subjectId: 'chemistry',
        title: 'Reaction rate, order and molecularity',
        officialScope: 'Rate of a reaction (average and instantaneous), factors affecting rate of reaction: concentration, temperature, catalyst; order and molecularity of a reaction, rate law and specific rate constant.',
        source: chemistrySource('Class XII Theory, Unit 3: Chemical Kinetics', 8),
        objective: 'Differentiate average/instantaneous rate, deduce rate laws, and contrast order with molecularity.',
        minutes: 30,
        learnSteps: [
            'Define average rate (-Δ[R]/Δ t) and instantaneous rate (-d[R]/dt) in terms of stoichiometric coefficients.',
            'State factors affecting reaction rate: concentration, temperature, physical surface area, and catalyst.',
            'Define rate law rate = k · [A]^x · [B]^y, reaction order (x + y), and specific rate constant units (mol^(1-n) L^(n-1) s^-1).',
            'Contrast order (experimental, can be zero/fractional/negative) with molecularity (theoretical, integer count of colliding reactant species in elementary step).'
        ],
        practiceSteps: [
            'Deduce rate law and overall reaction order from initial rate method experimental tables.',
            'Determine units of rate constant k for zero, first, second, and fractional order reactions.',
            'Answer conceptual questions on elementary vs complex reactions and rate-determining steps.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u03-topic02',
        chapterId: 'chemistry-3-1',
        subjectId: 'chemistry',
        title: 'Integrated rate equations and half-life',
        officialScope: 'Integrated rate equations and half-life (only for zero and first order reactions).',
        source: chemistrySource('Class XII Theory, Unit 3: Chemical Kinetics', 8),
        objective: 'Derive integrated rate expressions and half-life formulas for zero and first order reactions.',
        minutes: 35,
        learnSteps: [
            'Derive zero-order integrated rate equation: [R] = [R]0 - k · t and half-life t_1/2 = [R]0 / (2 · k), showing linear dependence on initial concentration.',
            'Derive first-order integrated rate equation: k = (2.303 / t) · log10([R]0 / [R]).',
            'Derive first-order half-life: t_1/2 = 0.693 / k, proving it is strictly independent of initial reactant concentration.',
            'Analyze first-order gaseous reaction rate constant k in terms of initial pressure P0 and total pressure Pt.'
        ],
        practiceSteps: [
            'Calculate time required for 75%, 90%, and 99.9% completion of first-order chemical reactions.',
            'Solve numericals for decomposition of gaseous N2O5 and SO2Cl2 using partial pressure data.',
            'Sketch [R] vs t and log[R] vs t graphs to identify reaction orders from linear slopes.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u03-topic03',
        chapterId: 'chemistry-3-1',
        subjectId: 'chemistry',
        title: 'Collision theory, activation energy and Arrhenius equation',
        officialScope: 'Concept of collision theory (elementary idea, no mathematical treatment), activation energy, Arrhenius equation.',
        source: chemistrySource('Class XII Theory, Unit 3: Chemical Kinetics', 8),
        objective: 'Explain collision theory criteria, reaction profiles, and solve problems using Arrhenius equation.',
        minutes: 30,
        learnSteps: [
            'Explain collision theory criteria for effective collisions: energy barrier (threshold energy) and steric/orientation barrier.',
            'Draw potential energy diagrams illustrating activation energy Ea, activated complex transition state, and enthalpy change Δ H.',
            'State Arrhenius equation k = A · exp(-Ea / (R · T)) where A is frequency factor.',
            'Derive logarithmic two-temperature form: log10(k2 / k1) = (Ea / (2.303 · R)) · ((T2 - T1) / (T1 · T2)).',
            'Explain how positive catalysts lower activation energy without shifting chemical equilibrium.'
        ],
        practiceSteps: [
            'Calculate activation energy Ea from rate constants measured at two distinct temperatures.',
            'Plot ln k vs 1/T and determine Ea from slope = -Ea / R.',
            'Analyze why a 10 K rise in temperature approximately doubles reaction rate.'
        ]
    },
    // Chapter 4: d- and f-Block Elements (chemistry-4-1)
    {
        id: 'chemistry-043-xii-2026-27-u04-topic01',
        chapterId: 'chemistry-4-1',
        subjectId: 'chemistry',
        title: 'Trends in 3d transition series',
        officialScope: 'General introduction, electronic configuration, occurrence, characteristics of transition metals, general trends in properties of the first row transition metals – metallic character, ionization enthalpy, oxidation states, ionic radii, colour, catalytic property, magnetic properties, interstitial compounds, alloy formation.',
        source: chemistrySource('Class XII Theory, Unit 4: d- and f-Block Elements', 9),
        objective: 'Explain electronic configurations, oxidation state stability, color, and magnetism in 3d metals.',
        minutes: 35,
        learnSteps: [
            'Write electronic configurations of 3d elements highlighting exceptional stability of half-filled Cr ([Ar] 3d5 4s1) and full-filled Cu ([Ar] 3d10 4s1).',
            'Analyze variable oxidation states: maximum (+7) at Manganese (Mn), explaining why Sc (+3) and Zn (+2) show fixed states.',
            'Explain origin of color in transition metal complexes via d-d transitions and absorption of complementary light.',
            'Calculate spin-only magnetic moment μ = sqrt(n · (n + 2)) BM based on unpaired d-electrons.',
            'Explain formation of interstitial compounds (H, C, N trapped in lattice) and alloys due to similar metallic radii.'
        ],
        practiceSteps: [
            'Calculate magnetic moments of Fe2+, Mn2+, Cr3+, and Ti4+ ions.',
            'Explain why Cu+ is diamagnetic and colorless while Cu2+ is paramagnetic and blue in aqueous solution.',
            'Answer reasoning questions on standard electrode potential E0(M2+/M) anomalies.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u04-topic02',
        chapterId: 'chemistry-4-1',
        subjectId: 'chemistry',
        title: 'K2Cr2O7, KMnO4 and inner transition elements',
        officialScope: 'Preparation and properties of K2Cr2O7 and KMnO4. Lanthanoids - Electronic configuration, oxidation states, chemical reactivity and lanthanoid contraction and its consequences. Actinoids - Electronic configuration, oxidation states and comparison with lanthanoids.',
        source: chemistrySource('Class XII Theory, Unit 4: d- and f-Block Elements', 9),
        objective: 'Describe preparation and redox reactions of dichromate/permanganate, and explain lanthanoid contraction.',
        minutes: 35,
        learnSteps: [
            'Write 3-step preparation of potassium dichromate from chromite ore (FeCr2O4) and pH-dependent chromate/dichromate interconversion: 2 CrO4(2-) + 2 H+ <=> Cr2O7(2-) + H2O.',
            'Write preparation of potassium permanganate from pyrolusite ore (MnO2) via potassium manganate (K2MnO4).',
            'Write balanced ionic redox equations for KMnO4 oxidizing Fe2+, C2O4(2-), I-, and SO3(2-) in acidic media.',
            'Explain Lanthanoid Contraction: steady decrease in atomic/ionic radii due to poor shielding by diffuse 4f electrons, causing Zr-Hf and Nb-Ta similarity in radii and separation difficulties.',
            'Compare actinoids with lanthanoids: actinoids show wider variety of oxidation states due to comparable energies of 5f, 6d, and 7s levels.'
        ],
        practiceSteps: [
            'Balance complete ionic equations for K2Cr2O7 and KMnO4 titrations in acidic solutions.',
            'State consequences of lanthanoid contraction on basicity of hydroxides (La(OH)3 to Lu(OH)3).',
            'Explain why actinoid contraction is greater from element to element than lanthanoid contraction.'
        ]
    },
    // Chapter 5: Coordination Compounds (chemistry-5-1)
    {
        id: 'chemistry-043-xii-2026-27-u05-topic01',
        chapterId: 'chemistry-5-1',
        subjectId: 'chemistry',
        title: 'Nomenclature, Werner’s theory and isomerism',
        officialScope: 'Coordination compounds - Introduction, ligands, coordination number, colour, magnetic properties and shapes, IUPAC nomenclature of mononuclear coordination compounds. Bonding, Werner’s theory, VBT, and CFT; structure and stereoisomerism.',
        source: chemistrySource('Class XII Theory, Unit 5: Coordination Compounds', 9),
        objective: 'Apply IUPAC nomenclature rules, state Werner’s postulates, and identify structural/stereoisomers.',
        minutes: 35,
        learnSteps: [
            'Explain Werner’s coordination theory: primary valence (ionizable, corresponds to oxidation state) and secondary valence (non-ionizable, directional coordination number).',
            'Define coordination entity, central atom, ligands (unidentate, bidentate, ambidentate like NO2- / SCN-, polydentate EDTA4-), and chelate effect.',
            'Master IUPAC rules for naming cationic, neutral, and anionic complexes (using -ate suffix for central metal in anionic entities).',
            'Classify structural isomerism (ionization, solvate/hydrate, linkage, coordination) and stereoisomerism (geometrical cis/trans in square planar [MA2B2] and octahedral [MA4B2], and optical enantiomerism in [M(en)3]3+).'
        ],
        practiceSteps: [
            'Write IUPAC names for coordination compounds: [Co(NH3)5(CO3)]Cl, K3[Fe(CN)6], [Pt(NH3)2Cl(NO2)].',
            'Draw geometrical and optical isomers for octahedral complexes containing bidentate chelating ligands.',
            'Predict number of moles of AgCl precipitated when excess AgNO3 is added to aqueous CoCl3·xNH3 isomers.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u05-topic02',
        chapterId: 'chemistry-5-1',
        subjectId: 'chemistry',
        title: 'Bonding theories: VBT and Crystal Field Theory',
        officialScope: 'Bonding, Werner’s theory, VBT, and CFT; importance of coordination compounds (in qualitative analysis, extraction of metals and biological system).',
        source: chemistrySource('Class XII Theory, Unit 5: Coordination Compounds', 9),
        objective: 'Apply VBT hybridization and CFT d-orbital splitting (octahedral and tetrahedral) to predict magnetic properties.',
        minutes: 35,
        learnSteps: [
            'Apply Valence Bond Theory (VBT) to predict geometry and hybridization: sp3d2 (outer orbital, high spin) vs d2sp3 (inner orbital, low spin) for octahedral, and dsp2 (square planar) vs sp3 (tetrahedral).',
            'Explain limitations of VBT: does not explain absorption spectra, temperature-dependent magnetism, or ligand field strengths.',
            'Apply Crystal Field Theory (CFT) for octahedral complexes: splitting of degenerate d-orbitals into lower t2g and higher eg sets separated by Delta_o.',
            'Understand Spectrochemical Series: weak field ligands (halides, Delta_o < P, high spin) vs strong field ligands (CN-, CO, Delta_o > P, low spin pairing).',
            'Explain tetrahedral splitting: Delta_t = (4/9) · Delta_o, always high spin.',
            'Summarize practical importance: chlorophyll (Mg), hemoglobin (Fe), vitamin B12 (Co), EDTA in water hardness, cisplatin in cancer therapy.'
        ],
        practiceSteps: [
            'Draw d-orbital splitting diagrams and write t2g^m eg^n configurations for [Fe(CN)6]3- vs [Fe(H2O)6]3+.',
            'Calculate spin-only magnetic moments and explain why [Ni(CN)4]2- is square planar and diamagnetic while [NiCl4]2- is tetrahedral and paramagnetic.',
            'Explain the origin of color in coordination complexes using CFT d-d transitions.'
        ]
    },
    // Chapter 6: Haloalkanes and Haloarenes (chemistry-6-1)
    {
        id: 'chemistry-043-xii-2026-27-u06-topic01',
        chapterId: 'chemistry-6-1',
        subjectId: 'chemistry',
        title: 'Haloalkanes: Reactions and SN1/SN2 mechanisms',
        officialScope: 'Haloalkanes: Nomenclature, nature of C–X bond, physical and chemical properties, optical rotation mechanism of substitution reactions.',
        source: chemistrySource('Class XII Theory, Unit 6: Haloalkanes and Haloarenes', 9),
        objective: 'Analyze C-X bond polarity, optical activity, and compare SN1 vs SN2 nucleophilic substitution mechanisms.',
        minutes: 35,
        learnSteps: [
            'Review IUPAC nomenclature and C-X bond polarity: dipole moment decreases C-Cl > C-F > C-Br > C-I.',
            'Define stereochemical concepts: chirality, asymmetric carbon, enantiomers, diastereomers, dextro/laevorotatory, and racemic mixtures.',
            'Detailed SN2 mechanism: single-step bimolecular kinetics, backside nucleophilic attack, pentacoordinate transition state, complete Walden inversion of configuration, reactivity order 1° > 2° > 3° due to steric hindrance.',
            'Detailed SN1 mechanism: two-step unimolecular kinetics, carbocation intermediate rate-determining step, planar sp2 carbocation leading to racemization, reactivity order 3° > 2° > 1° stabilized by hyperconjugation and inductive effects.',
            'Elimination reactions: Saytzeff (Zaitsev) rule forming most substituted, stable alkene.'
        ],
        practiceSteps: [
            'Predict whether given alkyl halides undergo substitution primarily via SN1 or SN2 pathways in aqueous vs polar aprotic solvents.',
            'Write stereochemical outcomes (retention, inversion, or racemization) for optically active reactant substrates.',
            'Solve reaction synthesis questions involving PCl5, SOCl2 (Darzens process), and Williamson ether synthesis.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u06-topic02',
        chapterId: 'chemistry-6-1',
        subjectId: 'chemistry',
        title: 'Haloarenes and polyhalogen compounds',
        officialScope: 'Haloarenes: Nature of C–X bond, substitution reactions (Directive influence of halogen in monosubstituted compounds only). Uses and environmental effects of - dichloromethane, trichloromethane, tetrachloromethane, iodoform, freons, DDT.',
        source: chemistrySource('Class XII Theory, Unit 6: Haloalkanes and Haloarenes', 9),
        objective: 'Explain low reactivity of haloarenes, electrophilic substitution, and polyhalogen environmental impacts.',
        minutes: 30,
        learnSteps: [
            'Explain why haloarenes are extremely unreactive toward nucleophilic substitution: resonance stabilization (partial double bond C-Cl character), sp2 hybridized carbon holding electrons tighter, instability of phenyl cation, and electron cloud repulsion.',
            'Explain harsh conditions required for Dow’s process converting chlorobenzene to phenol (NaOH at 623 K and 300 atm).',
            'Explain ortho-para directing influence of halogens despite net deactivation due to dominant -I inductive effect versus resonance donation.',
            'Review electrophilic substitutions: halogenation, nitration, sulphonation, and Friedel-Crafts alkylation/acylation.',
            'Summarize environmental hazards of freons (ozone depletion) and DDT (biomagnification and persistence).'
        ],
        practiceSteps: [
            'Write complete chemical equations for Wurtz-Fittig and Fittig coupling reactions of haloarenes.',
            'Predict major and minor products for nitration and bromination of chlorobenzene.',
            'Answer reasoning questions on why p-dichlorobenzene has higher melting point and lower solubility than ortho and meta isomers.'
        ]
    },
    // Chapter 7: Alcohols, Phenols and Ethers (chemistry-7-1)
    {
        id: 'chemistry-043-xii-2026-27-u07-topic01',
        chapterId: 'chemistry-7-1',
        subjectId: 'chemistry',
        title: 'Alcohols: Synthesis, properties and differentiation',
        officialScope: 'Alcohols: Nomenclature, methods of preparation, physical and chemical properties (of primary alcohols only; identification of primary, secondary and tertiary alcohols, mechanism of dehydration.',
        source: chemistrySource('Class XII Theory, Unit 7: Alcohols, Phenols and Ethers', 10),
        objective: 'Describe preparation of alcohols, dehydration mechanisms, and distinction using Lucas test.',
        minutes: 35,
        learnSteps: [
            'Review preparation methods: acid-catalyzed hydration of alkenes (Markovnikov), hydroboration-oxidation (anti-Markovnikov), reduction of aldehydes/ketones/esters using NaBH4 or LiAlH4, and Grignard reagent addition to carbonyls.',
            'Explain intermolecular hydrogen bonding causing higher boiling points compared to hydrocarbons of matching molar masses.',
            'Detailed 3-step mechanism of acid-catalyzed dehydration of ethanol to ethene: protonation of alcohol, carbocation formation (rate-determining step), and loss of proton.',
            'Differentiate 1°, 2°, and 3° alcohols using Lucas reagent (anhydrous ZnCl2 + conc. HCl): 3° produces immediate turbidity, 2° within 5 minutes, 1° remains clear at room temperature.',
            'Review oxidation of alcohols: PCC / CrO3 / Cu at 573 K.'
        ],
        practiceSteps: [
            'Write complete mechanism for dehydration of ethanol at 443 K (ethene) versus 413 K (diethyl ether).',
            'Identify Grignard reagent and carbonyl reactant combinations to synthesize specific target alcohols.',
            'Solve road-map conversion problems differentiating alcohol isomers.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u07-topic02',
        chapterId: 'chemistry-7-1',
        subjectId: 'chemistry',
        title: 'Phenols: Acidity, Kolbe and Reimer-Tiemann reactions',
        officialScope: 'Phenols: Nomenclature, methods of preparation, physical and chemical properties, acidic nature of phenol, electrophilic substitution reactions, Reimer-Tiemann and Kolbe’s reactions.',
        source: chemistrySource('Class XII Theory, Unit 7: Alcohols, Phenols and Ethers', 10),
        objective: 'Explain phenol acidity via phenoxide resonance and master Kolbe, Reimer-Tiemann, and nitration reactions.',
        minutes: 35,
        learnSteps: [
            'Review preparation of phenol: from cumene (isopropylbenzene) auto-oxidation yielding valuable byproduct acetone, and from aniline diazonium salt hydrolysis.',
            'Explain acidic nature of phenol: phenoxide ion is resonance stabilized by delocalizing negative charge into the aromatic ring, making phenol more acidic than alcohols (Ka ~ 10^-10 vs 10^-16).',
            'Analyze substituent effects: electron-withdrawing groups (-NO2) increase acidity (especially at ortho/para positions), electron-donating groups (-CH3) decrease acidity.',
            'Master Kolbe’s reaction: sodium phenoxide with CO2 at 400 K and 4–7 atm followed by acidification yields 2-hydroxybenzoic acid (salicylic acid).',
            'Master Reimer-Tiemann reaction: phenol with chloroform (CHCl3) and aqueous NaOH at 340 K yields salicylaldehyde via dichlorocarbene intermediate.',
            'Review reaction with zinc dust (reduction to benzene) and oxidation with Na2Cr2O7 (yielding benzoquinone).'
        ],
        practiceSteps: [
            'Write chemical equations for synthesis of aspirin (acetylsalicylic acid) from salicylic acid.',
            'Predict products when phenol reacts with dilute HNO3 (o- and p-nitrophenol) versus concentrated HNO3 (picric acid).',
            'Explain why o-nitrophenol is steam volatile due to intramolecular hydrogen bonding.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u07-topic03',
        chapterId: 'chemistry-7-1',
        subjectId: 'chemistry',
        title: 'Ethers: Williamson synthesis and cleavage',
        officialScope: 'Ethers: Nomenclature, methods of preparation, physical and chemical properties, uses.',
        source: chemistrySource('Class XII Theory, Unit 7: Alcohols, Phenols and Ethers', 10),
        objective: 'Synthesize ethers via Williamson synthesis and deduce cleavage products with halogen acids (HI).',
        minutes: 30,
        learnSteps: [
            'Review IUPAC naming: alkoxyalkanes.',
            'Explain Williamson Ether Synthesis: SN2 reaction between sodium alkoxide (R-O- Na+) and primary alkyl halide (R\'-X).',
            'Analyze limitations: if tertiary alkyl halide is used, elimination dominates yielding alkene rather than ether.',
            'Explain cleavage of C-O bond in ethers by concentrated halogen acids (HI / HBr): with primary/secondary alkyl groups, reaction follows SN2 displacing smaller alkyl group as iodide; with tertiary alkyl groups, SN1 produces stable tertiary carbocation resulting in tertiary iodide.',
            'Review electrophilic substitution of anisole: halogenation, Friedel-Crafts alkylation, and nitration.'
        ],
        practiceSteps: [
            'Choose appropriate alkoxide and halide starting reagents to prepare tert-butyl ethyl ether without elimination.',
            'Predict products when anisole (methoxybenzene) and tert-butyl methyl ether react with hot concentrated HI.',
            'Verify reaction mechanisms and draw transition state structures.'
        ]
    },
    // Chapter 8: Aldehydes, Ketones and Carboxylic Acids (chemistry-8-1)
    {
        id: 'chemistry-043-xii-2026-27-u08-topic01',
        chapterId: 'chemistry-8-1',
        subjectId: 'chemistry',
        title: 'Aldehydes and Ketones: Preparation and nucleophilic addition',
        officialScope: 'Aldehydes and Ketones: Nomenclature, nature of carbonyl group, methods of preparation, physical and chemical properties, mechanism of nucleophilic addition, reactivity of alpha hydrogen in aldehydes, uses.',
        source: chemistrySource('Class XII Theory, Unit 8: Aldehydes, Ketones and Carboxylic Acids', 10),
        objective: 'Synthesize carbonyl compounds and analyze nucleophilic addition mechanisms with HCN, NaHSO3, and amines.',
        minutes: 35,
        learnSteps: [
            'Named preparation methods: Rosenmund reduction (R-COCl + H2 / Pd-BaSO4), Stephen reaction (R-CN + SnCl2/HCl), Etard reaction (toluene + CrO2Cl2), and Gattermann-Koch reaction.',
            'Explain polarity of carbonyl group (>C=O) and steric/electronic factors making aldehydes more reactive than ketones toward nucleophiles.',
            'Detailed mechanism of nucleophilic addition of HCN (forming cyanohydrins), NaHSO3 (bisulfite adducts for purification), and alcohols (hemiacetals and acetals).',
            'Addition-elimination reactions with ammonia derivatives (H2N-Z: hydroxylamine, hydrazine, phenylhydrazine, 2,4-DNP, semicarbazide).',
            'Reduction methods: Clemmensen reduction (Zn-Hg / conc. HCl) and Wolff-Kishner reduction (NH2NH2 / KOH in ethylene glycol) converting carbonyls directly to alkanes.'
        ],
        practiceSteps: [
            'Write stepwise mechanism for nucleophilic attack on propanal versus propanone.',
            'Predict products of carbonyl condensation with 2,4-DNP (Brady’s reagent) used for aldehyde/ketone identification.',
            'Solve conversion questions using Rosenmund and Stephen synthetic routes.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u08-topic02',
        chapterId: 'chemistry-8-1',
        subjectId: 'chemistry',
        title: 'Distinction tests, Aldol and Cannizzaro reactions',
        officialScope: 'Chemical properties and distinction tests: Tollens’ test, Fehling’s test, Iodoform reaction; Aldol condensation, Cannizzaro reaction.',
        source: chemistrySource('Class XII Theory, Unit 8: Aldehydes, Ketones and Carboxylic Acids', 10),
        objective: 'Perform distinction tests (Tollens, Fehling, Iodoform) and execute Aldol and Cannizzaro mechanisms.',
        minutes: 35,
        learnSteps: [
            'Master Tollens’ Test (ammoniacal AgNO3): aldehydes reduce Ag+ to metallic silver mirror, ketones do not react.',
            'Master Fehling’s Test (alkaline CuSO4 + sodium potassium tartrate): aliphatic aldehydes produce red precipitate of Cu2O, aromatic aldehydes and ketones give negative test.',
            'Master Iodoform Test (I2 + NaOH): compounds with CH3-C=O or CH3-CH(OH)- group produce yellow precipitate of CHI3 with characteristic antiseptic odor.',
            'Master Aldol Condensation: aldehydes/ketones having alpha-hydrogens in dilute alkali form beta-hydroxy aldehydes (aldols) which dehydrate on heating to alpha,beta-unsaturated carbonyls.',
            'Master Cannizzaro Reaction: aldehydes lacking alpha-hydrogens (HCHO, benzaldehyde) in 50% concentrated alkali undergo self-oxidation and reduction (disproportionation) yielding alcohol and carboxylate salt.'
        ],
        practiceSteps: [
            'Distinguish pairs using single chemical test: acetaldehyde vs benzaldehyde; pentan-2-one vs pentan-3-one; benzaldehyde vs acetophenone.',
            'Write complete step-by-step mechanism of self-aldol condensation of acetaldehyde and cross-aldol products.',
            'Write products for Cannizzaro reaction of formaldehyde and benzaldehyde.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u08-topic03',
        chapterId: 'chemistry-8-1',
        subjectId: 'chemistry',
        title: 'Carboxylic Acids: Synthesis, acidity and HVZ reaction',
        officialScope: 'Carboxylic Acids: Nomenclature, acidic nature, methods of preparation, physical and chemical properties; uses.',
        source: chemistrySource('Class XII Theory, Unit 8: Aldehydes, Ketones and Carboxylic Acids', 10),
        objective: 'Explain carboxylic acid acidity, substituent effects, and named reactions (HVZ, decarboxylation).',
        minutes: 35,
        learnSteps: [
            'Review preparation: oxidation of primary alcohols/aldehydes with KMnO4, hydrolysis of nitriles/amides, and Grignard carbonation with dry ice (CO2).',
            'Explain acidity: resonance stabilization of carboxylate anion distributes negative charge symmetrically across two electronegative oxygen atoms, making carboxylic acids far stronger acids than phenols.',
            'Substituent effects on pKa: electron-withdrawing groups (-NO2, -CN, -F, -Cl) stabilize carboxylate anion by inductive/resonance effects, increasing acidity (e.g. FCH2COOH > ClCH2COOH > CH3COOH).',
            'Reactions involving -COOH group: esterification with alcohols in presence of conc. H2SO4, formation of acid chlorides with SOCl2, formation of anhydrides with P2O5.',
            'Hell-Volhard-Zelinsky (HVZ) Reaction: carboxylic acids having alpha-hydrogen react with Cl2/Br2 in presence of red phosphorus to form alpha-halocarboxylic acids.',
            'Kolbe electrolytic decarboxylation and soda lime decarboxylation.'
        ],
        practiceSteps: [
            'Arrange substituted benzoic acids in increasing order of acid strength: 4-nitrobenzoic acid, benzoic acid, 4-methoxybenzoic acid.',
            'Write stepwise mechanism for Fischer esterification between ethanoic acid and ethanol.',
            'Identify intermediates in HVZ halogenation of propanoic acid.'
        ]
    },
    // Chapter 9: Amines (chemistry-9-1)
    {
        id: 'chemistry-043-xii-2026-27-u09-topic01',
        chapterId: 'chemistry-9-1',
        subjectId: 'chemistry',
        title: 'Amines: Synthesis, basicity and Hinsberg test',
        officialScope: 'Amines: Nomenclature, classification, structure, basic character and identification of primary, secondary and tertiary amines; methods of preparation, physical and chemical properties, uses.',
        source: chemistrySource('Class XII Theory, Unit 9: Amines', 11),
        objective: 'Synthesize amines (Gabriel, Hoffmann), explain aqueous basicity trends, and distinguish 1°, 2°, 3° amines using Hinsberg reagent.',
        minutes: 35,
        learnSteps: [
            'Named preparation methods: Gabriel Phthalimide Synthesis (exclusive route for pure primary aliphatic amines, aromatic amines cannot be prepared because aryl halides cannot undergo nucleophilic attack on phthalimide anion), and Hoffmann Bromamide Degradation (R-CONH2 + Br2 + 4 KOH -> R-NH2 + K2CO3 + 2 KBr + 2 H2O, yielding amine with one less carbon).',
            'Explain basic character: unshared lone pair on nitrogen atom readily accepts protons.',
            'Explain gas phase basicity order: 3° > 2° > 1° > NH3 (governed by +I inductive effect of alkyl groups).',
            'Explain aqueous phase basicity order: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (2° > 3° > 1° for ethyl) and (CH3)2NH > CH3NH2 > (CH3)3N > NH3 (2° > 1° > 3° for methyl), governed by combination of +I effect, steric hindrance, and hydration enthalpy.',
            'Explain why aniline is much weaker base than ammonia: lone pair delocalized into benzene ring over 5 resonance contributors.',
            'Master Hinsberg Test (benzenesulphonyl chloride C6H5SO2Cl): 1° amine forms N-alkylbenzenesulphonamide soluble in alkali; 2° amine forms N,N-dialkylbenzenesulphonamide insoluble in alkali; 3° amine does not react.'
        ],
        practiceSteps: [
            'Distinguish aniline from ethylamine, and methylamine from dimethylamine using specific chemical tests.',
            'Write equations for carbylamine test (isocyanide test) giving foul smelling alkyl isocyanides with 1° amines only.',
            'Solve road-map synthetic conversions using Hoffmann bromamide degradation.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u09-topic02',
        chapterId: 'chemistry-9-1',
        subjectId: 'chemistry',
        title: 'Diazonium salts and synthetic transformations',
        officialScope: 'Diazonium salts: Preparation, chemical reactions and importance in synthetic organic chemistry.',
        source: chemistrySource('Class XII Theory, Unit 9: Amines', 11),
        objective: 'Prepare benzene diazonium chloride and apply Sandmeyer, Gattermann, and azo coupling reactions.',
        minutes: 30,
        learnSteps: [
            'Explain Diazotization reaction: primary aromatic amine (aniline) with nitrous acid (NaNO2 + conc. HCl) at ice-cold temperatures (273–278 K) yields benzenediazonium chloride C6H5N2+ Cl-.',
            'Explain why aliphatic diazonium salts are unstable and decompose immediately releasing nitrogen gas.',
            'Replacement reactions of diazonium group: Sandmeyer reaction (CuCl/HCl, CuBr/HBr, CuCN/KCN), Gattermann reaction (Cu powder/halogen acid), replacement by -I (KI), -F (Balz-Schiemann reaction with HBF4), -H (reduction with H3PO2 or ethanol), and -OH (warming with water).',
            'Master Azo Coupling Reactions: diazonium salts react with electron-rich aromatic compounds like phenol (in weakly alkaline medium pH 9–10 yielding p-hydroxyazobenzene, orange dye) and aniline (in weakly acidic medium pH 4–5 yielding p-aminoazobenzene, yellow dye).'
        ],
        practiceSteps: [
            'Design multi-step synthetic conversions from aniline or nitrobenzene to chlorobenzene, iodobenzene, fluorobenzene, benzoic acid, and phenol.',
            'Write chemical equations and state optimal pH conditions for coupling of benzenediazonium chloride with beta-naphthol.',
            'Review importance of diazonium salts in producing aromatic compounds unobtainable by direct electrophilic substitution.'
        ]
    },
    // Chapter 10: Biomolecules (chemistry-10-1)
    {
        id: 'chemistry-043-xii-2026-27-u10-topic01',
        chapterId: 'chemistry-10-1',
        subjectId: 'chemistry',
        title: 'Carbohydrates: Monosaccharides, oligosaccharides and polysaccharides',
        officialScope: 'Carbohydrates - Classification (aldoses and ketoses), monosaccharides (glucose and fructose), D-L configuration, oligosaccharides (sucrose, lactose, maltose), polysaccharides (starch, cellulose, glycogen); importance of carbohydrates.',
        source: chemistrySource('Class XII Theory, Unit 10: Biomolecules', 11),
        objective: 'Elucidate glucose open and cyclic structures, Haworth projections, and glycosidic linkages in sugars.',
        minutes: 35,
        learnSteps: [
            'Structure elucidation of D-(+)-glucose: presence of straight 6-carbon chain (prolonged heating with HI yields n-hexane), carbonyl group (forms oxime with NH2OH and cyanohydrin with HCN), aldehyde group (oxidized by mild Br2 water to gluconic acid), 5 hydroxyl groups (acetylation with acetic anhydride gives pentaacetate), primary alcohol group (conc. HNO3 yields saccharic acid).',
            'Explain open chain limitations: does not give 2,4-DNP test, Schiff’s test, or bisulfite adduct, and glucose exists in two crystalline forms (alpha and beta).',
            'Draw Haworth projections for alpha-D-glucopyranose and beta-D-glucopyranose, explaining anomers differing only at C-1.',
            'Define reducing vs non-reducing sugars based on free hemiacetal anomeric carbon.',
            'Disaccharides and glycosidic linkages: Sucrose (alpha-D-glucose + beta-D-fructose via C1-C2 glycosidic linkage, non-reducing, invert sugar with inversion of specific rotation from +66.5° to -39.9° upon hydrolysis), Maltose (two alpha-D-glucose units via C1-C4, reducing), Lactose (beta-D-galactose + beta-D-glucose via C1-C4, reducing).',
            'Polysaccharides: Starch (amylose water-soluble unbranched alpha-1,4 + amylopectin insoluble branched alpha-1,4 and alpha-1,6), Cellulose (beta-D-glucose unbranched beta-1,4 linkage, structural component of plant cell walls, indigestible by humans), Glycogen (animal starch).'
        ],
        practiceSteps: [
            'Draw Haworth structures for alpha-D-glucose, beta-D-fructose, sucrose, and maltose.',
            'Explain inversion of cane sugar during acidic or enzymatic hydrolysis.',
            'Answer questions on why cellulose cannot be digested by human digestive tract while starch is readily hydrolyzed.'
        ]
    },
    {
        id: 'chemistry-043-xii-2026-27-u10-topic02',
        chapterId: 'chemistry-10-1',
        subjectId: 'chemistry',
        title: 'Proteins, nucleic acids and vitamins',
        officialScope: 'Proteins - Elementary idea of - amino acids, peptide bond, polypeptides, proteins, structure of proteins - primary, secondary, tertiary structure and quaternary structures (qualitative idea only), denaturation of proteins; enzymes. Hormones - Elementary idea excluding structure. Vitamins - Classification and functions. Nucleic Acids: DNA and RNA.',
        source: chemistrySource('Class XII Theory, Unit 10: Biomolecules', 11),
        objective: 'Classify amino acids, explain protein structural hierarchy, denaturation, vitamins, and DNA/RNA double helix.',
        minutes: 35,
        learnSteps: [
            'Classify amino acids: essential (must be supplied in diet: valine, leucine, lysine) vs non-essential; dipolar zwitterion structure and amphoteric behavior.',
            'Define peptide linkage (-CO-NH-) formed by condensation between -COOH and -NH2 groups of adjacent amino acids.',
            'Explain protein structural hierarchy: Primary (specific sequence of amino acids), Secondary (regular folding stabilized by hydrogen bonds: alpha-helix and beta-pleated sheets), Tertiary (overall 3D folding giving fibrous and globular shapes stabilized by disulfide bonds, hydrogen bonds, hydrophobic interactions), Quaternary (spatial arrangement of multiple polypeptide subunits).',
            'Explain Denaturation of proteins: disruption of secondary and tertiary structures by physical (heat) or chemical (pH) changes without breaking primary peptide bonds (e.g. coagulation of egg white, curdling of milk).',
            'Vitamins: fat-soluble (A, D, E, K, stored in liver/adipose tissue) vs water-soluble (B-complex, C, excreted in urine, require regular dietary intake); deficiency diseases (xerophthalmia, beriberi, scurvy, rickets).',
            'Nucleic Acids: nucleotides composed of pentose sugar (deoxyribose in DNA, ribose in RNA), phosphoric acid, and nitrogenous bases (Purines: A, G; Pyrimidines: C, T in DNA, U in RNA); Watson-Crick double helix model with complementary base pairing A=T (2 H-bonds) and G#C (3 H-bonds).'
        ],
        practiceSteps: [
            'Distinguish DNA from RNA structurally, chemically (bases and sugars), and functionally (replication vs protein synthesis).',
            'Explain why water-soluble vitamins cannot be stored in the human body.',
            'Identify the type of protein bonding disrupted during thermal denaturation.'
        ]
    }
];
export const chemistryTopicNodes = chemistryTopicDefinitions.map(def => ({
    id: def.id,
    subjectId: def.subjectId,
    chapterId: def.chapterId,
    parentId: def.chapterId,
    kind: 'topic',
    title: def.title,
    officialScope: def.officialScope,
    source: def.source
}));
export const chemistryActivityDefinitions = chemistryTopicDefinitions.flatMap(def => {
    const node = chemistryTopicNodes.find(n => n.id === def.id);
    return buildActivitiesForTopic(node, {
        learnSteps: def.learnSteps,
        practiceSteps: def.practiceSteps,
        objective: def.objective,
        minutes: def.minutes
    });
});
