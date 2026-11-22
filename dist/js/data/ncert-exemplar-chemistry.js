/**
 * NCERT Exemplar Problems & High-Order Reasoning Solutions (HOTS)
 * Subject: Chemistry (043) - CBSE Class XII 2026-2027 Blueprint
 * Authentic problems sourced directly from the NCERT Exemplar Class 12 Chemistry publication.
 * Complete mechanistic pathways, numerical steps with units, and CBSE examiner marking rubrics.
 */
export const ncertExemplarChemistry = [
    // Chapter 1: Solutions (chem-1-1)
    {
        id: 'ex-chem-01-01',
        chapterId: 'chem-1-1',
        problemNumber: 'NCERT Exemplar Q1.12',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'A 0.5 percent aqueous solution of potassium chloride (KCl, molar mass = 74.5 g/mol) freezes at -0.24 degrees Celsius. Calculate the van \'t Hoff factor i and the degree of dissociation α of KCl in this solution. (Given Kf for water = 1.86 K kg/mol).',
        diagramDescription: 'Colligative properties comparison chart showing theoretical versus observed freezing point depression for an electrolyte undergoing dissociation.',
        analyticalSolution: 'A 0.5% aqueous solution means 0.5 g of KCl is dissolved in 100 g of solution, which corresponds to 99.5 g of solvent (water). Molality m = (w_B · 1000) / (M_B · w_A) = (0.5 · 1000) / (74.5 · 99.5) = 500 / 7412.75 = 0.06745 mol/kg. Observed freezing point depression Δ T_f = 0 - (-0.24) = 0.24 K. Theoretical freezing point depression Δ T_f(theor) = K_f · m = 1.86 · 0.06745 = 0.1255 K. Van \'t Hoff factor i = Δ T_f(obs) / Δ T_f(theor) = 0.24 / 0.1255 = 1.912. For dissociation KCl -> K+ + Cl- (number of ions n = 2), α = (i - 1) / (n - 1) = (1.912 - 1) / (2 - 1) = 0.912, or 91.2% dissociated.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Calculate molality m from the percentage composition: 0.5g solute in 99.5g solvent.',
                mathExpression: 'm = (0.5 · 1000) / (74.5 · 99.5) = 0.06745 mol/kg',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Determine theoretical freezing point depression Δ T_f = Kf · m.',
                mathExpression: 'Δ T_f(theor) = 1.86 · 0.06745 = 0.1255 K',
                marksAwarded: 0.5
            },
            {
                step: 3,
                description: 'Compute van \'t Hoff factor i = Δ T_f(obs) / Δ T_f(theor).',
                mathExpression: 'i = 0.24 / 0.1255 = 1.912',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Compute degree of dissociation α = (i - 1) / (n - 1) for n = 2.',
                mathExpression: 'α = (1.912 - 1) / (2 - 1) = 0.912 (91.2%)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1 mark for molality calculation, 1 mark for van \'t Hoff factor i, 1 mark for degree of dissociation α with percentage.',
        commonMistakesAndTraps: [
            'Assuming mass of solvent is 100 g instead of 99.5 g in a 0.5% solution (mass of solution = 100 g).',
            'Forgetting that n = 2 for KCl.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 1, Section 1.7 Abnormal Molar Masses'
    },
    {
        id: 'ex-chem-01-02',
        chapterId: 'chem-1-1',
        problemNumber: 'NCERT Exemplar Q1.23',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Explain the following observations with scientific rationale: (a) Aquatic species are more comfortable in cold waters rather than in warm waters. (b) Why does a mixture of ethanol and acetone show positive deviation from Raoult\'s law?',
        diagramDescription: 'Vapor pressure versus liquid composition curve showing positive deviation with an endothermic enthalpy of mixing Δ H_mix > 0.',
        analyticalSolution: '(a) According to Henry\'s law, the solubility of a gas in a liquid is governed by p = K_H · x. The Henry\'s law constant K_H increases with increasing temperature, which means the solubility of oxygen (x = p / K_H) decreases as water temperature rises. In cold waters, K_H is lower, resulting in a higher dissolved oxygen concentration, making respiration much easier for aquatic species. (b) In pure ethanol, molecules are strongly held together by extensive intermolecular hydrogen bonding. When acetone is added, acetone molecules slip between ethanol molecules and break some of the ethanol-ethanol hydrogen bonds. The resulting ethanol-acetone interactions are weaker than the pure ethanol hydrogen bonds (A-B interactions < A-A and B-B interactions). Consequently, molecules escape more easily into the vapor phase, leading to higher vapor pressure (positive deviation), Δ H_mix > 0 (endothermic), and Δ V_mix > 0.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Cite Henry\'s law equation p = K_H · x and explain inverse relationship between K_H and solubility.',
                mathExpression: 'K_H increases with T => Dissolved O2 solubility decreases in warm water',
                marksAwarded: 1.5
            },
            {
                step: 2,
                description: 'Identify intermolecular hydrogen bonding in pure ethanol and explain disruption by acetone.',
                mathExpression: 'Intermolecular forces: A-B (ethanol-acetone) < A-A (ethanol H-bonds) => Positive Deviation',
                marksAwarded: 1.5
            }
        ],
        cbseMarkingSchemeNote: '1.5 marks for Henry law constant temperature dependence with dissolved O2, 1.5 marks for intermolecular force comparison (A-B < A-A).',
        commonMistakesAndTraps: [
            'Stating that hot water has less oxygen without citing Henry\'s law and K_H dependence.',
            'Claiming acetone forms hydrogen bonds with ethanol that are stronger than ethanol-ethanol bonds (that would be negative deviation).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 1, Section 1.3 Solubility & Section 1.4 Non-ideal Solutions'
    },
    // Chapter 2: Electrochemistry (chem-1-2)
    {
        id: 'ex-chem-02-01',
        chapterId: 'chem-1-2',
        problemNumber: 'NCERT Exemplar Q2.7',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'Calculate the standard cell potential E°_cell and the equilibrium constant K_c for the following reaction at 298 K: 2 Fe^(3+) (aq) + 2 I^- (aq) -> 2 Fe^(2+) (aq) + I_2 (s). (Given: E°(Fe3+/Fe2+) = +0.77 V and E°(I2/I-) = +0.54 V). Also calculate the standard Gibbs free energy change Delta_r G^0.',
        diagramDescription: 'Electrochemical cell schematic with Platinum electrodes immersed in Fe3+/Fe2+ solution and I-/I2 solution connected via salt bridge.',
        analyticalSolution: 'Identify the cathode (reduction) and anode (oxidation): Fe^(3+) gains electrons to become Fe^(2+) (reduction at cathode): E°_cathode = +0.77 V. 2 I^- loses electrons to become I_2 (oxidation at anode): E°_anode = +0.54 V. The number of electrons transferred in the balanced cell reaction is n = 2. E°_cell = E°_cathode - E°_anode = 0.77 V - 0.54 V = +0.23 V. Standard Gibbs free energy change: Delta_r G^0 = -n · F · E°_cell = -2 · 96487 C/mol · 0.23 V = -44384 J/mol = -44.38 kJ/mol. Equilibrium constant: log K_c = (n · E°_cell) / 0.0591 = (2 · 0.23) / 0.0591 = 0.46 / 0.0591 = 7.783. Therefore, K_c = 10⁷.783 = 6.07 · 10⁷.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Calculate standard cell potential: E0_cell = E0_cathode - E0_anode.',
                mathExpression: 'E0_cell = +0.77 - (+0.54) = +0.23 V',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Calculate standard Gibbs energy: Δ G0 = -n F E0_cell with n = 2.',
                mathExpression: 'Δ G0 = -2 · 96500 · 0.23 = -44.39 kJ/mol',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Calculate equilibrium constant using Nernst relation log Kc = (n E°) / 0.0591.',
                mathExpression: 'log Kc = (2 · 0.23) / 0.059 = 7.783 => Kc = 6.07 · 10⁷',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for E0_cell (+0.23 V), 1 mark for Δ G0 (-44.39 kJ/mol with sign), 1 mark for Kc (antilog evaluation).',
        commonMistakesAndTraps: [
            'Using n = 1 instead of n = 2 (two electrons transferred for 2Fe3+ -> 2Fe2+ and 2I- -> I2).',
            'Forgetting negative sign in Δ G0.',
            'Reporting log Kc instead of taking the final antilog to find Kc.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 2, Section 2.3 Nernst Equation & Equilibrium Constant'
    },
    {
        id: 'ex-chem-02-02',
        chapterId: 'chem-1-2',
        problemNumber: 'NCERT Exemplar Q2.14',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'State Kohlrausch\'s law of independent migration of ions. How does molar conductivity Lambda_m vary with concentration for: (a) a strong electrolyte like KCl, and (b) a weak electrolyte like CH3COOH? Explain using the Debye-Huckel-Onsager equation and Ostwald\'s dilution law.',
        diagramDescription: 'Plot of molar conductivity Lambda_m versus √(c). Strong electrolyte shows linear decrease with small slope; weak electrolyte shows steep exponential surge as c approaches 0.',
        analyticalSolution: 'Kohlrausch\'s law states that limiting molar conductivity of an electrolyte can be represented as the sum of the individual contributions of the anion and cation of the electrolyte: Λ^0_m = ν₊ · λ^0_+ + ν₋ · λ^0_-. (a) For a strong electrolyte (KCl), dissociation is 100% complete even at high concentrations. With dilution, the inter-ionic attractions weaken, allowing ions to migrate faster. The variation follows the Debye-Huckel-Onsager equation: Lambda_m = Λ^0_m - A · √(c). Limiting molar conductivity Λ^0_m can be found directly by linear extrapolation to c = 0. (b) For a weak electrolyte (CH3COOH), dissociation is incomplete. As concentration decreases (c -> 0), the degree of dissociation α increases drastically according to Ostwald\'s dilution law: α = √(K_a / c). Near infinite dilution, α approaches 1, causing a steep, asymptotic surge in Lambda_m. Λ^0_m cannot be obtained by extrapolation to √(c) = 0 and must be calculated using Kohlrausch\'s law.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State Kohlrausch\'s law formula and definition.',
                mathExpression: 'Lambda0_m = ν₊ · lambda0_+ + ν₋ · lambda0_-',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Explain strong electrolyte behavior with Debye-Huckel-Onsager equation.',
                mathExpression: 'Lambda_m = Lambda0_m - A · √(c) (Inter-ionic attractions decrease on dilution)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Explain weak electrolyte behavior with Ostwald\'s dilution law and reason why extrapolation fails.',
                mathExpression: 'α = √(Ka / c) => α -> 1 as c -> 0 (Steep curve, Kohlrausch required)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for law definition, 1 mark for strong electrolyte behavior, 1 mark for weak electrolyte asymptotic surge explanation.',
        commonMistakesAndTraps: [
            'Saying that strong electrolytes dissociate more on dilution (they are already 100% dissociated; only interionic forces decrease).',
            'Failing to mention why linear extrapolation fails for weak electrolytes.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 2, Section 2.4 Kohlrausch\'s Law'
    },
    // Chapter 3: Chemical Kinetics (chem-1-3)
    {
        id: 'ex-chem-03-01',
        chapterId: 'chem-1-3',
        problemNumber: 'NCERT Exemplar Q3.8',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'The rate of a reaction quadruples when the temperature changes from 293 K to 313 K. Calculate the activation energy E_a of the reaction, assuming it does not change with temperature. (Given: R = 8.314 J/(K mol), log 2 = 0.3010, log 4 = 0.6020).',
        diagramDescription: 'Arrhenius plot showing log k versus 1/T with negative slope = -E_a / (2.303 · R).',
        analyticalSolution: 'According to the integrated Arrhenius equation: log(k2 / k1) = (E_a / (2.303 · R)) · [(T2 - T1) / (T1 · T2)]. Given k2 / k1 = 4, T1 = 293 K, T2 = 313 K. log 4 = 0.6020. T2 - T1 = 313 - 293 = 20 K. T1 · T2 = 293 · 313 = 91709 K². Substituting: 0.6020 = [E_a / (2.303 · 8.314)] · [20 / 91709]. 0.6020 = [E_a / 19.147] · [20 / 91709]. E_a = (0.6020 · 19.147 · 91709) / 20 = (11.526 · 91709) / 20 = 1057088 / 20 = 52854 J/mol = 52.85 kJ/mol.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State the two-temperature integrated Arrhenius equation.',
                mathExpression: 'log(k2/k1) = [Ea / (2.303 · R)] · [(T2 - T1) / (T1 · T2)]',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Substitute k2/k1 = 4, T1 = 293, T2 = 313, R = 8.314.',
                mathExpression: '0.6020 = [Ea / 19.147] · [20 / 91709]',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Solve for Ea in Joules and convert to kJ/mol.',
                mathExpression: 'Ea = (0.6020 · 19.147 · 91709) / 20 = 52.85 kJ/mol',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for formula, 1 mark for substitution, 1 mark for final answer 52.85 kJ/mol with units.',
        commonMistakesAndTraps: [
            'Using natural log (ln) with factor 2.303 together, or omitting 2.303 when using base 10 log.',
            'Reporting answer as 52854 kJ/mol instead of J/mol or 52.85 kJ/mol.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 3, Section 3.5 Temperature Dependence of Rate'
    },
    // Chapter 4: d- and f-Block Elements (chem-1-4)
    {
        id: 'ex-chem-04-01',
        chapterId: 'chem-1-4',
        problemNumber: 'NCERT Exemplar Q4.11',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Give reasons for each of the following: (a) Transition metals exhibit highest oxidation states in their oxides and fluorides only. (b) The atomic radii of second (4d) and third (5d) transition series elements are almost identical (e.g., Zr and Hf). (c) Mn^(2+) compounds are more stable than Fe^(2+) compounds towards oxidation to the +3 state.',
        diagramDescription: 'Lanthanoid contraction curve showing steady decrease in radius from La3+ to Lu3+ due to poor shielding by 4f electrons.',
        analyticalSolution: '(a) Oxygen and fluorine are the most electronegative elements with small ionic radii. Their high electronegativity and high lattice energy / bond enthalpy allow them to stabilize transition metals in their highest formal oxidation states (e.g. OsO4 has Os in +8, VF5 has V in +5). Additionally, oxygen can form multiple bonds (p_pi - d_pi bonds) with the metal, which further stabilizes the highest oxidation state. (b) The similarity in atomic radii of 4d and 5d elements (such as Zr = 160 pm and Hf = 159 pm) is due to Lanthanoid Contraction. Between lanthanum (57) and hafnium (72), fourteen 4f electrons are filled. Due to the diffuse, non-spherical shape of 4f orbitals, they provide very poor shielding for the outer 5d and 6s electrons from the increasing nuclear charge. As a result, the effective nuclear charge Z_eff increases substantially, pulling the valence shell inward and neutralizing the expected expansion from adding a new principal shell. (c) The electronic configuration of Mn^(2+) is [Ar] 3d^5, which has a half-filled d-subshell of extraordinary exchange energy stability. Removing an electron to form Mn^(3+) requires breaking this half-filled d^5 configuration (high third ionization enthalpy). For Fe^(2+), the configuration is [Ar] 3d^6; loss of one electron gives the stable half-filled [Ar] 3d^5 configuration of Fe^(3+). Hence, Fe^(2+) oxidizes easily, while Mn^(2+) is resistant to oxidation.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Oxides/Fluorides: High electronegativity, small size, and oxygen\'s ability to form multiple p_pi-d_pi bonds.',
                mathExpression: 'High electronegativity + small size + p_pi - d_pi multiple bonding',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Lanthanoid contraction: Poor shielding of 4f electrons causing high Z_eff, balancing shell addition.',
                mathExpression: 'Poor shielding of 14 4f electrons => Z_eff increases => r(Zr) ≈ r(Hf)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Electronic configurations: Mn2+ has stable half-filled 3d5; Fe2+ is 3d6 which oxidizes readily to 3d5.',
                mathExpression: 'Mn2+ ([Ar]3d5, stable half-filled) vs Fe2+ ([Ar]3d6 -> Fe3+ [Ar]3d5)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for each subpart with scientific keywords: p_pi-d_pi bonding, Lanthanoid contraction / poor shielding of 4f, half-filled 3d5 stability.',
        commonMistakesAndTraps: [
            'Simply saying "fluorine is electronegative" without mentioning small size and oxygen\'s multiple bonding capability.',
            'Stating that 4f electrons screen strongly (4f electrons screen very poorly).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 4, Section 4.3 General Properties of Transition Elements'
    },
    // Chapter 5: Coordination Compounds (chem-1-5)
    {
        id: 'ex-chem-05-01',
        chapterId: 'chem-1-5',
        problemNumber: 'NCERT Exemplar Q5.6',
        type: 'conceptual',
        difficulty: 'challenging',
        questionText: 'Using Crystal Field Theory (CFT), explain why [Co(NH3)6]^(3+) is a diamagnetic low-spin complex while [CoF6]^(3-) is a paramagnetic high-spin complex, even though cobalt is in the same +3 oxidation state in both complexes. Calculate the crystal field stabilization energy (CFSE) and spin-only magnetic moment for both.',
        diagramDescription: 'Octahedral d-orbital splitting diagram: t2g (lower triplet) and eg (upper doublet) separated by Delta_o. Comparison of strong field NH3 (Delta_o > P) vs weak field F- (Delta_o < P).',
        analyticalSolution: 'In both complexes, cobalt is in +3 oxidation state: Co = [Ar] 3d^7 4s² => Co^(3+) = [Ar] 3d^6. (1) For [Co(NH3)6]^(3+): NH3 is a strong field ligand according to the spectrochemical series. The crystal field splitting Delta_o is greater than the pairing energy P (Delta_o > P). Electrons pair up in the lower t2g orbitals before entering eg. The configuration is t2g^6 eg^0. Number of unpaired electrons n = 0. Hence it is diamagnetic (μ = 0 BM) and low-spin. CFSE = 6 · (-0.4 · Delta_o) + 3 · P = -2.4 · Delta_o + 2 · P. (2) For [CoF6]^(3-): F^- is a weak field ligand (Delta_o < P). Hund\'s rule is obeyed, and electrons occupy eg before pairing occurs in t2g. The configuration is t2g⁴ eg². Number of unpaired electrons n = 4. Hence it is paramagnetic and high-spin. Spin-only magnetic moment: μ = √(n · (n + 2)) = √(4 · 6) = √(24) ≈ 4.90 BM. CFSE = [4 · (-0.4) + 2 · (+0.6)] · Delta_o = (-1.6 + 1.2) · Delta_o = -0.4 · Delta_o.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State ground oxidation state and electronic configuration: Co3+ is [Ar] 3d6.',
                mathExpression: 'Co3+ = [Ar] 3d^6',
                marksAwarded: 0.5
            },
            {
                step: 2,
                description: 'Analyze [Co(NH3)6]3+: NH3 is strong field (Delta_o > P), giving t2g^6 eg^0, n = 0, diamagnetic.',
                mathExpression: 't2g^6 eg^0, n = 0 => Diamagnetic, μ = 0 BM, CFSE = -2.4 Delta_o',
                marksAwarded: 1.5
            },
            {
                step: 3,
                description: 'Analyze [CoF6]3-: F- is weak field (Delta_o < P), giving t2g⁴ eg², n = 4, paramagnetic.',
                mathExpression: 't2g⁴ eg², n = 4 => Paramagnetic, μ = √(24) = 4.90 BM, CFSE = -0.4 Delta_o',
                marksAwarded: 1.5
            }
        ],
        cbseMarkingSchemeNote: '1.5 marks for complete CFT configuration and magnetic property of ammine complex, 1.5 marks for fluoride complex with spin-only magnetic moment calculation.',
        commonMistakesAndTraps: [
            'Assuming NH3 is always weak field (NH3 is strong field with Co3+).',
            'Forgetting the spin-only formula μ = √(n(n+2)) BM.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 5, Section 5.5 Bonding in Coordination Compounds (CFT)'
    },
    // Chapter 6: Haloalkanes and Haloarenes (chem-2-1)
    {
        id: 'ex-chem-06-01',
        chapterId: 'chem-2-1',
        problemNumber: 'NCERT Exemplar Q6.9',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Give reasons for the following: (a) Haloarenes are extremely less reactive towards nucleophilic substitution reactions compared to haloalkanes. (b) The dipole moment of chlorobenzene is lower than that of cyclohexyl chloride. (c) Alkyl halides, though polar, are completely immiscible with water.',
        diagramDescription: 'Resonance structures of chlorobenzene showing partial double bond character between carbon and chlorine atom.',
        analyticalSolution: '(a) Haloarenes are unreactive towards nucleophilic substitution due to four reasons: (1) Resonance effect: The lone pair of electrons on chlorine delocalizes with the π-electrons of the benzene ring, imparting partial double-bond character to the C-Cl bond, making it much shorter and stronger to cleave. (2) Hybridization: The carbon attached to halogen in haloarene is sp² hybridized with greater s-character (33.3%), making it more electronegative and holding the shared pair more tightly than the sp³ carbon (25% s-character) in haloalkanes. (3) Instability of phenyl cation: If the C-Cl bond were to ionize, the resulting phenyl cation is extremely unstable because the positive charge is in an sp² orbital. (4) Electronic repulsion: The electron-rich incoming nucleophile experiences severe electrostatic repulsion from the delocalized π-electron cloud of the aromatic ring. (b) In cyclohexyl chloride, the C-Cl bond involves an sp³ carbon which has lower electronegativity, so electron release towards chlorine is stronger. In chlorobenzene, the sp² carbon is more electronegative, which pulls electron density back, opposing the C->Cl dipole. Furthermore, delocalization of chlorine\'s lone pair into the ring creates a partial negative charge in the ring and positive on chlorine, reducing net dipole moment (1.69 D vs 1.86 D). (c) For an alkyl halide to dissolve in water, new solute-solvent interactions must be formed that release sufficient energy to break the strong existing hydrogen bonds between water molecules. The dipole-dipole attractions between alkyl halide and water molecules are far weaker than the extensive hydrogen bonds between water molecules, making dissolution energetically unfavorable.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State 4 factors for low reactivity of haloarenes: resonance (partial double bond), sp2 vs sp3 carbon, instability of phenyl cation, π-electron repulsion.',
                mathExpression: 'Resonance C=Cl + sp2 carbon (33% s-character) + unstable phenyl cation',
                marksAwarded: 1.5
            },
            {
                step: 2,
                description: 'Explain dipole moment difference using sp2 vs sp3 hybridization and opposing resonance dipole.',
                mathExpression: 'sp2 carbon in chlorobenzene is more electronegative than sp3 in cyclohexyl chloride',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Explain water immiscibility: alkyl halide-water forces are weaker than water-water H-bonds.',
                mathExpression: 'Alkyl halide cannot break strong intermolecular H-bonds of water',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1.5 marks for haloarene substitution (must mention partial double bond and sp2 carbon), 1 mark for dipole moment, 0.5 marks for water H-bond breakdown.',
        commonMistakesAndTraps: [
            'Mentioning only resonance without mentioning sp2 hybridization of carbon.',
            'Thinking alkyl halides can form hydrogen bonds with water.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 6, Section 6.7 Chemical Reactions of Haloarenes'
    },
    // Chapter 7: Alcohols, Phenols and Ethers (chem-2-2)
    {
        id: 'ex-chem-07-01',
        chapterId: 'chem-2-2',
        problemNumber: 'NCERT Exemplar Q7.5',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Explain the following: (a) Phenol is more acidic than ethanol. (b) Ortho-nitrophenol is steam volatile whereas para-nitrophenol is not. (c) Preparation of ethers by Williamson synthesis fails when a tertiary alkyl halide (e.g. tert-butyl bromide) is reacted with sodium ethoxide.',
        diagramDescription: 'Structural formulas showing intramolecular hydrogen bonding in ortho-nitrophenol (chelation) versus intermolecular hydrogen bonding in para-nitrophenol.',
        analyticalSolution: '(a) In phenol, loss of a proton generates the phenoxide ion (C6H5O^-). The negative charge on oxygen is stabilized by delocalization across the ortho and para positions of the benzene ring through resonance. In ethanol, loss of a proton forms the ethoxide ion (C2H5O^-), where the electron-donating inductive (+I) effect of the ethyl group intensifies the negative charge on oxygen, destabilizing it without any resonance stabilization. Hence, phenol is ≈10⁶ times more acidic than ethanol. (b) Ortho-nitrophenol possesses an intramolecular hydrogen bond (chelation) between the phenolic -OH and adjacent nitro -NO2 group, forming a closed 6-membered ring. This prevents it from forming hydrogen bonds with neighboring molecules, resulting in lower boiling point and steam volatility. In para-nitrophenol, the -OH and -NO2 groups are too far apart for intramolecular bonding, so it forms extensive intermolecular hydrogen bonds, creating large molecular associations with higher boiling points and low volatility. (c) Alkoxide ions (e.g. C2H5O^-) are not only nucleophiles but also strong Bronsted bases. When reacted with a tertiary alkyl halide like (CH3)3C-Br, steric hindrance prevents back-side nucleophilic attack (S_N2). Instead, the strong basic ethoxide ion abstracts a β-hydrogen in an E2 elimination reaction, yielding 2-methylpropene (isobutylene) as the exclusive major product instead of an ether.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Contrast phenoxide resonance stabilization with ethoxide destabilization by +I effect.',
                mathExpression: 'Phenoxide ion stabilized by 5 resonance structures; Ethoxide destabilized by +I',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Explain steam volatility: intramolecular H-bonding (chelation) in ortho vs intermolecular in para.',
                mathExpression: 'o-nitrophenol: Intramolecular H-bond (chelate) => Steam volatile; p-nitrophenol: Intermolecular',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Explain Williamson failure with 3° halides: strong base causes E2 elimination giving alkene.',
                mathExpression: '(CH3)3C-Br + C2H5O^- -> (CH3)2C=CH2 + C2H5OH + Br^- (E2 elimination)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for phenoxide resonance, 1 mark for intramolecular vs intermolecular H-bonding, 1 mark for elimination reaction equation giving alkene.',
        commonMistakesAndTraps: [
            'Drawing resonance structures for phenol instead of the phenoxide ion (acidic strength is determined by conjugate base stability).',
            'Thinking tertiary halides undergo SN1 with sodium ethoxide (elimination dominates completely).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 7, Section 7.4 Acidity of Phenols & Section 7.6 Ethers'
    },
    // Chapter 8: Aldehydes, Ketones and Carboxylic Acids (chem-2-3)
    {
        id: 'ex-chem-08-01',
        chapterId: 'chem-2-3',
        problemNumber: 'NCERT Exemplar Q8.7',
        type: 'conceptual',
        difficulty: 'challenging',
        questionText: 'An organic compound [A] with molecular formula C5H10O forms an orange-red precipitate with 2,4-DNP reagent and gives a yellow precipitate with iodine in the presence of sodium hydroxide. It does not reduce Tollens\' reagent or Fehling\'s solution, and does not decolorize bromine water. On drastic oxidation with chromic acid, it gives ethanoic acid and propanoic acid. (a) Identify compound [A]. (b) Write all the chemical reactions involved.',
        diagramDescription: 'Reaction scheme outlining 2,4-DNP test, Iodoform haloform cleavage, Tollens negative result, and vigorous oxidation breakdown.',
        analyticalSolution: '(1) Since [A] forms a precipitate with 2,4-DNP, it must be a carbonyl compound (aldehyde or ketone). (2) It does not reduce Tollens\' reagent or Fehling\'s solution, meaning it is not an aldehyde; hence [A] is a ketone. (3) It gives a yellow precipitate with I2/NaOH, meaning it gives a positive Iodoform test, confirming the presence of a methyl ketone group (-COCH3). (4) Since its molecular formula is C5H10O, the ketone with a -COCH3 group must be pentan-2-one: CH3-CO-CH2-CH2-CH3. (5) On drastic oxidation with chromic acid, cleavage occurs on either side of the carbonyl group (Popoff\'s rule: C=O stays predominantly with smaller alkyl group), yielding ethanoic acid (CH3COOH) and propanoic acid (CH3CH2COOH). This confirms [A] is pentan-2-one.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Deduce carbonyl from 2,4-DNP and ketone from negative Tollens test.',
                mathExpression: '2,4-DNP (+) => Carbonyl; Tollens (-) => Ketone',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Deduce methyl ketone from positive Iodoform test (CHI3 yellow ppt).',
                mathExpression: 'I2/NaOH (+) => Presence of CH3-C=O unit => Pentan-2-one',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Write Iodoform reaction: CH3-CO-(CH2)2CH3 + 3I2 + 4NaOH -> CHI3 (yellow) + CH3CH2CH2COONa + 3NaI + 3H2O.',
                mathExpression: 'CH3COCH2CH2CH3 + 3 I2 + 4 NaOH -> CHI3 v + CH3CH2CH2COONa + 3 NaI + 3 H2O',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Write oxidation reaction: CH3-CO-CH2CH2CH3 + [O] -> CH3COOH + CH3CH2COOH.',
                mathExpression: 'Pentan-2-one -> Ethanoic acid + Propanoic acid',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for identification of pentan-2-one with logical deductions, 1 mark for 2,4-DNP and Tollens deduction, 1 mark for balanced Iodoform equation, 1 mark for oxidation cleavage.',
        commonMistakesAndTraps: [
            'Choosing pentan-3-one (pentan-3-one does not give positive iodoform test because it has -CO-CH2CH3, not -COCH3).',
            'Failing to write balanced iodoform equation.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 8, Section 8.4 Chemical Reactions of Aldehydes and Ketones'
    },
    // Chapter 9: Amines (chem-2-4)
    {
        id: 'ex-chem-09-01',
        chapterId: 'chem-2-4',
        problemNumber: 'NCERT Exemplar Q9.3',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Arrange the following in increasing order of their basic strength in aqueous solution and justify the order: (CH3)2NH, CH3NH2, (CH3)3N, NH3. How does this order differ for ethyl substituted amines?',
        diagramDescription: 'Bar chart illustrating the tripartite competition of inductive (+I) effect, steric hindrance, and solvation energy by hydration determining basic strength in aqueous solution.',
        analyticalSolution: 'In aqueous medium, the basic strength of aliphatic amines is determined by the interplay of three factors: (1) Inductive (+I) effect of alkyl groups, which increases electron density on nitrogen (3° > 2° > 1° > NH3). (2) Solvation energy (hydration): Smaller ammonium cations form more hydrogen bonds with water molecules, stabilizing the conjugate acid (1° > 2° > 3°). (3) Steric hindrance: Bulkier alkyl groups crowd the nitrogen atom, hindering attack of the proton (1° > 2° > 3°). For methyl substituted amines, the methyl group is small, so steric hindrance is minimal; the balance of solvation and inductive effects makes the secondary amine most basic, followed by primary: NH3 < (CH3)3N < CH3NH2 < (CH3)2NH. (Order: 2° > 1° > 3° > NH3). For ethyl substituted amines, the bulkier ethyl group creates significant steric hindrance, favoring the secondary over tertiary and primary over tertiary: NH3 < (C2H5)3N < C2H5NH2 < (C2H5)2NH? No, the experimental order is: NH3 < (C2H5)NH2 (1°) < (C2H5)3N (3°) < (C2H5)2NH (2°). (Order: 2° > 3° > 1° > NH3).',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State the 3 governing factors: Inductive (+I) effect, Solvation energy, and Steric hindrance.',
                mathExpression: 'Three factors: +I effect, Hydration enthalpy, Steric hindrance',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'State correct order for methyl amines: NH3 < (CH3)3N < CH3NH2 < (CH3)2NH (2° > 1° > 3° > NH3).',
                mathExpression: 'Methyl: (CH3)2NH > CH3NH2 > (CH3)3N > NH3 (2° > 1° > 3° > NH3)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'State correct order for ethyl amines: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (2° > 3° > 1° > NH3).',
                mathExpression: 'Ethyl: (C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3 (2° > 3° > 1° > NH3)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for naming all 3 factors, 1 mark for methyl order (213), 1 mark for ethyl order (231).',
        commonMistakesAndTraps: [
            'Applying only inductive effect and writing 3° > 2° > 1° (that is true in gaseous phase only, NOT in aqueous solution).',
            'Confusing the methyl sequence (2° > 1° > 3°) with ethyl sequence (2° > 3° > 1°).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 9, Section 9.4 Basicity of Amines'
    },
    // Chapter 10: Biomolecules (chem-2-5)
    {
        id: 'ex-chem-10-01',
        chapterId: 'chem-2-5',
        problemNumber: 'NCERT Exemplar Q10.5',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Explain the following biochemical phenomena: (a) What happens when D-glucose is treated with: (i) Bromine water, and (ii) Concentrated HNO3? What do these reactions prove about glucose structure? (b) What is denaturation of proteins? Which structural levels of protein architecture remain intact and which are destroyed during denaturation?',
        diagramDescription: 'Structural formulas showing mild oxidation of glucose aldehyde group to gluconic acid versus strong oxidation to glucaric acid (saccharic acid). Diagram of protein denaturation unfolding α-helix into random coil.',
        analyticalSolution: '(a) (i) Treatment with mild oxidizing agent bromine water (Br2/H2O) oxidizes the terminal aldehyde (-CHO) group to a carboxylic acid (-COOH) while leaving the secondary and primary alcoholic groups untouched, forming D-gluconic acid (C6H12O7). This proves that the carbonyl group in glucose is an aldehyde group (-CHO), not a ketone. (ii) Treatment with strong oxidizing agent concentrated nitric acid (conc. HNO3) oxidizes both the terminal aldehyde group (-CHO) and the terminal primary alcoholic group (-CH2OH) at C-6 to carboxylic acids, forming D-glucaric acid (saccharic acid, C6H10O8). This proves the presence of a primary alcoholic group (-CH2OH) in glucose. (b) Denaturation of a protein is a process in which a native protein loses its higher-order three-dimensional conformation and biological activity due to physical changes (such as heat/temperature change) or chemical changes (such as pH change). During denaturation, the weak hydrogen bonds, ionic bonds, and hydrophobic interactions stabilizing the secondary (α-helix and β-pleated sheets) and tertiary (3D globular folding) structures are disrupted, causing the protein globules to unfold into random coils. However, the covalent peptide bonds (-CO-NH-) linking amino acids in the primary structure remain completely intact.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Bromine water reaction: CHO-(CHOH)4-CH2OH + [O] -> COOH-(CHOH)4-CH2OH (Gluconic acid proves -CHO group).',
                mathExpression: 'Glucose + Br2/H2O -> Gluconic Acid (Confirms aldehyde group)',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Conc HNO3 reaction: oxidizes both -CHO and -CH2OH to -COOH yielding Saccharic acid (confirms 1° alcohol).',
                mathExpression: 'Glucose + conc. HNO3 -> Glucaric (Saccharic) Acid (Confirms 1° alcohol at C-6)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Define denaturation and specify that secondary and tertiary structures are destroyed while primary remains intact.',
                mathExpression: 'Loss of biological activity: 2° & 3° destroyed (H-bonds break); 1° remains intact (peptide bonds survive)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for gluconic acid and -CHO deduction, 1 mark for saccharic acid and 1° alcohol deduction, 1 mark for denaturation specifying 1° structure remains intact.',
        commonMistakesAndTraps: [
            'Stating that all structures including primary are destroyed in denaturation (peptide bonds require enzymatic or strong acid hydrolysis to break).',
            'Confusing gluconic acid with glucaric acid.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 10, Section 10.1 Glucose Reactions & Section 10.2 Proteins'
    }
];
