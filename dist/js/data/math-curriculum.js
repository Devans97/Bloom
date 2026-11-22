import { createSource, MATH_SYLLABUS_URL, buildActivitiesForTopic } from './curriculum-builder.js';
const mathSource = (section, page = 7) => createSource('Mathematics', '041', MATH_SYLLABUS_URL, page, section, true);
export const mathTopicDefinitions = [
    // Chapter 1: Relations and Functions (math-1-1)
    {
        id: 'math-041-xii-2026-27-ch01-topic01',
        chapterId: 'math-1-1',
        subjectId: 'math',
        title: 'Types of relations: Reflexive, symmetric, transitive',
        officialScope: 'Types of relations: reflexive, symmetric, transitive and equivalence relations. One to one and onto functions.',
        source: mathSource('Class XII Course Structure, Unit I: Relations and Functions, Chapter 1', 7),
        objective: 'Test and prove whether given relations are reflexive, symmetric, transitive, and form equivalence classes.',
        minutes: 30,
        learnSteps: [
            'Define relation R on set A as a subset of Cartesian product A x A.',
            'State definition of reflexive relation: (a, a) in R for every a in A.',
            'State definition of symmetric relation: (a, b) in R implies (b, a) in R for all a, b in A.',
            'State definition of transitive relation: (a, b) in R and (b, c) in R implies (a, c) in R for all a, b, c in A.',
            'Define equivalence relation satisfying all three properties, and partition of set into disjoint equivalence classes [a].'
        ],
        practiceSteps: [
            'Prove whether relation R = {(a, b) : |a - b| is a multiple of 4} on integers is an equivalence relation.',
            'Find equivalence class [1] for modular congruence relations.',
            'Verify counterexamples disproving transitivity or symmetry in geometric line relations (parallel vs perpendicular).'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch01-topic02',
        chapterId: 'math-1-1',
        subjectId: 'math',
        title: 'Injective, surjective and bijective functions',
        officialScope: 'One to one and onto functions.',
        source: mathSource('Class XII Course Structure, Unit I: Relations and Functions, Chapter 1', 7),
        objective: 'Prove injectivity (one-one) and surjectivity (onto) algebraically for real functions.',
        minutes: 30,
        learnSteps: [
            'Define one-to-one (injective) function: f(x1) = f(x2) implies x1 = x2 for all x1, x2 in domain.',
            'Explain horizontal line test for injectivity on function graphs.',
            'Define onto (surjective) function: for every y in codomain, there exists x in domain such that f(x) = y (range equals codomain).',
            'Define bijective function as both injective and surjective.',
            'Analyze function behavior when domain/codomain changes between R, R - {0}, N, and Z.'
        ],
        practiceSteps: [
            'Show that f: R -> R given by f(x) = 3 - 4x is a bijection.',
            'Examine injectivity and surjectivity of rational functions f(x) = (x - 2) / (x - 3) on R - {3} -> R - {1}.',
            'Verify range derivation steps carefully.'
        ]
    },
    // Chapter 2: Inverse Trigonometric Functions (math-1-2)
    {
        id: 'math-041-xii-2026-27-ch02-topic01',
        chapterId: 'math-1-2',
        subjectId: 'math',
        title: 'Principal value branches and domain/range',
        officialScope: 'Definition, range, domain, principal value branch. Graphs of inverse trigonometric functions.',
        source: mathSource('Class XII Course Structure, Unit I: Relations and Functions, Chapter 2', 7),
        objective: 'State exact domain and principal value range for all 6 inverse trigonometric functions and evaluate expressions.',
        minutes: 30,
        learnSteps: [
            'Understand how restricting domain of periodic trigonometric functions enables invertibility.',
            'Master principal value branch table: sin^-1 x (domain [-1, 1], range [-π/2, π/2]), cos^-1 x (domain [-1, 1], range [0, π]), tan^-1 x (domain R, range (-π/2, π/2)).',
            'Master remaining 3 branches: cosec^-1 x (range [-π/2, π/2] - {0}), sec^-1 x (range [0, π] - {π/2}), cot^-1 x (domain R, range (0, π)).',
            'Review essential identities: sin^-1(-x) = -sin^-1 x, cos^-1(-x) = π - cos^-1 x, tan^-1(-x) = -tan^-1 x.',
            'Analyze principal value evaluations when input angles lie outside standard range (e.g. sin^-1(sin(3pi/5)) = 2pi/5).'
        ],
        practiceSteps: [
            'Evaluate numerical expressions: cos^-1(-1/2) + 2 sin^-1(1/2) + tan^-1(-sqrt(3)).',
            'Simplify composite expressions: tan(sin^-1(3/5) + cot^-1(3/2)).',
            'Verify that answers strictly lie inside the specified principal value branch intervals.'
        ]
    },
    // Chapter 3: Matrices (math-2-1)
    {
        id: 'math-041-xii-2026-27-ch03-topic01',
        chapterId: 'math-2-1',
        subjectId: 'math',
        title: 'Matrix operations and transpose',
        officialScope: 'Concept, notation, order, equality, types of matrices, zero and identity matrix, transpose of a matrix, symmetric and skew symmetric matrices. Operation on matrices: Addition and multiplication and multiplication with a scalar. Simple properties of addition, multiplication and scalar multiplication. Non-commutativity of multiplication of matrices and existence of non-zero matrices whose product is the zero matrix (restrict to square matrices of order 2).',
        source: mathSource('Class XII Course Structure, Unit II: Algebra, Chapter 3: Matrices', 7),
        objective: 'Perform matrix addition, scalar multiplication, matrix multiplication, and verify transpose properties.',
        minutes: 35,
        learnSteps: [
            'Define matrix order m x n, row/column/diagonal/scalar/identity/zero matrices, and equality of matrices.',
            'Matrix multiplication condition: number of columns in A must equal number of rows in B; product AB is generally non-commutative (AB ≠ BA).',
            'Define transpose Aᵀ or A\' and verify properties: (Aᵀ)^T = A, (kA)^T = k · Aᵀ, (A + B)^T = Aᵀ + Bᵀ, (AB)ᵀ = Bᵀ · Aᵀ.',
            'Define symmetric matrix (Aᵀ = A) and skew-symmetric matrix (Aᵀ = -A, all principal diagonal elements must be 0).',
            'Prove that any square matrix can be uniquely expressed as sum of a symmetric matrix 1/2(A + Aᵀ) and skew-symmetric matrix 1/2(A - Aᵀ).'
        ],
        practiceSteps: [
            'Express a given 3x3 square matrix as the sum of a symmetric and skew-symmetric matrix.',
            'Compute matrix powers A² and verify polynomial identities like A² - 5A + 7I = 0.',
            'Check matrix dimensions and index arithmetic.'
        ]
    },
    // Chapter 4: Determinants (math-2-2)
    {
        id: 'math-041-xii-2026-27-ch04-topic01',
        chapterId: 'math-2-2',
        subjectId: 'math',
        title: 'Determinant evaluation, minors and cofactors',
        officialScope: 'Determinant of a square matrix (up to 3 x 3 matrices), minors, co-factors and applications of determinants in finding the area of a triangle. Adjoint and inverse of a square matrix.',
        source: mathSource('Class XII Course Structure, Unit II: Algebra, Chapter 4: Determinants', 7),
        objective: 'Evaluate 3x3 determinants, compute minors and cofactors, and calculate triangle area and matrix adjoint.',
        minutes: 35,
        learnSteps: [
            'Evaluate 3x3 determinant by expanding along any row or column using sign pattern (+ - +).',
            'Define minor Mij as determinant of submatrix obtained by deleting ith row and jth column.',
            'Define cofactor Aij = (-1)^(i+j) · Mij and prove expansion theorem: sum of elements of any row multiplied with cofactors of any other row is zero.',
            'Calculate area of triangle with vertices (x1, y1), (x2, y2), (x3, y3) using determinant formula Δ = 1/2 · det[[x1,y1,1],[x2,y2,1],[x3,y3,1]], and collinearity condition Δ = 0.',
            'Define adjoint of square matrix adj(A) as transpose of cofactor matrix, and verify identity: A · adj(A) = adj(A) · A = |A| · I.'
        ],
        practiceSteps: [
            'Calculate area of triangles and determine values of unknown vertex coordinate k for collinear points.',
            'Find adjoint of 2x2 and 3x3 matrices and verify A · adj(A) = |A| · I.',
            'Compute determinant values using cofactor expansions.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch04-topic02',
        chapterId: 'math-2-2',
        subjectId: 'math',
        title: 'Matrix inversion and systems of linear equations',
        officialScope: 'Consistency, inconsistency and number of solutions of system of linear equations by examples, solving system of linear equations in two or three variables (having unique solution) using inverse of a matrix.',
        source: mathSource('Class XII Course Structure, Unit II: Algebra, Chapter 4: Determinants', 7),
        objective: 'Calculate A⁻¹ = (1/|A|) · adj(A) for non-singular matrices and solve 3-variable linear systems via matrix method.',
        minutes: 35,
        learnSteps: [
            'Define singular matrix (|A| = 0) and non-singular matrix (|A| ≠ 0).',
            'State formula for inverse of non-singular matrix: A⁻¹ = (1 / |A|) · adj(A), proving A · A⁻¹ = I and (AB)^-1 = B⁻¹ · A⁻¹.',
            'Express system of 3 linear equations a1 x + b1 y + c1 z = d1 etc. in matrix form: AX = B.',
            'Solve system: X = A⁻¹ · B when |A| ≠ 0, ensuring unique solution.',
            'Analyze consistency criteria: if |A| = 0 and (adj A) · B ≠ 0, system is inconsistent (no solution); if |A| = 0 and (adj A) · B = 0, system may be consistent with infinitely many solutions or inconsistent.'
        ],
        practiceSteps: [
            'Solve systems of 3 linear equations with 3 variables using matrix inversion method.',
            'Find A⁻¹ from given matrix equation A² - 4A - 5I = O by pre-multiplying by A⁻¹.',
            'Cross-check final values of x, y, z by back-substitution into original equations.'
        ]
    },
    // Chapter 5: Continuity and Differentiability (math-3-1)
    {
        id: 'math-041-xii-2026-27-ch05-topic01',
        chapterId: 'math-3-1',
        subjectId: 'math',
        title: 'Continuity and differentiability fundamentals',
        officialScope: 'Continuity and differentiability, derivative of composite functions, chain rule, derivative of inverse trigonometric functions, derivative of implicit functions.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 5', 8),
        objective: 'Test continuity at points and intervals, apply chain rule, and differentiate implicit and inverse trig functions.',
        minutes: 35,
        learnSteps: [
            'Define continuity at x = c: lim(x->c-) f(x) = lim(x->c+) f(x) = f(c).',
            'Explain algebra of continuous functions and continuity of polynomial, rational, and trigonometric functions.',
            'Define differentiability at x = c as existence of finite Left Hand Derivative (LHD) equal to Right Hand Derivative (RHD); prove differentiability implies continuity.',
            'Apply Chain Rule for derivative of composite functions: d/dx [f(g(x))] = f\'(g(x)) · g\'(x).',
            'Differentiate implicit relations f(x, y) = 0 by taking d/dx on both sides and solving for dy/dx.',
            'Differentiate standard inverse trigonometric functions using trigonometric substitutions (e.g. x = tan θ).'
        ],
        practiceSteps: [
            'Find values of constants k or a, b such that piecewise defined function is continuous everywhere.',
            'Find dy/dx for implicit relations like x³ + y³ = 3axy or sin² x + cos² y = 1.',
            'Differentiate y = tan^-1((3x - x³)/(1 - 3x²)) using substitution x = tan θ.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch05-topic02',
        chapterId: 'math-3-1',
        subjectId: 'math',
        title: 'Logarithmic, parametric and second order differentiation',
        officialScope: 'Concept of exponential and logarithmic functions. Derivatives of logarithmic and exponential functions. Logarithmic differentiation, derivative of functions expressed in parametric forms, second order derivatives.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 5', 8),
        objective: 'Execute logarithmic differentiation, find derivatives of parametric equations, and compute d^2y/dx².',
        minutes: 35,
        learnSteps: [
            'Review properties of exponential e^x and natural logarithm ln x: d/dx(e^x) = e^x, d/dx(a^x) = a^x · ln a, d/dx(ln x) = 1/x.',
            'Apply Logarithmic Differentiation for variable base and variable exponent functions [u(x)]^[v(x)] and complicated products/quotients.',
            'Differentiate parametric curves x = f(t), y = g(t): dy/dx = (dy/dt) / (dx/dt) where dx/dt ≠ 0.',
            'Compute Second Order Derivative d^2y/dx²: for parametric forms, d^2y/dx² = d/dt(dy/dx) · (dt/dx).',
            'Verify standard differential identities involving y, y\', and y\'\'.'
        ],
        practiceSteps: [
            'Differentiate y = (sin x)^x + x^(sin x) with respect to x by splitting into u + v.',
            'Find d^2y/dx² at θ = π/4 for cycloid x = a(θ - sin θ), y = a(1 - cos θ).',
            'If y = (tan^-1 x)², prove that (x² + 1)² y2 + 2x(x² + 1) y1 = 2.'
        ]
    },
    // Chapter 6: Applications of Derivatives (math-3-2)
    {
        id: 'math-041-xii-2026-27-ch06-topic01',
        chapterId: 'math-3-2',
        subjectId: 'math',
        title: 'Rate of change and increasing/decreasing functions',
        officialScope: 'Applications of derivatives: rate of change of bodies, increasing/decreasing functions.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 6', 8),
        objective: 'Calculate rates of change of geometric quantities and determine intervals where functions strictly increase/decrease.',
        minutes: 30,
        learnSteps: [
            'Interpret dy/dx as instantaneous rate of change of y with respect to x; apply related rates dy/dt = (dy/dx) · (dx/dt).',
            'Solve geometric rate problems: expanding spheres (dV/dt vs dr/dt), water filling conical vessels, ladder sliding down a wall.',
            'Define strictly increasing function on (a, b): f\'(x) > 0 for all x in (a, b).',
            'Define strictly decreasing function on (a, b): f\'(x) < 0 for all x in (a, b).',
            'Find critical points where f\'(x) = 0 or f\'(x) is undefined, and partition the domain into disjoint monotonic intervals.'
        ],
        practiceSteps: [
            'Find rate at which surface area of a spherical balloon increases when radius increases at 2 cm/s.',
            'Find intervals on which f(x) = 2x³ - 9x² + 12x + 15 is strictly increasing or decreasing.',
            'Determine intervals of monotonicity for trigonometric functions on specified domains.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch06-topic02',
        chapterId: 'math-3-2',
        subjectId: 'math',
        title: 'Maxima and minima with optimization problems',
        officialScope: 'Maxima and minima (first derivative test motivated geometrically and second derivative test given as a provable tool). Simple problems (that illustrate basic principles and understanding of the subject as well as real-life situations).',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 6', 8),
        objective: 'Apply First and Second Derivative Tests to find local and absolute extrema, and solve real-life optimization problems.',
        minutes: 35,
        learnSteps: [
            'Define local maximum, local minimum, and stationary/critical points where f\'(c) = 0.',
            'Explain First Derivative Test: if f\'(x) changes sign from positive to negative through c, c is a local maximum; if negative to positive, local minimum; if no sign change, point of inflection.',
            'Apply Second Derivative Test: if f\'(c) = 0 and f\'\'(c) < 0, local maximum; if f\'\'(c) > 0, local minimum; if f\'\'(c) = 0, test fails and use first derivative test.',
            'Find absolute (global) extrema on closed interval [a, b] by comparing values of f(x) at critical points and boundary endpoints.',
            'Solve real-life word problems: maximizing volume of open box cut from rectangular sheet, cylinder inscribed in cone, wire cut into circle and square.'
        ],
        practiceSteps: [
            'Prove that the surface area of a closed cylinder of given volume is least when its height equals diameter of its base.',
            'Find dimensions of largest rectangle that can be inscribed in a circle of radius R.',
            'Find absolute maximum and minimum values of f(x) = 2x³ - 15x² + 36x + 1 on [1, 5].'
        ]
    },
    // Chapter 7: Integrals (math-3-3)
    {
        id: 'math-041-xii-2026-27-ch07-topic01',
        chapterId: 'math-3-3',
        subjectId: 'math',
        title: 'Indefinite integrals: Substitution and parts',
        officialScope: 'Integration as inverse process of differentiation. Integration of a variety of functions by substitution, by partial fractions and by parts, Evaluation of simple integrals of standard forms.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 7', 8),
        objective: 'Integrate algebraic, trigonometric, and exponential functions using substitution, partial fractions, and integration by parts.',
        minutes: 35,
        learnSteps: [
            'Define indefinite integration as anti-derivative process with arbitrary constant C.',
            'Method of Substitution: transform integral by setting u = g(x) and du = g\'(x) dx.',
            'Integrate trigonometric functions: tan x, cot x, sec x, cosec x, and use trigonometric identities for sin² x, cos³ x, sin(ax)cos(bx).',
            'Integration by Partial Fractions for rational functions P(x)/Q(x): non-repeated linear factors A/(x-a), repeated linear factors B/(x-a)², and quadratic factors (Ax+B)/(x²+bx+c).',
            'Integration by Parts: integral u · v dx = u · integral v dx - integral [u\' · integral v dx] dx using ILATE priority rule (Inverse, Logarithmic, Algebraic, Trigonometric, Exponential).',
            'Evaluate special integrals: integral e^x · [f(x) + f\'(x)] dx = e^x · f(x) + C.'
        ],
        practiceSteps: [
            'Evaluate standard quadratic integrals: dx / (x² - a²), dx / sqrt(a² - x²), dx / (ax² + bx + c).',
            'Evaluate integrals using partial fractions: (2x - 1) / ((x - 1)(x + 2)(x - 3)) dx.',
            'Evaluate integrals by parts: x · tan^-1 x dx and e^x · sin x dx.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch07-topic02',
        chapterId: 'math-3-3',
        subjectId: 'math',
        title: 'Definite integrals and fundamental properties',
        officialScope: 'Fundamental Theorem of Calculus (without proof). Basic properties of definite integrals and evaluation of definite integrals.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 7', 8),
        objective: 'Apply the Fundamental Theorem of Calculus and essential properties (P0 to P7) to evaluate definite integrals.',
        minutes: 35,
        learnSteps: [
            'State Fundamental Theorem of Calculus: integral from a to b f(x) dx = F(b) - F(a) where F\'(x) = f(x).',
            'Master King’s Property (P4): integral from 0 to a f(x) dx = integral from 0 to a f(a - x) dx, and general form integral from a to b f(x) dx = integral from a to b f(a + b - x) dx.',
            'Symmetry property for even and odd functions: integral from -a to a f(x) dx = 2 · integral from 0 to a f(x) dx (if even) and 0 (if odd: f(-x) = -f(x)).',
            'Periodic doubling property: integral from 0 to 2a f(x) dx = 2 · integral from 0 to a f(x) dx if f(2a - x) = f(x), and 0 if f(2a - x) = -f(x).',
            'Modulus function integration: split integral across intervals where argument changes sign.'
        ],
        practiceSteps: [
            'Evaluate integral from 0 to π/2 (sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))) dx using P4.',
            'Evaluate integral from 0 to π (x · sin x / (1 + cos² x)) dx by applying King’s property.',
            'Evaluate integral from -1 to 2 |x³ - x| dx by splitting integration limits at zeros.'
        ]
    },
    // Chapter 8: Applications of Integrals (math-3-4)
    {
        id: 'math-041-xii-2026-27-ch08-topic01',
        chapterId: 'math-3-4',
        subjectId: 'math',
        title: 'Area under simple curves',
        officialScope: 'Applications in finding the area under simple curves, especially lines, circles/ parabolas/ellipses (in standard form only).',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 8', 8),
        objective: 'Sketch curves and calculate bounded area using vertical and horizontal strip integration.',
        minutes: 35,
        learnSteps: [
            'Understand area under curve y = f(x) between x = a and x = b as limit of sum: Area = integral from a to b y dx.',
            'Understand horizontal strip integration: Area = integral from c to d x dy for curves x = g(y).',
            'Derive standard area of circle x² + y² = a² (Area = π · a²) and ellipse x²/a² + y²/b² = 1 (Area = π · a · b) by integrating quadrant area multiplied by 4.',
            'Calculate area bounded by parabola y² = 4ax and latus rectum x = a or line y = mx.',
            'Always sketch the region, identify points of intersection, shade bounded region, and indicate strip orientation.'
        ],
        practiceSteps: [
            'Find area of region bounded by ellipse x²/16 + y²/9 = 1 in the first quadrant and total area.',
            'Find area enclosed by parabola y = x² and line y = 4.',
            'Verify integration limits and non-negative geometric area values.'
        ]
    },
    // Chapter 9: Differential Equations (math-3-5)
    {
        id: 'math-041-xii-2026-27-ch09-topic01',
        chapterId: 'math-3-5',
        subjectId: 'math',
        title: 'Order, degree and variable separable method',
        officialScope: 'Definition, order and degree, general and particular solutions of a differential equation. Solution of differential equations by method of separation of variables.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 9', 8),
        objective: 'Determine order and degree, find general/particular solutions, and solve DEs via separation of variables.',
        minutes: 30,
        learnSteps: [
            'Define differential equation, order (highest order derivative appearing), and degree (power of highest derivative when equation is polynomial in derivatives).',
            'Differentiate general solution (contains arbitrary constants equal to order of DE) from particular solution (constants determined by initial boundary conditions).',
            'Method of Separation of Variables: rewrite equation in form f(x) dx = g(y) dy and integrate both sides directly.',
            'Apply to exponential growth and decay models and orthogonal trajectories.'
        ],
        practiceSteps: [
            'Determine order and degree of d^2y/dx² + sin(dy/dx) = 0 (degree not defined) and (d^2y/dx²)² + (dy/dx)³ = y.',
            'Find particular solution of dy/dx = -4x y² given y(0) = 1.',
            'Solve DE: log(dy/dx) = ax + by.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch09-topic02',
        chapterId: 'math-3-5',
        subjectId: 'math',
        title: 'Homogeneous and linear differential equations',
        officialScope: 'Solutions of homogeneous differential equations of first order and first degree. Solutions of linear differential equation of the type: dy/dx + py = q, where p and q are functions of x or constants.',
        source: mathSource('Class XII Course Structure, Unit III: Calculus, Chapter 9', 8),
        objective: 'Solve first order homogeneous DEs via y = vx and linear DEs using integrating factor IF = exp(integral P dx).',
        minutes: 35,
        learnSteps: [
            'Define homogeneous function f(λ · x, λ · y) = λ^n · f(x, y) of degree n.',
            'Solve homogeneous DE dy/dx = F(y/x) by substituting y = v · x so dy/dx = v + x · dv/dx, reducing to separable variables in v and x.',
            'Identify first-order Linear Differential Equation: dy/dx + P(x) · y = Q(x).',
            'Derive Integrating Factor: IF = e^(integral P(x) dx).',
            'Write general solution: y · (IF) = integral [Q(x) · (IF)] dx + C.',
            'Review alternate linear form: dx/dy + P1(y) · x = Q1(y) with IF = e^(integral P1(y) dy).'
        ],
        practiceSteps: [
            'Solve homogeneous DE: (x² + y²) dx - 2xy dy = 0 given y(1) = 0.',
            'Solve linear DE: dy/dx + y · cot x = 2x + x² · cot x (x ≠ 0).',
            'Solve linear DE: (1 + x²) dy/dx + 2xy = 1 / (1 + x²).'
        ]
    },
    // Chapter 10: Vector Algebra (math-4-1)
    {
        id: 'math-041-xii-2026-27-ch10-topic01',
        chapterId: 'math-4-1',
        subjectId: 'math',
        title: 'Vector operations, direction ratios and dot product',
        officialScope: 'Vectors and scalars, magnitude and direction of a vector. Direction cosines and direction ratios of a vector. Types of vectors (equal, unit, zero, parallel and collinear vectors), position vector of a point, negative of a vector, components of a vector, addition of vectors, multiplication of a vector by a scalar, position vector of a point dividing a line segment in a given ratio. Definition, Geometrical Interpretation, properties and application of scalar (dot) product of vectors.',
        source: mathSource('Class XII Course Structure, Unit IV: Vectors and 3D Geometry, Chapter 10', 9),
        objective: 'Compute vector magnitudes, unit vectors, direction cosines, and dot product with projections.',
        minutes: 35,
        learnSteps: [
            'Represent vector in component form a = a1 i + a2 j + a3 k with magnitude |a| = sqrt(a1² + a2² + a3²).',
            'Define direction cosines l = cos alpha, m = cos beta, n = cos gamma satisfying l² + m² + n² = 1, and direction ratios (a, b, c) proportional to (l, m, n).',
            'Vector addition triangle/parallelogram law, section formula for internal/external division.',
            'Define Scalar (Dot) Product: a · b = |a| · |b| · cos θ = a1 · b1 + a2 · b2 + a3 · b3.',
            'Orthogonality condition: a · b = 0 for non-zero perpendicular vectors.',
            'Projection of vector a on vector b: proj_b(a) = (a · b) / |b|.'
        ],
        practiceSteps: [
            'Find angle between two vectors and verify if given vectors form vertices of a right-angled triangle.',
            'Calculate projection of vector a = 2i + 3j + 2k on b = i + 2j + k.',
            'Find unit vector in direction of resultant of two vectors.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch10-topic02',
        chapterId: 'math-4-1',
        subjectId: 'math',
        title: 'Vector cross product and area applications',
        officialScope: 'Vector (cross) product of vectors.',
        source: mathSource('Class XII Course Structure, Unit IV: Vectors and 3D Geometry, Chapter 10', 9),
        objective: 'Evaluate vector cross product using determinants and calculate areas of triangles and parallelograms.',
        minutes: 30,
        learnSteps: [
            'Define Vector (Cross) Product: a x b = |a| · |b| · sin θ · n_hat where n_hat is unit vector normal to plane of a and b following right-hand screw rule.',
            'Cross product properties: anti-commutative (a x b = -b x a), a x a = 0, collinearity condition a x b = 0.',
            'Evaluate cross product via determinant: a x b = det[[i, j, k], [a1, a2, a3], [b1, b2, b3]].',
            'Area of parallelogram with adjacent sides a and b: Area = |a x b|.',
            'Area of parallelogram with diagonals d1 and d2: Area = 1/2 · |d1 x d2|.',
            'Area of triangle with adjacent sides a and b: Area = 1/2 · |a x b|.'
        ],
        practiceSteps: [
            'Find a unit vector perpendicular to both vectors a = i + j + k and b = i + 2j + 3k.',
            'Calculate area of triangle with vertices A(1, 1, 2), B(2, 3, 5), C(1, 5, 5).',
            'Prove Lagrange’s identity: |a x b|² = |a|² |b|² - (a · b)².'
        ]
    },
    // Chapter 11: Three-Dimensional Geometry (math-4-2)
    {
        id: 'math-041-xii-2026-27-ch11-topic01',
        chapterId: 'math-4-2',
        subjectId: 'math',
        title: 'Direction cosines and line equations',
        officialScope: 'Direction cosines and direction ratios of a line joining two points. Cartesian equation and vector equation of a line, angle between two lines.',
        source: mathSource('Class XII Course Structure, Unit IV: Vectors and 3D Geometry, Chapter 11', 9),
        objective: 'Write vector and Cartesian equations of lines in 3D and calculate angle between two intersecting/skew lines.',
        minutes: 35,
        learnSteps: [
            'Calculate direction ratios of line passing through points P(x1, y1, z1) and Q(x2, y2, z2): (x2 - x1, y2 - y1, z2 - z1).',
            'Vector equation of line passing through point with position vector a and parallel to vector b: r = a + λ · b.',
            'Cartesian symmetric form: (x - x1) / a = (y - y1) / b = (z - z1) / c.',
            'Equation of line passing through two points: (x - x1) / (x2 - x1) = (y - y1) / (y2 - y1) = (z - z1) / (z2 - z1).',
            'Angle θ between two lines with direction vectors b1 and b2: cos θ = |b1 · b2| / (|b1| · |b2|); perpendicular when a1 · a2 + b1 · b2 + c1 · c2 = 0; parallel when a1/a2 = b1/b2 = c1/c2.'
        ],
        practiceSteps: [
            'Convert line equation from vector form to Cartesian symmetric form and vice versa.',
            'Find coordinates of foot of perpendicular drawn from point P(1, 2, 3) to given line.',
            'Determine angle between two given spatial lines.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch11-topic02',
        chapterId: 'math-4-2',
        subjectId: 'math',
        title: 'Shortest distance between skew and parallel lines',
        officialScope: 'Coplanar and skew lines, shortest distance between two lines.',
        source: mathSource('Class XII Course Structure, Unit IV: Vectors and 3D Geometry, Chapter 11', 9),
        objective: 'Calculate shortest distance between skew lines and parallel lines in vector and Cartesian form.',
        minutes: 35,
        learnSteps: [
            'Define skew lines as spatial lines that are neither parallel nor intersecting and lie in non-coplanar planes.',
            'Derive shortest distance formula between skew lines r = a1 + λ · b1 and r = a2 + μ · b2: d = |(b1 x b2) · (a2 - a1)| / |b1 x b2|.',
            'State condition for two lines to intersect (coplanarity condition): (b1 x b2) · (a2 - a1) = 0.',
            'Derive shortest distance between parallel lines r = a1 + λ · b and r = a2 + μ · b: d = |b x (a2 - a1)| / |b|.'
        ],
        practiceSteps: [
            'Find shortest distance between lines r = (i + 2j + k) + λ(i - j + k) and r = (2i - j - k) + μ(2i + j + 2k).',
            'Verify if two given spatial lines intersect and determine their coordinates of intersection.',
            'Calculate distance between parallel lines given in symmetric Cartesian form.'
        ]
    },
    // Chapter 12: Linear Programming (math-5-1)
    {
        id: 'math-041-xii-2026-27-ch12-topic01',
        chapterId: 'math-5-1',
        subjectId: 'math',
        title: 'Linear programming and corner point method',
        officialScope: 'Introduction, related terminology such as constraints, objective function, optimization, graphical method of solution for problems in two variables, feasible and infeasible regions (bounded or unbounded), feasible and infeasible solutions, optimal feasible solutions (up to three non-trivial constraints).',
        source: mathSource('Class XII Course Structure, Unit V: Linear Programming, Chapter 12', 9),
        objective: 'Formulate LPP, plot linear constraints, identify feasible regions, and find optimal solutions using corner points.',
        minutes: 35,
        learnSteps: [
            'Define objective function Z = ax + by to be maximized or minimized subject to linear inequalities (constraints) and non-negativity restrictions x >= 0, y >= 0.',
            'Graph linear inequalities on Cartesian plane by drawing boundary lines and testing origin (0, 0) for half-planes.',
            'Identify Feasible Region as common intersection region satisfying all constraints.',
            'State Fundamental Theorems of LPP: optimal solution occurs at corner points (vertices) of feasible region.',
            'Corner Point Method for bounded regions: compute value of Z at each corner point to identify maximum and minimum.',
            'Unbounded feasible region condition: M is maximum of Z if open half plane ax + by > M has no points in common with feasible region.'
        ],
        practiceSteps: [
            'Solve LPP graphically: Maximize Z = 4x + y subject to x + y <= 50, 3x + y <= 90, x >= 0, y >= 0.',
            'Solve minimization problem with unbounded feasible region and test half-plane condition.',
            'Formulate diet or manufacturing optimization problem from word statements.'
        ]
    },
    // Chapter 13: Probability (math-6-1)
    {
        id: 'math-041-xii-2026-27-ch13-topic01',
        chapterId: 'math-6-1',
        subjectId: 'math',
        title: 'Conditional probability and multiplication theorem',
        officialScope: 'Conditional probability, multiplication theorem on probability, independent events, total probability, Bayes’ theorem.',
        source: mathSource('Class XII Course Structure, Unit VI: Probability, Chapter 13', 9),
        objective: 'Calculate conditional probabilities P(A|B), apply multiplication theorem, and test independent events.',
        minutes: 35,
        learnSteps: [
            'Define Conditional Probability P(A|B) = P(A ∩ B) / P(B) where P(B) > 0.',
            'Multiplication Theorem on Probability: P(A ∩ B) = P(A) · P(B|A) = P(B) · P(A|B).',
            'Define Independent Events: occurrence of one does not affect probability of other: P(A|B) = P(A), implying P(A ∩ B) = P(A) · P(B).',
            'Contrast mutually exclusive events (A ∩ B = phi, P(A ∩ B) = 0) with independent events.',
            'Prove theorem: if events A and B are independent, then A and B\', A\' and B, and A\' and B\' are also independent.'
        ],
        practiceSteps: [
            'Given P(A) = 3/5, P(B) = 1/5, find P(A ∩ B) if A and B are independent events.',
            'Calculate probability that a problem is solved when two students try it independently with probabilities 1/2 and 1/3.',
            'Evaluate conditional probabilities in dice and card experiment scenarios.'
        ]
    },
    {
        id: 'math-041-xii-2026-27-ch13-topic02',
        chapterId: 'math-6-1',
        subjectId: 'math',
        title: 'Bayes’ theorem and total probability',
        officialScope: 'Total probability, Bayes’ theorem, Random variable and its probability distribution, mean of a random variable.',
        source: mathSource('Class XII Course Structure, Unit VI: Probability, Chapter 13', 9),
        objective: 'Apply the Theorem of Total Probability and Bayes’ Theorem to compute posterior probabilities.',
        minutes: 35,
        learnSteps: [
            'Define partition of sample space: pairwise disjoint events E1, E2, ..., En whose union equals S with P(Ei) > 0.',
            'Theorem of Total Probability: for any event A, P(A) = sum_{i=1}^n P(Ei) · P(A|Ei).',
            'Bayes’ Theorem for posterior probability: P(Ei|A) = (P(Ei) · P(A|Ei)) / (sum_{j=1}^n P(Ej) · P(A|Ej)).',
            'Define Random Variable X and its probability distribution table satisfying sum P(X = xi) = 1.',
            'Calculate Mean (mathematical expectation) of discrete random variable: μ = E(X) = sum xi · P(xi).'
        ],
        practiceSteps: [
            'Solve classic Bayes’ theorem problem: factory items manufactured by 3 machines with given defect percentages, finding probability defective item came from machine 2.',
            'Construct probability distribution for number of aces obtained in two draws from a deck of cards without replacement, and compute mean.',
            'Verify prior and likelihood calculations carefully.'
        ]
    }
];
export const mathTopicNodes = mathTopicDefinitions.map(def => ({
    id: def.id,
    subjectId: def.subjectId,
    chapterId: def.chapterId,
    parentId: def.chapterId,
    kind: 'topic',
    title: def.title,
    officialScope: def.officialScope,
    source: def.source
}));
export const mathActivityDefinitions = mathTopicDefinitions.flatMap(def => {
    const node = mathTopicNodes.find(n => n.id === def.id);
    return buildActivitiesForTopic(node, {
        learnSteps: def.learnSteps,
        practiceSteps: def.practiceSteps,
        objective: def.objective,
        minutes: def.minutes
    });
});
