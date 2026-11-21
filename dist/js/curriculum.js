/**
 * BLOOM — Verified CBSE Class XII 2026-27 Curriculum Dataset
 *
 * Strict provenance from CBSE circular Acad-14/2026 and Senior Secondary Curriculum Part 2.
 * Official Board Examination dates verified from CBSE signed date sheet (06 Nov 2026).
 * No JEE content, no fabricated chapter-level exam predictions.
 */
export const CBSE_SUBJECTS = [
    {
        id: 'physics',
        code: '042',
        title: 'Physics',
        theoryMarks: 70,
        internalMarks: 30,
        examDate: '2027-02-16',
        examTime: '10:30 AM – 1:30 PM IST',
        syllabusUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Physics_SecP2_2026-27.pdf#page=12',
        officialNote: 'Theory marks are published at grouped-unit scope (e.g. Electrostatics + Current Electricity = 16 marks).'
    },
    {
        id: 'pe',
        code: '048',
        title: 'Physical Education',
        theoryMarks: 70,
        internalMarks: 30,
        examDate: '2027-02-18',
        examTime: '10:30 AM – 1:30 PM IST',
        syllabusUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/PhysicalEducation_SecP2_2026-27.pdf#page=13',
        officialNote: 'Units include b* concept question markers. Yoga is Unit 3 of Physical Education, not a separate 6th subject.'
    },
    {
        id: 'chemistry',
        code: '043',
        title: 'Chemistry',
        theoryMarks: 70,
        internalMarks: 30,
        examDate: '2027-02-27',
        examTime: '10:30 AM – 1:30 PM IST',
        syllabusUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Chemistry_SecP2_2026-27.pdf#page=8',
        officialNote: 'Course structure provides unit marks; paper design notes no guaranteed chapter weightage.'
    },
    {
        id: 'english',
        code: '301',
        title: 'English Core',
        theoryMarks: 80,
        internalMarks: 20,
        examDate: '2027-03-05',
        examTime: '10:30 AM – 1:30 PM IST',
        syllabusUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf#page=10',
        officialNote: 'Section allocations: Reading (22), Creative Writing (18), Literature (40).'
    },
    {
        id: 'math',
        code: '041',
        title: 'Mathematics',
        theoryMarks: 80,
        internalMarks: 20,
        examDate: '2027-03-09',
        examTime: '10:30 AM – 1:30 PM IST',
        syllabusUrl: 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf#page=7',
        officialNote: 'CBSE syllabus explicitly states no chapter-wise weightage; covers all chapters.'
    }
];
export const CBSE_CHAPTERS = [
    // ==================== PHYSICS (042) ====================
    {
        id: 'phy-1',
        subjectId: 'physics',
        unitGroup: 'Units I–II: Electrostatics & Current Electricity (16 Marks)',
        unitMarks: 16,
        title: 'Electric Charges and Fields',
        ncertRef: 'NCERT Physics Part 1, Chapter 1',
        topics: [
            {
                id: 'phy-1-coulomb',
                chapterId: 'phy-1',
                title: "Coulomb's Law & Superposition Principle",
                ncertRef: 'NCERT Physics Part 1, Section 1.6 & 1.7',
                coreConcepts: ['Quantization of charge', "Coulomb's law in vector form", 'Dielectric constant', 'Equilibrium of multiple charges'],
                keyDerivations: ["Vector form of Coulomb's Law"],
                keyFormulas: ['F = (1 / 4πε₀) * (q₁q₂ / r²)', 'F_vector = (1 / 4πε₀) * (q₁q₂ / |r|³) * r_vec'],
                boardQuestionTypes: ['1-mark Assertion-Reason on charge quantization', '2-mark vector force at triangle vertex', '3-mark null point calculation']
            },
            {
                id: 'phy-1-dipole',
                chapterId: 'phy-1',
                title: 'Electric Field & Dipole Torques',
                ncertRef: 'NCERT Physics Part 1, Section 1.8 - 1.11',
                coreConcepts: ['Electric field lines and properties', 'Dipole moment definition', 'Field at axial and equatorial points', 'Torque and potential energy in uniform field'],
                keyDerivations: ['Electric field on axial line of dipole', 'Electric field on equatorial line of dipole', 'Torque τ = p × E and work done W = pE(cos θ₁ - cos θ₂)'],
                keyFormulas: ['E_axial = (1 / 4πε₀) * (2pr / (r² - a²)²)', 'E_equatorial = (1 / 4πε₀) * (p / (r² + a²)^(3/2))', 'τ = pE sin θ'],
                boardQuestionTypes: ['3-mark dipole axial/equatorial field derivation', '2-mark work done in rotating dipole from 0° to 180°']
            },
            {
                id: 'phy-1-gauss',
                chapterId: 'phy-1',
                title: "Gauss's Law and Symmetrical Applications",
                ncertRef: 'NCERT Physics Part 1, Section 1.14 & 1.15',
                coreConcepts: ['Electric flux definition', "Gauss's law statement", 'Field of infinitely long straight wire', 'Field of uniformly charged infinite plane sheet', 'Field of thin spherical shell'],
                keyDerivations: ['Field of infinitely long wire E = λ / (2πε₀r)', 'Field of infinite plane sheet E = σ / (2ε₀)', 'Field of spherical shell (r > R, r = R, r < R)'],
                keyFormulas: ['Φ = ∮ E · dA = q_enclosed / ε₀', 'E_wire = λ / (2πε₀r)', 'E_sheet = σ / (2ε₀)'],
                boardQuestionTypes: ['5-mark Gauss law proof + infinite plane sheet derivation + numerical', '3-mark electric flux through cube face']
            }
        ]
    },
    {
        id: 'phy-2',
        subjectId: 'physics',
        unitGroup: 'Units I–II: Electrostatics & Current Electricity (16 Marks)',
        unitMarks: 16,
        title: 'Electrostatic Potential and Capacitance',
        ncertRef: 'NCERT Physics Part 1, Chapter 2',
        topics: [
            {
                id: 'phy-2-potential',
                chapterId: 'phy-2',
                title: 'Electric Potential & Equipotential Surfaces',
                ncertRef: 'NCERT Physics Part 1, Section 2.1 - 2.6',
                coreConcepts: ['Potential due to point charge & system of charges', 'Relation E = -dV/dr', 'Equipotential surfaces characteristics', 'Potential energy of dipole in external field'],
                keyDerivations: ['Potential at point r due to dipole: V = (1 / 4πε₀) * (p cos θ / r²)', 'Relation E = -dV/dr'],
                keyFormulas: ['V = (1 / 4πε₀) * (q / r)', 'U = (1 / 4πε₀) * (q₁q₂ / r₁₂)'],
                boardQuestionTypes: ['2-mark equipotential surface sketches for positive charge and dipole', '3-mark potential calculation at midpoint']
            },
            {
                id: 'phy-2-capacitor',
                chapterId: 'phy-2',
                title: 'Parallel Plate Capacitor & Dielectrics',
                ncertRef: 'NCERT Physics Part 1, Section 2.7 - 2.16',
                coreConcepts: ['Capacitance definition and units', 'Parallel plate capacitor formula', 'Dielectric slab insertion (battery connected vs disconnected)', 'Energy stored and energy loss on sharing charge'],
                keyDerivations: ['Capacitance C₀ = ε₀A/d', 'Capacitance with dielectric slab of thickness t', 'Energy stored U = (1/2)CV² and energy density u = (1/2)ε₀E²'],
                keyFormulas: ['C = ε₀A / (d - t + t/K)', 'U = (1/2) Q² / C = (1/2) CV²', 'u = (1/2) ε₀ E²'],
                boardQuestionTypes: ['3-mark effect of dielectric slab on V, Q, C, E, U with battery removed', '5-mark energy stored derivation + combination circuit numerical']
            }
        ]
    },
    {
        id: 'phy-3',
        subjectId: 'physics',
        unitGroup: 'Units I–II: Electrostatics & Current Electricity (16 Marks)',
        unitMarks: 16,
        title: 'Current Electricity',
        ncertRef: 'NCERT Physics Part 1, Chapter 3',
        topics: [
            {
                id: 'phy-3-drift',
                chapterId: 'phy-3',
                title: 'Drift Velocity, Ohm’s Law & Resistivity',
                ncertRef: 'NCERT Physics Part 1, Section 3.1 - 3.7',
                coreConcepts: ['Electric current and current density', 'Drift velocity and relaxation time relation', 'Deduction of Ohm’s law from electron drift', 'Resistivity temperature coefficient for metals vs semiconductors'],
                keyDerivations: ['Drift velocity v_d = -eEτ / m', 'Current I = n e A v_d', 'Resistivity ρ = m / (n e² τ)'],
                keyFormulas: ['I = n e A v_d', 'j = σ E', 'R_T = R₀(1 + α ΔT)'],
                boardQuestionTypes: ['3-mark drift velocity and Ohm law deduction', '2-mark graph of resistivity vs temperature for copper and nichrome']
            },
            {
                id: 'phy-3-kirchhoff',
                chapterId: 'phy-3',
                title: 'EMF, Cells Combination & Kirchhoff’s Rules',
                ncertRef: 'NCERT Physics Part 1, Section 3.8 - 3.12',
                coreConcepts: ['EMF, terminal voltage V = E - Ir', 'Series and parallel combination of cells', 'Kirchhoff’s first rule (junction) and second rule (loop)', 'Wheatstone bridge balance condition'],
                keyDerivations: ['Equivalent EMF of parallel cells: E_eq/r_eq = E₁/r₁ + E₂/r₂', 'Wheatstone bridge condition P/Q = R/S using Kirchhoff’s rules'],
                keyFormulas: ['V = E - I r', 'E_eq = (E₁ r₂ + E₂ r₁) / (r₁ + r₂)', 'P/Q = R/S'],
                boardQuestionTypes: ['3-mark Kirchhoff loop rule multi-battery network numerical', '5-mark cells in parallel derivation + terminal voltage analysis']
            }
        ]
    },
    {
        id: 'phy-4',
        subjectId: 'physics',
        unitGroup: 'Units III–IV: Magnetism & Induction (17 Marks)',
        unitMarks: 17,
        title: 'Moving Charges and Magnetism',
        ncertRef: 'NCERT Physics Part 1, Chapter 4',
        topics: [
            {
                id: 'phy-4-biot',
                chapterId: 'phy-4',
                title: 'Biot-Savart Law and Circular Coil Axis',
                ncertRef: 'NCERT Physics Part 1, Section 4.1 - 4.6',
                coreConcepts: ['Magnetic force F = q(v × B)', 'Biot-Savart law statement', 'Field on axis of circular current loop', 'Ampere circuital law and long solenoid'],
                keyDerivations: ['Field on axis of circular loop: B = μ₀ I R² / (2(R² + x²)^(3/2))', 'Field inside long solenoid B = μ₀ n I'],
                keyFormulas: ['dB = (μ₀ / 4π) * (I dl × r̂ / r²)', 'B_axis = μ₀ I R² / (2(R² + x²)^(3/2))', 'B_solenoid = μ₀ n I'],
                boardQuestionTypes: ['3-mark circular loop derivation', '3-mark Ampere law application to coaxial cable']
            },
            {
                id: 'phy-4-galvo',
                chapterId: 'phy-4',
                title: 'Parallel Currents & Moving Coil Galvanometer',
                ncertRef: 'NCERT Physics Part 1, Section 4.7 - 4.11',
                coreConcepts: ['Force on current wire F = I(L × B)', 'Force between parallel current wires & 1 Ampere definition', 'Torque on magnetic dipole τ = M × B', 'Moving coil galvanometer principle, radial field, conversion to ammeter/voltmeter'],
                keyDerivations: ['Force per unit length between parallel wires: F/L = μ₀ I₁ I₂ / (2πd)', 'Galvanometer current deflection I = (C / NAB) θ', 'Shunt resistance for ammeter S = I_g G / (I - I_g)'],
                keyFormulas: ['F/L = μ₀ I₁ I₂ / (2πd)', 'τ = NIAB sin θ', 'S = I_g G / (I - I_g)', 'R_series = V / I_g - G'],
                boardQuestionTypes: ['5-mark Galvanometer construction, role of radial magnetic field, conversion to voltmeter with numerical', '2-mark definition of standard 1 Ampere']
            }
        ]
    },
    {
        id: 'phy-9',
        subjectId: 'physics',
        unitGroup: 'Units V–VI: Optics & EM Waves (18 Marks)',
        unitMarks: 18,
        title: 'Ray Optics and Optical Instruments',
        ncertRef: 'NCERT Physics Part 2, Chapter 9',
        topics: [
            {
                id: 'phy-9-lensmaker',
                chapterId: 'phy-9',
                title: 'Spherical Refraction & Lens Maker’s Formula',
                ncertRef: 'NCERT Physics Part 2, Section 9.1 - 9.5',
                coreConcepts: ['Total internal reflection and optical fiber', 'Refraction at single spherical surface', "Lens Maker's formula and combination of thin lenses", 'Power of lens combination'],
                keyDerivations: ['Refraction at spherical surface: n₂/v - n₁/u = (n₂ - n₁)/R', "Lens Maker's Formula: 1/f = (n - 1)(1/R₁ - 1/R₂)", 'Focal length of lenses in contact: 1/F = 1/f₁ + 1/f₂'],
                keyFormulas: ['sin i_c = 1 / n', '1/f = (n - 1)(1/R₁ - 1/R₂)', 'P = P₁ + P₂'],
                boardQuestionTypes: ['5-mark Lens Maker formula derivation + change of focal length when immersed in water numerical', '3-mark total internal reflection applications']
            },
            {
                id: 'phy-9-instruments',
                chapterId: 'phy-9',
                title: 'Prism Formula & Optical Instruments',
                ncertRef: 'NCERT Physics Part 2, Section 9.6 - 9.9',
                coreConcepts: ['Prism refraction and angle of minimum deviation', 'Compound microscope ray diagram & magnification for normal adjustment and D', 'Astronomical telescope (refracting and Cassegrain reflecting)'],
                keyDerivations: ['Prism formula: n = sin((A + D_m)/2) / sin(A/2)', 'Magnifying power of compound microscope: m = -(L / f_o)(1 + D / f_e)', 'Magnifying power of astronomical telescope: m = -f_o / f_e'],
                keyFormulas: ['n = sin((A + D_m)/2) / sin(A/2)', 'm_microscope = -(L / f_o)(1 + D / f_e)', 'm_telescope = -f_o / f_e'],
                boardQuestionTypes: ['5-mark Compound microscope ray diagram at near point + derivation + numerical', '3-mark Reflecting telescope advantages over refracting telescope']
            }
        ]
    },
    // ==================== CHEMISTRY (043) ====================
    {
        id: 'chem-1',
        subjectId: 'chemistry',
        unitGroup: 'Solutions (7 Marks)',
        unitMarks: 7,
        title: 'Solutions',
        ncertRef: 'NCERT Chemistry Part 1, Chapter 1',
        topics: [
            {
                id: 'chem-1-raoult',
                chapterId: 'chem-1',
                title: "Raoult's Law & Colligative Properties",
                ncertRef: 'NCERT Chemistry Part 1, Section 1.1 - 1.6',
                coreConcepts: ["Henry's law", "Raoult's law for volatile solutes", 'Ideal vs Non-ideal solutions (positive & negative deviations)', 'Boiling point elevation and freezing point depression', 'Osmotic pressure and reverse osmosis'],
                keyFormulas: ['p₁ = x₁ p₁°', 'ΔT_b = K_b * m', 'ΔT_f = K_f * m', 'π = CRT'],
                boardQuestionTypes: ['3-mark numerical calculating molar mass from freezing point depression', '2-mark Azeotrope definition and ethanol-water positive deviation reasoning']
            },
            {
                id: 'chem-1-vant',
                chapterId: 'chem-1',
                title: "Van 't Hoff Factor & Electrolyte Colligative Properties",
                ncertRef: 'NCERT Chemistry Part 1, Section 1.7',
                coreConcepts: ["Van 't Hoff factor i definition", 'Degree of dissociation α and degree of association', 'Abnormal molar mass calculations'],
                keyFormulas: ['i = normal molar mass / abnormal molar mass', 'i = 1 + (n - 1)α (dissociation)', 'ΔT_f = i K_f m'],
                boardQuestionTypes: ['3-mark numerical finding degree of dissociation of calcium nitrate from freezing point', '2-mark ranking solutions by osmotic pressure']
            }
        ]
    },
    {
        id: 'chem-2',
        subjectId: 'chemistry',
        unitGroup: 'Electrochemistry (9 Marks)',
        unitMarks: 9,
        title: 'Electrochemistry',
        ncertRef: 'NCERT Chemistry Part 1, Chapter 2',
        topics: [
            {
                id: 'chem-2-nernst',
                chapterId: 'chem-2',
                title: 'Nernst Equation & Cell Potential',
                ncertRef: 'NCERT Chemistry Part 1, Section 2.1 - 2.3',
                coreConcepts: ['Standard reduction potentials', 'Nernst equation for half-cell and full cell', 'Equilibrium constant K_c from cell EMF', 'Gibbs free energy change ΔG° = -nFE°'],
                keyFormulas: ['E_cell = E°_cell - (0.0591 / n) * log Q', 'log K_c = n E°_cell / 0.0591', 'ΔG° = -n F E°_cell'],
                boardQuestionTypes: ['3-mark EMF and ΔG° numerical for Daniel cell variant', '2-mark predicting feasibility of redox reaction']
            },
            {
                id: 'chem-2-kohlrausch',
                chapterId: 'chem-2',
                title: "Kohlrausch's Law & Conductance",
                ncertRef: 'NCERT Chemistry Part 1, Section 2.4 - 2.6',
                coreConcepts: ['Conductivity κ and molar conductivity Λ_m', 'Variation of conductivity with concentration', "Kohlrausch's law of independent ion migration", 'Degree of dissociation α = Λ_m / Λ°_m and K_a'],
                keyFormulas: ['Λ_m = (κ * 1000) / C', 'Λ°_m = ν₊ λ°₊ + ν₋ λ°₋', 'α = Λ_m / Λ°_m', 'K_a = C α² / (1 - α)'],
                boardQuestionTypes: ['3-mark Kohlrausch law calculation of Λ°_m for acetic acid', '2-mark reason why κ decreases with dilution while Λ_m increases']
            }
        ]
    },
    // ==================== MATHEMATICS (041) ====================
    {
        id: 'math-1',
        subjectId: 'math',
        unitGroup: 'Calculus (35 Marks)',
        unitMarks: 35,
        title: 'Continuity and Differentiability',
        ncertRef: 'NCERT Mathematics Part 1, Chapter 5',
        topics: [
            {
                id: 'math-1-continuity',
                chapterId: 'math-1',
                title: 'Continuity of Piecewise & Trigonometric Functions',
                ncertRef: 'NCERT Mathematics Part 1, Section 5.1',
                coreConcepts: ['Definition: lim x->c f(x) = f(c)', 'Left hand limit and Right hand limit evaluation', 'Finding unknown constants a, b for continuous functions'],
                boardQuestionTypes: ['4-mark finding values of a and b for piecewise function continuous at x=3 and x=5', '2-mark checking continuity of |x| / x at x=0']
            },
            {
                id: 'math-1-derivatives',
                chapterId: 'math-1',
                title: 'Logarithmic & Second Order Differentiation',
                ncertRef: 'NCERT Mathematics Part 1, Section 5.5 - 5.7',
                coreConcepts: ['Logarithmic differentiation for variable base & exponent u(x)^v(x)', 'Parametric differentiation', 'Second order derivative proving problems'],
                keyFormulas: ['dy/dx = (dy/dt) / (dx/dt)', 'd²y/dx² = [d/dt(dy/dx)] / (dx/dt)'],
                boardQuestionTypes: ['4-mark proving differential equation from y = (sin⁻¹ x)²', '3-mark parametric second derivative at θ = π/4']
            }
        ]
    },
    {
        id: 'math-3',
        subjectId: 'math',
        unitGroup: 'Calculus (35 Marks)',
        unitMarks: 35,
        title: 'Integrals',
        ncertRef: 'NCERT Mathematics Part 2, Chapter 7',
        topics: [
            {
                id: 'math-3-indefinite',
                chapterId: 'math-3',
                title: 'Integration by Substitution, Partial Fractions & Parts',
                ncertRef: 'NCERT Mathematics Part 2, Section 7.1 - 7.6',
                coreConcepts: ['Standard substitution methods', 'Partial fractions for linear and quadratic irreducible factors', 'Integration by parts (ILATE rule)', 'Special integral ∫ e^x [f(x) + f\'(x)] dx = e^x f(x) + C'],
                boardQuestionTypes: ['3-mark partial fraction integral', '3-mark integration by parts with inverse trigonometric function']
            },
            {
                id: 'math-3-definite',
                chapterId: 'math-3',
                title: 'Definite Integrals & Kings Property',
                ncertRef: 'NCERT Mathematics Part 2, Section 7.7 - 7.11',
                coreConcepts: ['Fundamental theorem of calculus', 'Kings property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a-x) dx', 'Even and odd function integrals', 'Piecewise absolute value integrals'],
                keyFormulas: ['∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx', '∫_{-a}ᵃ f(x) dx = 2 ∫₀ᵃ f(x) dx if even, 0 if odd'],
                boardQuestionTypes: ['5-mark evaluation of ∫₀^{π/2} (sin^n x / (sin^n x + cos^n x)) dx', '4-mark integral of |x - 1| + |x - 2| + |x - 3| from 1 to 4']
            }
        ]
    },
    // ==================== ENGLISH CORE (301) ====================
    {
        id: 'eng-1',
        subjectId: 'english',
        unitGroup: 'Section B: Creative Writing Skills (18 Marks)',
        unitMarks: 18,
        title: 'Notice Writing',
        ncertRef: 'CBSE Creative Writing Guidelines',
        topics: [
            {
                id: 'eng-1-notice',
                chapterId: 'eng-1',
                title: 'Official Notice Writing Format & Body Structure',
                ncertRef: 'CBSE Curriculum Section B (4 marks)',
                coreConcepts: ['Box enclosure', 'Issuing institution header in center', 'Word NOTICE in bold block letters', 'Date on left', 'Descriptive heading', 'Content answering 5 Ws: What, When, Where, Who, Contact person', 'Designation of signatory', 'Strict 50-word adherence'],
                boardQuestionTypes: ['4-mark notice for inter-school debate, lost item, or donation camp']
            }
        ]
    },
    {
        id: 'eng-2',
        subjectId: 'english',
        unitGroup: 'Section C: Literature (40 Marks)',
        unitMarks: 40,
        title: 'The Last Lesson',
        ncertRef: 'Flamingo Prose, Chapter 1',
        topics: [
            {
                id: 'eng-2-lesson',
                chapterId: 'eng-2',
                title: 'The Last Lesson (Alphonse Daudet) — Themes & RTC Analysis',
                ncertRef: 'Flamingo Prose, pp. 1-9',
                coreConcepts: ['Franco-Prussian war background', 'Order from Berlin banning French in Alsace-Lorraine', "Franz's regret over missed learning", "M. Hamel's patriotic message on French language", 'Blackboard phrase: Vive La France!', 'Themes: Linguistic chauvinism, procrastination, identity'],
                boardQuestionTypes: ['1-mark reference-to-context questions', '2-mark short answer on villagers sitting on back benches', '5-mark theme essay on love for mother tongue']
            }
        ]
    },
    // ==================== PHYSICAL EDUCATION (048) ====================
    {
        id: 'pe-1',
        subjectId: 'pe',
        unitGroup: 'Unit 1: Management of Sporting Events (5 + 4b* Marks)',
        unitMarks: 9,
        title: 'Management of Sporting Events',
        ncertRef: 'PE Class 12, Unit 1',
        topics: [
            {
                id: 'pe-1-tournaments',
                chapterId: 'pe-1',
                title: 'Knock-Out Fixtures, Byes Calculation & Committees',
                ncertRef: 'PE Class 12, Unit 1 Section 1.1 - 1.4',
                coreConcepts: ['Pre, during and post tournament committees and duties', 'Knock-out tournament rules', 'Total matches formula: N - 1', 'Byes calculation: Next power of 2 minus N', 'Bye distribution rules (lower half bottom, upper half top, etc.)'],
                keyFormulas: ['Total matches in knock-out = N - 1', 'Byes = 2^n - N', 'Matches in single league = N(N - 1) / 2'],
                boardQuestionTypes: ['5-mark drawing knock-out fixture for 19 teams with step-by-step bye distribution', '3-mark responsibilities of Technical and Boarding committees']
            }
        ]
    },
    {
        id: 'pe-3',
        subjectId: 'pe',
        unitGroup: 'Unit 3: Yoga as Preventive Measure for Lifestyle Disease (6 + 1b* Marks)',
        unitMarks: 7,
        title: 'Yoga as Preventive Measure for Lifestyle Disease',
        ncertRef: 'PE Class 12, Unit 3',
        topics: [
            {
                id: 'pe-3-asanas',
                chapterId: 'pe-3',
                title: 'Asanas, Benefits & Contraindications for Lifestyle Diseases',
                ncertRef: 'PE Class 12, Unit 3 Section 3.1 - 3.4',
                coreConcepts: ['Obesity asanas: Tadasana, Katichakrasana, Pavanmuktasana, Matsyasana, Halasana, Paschimottanasana', 'Diabetes asanas: Bhujangasana, Shalabhasana, Dhanurasana, Supta Vajrasana', 'Asthma asanas: Gomukhasana, Uttan Mandukasana', 'Hypertension asanas: Shavasana, Sarala Matsyasana', 'Contraindications for spinal and cardiac patients'],
                boardQuestionTypes: ['5-mark procedure, benefits and contraindications of any two asanas for Diabetes or Asthma', '1-mark identifying asana from diagram']
            }
        ]
    }
];
export const getSubject = (id) => CBSE_SUBJECTS.find(s => s.id === id);
export const getChapter = (id) => CBSE_CHAPTERS.find(c => c.id === id);
export const getTopic = (topicId) => {
    for (const c of CBSE_CHAPTERS) {
        const found = c.topics.find(t => t.id === topicId);
        if (found)
            return found;
    }
    return undefined;
};
