/**
 * CBSE Class XII Physics (042) - Complete Official Derivations Master Repository
 * 2026-2027 Examination Blueprint Standard
 * Every derivation includes:
 * - Official CBSE statement & marks weightage (2m, 3m, or 5m)
 * - Required labelled diagram specification
 * - Sourced assumptions and starting principles
 * - Step-by-step mathematical deduction
 * - Final box-formula and unit analysis
 * - Special edge cases and common board exam pitfalls
 */
export const cbsePhysicsDerivations = [
    // Chapter 1: Electric Charges and Fields
    {
        id: 'phy-der-01',
        chapterId: 'physics-1-1',
        title: 'Electric field on the axial line of an electric dipole',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'An electric dipole with charges -q at A and +q at B separated by distance 2a. A point P on the axis at distance r from dipole center O. Field E₊q directed away from +q, and E₋q directed towards -q.',
        assumptions: [
            'Point P lies on the axial line at distance r from the dipole center (r > a).',
            'The medium around the dipole is vacuum or free space (dielectric constant K = 1).'
        ],
        startingFormula: 'E = (1 / (4πε₀)) · (q / distance²)',
        steps: [
            {
                stepNumber: 1,
                description: 'Calculate the magnitude of electric field E₊q at point P due to charge +q at distance (r - a).',
                mathExpression: 'E₊q = (1 / (4πε₀)) · (q / (r - a)²) [along BP produced]',
                reasoning: 'Positive charge creates an outwardly directed electric field.'
            },
            {
                stepNumber: 2,
                description: 'Calculate the magnitude of electric field E₋q at point P due to charge -q at distance (r + a).',
                mathExpression: 'E₋q = (1 / (4πε₀)) · (q / (r + a)²) [along PA]',
                reasoning: 'Negative charge creates an inwardly directed electric field.'
            },
            {
                stepNumber: 3,
                description: 'Find the net electric field E_axial by taking the vector difference since E₊q and E₋q are collinear and oppositely directed.',
                mathExpression: 'E_axial = E₊q - E₋q = (q / (4πε₀)) · [ 1/(r - a)² - 1/(r + a)² ]',
                reasoning: 'E₊q > E₋q because (r - a) < (r + a).'
            },
            {
                stepNumber: 4,
                description: 'Combine the fractions over a common denominator: [(r - a)(r + a)]² = (r² - a²)².',
                mathExpression: 'E_axial = (q / (4πε₀)) · [ ((r + a)² - (r - a)²) / (r² - a²)² ] = (q / (4πε₀)) · [ 4 · a · r / (r² - a²)² ]',
                reasoning: 'Algebraic expansion: (r+a)² - (r-a)² = 4ar.'
            },
            {
                stepNumber: 5,
                description: 'Express in terms of electric dipole moment magnitude p = q · (2a).',
                mathExpression: 'E_axial = (1 / (4πε₀)) · [ 2 · (q · 2a) · r / (r² - a²)² ] = (1 / (4πε₀)) · [ 2 · p · r / (r² - a²)² ]',
                reasoning: 'Definition of electric dipole moment vector p = q · 2a directed from -q to +q.'
            },
            {
                stepNumber: 6,
                description: 'Apply the short dipole approximation where r >> a, so that (r² - a²)² ≈ r⁴.',
                mathExpression: 'E_axial ≈ (1 / (4πε₀)) · (2 · p / r³) [directed along dipole moment p]',
                reasoning: 'When r >> a, a² can be neglected in comparison to r².'
            }
        ],
        finalFormula: 'E_axial = (1 / (4πε₀)) · (2 · p / r³)',
        unit: 'N/C or V/m',
        commonMistakes: [
            'Forgetting to mention the vector direction (E_axial is in the direction of dipole moment p).',
            'Confusing (r - a) with (r + a) when setting up denominator distances.',
            'Omitting the short dipole approximation condition r >> a in the final step.'
        ]
    },
    {
        id: 'phy-der-02',
        chapterId: 'physics-1-1',
        title: 'Electric field on the equatorial line of an electric dipole',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'An electric dipole AB of length 2a. Point P on equatorial line perpendicular to AB at distance r from center O. AP = BP = √(r² + a²). Resolved components: E₊q cos θ and E₋q cos θ add antiparallel to p, while sin θ components cancel out.',
        assumptions: [
            'Point P lies on the perpendicular bisector (equatorial line) at distance r from center O.',
            'Dipole charges +q and -q are separated by 2a in free space.'
        ],
        startingFormula: 'E = (1 / (4πε₀)) · (q / AP²)',
        steps: [
            {
                stepNumber: 1,
                description: 'Compute distance from both charges to P: AP = BP = √(r² + a²).',
                mathExpression: 'AP = BP = (r² + a²)^(1/2)',
                reasoning: 'By Pythagoras theorem on right triangles OAP and OBP.'
            },
            {
                stepNumber: 2,
                description: 'Determine magnitudes of fields E₊q and E₋q at P.',
                mathExpression: '|E₊q| = |E₋q| = (1 / (4πε₀)) · [ q / (r² + a²) ]',
                reasoning: 'Magnitudes are equal because source charges and distances are identical.'
            },
            {
                stepNumber: 3,
                description: 'Resolve field vectors along perpendicular and parallel axes relative to dipole axis AB.',
                mathExpression: 'E_perp = E₊q · sin θ - E₋q · sin θ = 0',
                reasoning: 'The normal components are equal in magnitude and opposite in direction, canceling completely.'
            },
            {
                stepNumber: 4,
                description: 'Sum the parallel components which are directed opposite to dipole moment vector p.',
                mathExpression: 'E_eq = -(E₊q · cos θ + E₋q · cos θ) · p̂ = -2 · E₊q · cos θ · p̂',
                reasoning: 'Both cosine components point from right to left (parallel to BA, opposite to p which points from A to B).'
            },
            {
                stepNumber: 5,
                description: 'Substitute cos θ = a / √(r² + a²) from triangle OAP.',
                mathExpression: 'E_eq = -2 · [ (1 / (4πε₀)) · (q / (r² + a²)) ] · [ a / (r² + a²)^(1/2) ] · p̂ = -(1 / (4πε₀)) · [ (q · 2a) / (r² + a²)^(3/2) ] · p̂',
                reasoning: 'Trigonometric substitution and combining powers of (r² + a²).'
            },
            {
                stepNumber: 6,
                description: 'Substitute p = q · 2a and apply short dipole approximation (r >> a).',
                mathExpression: 'E_eq ≈ -(1 / (4πε₀)) · (p / r³)',
                reasoning: 'Negative sign indicates equatorial field is strictly antiparallel to electric dipole moment p.'
            }
        ],
        finalFormula: 'E_eq = -(1 / (4πε₀)) · (p / r³)',
        unit: 'N/C or V/m',
        commonMistakes: [
            'Missing the negative sign indicating that E_eq is antiparallel to dipole moment p.',
            'Failing to show cancellation of vertical sine components in the diagram.',
            'Confusing the ratio: E_axial / E_eq = 2 for short dipoles.'
        ]
    },
    {
        id: 'phy-der-03',
        chapterId: 'physics-1-1',
        title: 'Torque on an electric dipole in a uniform electric field',
        marksWeightage: 2,
        diagramRequired: true,
        diagramDescription: 'Dipole AB inclined at angle θ to uniform electric field E. Force F1 = +qE on +q along E, and F2 = -qE on -q opposite to E. Perpendicular distance between lines of action is 2a sin θ.',
        assumptions: [
            'Electric field E is uniform throughout the region.',
            'Dipole has length 2a and dipole moment p = q · 2a.'
        ],
        startingFormula: 'Torque = Force · Perpendicular distance between lines of action',
        steps: [
            {
                stepNumber: 1,
                description: 'Identify the forces acting on the two charges of the dipole.',
                mathExpression: 'F₊q = +q · E [along E], F₋q = -q · E [opposite to E]',
                reasoning: 'Force on charge q in electric field E is F = qE.'
            },
            {
                stepNumber: 2,
                description: 'Calculate net translational force on the dipole.',
                mathExpression: 'F_net = F₊q + F₋q = qE - qE = 0',
                reasoning: 'Net force is zero in a uniform field, so the dipole experiences no translational acceleration.'
            },
            {
                stepNumber: 3,
                description: 'Determine perpendicular arm distance BN between the two anti-parallel forces from right triangle ANB.',
                mathExpression: 'BN = AB · sin θ = 2a · sin θ',
                reasoning: 'Trigonometric sine definition: BN / AB = sin θ.'
            },
            {
                stepNumber: 4,
                description: 'Compute torque magnitude τ.',
                mathExpression: 'τ = Force · BN = (q · E) · (2a · sin θ) = (q · 2a) · E · sin θ = p · E · sin θ',
                reasoning: 'Substitute dipole moment p = q · 2a.'
            },
            {
                stepNumber: 5,
                description: 'Write in vector cross-product notation.',
                mathExpression: 'τ = p x E',
                reasoning: 'Direction of torque is given by right-hand screw rule perpendicular to both p and E.'
            }
        ],
        finalFormula: 'τ = p x E = p · E · sin θ',
        unit: 'N·m',
        commonMistakes: [
            'Writing E x p instead of p x E (reverses sign of torque).',
            'Stating that net force is non-zero (net force is zero in uniform field, non-zero only in non-uniform field).'
        ]
    },
    {
        id: 'phy-der-04',
        chapterId: 'physics-1-1',
        title: 'Electric field due to an infinitely long straight charged wire using Gauss’s law',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Infinitely long thin straight wire of uniform linear charge density λ. Coaxial cylindrical Gaussian surface of radius r and length l. Circular end caps I and II where E is perpendicular to dA (flux = 0). Curved cylindrical surface III where E is parallel to dA.',
        assumptions: [
            'Wire is infinitely long with uniform linear charge density λ = dq / dl.',
            'Gaussian surface is a closed cylinder of radius r and length l coaxial with the wire.'
        ],
        startingFormula: 'Gauss Law: ∮ E · dA = q_enclosed / ε₀',
        steps: [
            {
                stepNumber: 1,
                description: 'Evaluate electric flux through circular flat end caps S1 and S2 of the cylinder.',
                mathExpression: 'Phi_1 = int_S1 E · dA = int_S1 E · dA · cos(90 deg) = 0, Phi_2 = int_S2 E · dA = int_S2 E · dA · cos(90 deg) = 0',
                reasoning: 'Electric field E is radially outward, making angle 90 degrees with the outward normal dA of the flat circular caps.'
            },
            {
                stepNumber: 2,
                description: 'Evaluate electric flux through curved cylindrical surface S3.',
                mathExpression: 'Phi_3 = int_S3 E · dA = int_S3 E · dA · cos(0 deg) = E · int_S3 dA = E · (2 · π · r · l)',
                reasoning: 'E is perpendicular to curved surface everywhere, so angle between E and dA is 0 degrees; |E| is constant at radius r.'
            },
            {
                stepNumber: 3,
                description: 'Calculate total flux through the entire closed Gaussian surface.',
                mathExpression: 'Phi_total = Phi_1 + Phi_2 + Phi_3 = 0 + 0 + E · (2 · π · r · l) = E · (2 · π · r · l)',
                reasoning: 'Surface integral splits into sum over distinct boundary surfaces.'
            },
            {
                stepNumber: 4,
                description: 'Determine enclosed charge inside the cylindrical surface of length l.',
                mathExpression: 'q_enclosed = λ · l',
                reasoning: 'By definition of linear charge density λ.'
            },
            {
                stepNumber: 5,
                description: 'Apply Gauss’s theorem: Phi_total = q_enclosed / ε₀.',
                mathExpression: 'E · (2 · π · r · l) = (λ · l) / ε₀',
                reasoning: 'Equating calculated geometric flux to physical enclosed charge.'
            },
            {
                stepNumber: 6,
                description: 'Cancel length l and solve for electric field E.',
                mathExpression: 'E = λ / (2πε₀ · r) [radially outward if λ > 0, inward if λ < 0]',
                reasoning: 'Field depends inversely on first power of radial distance r (E proportional to 1/r).'
            }
        ],
        finalFormula: 'E = λ / (2πε₀ · r)',
        unit: 'N/C or V/m',
        commonMistakes: [
            'Omitting the flux integrals for the two flat circular end caps.',
            'Writing r² in the denominator instead of r.',
            'Forgetting to mention the vector direction radially outward or inward.'
        ]
    },
    {
        id: 'phy-der-05',
        chapterId: 'physics-1-1',
        title: 'Electric field due to a uniformly charged infinite plane sheet using Gauss’s law',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Infinite thin plane sheet with uniform surface charge density σ. Pillbox cylinder Gaussian surface of cross-sectional area A cutting through the sheet with ends at distance r on either side. Curved surface has E perpendicular to dA (flux = 0). End caps have E parallel to dA.',
        assumptions: [
            'Sheet is infinite in extent with uniform surface charge density σ.',
            'Symmetry requires E to be perpendicular to the sheet on both sides and directed away from positive charge.'
        ],
        startingFormula: '∮ E · dA = q_enclosed / ε₀',
        steps: [
            {
                stepNumber: 1,
                description: 'Select a cylindrical Gaussian surface of cross-section A oriented perpendicular to the sheet.',
                mathExpression: 'Curved surface: ∫ E · dA = ∫ E · dA · cos(90 deg) = 0',
                reasoning: 'Field lines are parallel to the curved surface of the cylinder, so normal component is zero.'
            },
            {
                stepNumber: 2,
                description: 'Evaluate flux through the two circular end caps of area A.',
                mathExpression: 'Phi_end1 = E · A, Phi_end2 = E · A',
                reasoning: 'E is normal to each end face pointing outward, so angle is 0 degrees and cos(0) = 1.'
            },
            {
                stepNumber: 3,
                description: 'Sum the total flux through the pillbox.',
                mathExpression: 'Phi_total = E · A + E · A = 2 · E · A',
                reasoning: 'Total flux is the sum over both circular faces.'
            },
            {
                stepNumber: 4,
                description: 'Calculate enclosed charge within cross-section A.',
                mathExpression: 'q_enclosed = σ · A',
                reasoning: 'Surface charge density σ multiplied by intercepted area A.'
            },
            {
                stepNumber: 5,
                description: 'Equate using Gauss’s law.',
                mathExpression: '2 · E · A = (σ · A) / ε₀ => E = σ / (2 · ε₀)',
                reasoning: 'Area A cancels out, demonstrating that field is independent of distance r from sheet.'
            }
        ],
        finalFormula: 'E = σ / (2 · ε₀)',
        unit: 'N/C or V/m',
        commonMistakes: [
            'Writing E = σ / ε₀ (which is the field for a conducting sheet with charges on two surfaces, not an isolated thin plane sheet).',
            'Assuming field depends on distance r.'
        ]
    },
    {
        id: 'phy-der-06',
        chapterId: 'physics-1-1',
        title: 'Electric field due to a uniformly charged thin spherical shell (inside and outside)',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Spherical shell of radius R with charge q. Case 1: Gaussian sphere of radius r > R outside. Case 2: Gaussian sphere of radius r < R inside.',
        assumptions: [
            'Thin spherical shell of radius R has total charge q distributed uniformly with surface density σ = q / (4 · π · R²).',
            'Charge exhibits spherical symmetry.'
        ],
        startingFormula: '∮ E · dA = q_enclosed / ε₀',
        steps: [
            {
                stepNumber: 1,
                description: 'Case 1: Outside the shell (r >= R). Construct concentric Gaussian sphere of radius r.',
                mathExpression: '∮ E · dA = E · (4 · π · r²)',
                reasoning: 'Spherical symmetry ensures E is radial and constant in magnitude over the sphere.'
            },
            {
                stepNumber: 2,
                description: 'Apply Gauss’s law for r >= R where q_enclosed = q.',
                mathExpression: 'E · (4 · π · r²) = q / ε₀ => E_outside = q / (4πε₀ · r²)',
                reasoning: 'The shell behaves as if its entire charge were concentrated at its center O.'
            },
            {
                stepNumber: 3,
                description: 'Case 2: Inside the shell (r < R). Construct concentric Gaussian sphere of radius r < R.',
                mathExpression: 'q_enclosed = 0',
                reasoning: 'All charge resides on the outer surface of the shell; zero charge is enclosed inside.'
            },
            {
                stepNumber: 4,
                description: 'Apply Gauss’s law for r < R.',
                mathExpression: 'E · (4 · π · r²) = 0 => E_inside = 0',
                reasoning: 'Electric field is identically zero everywhere inside a uniformly charged spherical shell.'
            }
        ],
        finalFormula: 'E = q / (4πε₀ · r²) [r >= R], and E = 0 [r < R]',
        unit: 'N/C',
        commonMistakes: [
            'Assuming electric field inside the shell is non-zero.',
            'Failing to draw the E vs r graph showing a jump discontinuity from 0 to max at r = R.'
        ]
    },
    // Chapter 2: Electrostatic Potential and Capacitance
    {
        id: 'phy-der-07',
        chapterId: 'physics-1-2',
        title: 'Electric potential due to an isolated point charge',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Source charge +q at origin O. Test charge +q0 moved from infinity to point P at distance r along radial line. Intermediate point A at distance x, with small displacement dx towards O.',
        assumptions: [
            'Source charge +q is fixed at the origin in vacuum.',
            'Test charge q0 = +1 C is brought from infinity without acceleration.'
        ],
        startingFormula: 'V = W_ext / q0 = - ∫_{infinity}^{r} E · dx',
        steps: [
            {
                stepNumber: 1,
                description: 'Determine electrostatic repulsion force on unit positive test charge at distance x from O.',
                mathExpression: 'F = (1 / (4πε₀)) · (q / x²) [directed away from O]',
                reasoning: 'Coulomb’s law for unit charge.'
            },
            {
                stepNumber: 2,
                description: 'Calculate work done dW by external force in moving the charge by small displacement dx towards O.',
                mathExpression: 'dW = F_ext · dx = -F · dx = -(1 / (4πε₀)) · (q / x²) · dx',
                reasoning: 'External force F_ext = -F balances electrostatic repulsion; dx is directed inward (opposite to x).'
            },
            {
                stepNumber: 3,
                description: 'Integrate total work from infinity to distance r.',
                mathExpression: 'W = - ∫_{infinity}^{r} (q / (4πε₀ · x²)) dx = -(q / (4πε₀)) · [ -1/x ]_infinity^r',
                reasoning: 'Standard integral ∫ x⁻² dx = -x⁻¹.'
            },
            {
                stepNumber: 4,
                description: 'Evaluate definite integral limits.',
                mathExpression: 'W = (q / (4πε₀)) · [ 1/r - 1/infinity ] = q / (4πε₀ · r)',
                reasoning: '1 / infinity = 0.'
            }
        ],
        finalFormula: 'V = q / (4πε₀ · r)',
        unit: 'V (Volts) or J/C',
        commonMistakes: [
            'Mishandling the negative signs in the integration and displacement direction.',
            'Confusing scalar potential V (proportional to 1/r) with vector field E (proportional to 1/r²).'
        ]
    },
    {
        id: 'phy-der-08',
        chapterId: 'physics-1-2',
        title: 'Capacitance of a parallel plate capacitor with a dielectric slab of thickness t',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Parallel conducting plates of area A separated by distance d with surface charge densities +σ and -σ. Dielectric slab of thickness t < d and dielectric constant K placed between plates. Electric field E₀ in air gaps of width (d - t), and reduced field E = E₀ / K inside the dielectric.',
        assumptions: [
            'Plates have area A separated by distance d, with edge effects neglected (A >> d²).',
            'Dielectric slab of thickness t < d and constant K is inserted parallel to plates.'
        ],
        startingFormula: 'C = Q / V, where V = ∫ E · dl',
        steps: [
            {
                stepNumber: 1,
                description: 'State electric field in the vacuum/air region of thickness (d - t).',
                mathExpression: 'E₀ = σ / ε₀ = Q / (ε₀ · A)',
                reasoning: 'Field between oppositely charged infinite parallel conducting plates.'
            },
            {
                stepNumber: 2,
                description: 'State electric field inside the dielectric slab of thickness t.',
                mathExpression: 'E = E₀ / K = Q / (K · ε₀ · A)',
                reasoning: 'Dielectric polarization creates an internal counter-field, attenuating net field by factor K.'
            },
            {
                stepNumber: 3,
                description: 'Compute potential difference V between the plates by summing potential drops across air and dielectric regions.',
                mathExpression: 'V = E₀ · (d - t) + E · t = E₀ · (d - t) + (E₀ / K) · t = E₀ · [ (d - t) + t / K ]',
                reasoning: 'Potential difference is line integral of electric field along the plate separation.'
            },
            {
                stepNumber: 4,
                description: 'Substitute E₀ = Q / (ε₀ · A).',
                mathExpression: 'V = [ Q / (ε₀ · A) ] · [ (d - t) + t / K ]',
                reasoning: 'Express potential in terms of free plate charge Q.'
            },
            {
                stepNumber: 5,
                description: 'Calculate capacitance C = Q / V.',
                mathExpression: 'C = Q / V = (ε₀ · A) / [ (d - t) + t / K ]',
                reasoning: 'Divide charge Q by potential difference V.'
            }
        ],
        finalFormula: 'C = (ε₀ · A) / [ d - t · (1 - 1/K) ]',
        unit: 'F (Farads)',
        commonMistakes: [
            'Forgetting that when t = d (slab fills entire gap), C simplifies to K · ε₀ · A / d.',
            'Writing C = ε₀ · A / (d - t + K · t) instead of t/K.'
        ]
    },
    {
        id: 'phy-der-09',
        chapterId: 'physics-1-2',
        title: 'Energy stored in a charged capacitor and electrostatic energy density',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Parallel plate capacitor being charged. At intermediate time, charge on plates is +q and -q with potential difference V\' = q/C. Additional small charge dq transferred from negative to positive plate.',
        assumptions: [
            'Capacitor of capacitance C is charged from 0 to total charge Q.',
            'Work done in transferring charge is stored as electrostatic potential energy.'
        ],
        startingFormula: 'dW = V\' · dq = (q / C) · dq',
        steps: [
            {
                stepNumber: 1,
                description: 'Express instantaneous potential difference V\' when plate charge is q.',
                mathExpression: 'V\' = q / C',
                reasoning: 'By definition of capacitance C = q / V\'.'
            },
            {
                stepNumber: 2,
                description: 'Calculate small work dW required to transfer increment dq against potential difference V\'.',
                mathExpression: 'dW = V\' · dq = (q / C) · dq',
                reasoning: 'Work done to move charge dq through potential difference V\'.'
            },
            {
                stepNumber: 3,
                description: 'Integrate total work done from q = 0 to q = Q.',
                mathExpression: 'U = ∫_{0}^{Q} (q / C) dq = (1 / C) · [ q² / 2 ]_0^Q = Q² / (2 · C)',
                reasoning: 'Integral of q dq is q² / 2.'
            },
            {
                stepNumber: 4,
                description: 'Rewrite in alternate forms using Q = CV.',
                mathExpression: 'U = Q² / (2 · C) = 1/2 · C · V² = 1/2 · Q · V',
                reasoning: 'Substitute Q = CV or C = Q/V.'
            },
            {
                stepNumber: 5,
                description: 'Derive electrostatic energy density u in the electric field between plates.',
                mathExpression: 'u = U / Volume = (1/2 · C · V²) / (A · d) = [ 1/2 · (ε₀ · A / d) · (E · d)² ] / (A · d) = 1/2 · ε₀ · E²',
                reasoning: 'Substitute C = ε₀ · A/d, V = E · d, and volume = A · d.'
            }
        ],
        finalFormula: 'U = 1/2 · C · V², and energy density u = 1/2 · ε₀ · E²',
        unit: 'J (Joules) for U, and J/m³ for u',
        commonMistakes: [
            'Writing U = C · V² (missing the factor of 1/2).',
            'Confusing total stored energy U with energy density u.'
        ]
    },
    // Chapter 3: Current Electricity
    {
        id: 'phy-der-10',
        chapterId: 'physics-1-3',
        title: 'Drift velocity and deduction of Ohm’s law',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Cylindrical metallic conductor of length l and cross-sectional area A subjected to electric field E = V/l. Free electrons drifting opposite to E with average drift speed vd.',
        assumptions: [
            'Conductor has electron density n (free electrons per unit volume).',
            'Electrons experience acceleration between collisions with average relaxation time τ.'
        ],
        startingFormula: 'vd = -e · E · τ / m, and I = dq / dt',
        steps: [
            {
                stepNumber: 1,
                description: 'Determine acceleration a of electron of mass m and charge -e in electric field E.',
                mathExpression: 'a = F / m = -e · E / m',
                reasoning: 'Newton’s second law with electrostatic force F = -eE.'
            },
            {
                stepNumber: 2,
                description: 'Average velocity over random thermal velocities u_i with zero net thermal drift.',
                mathExpression: 'vd = (sum u_i) / N + a · τ = 0 + (-e · E · τ / m) = - (e · E · τ) / m',
                reasoning: 'Random thermal velocity average is zero in all directions; τ is mean relaxation time.'
            },
            {
                stepNumber: 3,
                description: 'Calculate total charge dq crossing area A in time dt.',
                mathExpression: 'Volume = A · (vd · dt) => dq = n · e · Volume = n · e · A · vd · dt',
                reasoning: 'Number of electrons in cylinder of length vd · dt is n · A · vd · dt.'
            },
            {
                stepNumber: 4,
                description: 'Obtain electric current I.',
                mathExpression: 'I = dq / dt = n · e · A · vd',
                reasoning: 'Definition of current as rate of charge flow.'
            },
            {
                stepNumber: 5,
                description: 'Substitute vd = (e · E · τ) / m and E = V / l.',
                mathExpression: 'I = n · e · A · [ (e · (V / l) · τ) / m ] = [ (n · e² · τ · A) / (m · l) ] · V',
                reasoning: 'Electric field in conductor of length l with voltage V is E = V/l.'
            },
            {
                stepNumber: 6,
                description: 'Deduce Ohm’s law V = I · R and find resistance R and resistivity rho.',
                mathExpression: 'V / I = (m · l) / (n · e² · τ · A) = R => rho = m / (n · e² · τ)',
                reasoning: 'At constant temperature, m, n, e, τ are constant, so V/I is a constant resistance R.'
            }
        ],
        finalFormula: 'R = (m · l) / (n · e² · τ · A), and rho = m / (n · e² · τ)',
        unit: 'Ohm for R, and Ohm·m for rho',
        commonMistakes: [
            'Missing the charge squared e² in the numerator of current and denominator of resistance.',
            'Omitting the negative sign in the vector expression vd = -(eE τ)/m.'
        ]
    },
    {
        id: 'phy-der-11',
        chapterId: 'physics-1-3',
        title: 'Balanced Wheatstone bridge condition using Kirchhoff’s rules',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Bridge circuit with 4 resistors P, Q, R, S arranged in a quadrilateral ABCD. Galvanometer G between B and D with switch K1. Battery E and key K2 between A and C. Current I splits into I1 (through P) and I2 (through R). Galvanometer current Ig.',
        assumptions: [
            'Resistors P, Q, R, S form a closed network.',
            'Balance condition corresponds to null deflection in galvanometer (Ig = 0).'
        ],
        startingFormula: 'Kirchhoff’s Loop Rule: sum Δ V = 0 around any closed mesh',
        steps: [
            {
                stepNumber: 1,
                description: 'Apply Kirchhoff’s Voltage Law (KVL) to closed loop ABDA.',
                mathExpression: '-I1 · P - Ig · G + I2 · R = 0',
                reasoning: 'Following mesh in clockwise order ABDA.'
            },
            {
                stepNumber: 2,
                description: 'Apply KVL to closed loop BCDB.',
                mathExpression: '-(I1 - Ig) · Q + (I2 + Ig) · S + Ig · G = 0',
                reasoning: 'Following mesh in clockwise order BCDB with currents at junction B and D.'
            },
            {
                stepNumber: 3,
                description: 'Impose the bridge balance condition Ig = 0.',
                mathExpression: 'Loop 1: -I1 · P + I2 · R = 0 => I1 · P = I2 · R',
                reasoning: 'Potential at B equals potential at D (V_B = V_D), so no current flows through galvanometer.'
            },
            {
                stepNumber: 4,
                description: 'Impose Ig = 0 on Loop 2.',
                mathExpression: 'Loop 2: -I1 · Q + I2 · S = 0 => I1 · Q = I2 · S',
                reasoning: 'Galvanometer current Ig vanishes in both terms.'
            },
            {
                stepNumber: 5,
                description: 'Divide equation (1) by equation (2).',
                mathExpression: '(I1 · P) / (I1 · Q) = (I2 · R) / (I2 · S) => P / Q = R / S',
                reasoning: 'Currents I1 and I2 cancel out completely.'
            }
        ],
        finalFormula: 'P / Q = R / S',
        unit: 'Dimensionless ratio',
        commonMistakes: [
            'Applying KVL with inconsistent sign conventions across loops.',
            'Forgetting to state that V_B = V_D at the null point.'
        ]
    },
    // Chapter 4: Moving Charges and Magnetism
    {
        id: 'phy-der-12',
        chapterId: 'physics-2-1',
        title: 'Magnetic field on the axis of a circular current loop using Biot-Savart law',
        marksWeightage: 5,
        diagramRequired: true,
        diagramDescription: 'Circular loop of radius R carrying current I placed in y-z plane. Point P on x-axis at distance x from center O. Current elements dl at top (C) and bottom (D). Element distance s = √(R² + x²). Field dB resolves into dB cos φ (perpendicular to axis, cancels out) and dB sin φ (along axis, adds up).',
        assumptions: [
            'Circular loop of radius R carries steady current I.',
            'Point P is located on the axis of the loop at distance x from center O.'
        ],
        startingFormula: 'dB = (μ₀ / (4 · π)) · (I · dl x r_hat) / s²',
        steps: [
            {
                stepNumber: 1,
                description: 'Calculate magnetic field magnitude dB produced by current element dl.',
                mathExpression: 'dB = (μ₀ / (4 · π)) · (I · dl · sin(90 deg)) / s² = (μ₀ / (4 · π)) · (I · dl) / (R² + x²)',
                reasoning: 'Element dl is perpendicular to position vector s at all points around the loop.'
            },
            {
                stepNumber: 2,
                description: 'Resolve dB into components parallel (dB_x) and perpendicular (dB_perp) to loop axis.',
                mathExpression: 'dB_x = dB · sin φ, and dB_perp = dB · cos φ',
                reasoning: 'Angle between dB and vertical axis is φ, where sin φ = R / s = R / √(R² + x²).'
            },
            {
                stepNumber: 3,
                description: 'Explain cancellation of perpendicular components by diametrically opposite elements.',
                mathExpression: '∮ dB_perp = ∮ dB · cos φ = 0',
                reasoning: 'For every element dl at top, there is a symmetric element dl at bottom whose perpendicular components cancel.'
            },
            {
                stepNumber: 4,
                description: 'Integrate axial components dB_x around the entire perimeter 2 · π · R.',
                mathExpression: 'B_x = ∮ dB · sin φ = ∮ [ (μ₀ · I · dl) / (4 · π · s²) ] · (R / s) = [ (μ₀ · I · R) / (4 · π · s³) ] · ∮ dl',
                reasoning: 'All terms except dl are constant around the loop perimeter.'
            },
            {
                stepNumber: 5,
                description: 'Substitute ∮ dl = 2 · π · R and s = (R² + x²)^(1/2).',
                mathExpression: 'B_x = [ (μ₀ · I · R) / (4 · π · (R² + x²)^(3/2)) ] · (2 · π · R) = (μ₀ · I · R²) / [ 2 · (R² + x²)^(3/2) ]',
                reasoning: 'Multiplying 2 · π · R by R gives 2 · π · R²; 2 · π cancels with 4 · π leaving 2 in denominator.'
            },
            {
                stepNumber: 6,
                description: 'For a coil of N turns, multiply by N.',
                mathExpression: 'B = (μ₀ · N · I · R²) / [ 2 · (R² + x²)^(3/2) ]',
                reasoning: 'Field contributions of N tightly wound identical turns add scalar-wise.'
            }
        ],
        finalFormula: 'B = (μ₀ · N · I · R²) / [ 2 · (R² + x²)^(3/2) ]',
        unit: 'T (Tesla)',
        commonMistakes: [
            'Writing s² instead of s³ when incorporating sin φ = R/s.',
            'Forgetting that at the center (x = 0), formula reduces to B = μ₀ · N · I / (2 · R).'
        ]
    },
    {
        id: 'phy-der-13',
        chapterId: 'physics-2-1',
        title: 'Force between two parallel infinitely long current-carrying conductors',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Two straight parallel conductors 1 and 2 separated by distance d carrying currents I1 and I2 in the same direction. Magnetic field B1 produced by conductor 1 at conductor 2 points into plane. Magnetic force F21 on conductor 2 points towards conductor 1.',
        assumptions: [
            'Conductors are infinitely long, straight, parallel, and separated by distance d in vacuum.'
        ],
        startingFormula: 'B1 = (μ₀ · I1) / (2 · π · d), and F = I · (L x B)',
        steps: [
            {
                stepNumber: 1,
                description: 'Calculate magnetic field B1 produced by conductor 1 at the position of conductor 2.',
                mathExpression: 'B1 = (μ₀ · I1) / (2 · π · d) [directed perpendicularly into the plane by right hand grip rule]',
                reasoning: 'Ampere’s law field for an infinite straight current.'
            },
            {
                stepNumber: 2,
                description: 'Determine magnetic force F21 acting on length L of conductor 2 carrying current I2.',
                mathExpression: 'F21 = I2 · L · B1 · sin(90 deg) = I2 · L · [ (μ₀ · I1) / (2 · π · d) ]',
                reasoning: 'Conductor 2 is perpendicular to magnetic field B1, so angle is 90 degrees.'
            },
            {
                stepNumber: 3,
                description: 'Find force per unit length f = F21 / L.',
                mathExpression: 'f = F21 / L = (μ₀ · I1 · I2) / (2 · π · d)',
                reasoning: 'Divide total force by length L.'
            },
            {
                stepNumber: 4,
                description: 'Apply Fleming’s left-hand rule to find force direction.',
                mathExpression: 'F21 is directed towards conductor 1 (attraction for parallel currents; repulsion for antiparallel)',
                reasoning: 'Fleming’s Left-Hand rule determines force vector direction.'
            },
            {
                stepNumber: 5,
                description: 'State the official CBSE definition of one ampere.',
                mathExpression: 'If I1 = I2 = 1 A, d = 1 m, then f = (4 · π · 10⁻⁷ · 1 · 1) / (2 · π · 1) = 2 · 10⁻⁷ N/m',
                reasoning: 'One ampere is that constant current which, maintained in two straight parallel conductors of infinite length and negligible cross-section placed 1 meter apart in vacuum, produces a force of 2 x 10⁻⁷ N per meter length.'
            }
        ],
        finalFormula: 'f = (μ₀ · I1 · I2) / (2 · π · d)',
        unit: 'N/m',
        commonMistakes: [
            'Thinking like currents repel (like charges repel, but like currents attract!).',
            'Omitting the formal standard definition of the ampere in the 3-mark question.'
        ]
    },
    // Chapter 7: Alternating Current
    {
        id: 'phy-der-14',
        chapterId: 'physics-2-4',
        title: 'Impedance and phase angle in a series LCR alternating current circuit (phasor method)',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Phasor diagram with current I along reference x-axis. Resistor voltage VR in phase with I. Inductor voltage VL leads I by π/2. Capacitor voltage VC lags I by π/2. Resultant reactive voltage (VL - VC) perpendicular to VR. Total voltage V is hypotenuse with phase angle φ.',
        assumptions: [
            'Series circuit consists of resistor R, inductor L, and capacitor C connected to sinusoidal source V = V₀ sin(ω · t).',
            'Assumed case: VL > VC (inductive net reactance).'
        ],
        startingFormula: 'V_R = I · R, V_L = I · X_L, V_C = I · X_C',
        steps: [
            {
                stepNumber: 1,
                description: 'Express peak voltages across individual components in terms of current amplitude I₀.',
                mathExpression: 'V_R0 = I₀ · R, V_L0 = I₀ · X_L = I₀ · (ω · L), V_C0 = I₀ · X_C = I₀ / (ω · C)',
                reasoning: 'Definitions of inductive reactance XL and capacitive reactance XC.'
            },
            {
                stepNumber: 2,
                description: 'Combine opposing reactive voltage phasors VL0 and VC0.',
                mathExpression: 'V_net_reactive = V_L0 - V_C0 = I₀ · (X_L - X_C)',
                reasoning: 'VL and VC are 180 degrees out of phase, so their net phasor is their algebraic difference.'
            },
            {
                stepNumber: 3,
                description: 'Apply Pythagoras theorem on the voltage phasor triangle to find source voltage amplitude V₀.',
                mathExpression: 'V₀² = V_R0² + (V_L0 - V_C0)² = (I₀ · R)² + [ I₀ · (X_L - X_C) ]² = I₀² · [ R² + (X_L - X_C)² ]',
                reasoning: 'VR is perpendicular to (VL - VC).'
            },
            {
                stepNumber: 4,
                description: 'Solve for impedance Z = V₀ / I₀.',
                mathExpression: 'Z = V₀ / I₀ = √( R² + (X_L - X_C)² ) = √( R² + (ω · L - 1 / (ω · C))² )',
                reasoning: 'Impedance represents total effective opposition to AC flow.'
            },
            {
                stepNumber: 5,
                description: 'Derive phase angle φ between voltage and current.',
                mathExpression: 'tan φ = (V_L0 - V_C0) / V_R0 = (X_L - X_C) / R',
                reasoning: 'Tangent of angle in the phasor impedance triangle.'
            },
            {
                stepNumber: 6,
                description: 'Deduce resonant frequency where impedance is minimum (Z = R).',
                mathExpression: 'X_L = X_C => ωᵣ · L = 1 / (ωᵣ · C) => ωᵣ = 1 / √(L · C) => f_r = 1 / (2 · π · √(L · C))',
                reasoning: 'At resonance, reactive opposition cancels out, power factor becomes unity, and current amplitude peaks.'
            }
        ],
        finalFormula: 'Z = √( R² + (X_L - X_C)² ), and f_r = 1 / (2 · π · √(L · C))',
        unit: 'Ohm',
        commonMistakes: [
            'Simply adding voltages algebraically (VR + VL + VC) instead of vector/phasor addition.',
            'Forgetting that current leads voltage when XC > XL, and lags when XL > XC.'
        ]
    },
    // Chapter 9: Ray Optics and Optical Instruments
    {
        id: 'phy-der-15',
        chapterId: 'physics-3-2',
        title: 'Refraction at a convex spherical surface separating two media',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Convex spherical refracting surface of radius R separating rarer medium n1 from denser medium n2. Point object O on principal axis. Ray incident at point N at angle i, refracted at angle r meeting principal axis at image point I. Center of curvature C. Normal passes through C.',
        assumptions: [
            'Aperture of the spherical surface is small.',
            'Rays are paraxial (incident at small angles with principal axis, so sin θ ≈ tan θ ≈ θ).'
        ],
        startingFormula: 'Snell’s Law: n1 · sin i = n2 · sin r => n1 · i ≈ n2 · r',
        steps: [
            {
                stepNumber: 1,
                description: 'Let angles made by incident ray, refracted ray, and normal with principal axis be α, β, and γ respectively.',
                mathExpression: 'tan α ≈ α = NM / OM, tan β ≈ β = NM / MI, tan γ ≈ γ = NM / MC',
                reasoning: 'Paraxial ray approximation where M is foot of perpendicular from N to axis, close to pole P.'
            },
            {
                stepNumber: 2,
                description: 'Relate exterior angles of triangles NOC and NIC.',
                mathExpression: 'Triangle NOC: i = α + γ; Triangle NIC: γ = r + β => r = γ - β',
                reasoning: 'Exterior angle of a triangle equals sum of interior opposite angles.'
            },
            {
                stepNumber: 3,
                description: 'Substitute into small-angle Snell’s law: n1 · i = n2 · r.',
                mathExpression: 'n1 · (α + γ) = n2 · (γ - β) => n1 · α + n2 · β = (n2 - n1) · γ',
                reasoning: 'Rearranging terms to group γ.'
            },
            {
                stepNumber: 4,
                description: 'Substitute α = NM / (-u), β = NM / (+v), γ = NM / (+R) using Cartesian sign convention.',
                mathExpression: 'n1 · [ NM / (-u) ] + n2 · [ NM / v ] = (n2 - n1) · [ NM / R ]',
                reasoning: 'Object distance OM = -u (against light), image distance MI = +v (with light), radius MC = +R.'
            },
            {
                stepNumber: 5,
                description: 'Cancel common perpendicular height NM.',
                mathExpression: '-n1 / u + n2 / v = (n2 - n1) / R => n2 / v - n1 / u = (n2 - n1) / R',
                reasoning: 'Final relation connecting object distance, image distance, refractive indices, and radius of curvature.'
            }
        ],
        finalFormula: 'n2 / v - n1 / u = (n2 - n1) / R',
        unit: 'm⁻¹ or dioptres for power',
        commonMistakes: [
            'Confusing the signs of u, v, and R.',
            'Applying the formula when light travels from denser to rarer without interchanging n1 and n2.'
        ]
    },
    {
        id: 'phy-der-16',
        chapterId: 'physics-3-2',
        title: 'Lensmaker’s formula for a thin convex lens',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Thin convex lens of refractive index n2 in medium n1 with radii of curvature R1 and R2. Point object O forms virtual intermediate image I1 at first surface; I1 acts as virtual object for second surface, forming final real image I.',
        assumptions: [
            'Lens is thin (thickness t -> 0).',
            'Aperture of lens is small and paraxial ray conditions hold.'
        ],
        startingFormula: 'n2 / v - n1 / u = (n2 - n1) / R',
        steps: [
            {
                stepNumber: 1,
                description: 'Apply refraction formula at the first spherical surface ABC (radius R1).',
                mathExpression: 'n2 / v1 - n1 / u = (n2 - n1) / R1 ... (1)',
                reasoning: 'Light travels from medium n1 into lens n2, forming intermediate image at v1.'
            },
            {
                stepNumber: 2,
                description: 'Apply refraction formula at the second spherical surface ADC (radius R2).',
                mathExpression: 'n1 / v - n2 / v1 = (n1 - n2) / R2 = -(n2 - n1) / R2 ... (2)',
                reasoning: 'Light travels from lens n2 into medium n1; intermediate image at v1 acts as virtual object.'
            },
            {
                stepNumber: 3,
                description: 'Add equations (1) and (2) for a thin lens.',
                mathExpression: '[ n2/v1 - n1/u ] + [ n1/v - n2/v1 ] = (n2 - n1) / R1 - (n2 - n1) / R2',
                reasoning: 'Intermediate term n2 / v1 cancels out identically.'
            },
            {
                stepNumber: 4,
                description: 'Simplify the left and right hand sides.',
                mathExpression: 'n1 · [ 1/v - 1/u ] = (n2 - n1) · [ 1/R1 - 1/R2 ]',
                reasoning: 'Factoring out n1 on left and (n2 - n1) on right.'
            },
            {
                stepNumber: 5,
                description: 'Divide both sides by n1 and apply definition of focal length 1/v - 1/u = 1/f.',
                mathExpression: '1/f = (n2 / n1 - 1) · [ 1/R1 - 1/R2 ] = (n - 1) · [ 1/R1 - 1/R2 ]',
                reasoning: 'When object is at infinity (u = -inf), image forms at focus (v = f).'
            }
        ],
        finalFormula: '1/f = (n - 1) · [ 1/R1 - 1/R2 ]',
        unit: 'm⁻¹ or dioptres',
        commonMistakes: [
            'Forgetting that for a biconvex lens, R1 is positive and R2 is negative, making (1/R1 - 1/R2) additive.',
            'Forgetting to change refractive index ratio when lens is immersed in water: n = n_glass / n_water.'
        ]
    },
    {
        id: 'phy-der-17',
        chapterId: 'physics-3-2',
        title: 'Refraction through a triangular glass prism and prism formula',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Principal section ABC of triangular prism with refracting angle A. Monochromatic ray incident at angle i1 on face AB, refracted at angle r1, incident on face AC at angle r2, and emergent at angle i2 (or e). Total angle of deviation delta. At minimum deviation Dm, ray passes symmetrically parallel to base.',
        assumptions: [
            'Prism has refracting angle A and refractive index n.',
            'At minimum deviation (delta = Dm), angle of incidence equals angle of emergence (i1 = i2 = i), and r1 = r2 = r.'
        ],
        startingFormula: 'delta = (i1 + i2) - A, and A = r1 + r2',
        steps: [
            {
                stepNumber: 1,
                description: 'From quadrilateral AQNR, opposite angles A and QNR sum to 180 degrees.',
                mathExpression: 'angle A + angle QNR = 180 deg',
                reasoning: 'Normals QN and RN are perpendicular to faces AB and AC (90 + 90 = 180).'
            },
            {
                stepNumber: 2,
                description: 'From triangle QNR, the angles sum to 180 degrees.',
                mathExpression: 'r1 + r2 + angle QNR = 180 deg => r1 + r2 = angle A ... (1)',
                reasoning: 'Comparing with equation from step 1.'
            },
            {
                stepNumber: 3,
                description: 'Calculate deviation delta as sum of deviations at two refracting faces.',
                mathExpression: 'delta = (i1 - r1) + (i2 - r2) = (i1 + i2) - (r1 + r2) = i1 + i2 - A ... (2)',
                reasoning: 'Deviation is exterior angle of triangle formed by extending incident and emergent rays.'
            },
            {
                stepNumber: 4,
                description: 'Apply the condition of minimum deviation delta = Dm.',
                mathExpression: 'At delta = Dm: i1 = i2 = i, and r1 = r2 = r',
                reasoning: 'Symmetry requires ray to traverse prism parallel to base at minimum deviation.'
            },
            {
                stepNumber: 5,
                description: 'Express r and i in terms of A and Dm.',
                mathExpression: '2 · r = A => r = A / 2; and Dm = 2 · i - A => i = (A + Dm) / 2',
                reasoning: 'Substitute symmetry conditions into equations (1) and (2).'
            },
            {
                stepNumber: 6,
                description: 'Apply Snell’s law at first face: n = sin i / sin r.',
                mathExpression: 'n = sin( (A + Dm) / 2 ) / sin( A / 2 )',
                reasoning: 'Substitute expressions for i and r.'
            }
        ],
        finalFormula: 'n = sin( (A + Dm) / 2 ) / sin( A / 2 )',
        unit: 'Dimensionless refractive index',
        commonMistakes: [
            'Applying thin prism approximation n ≈ 1 + Dm/A to standard 60-degree prisms.',
            'Forgetting that r = A/2 only holds strictly at minimum deviation.'
        ]
    },
    // Chapter 10: Wave Optics
    {
        id: 'phy-der-18',
        chapterId: 'physics-3-3',
        title: 'Proof of the laws of reflection using Huygens’ wave principle',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Plane wave front AB incident on reflecting plane surface XY at angle i. Point A touches XY first. Secondary wavelet from A spreads into radius v · t while incident wave front reaches C with BC = v · t. Tangent CD drawn from C to the wavelet forms reflected wave front CD.',
        assumptions: [
            'Light travels with uniform speed v in the medium.',
            'Every point on the wave front acts as a secondary source emitting spherical wavelets.'
        ],
        startingFormula: 'BC = v · t, and AD = v · t',
        steps: [
            {
                stepNumber: 1,
                description: 'Let plane wave front AB be incident on surface XY at angle i.',
                mathExpression: 'In right triangle ABC: angle BAC = 90 deg, angle BCA = 90 - i => angle CAB = i',
                reasoning: 'Angle of wave front with surface equals angle of incidence i.'
            },
            {
                stepNumber: 2,
                description: 'Determine distance travelled by edge B to reach point C on mirror in time t.',
                mathExpression: 'BC = v · t',
                reasoning: 'Distance = speed · time.'
            },
            {
                stepNumber: 3,
                description: 'Determine distance travelled by reflected secondary wavelet from point A in time t.',
                mathExpression: 'AD = v · t',
                reasoning: 'Secondary wavelet spreads into same medium with speed v.'
            },
            {
                stepNumber: 4,
                description: 'Compare right triangles ABC and ADC.',
                mathExpression: '1. BC = AD = v · t; 2. AC = AC (common hypotenuse); 3. angle ABC = angle ADC = 90 deg',
                reasoning: 'Wave fronts are perpendicular to rays.'
            },
            {
                stepNumber: 5,
                description: 'Prove congruence of triangles ABC and ADC by RHS criteria.',
                mathExpression: 'Triangle ABC cong Triangle ADC (by RHS congruence) => angle BAC = angle DCA',
                reasoning: 'Corresponding parts of congruent triangles (CPCTC) are equal.'
            },
            {
                stepNumber: 6,
                description: 'Relate to angle of incidence i and angle of reflection r.',
                mathExpression: 'angle BAC = i, and angle DCA = r => i = r',
                reasoning: 'First law of reflection proved: angle of incidence equals angle of reflection.'
            }
        ],
        finalFormula: 'i = r (Angle of incidence = Angle of reflection)',
        unit: 'Degrees or Radians',
        commonMistakes: [
            'Failing to specify that BC = AD = v · t in the geometric proof.',
            'Not stating the second law: incident wave front, reflected wave front, and normal all lie in the same plane.'
        ]
    },
    {
        id: 'phy-der-19',
        chapterId: 'physics-3-3',
        title: 'Proof of the laws of refraction (Snell’s law) using Huygens’ wave principle',
        marksWeightage: 3,
        diagramRequired: true,
        diagramDescription: 'Plane wave front AB incident at angle i on interface XY separating medium 1 (speed v1) from medium 2 (speed v2). In time t, B travels to C in medium 1 (BC = v1 · t), while secondary wavelet from A travels to E in medium 2 (AE = v2 · t). CE is refracted wave front at angle r.',
        assumptions: [
            'Medium 1 has speed v1 and refractive index n1; medium 2 has speed v2 and refractive index n2.',
            'v1 > v2 for optically denser second medium.'
        ],
        startingFormula: 'BC = v1 · t, and AE = v2 · t',
        steps: [
            {
                stepNumber: 1,
                description: 'From right triangle ABC in medium 1, express sin i.',
                mathExpression: 'sin i = BC / AC = (v1 · t) / AC',
                reasoning: 'Sine of angle of incidence in right-angled triangle ABC.'
            },
            {
                stepNumber: 2,
                description: 'From right triangle AEC in medium 2, express sin r.',
                mathExpression: 'sin r = AE / AC = (v2 · t) / AC',
                reasoning: 'Sine of angle of refraction in right-angled triangle AEC.'
            },
            {
                stepNumber: 3,
                description: 'Divide sin i by sin r.',
                mathExpression: 'sin i / sin r = [ (v1 · t) / AC ] / [ (v2 · t) / AC ] = v1 / v2',
                reasoning: 'Common terms t and AC cancel out.'
            },
            {
                stepNumber: 4,
                description: 'Express ratio of speeds in terms of absolute refractive indices.',
                mathExpression: 'v1 / v2 = (c / n1) / (c / n2) = n2 / n1 = n21',
                reasoning: 'By definition of refractive index: n1 = c/v1 and n2 = c/v2.'
            },
            {
                stepNumber: 5,
                description: 'Conclude Snell’s law.',
                mathExpression: 'sin i / sin r = n2 / n1 => n1 · sin i = n2 · sin r',
                reasoning: 'Snell’s law of refraction rigorously derived from wave theory.'
            }
        ],
        finalFormula: 'sin i / sin r = v1 / v2 = n2 / n1',
        unit: 'Dimensionless ratio',
        commonMistakes: [
            'Confusing the speeds: writing v2/v1 instead of v1/v2.',
            'Forgetting that frequency remains constant during refraction (nu1 = nu2) while wavelength changes: lambda1/lambda2 = v1/v2.'
        ]
    },
    // Chapter 12: Atoms
    {
        id: 'phy-der-20',
        chapterId: 'physics-4-2',
        title: 'Bohr’s derivation of orbital radius and total energy of electron in hydrogen atom',
        marksWeightage: 5,
        diagramRequired: true,
        diagramDescription: 'Bohr hydrogen atom model: nucleus with charge +e at center. Electron of mass m and charge -e revolving in stationary circular orbit of radius r with speed v. Centripetal force supplied by electrostatic Coulomb attraction.',
        assumptions: [
            'Electron moves in circular non-radiating orbits around stationary nucleus (+e).',
            'Bohr quantization postulate: orbital angular momentum L = m · v · r = n · h / (2 · π), where n = 1, 2, 3...'
        ],
        startingFormula: 'm · v² / r = (1 / (4πε₀)) · (e² / r²)',
        steps: [
            {
                stepNumber: 1,
                description: 'Equate electrostatic attraction to centripetal force.',
                mathExpression: 'm · v² / r = e² / (4πε₀ · r²) => m · v² = e² / (4πε₀ · r) ... (1)',
                reasoning: 'Coulomb force provides necessary centripetal force for stable circular orbit.'
            },
            {
                stepNumber: 2,
                description: 'Express orbital velocity v from Bohr’s angular momentum quantization.',
                mathExpression: 'm · v · r = n · h / (2 · π) => v = (n · h) / (2 · π · m · r) ... (2)',
                reasoning: 'Bohr’s second postulate for stationary states.'
            },
            {
                stepNumber: 3,
                description: 'Substitute equation (2) for v into equation (1).',
                mathExpression: 'm · [ (n · h) / (2 · π · m · r) ]² = e² / (4πε₀ · r) => (m · n² · h²) / (4 · π² · m² · r²) = e² / (4πε₀ · r)',
                reasoning: 'Squaring the velocity term and equating.'
            },
            {
                stepNumber: 4,
                description: 'Solve for orbital radius rₙ.',
                mathExpression: 'rₙ = (ε₀ · n² · h²) / (π · m · e²) = 0.529 · n² Angstroms',
                reasoning: 'Orbital radius is proportional to principal quantum number squared (rₙ proportional to n²).'
            },
            {
                stepNumber: 5,
                description: 'Determine kinetic energy K of the electron.',
                mathExpression: 'K = 1/2 · m · v² = e² / (8πε₀ · r)',
                reasoning: 'From equation (1): 1/2 · m · v² = 1/2 · e² / (4πε₀ · r).'
            },
            {
                stepNumber: 6,
                description: 'Determine electrostatic potential energy U.',
                mathExpression: 'U = (1 / (4πε₀)) · [ (+e) · (-e) / r ] = -e² / (4πε₀ · r)',
                reasoning: 'Potential energy between unlike charges is negative.'
            },
            {
                stepNumber: 7,
                description: 'Calculate total mechanical energy E = K + U.',
                mathExpression: 'E = K + U = e² / (8πε₀ · r) - e² / (4πε₀ · r) = -e² / (8πε₀ · r)',
                reasoning: 'Total energy is negative, proving the electron is bound to the nucleus.'
            },
            {
                stepNumber: 8,
                description: 'Substitute rₙ expression into total energy E.',
                mathExpression: 'Eₙ = - [ m · e⁴ ] / [ 8 · ε₀² · n² · h² ] = -13.6 / n² eV',
                reasoning: 'Substituting numerical values of constants m, e, ε₀, h gives -13.6 eV / n².'
            }
        ],
        finalFormula: 'rₙ = (ε₀ · n² · h²) / (π · m · e²), and Eₙ = -13.6 / n² eV',
        unit: 'm for rₙ, and eV for Eₙ',
        commonMistakes: [
            'Missing the negative sign in total energy (must be negative for bound states).',
            'Confusing the relationship: K = -E, and U = 2 · E.'
        ]
    }
];
export const derivationById = (id) => cbsePhysicsDerivations.find(d => d.id === id);
export const derivationsForChapter = (chapterId) => cbsePhysicsDerivations.filter(d => d.chapterId === chapterId);
