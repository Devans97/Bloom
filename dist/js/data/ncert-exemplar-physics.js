/**
 * NCERT Exemplar Problems & High-Order Analytical Solutions (HOTS)
 * Subject: Physics (042) - CBSE Class XII 2026-2027 Blueprint
 * Authentic problems sourced directly from the NCERT Exemplar Class 12 Physics publication.
 * Full analytical step-by-step solutions, mark breakdowns, common board examination traps.
 */
export const ncertExemplarPhysics = [
    // Chapter 1: Electric Charges and Fields (phy-1-1)
    {
        id: 'ex-phy-01-01',
        chapterId: 'phy-1-1',
        problemNumber: 'NCERT Exemplar Q1.3',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'A metallic spherical shell of inner radius r1 and outer radius r2 has a charge Q. A charge -q is placed at the center of the sphere. What is the surface charge density on the inner surface and on the outer surface of the shell?',
        diagramDescription: 'Concentric spherical conducting shell with inner radius r1 and outer radius r2. Point charge -q located at the center.',
        analyticalSolution: 'By electrostatic induction, a charge of +q is induced on the inner surface of radius r1 to ensure that the electric field inside the conducting material of the shell is identically zero (E = 0 for r1 < r < r2). Since the net charge on the shell is initially Q, by conservation of charge, the outer surface must acquire charge Q - q.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Apply Gauss theorem to a spherical Gaussian surface inside the conductor (r1 < r < r2). Since E = 0 inside conductor, q_enclosed = 0.',
                mathExpression: 'q_inner + (-q) = 0 => q_inner = +q',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Calculate inner surface charge density sigma_inner = q_inner / (4 · π · r1²).',
                mathExpression: 'sigma_inner = +q / (4 · π · r1²)',
                marksAwarded: 0.5
            },
            {
                step: 3,
                description: 'By conservation of total charge on the isolated conducting shell, q_outer = Q - q_inner = Q - (+q) = Q - q.',
                mathExpression: 'q_outer = Q - q',
                marksAwarded: 0.5
            },
            {
                step: 4,
                description: 'Calculate outer surface charge density sigma_outer = q_outer / (4 · π · r2²).',
                mathExpression: 'sigma_outer = (Q - q) / (4 · π · r2²)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: 'Award 1 mark for correct charge induction justification using Gauss law, 1 mark for inner density, 1 mark for outer density.',
        commonMistakesAndTraps: [
            'Forgetting that the central charge is negative (-q), which induces +q on inner surface, not -q.',
            'Assuming the total charge on outer surface is Q + q instead of Q - q.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 1, Section 1.15 Gauss Law Applications'
    },
    {
        id: 'ex-phy-01-02',
        chapterId: 'phy-1-1',
        problemNumber: 'NCERT Exemplar Q1.14',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'An electric dipole of moment p is placed at a distance r from an infinitely long straight wire carrying uniform linear charge density λ. If p is oriented along the radial direction, calculate the net electrostatic force acting on the dipole.',
        diagramDescription: 'Infinitely long charged line along the z-axis with linear charge density λ. Dipole vector p oriented along the radial r-axis pointing away from the line.',
        analyticalSolution: 'The electric field due to an infinite line charge is non-uniform: E(r) = λ / (2 · π · ε₀ · r). In a non-uniform field, the net force on a dipole of moment p along the direction of field variation is given by F = p · (dE / dr). Differentiating E with respect to r gives dE/dr = -λ / (2 · π · ε₀ · r²). Therefore, F = - (p · λ) / (2 · π · ε₀ · r²), where the negative sign denotes an attractive force toward the wire.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State the expression for electric field of an infinite line charge at distance r.',
                mathExpression: 'E(r) = λ / (2 · π · ε₀ · r)',
                marksAwarded: 0.5
            },
            {
                step: 2,
                description: 'Write the differential force expression for a dipole in a non-uniform field F = p · (dE/dr).',
                mathExpression: 'F = p · (dE / dr)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Compute the spatial derivative dE/dr.',
                mathExpression: 'dE / dr = d/dr [λ / (2 · π · ε₀ · r)] = - λ / (2 · π · ε₀ · r²)',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Substitute into force formula and interpret the physical direction (attractive towards wire).',
                mathExpression: 'F = - (p · λ) / (2 · π · ε₀ · r²) (Attractive)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: 'Full credit requires showing the derivative step dE/dr explicitly. Deduct 0.5 if direction is not stated.',
        commonMistakesAndTraps: [
            'Applying F = qE directly as if field were uniform (uniform field gives net force zero).',
            'Missing the factor of 2 in 2 · π · ε₀.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 1, Section 1.10 Dipole in Uniform vs Non-uniform Field'
    },
    // Chapter 2: Electrostatic Potential and Capacitance (phy-1-2)
    {
        id: 'ex-phy-02-01',
        chapterId: 'phy-1-2',
        problemNumber: 'NCERT Exemplar Q2.8',
        type: 'conceptual',
        difficulty: 'challenging',
        questionText: 'A parallel plate capacitor is charged by a battery to potential V and then disconnected. A dielectric slab of dielectric constant K is then inserted between the plates. Explain the effect of inserting the slab on: (a) charge, (b) capacitance, (c) potential difference, (d) electric field, and (e) stored electrostatic energy. Support each with formulas.',
        diagramDescription: 'Parallel plate capacitor with initial plates of area A and separation d. Dielectric slab of constant K filling the space completely after battery disconnection.',
        analyticalSolution: 'When disconnected from the battery, the charges on the plates are isolated, so charge Q remains strictly constant (Q = Q0). Capacitance increases by factor K: C = K · C0. Potential difference decreases: V = Q / C = Q0 / (K · C0) = V0 / K. Electric field decreases: E = V / d = V0 / (K · d) = E0 / K. Electrostatic energy U = Q² / (2C) = Q0² / (2 · K · C0) = U0 / K, meaning energy decreases by factor K as mechanical work is done by the electric field in pulling the dielectric into the capacitor.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State that battery disconnection isolates plates, hence charge remains constant.',
                mathExpression: 'Q = Q_0 (Constant)',
                marksAwarded: 0.5
            },
            {
                step: 2,
                description: 'State capacitance increases by dielectric factor K.',
                mathExpression: 'C = K · C_0 (Increases by factor K)',
                marksAwarded: 0.5
            },
            {
                step: 3,
                description: 'Determine potential difference V = Q / C.',
                mathExpression: 'V = Q_0 / (K · C_0) = V_0 / K (Decreases by factor K)',
                marksAwarded: 0.5
            },
            {
                step: 4,
                description: 'Determine electric field E = V / d = E_0 / K.',
                mathExpression: 'E = E_0 / K (Decreases by factor K)',
                marksAwarded: 0.5
            },
            {
                step: 5,
                description: 'Calculate electrostatic energy U = Q² / (2C) = U_0 / K.',
                mathExpression: 'U = U_0 / K (Decreases by factor K; work done by field in pulling slab)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: 'Award 0.5 marks each for charge, capacitance, potential, electric field; 1 mark for stored energy with physical justification of energy reduction.',
        commonMistakesAndTraps: [
            'Using U = 1/2 C V² and incorrectly concluding U increases because C increases, while forgetting that V has dropped by 1/K.',
            'Confusing battery disconnected (Q = constant) with battery connected (V = constant).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 2, Section 2.11 Dielectrics and Capacitance'
    },
    {
        id: 'ex-phy-02-02',
        chapterId: 'phy-1-2',
        problemNumber: 'NCERT Exemplar Q2.17',
        type: 'numerical',
        difficulty: 'moderate',
        questionText: 'Two concentric hollow conducting spheres of radii R and 2R carry charges Q1 and Q2 respectively. If the surface charge densities of the two spheres are equal, find the ratio of charges Q1 : Q2 and the potential at their common center.',
        diagramDescription: 'Inner sphere of radius R with charge Q1, outer sphere of radius 2R with charge Q2. Common center O.',
        analyticalSolution: 'Given surface charge density sigma1 = sigma2 = σ. Q1 = σ · (4 · π · R²) and Q2 = σ · (4 · π · (2R)²) = σ · 16 · π · R². Thus Q1 / Q2 = R² / (2R)² = 1/4. The potential at the center is the sum of potentials due to both spherical shells: V_center = V1 + V2 = [1 / (4 · π · ε₀)] · [Q1 / R + Q2 / (2R)]. Substituting Q2 = 4 · Q1 gives V_center = [1 / (4 · π · ε₀)] · [Q1 / R + 4 · Q1 / (2R)] = [3 · Q1] / [4 · π · ε₀ · R].',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Equate surface charge densities: sigma1 = Q1 / (4 · π · R²) and sigma2 = Q2 / (4 · π · 4R²).',
                mathExpression: 'Q1 / (4 · π · R²) = Q2 / (16 · π · R²) => Q1 / Q2 = 1 / 4',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Express potential at common center as superposition of potential from both shells.',
                mathExpression: 'V_center = (1 / 4 · π · ε₀) · (Q1 / R + Q2 / 2R)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Substitute Q2 = 4 · Q1 and simplify expression.',
                mathExpression: 'V_center = (1 / 4 · π · ε₀) · (Q1 / R + 4 · Q1 / 2R) = 3 · Q1 / (4 · π · ε₀ · R)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for charge ratio 1:4, 1 mark for superposition formula at center, 1 mark for final potential expression.',
        commonMistakesAndTraps: [
            'Assuming potential at the center is zero because electric field inside a conductor is zero. (E = -dV/dr = 0 implies V is constant, not zero).',
            'Using distance 2R - R for outer shell potential.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 2, Section 2.5 Potential due to a System of Charges'
    },
    // Chapter 3: Current Electricity (phy-1-3)
    {
        id: 'ex-phy-03-01',
        chapterId: 'phy-1-3',
        problemNumber: 'NCERT Exemplar Q3.6',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Why is a potentiometer preferred over a voltmeter for measuring the electromotive force (emf) of a cell? Explain the underlying physical principle.',
        diagramDescription: 'Circuit diagram showing a primary potentiometer circuit with battery B and rheostat Rh, and secondary circuit with test cell E and galvanometer G at balance point null deflection.',
        analyticalSolution: 'A voltmeter requires a finite current to produce deflection in its coil or circuit, which results in measuring the terminal potential difference V = E - I · r (where r is internal resistance of the cell), which is strictly less than the true emf E. In contrast, a potentiometer works on the null deflection principle. At the balance point, no current flows from the cell under test into the galvanometer branch (I = 0). Thus, the potential difference across the balanced wire length equals the true open-circuit electromotive force E without any internal resistance drop (V = E). It is essentially an ideal voltmeter of infinite resistance.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Explain that voltmeter draws current I > 0, so measured voltage is terminal voltage V = E - Ir < E.',
                mathExpression: 'V_voltmeter = E - I · r < E',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Explain potentiometer null deflection condition where current through test cell branch is zero (I = 0).',
                mathExpression: 'I_galvanometer = 0 => V_measured = E - (0) · r = E',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Conclude that potentiometer acts as an instrument with infinite effective resistance at null point.',
                mathExpression: 'R_effective -> infinity at balance point',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for voltmeter drawing current (V = E - Ir), 1 mark for null condition (I=0), 1 mark for conclusion on infinite effective resistance.',
        commonMistakesAndTraps: [
            'Stating that a potentiometer is more sensitive without explaining the zero current null balance condition.',
            'Forgetting to mention the internal resistance voltage drop Ir.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 3, Section 3.12 Potentiometer Principles'
    },
    {
        id: 'ex-phy-03-02',
        chapterId: 'phy-1-3',
        problemNumber: 'NCERT Exemplar Q3.15',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'A cylindrical wire of radius a and length L has resistivity ρ that varies linearly with distance x from one end as ρ(x) = rho_0 · (1 + x / L). Calculate the total resistance of the wire.',
        diagramDescription: 'Cylindrical wire of length L along x-axis from x=0 to x=L, uniform cross-sectional area A = π · a², varying resistivity ρ(x).',
        analyticalSolution: 'Consider an infinitesimal slice of the wire of thickness dx at distance x from x = 0. The cross-sectional area of this element is A = π · a². Since these infinitesimal slices are in series across the length of the wire, the resistance of the element is dR = ρ(x) · dx / A = [rho_0 · (1 + x / L) / (π · a²)] · dx. Integrating from x = 0 to x = L: R = integral [dR] = (rho_0 / A) · integral_0^L (1 + x/L) dx = (rho_0 / A) · [x + x² / (2L)]_0^L = (rho_0 / A) · [L + L / 2] = 3 · rho_0 · L / (2 · π · a²).',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Formulate elementary resistance dR for slice of thickness dx in series.',
                mathExpression: 'dR = ρ(x) · dx / A = [rho_0 · (1 + x/L) / (π · a²)] dx',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Set up definite integral over the entire length from x = 0 to x = L.',
                mathExpression: 'R = (rho_0 / π · a²) · int_0^L (1 + x/L) dx',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Evaluate definite integral: int_0^L (1 + x/L) dx = [x + x² / 2L]_0^L = L + L/2 = 3L/2.',
                mathExpression: 'R = (rho_0 / π · a²) · (3L / 2)',
                marksAwarded: 0.5
            },
            {
                step: 4,
                description: 'State final resistance with correct constant and units.',
                mathExpression: 'R = 3 · rho_0 · L / (2 · π · a²) ohms',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1 mark for slicing element dR, 1 mark for definite integral setup, 1 mark for correct algebraic integration and final answer.',
        commonMistakesAndTraps: [
            'Simply taking the average resistivity (rho_0 + 2 · rho_0)/2 without setting up the formal calculus integral (CBSE step marking requires integration).',
            'Errors in integrating x/L to get x²/(2L).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 3, Section 3.4 Resistivity of Various Materials'
    },
    // Chapter 4: Moving Charges and Magnetism (phy-1-4)
    {
        id: 'ex-phy-04-01',
        chapterId: 'phy-1-4',
        problemNumber: 'NCERT Exemplar Q4.5',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'An electron and a proton enter a region of uniform magnetic field B with the same kinetic energy K, perpendicular to the magnetic field. Compare: (a) the radii of their circular paths, and (b) their orbital frequencies.',
        diagramDescription: 'Uniform magnetic field directed perpendicularly into the page. Electron and proton entering horizontally from the left with equal kinetic energy.',
        analyticalSolution: 'The centripetal force is provided by the magnetic Lorentz force: m · v² / r = q · v · B => r = m · v / (q · B) = p / (q · B). Since kinetic energy K = p² / (2m), momentum p = sqrt(2 · m · K). Thus r = sqrt(2 · m · K) / (q · B). Since K, q, and B are identical for both, r is proportional to sqrt(m). Because m_p >> m_e (≈1836 times), r_p / r_e = sqrt(m_p / m_e) ≈ sqrt(1836) ≈ 42.8. The orbital frequency is f = 1 / T = q · B / (2 · π · m). Since q and B are equal, f is inversely proportional to m: f_e / f_p = m_p / m_e ≈ 1836. The electron orbits with much higher frequency.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Derive radius in terms of kinetic energy K: r = p / (q · B) = sqrt(2 · m · K) / (q · B).',
                mathExpression: 'r = sqrt(2 · m · K) / (q · B) => r proportional to sqrt(m) / q',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Compute ratio of radii: charges are equal (|q_e| = |q_p| = e).',
                mathExpression: 'r_e / r_p = sqrt(m_e / m_p) < 1 => r_p > r_e',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Write expression for orbital frequency f = q · B / (2 · π · m).',
                mathExpression: 'f = 1 / T = q · B / (2 · π · m) => f proportional to 1/m',
                marksAwarded: 0.5
            },
            {
                step: 4,
                description: 'Compute frequency ratio: f_e / f_p = m_p / m_e >> 1.',
                mathExpression: 'f_e / f_p = m_p / m_e (≈1836)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1.5 marks for radius comparison with sqrt(m) derivation, 1.5 marks for frequency comparison with inverse mass dependence.',
        commonMistakesAndTraps: [
            'Assuming r is proportional to m directly (that is true only for constant velocity v, not constant kinetic energy K).',
            'Thinking frequency depends on radius or velocity (cyclotron frequency is independent of speed and radius).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 4, Section 4.3 Motion in a Magnetic Field'
    },
    // Chapter 5: Magnetism and Matter (phy-1-5)
    {
        id: 'ex-phy-05-01',
        chapterId: 'phy-1-5',
        problemNumber: 'NCERT Exemplar Q5.2',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'State Gauss law in magnetism. What important physical conclusion regarding magnetic poles is drawn from this law? How does it contrast with Gauss law in electrostatics?',
        diagramDescription: 'Closed arbitrary Gaussian surface enclosing a bar magnet with North and South poles, showing magnetic field lines entering and leaving in closed continuous loops.',
        analyticalSolution: 'Gauss law in magnetism states that the net magnetic flux through any closed Gaussian surface S is identically zero: oint_S B . dA = 0. Physical conclusion: Isolated magnetic poles (magnetic monopoles) do not exist in nature; magnetic poles always exist in equal and opposite conjugate pairs (dipoles). This implies that magnetic field lines form continuous closed loops with no beginning or end. In contrast, Gauss law in electrostatics states oint_S E . dA = q_enclosed / ε₀, where isolated electric charges (monopoles) exist and electric field lines originate on positive charges and terminate on negative charges.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State the mathematical formulation of Gauss law in magnetism.',
                mathExpression: 'oint_S B . dA = 0',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'State the physical deduction regarding non-existence of magnetic monopoles.',
                mathExpression: 'Isolated magnetic poles do not exist; poles occur in dipoles',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Contrast with electrostatics where isolated charges exist and flux = q_enclosed / ε₀.',
                mathExpression: 'Electrostatics: ∮ E . dA = q_enc / ε₀ != 0 for net charge',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for formula ∮ B.dA = 0, 1 mark for non-existence of monopoles, 1 mark for clear contrast with electrostatics.',
        commonMistakesAndTraps: [
            'Writing flux through an open surface instead of specifying a closed surface.',
            'Failing to mention that magnetic field lines form closed continuous loops.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 5, Section 5.3 Gauss Law in Magnetism'
    },
    // Chapter 6: Electromagnetic Induction (phy-1-6)
    {
        id: 'ex-phy-06-01',
        chapterId: 'phy-1-6',
        problemNumber: 'NCERT Exemplar Q6.9',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'A metal rod of length l and mass m slides down without friction along two parallel conducting rails separated by distance l, inclined at an angle θ to the horizontal. A uniform vertical magnetic field B exists in the region. A resistor R connects the rails at the top. Determine the terminal velocity attained by the rod.',
        diagramDescription: 'Inclined plane at angle θ with parallel rails connected by resistor R. Rod of mass m sliding down under gravity in a vertically upward magnetic field B.',
        analyticalSolution: 'When the rod moves with velocity v down the incline, the horizontal component of velocity perpendicular to vertical field B is v · cos(θ). The motional emf induced is epsilon = B · l · v · cos(θ). Induced current in the loop is I = epsilon / R = [B · l · v · cos(θ)] / R. The magnetic force on the current-carrying rod in field B is F_mag = I · l · B, directed horizontally opposite to motion. The component of this magnetic force resisting motion up the incline is F_retard = F_mag · cos(θ) = [B² · l² · v · cos²(θ)] / R. At terminal velocity v_t, the downward gravitational component m · g · sin(θ) equals the retarding magnetic component: m · g · sin(θ) = [B² · l² · v_t · cos²(θ)] / R. Solving gives v_t = [m · g · R · sin(θ)] / [B² · l² · cos²(θ)].',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Find motional emf using velocity component perpendicular to vertical field B.',
                mathExpression: 'epsilon = B · l · (v · cos θ)',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Determine induced current through resistor R.',
                mathExpression: 'I = epsilon / R = (B · l · v · cos θ) / R',
                marksAwarded: 0.5
            },
            {
                step: 3,
                description: 'Calculate horizontal magnetic force F_m = I · l · B and its component opposing motion along the incline.',
                mathExpression: 'F_incline = F_m · cos θ = (B² · l² · v · cos² θ) / R',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Equate gravitational force component along incline to retarding magnetic force at steady state.',
                mathExpression: 'm · g · sin θ = (B² · l² · v_t · cos² θ) / R',
                marksAwarded: 1.0
            },
            {
                step: 5,
                description: 'Solve for terminal velocity v_t.',
                mathExpression: 'v_t = (m · g · R · sin θ) / (B² · l² · cos² θ)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1 mark for correct projection v · cos(θ), 1 mark for magnetic force component along incline, 1 mark for force balance, 1 mark for terminal velocity.',
        commonMistakesAndTraps: [
            'Using v directly instead of resolving with cos(θ) for vertical magnetic field.',
            'Forgetting that the magnetic force is horizontal, so its component along the plane is F_mag · cos(θ).'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 6, Section 6.5 Motional Electromotive Force'
    },
    // Chapter 7: Alternating Current (phy-1-7)
    {
        id: 'ex-phy-07-01',
        chapterId: 'phy-1-7',
        problemNumber: 'NCERT Exemplar Q7.4',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'In a series LCR circuit connected to an AC source V = V0 · sin(omega · t), define the Quality Factor (Q-factor) of resonance. Explain its physical significance in tuning circuits and derive the relation Q = (1/R) · sqrt(L/C).',
        diagramDescription: 'Resonance curve showing current amplitude versus angular frequency omega. Sharp resonance peak at omega_0 with half-power bandwidth Δ omega = omega_2 - omega_1.',
        analyticalSolution: 'The Quality Factor (Q) measures the sharpness of resonance in an LCR circuit. Mathematically, it is defined as the ratio of resonant angular frequency omega_0 to the bandwidth (omega_2 - omega_1) at half-power points: Q = omega_0 / (2 · Delta_omega) = omega_0 · L / R. At resonance, omega_0 = 1 / sqrt(L · C). Substituting omega_0: Q = (1 / sqrt(L · C)) · (L / R) = (1 / R) · sqrt(L / C). Physical significance: A higher Q-factor implies a narrower bandwidth and sharper resonance peak, meaning the receiver circuit can select the desired station frequency cleanly with high selectivity while attenuating neighboring interfering signals.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Define Q-factor as ratio of resonant frequency to half-power bandwidth.',
                mathExpression: 'Q = omega_0 / (2 · Delta_omega) = omega_0 · L / R',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Substitute resonant frequency omega_0 = 1 / sqrt(L · C).',
                mathExpression: 'Q = [1 / (sqrt(L · C))] · (L / R) = (1 / R) · sqrt(L / C)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Explain selectivity significance in radio tuning circuits.',
                mathExpression: 'High Q => Narrow bandwidth => High selectivity (less cross-talk)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for definition, 1 mark for derivation of Q = (1/R) · sqrt(L/C), 1 mark for physical tuning significance.',
        commonMistakesAndTraps: [
            'Inverting the square root as sqrt(C/L) instead of sqrt(L/C).',
            'Confusing sharpness of resonance with sensitivity.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 7, Section 7.6 Resonance and Sharpness'
    },
    // Chapter 8: Electromagnetic Waves (phy-1-8)
    {
        id: 'ex-phy-08-01',
        chapterId: 'phy-1-8',
        problemNumber: 'NCERT Exemplar Q8.3',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'State Maxwell\'s concept of displacement current. Write the generalized Ampere-Maxwell law. How did displacement current resolve the logical inconsistency in Ampere\'s circuital law during the charging of a capacitor?',
        diagramDescription: 'Parallel plate capacitor connected to an AC source. Two surfaces S1 (flat disk) and S2 (pot-shaped surface passing between plates) bounded by the same closed loop C outside the plates.',
        analyticalSolution: 'During the charging of a capacitor, conduction current I_c flows in the connecting wires but no conduction charges cross the insulating gap between plates. Ampere\'s circuital law ∮ B.dl = μ₀ · I_enc gave ∮ B.dl = μ₀ · I_c for a flat surface bounded by loop C, but gave 0 for a pot-shaped surface whose bottom passed between the capacitor plates, which was a logical contradiction. Maxwell deduced that the time-varying electric field between the plates produces a displacement current: I_d = ε₀ · (d Phi_E / dt). The generalized Ampere-Maxwell law is: ∮ B.dl = μ₀ · (I_c + I_d) = μ₀ · [I_c + ε₀ · (d Phi_E / dt)]. Between the plates, I_c = 0 and I_d = I_c, ensuring continuity of current across all surfaces.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Explain the inconsistency in Ampere\'s original law across two surfaces bounded by the same loop.',
                mathExpression: '∮ B.dl = μ₀ · I_c (for S1), but ∮ B.dl = 0 (for S2 between plates)',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Define displacement current in terms of rate of change of electric flux.',
                mathExpression: 'I_d = ε₀ · (d Phi_E / dt)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'State the complete Ampere-Maxwell equation.',
                mathExpression: '∮ B . dl = μ₀ · (I_c + ε₀ · d Phi_E / dt)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for inconsistency explanation, 1 mark for displacement current definition, 1 mark for complete equation.',
        commonMistakesAndTraps: [
            'Calling displacement current a flow of actual physical charges (it is due to time-varying electric flux).',
            'Missing the constant ε₀ in the formula.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 8, Section 8.2 Displacement Current'
    },
    // Chapter 9: Ray Optics and Optical Instruments (phy-2-1)
    {
        id: 'ex-phy-09-01',
        chapterId: 'phy-2-1',
        problemNumber: 'NCERT Exemplar Q9.11',
        type: 'numerical',
        difficulty: 'challenging',
        questionText: 'A convex lens of focal length 20 cm made of glass (refractive index n_g = 1.5) is immersed in water (n_w = 4/3). (a) Calculate the focal length of the lens in water. (b) If the same lens is immersed in a liquid of refractive index n_l = 1.6, state whether it will act as a converging or diverging lens, and calculate its new focal length.',
        diagramDescription: 'Convex glass lens with radii of curvature R1 and R2 immersed in water and in a denser liquid.',
        analyticalSolution: 'From the Lensmaker\'s formula: 1/f = (n_lens/n_med - 1) · (1/R1 - 1/R2). In air: 1/f_air = (1.5/1.0 - 1) · K = 0.5 · K, where K = (1/R1 - 1/R2) = 1/(0.5 · 20) = 1/10 cm⁻¹. (a) In water: 1/f_water = (n_g/n_w - 1) · K = (1.5 / (4/3) - 1) · K = (9/8 - 1) · K = (1/8) · (1/10) = 1/80 cm⁻¹ => f_water = +80 cm (converging, focal length increases by factor 4). (b) In liquid of n_l = 1.6: 1/f_liq = (1.5 / 1.6 - 1) · K = (15/16 - 1) · (1/10) = (-1/16) · (1/10) = -1/160 cm⁻¹ => f_liq = -160 cm. Since f_liq is negative, the convex lens turns into a diverging lens because the surrounding medium is optically denser than the lens material.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Write Lensmaker\'s formula and express curvature factor K = (1/R1 - 1/R2) using air focal length.',
                mathExpression: '1/f_air = (n_g - 1) · K => K = 1 / [(1.5 - 1) · 20] = 1/10 cm⁻¹',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Calculate focal length in water.',
                mathExpression: '1/f_w = (1.5 / (4/3) - 1) · (1/10) = (1/8) · (1/10) = 1/80 => f_w = +80 cm',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Calculate focal length in liquid of n = 1.6 and identify negative sign.',
                mathExpression: '1/f_l = (1.5 / 1.6 - 1) · (1/10) = (-1/16) · (1/10) = -1/160 => f_l = -160 cm',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Conclude nature of lens in liquid: diverging lens because n_med > n_lens.',
                mathExpression: 'Diverging lens (f < 0)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '1 mark for K calculation, 1 mark for water calculation (+80cm), 1 mark for liquid calculation (-160cm), 0.5 for diverging classification.',
        commonMistakesAndTraps: [
            'Forgetting that n_lens/n_med must be used instead of n_lens - n_med.',
            'Failing to notice the sign flip when n_med > n_lens, which turns a convex lens into a concave/diverging lens.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 9, Section 9.5 Refraction at Spherical Surfaces and by Lenses'
    },
    // Chapter 10: Wave Optics (phy-2-2)
    {
        id: 'ex-phy-10-01',
        chapterId: 'phy-2-2',
        problemNumber: 'NCERT Exemplar Q10.7',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'In Young\'s double-slit experiment, what happens to the interference fringes on the screen if: (a) the separation d between the slits is halved, (b) the screen distance D is doubled, (c) the source slit is replaced by a white light source, and (d) the entire apparatus is immersed in water?',
        diagramDescription: 'Standard Young\'s double slit experimental arrangement with slit separation d, screen distance D, and fringe width β = λ · D / d.',
        analyticalSolution: 'The fringe width is β = λ · D / d. (a) If d is halved: β\' = λ · D / (d/2) = 2 · β, so fringe width doubles. (b) If D is doubled: β\' = λ · (2D) / d = 2 · β, fringe width doubles. (c) If white light is used: The central fringe is white because all wavelengths satisfy zero path difference (Δ x = 0). The nearest colored fringes on either side will be violet (smallest wavelength λ) and the farthest fringe will be red (largest wavelength λ). Beyond a few colored fringes, the pattern fades into uniform illumination. (d) In water, wavelength decreases: lambda_w = λ / n_w = λ / 1.33. Hence β\' = β / n_w, meaning fringes become narrower and closer together.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Fringe width formula: β = λ · D / d.',
                mathExpression: 'β = λ · D / d',
                marksAwarded: 0.5
            },
            {
                step: 2,
                description: 'Effect of halving d: fringe width doubles.',
                mathExpression: 'beta_new = 2 · β (Doubles)',
                marksAwarded: 0.5
            },
            {
                step: 3,
                description: 'Effect of doubling D: fringe width doubles.',
                mathExpression: 'beta_new = 2 · β (Doubles)',
                marksAwarded: 0.5
            },
            {
                step: 4,
                description: 'Effect of white light: Central fringe is white, followed by colored fringes (violet innermost, red outermost).',
                mathExpression: 'Central = White, Inner = Violet, Outer = Red',
                marksAwarded: 1.0
            },
            {
                step: 5,
                description: 'Effect of immersion in water: λ reduces by factor 1/n, so fringe width decreases.',
                mathExpression: 'beta_water = β / n_water (Fringes shrink)',
                marksAwarded: 0.5
            }
        ],
        cbseMarkingSchemeNote: '0.5 marks each for (a), (b), (d); 1.0 mark for white light description with central white and violet-red sequence.',
        commonMistakesAndTraps: [
            'Claiming that with white light no interference occurs (interference still occurs for each individual wavelength).',
            'Confusing the colored order: red has larger wavelength, so red fringe is broader and located further out than violet.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 10, Section 10.4 Coherent and Incoherent Addition of Waves'
    },
    // Chapter 11: Dual Nature of Radiation and Matter (phy-2-3)
    {
        id: 'ex-phy-11-01',
        chapterId: 'phy-2-3',
        problemNumber: 'NCERT Exemplar Q11.4',
        type: 'graphical',
        difficulty: 'moderate',
        questionText: 'Plot a graph showing the variation of stopping potential V0 with frequency ν of incident radiation for two different photosensitive metals A and B having work functions Phi_A > Phi_B. (a) What does the slope of the graph represent? (b) How does the graph yield the threshold frequency and work function of the metals?',
        diagramDescription: 'Graph with frequency ν on x-axis and stopping potential V0 on y-axis. Two parallel straight lines with positive slope, intercepting x-axis at threshold frequencies nu_0B and nu_0A (nu_0A > nu_0B).',
        analyticalSolution: 'Einstein\'s photoelectric equation: K_max = e · V_0 = h · ν - Φ => V_0 = (h / e) · ν - (Φ / e). (a) The equation is of the straight-line form y = m · x + c. The slope m = h / e, which is a universal constant depending only on Planck\'s constant and elementary charge, hence the lines for both metals A and B are strictly parallel. (b) The x-intercept (where V_0 = 0) gives the threshold frequency: nu_0 = Φ / h. Since Phi_A > Phi_B, nu_0A > nu_0B, so line A intercepts further to the right. The y-intercept (extrapolated to ν = 0) gives c = -Φ / e, from which work function Φ = e · |y-intercept| is determined.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Express Einstein\'s photoelectric equation in slope-intercept form V0 vs ν.',
                mathExpression: 'V_0 = (h / e) · ν - (Φ / e)',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'State that slope = h/e, a universal constant independent of metal.',
                mathExpression: 'Slope = h / e (Identical parallel slope for all metals)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Explain threshold frequency from x-intercept and work function from y-intercept or Φ = h · nu_0.',
                mathExpression: 'x-intercept = nu_0 = Φ / h; y-intercept = -Φ / e',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for correct equation in slope-intercept form, 1 mark for slope interpretation (h/e), 1 mark for intercepts and parallel line drawing.',
        commonMistakesAndTraps: [
            'Drawing lines with different slopes (the slope h/e is universal and never changes between materials).',
            'Placing metal with larger work function to the left instead of to the right of metal B.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 11, Section 11.4 Einstein\'s Photoelectric Equation'
    },
    // Chapter 12: Atoms (phy-2-4)
    {
        id: 'ex-phy-12-01',
        chapterId: 'phy-2-4',
        problemNumber: 'NCERT Exemplar Q12.6',
        type: 'numerical',
        difficulty: 'moderate',
        questionText: 'A hydrogen atom in its ground state absorbs an ultraviolet photon of wavelength 97.5 nm. (a) To which energy level is the electron excited? (b) What are the shortest and longest wavelengths of radiation that can subsequently be emitted by the excited atom?',
        diagramDescription: 'Energy level diagram for Hydrogen showing n = 1 (-13.6 eV), n = 2 (-3.4 eV), n = 3 (-1.51 eV), n = 4 (-0.85 eV), with absorption arrow from n=1 to n=4.',
        analyticalSolution: 'Energy of the absorbed photon is E = h · c / λ = (1242 eV · nm) / (97.5 nm) = 12.74 eV. Since ground state energy is E1 = -13.6 eV, the energy of the excited level is E_n = -13.6 + 12.74 = -0.86 eV. Since E_n = -13.6 / n² eV, n² = 13.6 / 0.85 ≈ 16 => n = 4. The electron is excited to the n = 4 state. (b) The emitted radiation corresponds to transitions from n = 4 to lower states. The longest wavelength corresponds to the minimum energy jump: Δ E_min = E4 - E3 = -0.85 - (-1.51) = 0.66 eV => lambda_max = 1242 / 0.66 = 1882 nm (Paschen series). The shortest wavelength corresponds to the maximum energy jump: Δ E_max = E4 - E1 = 12.74 eV => lambda_min = 97.5 nm (Lyman series).',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Calculate photon energy: E = hc / λ.',
                mathExpression: 'E = (1242 eV · nm) / 97.5 nm = 12.74 eV',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Determine excited state quantum number n.',
                mathExpression: 'E_n = -13.6 + 12.74 = -0.86 eV => -13.6 / n² = -0.85 => n = 4',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Calculate longest emitted wavelength (transition 4 -> 3).',
                mathExpression: 'Δ E_min = E_4 - E_3 = 0.66 eV => lambda_max = 1242 / 0.66 = 1882 nm',
                marksAwarded: 1.0
            },
            {
                step: 4,
                description: 'Calculate shortest emitted wavelength (transition 4 -> 1).',
                mathExpression: 'Δ E_max = E_4 - E_1 = 12.74 eV => lambda_min = 97.5 nm',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for absorbed photon energy, 1 mark for n = 4, 1 mark for longest wavelength (1882nm), 1 mark for shortest wavelength (97.5nm).',
        commonMistakesAndTraps: [
            'Assuming the longest wavelength corresponds to transition to ground state (largest energy difference gives shortest wavelength, not longest).',
            'Using wrong conversion factor for hc.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 12, Section 12.5 De Broglie\'s Explanation of Bohr\'s Second Postulate'
    },
    // Chapter 13: Nuclei (phy-2-5)
    {
        id: 'ex-phy-13-01',
        chapterId: 'phy-2-5',
        problemNumber: 'NCERT Exemplar Q13.3',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Show that the density of nuclear matter is independent of the mass number A of the nucleus. Calculate its approximate numerical order of magnitude.',
        diagramDescription: 'Spherical nucleus of radius R = R0 · A^(1/3) containing A nucleons of average mass m.',
        analyticalSolution: 'The radius of a nucleus of mass number A is given by the empirical relation R = R_0 · A^(1/3), where R_0 ≈ 1.2 · 10⁻¹⁵ m (1.2 fm). Assuming a spherical nucleus, its volume is V = (4/3) · π · R³ = (4/3) · π · (R_0 · A^(1/3))³ = (4/3) · π · R_0³ · A. If m is the average mass of a nucleon (m ≈ 1.66 · 10⁻²⁷ kg), the total mass of the nucleus is M = m · A. The nuclear density is ρ = M / V = (m · A) / [(4/3) · π · R_0³ · A] = (3 · m) / (4 · π · R_0³). Since A cancels out completely, nuclear density is strictly independent of mass number A. Substituting numerical values: ρ = [3 · 1.66 · 10⁻²⁷] / [4 · π · (1.2 · 10⁻¹⁵)³] ≈ 2.3 · 10¹⁷ kg/m³.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'Express nuclear volume using radius formula R = R0 · A^(1/3).',
                mathExpression: 'V = (4/3) · π · R³ = (4/3) · π · R_0³ · A',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Express total mass as M = m · A and divide by volume to show cancellation of A.',
                mathExpression: 'ρ = (m · A) / [(4/3) · π · R_0³ · A] = 3m / (4 · π · R_0³)',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Substitute numerical constants and calculate magnitude (≈10¹⁷ kg/m³).',
                mathExpression: 'ρ ≈ 2.3 · 10¹⁷ kg/m³',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for volume derivation showing A dependence, 1 mark for density formula showing cancellation of A, 1 mark for order of magnitude ≈10¹⁷ kg/m³.',
        commonMistakesAndTraps: [
            'Forgetting to cube the radius R, writing R³ = R_0 · A instead of R_0³ · A.',
            'Miscalculating the huge exponent 10¹⁷ kg/m³.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 13, Section 13.3 Size of the Nucleus'
    },
    // Chapter 14: Semiconductor Electronics (phy-2-6)
    {
        id: 'ex-phy-14-01',
        chapterId: 'phy-2-6',
        problemNumber: 'NCERT Exemplar Q14.8',
        type: 'conceptual',
        difficulty: 'moderate',
        questionText: 'Why is a semiconductor damaged by a strong current while a metal wire is not damaged as easily? Explain in terms of the temperature coefficient of resistance.',
        diagramDescription: 'Comparison graph of resistivity versus temperature for copper (metal: positive temperature coefficient α > 0) versus silicon/germanium (semiconductor: negative temperature coefficient α < 0).',
        analyticalSolution: 'In a metallic conductor, resistance increases with temperature because thermal vibrations increase electron scattering (positive temperature coefficient of resistance, α > 0). When heavy current flows, Joule heating (I² · R · t) raises temperature, which increases resistance, thereby naturally self-limiting the current. In a semiconductor, electrical conductivity is due to thermally generated electron-hole pairs across the band gap. Semiconductors have a negative temperature coefficient of resistance (α < 0). When a strong current passes through a semiconductor, the resulting Joule heating causes rapid thermal breaking of covalent bonds, dramatically increasing charge carrier concentration n. This causes resistance to plummet drastically, which draws even more current from the voltage source, creating a regenerative thermal runaway cycle that melts and destroys the crystal lattice.',
        stepByStepWorking: [
            {
                step: 1,
                description: 'State temperature coefficient sign: Metals have α > 0; semiconductors have α < 0.',
                mathExpression: 'Metal: dR/dT > 0; Semiconductor: dR/dT < 0',
                marksAwarded: 1.0
            },
            {
                step: 2,
                description: 'Explain mechanism of bond breaking and carrier generation in semiconductors.',
                mathExpression: 'T rises => Covalent bonds break => n and p increase exponentially',
                marksAwarded: 1.0
            },
            {
                step: 3,
                description: 'Describe thermal runaway phenomenon causing crystal lattice destruction.',
                mathExpression: 'Higher T => Lower R => Higher I => Higher T (Thermal Runaway)',
                marksAwarded: 1.0
            }
        ],
        cbseMarkingSchemeNote: '1 mark for temperature coefficient comparison, 1 mark for covalent bond breaking mechanism, 1 mark for thermal runaway explanation.',
        commonMistakesAndTraps: [
            'Explaining only in terms of melting point rather than the negative temperature coefficient and thermal runaway mechanism.',
            'Forgetting that semiconductor conductivity increases exponentially with temperature.'
        ],
        relatedNcertExerciseRef: 'NCERT Chapter 14, Section 14.3 Intrinsic Semiconductor'
    }
];
