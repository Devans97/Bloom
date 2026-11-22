/**
 * NCERT Exemplar Problems & High-Order Analytical Solutions (HOTS)
 * Subject: Mathematics (041) - CBSE Class XII 2026-2027 Blueprint
 * Authentic problems sourced directly from the NCERT Exemplar Class 12 Mathematics publication.
 * Complete step-by-step mathematical proofs, domain/range constraints, and CBSE step-marking rubrics.
 */

import { ExemplarSolutionStep, NCERTExemplarProblem } from './ncert-exemplar-physics.js';

export const ncertExemplarMath: NCERTExemplarProblem[] = [
  // Chapter 1: Relations and Functions (math-1-1)
  {
    id: 'ex-math-01-01',
    chapterId: 'math-1-1',
    problemNumber: 'NCERT Exemplar Q1.9',
    type: 'conceptual',
    difficulty: 'moderate',
    questionText: 'Let R be a relation on the set of all real numbers R defined by (a, b) in R if and only if 1 + a · b > 0. Determine whether R is: (a) reflexive, (b) symmetric, and (c) transitive. Justify with formal proofs or counterexamples.',
    diagramDescription: 'Real plane Cartesian coordinate representation of hyperbola 1 + xy = 0 bounding the region 1 + xy > 0.',
    analyticalSolution: '(a) Reflexive: For every a in R, 1 + a · a = 1 + a². Since a² >= 0 for all real a, 1 + a² >= 1 > 0. Hence (a, a) in R for all a in R. Thus R is reflexive. (b) Symmetric: Let (a, b) in R => 1 + a · b > 0. Since multiplication of real numbers is commutative, a · b = b · a, so 1 + b · a = 1 + a · b > 0. Therefore (b, a) in R. Thus R is symmetric. (c) Transitive: R is NOT transitive. We provide a counterexample: Let a = -1, b = 0.5, c = -2. (1) For (a, b): 1 + a · b = 1 + (-1)(0.5) = 1 - 0.5 = 0.5 > 0 => (a, b) in R. (2) For (b, c): 1 + b · c = 1 + (0.5)(-2) = 1 - 1 = 0... Wait, let a = -1, b = 0, c = -2: 1 + a · b = 1 + 0 = 1 > 0, 1 + b · c = 1 + 0 = 1 > 0, but 1 + a · c = 1 + (-1)(-2) = 1 + 2 = 3 > 0. Let us choose a = 1, b = -0.5, c = -4: (1) 1 + a · b = 1 + (1)(-0.5) = 0.5 > 0 => (a, b) in R. (2) 1 + b · c = 1 + (-0.5)(-4) = 1 + 2 = 3 > 0 => (b, c) in R. (3) 1 + a · c = 1 + (1)(-4) = 1 - 4 = -3 < 0 => (a, c) not in R. Since (a, b) in R and (b, c) in R but (a, c) is not in R, R is not transitive.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Prove reflexivity: 1 + a² >= 1 > 0 for all a in R.',
        mathExpression: 'For all a in R, a² >= 0 => 1 + a² > 0 => (a, a) in R (Reflexive)',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Prove symmetry using commutativity of real multiplication.',
        mathExpression: '1 + ab > 0 => 1 + ba > 0 => (b, a) in R (Symmetric)',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Disprove transitivity by constructing a valid numerical counterexample: a = 1, b = -0.5, c = -4.',
        mathExpression: '1 + (1)(-0.5) = 0.5 > 0; 1 + (-0.5)(-4) = 3 > 0; but 1 + (1)(-4) = -3 < 0 => Not Transitive',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for reflexivity proof, 1 mark for symmetry proof, 1 mark for specific counterexample disproving transitivity.',
    commonMistakesAndTraps: [
      'Assuming it is transitive by algebraic manipulation without testing sign reversals of negative numbers.',
      'Giving a counterexample where intermediate pair is not in R.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 1, Section 1.2 Types of Relations'
  },

  // Chapter 2: Inverse Trigonometric Functions (math-1-2)
  {
    id: 'ex-math-02-01',
    chapterId: 'math-1-2',
    problemNumber: 'NCERT Exemplar Q2.5',
    type: 'conceptual',
    difficulty: 'moderate',
    questionText: 'Find the principal value of: cos⁻¹ [cos (7 · π / 6)] + sin⁻¹ [sin (5 · π / 6)] + tan⁻¹ [tan (3 · π / 4)]. Show all intermediate domain reductions.',
    diagramDescription: 'Unit circle with quadrants showing principal value branches: cos⁻¹ in [0, π], sin⁻¹ in [-π/2, π/2], tan⁻¹ in (-π/2, π/2).',
    analyticalSolution: '(1) For cos⁻¹[cos(7 · π/6)]: The principal value branch for cos⁻¹(x) is [0, π]. Since 7 · π/6 = π + π/6 > π, it lies outside the branch. Using cos(2 · π - θ) = cos(θ): cos(7 · π/6) = cos(2 · π - 5 · π/6) = cos(5 · π/6). Since 5 · π/6 in [0, π], cos⁻¹[cos(7 · π/6)] = 5 · π/6. (2) For sin⁻¹[sin(5 · π/6)]: The principal value branch for sin⁻¹(x) is [-π/2, π/2]. Since 5 · π/6 > π/2, it lies outside. Using sin(π - θ) = sin(θ): sin(5 · π/6) = sin(π - π/6) = sin(π/6). Since π/6 in [-π/2, π/2], sin⁻¹[sin(5 · π/6)] = π/6. (3) For tan⁻¹[tan(3 · π/4)]: The principal value branch for tan⁻¹(x) is (-π/2, π/2). Since 3 · π/4 > π/2, it lies outside. Using tan(π - θ) = -tan(θ) = tan(-θ): tan(3 · π/4) = tan(π - π/4) = -tan(π/4) = tan(-π/4). Since -π/4 in (-π/2, π/2), tan⁻¹[tan(3 · π/4)] = -π/4. (4) Sum = 5 · π/6 + π/6 + (-π/4) = 6 · π/6 - π/4 = π - π/4 = 3 · π/4.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Reduce cos⁻¹[cos(7pi/6)] into [0, π]: cos(7pi/6) = cos(2pi - 5pi/6) = cos(5pi/6).',
        mathExpression: 'cos⁻¹[cos(7pi/6)] = 5pi / 6',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Reduce sin⁻¹[sin(5pi/6)] into [-π/2, π/2]: sin(5pi/6) = sin(π - π/6) = sin(π/6).',
        mathExpression: 'sin⁻¹[sin(5pi/6)] = π / 6',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Reduce tan⁻¹[tan(3pi/4)] into (-π/2, π/2): tan(3pi/4) = tan(-π/4).',
        mathExpression: 'tan⁻¹[tan(3pi/4)] = -π / 4',
        marksAwarded: 0.5
      },
      {
        step: 4,
        description: 'Add the three values: 5pi/6 + π/6 - π/4 = π - π/4 = 3pi/4.',
        mathExpression: 'Sum = 3pi / 4',
        marksAwarded: 0.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for cos⁻¹ reduction, 1 mark for sin⁻¹ reduction, 0.5 for tan⁻¹ reduction, 0.5 for final sum 3pi/4.',
    commonMistakesAndTraps: [
      'Blindly writing cos⁻¹[cos(x)] = x to get 7pi/6 (which violates the principal branch [0, π]).',
      'Getting the sign wrong for tan⁻¹(tan(3pi/4)).'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 2, Section 2.2 Basic Concepts of Inverse Trigonometric Functions'
  },

  // Chapter 3: Matrices (math-2-1)
  {
    id: 'ex-math-03-01',
    chapterId: 'math-2-1',
    problemNumber: 'NCERT Exemplar Q3.14',
    type: 'conceptual',
    difficulty: 'moderate',
    questionText: 'Express the matrix A = [[3, 5], [1, -1]] as the sum of a symmetric matrix P and a skew-symmetric matrix Q. Verify that P is indeed symmetric and Q is skew-symmetric.',
    diagramDescription: 'Matrix decomposition representation showing A = (A + Aᵀ)/2 + (A - Aᵀ)/2.',
    analyticalSolution: 'Any square matrix A can be uniquely written as A = P + Q, where P = 1/2 · (A + Aᵀ) is symmetric and Q = 1/2 · (A - Aᵀ) is skew-symmetric. Given A = [[3, 5], [1, -1]]. Transpose Aᵀ = [[3, 1], [5, -1]]. (1) P = 1/2 · (A + Aᵀ) = 1/2 · ([[3, 5], [1, -1]] + [[3, 1], [5, -1]]) = 1/2 · [[6, 6], [6, -2]] = [[3, 3], [3, -1]]. Check symmetry: Pᵀ = [[3, 3], [3, -1]] = P. Hence P is symmetric. (2) Q = 1/2 · (A - Aᵀ) = 1/2 · ([[3, 5], [1, -1]] - [[3, 1], [5, -1]]) = 1/2 · [[0, 4], [-4, 0]] = [[0, 2], [-2, 0]]. Check skew-symmetry: Qᵀ = [[0, -2], [2, 0]] = -[[0, 2], [-2, 0]] = -Q. Hence Q is skew-symmetric. (3) Verification of sum: P + Q = [[3, 3], [3, -1]] + [[0, 2], [-2, 0]] = [[3+0, 3+2], [3-2, -1+0]] = [[3, 5], [1, -1]] = A.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Calculate transpose Aᵀ and form symmetric component P = 1/2 (A + Aᵀ).',
        mathExpression: 'P = 1/2 · ([[3, 5], [1, -1]] + [[3, 1], [5, -1]]) = [[3, 3], [3, -1]]',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Verify Pᵀ = P.',
        mathExpression: 'Pᵀ = [[3, 3], [3, -1]] = P (Symmetric)',
        marksAwarded: 0.5
      },
      {
        step: 3,
        description: 'Form skew-symmetric component Q = 1/2 (A - Aᵀ).',
        mathExpression: 'Q = 1/2 · ([[3, 5], [1, -1]] - [[3, 1], [5, -1]]) = [[0, 2], [-2, 0]]',
        marksAwarded: 1.0
      },
      {
        step: 4,
        description: 'Verify Qᵀ = -Q and confirm sum P + Q = A.',
        mathExpression: 'Qᵀ = -Q; P + Q = A (Verified)',
        marksAwarded: 0.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for matrix P, 0.5 for Pᵀ = P, 1 mark for matrix Q, 0.5 for Qᵀ = -Q and final sum verification.',
    commonMistakesAndTraps: [
      'Missing the factor of 1/2.',
      'Forgetting to verify Pᵀ = P and Qᵀ = -Q.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 3, Section 3.4 Symmetric and Skew Symmetric Matrices'
  },

  // Chapter 4: Determinants (math-2-2)
  {
    id: 'ex-math-04-01',
    chapterId: 'math-2-2',
    problemNumber: 'NCERT Exemplar Q4.18',
    type: 'numerical',
    difficulty: 'challenging',
    questionText: 'Solve the following system of linear equations using matrix inverse method: 2x + 3y + 3z = 5; x - 2y + z = -4; 3x - y - 2z = 3.',
    diagramDescription: 'Matrix equation AX = B with 3x3 coefficient matrix A, variable vector X, and constant vector B.',
    analyticalSolution: 'Write system in matrix form AX = B: A = [[2, 3, 3], [1, -2, 1], [3, -1, -2]], X = [[x], [y], [z]], B = [[5], [-4], [3]]. (1) Calculate determinant |A|: |A| = 2 · ((-2)(-2) - (1)(-1)) - 3 · ((1)(-2) - (1)(3)) + 3 · ((1)(-1) - (-2)(3)) = 2 · (4 + 1) - 3 · (-2 - 3) + 3 · (-1 + 6) = 2 · (5) - 3 · (-5) + 3 · (5) = 10 + 15 + 15 = 40. Since |A| = 40 != 0, A is non-singular and has a unique solution X = A⁻¹ · B. (2) Find cofactors: C11 = +5, C12 = -(-5) = 5, C13 = +5. C21 = -(3 · (-2) - 3 · (-1)) = -(-6 + 3) = 3; C22 = +(2 · (-2) - 3 · 3) = -4 - 9 = -13; C23 = -(2 · (-1) - 3 · 3) = -(-2 - 9) = 11. C31 = +(3 · 1 - 3 · (-2)) = 3 + 6 = 9; C32 = -(2 · 1 - 3 · 1) = -(2 - 3) = 1; C33 = +(2 · (-2) - 3 · 1) = -4 - 3 = -7. (3) Adjoint adj(A) = [[5, 3, 9], [5, -13, 1], [5, 11, -7]]. (4) Inverse A⁻¹ = (1/40) · adj(A). (5) Compute X = A⁻¹ · B: x = (1/40) · (5 · 5 + 3 · (-4) + 9 · 3) = (1/40) · (25 - 12 + 27) = 40/40 = 1. y = (1/40) · (5 · 5 + (-13) · (-4) + 1 · 3) = (1/40) · (25 + 52 + 3) = 80/40 = 2. z = (1/40) · (5 · 5 + 11 · (-4) + (-7) · 3) = (1/40) · (25 - 44 - 21) = -40/40 = -1. Hence x = 1, y = 2, z = -1.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Formulate matrix equation AX = B and evaluate |A| = 40 != 0.',
        mathExpression: '|A| = 2(5) - 3(-5) + 3(5) = 40 != 0 (Unique solution exists)',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Calculate all 9 cofactors accurately.',
        mathExpression: 'C11=5, C12=5, C13=5; C21=3, C22=-13, C23=11; C31=9, C32=1, C33=-7',
        marksAwarded: 1.5
      },
      {
        step: 3,
        description: 'Write adj(A) as transpose of cofactor matrix and state A⁻¹ = (1/|A|) adj(A).',
        mathExpression: 'adj(A) = [[5, 3, 9], [5, -13, 1], [5, 11, -7]]',
        marksAwarded: 1.0
      },
      {
        step: 4,
        description: 'Perform matrix multiplication X = A⁻¹ · B to obtain x = 1, y = 2, z = -1.',
        mathExpression: 'X = (1/40) [[40], [80], [-40]] => x = 1, y = 2, z = -1',
        marksAwarded: 1.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for |A|, 1.5 for cofactors, 1 mark for adj(A), 1.5 marks for matrix multiplication and values x, y, z.',
    commonMistakesAndTraps: [
      'Forgetting to take the transpose of the cofactor matrix to obtain adj(A).',
      'Sign errors in cofactor positions where (-1)^(i+j) = -1 (C12, C21, C23, C32).'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 4, Section 4.6 Applications of Determinants and Matrices'
  },

  // Chapter 5: Continuity and Differentiability (math-3-1)
  {
    id: 'ex-math-05-01',
    chapterId: 'math-3-1',
    problemNumber: 'NCERT Exemplar Q5.16',
    type: 'conceptual',
    difficulty: 'challenging',
    questionText: 'Discuss the continuity and differentiability of the function f(x) = |x - 1| + |x - 2| at the points x = 1 and x = 2.',
    diagramDescription: 'Graph of f(x) = -2x+3 (x < 1), f(x) = 1 (1 <= x < 2), f(x) = 2x-3 (x >= 2), showing sharp corners at x = 1 and x = 2.',
    analyticalSolution: 'Rewrite f(x) by definition of absolute value: For x < 1: f(x) = -(x - 1) - (x - 2) = -2x + 3. For 1 <= x < 2: f(x) = (x - 1) - (x - 2) = 1. For x >= 2: f(x) = (x - 1) + (x - 2) = 2x - 3. (1) At x = 1: Continuity: LHL = lim_{x->1-} (-2x + 3) = 1. RHL = lim_{x->1+} (1) = 1. f(1) = 1. Since LHL = RHL = f(1), f is continuous at x = 1. Differentiability: LHD = lim_{h->0-} [f(1+h) - f(1)] / h = lim_{h->0-} [-2(1+h) + 3 - 1] / h = lim [-2h] / h = -2. RHD = lim_{h->0+} [f(1+h) - f(1)] / h = lim [1 - 1] / h = 0. Since LHD (-2) != RHD (0), f is NOT differentiable at x = 1. (2) At x = 2: Continuity: LHL = lim_{x->2-} (1) = 1. RHL = lim_{x->2+} (2x - 3) = 4 - 3 = 1. f(2) = 1. Continuous at x = 2. Differentiability: LHD = lim_{h->0-} [1 - 1] / h = 0. RHD = lim_{h->0+} [2(2+h) - 3 - 1] / h = lim [2h] / h = 2. Since LHD (0) != RHD (2), f is NOT differentiable at x = 2. Conclusion: f(x) is continuous everywhere on R, but fails to be differentiable at the corner points x = 1 and x = 2.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Define piecewise form of f(x) across three real intervals.',
        mathExpression: 'f(x) = {-2x + 3 for x < 1; 1 for 1 <= x < 2; 2x - 3 for x >= 2}',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Test continuity at x = 1 and x = 2 (LHL = RHL = f(c) = 1).',
        mathExpression: 'lim x->1 f(x) = 1 = f(1); lim x->2 f(x) = 1 = f(2) (Continuous at both)',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Calculate left- and right-hand derivatives at x = 1: LHD = -2, RHD = 0.',
        mathExpression: 'LHD(1) = -2 != RHD(1) = 0 => Not differentiable at x = 1',
        marksAwarded: 1.5
      },
      {
        step: 4,
        description: 'Calculate left- and right-hand derivatives at x = 2: LHD = 0, RHD = 2.',
        mathExpression: 'LHD(2) = 0 != RHD(2) = 2 => Not differentiable at x = 2',
        marksAwarded: 1.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for piecewise partition, 1 mark for continuity proofs, 1.5 marks for derivatives at x=1, 1.5 marks for derivatives at x=2.',
    commonMistakesAndTraps: [
      'Assuming that continuity implies differentiability (continuity is necessary but not sufficient; sharp corners have no unique tangent).',
      'Incorrect algebraic signs in absolute value intervals.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 5, Section 5.3 Differentiability'
  },

  // Chapter 6: Application of Derivatives (math-3-2)
  {
    id: 'ex-math-06-01',
    chapterId: 'math-3-2',
    problemNumber: 'NCERT Exemplar Q6.10',
    type: 'conceptual',
    difficulty: 'challenging',
    questionText: 'Show that the semi-vertical angle of a right circular cone of given surface area and maximum volume is sin⁻¹(1/3).',
    diagramDescription: 'Right circular cone with radius r, slant height l, vertical height h, and semi-vertical angle α where sin(α) = r/l.',
    analyticalSolution: 'Let the given total surface area of the cone be S = π · r · l + π · r². Then slant height l = (S - π · r²) / (π · r). The volume of the cone is V = (1/3) · π · r² · h. To avoid radicals, consider V²: V² = (1/9) · π² · r⁴ · h² = (1/9) · π² · r⁴ · (l² - r²). Let Z = 9 · V² / π² = r⁴ · [((S - π · r²) / (π · r))² - r²] = r⁴ · [(S² - 2 · π · r² · S + π² · r⁴ - π² · r⁴) / (π² · r²)] = (r² / π²) · [S² - 2 · π · r² · S] = (S² / π²) · r² - (2 · S / π) · r⁴. For maximum volume, dZ/dr = 0: dZ/dr = (2 · S² / π²) · r - (8 · S / π) · r³ = 0. Since r != 0: (2 · S / π) · r · [S / π - 4 · r²] = 0 => S = 4 · π · r². Check second derivative: d² Z / dr² = (2 · S² / π²) - (24 · S / π) · r². Substituting S = 4 · π · r² gives (2 · 16 · π² · r⁴ / π²) - (24 · 4 · π · r² / π) · r² = 32 · r⁴ - 96 · r⁴ = -64 · r⁴ < 0. Thus volume is maximum when S = 4 · π · r². Now substitute S into slant height: π · r · l + π · r² = 4 · π · r² => π · r · l = 3 · π · r² => l = 3 · r => r / l = 1/3. In right triangle, sin(α) = r / l = 1/3. Hence α = sin⁻¹(1/3).',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Express total surface area S = π · r · l + π · r² and solve for l.',
        mathExpression: 'l = (S - π · r²) / (π · r)',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Formulate volume square function Z = V² in terms of r and S.',
        mathExpression: 'Z = (r² / π²) · (S² - 2 · π · S · r²)',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Differentiate dZ/dr = 0 and solve for S in terms of r.',
        mathExpression: 'dZ/dr = 0 => S = 4 · π · r²',
        marksAwarded: 1.0
      },
      {
        step: 4,
        description: 'Verify maximum using second derivative d^2Z/dr² < 0.',
        mathExpression: 'd^2Z/dr² = -64 · r⁴ < 0 (Strict Maximum)',
        marksAwarded: 1.0
      },
      {
        step: 5,
        description: 'Relate r, l, and semi-vertical angle α: l = 3r => sin(α) = r/l = 1/3.',
        mathExpression: 'sin(α) = 1/3 => α = sin⁻¹(1/3)',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for S and l, 1 mark for V² objective function, 1 mark for dZ/dr=0, 1 mark for second derivative test, 1 mark for sin(α)=1/3.',
    commonMistakesAndTraps: [
      'Differentiating V directly with √(l² - r²), which introduces complex algebra and differentiation errors (maximizing V² is much cleaner).',
      'Omitting the second derivative test (CBSE strictly deducts 1 mark if d^2V/dr² is not shown).',
      'Confusing curved surface area with total surface area.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 6, Section 6.5 Maxima and Minima'
  },

  // Chapter 7: Integrals (math-3-3)
  {
    id: 'ex-math-07-01',
    chapterId: 'math-3-3',
    problemNumber: 'NCERT Exemplar Q7.22',
    type: 'conceptual',
    difficulty: 'challenging',
    questionText: 'Evaluate the definite integral: I = integral_0^π [x · sin(x)] / [1 + cos²(x)] dx.',
    diagramDescription: 'Definite integral area graph under the symmetric integrand over interval [0, π].',
    analyticalSolution: 'Given I = int_0^π [x · sin x / (1 + cos² x)] dx ... (Equation 1). Apply King\'s Property: int_0^a f(x) dx = int_0^a f(a - x) dx. Here a = π, so replace x with (π - x): I = int_0^π [(π - x) · sin(π - x)] / [1 + cos²(π - x)] dx. Since sin(π - x) = sin x and cos(π - x) = -cos x => cos²(π - x) = cos² x: I = int_0^π [(π - x) · sin x] / [1 + cos² x] dx ... (Equation 2). Adding Equations 1 and 2: 2 · I = int_0^π [(x + π - x) · sin x] / [1 + cos² x] dx = π · int_0^π [sin x / (1 + cos² x)] dx. Substitute u = cos x, du = -sin x dx. When x = 0, u = cos 0 = 1. When x = π, u = cos π = -1. 2 · I = π · int_1⁻¹ [-du / (1 + u²)] = π · int_{-1}^1 [du / (1 + u²)]. Since 1 / (1 + u²) is an even function of u: 2 · I = π · 2 · int_0^1 [du / (1 + u²)] => I = π · [tan⁻¹(u)]_0^1 = π · [tan⁻¹(1) - tan⁻¹(0)] = π · [π / 4 - 0] = π² / 4.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Apply King\'s property int_0^a f(x) dx = int_0^a f(a - x) dx.',
        mathExpression: 'I = int_0^π [(π - x) · sin(π - x)] / [1 + cos²(π - x)] dx',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Add the two integrals to eliminate the algebraic factor x.',
        mathExpression: '2 · I = π · int_0^π [sin x / (1 + cos² x)] dx',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Substitute u = cos x, du = -sin x dx with transformed limits from 1 to -1.',
        mathExpression: '2 · I = π · int_{-1}^1 [du / (1 + u²)]',
        marksAwarded: 1.0
      },
      {
        step: 4,
        description: 'Evaluate definite integral using tan⁻¹(u) antiderivative.',
        mathExpression: 'I = π · [tan⁻¹(1) - tan⁻¹(0)] = π · (π / 4) = π² / 4',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for King\'s property, 1 mark for addition eliminating x, 1 mark for substitution, 1 mark for final result π² / 4.',
    commonMistakesAndTraps: [
      'Forgetting the factor 2 on the left-hand side (reporting π² / 2 instead of π² / 4).',
      'Sign error when reversing limits with -du.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 7, Section 7.11 Definite Integrals Properties'
  },

  // Chapter 8: Application of Integrals (math-3-4)
  {
    id: 'ex-math-08-01',
    chapterId: 'math-3-4',
    problemNumber: 'NCERT Exemplar Q8.4',
    type: 'numerical',
    difficulty: 'moderate',
    questionText: 'Find the area of the region bounded by the parabola y² = 4x and the line y = 2x.',
    diagramDescription: 'Parabola opening along positive x-axis intersected by the line y = 2x through the origin and point (1, 2).',
    analyticalSolution: 'Find intersection points: Substitute y = 2x into parabola: (2x)² = 4x => 4x² = 4x => 4x(x - 1) = 0 => x = 0 or x = 1. Corresponding y-values: when x = 0, y = 0; when x = 1, y = 2. Points of intersection are (0, 0) and (1, 2). In interval x in [0, 1], the parabola lies above the line: y_upper = √(4x) = 2 · √(x); y_lower = 2x. Area = int_0^1 [y_upper - y_lower] dx = int_0^1 [2 · x^(1/2) - 2x] dx = [2 · (2/3) · x^(3/2) - 2 · (x² / 2)]_0^1 = [(4/3) · 1^(3/2) - 1²] - 0 = 4/3 - 1 = 1/3 square units.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Solve system to find intersection points: (0, 0) and (1, 2).',
        mathExpression: '(2x)² = 4x => 4x(x - 1) = 0 => x = 0, 1',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Set up definite integral: Area = int_0^1 (y_parabola - y_line) dx.',
        mathExpression: 'Area = int_0^1 [2 · √(x) - 2x] dx',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Integrate and evaluate upper and lower limits.',
        mathExpression: '[(4/3) · x^(3/2) - x²]_0^1 = 4/3 - 1 = 1/3 sq units',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for points of intersection, 1 mark for integral setup, 1 mark for correct evaluation 1/3 sq units.',
    commonMistakesAndTraps: [
      'Integrating with respect to y without changing boundaries (if integrating with respect to y from 0 to 2, integrand must be (y/2 - y²/4) dy).',
      'Missing the units (square units).'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 8, Section 8.2 Area between Two Curves'
  },

  // Chapter 9: Differential Equations (math-3-5)
  {
    id: 'ex-math-09-01',
    chapterId: 'math-3-5',
    problemNumber: 'NCERT Exemplar Q9.15',
    type: 'conceptual',
    difficulty: 'challenging',
    questionText: 'Find the particular solution of the differential equation: (x² - y²) dx + 2xy dy = 0, given that y = 1 when x = 1.',
    diagramDescription: 'Family of orthogonal circles passing through the origin representing the general and particular solution curves.',
    analyticalSolution: 'Rewrite the equation: 2xy dy = -(x² - y²) dx = (y² - x²) dx => dy/dx = (y² - x²) / (2xy). The function F(x, y) = (y² - x²) / (2xy) is homogeneous of degree 0 because F(λ · x, λ · y) = λ²(y² - x²) / (2 · λ² · xy) = F(x, y). Let y = v · x => dy/dx = v + x · (dv/dx). Substitute: v + x · (dv/dx) = (v² · x² - x²) / (2 · x · v · x) = (v² - 1) / (2v). x · (dv/dx) = (v² - 1) / (2v) - v = (v² - 1 - 2v²) / (2v) = -(v² + 1) / (2v). Separate variables: [2v / (v² + 1)] dv = -dx / x. Integrate both sides: int [2v / (v² + 1)] dv = - int [dx / x] => ln(v² + 1) = -ln|x| + ln C = ln(C / |x|). Exponentiating: v² + 1 = C / x. Substitute v = y / x: (y² / x²) + 1 = C / x => (y² + x²) / x² = C / x => x² + y² = C · x. This is the general solution. Particular solution: Put x = 1, y = 1: 1² + 1² = C · 1 => C = 2. Thus, the particular solution is x² + y² = 2x, or (x - 1)² + y² = 1 (a circle of radius 1 centered at (1, 0)).',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Prove equation is homogeneous and substitute y = v · x and dy/dx = v + x · dv/dx.',
        mathExpression: 'v + x · (dv/dx) = (v² - 1) / (2v)',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Separate variables: [2v / (v² + 1)] dv = -dx / x.',
        mathExpression: 'x · (dv/dx) = -(v² + 1) / (2v) => [2v / (v² + 1)] dv = -dx / x',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Integrate both sides to obtain general solution x² + y² = C · x.',
        mathExpression: 'ln(v² + 1) = -ln(x) + ln C => x² + y² = C · x',
        marksAwarded: 1.5
      },
      {
        step: 4,
        description: 'Apply initial condition x = 1, y = 1 to find constant C = 2.',
        mathExpression: '1 + 1 = C(1) => C = 2 => x² + y² = 2x',
        marksAwarded: 0.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for homogeneous substitution, 1 mark for separation of variables, 1.5 marks for integration to general solution, 0.5 for finding C=2.',
    commonMistakesAndTraps: [
      'Algebraic slip when subtracting v from (v² - 1)/(2v), writing v² + 1 instead of -(v² + 1).',
      'Forgetting to back-substitute v = y/x before applying boundary condition.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 9, Section 9.5 Homogeneous Differential Equations'
  },

  // Chapter 10: Vector Algebra (math-4-1)
  {
    id: 'ex-math-10-01',
    chapterId: 'math-4-1',
    problemNumber: 'NCERT Exemplar Q10.8',
    type: 'conceptual',
    difficulty: 'moderate',
    questionText: 'If a, b, c are three unit vectors such that a + b + c = 0, find the value of (a . b + b . c + c . a).',
    diagramDescription: 'Equilateral vector triangle formed by three unit vectors head-to-tail summing to zero.',
    analyticalSolution: 'Given |a| = 1, |b| = 1, |c| = 1, and a + b + c = 0. Take the scalar product of the vector (a + b + c) with itself: (a + b + c) . (a + b + c) = 0 . 0 = 0. Expanding the dot product: |a|² + |b|² + |c|² + 2 · (a . b + b . c + c . a) = 0. Substitute the magnitudes: 1² + 1² + 1² + 2 · (a . b + b . c + c . a) = 0 => 3 + 2 · (a . b + b . c + c . a) = 0 => 2 · (a . b + b . c + c . a) = -3 => (a . b + b . c + c . a) = -3 / 2.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Take self dot product of the vector sum equation: (a + b + c) . (a + b + c) = |a + b + c|² = 0.',
        mathExpression: '|a + b + c|² = 0',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Expand the dot product using distributive property.',
        mathExpression: '|a|² + |b|² + |c|² + 2 · (a.b + b.c + c.a) = 0',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Substitute unit magnitudes |a|=|b|=|c|=1 and solve.',
        mathExpression: '1 + 1 + 1 + 2 · (a.b + b.c + c.a) = 0 => a.b + b.c + c.a = -3/2',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for self-dot product strategy, 1 mark for algebraic expansion, 1 mark for final numerical answer -3/2.',
    commonMistakesAndTraps: [
      'Missing the factor of 2 in cross-terms 2(a.b + b.c + c.a).',
      'Forgetting that unit vectors have magnitude 1.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 10, Section 10.4 Scalar (Dot) Product'
  },

  // Chapter 11: Three Dimensional Geometry (math-4-2)
  {
    id: 'ex-math-11-01',
    chapterId: 'math-4-2',
    problemNumber: 'NCERT Exemplar Q11.12',
    type: 'numerical',
    difficulty: 'challenging',
    questionText: 'Find the shortest distance between the two skew lines whose vector equations are: r = (i + 2j + 3k) + λ · (i - 3j + 2k) and r = (4i + 5j + 6k) + μ · (2i + 3j + k).',
    diagramDescription: 'Two non-parallel, non-intersecting lines in 3D space with common perpendicular vector b1 x b2.',
    analyticalSolution: 'The lines are of the form r = a1 + λ · b1 and r = a2 + μ · b2. Here: a1 = i + 2j + 3k, b1 = i - 3j + 2k; a2 = 4i + 5j + 6k, b2 = 2i + 3j + k. (1) Difference of position vectors: a2 - a1 = (4 - 1)i + (5 - 2)j + (6 - 3)k = 3i + 3j + 3k. (2) Cross product b1 x b2: b1 x b2 = |[i, j, k], [1, -3, 2], [2, 3, 1]| = i · ((-3)(1) - (2)(3)) - j · ((1)(1) - (2)(2)) + k · ((1)(3) - (-3)(2)) = i · (-3 - 6) - j · (1 - 4) + k · (3 + 6) = -9i + 3j + 9k. (3) Magnitude |b1 x b2| = √((-9)² + 3² + 9²) = √(81 + 9 + 81) = √(171) = 3 · √(19). (4) Dot product (a2 - a1) . (b1 x b2) = (3)(-9) + (3)(3) + (3)(9) = -27 + 9 + 27 = 9. (5) Shortest distance d = |(a2 - a1) . (b1 x b2)| / |b1 x b2| = |9| / (3 · √(19)) = 3 / √(19) = 3 · √(19) / 19 units.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Identify vectors a1, b1, a2, b2 and calculate (a2 - a1) = 3i + 3j + 3k.',
        mathExpression: 'a2 - a1 = 3i + 3j + 3k',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'Compute cross product b1 x b2 using determinant form.',
        mathExpression: 'b1 x b2 = -9i + 3j + 9k',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'Compute magnitude |b1 x b2| = √(171) = 3 · √(19).',
        mathExpression: '|b1 x b2| = 3 · √(19)',
        marksAwarded: 0.5
      },
      {
        step: 4,
        description: 'Evaluate scalar triple product (a2 - a1) . (b1 x b2) = 9.',
        mathExpression: '(a2 - a1) . (b1 x b2) = 9',
        marksAwarded: 1.0
      },
      {
        step: 5,
        description: 'Calculate shortest distance d = 9 / (3 · √(19)) = 3 / √(19) units.',
        mathExpression: 'd = 3 / √(19) units',
        marksAwarded: 0.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for a2 - a1, 1 mark for cross product b1 x b2, 1 mark for scalar triple product, 1 mark for final distance 3/√(19).',
    commonMistakesAndTraps: [
      'Sign mistake in expanding j component of determinant: -(1 - 4) = +3j, not -3j.',
      'Forgetting absolute value if the dot product evaluates to a negative number.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 11, Section 11.5 Shortest Distance between Two Lines'
  },

  // Chapter 12: Linear Programming (math-5-1)
  {
    id: 'ex-math-12-01',
    chapterId: 'math-5-1',
    problemNumber: 'NCERT Exemplar Q12.4',
    type: 'conceptual',
    difficulty: 'moderate',
    questionText: 'Solve the following Linear Programming Problem graphically: Minimize and Maximize Z = 5x + 10y subject to the constraints: x + 2y <= 120, x + y >= 60, x - 2y >= 0, x >= 0, y >= 0.',
    diagramDescription: 'Feasible polygonal region bounded by lines x + 2y = 120, x + y = 60, and x - 2y = 0 in the first quadrant.',
    analyticalSolution: 'Graph the boundary lines: (1) Line 1: x + 2y = 120 passes through (120, 0) and (0, 60). Testing (0, 0): 0 <= 120 (True). Region is towards origin. (2) Line 2: x + y = 60 passes through (60, 0) and (0, 60). Testing (0, 0): 0 >= 60 (False). Region is away from origin. (3) Line 3: x - 2y = 0 passes through (0, 0) and (60, 30). Testing (10, 0): 10 - 0 >= 0 (True). Region contains positive x-axis. Intersection corner points of the closed bounded feasible region: Point A: Intersection of x - 2y = 0 and x + y = 60 => 2y + y = 60 => 3y = 60 => y = 20, x = 40 => A(40, 20). Point B: Intersection of x - 2y = 0 and x + 2y = 120 => 2y + 2y = 120 => 4y = 120 => y = 30, x = 60 => B(60, 30). Point C: Intersection of x + 2y = 120 and x-axis (y = 0) => C(120, 0). Point D: Intersection of x + y = 60 and x-axis (y = 0) => D(60, 0). Evaluate objective function Z = 5x + 10y at all corner points: At A(40, 20): Z = 5(40) + 10(20) = 200 + 200 = 400. At B(60, 30): Z = 5(60) + 10(30) = 300 + 300 = 600. At C(120, 0): Z = 5(120) + 10(0) = 600. At D(60, 0): Z = 5(60) + 10(0) = 300. Conclusion: Minimum value of Z is 300 at D(60, 0). Maximum value of Z is 600, occurring at all points on the line segment joining B(60, 30) and C(120, 0) because both endpoints produce Z = 600.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Plot constraint boundary lines and determine the bounded feasible region ABCD.',
        mathExpression: 'Corner points: A(40, 20), B(60, 30), C(120, 0), D(60, 0)',
        marksAwarded: 2.0
      },
      {
        step: 2,
        description: 'Construct corner point evaluation table for Z = 5x + 10y.',
        mathExpression: 'Z(A)=400, Z(B)=600, Z(C)=600, Z(D)=300',
        marksAwarded: 1.0
      },
      {
        step: 3,
        description: 'State minimum value (300 at (60, 0)) and infinite maximum points along segment BC.',
        mathExpression: 'Min Z = 300 at (60, 0); Max Z = 600 at all points on segment BC',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '2 marks for correct graph and shaded feasible region, 1 mark for corner point values, 1 mark for identifying minimum and multiple maximum points along segment BC.',
    commonMistakesAndTraps: [
      'Stating that the maximum occurs only at point B or only at point C (it occurs along the entire line segment connecting B and C).',
      'Shading the wrong half-plane for x - 2y >= 0.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 12, Section 12.2 Linear Programming Problem Formulation'
  },

  // Chapter 13: Probability (math-6-1)
  {
    id: 'ex-math-13-01',
    chapterId: 'math-6-1',
    problemNumber: 'NCERT Exemplar Q13.11',
    type: 'numerical',
    difficulty: 'challenging',
    questionText: 'An insurance company insured 2000 scooter drivers, 4000 car drivers, and 6000 truck drivers. The probability of an accident is 0.01, 0.03, and 0.15 respectively. One of the insured persons meets with an accident. What is the probability that he is a scooter driver? (Use Bayes\' Theorem).',
    diagramDescription: 'Tree diagram showing partition of insured drivers into Scooter (E1), Car (E2), Truck (E3) and conditional paths to Accident (A).',
    analyticalSolution: 'Total number of insured drivers = 2000 + 4000 + 6000 = 12000. Let E1, E2, E3 be the events that the driver is a scooter, car, and truck driver respectively. Let A be the event that the driver meets with an accident. Prior probabilities: P(E1) = 2000 / 12000 = 1/6. P(E2) = 4000 / 12000 = 1/3 = 2/6. P(E3) = 6000 / 12000 = 1/2 = 3/6. Likelihood of accident: P(A | E1) = 0.01 = 1/100. P(A | E2) = 0.03 = 3/100. P(A | E3) = 0.15 = 15/100. By Bayes\' Theorem: P(E1 | A) = [P(E1) · P(A | E1)] / [P(E1) · P(A | E1) + P(E2) · P(A | E2) + P(E3) · P(A | E3)]. Numerator = (1/6) · (1/100) = 1 / 600. Denominator = (1/6) · (1/100) + (2/6) · (3/100) + (3/6) · (15/100) = (1 + 6 + 45) / 600 = 52 / 600. Therefore, P(E1 | A) = (1 / 600) / (52 / 600) = 1 / 52.',
    stepByStepWorking: [
      {
        step: 1,
        description: 'Define events E1, E2, E3, and A and calculate prior probabilities.',
        mathExpression: 'P(E1) = 1/6, P(E2) = 2/6, P(E3) = 3/6',
        marksAwarded: 1.0
      },
      {
        step: 2,
        description: 'State given conditional likelihoods P(A|Ei).',
        mathExpression: 'P(A|E1) = 0.01, P(A|E2) = 0.03, P(A|E3) = 0.15',
        marksAwarded: 0.5
      },
      {
        step: 3,
        description: 'State formal Bayes\' Theorem formula.',
        mathExpression: 'P(E1|A) = [P(E1) · P(A|E1)] / sum [P(Ei) · P(A|Ei)]',
        marksAwarded: 1.0
      },
      {
        step: 4,
        description: 'Substitute values into denominator: (1 + 6 + 45)/600 = 52/600.',
        mathExpression: 'Denominator = 52 / 600',
        marksAwarded: 1.0
      },
      {
        step: 5,
        description: 'Calculate final posterior probability P(E1|A) = 1/52.',
        mathExpression: 'P(E1|A) = 1 / 52',
        marksAwarded: 0.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for defining events and prior probabilities, 1 mark for Bayes formula, 1 mark for denominator evaluation, 1 mark for 1/52.',
    commonMistakesAndTraps: [
      'Inverting conditional probability as P(A|E1) instead of finding P(E1|A).',
      'Arithmetic error in summing 1 + 6 + 45 = 52.'
    ],
    relatedNcertExerciseRef: 'NCERT Chapter 13, Section 13.3 Bayes\' Theorem'
  }
];
