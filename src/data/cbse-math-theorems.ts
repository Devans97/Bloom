/**
 * CBSE Class XII Mathematics (041) - Theorems, Proofs & Standard Integrals Repository
 * 2026-2027 Examination Blueprint Standard
 * Rigorous formal proofs, boundary conditions, standard integral forms, and marking schemes.
 */

export interface MathProofStep {
  stepNumber: number;
  statement: string;
  mathExpression: string;
  justification?: string;
  reasoning?: string;
}

export interface CBSEMathTheorem {
  id: string;
  chapterId: string;
  title: string;
  marksWeightage: 2 | 3 | 5;
  prerequisites: string[];
  theoremStatement: string;
  proofSteps: MathProofStep[];
  conclusion: string;
  boardApplications: string[];
}

export const cbseMathTheorems: CBSEMathTheorem[] = [
  // Chapter 3: Matrices (math-2-1)
  {
    id: 'mat-thm-01',
    chapterId: 'math-2-1',
    title: 'Uniqueness of inverse of a square matrix',
    marksWeightage: 3,
    prerequisites: ['Definition of invertible matrix: AB = BA = I'],
    theoremStatement: 'If A is an invertible square matrix, then its inverse is unique.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Assume for contradiction that A has two distinct inverses, say B and C.',
        mathExpression: 'AB = BA = I, and AC = CA = I',
        reasoning: 'By definition of matrix inverse.'
      },
      {
        stepNumber: 2,
        statement: 'Write matrix B as the product of B and the identity matrix I.',
        mathExpression: 'B = B · I',
        reasoning: 'Multiplication by identity matrix leaves any matrix unchanged.'
      },
      {
        stepNumber: 3,
        statement: 'Substitute I = AC into the equation.',
        mathExpression: 'B = B · (AC)',
        reasoning: 'Since C is an assumed inverse of A, AC = I.'
      },
      {
        stepNumber: 4,
        statement: 'Apply the associative law of matrix multiplication.',
        mathExpression: 'B = (BA) · C',
        reasoning: 'Matrix multiplication is associative: B(AC) = (BA)C.'
      },
      {
        stepNumber: 5,
        statement: 'Substitute BA = I since B is an inverse of A.',
        mathExpression: 'B = I · C = C',
        reasoning: 'I · C = C.'
      },
      {
        stepNumber: 6,
        statement: 'Conclude that B and C must be identical.',
        mathExpression: 'B = C',
        reasoning: 'Contradiction to the assumption that B and C were distinct inverses.'
      }
    ],
    conclusion: 'Every invertible square matrix possesses one and only one unique inverse.',
    boardApplications: [
      'Proof frequently tested as a 3-mark question in Section C of Board Paper.',
      'Justifies why solving AX = B via X = A⁻¹ B yields a unique solution.'
    ]
  },
  {
    id: 'mat-thm-02',
    chapterId: 'math-2-1',
    title: 'Reversal law for the transpose of a product of matrices',
    marksWeightage: 3,
    prerequisites: ['Matrix multiplication index notation and transpose definition'],
    theoremStatement: 'For any two conformable matrices A and B, (AB)ᵀ = Bᵀ · Aᵀ.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Let A be an m x n matrix and B be an n x p matrix, so that product AB is of order m x p.',
        mathExpression: 'Order of (AB)ᵀ is p x m',
        reasoning: 'Transpose of an m x p matrix is of order p x m.'
      },
      {
        stepNumber: 2,
        statement: 'Determine order of Bᵀ and Aᵀ.',
        mathExpression: 'Order of Bᵀ is p x n; Order of Aᵀ is n x m => Order of Bᵀ · Aᵀ is p x m',
        reasoning: 'Product Bᵀ · Aᵀ is conformable and has matching order p x m.'
      },
      {
        stepNumber: 3,
        statement: 'Examine the (i, j)-th element of (AB)ᵀ.',
        mathExpression: '[(AB)ᵀ]_ij = (AB)_ji',
        reasoning: 'By definition of transpose: element in row i, col j of transpose is element in row j, col i of original matrix.'
      },
      {
        stepNumber: 4,
        statement: 'Expand (AB)_ji using row j of A and column i of B.',
        mathExpression: '(AB)_ji = ∑_{k=1}^{n} A_jk · B_ki',
        reasoning: 'Row-by-column rule of matrix multiplication.'
      },
      {
        stepNumber: 5,
        statement: 'Rewrite elements using transpose notation: A_jk = (Aᵀ)_kj, and B_ki = (Bᵀ)_ik.',
        mathExpression: '(AB)_ji = ∑_{k=1}^{n} (Bᵀ)_ik · (Aᵀ)_kj',
        reasoning: 'Scalar multiplication of real numbers is commutative: A_jk · B_ki = B_ki · A_jk.'
      },
      {
        stepNumber: 6,
        statement: 'Recognize the summation as the (i, j)-th element of product Bᵀ · Aᵀ.',
        mathExpression: '∑_{k=1}^{n} (Bᵀ)_ik · (Aᵀ)_kj = [Bᵀ · Aᵀ]_ij',
        reasoning: 'Row i of Bᵀ multiplied with column j of Aᵀ.'
      }
    ],
    conclusion: '[(AB)ᵀ]_ij = [Bᵀ · Aᵀ]_ij for all i, j; therefore (AB)ᵀ = Bᵀ · Aᵀ.',
    boardApplications: [
      'Used to prove that A + Aᵀ is symmetric and A - Aᵀ is skew-symmetric.',
      'Core identity in proving orthogonality and quadratic forms.'
    ]
  },

  // Chapter 5: Continuity and Differentiability (math-3-1)
  {
    id: 'mat-thm-03',
    chapterId: 'math-3-1',
    title: 'Differentiability implies continuity',
    marksWeightage: 3,
    prerequisites: ['Definitions of derivative f\'(c) and continuity at a point c'],
    theoremStatement: 'If a function f is differentiable at a point c, then it is necessarily continuous at that point.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Given that f is differentiable at point c, state the existence of limit.',
        mathExpression: 'f\'(c) = lim_{x → c} [ (f(x) - f(c)) / (x - c) ] exists finitely',
        reasoning: 'Definition of derivative of f at x = c.'
      },
      {
        stepNumber: 2,
        statement: 'For x != c, express the difference f(x) - f(c) identically.',
        mathExpression: 'f(x) - f(c) = [ (f(x) - f(c)) / (x - c) ] · (x - c)',
        reasoning: 'Multiplying and dividing by (x - c) for x != c.'
      },
      {
        stepNumber: 3,
        statement: 'Take the limit as x approaches c on both sides.',
        mathExpression: 'lim_{x → c} [ f(x) - f(c) ] = lim_{x → c} [ (f(x) - f(c)) / (x - c) ] · lim_{x → c} (x - c)',
        reasoning: 'Product rule of limits: lim(u · v) = lim u · lim v when both limits exist.'
      },
      {
        stepNumber: 4,
        statement: 'Evaluate the two limits on the right-hand side.',
        mathExpression: 'lim_{x → c} [ f(x) - f(c) ] = f\'(c) · (c - c) = f\'(c) · 0 = 0',
        reasoning: 'f\'(c) is a finite real number, and finite number · 0 = 0.'
      },
      {
        stepNumber: 5,
        statement: 'Rearrange the limit equation.',
        mathExpression: 'lim_{x → c} f(x) - f(c) = 0 => lim_{x → c} f(x) = f(c)',
        reasoning: 'Limit of difference is difference of limits.'
      }
    ],
    conclusion: 'Since lim_{x → c} f(x) = f(c), f is continuous at x = c. (Note: The converse is not true; e.g. f(x) = |x| is continuous at 0 but not differentiable at 0).',
    boardApplications: [
      'Standard 3-mark theoretical board question in Calculus Section.',
      'Always asked with counterexample f(x) = |x| demonstrating that the converse is false.'
    ]
  },

  // Chapter 7: Integrals (math-3-3)
  {
    id: 'mat-thm-04',
    chapterId: 'math-3-3',
    title: 'King’s Property of Definite Integrals (Property P4)',
    marksWeightage: 3,
    prerequisites: ['Definite integral substitution rule'],
    theoremStatement: '∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx, and generally ∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Consider the right-hand side integral: I = ∫ₐᵇ f(a + b - x) dx.',
        mathExpression: 'Let t = a + b - x',
        reasoning: 'Define variable transformation to map (a + b - x) back to single variable.'
      },
      {
        stepNumber: 2,
        statement: 'Differentiate with respect to x.',
        mathExpression: 'dt = -dx => dx = -dt',
        reasoning: 'Derivative of (a + b - x) with respect to x is -1.'
      },
      {
        stepNumber: 3,
        statement: 'Transform the integration limits corresponding to x.',
        mathExpression: 'When x = a: t = a + b - a = b; When x = b: t = a + b - b = a',
        reasoning: 'Substitute lower and upper limits into transformation equation.'
      },
      {
        stepNumber: 4,
        statement: 'Substitute variable, differential, and limits into the integral.',
        mathExpression: '∫ₐᵇ f(a + b - x) dx = ∫ᵦᵃ f(t) · (-dt) = - ∫ᵦᵃ f(t) dt',
        reasoning: 'Negative sign comes from dx = -dt.'
      },
      {
        stepNumber: 5,
        statement: 'Use property ∫ᵦᵃ f(t) dt = - ∫ₐᵇ f(t) dt to interchange limits.',
        mathExpression: '- [ - ∫ₐᵇ f(t) dt ] = ∫ₐᵇ f(t) dt',
        reasoning: 'Interchanging lower and upper limits reverses sign of integral.'
      },
      {
        stepNumber: 6,
        statement: 'Change dummy variable of integration from t back to x.',
        mathExpression: '∫ₐᵇ f(t) dt = ∫ₐᵇ f(x) dx',
        reasoning: 'The value of a definite integral is independent of the choice of dummy variable.'
      }
    ],
    conclusion: '∫ₐᵇ f(x) dx = ∫ₐᵇ f(a + b - x) dx. In particular when a = 0, ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx.',
    boardApplications: [
      'The most crucial property in Class 12 board calculus: used to solve int_0^(pi/2) log(sin x) dx = -pi/2 log 2 and algebraic symmetrical fractions.'
    ]
  },
  {
    id: 'mat-thm-05',
    chapterId: 'math-3-3',
    title: 'Even and Odd Function Property of Definite Integrals (Property P7)',
    marksWeightage: 3,
    prerequisites: ['P4 property and substitution'],
    theoremStatement: '∫₋ₐᵃ f(x) dx = 2 · ∫₀ᵃ f(x) dx if f is an even function [f(-x) = f(x)], and 0 if f is an odd function [f(-x) = -f(x)].',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Split the integral from -a to a at the origin x = 0.',
        mathExpression: '∫₋ₐᵃ f(x) dx = int_{-a}^0 f(x) dx + ∫₀ᵃ f(x) dx ... (1)',
        reasoning: 'Additive property of definite integrals over partitioned intervals.'
      },
      {
        stepNumber: 2,
        statement: 'In the first integral I1 = int_{-a}^0 f(x) dx, put x = -t.',
        mathExpression: 'dx = -dt; when x = -a, t = a; when x = 0, t = 0',
        reasoning: 'Substitution to reflect negative domain onto positive interval [0, a].'
      },
      {
        stepNumber: 3,
        statement: 'Transform I1 using the substitution.',
        mathExpression: 'I1 = ∫ₐ⁰ f(-t) · (-dt) = - ∫ₐ⁰ f(-t) dt = ∫₀ᵃ f(-t) dt = ∫₀ᵃ f(-x) dx',
        reasoning: 'Interchanging limits cancels negative sign, then changing dummy variable t to x.'
      },
      {
        stepNumber: 4,
        statement: 'Substitute I1 back into equation (1).',
        mathExpression: '∫₋ₐᵃ f(x) dx = ∫₀ᵃ f(-x) dx + ∫₀ᵃ f(x) dx = ∫₀ᵃ [ f(x) + f(-x) ] dx',
        reasoning: 'Combining integrals over identical limit interval [0, a].'
      },
      {
        stepNumber: 5,
        statement: 'Case 1: If f is an even function, f(-x) = f(x).',
        mathExpression: '∫₋ₐᵃ f(x) dx = ∫₀ᵃ [ f(x) + f(x) ] dx = 2 · ∫₀ᵃ f(x) dx',
        reasoning: 'f(x) + f(x) = 2 f(x).'
      },
      {
        stepNumber: 6,
        statement: 'Case 2: If f is an odd function, f(-x) = -f(x).',
        mathExpression: '∫₋ₐᵃ f(x) dx = ∫₀ᵃ [ f(x) - f(x) ] dx = ∫₀ᵃ 0 dx = 0',
        reasoning: 'f(x) - f(x) = 0.'
      }
    ],
    conclusion: '∫₋ₐᵃ f(x) dx equals 2 · ∫₀ᵃ f(x) dx for even functions, and identically 0 for odd functions.',
    boardApplications: [
      'Instantly evaluates complex trigonometric integrals like int_{-pi/2}^(pi/2) sin^7 x dx = 0 (odd function).'
    ]
  },

  // Chapter 9: Differential Equations (math-3-5)
  {
    id: 'mat-thm-06',
    chapterId: 'math-3-5',
    title: 'General solution of first-order linear differential equations and integrating factor derivation',
    marksWeightage: 3,
    prerequisites: ['Product rule of differentiation and chain rule'],
    theoremStatement: 'The first-order linear differential equation dy/dx + P(x) y = Q(x) has integrating factor IF = exp(∫ P dx) and general solution y · IF = ∫ (Q · IF) dx + C.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Write the linear differential equation.',
        mathExpression: 'dy/dx + P(x) · y = Q(x) ... (1)',
        reasoning: 'Standard form where P and Q are functions of x only or constants.'
      },
      {
        stepNumber: 2,
        statement: 'Multiply both sides by an unknown non-zero integrating factor g(x).',
        mathExpression: 'g(x) · (dy/dx) + P(x) · g(x) · y = Q(x) · g(x) ... (2)',
        reasoning: 'Objective is to make the left-hand side the exact derivative of the product [y · g(x)].'
      },
      {
        stepNumber: 3,
        statement: 'Equate left-hand side to d/dx [ y · g(x) ] = g(x) · (dy/dx) + y · (dg/dx).',
        mathExpression: 'g(x) · (dy/dx) + P(x) · g(x) · y = g(x) · (dy/dx) + y · (dg/dx)',
        reasoning: 'Product rule expansion of d/dx(y · g).'
      },
      {
        stepNumber: 4,
        statement: 'Cancel g(x) · (dy/dx) and divide by y.',
        mathExpression: 'dg/dx = P(x) · g(x) => (1 / g) dg = P(x) dx',
        reasoning: 'Separable differential equation in g and x.'
      },
      {
        stepNumber: 5,
        statement: 'Integrate both sides with respect to x.',
        mathExpression: 'ln |g(x)| = ∫ P(x) dx => g(x) = e^(∫ P(x) dx)',
        reasoning: 'Taking exponential of both sides. This function g(x) is the Integrating Factor (IF).'
      },
      {
        stepNumber: 6,
        statement: 'Substitute back into equation (2) and integrate both sides.',
        mathExpression: 'd/dx [ y · e^(∫ P dx) ] = Q(x) · e^(∫ P dx) => y · e^(∫ P dx) = ∫ [ Q(x) · e^(∫ P dx) ] dx + C',
        reasoning: 'Integrating both sides with respect to x gives the general solution.'
      }
    ],
    conclusion: 'General solution: y · IF = ∫ [ Q · IF ] dx + C, where IF = e^(∫ P dx).',
    boardApplications: [
      'Forms the foundation of Section C/D 3-mark and 4-mark differential equation problems in every CBSE board exam.'
    ]
  },

  // Chapter 11: Three-Dimensional Geometry (math-4-2)
  {
    id: 'mat-thm-07',
    chapterId: 'math-4-2',
    title: 'Shortest distance between two skew lines in vector form',
    marksWeightage: 5,
    prerequisites: ['Vector projection, scalar triple product, and cross product'],
    theoremStatement: 'The shortest distance d between two skew lines r = a1 + λ · b1 and r = a2 + μ · b2 is d = |(b1 x b2) · (a2 - a1)| / |b1 x b2|.',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'Let L1 pass through point A with position vector a1 and be parallel to vector b1.',
        mathExpression: 'L1: r = a1 + λ · b1',
        reasoning: 'Vector equation of line 1.'
      },
      {
        stepNumber: 2,
        statement: 'Let L2 pass through point B with position vector a2 and be parallel to vector b2.',
        mathExpression: 'L2: r = a2 + μ · b2',
        reasoning: 'Vector equation of line 2.'
      },
      {
        stepNumber: 3,
        statement: 'Let vector PQ be the shortest distance vector perpendicular to both lines L1 and L2.',
        mathExpression: 'PQ is perpendicular to b1 and PQ is perpendicular to b2 => PQ is parallel to (b1 x b2)',
        reasoning: 'A line perpendicular to two vectors is parallel to their cross product.'
      },
      {
        stepNumber: 4,
        statement: 'Find the unit vector n_hat along the common perpendicular PQ.',
        mathExpression: 'n_hat = (b1 x b2) / |b1 x b2|',
        reasoning: 'Unit vector definition.'
      },
      {
        stepNumber: 5,
        statement: 'The shortest distance d is the projection of vector AB = (a2 - a1) onto unit vector n_hat.',
        mathExpression: 'd = |proj_n_hat(AB)| = |AB · n_hat|',
        reasoning: 'Geometric projection of vector connecting any two points on the lines along common perpendicular direction.'
      },
      {
        stepNumber: 6,
        statement: 'Substitute AB = (a2 - a1) and n_hat into the projection formula.',
        mathExpression: 'd = | (a2 - a1) · [ (b1 x b2) / |b1 x b2| ] | = | (b1 x b2) · (a2 - a1) | / |b1 x b2|',
        reasoning: 'Magnitude ensures non-negative distance.'
      }
    ],
    conclusion: 'Shortest distance d = | (b1 x b2) · (a2 - a1) | / |b1 x b2|. Condition for lines to intersect: (b1 x b2) · (a2 - a1) = 0.',
    boardApplications: [
      'Guaranteed 5-mark long-answer question in Section E of CBSE Class XII Mathematics board paper.'
    ]
  },

  // Chapter 13: Probability (math-6-1)
  {
    id: 'mat-thm-08',
    chapterId: 'math-6-1',
    title: 'Bayes’ Theorem for posterior probability',
    marksWeightage: 5,
    prerequisites: ['Theorem of Total Probability and conditional probability definition'],
    theoremStatement: 'If E1, E2, ..., En are mutually exclusive and exhaustive events forming a partition of sample space S with P(Ei) > 0, and A is any event with P(A) > 0, then P(Ei|A) = [ P(Ei) · P(A|Ei) ] / [ ∑_{j=1}^{n} P(Ej) · P(A|Ej) ].',
    proofSteps: [
      {
        stepNumber: 1,
        statement: 'By definition of conditional probability, express P(Ei|A).',
        mathExpression: 'P(Ei|A) = P(Ei ∩ A) / P(A) ... (1)',
        reasoning: 'Probability of event Ei given that event A has already occurred.'
      },
      {
        stepNumber: 2,
        statement: 'Apply the multiplication rule of probability to the numerator P(Ei ∩ A).',
        mathExpression: 'P(Ei ∩ A) = P(Ei) · P(A|Ei) ... (2)',
        reasoning: 'Multiplication theorem on probability.'
      },
      {
        stepNumber: 3,
        statement: 'Express the event A in terms of partition events E1, E2, ..., En.',
        mathExpression: 'A = A ∩ S = A ∩ (E1 cup E2 cup ... cup En) = (A ∩ E1) cup (A ∩ E2) cup ... cup (A ∩ En)',
        reasoning: 'Distributive law of set theory across partition union.'
      },
      {
        stepNumber: 4,
        statement: 'Since Ei are mutually exclusive, the intersections (A ∩ Ei) are also mutually pairwise disjoint.',
        mathExpression: 'P(A) = P(A ∩ E1) + P(A ∩ E2) + ... + P(A ∩ En) = ∑_{j=1}^{n} P(A ∩ Ej)',
        reasoning: 'Axiom of finite additivity for disjoint events.'
      },
      {
        stepNumber: 5,
        statement: 'Apply multiplication rule to each term in the sum (Theorem of Total Probability).',
        mathExpression: 'P(A) = ∑_{j=1}^{n} P(Ej) · P(A|Ej) ... (3)',
        reasoning: 'Expressing total probability of A as weighted sum of conditional probabilities.'
      },
      {
        stepNumber: 6,
        statement: 'Substitute equations (2) and (3) into equation (1).',
        mathExpression: 'P(Ei|A) = [ P(Ei) · P(A|Ei) ] / [ ∑_{j=1}^{n} P(Ej) · P(A|Ej) ]',
        reasoning: 'Combining conditional numerator with total probability denominator.'
      }
    ],
    conclusion: 'Bayes’ theorem establishes the exact algebraic link updating prior probability P(Ei) to posterior probability P(Ei|A) after observing event A.',
    boardApplications: [
      'Appears in almost every CBSE Mathematics board exam as a 5-mark problem (factory machines, diagnostic medical testing, blood group tests, coin tosses).'
    ]
  }
];

export const theoremById = (id: string): CBSEMathTheorem | undefined =>
  cbseMathTheorems.find(t => t.id === id);

export const theoremsForChapter = (chapterId: string): CBSEMathTheorem[] =>
  cbseMathTheorems.filter(t => t.chapterId === chapterId);
