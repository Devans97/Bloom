/**
 * CBSE Class XII Physics (042) - Official Question Bank & Step-Marking Rubrics
 * 2026-2027 Examination Blueprint Standard
 * Authentic CBSE questions across all 5 standard paper sections:
 * - Section A: MCQs and Assertion-Reasoning (1 mark each)
 * - Section B: Very Short Answer (2 marks each)
 * - Section C: Short Answer (3 marks each)
 * - Section D: Case-Based Competency Questions (4 marks each)
 * - Section E: Long Answer Derivations and Numericals (5 marks each)
 */

export interface StepRubricItem {
  step: string;
  marks: number;
}

export interface CBSEQuestion {
  id: string;
  chapterId: string;
  subjectId: 'physics';
  section: 'A' | 'B' | 'C' | 'D' | 'E';
  marks: 1 | 2 | 3 | 4 | 5;
  questionType: 'MCQ' | 'Assertion-Reason' | 'VSA' | 'SA' | 'Case-Study' | 'LA';
  questionText: string;
  mcqOptions?: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctOption?: 'A' | 'B' | 'C' | 'D';
  casePassage?: string;
  subQuestions?: { questionNumber: string; text: string; marks: number }[];
  stepRubrics: StepRubricItem[];
  modelAnswer: string;
  examinerNotes: string;
}

export const cbsePhysicsQuestionBank: CBSEQuestion[] = [
  // SECTION A: 1-Mark MCQs & Assertion-Reason
  {
    id: 'phy-q-001',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'An electric dipole of moment p is placed in a uniform electric field E. The torque experienced by the dipole is maximum when the angle between p and E is:',
    mcqOptions: [
      { key: 'A', text: '0 degrees' },
      { key: 'B', text: '45 degrees' },
      { key: 'C', text: '90 degrees' },
      { key: 'D', text: '180 degrees' }
    ],
    correctOption: 'C',
    stepRubrics: [
      { step: 'Identify torque formula τ = p · E · sin θ', marks: 0.5 },
      { step: 'Determine that sin θ is maximum (= 1) when θ = 90 degrees', marks: 0.5 }
    ],
    modelAnswer: 'Option (C): 90 degrees. Torque magnitude is given by τ = p · E · sin θ. The sine function attains its maximum value of 1 when θ = 90 degrees (or π/2 radians).',
    examinerNotes: 'Many students confuse stable equilibrium (θ = 0) or unstable equilibrium (θ = 180) with maximum torque orientation.'
  },
  {
    id: 'phy-q-002',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'Two point charges +q and -q are held at a distance d apart. A Gaussian spherical surface of radius R (where R > d) encloses both charges. The total electric flux through this surface is:',
    mcqOptions: [
      { key: 'A', text: 'q / ε₀' },
      { key: 'B', text: '-q / ε₀' },
      { key: 'C', text: '2q / ε₀' },
      { key: 'D', text: 'Zero' }
    ],
    correctOption: 'D',
    stepRubrics: [
      { step: 'State Gauss law: Φ = q_enclosed / ε₀', marks: 0.5 },
      { step: 'Sum charges inside surface: (+q) + (-q) = 0', marks: 0.5 }
    ],
    modelAnswer: 'Option (D): Zero. According to Gauss’s Theorem, the total flux through any closed Gaussian surface equals q_enclosed / ε₀. Since the dipole consists of +q and -q, the net enclosed charge is (+q) + (-q) = 0. Hence Φ = 0.',
    examinerNotes: 'Note that zero flux does not mean electric field is zero on the surface; only the surface integral of E · dA is zero.'
  },
  {
    id: 'phy-q-003',
    chapterId: 'physics-1-2',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'A parallel plate capacitor is charged by a battery and then disconnected. A dielectric slab of dielectric constant K is then inserted between the plates. Which of the following quantities increases?',
    mcqOptions: [
      { key: 'A', text: 'Charge on the plates' },
      { key: 'B', text: 'Potential difference between the plates' },
      { key: 'C', text: 'Capacitance of the capacitor' },
      { key: 'D', text: 'Electrostatic energy stored in the capacitor' }
    ],
    correctOption: 'C',
    stepRubrics: [
      { step: 'Analyze state with battery disconnected: Q remains constant', marks: 0.5 },
      { step: 'Capacitance increases by factor K: C = K · C0', marks: 0.5 }
    ],
    modelAnswer: 'Option (C): Capacitance of the capacitor. With the battery disconnected, the charge Q on the plates remains constant. The capacitance increases from C0 to K · C0. The potential difference V = Q / C decreases by factor K, and stored energy U = Q² / (2C) also decreases by factor K.',
    examinerNotes: 'Always verify whether the battery remains connected (V constant) or is disconnected (Q constant) before answering.'
  },
  {
    id: 'phy-q-004',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'A wire of resistance R is stretched uniformly such that its length increases by 10%. The percentage increase in its resistance is approximately:',
    mcqOptions: [
      { key: 'A', text: '10%' },
      { key: 'B', text: '20%' },
      { key: 'C', text: '21%' },
      { key: 'D', text: '25%' }
    ],
    correctOption: 'C',
    stepRubrics: [
      { step: 'Use volume conservation: R proportional to l²', marks: 0.5 },
      { step: 'Compute R_new / R_old = (1.1)² = 1.21 => 21% increase', marks: 0.5 }
    ],
    modelAnswer: 'Option (C): 21%. During uniform stretching, the total volume V = A · l remains constant. Therefore, A = V / l, giving R = ρ · l / A = ρ · l² / V. Hence R is proportional to l². If length becomes l\' = 1.1 l, then R\' = (1.1)² R = 1.21 R. Percentage increase = ((1.21 - 1) / 1) · 100% = 21%.',
    examinerNotes: 'Common error is answering 10% or 20% by assuming cross-sectional area A remains unchanged.'
  },
  {
    id: 'phy-q-005',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'Assertion-Reason',
    questionText: 'Assertion (A): Two parallel wires carrying currents in the same direction attract each other.\nReason (R): Parallel currents produce magnetic fields that exert forces on each other according to Fleming’s Left-Hand Rule.',
    mcqOptions: [
      { key: 'A', text: 'Both (A) and (R) are true, and (R) is the correct explanation of (A).' },
      { key: 'B', text: 'Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).' },
      { key: 'C', text: '(A) is true, but (R) is false.' },
      { key: 'D', text: '(A) is false, but (R) is true.' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Evaluate Assertion: like currents attract (True)', marks: 0.5 },
      { step: 'Evaluate Reason: field from wire 1 exerts inward force on wire 2 by Fleming Left-Hand rule (True and explains A)', marks: 0.5 }
    ],
    modelAnswer: 'Option (A): Both (A) and (R) are true, and (R) is the correct explanation of (A). Conductor 1 creates a magnetic field B1 directed into the plane at conductor 2. Conductor 2 carrying current upward in this field experiences an attractive force directed towards conductor 1 by Fleming’s left-hand rule.',
    examinerNotes: 'Unlike electrostatics where like charges repel, in magnetostatics parallel currents attract.'
  },

  // SECTION B: 2-Mark Very Short Answer Questions
  {
    id: 'phy-q-006',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'Define electric flux. State its SI unit. A point charge q is placed at the center of a cube of side a. What is the electric flux passing through each face of the cube?',
    stepRubrics: [
      { step: 'Definition of electric flux: Φ = integral E · dA (surface integral of electric field)', marks: 0.5 },
      { step: 'SI unit: N·m²/C or V·m', marks: 0.5 },
      { step: 'Total flux through cube = q / ε₀', marks: 0.5 },
      { step: 'Flux through each of the 6 symmetric faces = q / (6 · ε₀)', marks: 0.5 }
    ],
    modelAnswer: '1. Electric flux is the measure of the total number of electric field lines passing normally through a given surface area: Φ = oint E · dA.\n2. SI Unit: N·m²/C or Volt·meter (V·m).\n3. By Gauss’s Theorem, total flux through the cube enclosing charge q is Phi_total = q / ε₀.\n4. By symmetry, the flux is distributed equally across all 6 faces. Therefore, flux through one face = Phi_total / 6 = q / (6 · ε₀).',
    examinerNotes: 'Ensure student states the factor of 1/6 for individual face flux.'
  },
  {
    id: 'phy-q-007',
    chapterId: 'physics-2-3',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'State Lenz’s law of electromagnetic induction. Show that Lenz’s law is in accordance with the law of conservation of energy.',
    stepRubrics: [
      { step: 'Statement of Lenz’s Law: Polarity of induced EMF opposes the change in magnetic flux producing it', marks: 1.0 },
      { step: 'Energy conservation argument: Mechanical work done against opposing magnetic force converts to electrical energy', marks: 1.0 }
    ],
    modelAnswer: '1. Lenz’s Law states that the polarity of induced EMF is always such that it tends to produce an induced current whose magnetic field opposes the change in magnetic flux that produces it (e = -dPhi / dt).\n2. Energy Conservation: When the north pole of a magnet is pushed into a closed coil, the induced current creates an opposing north magnetic face, requiring mechanical work to push the magnet against this repulsion. This mechanical work done by an external agent is converted into electrical energy in the coil. If it did not oppose, a tiny push would cause spontaneous infinite acceleration, violating the principle of conservation of energy.',
    examinerNotes: 'A complete answer must explain both the opposing force and the mechanical-to-electrical energy transformation.'
  },
  {
    id: 'phy-q-008',
    chapterId: 'physics-4-1',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'The work function of cesium is 2.14 eV. Find: (a) the threshold frequency for cesium, and (b) the wavelength of the incident light if the stopping potential is 0.60 V. (Given: h = 6.63 x 10⁻³⁴ J·s, e = 1.6 x 10⁻¹⁹ C, c = 3 x 10⁸ m/s).',
    stepRubrics: [
      { step: 'Calculate threshold frequency: ν₀ = φ₀ / h with eV to Joules conversion', marks: 1.0 },
      { step: 'Calculate incident wavelength using Einstein photoelectric equation Kmax = e · V0 and E = h · c / λ', marks: 1.0 }
    ],
    modelAnswer: '(a) Threshold frequency ν₀ = φ₀ / h\nphi0 = 2.14 eV = 2.14 · 1.6 · 10⁻¹⁹ J = 3.424 · 10⁻¹⁹ J\nnu0 = (3.424 · 10⁻¹⁹) / (6.63 · 10⁻³⁴) = 5.16 · 10¹⁴ Hz.\n\n(b) Maximum kinetic energy Kmax = e · V0 = 0.60 eV.\nEnergy of incident photon E = φ₀ + Kmax = 2.14 eV + 0.60 eV = 2.74 eV = 2.74 · 1.6 · 10⁻¹⁹ J = 4.384 · 10⁻¹⁹ J.\nWavelength λ = h · c / E = (6.63 · 10⁻³⁴ · 3 · 10⁸) / (4.384 · 10⁻¹⁹) = 4.54 · 10⁻⁷ m = 454 nm.',
    examinerNotes: 'Check units carefully: forgetting to multiply by 1.6 x 10⁻¹⁹ to convert eV to Joules before dividing by h is the most common pitfall.'
  },

  // SECTION C: 3-Mark Short Answer Questions
  {
    id: 'phy-q-009',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Two cells of EMF E1 and E2 and internal resistances r1 and r2 respectively are connected in parallel such that their like poles are joined together. Derive an expression for the equivalent EMF and equivalent internal resistance of the combination.',
    stepRubrics: [
      { step: 'Draw labelled circuit diagram of two cells in parallel connected across terminals A and B', marks: 0.5 },
      { step: 'Express terminal potential difference V = E1 - I1 · r1 and V = E2 - I2 · r2', marks: 1.0 },
      { step: 'Sum currents I = I1 + I2 = (E1 - V)/r1 + (E2 - V)/r2', marks: 0.5 },
      { step: 'Rearrange into standard form V = E_eq - I · r_eq', marks: 0.5 },
      { step: 'State final formulas: E_eq = (E1 · r2 + E2 · r1)/(r1 + r2) and r_eq = r1 · r2/(r1 + r2)', marks: 0.5 }
    ],
    modelAnswer: '1. Let the two cells have terminal potential difference V across common terminals A and B. Current I = I1 + I2.\n2. For first cell: V = E1 - I1 · r1 => I1 = (E1 - V) / r1.\n3. For second cell: V = E2 - I2 · r2 => I2 = (E2 - V) / r2.\n4. Total current: I = (E1 - V) / r1 + (E2 - V) / r2 = (E1 / r1 + E2 / r2) - V · (1 / r1 + 1 / r2).\n5. Rearranging for V:\nV · [ (r1 + r2) / (r1 · r2) ] = [ (E1 · r2 + E2 · r1) / (r1 · r2) ] - I\nV = [ (E1 · r2 + E2 · r1) / (r1 + r2) ] - I · [ (r1 · r2) / (r1 + r2) ].\n6. Comparing with V = E_eq - I · r_eq:\nE_eq = (E1 · r2 + E2 · r1) / (r1 + r2), and 1 / r_eq = 1 / r1 + 1 / r2 => r_eq = (r1 · r2) / (r1 + r2).',
    examinerNotes: 'When like terminals are connected, the signs in E1 · r2 and E2 · r1 are positive. If connected with opposing polarities, the numerator becomes (E1 · r2 - E2 · r1).'
  },
  {
    id: 'phy-q-010',
    chapterId: 'physics-3-2',
    subjectId: 'physics',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Draw a labelled ray diagram of a compound microscope with the final image formed at the near point of distinct vision (D). State the expression for its magnifying power.',
    stepRubrics: [
      { step: 'Neat labelled ray diagram showing objective lens, real inverted magnified intermediate image A\'B\', and eyepiece acting as simple magnifier', marks: 1.5 },
      { step: 'Arrows indicating direction of light rays', marks: 0.5 },
      { step: 'Expression for magnifying power: m = m_o · m_e = (-v_o / u_o) · (1 + D / f_e)', marks: 1.0 }
    ],
    modelAnswer: '1. Diagram: Small aperture objective lens O forms real, inverted, magnified image A\'B\' of object AB placed just beyond focal length fo. Intermediate image A\'B\' lies within the focal point fe of large aperture eyepiece E. Eyepiece forms virtual, highly magnified final image A\'\'B\'\' at near point D = 25 cm.\n2. Magnifying power:\nm = m_o · m_e\nm_o = -v_o / u_o (linear magnification of objective)\nm_e = 1 + D / f_e (magnification of eyepiece at near point)\nm = (-v_o / u_o) · (1 + D / f_e).\nFor a microscope where u_o ≈ f_o and v_o ≈ L (tube length): m ≈ -(L / f_o) · (1 + D / f_e).',
    examinerNotes: 'Arrows on all light rays are strictly mandatory according to CBSE marking instructions; missing ray arrows deduct 0.5 marks.'
  },

  // SECTION D: 4-Mark Case-Based Competency Question
  {
    id: 'phy-q-011',
    chapterId: 'physics-3-3',
    subjectId: 'physics',
    section: 'D',
    marks: 4,
    questionType: 'Case-Study',
    questionText: 'Read the following passage and answer the questions that follow:\n\nYoung’s double-slit experiment (YDSE) definitively proved the wave nature of light. A monochromatic light source illuminates two narrow parallel slits S1 and S2 separated by distance d. An interference pattern of alternate bright and dark bands is formed on a screen placed at distance D from the slits. The intensity at any point depends on the phase difference between waves arriving from the two slits. If the initial intensity from each slit is I0, the resultant intensity is given by I = 4 · I0 · cos²(phi / 2).',
    subQuestions: [
      {
        questionNumber: '(i)',
        text: 'What is the phase difference between two interfering waves at the position of the first dark fringe?',
        marks: 1
      },
      {
        questionNumber: '(ii)',
        text: 'What will happen to the fringe width if the entire YDSE apparatus is immersed in water of refractive index 4/3?',
        marks: 1
      },
      {
        questionNumber: '(iii)',
        text: 'Calculate the ratio of maximum to minimum intensity in an interference pattern if the ratio of slit widths is 4:1.',
        marks: 2
      }
    ],
    stepRubrics: [
      { step: 'Part (i): Phase difference for destructive interference phi = π (180 degrees)', marks: 1.0 },
      { step: 'Part (ii): Wavelength decreases by 4/3 => fringe width beta decreases by 4/3 (becomes 3/4 beta_air)', marks: 1.0 },
      { step: 'Part (iii): Slit width ratio w1/w2 = I1/I2 = a1²/a2² = 4/1 => amplitude ratio a1/a2 = 2/1', marks: 1.0 },
      { step: 'Part (iii): Imax / Imin = (a1 + a2)² / (a1 - a2)² = (2 + 1)² / (2 - 1)² = 9 / 1', marks: 1.0 }
    ],
    modelAnswer: '(i) At the first dark fringe, destructive interference occurs. The path difference is Δ x = λ / 2, which corresponds to phase difference phi = (2 · π / λ) · (λ / 2) = π radians (or 180 degrees).\n\n(ii) Fringe width is given by beta = λ · D / d. In water of refractive index n = 4/3, the wavelength reduces to lambda_water = lambda_air / n = (3/4) · lambda_air. Since D and d remain unchanged, the fringe width decreases to 3/4 of its value in air (decreases by 25%).\n\n(iii) Slit width is directly proportional to intensity: I1 / I2 = w1 / w2 = 4 / 1.\nSince intensity is proportional to amplitude squared: a1 / a2 = √(I1 / I2) = √(4 / 1) = 2 / 1.\nRatio of maximum to minimum intensity:\nImax = (a1 + a2)², and Imin = (a1 - a2)²\nImax / Imin = (2 + 1)² / (2 - 1)² = 3² / 1² = 9 / 1 = 9:1.',
    examinerNotes: 'Check part (iii): common error is computing (4+1)² / (4-1)² = 25/9 by using intensities directly instead of amplitudes.'
  },

  // SECTION E: 5-Mark Long Answer Question
  {
    id: 'phy-q-012',
    chapterId: 'physics-5-1',
    subjectId: 'physics',
    section: 'E',
    marks: 5,
    questionType: 'LA',
    questionText: '(a) Explain with the help of a labelled circuit diagram the working principle of a full-wave rectifier using two junction diodes. (b) Draw the input and output waveforms. (c) If the input AC frequency is 50 Hz, what is the output ripple frequency in a full-wave rectifier and why?',
    stepRubrics: [
      { step: 'Labelled circuit diagram with center-tapped transformer, two diodes D1 and D2, load resistor RL', marks: 1.5 },
      { step: 'Clear explanation of conduction during positive and negative half-cycles with current direction through RL', marks: 1.5 },
      { step: 'Input and output waveform diagrams', marks: 1.0 },
      { step: 'Output ripple frequency = 2 · f_in = 100 Hz with justification', marks: 1.0 }
    ],
    modelAnswer: '(a) Working Principle: A full-wave rectifier utilizes a center-tapped step-down transformer and two p-n junction diodes D1 and D2. Diodes conduct only in forward bias.\n- During the positive half cycle of AC input, terminal A of the secondary winding is positive and terminal B is negative with respect to the center tap. Diode D1 is forward biased and conducts; diode D2 is reverse biased and does not conduct. Current flows through load resistor RL from top to bottom (X to Y).\n- During the negative half cycle, terminal A becomes negative and terminal B becomes positive with respect to center tap. Now diode D1 is reverse biased (no conduction), while diode D2 is forward biased and conducts. Current flows through load resistor RL in the SAME direction (X to Y).\n\n(b) Waveforms: The input AC wave alternates above and below zero axis. The output across RL is unidirectional pulsating DC containing positive pulses for every half cycle.\n\n(c) Output Ripple Frequency:\nSince both the positive and negative half cycles of the input AC produce consecutive unidirectional output pulses across RL, one full cycle of AC input generates two output pulses.\nTherefore, Output Ripple Frequency = 2 · Input Frequency = 2 · 50 Hz = 100 Hz.',
    examinerNotes: 'Emphasize that current flows through RL in the same direction during both half-cycles. Half-wave output frequency is 50 Hz; full-wave output frequency is 100 Hz.'
  },
  {
    id: 'phy-q-013',
    chapterId: 'physics-2-2',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'Assertion-Reason',
    questionText: 'Given below are two statements labeled as Assertion (A) and Reason (R).\nAssertion (A): Lenz\'s law is a consequence of the law of conservation of energy.\nReason (R): The induced electromotive force always opposes the change in magnetic flux that produces it, requiring external mechanical work to be performed which converts into electrical energy.',
    mcqOptions: [
      { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A).' },
      { key: 'B', text: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).' },
      { key: 'C', text: '(A) is true but (R) is false.' },
      { key: 'D', text: '(A) is false and (R) is also false.' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Correct option A with reasoning based on mechanical work converted into electrical energy', marks: 1.0 }
    ],
    modelAnswer: 'Correct Option: (A). When a magnet is moved toward a closed conducting loop, the induced current produces a magnetic field that repels the incoming magnet. Mechanical work must be done against this repulsive force to move the magnet. This mechanical work is precisely converted into electrical energy and subsequently dissipated as Joule heat in the loop. If Lenz\'s law did not hold, an attractive force would accelerate the magnet perpetually without any work input, violating energy conservation.',
    examinerNotes: 'Classic 1-mark board assertion-reason question on electromagnetic induction.'
  },
  {
    id: 'phy-q-014',
    chapterId: 'physics-4-1',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'An alpha particle and a proton are accelerated from rest through the same electrical potential difference V. The ratio of their de Broglie wavelengths (lambda_alpha / lambda_p) is:',
    mcqOptions: [
      { key: 'A', text: '1 : (2 · √(2))' },
      { key: 'B', text: '1 : 2' },
      { key: 'C', text: '2 · √(2) : 1' },
      { key: 'D', text: '1 : 8' }
    ],
    correctOption: 'A',
    stepRubrics: [
      { step: 'Formula λ = h / √(2 · m · q · V)', marks: 0.5 },
      { step: 'Ratio evaluation showing 1 / √(8) = 1 / (2 · √(2))', marks: 0.5 }
    ],
    modelAnswer: 'de Broglie wavelength λ = h / p = h / √(2 · m · q · V). Since accelerating potential V and Planck\'s constant h are identical: λ is proportional to 1 / √(m · q). For alpha particle: m_alpha = 4 · m_p, q_alpha = 2 · e. For proton: m_p = m_p, q_p = e. Ratio lambda_alpha / lambda_p = √((m_p · q_p) / (m_alpha · q_alpha)) = √((m_p · e) / (4 · m_p · 2 · e)) = √(1 / 8) = 1 / (2 · √(2)). Hence, Option (A).',
    examinerNotes: 'Check that students recall m_alpha = 4 m_p and q_alpha = 2 e.'
  },
  {
    id: 'phy-q-015',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    section: 'A',
    marks: 1,
    questionType: 'MCQ',
    questionText: 'The magnetic field B at the center of a long closely-wound solenoid carrying steady current I has magnitude B0. If the number of turns per unit length is doubled and the current is halved, the new magnetic field at the center will be:',
    mcqOptions: [
      { key: 'A', text: 'B0 / 4' },
      { key: 'B', text: 'B0' },
      { key: 'C', text: '2 · B0' },
      { key: 'D', text: '4 · B0' }
    ],
    correctOption: 'B',
    stepRubrics: [
      { step: 'Formula B = mu_0 · n · I', marks: 0.5 },
      { step: 'Substitution n\' = 2n, I\' = I/2 => B\' = B0', marks: 0.5 }
    ],
    modelAnswer: 'Magnetic field inside a long solenoid is given by B = mu_0 · n · I. When n\' = 2 · n and I\' = I / 2, the new field is B\' = mu_0 · (2n) · (I / 2) = mu_0 · n · I = B0. The field remains strictly unchanged. Option (B).',
    examinerNotes: 'Simple 1-mark conceptual test on solenoid turn density and current linearity.'
  },
  {
    id: 'phy-q-016',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'Derive the microscopic vector form of Ohm\'s law: J = sigma · E, where J is the current density, sigma is the electrical conductivity, and E is the applied electric field.',
    stepRubrics: [
      { step: 'Expression for drift velocity v_d = -e · E · τ / m and current I = n · e · A · v_d', marks: 1.0 },
      { step: 'Equating current density J = I/A = n · e² · τ · E / m and defining sigma = n · e² · τ / m', marks: 1.0 }
    ],
    modelAnswer: 'When an electric field E is applied across a conductor of length L and cross-sectional area A, free electrons experience an acceleration a = -e · E / m. The average drift velocity acquired between successive collisions is v_d = -(e · E · τ) / m, where τ is the relaxation time.\n\nThe macroscopic current flowing through the conductor is: I = n · e · A · |v_d| = n · e · A · (e · E · τ / m) = (n · e² · τ · A / m) · E.\n\nCurrent density is defined as current per unit normal area: J = I / A = (n · e² · τ / m) · E.\n\nDefining electrical conductivity as sigma = (n · e² · τ) / m, we obtain: J = sigma · E.\n\nIn vector notation, since current density J flows along the direction of the applied electric field E for positive charge carriers: J = sigma · E.',
    examinerNotes: 'State relaxation time τ definition and mass of electron m explicitly.'
  },
  {
    id: 'phy-q-017',
    chapterId: 'physics-2-3',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'Why is electrical energy transmitted over long distances at extremely high voltages and low currents? Justify using Joule\'s heating law and line transmission loss calculations.',
    stepRubrics: [
      { step: 'Relation for transmission power P = V · I => I = P / V', marks: 1.0 },
      { step: 'Line power loss P_loss = I² · R = (P² · R) / V² showing inverse square dependence on voltage', marks: 1.0 }
    ],
    modelAnswer: 'Let electrical power P be transmitted over a transmission line of total resistance R at voltage V. The current carried by the transmission line wires is I = P / V.\n\nThe power dissipated as Joule heat in the transmission lines is given by: P_loss = I² · R = (P / V)² · R = (P² · R) / V².\n\nThis shows that transmission power loss is inversely proportional to the square of the transmission voltage (P_loss proportional to 1 / V²). By stepping up the transmission voltage by a factor of 10 using a step-up transformer, the current is reduced by factor 10, and the transmission power loss in the wires is reduced by a factor of 100 (10²). This minimizes resistive heating losses and prevents large voltage drops across long-distance national grids.',
    examinerNotes: 'Show P_loss = (P² · R) / V² clearly to secure both marks.'
  },
  {
    id: 'phy-q-018',
    chapterId: 'physics-3-1',
    subjectId: 'physics',
    section: 'B',
    marks: 2,
    questionType: 'VSA',
    questionText: 'State the two essential conditions required for total internal reflection to occur. What is optical fiber, and on what physical principle does it transmit optical signals without significant attenuation?',
    stepRubrics: [
      { step: 'Two conditions for total internal reflection', marks: 1.0 },
      { step: 'Optical fiber definition and total internal reflection core-cladding refractive index condition (n_core > n_clad)', marks: 1.0 }
    ],
    modelAnswer: 'Two Essential Conditions for Total Internal Reflection (TIR):\n1. The light ray must travel from an optically denser medium to an optically rarer medium (n_denser > n_rarer).\n2. The angle of incidence i in the denser medium must be strictly greater than the critical angle C for the pair of media (i > C = sin⁻¹(n2 / n1)).\n\nOptical Fiber: An optical fiber is a hair-thin flexible transmission conduit made of high-grade dielectric glass or silica consisting of a central core of refractive index n1 surrounded by an outer cladding of slightly lower refractive index n2 (n1 > n2). Light entering one end at a suitable acceptance angle strikes the core-cladding boundary at an angle greater than the critical angle, undergoing successive total internal reflections along the entire length of the fiber without any refractive leakage into the cladding.',
    examinerNotes: 'Mentioning n_core > n_clad is compulsory for full credit.'
  },
  {
    id: 'phy-q-019',
    chapterId: 'physics-3-2',
    subjectId: 'physics',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Using Huygens\' wave theory of light, derive Snell\'s law of refraction: sin(i) / sin(r) = n2 / n1 for a plane wave incident on a plane boundary separating two optical media.',
    stepRubrics: [
      { step: 'Labelled ray and wavefront diagram showing incident wavefront AB and refracted wavefront CD with angles i and r', marks: 1.0 },
      { step: 'Geometric proof using triangles showing sin(i) = v1 · t / AC and sin(r) = v2 · t / AC', marks: 1.0 },
      { step: 'Ratio sin(i)/sin(r) = v1/v2 = n2/n1 (Snell\'s Law)', marks: 1.0 }
    ],
    modelAnswer: 'Consider a plane wavefront AB incident at angle i on a plane refracting surface XY separating medium 1 (speed of light v1, refractive index n1) and medium 2 (speed v2, refractive index n2, with v2 < v1).\n\nLet time t be the duration taken by point B of the wavefront to reach point C on the interface. Therefore, distance BC = v1 · t.\n\nDuring this same time interval t, secondary wavelets originating from point A spread into medium 2 with speed v2, traveling a distance AD = v2 · t. The envelope CD tangent to these secondary wavelets forms the newly refracted plane wavefront.\n\nFrom right-angled triangle ABC: sin(i) = BC / AC = (v1 · t) / AC.\n\nFrom right-angled triangle ADC: sin(r) = AD / AC = (v2 · t) / AC.\n\nDividing the two equations:\nsin(i) / sin(r) = [(v1 · t) / AC] / [(v2 · t) / AC] = v1 / v2.\n\nBy definition of absolute refractive index: n1 = c / v1 and n2 = c / v2, which implies v1 / v2 = n2 / n1.\n\nTherefore: sin(i) / sin(r) = n2 / n1 => n1 · sin(i) = n2 · sin(r).\nThis is Snell\'s law of refraction.',
    examinerNotes: 'Diagram must show right angles at B and D. Time t must be defined as identical for both wavelets.'
  },
  {
    id: 'phy-q-020',
    chapterId: 'physics-4-2',
    subjectId: 'physics',
    section: 'C',
    marks: 3,
    questionType: 'SA',
    questionText: 'Draw the graph showing the variation of binding energy per nucleon (BE/A) with mass number A. Explain using this curve: (a) Why nuclear fission of very heavy nuclei releases huge energy, and (b) Why nuclear fusion of very light nuclei is an exothermic process.',
    stepRubrics: [
      { step: 'Accurate sketch of BE/A curve with peak at Fe-56 (8.75 MeV/nucleon)', marks: 1.0 },
      { step: 'Explanation of nuclear fission (mass number A ~ 240 drops to A ~ 120, increasing BE/A)', marks: 1.0 },
      { step: 'Explanation of nuclear fusion (light nuclei A <= 10 combine to form higher BE/A nucleus)', marks: 1.0 }
    ],
    modelAnswer: 'Curve Characteristics: The curve of BE/A vs A rises steeply from hydrogen isotopes, shows distinct local peaks at He-4, C-12, O-16, reaches a broad plateau around A = 40 to 120 with maximum at Fe-56 (8.75 MeV/nucleon), and then decreases monotonically to about 7.6 MeV/nucleon for uranium-238.\n\n(a) Nuclear Fission Explanation:\nA very heavy nucleus like U-235 has BE/A ~ 7.6 MeV/nucleon. When it undergoes fission, it splits into two intermediate-mass nuclei (A ~ 120) where BE/A is approximately 8.5 MeV/nucleon. The nucleons in the daughter nuclei are more tightly bound by ~0.9 MeV per nucleon. Multiplying by ~236 nucleons releases approximately 200 MeV of net kinetic and gamma energy per fission event.\n\n(b) Nuclear Fusion Explanation:\nVery light nuclei (such as H-2 and H-3) have low BE/A (~1.1 to 2.8 MeV/nucleon). When two light nuclei fuse together to form a helium-4 nucleus (BE/A = 7.07 MeV/nucleon), the binding energy per nucleon surges dramatically by nearly 4 to 6 MeV/nucleon, resulting in an immense release of energy.',
    examinerNotes: 'Iron-56 peak must be marked at 8.75 or 8.8 MeV/nucleon.'
  },
  {
    id: 'phy-q-021',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    section: 'D',
    marks: 4,
    questionType: 'Case-Study',
    questionText: 'Read the following passage on Electrostatic Shielding and answer the sub-questions that follow:',
    casePassage: 'Electrostatic shielding is the phenomenon of protecting a certain region of space from the influence of external electric fields. It is based on the fact that inside a hollow conductor, the electric field is identically zero under electrostatic conditions, regardless of whether the conductor is charged or neutral, and regardless of what external electric charges are placed outside it. The potential inside the cavity is uniform and equal to that on the surface of the conductor. This principle is utilized in protecting sensitive scientific measuring instruments, coaxial cables, and provides safety inside a metal-bodied car during a lightning thunderstorm.',
    subQuestions: [
      { questionNumber: '1', text: 'Why is it safer to remain inside a car rather than standing under an open tree during a lightning storm?', marks: 1 },
      { questionNumber: '2', text: 'A hollow charged metallic sphere has a potential of 50 V on its outer surface. What is the electrostatic potential at its geometric center?', marks: 1 },
      { questionNumber: '3', text: 'Explain why a sensitive galvanometer is enclosed inside a metallic casing.', marks: 2 }
    ],
    stepRubrics: [
      { step: 'Subpart 1: Metal car body acts as a Faraday cage / electrostatic shield conducting charge to ground', marks: 1.0 },
      { step: 'Subpart 2: Potential inside cavity is constant: V = 50 V (since E = -dV/dr = 0)', marks: 1.0 },
      { step: 'Subpart 3: Metallic casing prevents stray external electric fields from producing parasitic torque on the coil', marks: 2.0 }
    ],
    modelAnswer: '1. The metallic body of the car acts as an electrostatic shield (Faraday cage). Lightning strikes the outer metal body and flows harmlessly through the tires to the ground. Inside the car cavity, the electric field remains identically zero (E = 0), protecting occupants from electrocution.\n\n2. The potential at the center is exactly 50 V. Since E = 0 inside the conductor, the electric field relation E = -dV/dr = 0 implies V is constant throughout the cavity and identical to the surface potential.\n\n3. The metallic casing acts as an electrostatic shield. It isolates the delicate moving coil from external stray electrostatic charges, preventing unwanted induced charges that could distort deflections.',
    examinerNotes: 'Subpart 2 error trap: students frequently guess 0 V because E = 0.'
  },
  {
    id: 'phy-q-022',
    chapterId: 'physics-3-1',
    subjectId: 'physics',
    section: 'E',
    marks: 5,
    questionType: 'LA',
    questionText: '(a) Derive the Lensmaker\'s formula: 1/f = (n - 1) · (1/R1 - 1/R2) for a thin convex lens of radii of curvature R1 and R2 made of a material of refractive index n placed in air. (b) A biconvex lens of focal length 20 cm made of glass (n = 1.5) is immersed in a liquid of refractive index 1.25. Calculate the new focal length of the lens in the liquid.',
    stepRubrics: [
      { step: 'Refraction formula at first spherical surface: n2/v1 - n1/u = (n2 - n1)/R1', marks: 1.5 },
      { step: 'Refraction formula at second spherical surface with virtual object: n1/v - n2/v1 = (n1 - n2)/R2', marks: 1.5 },
      { step: 'Adding the two equations and thin lens approximation to derive 1/f = (n - 1)(1/R1 - 1/R2)', marks: 1.0 },
      { step: 'Numerical calculation for focal length in liquid: f_liquid = 50 cm', marks: 1.0 }
    ],
    modelAnswer: '(a) Derivation of Lensmaker\'s Formula:\nConsider a thin convex lens of refractive index n2 placed in a medium of refractive index n1. The lens has two spherical surfaces of radii of curvature R1 and R2.\n\n1. Refraction at first surface (radius R1):\nA point object O placed in medium 1 at distance u forms a real image at I1 at distance v1 inside the medium of the lens:\n(n2 / v1) - (n1 / u) = (n2 - n1) / R1 ... (Equation 1)\n\n2. Refraction at second surface (radius R2):\nThe image I1 acts as a virtual object for refraction at the second surface. Since the ray travels from lens medium (n2) to surrounding medium (n1), the final image I is formed at distance v:\n(n1 / v) - (n2 / v1) = (n1 - n2) / R2 = - (n2 - n1) / R2 ... (Equation 2)\n\n3. Adding Equations 1 and 2:\n[(n2 / v1) - (n1 / u)] + [(n1 / v) - (n2 / v1)] = (n2 - n1) · [(1 / R1) - (1 / R2)]\n(n1 / v) - (n1 / u) = (n2 - n1) · [(1 / R1) - (1 / R2)]\nn1 · [(1 / v) - (1 / u)] = (n2 - n1) · [(1 / R1) - (1 / R2)]\n\nDividing through by n1:\n(1 / v) - (1 / u) = [(n2 / n1) - 1] · [(1 / R1) - (1 / R2)]\n\nWhen the object is placed at infinity (u = infinity), image is formed at focus (v = f). Since 1/f = 1/v - 1/u:\n1 / f = (n - 1) · [(1 / R1) - (1 / R2)] (where n = n2 / n1).\n\n(b) Numerical Calculation:\nIn air (n_g = 1.5, n_air = 1.0, f_air = 20 cm):\n1 / 20 = (1.5 - 1) · [(1 / R1) - (1 / R2)] = 0.5 · K => K = [(1 / R1) - (1 / R2)] = 1 / 10 cm⁻¹.\n\nIn liquid (n_liq = 1.25):\nRelative refractive index n_rel = n_glass / n_liq = 1.5 / 1.25 = 6 / 5 = 1.2.\n1 / f_liq = (n_rel - 1) · K = (1.2 - 1) · (1 / 10) = 0.2 · 0.1 = 0.02 cm⁻¹.\nf_liq = 1 / 0.02 = +50 cm.\n\nThe focal length of the convex lens increases from 20 cm to 50 cm when immersed in the liquid.',
    examinerNotes: 'In derivation, emphasize that I1 acts as a virtual object for the second surface.'
  }
];

export const physicsQuestionById = (id: string): CBSEQuestion | undefined =>
  cbsePhysicsQuestionBank.find(q => q.id === id);

export const physicsQuestionsForSection = (section: 'A' | 'B' | 'C' | 'D' | 'E'): CBSEQuestion[] =>
  cbsePhysicsQuestionBank.filter(q => q.section === section);
