/**
 * CBSE Class XII Mathematics (041) - Official Question Bank & Step-Marking Rubrics
 * 2026-2027 Examination Blueprint Standard
 * Authentic CBSE questions across Sections A to E with complete step-marking rubrics.
 */
export const cbseMathQuestionBank = [
    // SECTION A: 1-Mark MCQs
    {
        id: 'mat-q-001',
        chapterId: 'math-1-2',
        subjectId: 'math',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'The principal value of cos⁻¹( -1/2 ) is:',
        mcqOptions: [
            { key: 'A', text: '-π / 3' },
            { key: 'B', text: 'π / 3' },
            { key: 'C', text: '2 · π / 3' },
            { key: 'D', text: '4 · π / 3' }
        ],
        correctOption: 'C',
        stepRubrics: [
            { step: 'Recall principal value branch of cos⁻¹: [0, π]', marks: 0.5 },
            { step: 'Use identity cos⁻¹(-x) = π - cos⁻¹(x) = π - π/3 = 2pi/3', marks: 0.5 }
        ],
        modelAnswer: 'Option (C): 2 · π / 3. The principal value branch for cos⁻¹ x is [0, π]. Using the identity cos⁻¹(-x) = π - cos⁻¹(x): cos⁻¹(-1/2) = π - cos⁻¹(1/2) = π - π/3 = 2 · π / 3.',
        examinerNotes: 'Common mistake is answering -π/3 (which is in the range of sin⁻¹ or tan⁻¹, not cos⁻¹).'
    },
    {
        id: 'mat-q-002',
        chapterId: 'math-2-2',
        subjectId: 'math',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'If A is a square matrix of order 3 and |A| = 5, then the value of |adj(A)| is:',
        mcqOptions: [
            { key: 'A', text: '5' },
            { key: 'B', text: '25' },
            { key: 'C', text: '125' },
            { key: 'D', text: '1/5' }
        ],
        correctOption: 'B',
        stepRubrics: [
            { step: 'State theorem: |adj(A)| = |A|^(n - 1) for matrix of order n', marks: 0.5 },
            { step: 'Substitute n = 3 and |A| = 5: |adj(A)| = 5^(3 - 1) = 5² = 25', marks: 0.5 }
        ],
        modelAnswer: 'Option (B): 25. For any square matrix A of order n, |adj(A)| = |A|^(n - 1). Here, n = 3 and |A| = 5. Therefore, |adj(A)| = 5^(3 - 1) = 5² = 25.',
        examinerNotes: 'Remember that |k · A| = k^n · |A|, whereas |adj(A)| = |A|^(n - 1).'
    },
    {
        id: 'mat-q-003',
        chapterId: 'math-4-1',
        subjectId: 'math',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'If vector a = 2 i + 2 j + 3 k, vector b = -i + 2 j + k, and vector c = 3 i + j are such that (a + λ · b) is perpendicular to c, then the value of λ is:',
        mcqOptions: [
            { key: 'A', text: '4' },
            { key: 'B', text: '6' },
            { key: 'C', text: '8' },
            { key: 'D', text: '10' }
        ],
        correctOption: 'C',
        stepRubrics: [
            { step: 'Express (a + λ · b) = (2 - λ)i + (2 + 2lambda)j + (3 + λ)k', marks: 0.5 },
            { step: 'Set dot product with c equal to 0: (2 - λ) · 3 + (2 + 2lambda) · 1 + 0 = 0 => λ = 8', marks: 0.5 }
        ],
        modelAnswer: 'Option (C): 8. Vector (a + λ · b) = (2 - λ) i + (2 + 2 · λ) j + (3 + λ) k.\nSince it is perpendicular to c = 3 i + j + 0 k, their dot product is zero:\n(a + λ · b) · c = 0\n3 · (2 - λ) + 1 · (2 + 2 · λ) + 0 · (3 + λ) = 0\n6 - 3 · λ + 2 + 2 · λ = 0\n8 - λ = 0 => λ = 8.',
        examinerNotes: 'Check component arithmetic: c has no k component (ck = 0).'
    },
    // SECTION B: 2-Mark VSA Questions
    {
        id: 'mat-q-004',
        chapterId: 'math-1-1',
        subjectId: 'math',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'Show that the function f: R -> R defined by f(x) = (3 - 4x) is a bijective function.',
        stepRubrics: [
            { step: 'Prove injectivity (one-one): f(x1) = f(x2) => x1 = x2', marks: 1.0 },
            { step: 'Prove surjectivity (onto): for every y in R, there exists x = (3 - y)/4 in R', marks: 1.0 }
        ],
        modelAnswer: '1. Injective (One-one):\nLet x1, x2 in R such that f(x1) = f(x2).\n3 - 4 · x1 = 3 - 4 · x2\n-4 · x1 = -4 · x2\nx1 = x2.\nTherefore, f is one-one (injective).\n\n2. Surjective (Onto):\nLet y in R (codomain). Set f(x) = y:\n3 - 4x = y => 4x = 3 - y => x = (3 - y) / 4.\nSince y is a real number, x = (3 - y)/4 is also a real number in the domain R.\nAlso, f((3 - y)/4) = 3 - 4 · ((3 - y)/4) = 3 - (3 - y) = y.\nThus, every element y in codomain has a pre-image in domain.\nTherefore, f is onto (surjective).\n\nSince f is both injective and surjective, it is bijective.',
        examinerNotes: 'A complete proof must demonstrate both one-one and onto conditions explicitly.'
    },
    {
        id: 'mat-q-005',
        chapterId: 'math-3-2',
        subjectId: 'math',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'Find the intervals in which the function f(x) = 2x³ - 9x² + 12x + 15 is strictly increasing or strictly decreasing.',
        stepRubrics: [
            { step: 'Differentiate f(x) to find f\'(x) = 6x² - 18x + 12 = 6(x - 1)(x - 2)', marks: 1.0 },
            { step: 'Identify critical points x = 1, 2 and conclude strictly increasing on (-inf, 1) U (2, inf), strictly decreasing on (1, 2)', marks: 1.0 }
        ],
        modelAnswer: '1. Differentiate f(x):\nf\'(x) = d/dx (2x³ - 9x² + 12x + 15) = 6x² - 18x + 12 = 6 · (x² - 3x + 2) = 6 · (x - 1) · (x - 2).\n\n2. Set f\'(x) = 0 to find critical points: x = 1 and x = 2.\nThe points x = 1 and x = 2 divide the real line into three disjoint intervals: (-infinity, 1), (1, 2), and (2, infinity).\n\n3. Interval Analysis:\n- In (-infinity, 1): for x = 0, f\'(0) = 6 · (-1) · (-2) = +12 > 0 => Strictly Increasing.\n- In (1, 2): for x = 1.5, f\'(1.5) = 6 · (0.5) · (-0.5) = -1.5 < 0 => Strictly Decreasing.\n- In (2, infinity): for x = 3, f\'(3) = 6 · (2) · (1) = +12 > 0 => Strictly Increasing.\n\nConclusion:\n- Strictly increasing on (-infinity, 1) and (2, infinity).\n- Strictly decreasing on (1, 2).',
        examinerNotes: 'Open intervals are strictly required when stating "strictly" increasing or decreasing.'
    },
    // SECTION C: 3-Mark SA Questions
    {
        id: 'mat-q-006',
        chapterId: 'math-3-3',
        subjectId: 'math',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Evaluate the definite integral: I = int_0^(π/2) [ √(sin x) / ( √(sin x) + √(cos x) ) ] dx.',
        stepRubrics: [
            { step: 'State property int_0^a f(x) dx = int_0^a f(a - x) dx', marks: 0.5 },
            { step: 'Apply to get I = int_0^(π/2) [ √(cos x) / (√(cos x) + √(sin x)) ] dx', marks: 1.0 },
            { step: 'Add both integrals: 2I = int_0^(π/2) 1 dx', marks: 1.0 },
            { step: 'Evaluate: 2I = [x]_0^(π/2) = π/2 => I = π/4', marks: 0.5 }
        ],
        modelAnswer: '1. Let I = int_0^(π/2) [ √(sin x) / ( √(sin x) + √(cos x) ) ] dx ... (1)\n\n2. Using property int_0^a f(x) dx = int_0^a f(a - x) dx:\nI = int_0^(π/2) [ √(sin(π/2 - x)) / ( √(sin(π/2 - x)) + √(cos(π/2 - x)) ) ] dx\nSince sin(π/2 - x) = cos x and cos(π/2 - x) = sin x:\nI = int_0^(π/2) [ √(cos x) / ( √(cos x) + √(sin x) ) ] dx ... (2)\n\n3. Adding equations (1) and (2):\n2 · I = int_0^(π/2) [ (√(sin x) + √(cos x)) / (√(sin x) + √(cos x)) ] dx\n2 · I = int_0^(π/2) 1 dx = [ x ]_0^(π/2) = π/2 - 0 = π/2.\n\n4. Solve for I:\nI = (π / 2) / 2 = π / 4.',
        examinerNotes: 'Always remember to divide by 2 at the very end to get I from 2I.'
    },
    {
        id: 'mat-q-007',
        chapterId: 'math-3-5',
        subjectId: 'math',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Find the particular solution of the differential equation: (1 + x²) · (dy/dx) + 2xy = 1 / (1 + x²), given that y = 0 when x = 1.',
        stepRubrics: [
            { step: 'Convert to standard linear form: dy/dx + [2x / (1 + x²)] · y = 1 / (1 + x²)²', marks: 0.5 },
            { step: 'Calculate integrating factor: IF = e^(int 2x/(1+x²) dx) = e^(ln(1+x²)) = (1 + x²)', marks: 1.0 },
            { step: 'General solution: y · (1 + x²) = int [ (1 + x²) / (1 + x²)² ] dx = tan⁻¹ x + C', marks: 1.0 },
            { step: 'Substitute x = 1, y = 0 to find C = -π/4 and state particular solution', marks: 0.5 }
        ],
        modelAnswer: '1. Standard Linear Form:\nDivide by (1 + x²):\ndy/dx + [ 2x / (1 + x²) ] · y = 1 / (1 + x²)²\nThis is of the form dy/dx + P(x) · y = Q(x), where P(x) = 2x / (1 + x²) and Q(x) = 1 / (1 + x²)².\n\n2. Integrating Factor (IF):\nIF = e^(int P dx) = e^(int [2x / (1 + x²)] dx) = e^(ln(1 + x²)) = 1 + x².\n\n3. General Solution:\ny · (IF) = int [ Q(x) · (IF) ] dx + C\ny · (1 + x²) = int [ (1 / (1 + x²)²) · (1 + x²) ] dx + C\ny · (1 + x²) = int [ 1 / (1 + x²) ] dx + C\ny · (1 + x²) = tan⁻¹(x) + C.\n\n4. Particular Solution:\nGiven y = 0 when x = 1:\n0 · (1 + 1²) = tan⁻¹(1) + C\n0 = π/4 + C => C = -π/4.\n\nTherefore, the particular solution is:\ny · (1 + x²) = tan⁻¹(x) - π/4\nor y = [ tan⁻¹(x) - π/4 ] / (1 + x²).',
        examinerNotes: 'Check integration of 2x/(1+x²): substitution u = 1+x² gives ln(1+x²); e^(ln u) = u.'
    },
    // SECTION D: 5-Mark LA Questions
    {
        id: 'mat-q-008',
        chapterId: 'math-2-2',
        subjectId: 'math',
        section: 'D',
        marks: 5,
        questionType: 'LA',
        questionText: 'Solve the following system of linear equations using the matrix inversion method:\nx - y + 2z = 7\n3x + 4y - 5z = -5\n2x - y + 3z = 12',
        stepRubrics: [
            { step: 'Represent system in matrix form AX = B', marks: 0.5 },
            { step: 'Calculate determinant |A| = 1 · (12-5) + 1 · (9+10) + 2 · (-3-8) = 7 + 19 - 22 = 4 != 0', marks: 1.0 },
            { step: 'Compute matrix of cofactors and adjoint adj(A)', marks: 1.5 },
            { step: 'Compute inverse A⁻¹ = (1/|A|) · adj(A)', marks: 1.0 },
            { step: 'Multiply X = A⁻¹ · B and obtain final values: x = 2, y = 1, z = 3', marks: 1.0 }
        ],
        modelAnswer: '1. Matrix Formulation:\nAX = B, where:\nA = [[1, -1, 2], [3, 4, -5], [2, -1, 3]], X = [[x], [y], [z]], B = [[7], [-5], [12]].\n\n2. Determinant |A|:\n|A| = 1 · (4 · 3 - (-5) · (-1)) - (-1) · (3 · 3 - (-5) · 2) + 2 · (3 · (-1) - 4 · 2)\n|A| = 1 · (12 - 5) + 1 · (9 + 10) + 2 · (-3 - 8) = 1 · (7) + 1 · (19) + 2 · (-11) = 7 + 19 - 22 = 4 != 0.\nSince |A| != 0, A is non-singular and has a unique solution X = A⁻¹ B.\n\n3. Cofactors of A:\nA11 = +(12 - 5) = 7; A12 = -(9 + 10) = -19; A13 = +(-3 - 8) = -11;\nA21 = -(-3 + 2) = 1; A22 = +(3 - 4) = -1; A23 = -(-1 + 2) = -1;\nA31 = +(5 - 8) = -3; A32 = -(-5 - 6) = 11; A33 = +(4 + 3) = 7.\n\n4. Adjoint Matrix adj(A) = Transpose of Cofactor Matrix:\nadj(A) = [[7, 1, -3], [-19, -1, 11], [-11, -1, 7]].\n\n5. Inverse A⁻¹ = (1 / |A|) · adj(A) = (1/4) · [[7, 1, -3], [-19, -1, 11], [-11, -1, 7]].\n\n6. Compute Solution X = A⁻¹ · B:\nX = (1/4) · [[7, 1, -3], [-19, -1, 11], [-11, -1, 7]] · [[7], [-5], [12]]\nx = (1/4) · [ 7 · 7 + 1 · (-5) + (-3) · 12 ] = (1/4) · [ 49 - 5 - 36 ] = (1/4) · 8 = 2\ny = (1/4) · [ -19 · 7 + (-1) · (-5) + 11 · 12 ] = (1/4) · [ -133 + 5 + 132 ] = (1/4) · 4 = 1\nz = (1/4) · [ -11 · 7 + (-1) · (-5) + 7 · 12 ] = (1/4) · [ -77 + 5 + 84 ] = (1/4) · 12 = 3.\n\nConclusion:\nx = 2, y = 1, z = 3.\n(Verification: 2 - 1 + 2(3) = 7; 3(2) + 4(1) - 5(3) = -5; 2(2) - 1 + 3(3) = 12. Correct!)',
        examinerNotes: 'Remember to transpose the cofactor matrix to obtain adj(A). Forgetting to transpose is the most common error.'
    },
    {
        id: 'mat-q-009',
        chapterId: 'math-6-1',
        subjectId: 'math',
        section: 'D',
        marks: 5,
        questionType: 'LA',
        questionText: 'An insurance company insured 2000 scooter drivers, 4000 car drivers and 6000 truck drivers. The probability of an accident is 0.01, 0.03 and 0.15 respectively for scooter, car and truck drivers. One of the insured persons meets with an accident. What is the probability that he is a scooter driver?',
        stepRubrics: [
            { step: 'Define partition events E1, E2, E3 and accident event A', marks: 0.5 },
            { step: 'Calculate prior probabilities: P(E1) = 2/12 = 1/6, P(E2) = 4/12 = 1/3, P(E3) = 6/12 = 1/2', marks: 1.0 },
            { step: 'State conditional probabilities: P(A|E1) = 0.01, P(A|E2) = 0.03, P(A|E3) = 0.15', marks: 0.5 },
            { step: 'State Bayes’ theorem formula for P(E1|A)', marks: 1.0 },
            { step: 'Calculate denominator and obtain final fraction: 1 / 52', marks: 2.0 }
        ],
        modelAnswer: '1. Definition of Events:\nLet E1 = Event that insured person is a scooter driver.\nLet E2 = Event that insured person is a car driver.\nLet E3 = Event that insured person is a truck driver.\nLet A = Event that insured person meets with an accident.\n\n2. Prior Probabilities (Total drivers = 2000 + 4000 + 6000 = 12000):\nP(E1) = 2000 / 12000 = 1 / 6\nP(E2) = 4000 / 12000 = 2 / 6 = 1 / 3\nP(E3) = 6000 / 12000 = 3 / 6 = 1 / 2.\n\n3. Conditional Probabilities:\nP(A | E1) = 0.01 = 1 / 100\nP(A | E2) = 0.03 = 3 / 100\nP(A | E3) = 0.15 = 15 / 100.\n\n4. By Bayes’ Theorem:\nP(E1 | A) = [ P(E1) · P(A | E1) ] / [ P(E1) · P(A|E1) + P(E2) · P(A|E2) + P(E3) · P(A|E3) ]\n\nNumerator:\n(1 / 6) · (1 / 100) = 1 / 600.\n\nDenominator:\n(1 / 6) · (1 / 100) + (1 / 3) · (3 / 100) + (1 / 2) · (15 / 100)\n= 1 / 600 + 1 / 100 + 15 / 200\n= [ 1 + 6 + 45 ] / 600 = 52 / 600.\n\n5. Final Probability:\nP(E1 | A) = (1 / 600) / (52 / 600) = 1 / 52.',
        examinerNotes: 'Check fractions carefully: leaving common denominator 600 across all terms simplifies the division.'
    },
    {
        id: 'mat-q-011',
        chapterId: 'math-3-1',
        subjectId: 'math',
        section: 'A',
        marks: 1,
        questionType: 'Assertion-Reason',
        questionText: 'Given below are two statements labeled Assertion (A) and Reason (R).\nAssertion (A): The function f(x) = |x - 1| is continuous at x = 1, but is not differentiable at x = 1.\nReason (R): For f(x) = |x - 1|, the left-hand derivative is -1 while the right-hand derivative is +1 at x = 1.',
        mcqOptions: [
            { key: 'A', text: 'Both (A) and (R) are true and (R) is the correct explanation of (A).' },
            { key: 'B', text: 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A).' },
            { key: 'C', text: '(A) is true but (R) is false.' },
            { key: 'D', text: '(A) is false and (R) is also false.' }
        ],
        correctOption: 'A',
        stepRubrics: [
            { step: 'Option A: LHD = -1 != RHD = +1 explains non-differentiability at corner', marks: 1.0 }
        ],
        modelAnswer: 'Correct Option: (A). For f(x) = |x - 1|: lim x->1 f(x) = 0 = f(1), so f is continuous. Left-hand derivative LHD = lim h->0- [|1+h - 1| - 0] / h = lim [-h] / h = -1. Right-hand derivative RHD = lim h->0+ [|1+h - 1| - 0] / h = lim [h] / h = +1. Since LHD != RHD, the derivative does not exist at x = 1. Both statements are true and (R) correctly explains (A).',
        examinerNotes: 'Classic corner point test for absolute value functions.'
    },
    {
        id: 'mat-q-012',
        chapterId: 'math-3-5',
        subjectId: 'math',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'The order and degree (if defined) of the differential equation: (d^2y / dx²)³ + (dy / dx)² + sin(dy / dx) + 1 = 0 are respectively:',
        mcqOptions: [
            { key: 'A', text: 'Order = 2, Degree = 3' },
            { key: 'B', text: 'Order = 2, Degree = 1' },
            { key: 'C', text: 'Order = 2, Degree not defined' },
            { key: 'D', text: 'Order = 1, Degree = 3' }
        ],
        correctOption: 'C',
        stepRubrics: [
            { step: 'Highest order derivative is d^2y/dx², so order = 2', marks: 0.5 },
            { step: 'Equation is not a polynomial in derivatives due to sin(dy/dx), so degree is not defined', marks: 0.5 }
        ],
        modelAnswer: 'The highest order derivative appearing in the equation is d^2y / dx², so the order is 2. Because the equation contains the term sin(dy / dx), it cannot be written as a polynomial equation in derivatives. Hence, its degree is not defined. Option (C).',
        examinerNotes: 'Standard CBSE trap: degree is defined only when the differential equation is a polynomial in its derivatives.'
    },
    {
        id: 'mat-q-013',
        chapterId: 'math-4-1',
        subjectId: 'math',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'Find the projection of the vector a = 2 · i + 3 · j + 2 · k on the vector b = i + 2 · j + k.',
        stepRubrics: [
            { step: 'Formula for projection = (a . b) / |b|', marks: 1.0 },
            { step: 'Dot product a.b = 2(1) + 3(2) + 2(1) = 10 and |b| = √(1+4+1) = √(6) => Projection = 10/√(6) = (5 · √(6))/3', marks: 1.0 }
        ],
        modelAnswer: 'The projection of vector a on vector b is given by the formula:\nProjection = (a . b) / |b|\n\n1. Scalar dot product:\na . b = (2)(1) + (3)(2) + (2)(1) = 2 + 6 + 2 = 10.\n\n2. Magnitude of vector b:\n|b| = √(1² + 2² + 1²) = √(1 + 4 + 1) = √(6).\n\n3. Value of Projection:\nProjection = 10 / √(6) = (10 · √(6)) / 6 = (5 · √(6)) / 3 units.',
        examinerNotes: 'Check: projection on vector b divides by |b|, not |a|.'
    },
    {
        id: 'mat-q-014',
        chapterId: 'math-3-3',
        subjectId: 'math',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Evaluate the indefinite integral: I = integral [ dx / (x · (x⁵ + 1)) ].',
        stepRubrics: [
            { step: 'Multiply numerator and denominator by x⁴ to get x⁴ dx / [x⁵ · (x⁵ + 1)]', marks: 1.0 },
            { step: 'Substitute t = x⁵, dt = 5 · x⁴ dx to obtain (1/5) · integral [dt / (t · (t + 1))]', marks: 1.0 },
            { step: 'Partial fractions: 1 / [t(t+1)] = 1/t - 1/(t+1) and integrate to (1/5) ln|x⁵ / (x⁵ + 1)| + C', marks: 1.0 }
        ],
        modelAnswer: 'Given I = int [ dx / (x · (x⁵ + 1)) ].\n\n1. Multiply numerator and denominator by x⁴:\nI = int [ (x⁴ dx) / (x⁵ · (x⁵ + 1)) ].\n\n2. Substitute t = x⁵:\ndt = 5 · x⁴ dx => x⁴ dx = dt / 5.\n\n3. Rewrite the integral:\nI = (1 / 5) · int [ dt / (t · (t + 1)) ].\n\n4. Resolve into partial fractions:\n1 / [t · (t + 1)] = (1 / t) - [1 / (t + 1)].\n\n5. Integrate:\nI = (1 / 5) · [ int (1 / t) dt - int (1 / (t + 1)) dt ]\nI = (1 / 5) · [ ln|t| - ln|t + 1| ] + C\nI = (1 / 5) · ln | t / (t + 1) | + C.\n\n6. Back-substitute t = x⁵:\nI = (1 / 5) · ln | x⁵ / (x⁵ + 1) | + C.',
        examinerNotes: 'Multiplying by x^(n-1) is the standard high-speed method for int dx / [x(x^n + 1)].'
    },
    {
        id: 'mat-q-015',
        chapterId: 'math-4-2',
        subjectId: 'math',
        section: 'E',
        marks: 5,
        questionType: 'LA',
        questionText: 'Find the shortest distance between the lines l1 and l2 whose vector equations are:\nl1: r = (i + 2 · j + k) + λ · (i - j + k)\nl2: r = (2 · i - j - k) + μ · (2 · i + j + 2 · k)',
        stepRubrics: [
            { step: 'Identify position vectors a1, a2 and direction vectors b1, b2', marks: 1.0 },
            { step: 'Compute difference vector a2 - a1 = i - 3j - 2k', marks: 1.0 },
            { step: 'Compute cross product b1 x b2 = -3i + 0j + 3k', marks: 1.0 },
            { step: 'Compute magnitude |b1 x b2| = √(9 + 0 + 9) = 3 · √(2)', marks: 1.0 },
            { step: 'Evaluate scalar triple product and compute shortest distance = 3 / √(2) = (3 · √(2))/2 units', marks: 1.0 }
        ],
        modelAnswer: '1. Identification of Vectors:\na1 = i + 2 · j + k, b1 = i - j + k\na2 = 2 · i - j - k, b2 = 2 · i + j + 2 · k\n\n2. Vector Difference (a2 - a1):\na2 - a1 = (2 - 1)i + (-1 - 2)j + (-1 - 1)k = i - 3 · j - 2 · k.\n\n3. Cross Product (b1 x b2):\nb1 x b2 = | [i, j, k], [1, -1, 1], [2, 1, 2] |\n= i · ((-1)(2) - (1)(1)) - j · ((1)(2) - (1)(2)) + k · ((1)(1) - (-1)(2))\n= i · (-2 - 1) - j · (2 - 2) + k · (1 + 2)\n= -3 · i + 0 · j + 3 · k = -3 · i + 3 · k.\n\n4. Magnitude |b1 x b2|:\n|b1 x b2| = √((-3)² + 0² + 3²) = √(9 + 0 + 9) = √(18) = 3 · √(2).\n\n5. Scalar Triple Product (a2 - a1) . (b1 x b2):\n(i - 3 · j - 2 · k) . (-3 · i + 0 · j + 3 · k) = (1)(-3) + (-3)(0) + (-2)(3) = -3 + 0 - 6 = -9.\n\n6. Shortest Distance d:\nd = | (a2 - a1) . (b1 x b2) | / |b1 x b2|\nd = |-9| / (3 · √(2)) = 9 / (3 · √(2)) = 3 / √(2) = (3 · √(2)) / 2 units.',
        examinerNotes: 'Check: absolute value |-9| = 9 ensures distance is positive.'
    }
];
export const mathQuestionById = (id) => cbseMathQuestionBank.find(q => q.id === id);
export const mathQuestionsForSection = (section) => cbseMathQuestionBank.filter(q => q.section === section);
