/**
 * CBSE Class XII Master Formula Handbook & Dimensional Compendium
 * Subject: Physics (042), Chemistry (043), Mathematics (041)
 * 2026-2027 Blueprint Standard
 * Authentic mathematical equations, SI units, dimensional formulas,
 * variable legends, boundary conditions, and board frequency ratings.
 */

export interface FormulaVariable {
  symbol: string;
  meaning: string;
  siUnit: string;
}

export interface CBSEFormulaItem {
  id: string;
  subjectId: 'physics' | 'chemistry' | 'math';
  chapterId: string;
  chapterName: string;
  name: string;
  latexExpression: string;
  plainTextExpression: string;
  variablesLegend: FormulaVariable[];
  derivedSIUnit: string;
  dimensionalFormula?: string;
  conditionsAndLimitations: string;
  boardFrequency: 'High' | 'Very High' | 'Guaranteed';
}

export const cbseFormulaHandbook: CBSEFormulaItem[] = [
  // ==================== PHYSICS FORMULAS ====================
  // Chapter 1: Electric Charges and Fields
  {
    id: 'f-phy-01',
    subjectId: 'physics',
    chapterId: 'physics-1-1',
    chapterName: 'Electric Charges and Fields',
    name: 'Coulomb\'s Law in Vacuum',
    latexExpression: 'F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}',
    plainTextExpression: 'F = (1 / 4πε₀) · (|q₁ · q₂| / r²)',
    variablesLegend: [
      { symbol: 'F', meaning: 'Electrostatic force between stationary charges', siUnit: 'N (Newton)' },
      { symbol: 'q₁, q₂', meaning: 'Point charges', siUnit: 'C (Coulomb)' },
      { symbol: 'r', meaning: 'Separation distance between charge centers', siUnit: 'm (Meter)' },
      { symbol: 'ε₀', meaning: 'Permittivity of free space = 8.854 × 10⁻¹² C²·N⁻¹·m⁻²', siUnit: 'C²/(N·m²)' }
    ],
    derivedSIUnit: 'N (Newton)',
    dimensionalFormula: '[M · L · T⁻²]',
    conditionsAndLimitations: 'Valid strictly for point charges at rest in electrostatic equilibrium.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-02',
    subjectId: 'physics',
    chapterId: 'physics-1-1',
    chapterName: 'Electric Charges and Fields',
    name: 'Electric Field on Axial Line of a Dipole',
    latexExpression: 'E_{axial} = \\frac{1}{4\\pi\\varepsilon_0} \\frac{2pr}{(r^2 - a^2)^2} \\approx \\frac{1}{4\\pi\\varepsilon_0} \\frac{2p}{r^3}',
    plainTextExpression: 'E_axial = (1 / 4πε₀) · [2·p·r / (r² - a²)²]  ≈  (1 / 4πε₀) · (2·p / r³)  [for r ≫ a]',
    variablesLegend: [
      { symbol: 'E_{axial}', meaning: 'Electric field on axial line of dipole', siUnit: 'V/m or N/C' },
      { symbol: 'p', meaning: 'Electric dipole moment (p = q · 2a)', siUnit: 'C·m' },
      { symbol: 'r', meaning: 'Distance from center of dipole to axial point', siUnit: 'm' },
      { symbol: '2a', meaning: 'Dipole length (separation between -q and +q)', siUnit: 'm' }
    ],
    derivedSIUnit: 'V/m (Volts per meter) or N/C',
    dimensionalFormula: '[M · L · T⁻³ · A⁻¹]',
    conditionsAndLimitations: 'Short dipole approximation holds when r >> a.',
    boardFrequency: 'Very High'
  },
  {
    id: 'f-phy-03',
    subjectId: 'physics',
    chapterId: 'physics-1-1',
    chapterName: 'Electric Charges and Fields',
    name: 'Gauss\'s Law Flux Integral',
    latexExpression: '\\Phi_E = \\oint_S \\vec{E} \\cdot d\\vec{A} = \\frac{q_{enclosed}}{\\varepsilon_0}',
    plainTextExpression: 'Φ_E = ∮_S E⃗ · dA⃗ = q_enclosed / ε₀',
    variablesLegend: [
      { symbol: 'Φ_E', meaning: 'Net electric flux through closed Gaussian surface', siUnit: 'V·m or N·m²/C' },
      { symbol: 'E⃗', meaning: 'Electric field vector at surface element dA', siUnit: 'V/m' },
      { symbol: 'q_{encl}', meaning: 'Total net algebraic charge enclosed', siUnit: 'C' },
      { symbol: 'ε₀', meaning: 'Permittivity of vacuum (8.854 × 10⁻¹² C²·N⁻¹·m⁻²)', siUnit: 'C²/(N·m²)' }
    ],
    derivedSIUnit: 'V m (Volt meter) or N m^2 / C',
    dimensionalFormula: '[M · L³ · T⁻³ · A⁻¹]',
    conditionsAndLimitations: 'Valid for any closed arbitrary Gaussian surface enclosing charge.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-04',
    subjectId: 'physics',
    chapterId: 'physics-1-2',
    chapterName: 'Electrostatic Potential and Capacitance',
    name: 'Capacitance of Parallel Plate Capacitor with Dielectric',
    latexExpression: 'C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}}',
    plainTextExpression: 'C = (ε₀ · A) / (d - t + t/K)',
    variablesLegend: [
      { symbol: 'C', meaning: 'Capacitance with dielectric slab of thickness t', siUnit: 'F (Farad)' },
      { symbol: 'A', meaning: 'Area of each conducting plate', siUnit: 'm²' },
      { symbol: 'd', meaning: 'Plate separation distance', siUnit: 'm' },
      { symbol: 't', meaning: 'Dielectric slab thickness (t ≤ d)', siUnit: 'm' },
      { symbol: 'K', meaning: 'Dielectric constant (relative permittivity ε_r)', siUnit: 'Dimensionless' }
    ],
    derivedSIUnit: 'F (Farad) = C/V',
    dimensionalFormula: '[M⁻¹ · L⁻² · T⁴ · A²]',
    conditionsAndLimitations: 'Electric fringe fields at plate boundaries neglected (A >> d).',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-05',
    subjectId: 'physics',
    chapterId: 'physics-1-3',
    chapterName: 'Current Electricity',
    name: 'Drift Velocity and Relaxation Time',
    latexExpression: 'v_d = -\\frac{e E \\tau}{m}',
    plainTextExpression: 'v_d = - (e · E · τ) / m',
    variablesLegend: [
      { symbol: 'v_d', meaning: 'Average drift velocity of conduction electrons', siUnit: 'm/s' },
      { symbol: 'e', meaning: 'Elementary electron charge = 1.6 × 10⁻¹⁹ C', siUnit: 'C' },
      { symbol: 'E', meaning: 'Applied electric field in conductor', siUnit: 'V/m' },
      { symbol: 'τ', meaning: 'Mean relaxation time between collisions', siUnit: 's (Seconds)' },
      { symbol: 'm', meaning: 'Rest mass of electron = 9.11 × 10⁻³¹ kg', siUnit: 'kg' }
    ],
    derivedSIUnit: 'm/s (Meters per second)',
    dimensionalFormula: '[L · T⁻¹]',
    conditionsAndLimitations: 'Valid for steady thermalized electrical conduction in metals.',
    boardFrequency: 'Very High'
  },
  {
    id: 'f-phy-06',
    subjectId: 'physics',
    chapterId: 'physics-2-1',
    chapterName: 'Moving Charges and Magnetism',
    name: 'Biot-Savart Law for Current Element',
    latexExpression: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I (d\\vec{l} \\times \\hat{r})}{r^2}',
    plainTextExpression: 'dB = (μ₀ / 4π) · (I · dl · sin θ / r²)',
    variablesLegend: [
      { symbol: 'dB', meaning: 'Magnetic field magnitude from current element', siUnit: 'T (Tesla)' },
      { symbol: 'μ₀', meaning: 'Permeability of vacuum = 4π × 10⁻⁷ T·m/A', siUnit: 'T·m/A' },
      { symbol: 'I', meaning: 'Steady electric current', siUnit: 'A (Ampere)' },
      { symbol: 'dl', meaning: 'Length of infinitesimal current element', siUnit: 'm' },
      { symbol: 'θ', meaning: 'Angle between current element dl⃗ and position vector r⃗', siUnit: 'rad / deg' },
      { symbol: 'r', meaning: 'Distance from current element to observation point', siUnit: 'm' }
    ],
    derivedSIUnit: 'T (Tesla) = Wb / m^2 = N / (A m)',
    dimensionalFormula: '[M · T⁻² · A⁻¹]',
    conditionsAndLimitations: 'Differential formulation applicable to steady DC currents.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-07',
    subjectId: 'physics',
    chapterId: 'physics-2-3',
    chapterName: 'Alternating Current',
    name: 'Series LCR Impedance and Resonant Frequency',
    latexExpression: 'Z = \\sqrt{R^2 + \\left(\\omega L - \\frac{1}{\\omega C}\\right)^2}, \\quad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}',
    plainTextExpression: 'Z = √[ R² + (ωL - 1/ωC)² ] ,  f₀ = 1 / (2π√(LC))',
    variablesLegend: [
      { symbol: 'Z', meaning: 'Total impedance of series LCR circuit', siUnit: 'Ω (Ohms)' },
      { symbol: 'R', meaning: 'Ohmic resistance', siUnit: 'Ω' },
      { symbol: 'X_L = ωL', meaning: 'Inductive reactance', siUnit: 'Ω' },
      { symbol: 'X_C = 1/ωC', meaning: 'Capacitive reactance', siUnit: 'Ω' },
      { symbol: 'f₀', meaning: 'Resonant frequency at zero phase angle', siUnit: 'Hz (Hertz)' }
    ],
    derivedSIUnit: 'ohms (Resistance/Impedance)',
    dimensionalFormula: '[M · L² · T⁻³ · A⁻²]',
    conditionsAndLimitations: 'Valid for steady-state sinusoidal AC excitation.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-08',
    subjectId: 'physics',
    chapterId: 'physics-3-1',
    chapterName: 'Ray Optics and Optical Instruments',
    name: 'Lensmaker\'s Formula',
    latexExpression: '\\frac{1}{f} = \\left(\\frac{n_2}{n_1} - 1\\right) \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)',
    plainTextExpression: '1/f = (n₂/n₁ - 1) · (1/R₁ - 1/R₂)',
    variablesLegend: [
      { symbol: 'f', meaning: 'Focal length of thin lens', siUnit: 'm (Meter)' },
      { symbol: 'n₂/n₁', meaning: 'Refractive index of lens material relative to surrounding medium', siUnit: 'Dimensionless' },
      { symbol: 'R₁, R₂', meaning: 'Radii of curvature of first and second refracting surfaces', siUnit: 'm' }
    ],
    derivedSIUnit: 'm^-1 (Dioptre, D) or focal length in meters',
    dimensionalFormula: '[L⁻¹]',
    conditionsAndLimitations: 'Thin lens approximation; paraxial rays only.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-09',
    subjectId: 'physics',
    chapterId: 'physics-4-1',
    chapterName: 'Dual Nature of Radiation and Matter',
    name: 'Einstein\'s Photoelectric Equation',
    latexExpression: 'K_{max} = e V_0 = h\\nu - \\Phi_0 = h(\\nu - \\nu_0)',
    plainTextExpression: 'K_max = e · V₀ = hν - Φ₀ = h(ν - ν₀)',
    variablesLegend: [
      { symbol: 'K_{max}', meaning: 'Maximum kinetic energy of ejected photoelectrons', siUnit: 'J (Joules) or eV' },
      { symbol: 'V₀', meaning: 'Cut-off / stopping potential', siUnit: 'V (Volts)' },
      { symbol: 'h', meaning: 'Planck\'s constant = 6.626 × 10⁻³⁴ J·s', siUnit: 'J·s' },
      { symbol: 'ν', meaning: 'Frequency of incident radiation', siUnit: 'Hz' },
      { symbol: 'Φ₀', meaning: 'Work function of emitter surface (Φ₀ = h · ν₀)', siUnit: 'J or eV' }
    ],
    derivedSIUnit: 'J (Joules) or eV (electron-Volts)',
    dimensionalFormula: '[M · L² · T⁻²]',
    conditionsAndLimitations: 'One-photon one-electron collision process; instantaneous emission.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-phy-10',
    subjectId: 'physics',
    chapterId: 'physics-4-2',
    chapterName: 'Atoms',
    name: 'Bohr Radius and Energy Levels of Hydrogen Atom',
    latexExpression: 'r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m e^2} = n^2 a_0, \\quad E_n = -\\frac{13.6}{n^2} \\text{ eV}',
    plainTextExpression: 'r_n = 0.529 · n² Å ,  E_n = - 13.6 / n² eV',
    variablesLegend: [
      { symbol: 'r_n', meaning: 'Radius of n-th allowed circular Bohr orbit', siUnit: 'm or Å (10⁻¹⁰ m)' },
      { symbol: 'a₀', meaning: 'First Bohr radius (ground state n=1) = 0.529 Å', siUnit: 'Å / m' },
      { symbol: 'E_n', meaning: 'Total energy of electron in n-th stationary state', siUnit: 'eV or J' },
      { symbol: 'n', meaning: 'Principal quantum number (n = 1, 2, 3...)', siUnit: 'Integer' }
    ],
    derivedSIUnit: 'eV or Joules',
    dimensionalFormula: '[M · L² · T⁻²]',
    conditionsAndLimitations: 'Strictly valid for hydrogen and hydrogen-like single-electron ions (He+, Li2+).',
    boardFrequency: 'Very High'
  },

  // ==================== CHEMISTRY FORMULAS ====================
  // Chapter 1: Solutions
  {
    id: 'f-chem-01',
    subjectId: 'chemistry',
    chapterId: 'chemistry-1-1',
    chapterName: 'Solutions',
    name: 'Colligative Properties with Van \'t Hoff Factor',
    latexExpression: '\\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\Pi = i C R T',
    plainTextExpression: 'ΔT_b = i · K_b · m ;  ΔT_f = i · K_f · m ;  Π = i · C · R · T',
    variablesLegend: [
      { symbol: 'ΔT_b', meaning: 'Elevation in boiling point', siUnit: 'K or °C' },
      { symbol: 'ΔT_f', meaning: 'Depression in freezing point', siUnit: 'K or °C' },
      { symbol: 'Π', meaning: 'Osmotic pressure (capital Greek Pi)', siUnit: 'bar, Pa or atm' },
      { symbol: 'i', meaning: 'van \'t Hoff factor [i = 1 + (n - 1)·α for dissociation]', siUnit: 'Dimensionless' },
      { symbol: 'K_b, K_f', meaning: 'Molal boiling elevation & freezing depression constants', siUnit: 'K·kg/mol' },
      { symbol: 'm', meaning: 'Molality of solute (moles solute / kg solvent)', siUnit: 'mol/kg' },
      { symbol: 'C', meaning: 'Molar concentration (moles/L)', siUnit: 'mol/L' },
      { symbol: 'R', meaning: 'Universal gas constant = 0.0831 L·bar·K⁻¹·mol⁻¹', siUnit: 'L·bar/(K·mol)' }
    ],
    derivedSIUnit: 'K (Temperature change), bar / Pa (Pressure)',
    conditionsAndLimitations: 'Valid for dilute solutions obeying Raoult\'s law.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-chem-02',
    subjectId: 'chemistry',
    chapterId: 'chemistry-2-1',
    chapterName: 'Electrochemistry',
    name: 'Nernst Equation for Full Cell Potential',
    latexExpression: 'E_{cell} = E^0_{cell} - \\frac{2.303 R T}{n F} \\log_{10} Q = E^0_{cell} - \\frac{0.0591}{n} \\log_{10} \\frac{[\\text{Products}]}{[\\text{Reactants}]}',
    plainTextExpression: 'E_cell = E°_cell - (0.0591 / n) · log₁₀(Q)  [at 298 K]',
    variablesLegend: [
      { symbol: 'E_{cell}', meaning: 'Electrode potential under non-standard concentration', siUnit: 'V (Volts)' },
      { symbol: 'E°_{cell}', meaning: 'Standard cell potential = E°_{cathode} - E°_{anode}', siUnit: 'V' },
      { symbol: 'n', meaning: 'Number of electrons transferred in balanced cell reaction', siUnit: 'Dimensionless' },
      { symbol: 'F', meaning: 'Faraday constant = 96,485 C/mol', siUnit: 'C/mol' },
      { symbol: 'Q', meaning: 'Reaction quotient ([Products]^{stoich} / [Reactants]^{stoich})', siUnit: 'Dimensionless' }
    ],
    derivedSIUnit: 'V (Volts)',
    conditionsAndLimitations: 'Evaluated at standard room temperature T = 298.15 K (25 °C).',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-chem-03',
    subjectId: 'chemistry',
    chapterId: 'chemistry-2-1',
    chapterName: 'Electrochemistry',
    name: 'Kohlrausch\'s Law and Degree of Dissociation',
    latexExpression: '\\Lambda^0_m = \\nu_+ \\lambda^0_+ + \\nu_- \\lambda^0_-, \\quad \\alpha = \\frac{\\Lambda_m}{\\Lambda^0_m}, \\quad K_a = \\frac{c \\alpha^2}{1 - \\alpha}',
    plainTextExpression: 'Λ°_m = ν₊ · λ°₊ + ν₋ · λ°₋ ;  α = Λ_m / Λ°_m ;  K_a = (c · α²) / (1 - α)',
    variablesLegend: [
      { symbol: 'Λ°_m', meaning: 'Limiting molar conductivity at infinite dilution', siUnit: 'S·cm²/mol' },
      { symbol: 'α', meaning: 'Degree of dissociation of weak electrolyte', siUnit: 'Dimensionless (0 to 1)' },
      { symbol: 'K_a', meaning: 'Dissociation constant of weak monobasic acid', siUnit: 'mol/L' },
      { symbol: 'c', meaning: 'Molar concentration', siUnit: 'mol/L' }
    ],
    derivedSIUnit: 'S cm^2 / mol (Siemens cm squared per mole)',
    conditionsAndLimitations: 'Applicable to any electrolyte at infinite dilution where ionic interactions vanish.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-chem-04',
    subjectId: 'chemistry',
    chapterId: 'chemistry-3-1',
    chapterName: 'Chemical Kinetics',
    name: 'First-Order Integrated Rate Equation and Arrhenius Equation',
    latexExpression: 'k = \\frac{2.303}{t} \\log_{10} \\frac{[A]_0}{[A]}, \\quad t_{1/2} = \\frac{0.693}{k}, \\quad \\log_{10} \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)',
    plainTextExpression: 'k = (2.303 / t) · log₁₀([A]₀ / [A]) ;  t₁/₂ = 0.693 / k ;  log₁₀(k₂/k₁) = (E_a / 2.303·R) · [(T₂ - T₁) / (T₁ · T₂)]',
    variablesLegend: [
      { symbol: 'k', meaning: 'First-order reaction rate constant', siUnit: 's⁻¹ or min⁻¹' },
      { symbol: 't_{1/2}', meaning: 'Half-life period (independent of initial concentration)', siUnit: 's (Seconds)' },
      { symbol: 'E_a', meaning: 'Arrhenius activation energy', siUnit: 'J/mol or kJ/mol' },
      { symbol: 'R', meaning: 'Gas constant = 8.314 J·K⁻¹·mol⁻¹', siUnit: 'J/(K·mol)' }
    ],
    derivedSIUnit: 's^-1 (Rate constant), kJ/mol (Activation energy)',
    conditionsAndLimitations: 'First order kinetics; Ea assumed independent of temperature over Delta T.',
    boardFrequency: 'Guaranteed'
  },

  // ==================== MATHEMATICS FORMULAS ====================
  // Chapter 3 & 4: Matrices and Determinants
  {
    id: 'f-mat-01',
    subjectId: 'math',
    chapterId: 'math-2-2',
    chapterName: 'Determinants',
    name: 'Matrix Inverse and Matrix Method Solution',
    latexExpression: 'A^{-1} = \\frac{1}{|A|} \\text{adj}(A), \\quad X = A^{-1} B \\quad (|A| \\neq 0)',
    plainTextExpression: 'A⁻¹ = (1 / |A|) · adj(A) ;  X = A⁻¹ · B  (|A| ≠ 0)',
    variablesLegend: [
      { symbol: 'A', meaning: 'Square coefficient matrix of order n', siUnit: 'Matrix' },
      { symbol: '|A|', meaning: 'Determinant of matrix A (must be non-zero for inverse)', siUnit: 'Scalar' },
      { symbol: 'adj(A)', meaning: 'Adjoint matrix = Transpose of cofactor matrix [C_{ij}]^T', siUnit: 'Matrix' },
      { symbol: 'X, B', meaning: 'Variable vector and constant RHS column vector', siUnit: 'Column Vectors' }
    ],
    derivedSIUnit: 'Dimensionless Algebraic Matrix Operations',
    conditionsAndLimitations: 'Matrix A must be non-singular (|A| != 0) for unique solution.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-mat-02',
    subjectId: 'math',
    chapterId: 'math-3-3',
    chapterName: 'Integrals',
    name: 'King\'s Property of Definite Integrals',
    latexExpression: '\\int_a^b f(x) \\, dx = \\int_a^b f(a + b - x) \\, dx, \\quad \\int_0^a f(x) \\, dx = \\int_0^a f(a - x) \\, dx',
    plainTextExpression: '∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx ;  ∫_0^a f(x) dx = ∫_0^a f(a - x) dx',
    variablesLegend: [
      { symbol: 'f(x)', meaning: 'Continuous integrand function over interval [a, b]', siUnit: 'Function' },
      { symbol: 'a, b', meaning: 'Lower and upper integration limits', siUnit: 'Real scalars' }
    ],
    derivedSIUnit: 'Area under curve (Square units)',
    conditionsAndLimitations: 'Function f must be integrable and continuous on closed interval [a, b].',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-mat-03',
    subjectId: 'math',
    chapterId: 'math-3-5',
    chapterName: 'Differential Equations',
    name: 'Linear First-Order Differential Equation Solution',
    latexExpression: '\\frac{dy}{dx} + P(x) y = Q(x) \\implies \\text{I.F.} = e^{\\int P(x) \\, dx}, \\quad y \\cdot \\text{I.F.} = \\int [Q(x) \\cdot \\text{I.F.}] \\, dx + C',
    plainTextExpression: 'dy/dx + P(x)·y = Q(x)  ⟹  I.F. = e^(∫ P dx) ;  y · (I.F.) = ∫ [ Q(x) · (I.F.) ] dx + C',
    variablesLegend: [
      { symbol: 'P(x), Q(x)', meaning: 'Functions of x only (or real constants)', siUnit: 'Functions' },
      { symbol: 'I.F.', meaning: 'Integrating factor = exp(∫ P(x) dx)', siUnit: 'Integrating factor' },
      { symbol: 'C', meaning: 'Arbitrary constant of integration', siUnit: 'Scalar constant' }
    ],
    derivedSIUnit: 'General mathematical function family',
    conditionsAndLimitations: 'Coefficient of dy/dx must be unity (+1).',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-mat-04',
    subjectId: 'math',
    chapterId: 'math-4-2',
    chapterName: 'Three Dimensional Geometry',
    name: 'Shortest Distance between Skew Lines',
    latexExpression: 'd = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}',
    plainTextExpression: 'd = | (a⃗₂ - a⃗₁) · (b⃗₁ × b⃗₂) |  /  | b⃗₁ × b⃗₂ |',
    variablesLegend: [
      { symbol: 'd', meaning: 'Shortest perpendicular distance between non-parallel skew lines', siUnit: 'Units of length' },
      { symbol: 'a⃗₁, a⃗₂', meaning: 'Position vectors of known points on Line 1 and Line 2', siUnit: 'Position Vectors' },
      { symbol: 'b⃗₁, b⃗₂', meaning: 'Direction vectors of Line 1 and Line 2', siUnit: 'Direction Vectors' }
    ],
    derivedSIUnit: 'Length (meters / units)',
    conditionsAndLimitations: 'Lines must be non-parallel (b1 x b2 != 0). If d = 0, lines intersect.',
    boardFrequency: 'Guaranteed'
  },
  {
    id: 'f-mat-05',
    subjectId: 'math',
    chapterId: 'math-6-1',
    chapterName: 'Probability',
    name: 'Bayes\' Theorem Formulation',
    latexExpression: 'P(E_i | A) = \\frac{P(E_i) \\cdot P(A | E_i)}{\\sum_{j=1}^k P(E_j) \\cdot P(A | E_j)}',
    plainTextExpression: 'P(Eᵢ | A) = [ P(Eᵢ) · P(A | Eᵢ) ]  /  ∑ [ P(Eⱼ) · P(A | Eⱼ) ]',
    variablesLegend: [
      { symbol: 'P(E_i | A)', meaning: 'Posterior probability of hypothesis E_i given observed event A', siUnit: 'Probability (0 to 1)' },
      { symbol: 'P(E_i)', meaning: 'Prior probability of partition event E_i', siUnit: 'Probability' },
      { symbol: 'P(A | E_i)', meaning: 'Likelihood of event A given hypothesis E_i', siUnit: 'Probability' }
    ],
    derivedSIUnit: 'Dimensionless probability ratio',
    conditionsAndLimitations: 'Events E1, E2... Ek must form a complete mutually exclusive and exhaustive partition of sample space S.',
    boardFrequency: 'Guaranteed'
  }
];
