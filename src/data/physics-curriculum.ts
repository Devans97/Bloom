import type { AcademicNode, ActivityDefinition } from '../academic-data-types.js';
import { createSource, PHYSICS_SYLLABUS_URL, buildActivitiesForTopic, type TopicDef } from './curriculum-builder.js';

const physicsSource = (section: string, page: number = 12) =>
  createSource('Physics', '042', PHYSICS_SYLLABUS_URL, page, section, true);

export const physicsTopicDefinitions: TopicDef[] = [
  // Chapter 1: Electric Charges and Fields (physics-1-1)
  {
    id: 'physics-042-xii-2026-27-ch01-topic01',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Electric charge and conservation',
    officialScope: 'Electric charges; conservation of charge.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'Explain electric charge and the prescribed conservation of charge in your own words.',
    minutes: 20,
    learnSteps: [
      'Open the current prescribed NCERT Class XII Physics text and locate the section on electric charge properties.',
      'Identify the fundamental properties of electric charge: quantization, additivity, and conservation.',
      'Read the prescribed statement about conservation of charge and analyze closed system examples like beta decay or pair annihilation.',
      'Close the textbook and write an explanation of conservation of charge in your own words.'
    ],
    practiceSteps: [
      'Choose one teacher-assigned or NCERT question that directly concerns charge or conservation.',
      'Write the relevant information and explain which conservation idea applies before calculating or answering.',
      'Attempt the question independently, then compare with the solution in your NCERT text.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch01-topic02',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Coulomb’s law and superposition',
    officialScope: 'Force between two point charges; forces between multiple charges; superposition principle; continuous charge distribution.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'Use Coulomb’s law and superposition to reason about the force between point charges.',
    minutes: 35,
    learnSteps: [
      'Find the prescribed NCERT section for force between two point charges in vacuum and in a dielectric medium.',
      'List the quantities and units in Coulomb’s law, noting the permittivity of free space epsilon-zero.',
      'Compare the vector form of Coulomb’s law for like and unlike charges using a labelled sketch.',
      'For multiple charges, explain how the superposition principle sums pairwise forces vectorially.'
    ],
    practiceSteps: [
      'Select one teacher-assigned or NCERT question on point-charge force or superposition.',
      'Draw the charge arrangement, resolve components along coordinate axes, and sum net forces.',
      'Solve independently, verify SI units and direction vectors, then record any error or doubt.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch01-topic03',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Electric field and field lines',
    officialScope: 'Electric field; field due to a point charge; electric field lines.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'Interpret the electric field due to a point charge and represent its direction with field lines.',
    minutes: 30,
    learnSteps: [
      'Read the prescribed sections on electric field intensity as force per unit positive test charge.',
      'Derive the electric field expression E = q / (4πε₀ · r²) due to an isolated point charge.',
      'Review the key properties of electric field lines: continuous curves, never intersect, normal to conductor surfaces.',
      'Sketch field line patterns for a positive charge, negative charge, equal and opposite dipole, and two identical charges.'
    ],
    practiceSteps: [
      'Choose one teacher-assigned or NCERT question on electric field due to a system of point charges.',
      'Identify source charges, target coordinates, and vector field directions before computing.',
      'Attempt the calculation, check units (N/C or V/m), and record the result.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch01-topic04',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Electric dipole',
    officialScope: 'Electric dipole; field due to a dipole; torque on a dipole in a uniform electric field.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'Describe electric dipole quantities and derive its field on axial and equatorial lines, plus torque in uniform fields.',
    minutes: 30,
    learnSteps: [
      'Read the prescribed explanation of an electric dipole and dipole moment vector p = q · 2a pointing from -q to +q.',
      'Study the derivations for electric field at an axial point and an equatorial point for a short dipole.',
      'Analyze the torque tau = p x E acting on a dipole in a uniform electric field and identify stable and unstable equilibrium.',
      'Sketch the dipole orientation showing torque direction using the right-hand thumb rule.'
    ],
    practiceSteps: [
      'Select one teacher-assigned question on dipole axial/equatorial fields or torque in uniform E-field.',
      'State the short dipole approximation condition (r >> a) before substituting formulas.',
      'Solve independently and cross-check dimensional consistency.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch01-topic05',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Electric flux and Gauss’s theorem',
    officialScope: 'Electric flux; statement of Gauss’s theorem.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'State the syllabus-listed Gauss theorem and compute surface flux integrals.',
    minutes: 25,
    learnSteps: [
      'Read the definition of electric flux Phi = integral E · dA through an oriented surface element.',
      'State Gauss’s theorem precisely: total electric flux through any closed surface equals 1/ε₀ times net enclosed charge.',
      'Analyze how Gauss’s theorem holds for any arbitrary closed Gaussian surface regardless of its shape.',
      'Contrast flux through closed surfaces enclosing zero net charge versus non-zero net charge.'
    ],
    practiceSteps: [
      'Choose an NCERT question calculating flux through faces of a cube or cylinder with an internal charge.',
      'Draw the Gaussian surface and indicate the angle between E and area vector dA on each face.',
      'Compute flux and verify against Gauss’s law prediction.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch01-topic06',
    chapterId: 'physics-1-1',
    subjectId: 'physics',
    title: 'Applications of Gauss’s theorem',
    officialScope: 'Field due to an infinitely long straight wire, a uniformly charged infinite plane sheet, and a uniformly charged thin spherical shell (field inside and outside).',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 1: Electric Charges and Fields', 12),
    objective: 'Apply Gauss’s theorem to derive fields of an infinite wire, infinite plane sheet, and thin spherical shell.',
    minutes: 35,
    learnSteps: [
      'Review symmetry arguments and Gaussian surface selection for cylindrical and planar charge distributions.',
      'Derive field due to infinitely long straight wire of linear charge density λ: E = λ / (2πε₀ · r).',
      'Derive field due to uniformly charged infinite plane sheet of surface charge density σ: E = σ / (2 · ε₀).',
      'Derive field of uniformly charged thin spherical shell: zero inside (r < R), and E = q / (4πε₀ · r²) outside (r >= R).'
    ],
    practiceSteps: [
      'Select a CBSE board derivation question on one of the three standard symmetric Gaussian surfaces.',
      'Write the complete derivation with labelled diagram, symmetry justification, and integration steps.',
      'Check that the shell graph (E vs r) correctly shows discontinuity at the surface.'
    ]
  },

  // Chapter 2: Electrostatic Potential and Capacitance (physics-1-2)
  {
    id: 'physics-042-xii-2026-27-ch02-topic01',
    chapterId: 'physics-1-2',
    subjectId: 'physics',
    title: 'Electric potential and potential difference',
    officialScope: 'Electric potential, potential difference, electric potential due to a point charge, a dipole and system of charges.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 2: Electrostatic Potential and Capacitance', 12),
    objective: 'Define electric potential and derive potential due to a point charge, dipole, and multiple charges.',
    minutes: 30,
    learnSteps: [
      'Define electric potential V as external work required to bring a unit positive test charge from infinity to that point.',
      'Derive the potential due to a single point charge: V = q / (4πε₀ · r).',
      'Derive potential due to an electric dipole: V = (p · cos θ) / (4πε₀ · r²), showing V = 0 on the equatorial plane.',
      'State the principle of superposition for scalar potential of multiple discrete charges.'
    ],
    practiceSteps: [
      'Attempt NCERT problems calculating net potential at the center of regular polygons with corner charges.',
      'Verify that electric potential is a scalar quantity and algebraic signs of charges are retained.',
      'Check units (volts or Joules per Coulomb) and record any misconception.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch02-topic02',
    chapterId: 'physics-1-2',
    subjectId: 'physics',
    title: 'Equipotential surfaces and potential energy',
    officialScope: 'Equipotential surfaces, electrical potential energy of a system of two point charges and of electric dipole in an electrostatic field.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 2: Electrostatic Potential and Capacitance', 12),
    objective: 'Draw equipotential surfaces and calculate potential energy of charge systems and dipoles.',
    minutes: 30,
    learnSteps: [
      'Define equipotential surface where potential is identical everywhere, proving work done along it is zero.',
      'Prove electric field lines are always perpendicular to equipotential surfaces at every point.',
      'Derive potential energy of a two-charge system U = q1 · q2 / (4πε₀ · r12).',
      'Derive potential energy of a dipole in uniform field: U = -p · E = -p · E · (cos theta2 - cos theta1).'
    ],
    practiceSteps: [
      'Sketch equipotential surfaces for a point charge, uniform electric field, and two equal positive charges.',
      'Solve numericals calculating work done in rotating a dipole from stable to unstable equilibrium.',
      'Review sign conventions for work done by external agent versus electrostatic field.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch02-topic03',
    chapterId: 'physics-1-2',
    subjectId: 'physics',
    title: 'Conductors, dielectrics and polarization',
    officialScope: 'Conductors and dielectrics, free charges and bound charges inside a conductor, dielectrics and electric polarization.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 2: Electrostatic Potential and Capacitance', 12),
    objective: 'Explain electrostatic shielding, behavior of conductors in E-fields, and dielectric polarization.',
    minutes: 25,
    learnSteps: [
      'Review electrostatic properties of conductors: E = 0 inside, surface charge density σ = ε₀ · E, potential constant throughout.',
      'Explain electrostatic shielding and its practical applications during lightning or sensitive instrumentation.',
      'Distinguish polar and non-polar dielectric molecules with examples (e.g., HCl vs H2O vs O2).',
      'Explain dielectric polarization vector P, dielectric constant K, and electric susceptibility chi.'
    ],
    practiceSteps: [
      'Answer conceptual questions on why electric field vanishes inside a cavity of a conductor of any shape.',
      'Solve problems comparing induced surface charge density on dielectric slabs versus conductor plates.',
      'Check understanding against standard CBSE question rubrics.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch02-topic04',
    chapterId: 'physics-1-2',
    subjectId: 'physics',
    title: 'Capacitors, combinations and energy stored',
    officialScope: 'Capacitors and capacitance, combination of capacitors in series and in parallel, capacitance of a parallel plate capacitor with and without dielectric medium between the plates, energy stored in a capacitor.',
    source: physicsSource('Class XII (2026–27), Unit I: Electrostatics, Chapter 2: Electrostatic Potential and Capacitance', 12),
    objective: 'Derive parallel plate capacitance with/without dielectrics, combination rules, and stored energy.',
    minutes: 35,
    learnSteps: [
      'Derive capacitance of parallel plate capacitor C0 = ε₀ · A / d in vacuum.',
      'Derive capacitance with dielectric slab of thickness t: C = ε₀ · A / (d - t + t/K).',
      'Derive equivalent capacitance formulas for series (1/Cs = sum 1/Ci) and parallel (Cp = sum Ci) networks.',
      'Derive electrostatic energy stored in a capacitor: U = 1/2 C V² = 1/2 Q² / C = 1/2 Q V, and energy density u = 1/2 ε₀ E².'
    ],
    practiceSteps: [
      'Solve mixed series-parallel capacitor bridge networks and determine charge and potential on each plate.',
      'Calculate energy loss when two charged capacitors are connected in parallel.',
      'Analyze effect on C, V, Q, E, and U when a dielectric is inserted with battery connected vs disconnected.'
    ]
  },

  // Chapter 3: Current Electricity (physics-1-3)
  {
    id: 'physics-042-xii-2026-27-ch03-topic01',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    title: 'Electric current and drift velocity',
    officialScope: 'Electric current, flow of electric charges in a metallic conductor, drift velocity, mobility and their relation with electric current.',
    source: physicsSource('Class XII (2026–27), Unit II: Current Electricity, Chapter 3: Current Electricity', 12),
    objective: 'Derive drift velocity expression and relate it to current density and electron mobility.',
    minutes: 30,
    learnSteps: [
      'Define electric current I = dq/dt and current density J = I/A as a directed vector.',
      'Derive drift velocity vd = -e · E · tau / m in terms of electric field and relaxation time tau.',
      'Deduce the relation between current and drift velocity: I = n · e · A · vd.',
      'Define electron mobility mu = vd / E = e · tau / m with its SI units (m² / (V · s)).'
    ],
    practiceSteps: [
      'Calculate drift velocity of electrons in copper wires of given cross-section and current rating.',
      'Explain why electrical impulses propagate near speed of light while drift speed is on the order of mm/s.',
      'Verify calculations and record any doubts in the study workspace.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch03-topic02',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    title: 'Ohm’s law, resistivity and temperature dependence',
    officialScope: 'Ohm’s law, V-I characteristics (linear and non-linear), electrical energy and power, electrical resistivity and conductivity, temperature dependence of resistance.',
    source: physicsSource('Class XII (2026–27), Unit II: Current Electricity, Chapter 3: Current Electricity', 12),
    objective: 'Deduce Ohm’s law from drift concepts and analyze resistivity temperature coefficients.',
    minutes: 30,
    learnSteps: [
      'Deduce Ohm’s law V = IR and microscopic relation J = σ · E from drift velocity formula.',
      'Express resistivity rho = m / (n · e² · tau) and conductivity σ = 1 / rho.',
      'Sketch V-I curves for ohmic conductors and non-ohmic devices (diodes, electrolytes, GaAs).',
      'Analyze temperature dependence of resistance: R(T) = R0 · (1 + alpha · Δ T) for conductors, alloys, and semiconductors.'
    ],
    practiceSteps: [
      'Calculate resistance variations with temperature using temperature coefficient alpha.',
      'Solve power dissipation problems P = I² R = V² / R and maximum safe appliance loads.',
      'Compare rho vs T graphs for copper, nichrome, and silicon.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch03-topic03',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    title: 'Cells, EMF and combinations',
    officialScope: 'Internal resistance of a cell, potential difference and emf of a cell, combination of cells in series and in parallel.',
    source: physicsSource('Class XII (2026–27), Unit II: Current Electricity, Chapter 3: Current Electricity', 12),
    objective: 'Analyze internal resistance, terminal voltage V = E - Ir, and series/parallel cell grouping.',
    minutes: 30,
    learnSteps: [
      'Distinguish electromotive force (EMF) of an open circuit from terminal potential difference (V) during discharge and charging.',
      'Derive terminal voltage equation V = E - I · r and internal resistance r = ((E/V) - 1) · R.',
      'Derive equivalent EMF and internal resistance for cells connected in series: E_eq = sum E_i, r_eq = sum r_i.',
      'Derive equivalent EMF for two parallel cells with different EMFs: E_eq = (E1 · r2 + E2 · r1) / (r1 + r2).'
    ],
    practiceSteps: [
      'Solve circuit numericals finding terminal voltage of cells under varying external load resistances.',
      'Calculate condition for maximum current from a mixed grouping of identical cells.',
      'Check signs when a cell is being recharged by an external DC supply.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch03-topic04',
    chapterId: 'physics-1-3',
    subjectId: 'physics',
    title: 'Kirchhoff’s rules and Wheatstone bridge',
    officialScope: 'Kirchhoff’s rules and simple applications, Wheatstone bridge.',
    source: physicsSource('Class XII (2026–27), Unit II: Current Electricity, Chapter 3: Current Electricity', 12),
    objective: 'Apply Kirchhoff’s junction and loop rules to complex multi-loop circuits and balance Wheatstone bridges.',
    minutes: 35,
    learnSteps: [
      'State Kirchhoff’s First Rule (Junction Rule / KCL) as a statement of conservation of charge.',
      'State Kirchhoff’s Second Rule (Loop Rule / KVL) as a statement of conservation of energy.',
      'Review sign conventions for traversing resistors and EMF sources in a closed loop.',
      'Derive the balanced Wheatstone bridge condition P/Q = R/S using Kirchhoff’s laws when galvanometer current Ig = 0.'
    ],
    practiceSteps: [
      'Solve a two-mesh circuit with multiple batteries and resistors using systematic KCL/KVL equations.',
      'Determine unknown resistances in balanced and slightly unbalanced Wheatstone bridges.',
      'Verify loop directions and sign conventions carefully.'
    ]
  },

  // Chapter 4: Moving Charges and Magnetism (physics-2-1)
  {
    id: 'physics-042-xii-2026-27-ch04-topic01',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    title: 'Biot-Savart law and applications',
    officialScope: 'Concept of magnetic field, Oersted’s experiment. Biot - Savart law and its application to current carrying circular loop.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetic Effects of Current and Magnetism, Chapter 4', 13),
    objective: 'State Biot-Savart law and derive magnetic field on axis and center of circular current loop.',
    minutes: 35,
    learnSteps: [
      'State Biot-Savart law dB = (μ₀ / 4 · π) · (I · dl x r) / r³ for magnetic field produced by current elements.',
      'Derive magnetic field at center of circular current loop of radius R: B = μ₀ · I / (2 · R).',
      'Derive magnetic field on the axis of circular coil: B = (μ₀ · N · I · R²) / (2 · (R² + x²)^(3/2)).',
      'Use right-hand grip rule to find field direction and magnetic polarity.'
    ],
    practiceSteps: [
      'Calculate magnetic field at center of circular arcs and concentric perpendicular coils.',
      'Plot magnetic field vs axial distance x and verify B reduces to dipole form when x >> R.',
      'Check vector cross product orientation.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch04-topic02',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    title: 'Ampere’s circuital law and solenoid',
    officialScope: 'Ampere’s law and its applications to infinitely long straight wire, straight solenoid.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetic Effects of Current and Magnetism, Chapter 4', 13),
    objective: 'Apply Ampere’s circuital law to find field of long straight wire and ideal solenoid.',
    minutes: 30,
    learnSteps: [
      'State Ampere’s circuital law: line integral of B · dl around any closed loop equals μ₀ · I_enclosed.',
      'Derive field of infinitely long straight wire: B = μ₀ · I / (2 · π · r).',
      'Derive uniform magnetic field inside a long straight solenoid: B = μ₀ · n · I.',
      'Analyze why magnetic field outside an ideal long solenoid is negligible.'
    ],
    practiceSteps: [
      'Calculate magnetic field inside a solenoid with given turns per unit length and current.',
      'Use Ampere’s law to find magnetic field inside and outside a thick cylindrical conductor.',
      'Verify results against official CBSE marking schemes.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch04-topic03',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    title: 'Magnetic force on charges and conductors',
    officialScope: 'Force on a moving charge in uniform magnetic and electric fields, force on a current-carrying conductor in a uniform magnetic field.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetic Effects of Current and Magnetism, Chapter 4', 13),
    objective: 'Analyze Lorentz force on moving charges, helical motion, and magnetic force on conductors.',
    minutes: 30,
    learnSteps: [
      'State Lorentz force equation F = q · (E + v x B).',
      'Analyze circular and helical motion of charged particles entering magnetic fields at angle θ.',
      'Derive radius r = mv / (qB) and time period T = 2 · π · m / (qB), proving independence from speed.',
      'Derive magnetic force on a current-carrying straight conductor: F = I · (L x B).'
    ],
    practiceSteps: [
      'Determine pitch and radius of helical path for protons and alpha particles in magnetic fields.',
      'Calculate magnetic force balancing gravity on a suspended wire.',
      'Apply Fleming’s Left-Hand rule to verify directions.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch04-topic04',
    chapterId: 'physics-2-1',
    subjectId: 'physics',
    title: 'Parallel conductors, torque and galvanometer',
    officialScope: 'Force between two parallel current-carrying conductors-definition of ampere, torque experienced by a current loop in uniform magnetic field; Current loop as a magnetic dipole and its magnetic dipole moment, moving coil galvanometer-its current sensitivity and conversion to ammeter and voltmeter.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetic Effects of Current and Magnetism, Chapter 4', 13),
    objective: 'Derive parallel wire force, define standard ampere, and explain moving coil galvanometer operation.',
    minutes: 35,
    learnSteps: [
      'Derive force per unit length between parallel straight wires: f = (μ₀ · I1 · I2) / (2 · π · d), showing like currents attract.',
      'State standard definition of one ampere based on parallel wire mutual force.',
      'Derive torque on planar current loop in uniform field: tau = M x B = NIAB · sin θ.',
      'Explain moving coil galvanometer principle, radial magnetic field role, current sensitivity, and conversion to ammeter/voltmeter.'
    ],
    practiceSteps: [
      'Calculate shunt resistance required to convert galvanometer of given G and Ig to higher range ammeter.',
      'Calculate series resistance required to convert galvanometer to voltmeter.',
      'Solve problems on mutual force on rectangular loops placed near straight current conductors.'
    ]
  },

  // Chapter 5: Magnetism and Matter (physics-2-2)
  {
    id: 'physics-042-xii-2026-27-ch05-topic01',
    chapterId: 'physics-2-2',
    subjectId: 'physics',
    title: 'Bar magnet and magnetic dipole',
    officialScope: 'Bar magnet, bar magnet as an equivalent solenoid (qualitative treatment only), magnetic field intensity due to a magnetic dipole (bar magnet) along its axis and perpendicular to its axis (qualitative), torque on a magnetic dipole (bar magnet) in a uniform magnetic field; magnetic field lines.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetism and Matter, Chapter 5', 13),
    objective: 'Describe bar magnet properties, axial/equatorial fields, and magnetic field lines.',
    minutes: 25,
    learnSteps: [
      'Compare bar magnet with equivalent current-carrying solenoid in terms of field patterns.',
      'State axial and equatorial magnetic field intensities for a short magnetic dipole.',
      'Analyze potential energy and torque on a magnetic needle placed in uniform magnetic field.',
      'Summarize properties of magnetic field lines: form closed continuous loops, tangent gives B direction.'
    ],
    practiceSteps: [
      'Compare electric dipole versus magnetic dipole field expressions and constant factors.',
      'Sketch magnetic field lines around isolated bar magnets in different orientations.',
      'Calculate torque on bar magnet placed at specified angles to external field.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch05-topic02',
    chapterId: 'physics-2-2',
    subjectId: 'physics',
    title: 'Magnetic properties of materials',
    officialScope: 'Magnetic properties of materials- Para-, dia- and ferromagnetic substances, with examples, Magnetization of materials, effect of temperature on magnetic properties.',
    source: physicsSource('Class XII (2026–27), Unit III: Magnetism and Matter, Chapter 5', 13),
    objective: 'Distinguish diamagnetic, paramagnetic, and ferromagnetic materials, and explain Curie’s law.',
    minutes: 30,
    learnSteps: [
      'Define magnetic intensity H, magnetization M, magnetic susceptibility chi, and relative permeability mu_r.',
      'Explain origin of diamagnetism: paired electron orbital motion, negative chi, repelled by strong magnetic fields.',
      'Explain paramagnetism: permanent atomic dipoles aligned by field, small positive chi, obeys Curie’s law chi = C/T.',
      'Explain ferromagnetism: domain theory, strong alignment, large positive chi, Curie temperature transition.'
    ],
    practiceSteps: [
      'Classify given materials (bismuth, copper, aluminum, iron, water) into dia, para, or ferro categories.',
      'Explain behavior of magnetic dipoles and dip needles in non-uniform magnetic fields.',
      'Answer conceptual questions on temperature effect on magnetic susceptibility.'
    ]
  },

  // Chapter 6: Electromagnetic Induction (physics-2-3)
  {
    id: 'physics-042-xii-2026-27-ch06-topic01',
    chapterId: 'physics-2-3',
    subjectId: 'physics',
    title: 'Faraday’s laws and Lenz’s law',
    officialScope: 'Electromagnetic induction; Faraday’s laws, induced EMF and current; Lenz’s Law, Eddy currents.',
    source: physicsSource('Class XII (2026–27), Unit IV: Electromagnetic Induction and AC, Chapter 6', 13),
    objective: 'State Faraday’s laws, apply Lenz’s law for induced current directions, and describe eddy currents.',
    minutes: 30,
    learnSteps: [
      'Define magnetic flux Phi_B = B · A = BA cos θ through a planar loop.',
      'State Faraday’s two laws of electromagnetic induction: induced emf e = -dPhi_B / dt.',
      'State Lenz’s law: polarity of induced emf opposes the change in magnetic flux that produces it.',
      'Explain how Lenz’s law illustrates conservation of energy, and describe practical uses and damping of eddy currents.'
    ],
    practiceSteps: [
      'Determine direction of induced current when magnets approach or recede from wire loops.',
      'Calculate induced emf in coils experiencing time-varying magnetic fields.',
      'Explain why electromagnetic braking and induction furnaces use laminated cores.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch06-topic02',
    chapterId: 'physics-2-3',
    subjectId: 'physics',
    title: 'Self and mutual induction',
    officialScope: 'Self and mutual induction.',
    source: physicsSource('Class XII (2026–27), Unit IV: Electromagnetic Induction and AC, Chapter 6', 13),
    objective: 'Derive self-inductance of solenoids, mutual inductance of coaxial coils, and magnetic energy.',
    minutes: 30,
    learnSteps: [
      'Define self-inductance L = Phi / I and back emf e = -L · (dI/dt).',
      'Derive self-inductance of a long straight solenoid: L = μ₀ · n² · A · l.',
      'Define mutual inductance M of two coils and derive M for two concentric coaxial solenoids.',
      'Derive magnetic energy stored in an inductor: U = 1/2 L · I².'
    ],
    practiceSteps: [
      'Calculate back emf induced in coils when current changes at a specified rate.',
      'Find mutual inductance between a straight wire and coplanar rectangular loop.',
      'Check SI unit of inductance (Henry) and dimensional formula.'
    ]
  },

  // Chapter 7: Alternating Current (physics-2-4)
  {
    id: 'physics-042-xii-2026-27-ch07-topic01',
    chapterId: 'physics-2-4',
    subjectId: 'physics',
    title: 'AC fundamentals and phasor diagrams',
    officialScope: 'Alternating currents, peak and RMS value of alternating current/voltage; reactance and impedance.',
    source: physicsSource('Class XII (2026–27), Unit IV: Electromagnetic Induction and AC, Chapter 7', 13),
    objective: 'Derive RMS values of AC and compute inductive and capacitive reactance with phasors.',
    minutes: 30,
    learnSteps: [
      'Define sinusoidal AC current i = i0 · sin(ω · t) and explain mean value over half-cycle.',
      'Derive root mean square (RMS) value: Irms = i0 / sqrt(2) and Vrms = V0 / sqrt(2).',
      'Analyze pure resistive, pure inductive (current lags voltage by π/2), and pure capacitive (current leads by π/2) AC circuits.',
      'Define inductive reactance XL = ω · L and capacitive reactance XC = 1 / (ω · C).'
    ],
    practiceSteps: [
      'Calculate RMS and peak currents in resistive, inductive, and capacitive AC loads.',
      'Plot voltage and current phasors against time.',
      'Analyze frequency response of inductors and capacitors under DC versus high-frequency AC.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch07-topic02',
    chapterId: 'physics-2-4',
    subjectId: 'physics',
    title: 'LCR series circuit and resonance',
    officialScope: 'LCR series circuit (phasor diagram only), resonance, power in AC circuits, wattless current.',
    source: physicsSource('Class XII (2026–27), Unit IV: Electromagnetic Induction and AC, Chapter 7', 13),
    objective: 'Construct phasor diagrams for series LCR circuit, derive impedance, resonance, and power factor.',
    minutes: 35,
    learnSteps: [
      'Draw the phasor diagram for a series LCR circuit and derive impedance Z = sqrt(R² + (XL - XC)²).',
      'Derive phase angle tan phi = (XL - XC) / R between voltage and current.',
      'Derive series resonance condition XL = XC yielding resonant frequency fr = 1 / (2 · π · sqrt(L · C)).',
      'Derive average power P = Vrms · Irms · cos phi, defining power factor and explaining wattless current when phi = π/2.'
    ],
    practiceSteps: [
      'Solve numericals for impedance, current amplitude, and power factor in given LCR networks.',
      'Calculate resonant frequency and voltage magnification at resonance across L and C.',
      'Explain practical significance of high power factor in industrial AC power distribution.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch07-topic03',
    chapterId: 'physics-2-4',
    subjectId: 'physics',
    title: 'AC generator and transformer',
    officialScope: 'AC generator and transformer.',
    source: physicsSource('Class XII (2026–27), Unit IV: Electromagnetic Induction and AC, Chapter 7', 13),
    objective: 'Explain working principles, EMF equations, and energy losses in AC generators and transformers.',
    minutes: 30,
    learnSteps: [
      'Explain the working principle of an AC generator based on electromagnetic induction in a rotating armature coil.',
      'Derive induced EMF equation e = e0 · sin(ω · t) = N · B · A · ω · sin(ω · t).',
      'Explain transformer mutual induction principle, turn ratio Ns/Np = Vs/Vp = Ip/Is, and step-up/step-down types.',
      'Identify the 4 main energy losses in transformers: flux leakage, copper resistance heating, eddy currents, and hysteresis.'
    ],
    practiceSteps: [
      'Calculate output voltage and current in step-up/step-down transformers with specified efficiency.',
      'Solve problems on long-distance electrical power transmission at high voltages to minimize I² R losses.',
      'Check labelled schematic diagrams against standard NCERT figures.'
    ]
  },

  // Chapter 8: Electromagnetic Waves (physics-3-1)
  {
    id: 'physics-042-xii-2026-27-ch08-topic01',
    chapterId: 'physics-3-1',
    subjectId: 'physics',
    title: 'Displacement current and EM wave characteristics',
    officialScope: 'Basic idea of displacement current, Electromagnetic waves, their characteristics, their transverse nature (qualitative ideas only).',
    source: physicsSource('Class XII (2026–27), Unit V: Electromagnetic Waves, Chapter 8', 14),
    objective: 'Explain displacement current inconsistency and summarize electromagnetic wave characteristics.',
    minutes: 25,
    learnSteps: [
      'Explain Ampere’s circuital law inconsistency for charging capacitors and Maxwell’s displacement current term Id = ε₀ · (dPhi_E / dt).',
      'State Maxwell’s modified Ampere-Maxwell law: integral B · dl = μ₀ · (Ic + Id).',
      'Summarize transverse nature of EM waves where E and B vibrate perpendicular to each other and propagation direction.',
      'State propagation speed c = 1 / sqrt(μ₀ · ε₀) and relation E0 / B0 = c.'
    ],
    practiceSteps: [
      'Calculate displacement current between circular capacitor plates during linear charging.',
      'Write wave equations for sinusoidal electric and magnetic field vectors.',
      'Verify orthogonality of E, B, and k vectors.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch08-topic02',
    chapterId: 'physics-3-1',
    subjectId: 'physics',
    title: 'Electromagnetic spectrum and applications',
    officialScope: 'Electromagnetic spectrum (radio waves, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays) including elementary facts about their uses.',
    source: physicsSource('Class XII (2026–27), Unit V: Electromagnetic Waves, Chapter 8', 14),
    objective: 'Order the EM spectrum by frequency/wavelength and state standard production and uses.',
    minutes: 25,
    learnSteps: [
      'Arrange EM wave bands in increasing frequency: Radio < Micro < Infrared < Visible < UV < X-ray < Gamma.',
      'Learn standard production methods: accelerated charges (radio), klystron/magnetron (microwaves), thermal agitation (infrared), inner shell transitions (X-rays), nuclear decay (gamma).',
      'List verified uses: radar/telecom (radio/micro), greenhouse/physiotherapy (IR), water purification/lasik (UV), bone radiography (X-rays), oncology (gamma).',
      'Analyze wavelength boundaries and energy E = h · ν relationships.'
    ],
    practiceSteps: [
      'Identify EM wave types from given frequencies or wavelength values.',
      'Match specific medical and industrial applications to correct spectral regions.',
      'Answer past CBSE reasoning questions on ozone layer UV absorption.'
    ]
  },

  // Chapter 9: Ray Optics and Optical Instruments (physics-3-2)
  {
    id: 'physics-042-xii-2026-27-ch09-topic01',
    chapterId: 'physics-3-2',
    subjectId: 'physics',
    title: 'Refraction, TIR and optical fibers',
    officialScope: 'Refraction of light, total internal reflection and optical fibers, refraction at spherical surfaces, lenses, thin lens formula, lensmaker’s formula, magnification, power of a lens, combination of thin lenses in contact, refraction of light through a prism.',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 9', 14),
    objective: 'Analyze Snell’s law, total internal reflection, critical angle, and prism refraction formula.',
    minutes: 35,
    learnSteps: [
      'State Snell’s law of refraction and define relative refractive index n21 = n2 / n1 = v1 / v2.',
      'Derive critical angle condition sin ic = 1/n for light travelling from denser to rarer medium.',
      'Explain total internal reflection (TIR) and light transmission through core-cladding optical fibers.',
      'Derive prism formula n = sin((A + Dm)/2) / sin(A/2) for minimum deviation Dm through a triangular prism.'
    ],
    practiceSteps: [
      'Calculate critical angles and tracing ray paths through right-angled isosceles glass prisms.',
      'Solve numericals using prism refractive index and minimum deviation angle.',
      'Verify sign conventions for apparent depth in composite immiscible liquid layers.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch09-topic02',
    chapterId: 'physics-3-2',
    subjectId: 'physics',
    title: 'Spherical surfaces and Lensmaker’s formula',
    officialScope: 'Refraction at spherical surfaces, lenses, thin lens formula, lensmaker’s formula, magnification, power of a lens, combination of thin lenses in contact.',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 9', 14),
    objective: 'Derive single spherical surface refraction formula and thin lensmaker’s equation.',
    minutes: 35,
    learnSteps: [
      'Derive refraction at single convex spherical surface: (n2 / v) - (n1 / u) = (n2 - n1) / R using Cartesian sign conventions.',
      'Derive Lensmaker’s formula 1/f = (n - 1) · (1/R1 - 1/R2) for a thin convex lens.',
      'State thin lens formula 1/f = 1/v - 1/u and linear magnification m = v/u.',
      'Derive equivalent focal length and power for thin lenses in contact: 1/F = 1/f1 + 1/f2 and P = P1 + P2.'
    ],
    practiceSteps: [
      'Calculate change in focal length when a glass biconvex lens is immersed in water or carbon disulfide.',
      'Solve two-lens combination problems finding intermediate and final image coordinates.',
      'Verify Cartesian signs rigorously (distances measured against incident light are negative).'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch09-topic03',
    chapterId: 'physics-3-2',
    subjectId: 'physics',
    title: 'Microscopes and telescopes',
    officialScope: 'Optical instruments: Microscopes and astronomical telescopes (reflecting and refracting) and their magnifying powers.',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 9', 14),
    objective: 'Draw ray diagrams and derive magnifying powers for compound microscopes and astronomical telescopes.',
    minutes: 35,
    learnSteps: [
      'Draw ray diagram for compound microscope with image at near point D and at infinity (normal adjustment).',
      'Derive magnifying power formula: m = -(L / fo) · (D / fe) (infinity) and m = -(L / fo) · (1 + D / fe) (near point).',
      'Draw ray diagram for refracting astronomical telescope and derive angular magnification m = -fo / fe with tube length L = fo + fe.',
      'Draw reflecting telescope (Cassegrain) ray diagram and state advantages: zero chromatic aberration, reduced spherical aberration, high light-gathering power.'
    ],
    practiceSteps: [
      'Calculate magnifying power and tube length for microscope and telescope specifications.',
      'Answer conceptual questions comparing objective vs eyepiece focal lengths and apertures.',
      'Practice drawing neat, accurately labelled ray diagrams with directional arrows.'
    ]
  },

  // Chapter 10: Wave Optics (physics-3-3)
  {
    id: 'physics-042-xii-2026-27-ch10-topic01',
    chapterId: 'physics-3-3',
    subjectId: 'physics',
    title: 'Huygens’ principle and laws of reflection/refraction',
    officialScope: 'Wave front and Huygens’ principle, reflection and refraction of plane wave at a plane surface using wave fronts. Proof of laws of reflection and refraction using Huygens’ principle.',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 10', 14),
    objective: 'Define wave fronts, state Huygens’ principle, and prove Snell’s law using wave front construction.',
    minutes: 30,
    learnSteps: [
      'Define wave front as locus of all points vibrating in identical phase; describe spherical, cylindrical, and plane wave fronts.',
      'State Huygens’ principle: every point on a wave front acts as a secondary source emitting secondary spherical wavelets.',
      'Construct plane wave front reflection at a plane mirror and prove angle of incidence i = angle of reflection r.',
      'Construct plane wave front refraction at a plane surface and prove Snell’s law sin i / sin r = v1 / v2 = n21.'
    ],
    practiceSteps: [
      'Sketch wave fronts before and after passing through a prism, convex lens, and concave mirror.',
      'Write step-by-step Huygens geometric proof for reflection and refraction with clear labelled diagrams.',
      'Verify that frequency remains unchanged during refraction while wavelength changes.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch10-topic02',
    chapterId: 'physics-3-3',
    subjectId: 'physics',
    title: 'Interference and Young’s double slit experiment',
    officialScope: 'Interference, Young’s double slit experiment and expression for fringe width (no derivation needed for fringe width expression, only final result), coherent sources and sustained interference of light.',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 10', 14),
    objective: 'Analyze constructive/destructive interference conditions, coherence, and fringe width beta = λ · D/d.',
    minutes: 35,
    learnSteps: [
      'State conditions for sustained interference: coherent sources, identical frequencies, constant phase difference.',
      'Derive path difference Δ x = d · y / D for two slits separated by distance d on a screen at distance D.',
      'State constructive condition Δ x = n · λ and destructive condition Δ x = (2n - 1) · λ / 2.',
      'Use fringe width formula beta = λ · D / d and analyze effect of immersing apparatus in water or using white light.'
    ],
    practiceSteps: [
      'Calculate fringe shifts when thin transparent mica sheets are placed across one slit.',
      'Determine angular fringe width and separation of bright/dark bands on screen.',
      'Compare interference intensity distribution with single slit diffraction pattern.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch10-topic03',
    chapterId: 'physics-3-3',
    subjectId: 'physics',
    title: 'Diffraction due to a single slit',
    officialScope: 'Diffraction due to a single slit, width of central maximum (qualitative treatment only).',
    source: physicsSource('Class XII (2026–27), Unit VI: Optics, Chapter 10', 14),
    objective: 'Explain single slit diffraction mechanism and compute central maximum angular width.',
    minutes: 25,
    learnSteps: [
      'Explain diffraction as bending of light waves around obstacles or apertures comparable to wavelength.',
      'Analyze single slit diffraction minima condition: a · sin θ = n · λ (n = 1, 2, 3...).',
      'Explain secondary maxima condition: a · sin θ = (2n + 1) · λ / 2.',
      'Derive angular width of central maximum 2 · θ = 2 · λ / a and linear width beta0 = 2 · λ · D / a.'
    ],
    practiceSteps: [
      'Calculate central maximum width for given slit aperture and laser wavelength.',
      'Contrast interference fringes (equal width and brightness) with diffraction bands (central peak dominant, rapidly decaying).',
      'Answer past board questions on why sound waves diffract easily around doors while light waves do not.'
    ]
  },

  // Chapter 11: Dual Nature of Radiation and Matter (physics-4-1)
  {
    id: 'physics-042-xii-2026-27-ch11-topic01',
    chapterId: 'physics-4-1',
    subjectId: 'physics',
    title: 'Photoelectric effect and Einstein’s equation',
    officialScope: 'Dual nature of radiation, Photoelectric effect, Hertz and Lenard’s observations; Einstein’s photoelectric equation-particle nature of light.',
    source: physicsSource('Class XII (2026–27), Unit VII: Dual Nature of Radiation and Matter, Chapter 11', 15),
    objective: 'Analyze photoelectric observations and apply Einstein’s photoelectric equation.',
    minutes: 30,
    learnSteps: [
      'Review experimental observations of photoelectric effect: instantaneous emission, existence of threshold frequency ν₀.',
      'Analyze effect of intensity on photocurrent and effect of frequency on stopping potential V0.',
      'State Einstein’s photoelectric equation: Kmax = e · V0 = h · ν - φ₀ = h · (ν - ν₀).',
      'Plot V0 vs ν and prove that slope equals h/e, enabling experimental Planck constant determination.'
    ],
    practiceSteps: [
      'Calculate stopping potential and maximum kinetic energy of photoelectrons given work function and incident wavelength.',
      'Analyze graphs of photocurrent vs collector plate potential for varied frequencies and intensities.',
      'Explain why classical wave theory failed to explain threshold frequency and instantaneous emission.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch11-topic02',
    chapterId: 'physics-4-1',
    subjectId: 'physics',
    title: 'Matter waves and de Broglie relation',
    officialScope: 'Matter waves-wave nature of particles, de-Broglie relation.',
    source: physicsSource('Class XII (2026–27), Unit VII: Dual Nature of Radiation and Matter, Chapter 11', 15),
    objective: 'Calculate de Broglie wavelengths of material particles and accelerated electrons.',
    minutes: 25,
    learnSteps: [
      'State de Broglie hypothesis: material particles in motion exhibit wave-like properties.',
      'Derive de Broglie wavelength λ = h / p = h / (m · v) = h / sqrt(2 · m · K).',
      'Derive de Broglie wavelength for electron accelerated through potential difference V: λ = 1.227 / sqrt(V) nm.',
      'Explain why wave nature is observable only for microscopic entities (electrons) and imperceptible for macroscopic objects.'
    ],
    practiceSteps: [
      'Compare de Broglie wavelengths of an electron, proton, and alpha particle accelerated through the same voltage.',
      'Calculate wavelength of thermal neutrons at room temperature.',
      'Verify unit consistency and dimensional analysis.'
    ]
  },

  // Chapter 12: Atoms (physics-4-2)
  {
    id: 'physics-042-xii-2026-27-ch12-topic01',
    chapterId: 'physics-4-2',
    subjectId: 'physics',
    title: 'Alpha scattering and Rutherford model',
    officialScope: 'Alpha-particle scattering experiment; Rutherford’s model of atom.',
    source: physicsSource('Class XII (2026–27), Unit VIII: Atoms and Nuclei, Chapter 12', 15),
    objective: 'Explain Geiger-Marsden experiment, distance of closest approach, and Rutherford model limitations.',
    minutes: 25,
    learnSteps: [
      'Describe Geiger-Marsden alpha-particle scattering experiment arrangement and trajectory findings.',
      'Derive distance of closest approach d = (2 · Z · e²) / (4πε₀ · K) estimating nuclear size upper bound.',
      'Define impact parameter b and explain its relation to scattering angle θ: b proportional to cot(θ/2).',
      'State Rutherford model limitations: atomic orbital instability from electromagnetic radiation and inability to explain discrete line spectra.'
    ],
    practiceSteps: [
      'Calculate distance of closest approach for 5 MeV alpha particles directed at gold nucleus (Z=79).',
      'Explain fraction of alpha particles scattered at angles greater than 90 degrees.',
      'Check assumptions behind Coulomb interaction at subatomic distances.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch12-topic02',
    chapterId: 'physics-4-2',
    subjectId: 'physics',
    title: 'Bohr model and hydrogen spectrum',
    officialScope: 'Bohr model of hydrogen atom, expression for radius of nth possible orbit, velocity and energy of electron in nth orbit, hydrogen line spectra (qualitative treatment only).',
    source: physicsSource('Class XII (2026–27), Unit VIII: Atoms and Nuclei, Chapter 12', 15),
    objective: 'Derive Bohr orbital radius, electron energy levels, and analyze hydrogen spectral series.',
    minutes: 35,
    learnSteps: [
      'State Bohr’s 3 postulates: stationary non-radiating orbits, angular momentum quantization m · v · r = n · h / (2 · π), and photon emission frequency condition E2 - E1 = h · ν.',
      'Derive orbital radius rn = (ε₀ · n² · h²) / (π · m · e²) = 0.529 · n² Angstroms.',
      'Derive total energy En = -13.6 / n² eV, showing kinetic energy K = -E and potential energy U = 2 · E.',
      'Analyze hydrogen spectral series: Lyman (UV, n1=1), Balmer (Visible, n1=2), Paschen (IR, n1=3), Brackett (IR, n1=4), Pfund (IR, n1=5) using 1/λ = R · (1/n1² - 1/n2²).'
    ],
    practiceSteps: [
      'Calculate shortest and longest wavelengths in Lyman and Balmer series using Rydberg constant R.',
      'Calculate ionization energy and excitation potential for transition from ground state to first excited state.',
      'Solve past CBSE questions on de Broglie wave explanation of Bohr’s quantization condition.'
    ]
  },

  // Chapter 13: Nuclei (physics-4-3)
  {
    id: 'physics-042-xii-2026-27-ch13-topic01',
    chapterId: 'physics-4-3',
    subjectId: 'physics',
    title: 'Nuclear composition, size and binding energy',
    officialScope: 'Composition and size of nucleus, nuclear force; Mass-energy relation, mass defect; binding energy per nucleon and its variation with mass number, nuclear fission, nuclear fusion.',
    source: physicsSource('Class XII (2026–27), Unit VIII: Atoms and Nuclei, Chapter 13', 15),
    objective: 'Calculate nuclear radius, mass defect, binding energy per nucleon, and analyze the BE curve.',
    minutes: 35,
    learnSteps: [
      'Define mass number A, atomic number Z, neutron number N, and nuclear radius R = R0 · A^(1/3) with R0 = 1.2 fm.',
      'Prove nuclear density is independent of mass number A and calculate its approximate value (~2.3 x 10^17 kg/m³).',
      'Explain nuclear force characteristics: strongest in nature, short-ranged, charge-independent, exhibits saturation.',
      'Calculate mass defect Δ m = [Z · mp + (A-Z) · mn] - M_nucleus and binding energy Eb = Δ m · c² (or Δ m in amu · 931.5 MeV).',
      'Analyze binding energy per nucleon (Eb/A) vs A curve: peak at Fe-56 (~8.75 MeV/nucleon), explaining energy release in fission of heavy nuclei and fusion of light nuclei.'
    ],
    practiceSteps: [
      'Calculate Q-value and energy released in typical uranium-235 fission and D-T fusion reactions.',
      'Find binding energy per nucleon for helium-4 and iron-56 from given isotopic masses.',
      'Answer past CBSE reasoning questions on why nuclear fusion requires immense temperatures and pressures.'
    ]
  },

  // Chapter 14: Semiconductor Electronics (physics-5-1)
  {
    id: 'physics-042-xii-2026-27-ch14-topic01',
    chapterId: 'physics-5-1',
    subjectId: 'physics',
    title: 'Energy bands and intrinsic/extrinsic semiconductors',
    officialScope: 'Energy bands in conductors, semiconductors and insulators (qualitative ideas only) Intrinsic and extrinsic semiconductors- p and n type, p-n junction.',
    source: physicsSource('Class XII (2026–27), Unit IX: Electronic Devices, Chapter 14', 16),
    objective: 'Differentiate conductors, semiconductors, and insulators using band theory, and explain p-type/n-type doping.',
    minutes: 30,
    learnSteps: [
      'Distinguish valence band, conduction band, and forbidden energy gap Eg for metals (overlapping/Eg=0), semiconductors (Eg < 3 eV, Si=1.1eV), and insulators (Eg > 3 eV).',
      'Explain electrical conduction in intrinsic silicon/germanium: electron-hole pair generation, ne = nh = ni.',
      'Explain n-type semiconductor doping with pentavalent impurities (P, As): majority electrons, donor energy level below conduction band.',
      'Explain p-type semiconductor doping with trivalent impurities (B, Al): majority holes, acceptor energy level above valence band.',
      'State mass action law: ne · nh = ni² in thermal equilibrium.'
    ],
    practiceSteps: [
      'Calculate hole concentration given donor doping density and intrinsic carrier concentration in silicon.',
      'Sketch energy band diagrams showing donor and acceptor levels at 0 K and room temperature.',
      'Answer conceptual questions on electrical neutrality of doped semiconductors.'
    ]
  },
  {
    id: 'physics-042-xii-2026-27-ch14-topic02',
    chapterId: 'physics-5-1',
    subjectId: 'physics',
    title: 'p-n junction diode and rectification',
    officialScope: 'p-n junction diode: I-V characteristics in forward and reverse bias; application of junction diode -diode as a rectifier.',
    source: physicsSource('Class XII (2026–27), Unit IX: Electronic Devices, Chapter 14', 16),
    objective: 'Explain depletion layer formation, sketch I-V characteristics, and describe half-wave/full-wave rectifiers.',
    minutes: 35,
    learnSteps: [
      'Explain p-n junction formation: diffusion of majority carriers, drift of minority carriers, depletion region, barrier potential Vb.',
      'Analyze forward bias (external field opposes barrier potential, width decreases) and reverse bias (width increases, microampere drift current).',
      'Sketch complete static I-V characteristic curve indicating threshold (knee) voltage and breakdown voltage.',
      'Explain half-wave rectifier circuit with input/output waveforms and ripple frequency f_out = f_in.',
      'Explain center-tapped full-wave rectifier circuit with input/output waveforms and ripple frequency f_out = 2 · f_in.'
    ],
    practiceSteps: [
      'Draw complete circuit diagrams for center-tapped full-wave rectifiers showing conduction paths during positive and negative half cycles.',
      'Determine dynamic resistance from slope of forward and reverse I-V characteristic graphs.',
      'Calculate output DC voltage and ripple factor for given AC peak inputs.'
    ]
  }
];

export const physicsTopicNodes: AcademicNode[] = physicsTopicDefinitions.map(def => ({
  id: def.id,
  subjectId: def.subjectId,
  chapterId: def.chapterId,
  parentId: def.chapterId,
  kind: 'topic',
  title: def.title,
  officialScope: def.officialScope,
  source: def.source
}));

export const physicsActivityDefinitions: ActivityDefinition[] = physicsTopicDefinitions.flatMap(def => {
  const node = physicsTopicNodes.find(n => n.id === def.id)!;
  return buildActivitiesForTopic(node, {
    learnSteps: def.learnSteps,
    practiceSteps: def.practiceSteps,
    objective: def.objective,
    minutes: def.minutes
  });
});
