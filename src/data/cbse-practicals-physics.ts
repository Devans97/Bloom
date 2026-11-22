/**
 * CBSE Class XII Physics (042) - Official Laboratory Manual & Practical Examination System
 * 2026-2027 Blueprint Standard (30 Marks Scheme)
 * Authentic apparatus lists, circuit/ray diagrams, working formulas, observation table schemas,
 * calculation procedures, error analyses, precautions, and official external examiner Viva-Voce banks.
 */

export interface FormulaSpec {
  name: string;
  formula: string;
  symbolMeanings: string;
}

export interface PracticalObservationRow {
  sNo: number;
  readings: Record<string, string | number>;
}

export interface VivaVoceItem {
  question: string;
  expectedAnswer: string;
  examinerFocus: string;
}

export interface CBSEPhysicsPractical {
  id: string;
  section: 'Section-A' | 'Section-B';
  experimentNumber: number;
  title: string;
  aim: string;
  apparatusRequired: string[];
  theoreticalPrinciple: string;
  circuitOrRayDiagramDescription: string;
  workingFormulae: FormulaSpec[];
  procedureSteps: string[];
  observationTableHeaders: string[];
  sampleObservationData: PracticalObservationRow[];
  calculationSteps: string[];
  sourcesOfError: string[];
  precautions: string[];
  vivaVoceQuestions: VivaVoceItem[];
}

export const cbsePhysicsPracticals: CBSEPhysicsPractical[] = [
  // Experiment 1: Meter Bridge Resistance and Resistivity (Section A)
  {
    id: 'prac-phy-a-01',
    section: 'Section-A',
    experimentNumber: 1,
    title: 'Unknown Resistance & Resistivity of Wire using Meter Bridge',
    aim: 'To determine the resistance of a given wire using a meter bridge and hence determine the specific resistance (resistivity) of its material.',
    apparatusRequired: [
      'Meter bridge apparatus with 1m constantan/manganin wire on wooden meter scale',
      'Leclanche cell or stabilized regulated DC power supply (2V)',
      'Sensitive center-zero moving coil galvanometer',
      'Standard resistance box (0.1 to 100 ohms)',
      'Jockey with sharp knife edge',
      'One-way plug key',
      'Resistance wire of unknown material (nichrome or eureka wire)',
      'Screw gauge for wire diameter measurement',
      'Meter scale for wire length measurement',
      'Thick copper connecting wires and sandpaper'
    ],
    theoreticalPrinciple: 'The meter bridge works on the principle of the balanced Wheatstone bridge. When the galvanometer shows null deflection, no current passes through the detector arm, satisfying P / Q = R / S. In a meter bridge of uniform wire length 100 cm, if balancing length is l cm from the zero end (adjacent to standard resistance R), the ratio of wire resistances is P / Q = l / (100 - l). Therefore, the unknown resistance X connected in the right gap is X = R · (100 - l) / l. The resistivity ρ of the wire material of radius r and length L is calculated as ρ = (X · π · r²) / L.',
    circuitOrRayDiagramDescription: 'Wheatstone bridge layout: DC source connected across terminals A and C of 1-meter wire. Standard resistance box R in left gap (A to B), unknown resistance wire X in right gap (B to C). Sensitive galvanometer G connected between central brass terminal B and sliding jockey J on wire AC.',
    workingFormulae: [
      {
        name: 'Wheatstone Bridge Balance Condition',
        formula: 'X = R · (100 - l) / l',
        symbolMeanings: 'X = unknown resistance (ohms), R = known resistance from box (ohms), l = balancing length from zero end (cm)'
      },
      {
        name: 'Resistivity (Specific Resistance)',
        formula: 'ρ = (X · π · r²) / L',
        symbolMeanings: 'ρ = resistivity (ohm-m), r = radius of wire (m), L = total length of wire (m)'
      },
      {
        name: 'Screw Gauge Least Count',
        formula: 'LC = Pitch / Total circular scale divisions',
        symbolMeanings: 'Pitch = 1 mm, Divisions = 100 => LC = 0.01 mm = 0.001 cm'
      }
    ],
    procedureSteps: [
      'Clean the insulation at connecting ends of all wires with sandpaper to eliminate contact resistance.',
      'Set up electrical connections as shown in the circuit diagram: Battery key across AC, R in left gap, X in right gap, galvanometer between B and jockey.',
      'Test circuit connectivity: Press jockey at 0 cm end (galvanometer deflects left) and at 100 cm end (galvanometer deflects right). Opposite deflections verify correct wiring.',
      'Introduce a suitable resistance R from the resistance box so that balancing length l falls near the center of the wire (between 40 cm and 60 cm) to minimize measurement error.',
      'Gently touch the jockey along the meter bridge wire until the galvanometer needle indicates exactly zero (null point). Record balancing length l.',
      'Interchange the positions of R and X in the gaps and repeat to eliminate end resistance errors.',
      'Measure diameter of the wire at 5 different positions and along two perpendicular axes using screw gauge, correcting for zero error.',
      'Measure total length L of the resistance wire using a meter scale.'
    ],
    observationTableHeaders: [
      'Obs No.',
      'Resistance R (ohms)',
      'Balancing Length l (cm)',
      '(100 - l) (cm)',
      'Unknown Resistance X (ohms)'
    ],
    sampleObservationData: [
      {
        sNo: 1,
        readings: { 'R (ohms)': 2.0, 'l (cm)': 41.5, '(100 - l) (cm)': 58.5, 'X (ohms)': 2.819 }
      },
      {
        sNo: 2,
        readings: { 'R (ohms)': 3.0, 'l (cm)': 51.7, '(100 - l) (cm)': 48.3, 'X (ohms)': 2.803 }
      },
      {
        sNo: 3,
        readings: { 'R (ohms)': 4.0, 'l (cm)': 58.8, '(100 - l) (cm)': 41.2, 'X (ohms)': 2.803 }
      }
    ],
    calculationSteps: [
      'Mean unknown resistance: X_mean = (2.819 + 2.803 + 2.803) / 3 = 2.808 ohms.',
      'Mean diameter of wire d = 0.38 mm = 0.38 · 10⁻³ m; radius r = d / 2 = 0.19 · 10⁻³ m.',
      'Area of cross-section: A = π · r² = 3.1416 · (0.19 · 10⁻³)² = 1.134 · 10⁻⁷ m².',
      'Measured length of wire: L = 0.75 m (75.0 cm).',
      'Resistivity: ρ = (X · A) / L = (2.808 · 1.134 · 10⁻⁷) / 0.75 = 4.24 · 10⁻⁷ ohm-m (Characteristic of Eureka/Constantan alloy).'
    ],
    sourcesOfError: [
      'End resistances at terminal strips A and C due to non-zero brass strip soldering contact.',
      'Non-uniformity of the cross-sectional area of the 1-meter bridge wire.',
      'Heating of the bridge wire due to prolonged current passage, which alters its resistance during readings.',
      'Parallax error when noting balancing position on the meter scale.'
    ],
    precautions: [
      'Do not drag or scrape the jockey across the wire; dragging damages the uniformity of wire cross-section.',
      'Plug in key only while taking readings to prevent Joule heating.',
      'Keep balancing length between 40 cm and 60 cm where bridge sensitivity Delta l / l is maximal.',
      'Clean all wire terminals with sandpaper to remove oxide film and minimize contact resistance.'
    ],
    vivaVoceQuestions: [
      {
        question: 'Why is the meter bridge called so?',
        expectedAnswer: 'Because it utilizes a uniform resistance wire of exactly one meter (100 cm) in length.',
        examinerFocus: 'Basic nomenclature and apparatus familiarity.'
      },
      {
        question: 'Why is the bridge most sensitive when the null point is near 50 cm?',
        expectedAnswer: 'Because all four arms of the Wheatstone bridge have approximately equal resistances (P ~ Q ~ R ~ S), where fractional sensitivity d(Delta)/dX is mathematically maximized.',
        examinerFocus: 'Wheatstone bridge sensitivity condition.'
      },
      {
        question: 'Why are the connecting strips on the meter bridge made of thick brass or copper?',
        expectedAnswer: 'Thick copper or brass strips have very large cross-sectional area and very low resistivity, making their resistance negligibly small and eliminating parasitic resistance in the bridge arms.',
        examinerFocus: 'Minimization of end resistance.'
      },
      {
        question: 'Why is constantan or manganin chosen for the meter bridge wire instead of copper?',
        expectedAnswer: 'Constantan and manganin have high specific resistivity and an extremely low temperature coefficient of resistance (alpha ~ 0), ensuring wire resistance remains unchanged during testing currents.',
        examinerFocus: 'Material science of standard resistance wires.'
      }
    ]
  },

  // Experiment 2: Galvanometer Conversion to Voltmeter (Section A)
  {
    id: 'prac-phy-a-02',
    section: 'Section-A',
    experimentNumber: 2,
    title: 'Conversion of Galvanometer into a Voltmeter of Given Range',
    aim: 'To convert the given galvanometer (of known resistance G and figure of merit k) into a voltmeter of desired range (0 to 3V) and verify the conversion with a standard voltmeter.',
    apparatusRequired: [
      'Weston type moving coil galvanometer with center zero or left zero scale (30 divisions)',
      'Regulated DC variable power supply (0 to 5V)',
      'Standard calibrated laboratory voltmeter (0 to 3V, least count 0.05V)',
      'High resistance box (1 to 10,000 ohms)',
      'One-way plug key and connecting wires'
    ],
    theoreticalPrinciple: 'A galvanometer is converted into a voltmeter by connecting a calculated high resistance R in series with the galvanometer coil. If the galvanometer has coil resistance G and requires full-scale deflection current I_g = n · k (where n is total scale divisions and k is the figure of merit in amperes/division), to measure a maximum potential difference V, the total circuit resistance must satisfy V = I_g · (G + R). Solving for series resistance gives R = (V / I_g) - G. The combined instrument behaves as a voltmeter with high internal resistance (G + R), ensuring minimal current is drawn from the circuit being measured.',
    circuitOrRayDiagramDescription: 'Galvanometer G in series with high resistance box R. The combination is connected in parallel with a standard calibrated voltmeter and a potential divider circuit (rheostat connected across DC battery supply).',
    workingFormulae: [
      {
        name: 'Full Scale Deflection Current',
        formula: 'I_g = n · k',
        symbolMeanings: 'n = total number of scale divisions (typically 30), k = figure of merit (A/div)'
      },
      {
        name: 'Series High Resistance',
        formula: 'R = (V / I_g) - G',
        symbolMeanings: 'V = maximum desired range (3.0 V), G = galvanometer coil resistance (ohms), R = calculated series resistance (ohms)'
      }
    ],
    procedureSteps: [
      'Record the galvanometer parameters: number of divisions on one side of zero n = 30 divisions, coil resistance G (measured previously by half deflection method, e.g. 70 ohms), and figure of merit k = 20 · 10⁻⁶ A/div.',
      'Calculate full scale deflection current I_g = n · k = 30 · 20 · 10⁻⁶ = 6 · 10⁻⁴ A = 0.6 mA.',
      'Calculate required series resistance R for V = 3.0 V: R = (3.0 / (6 · 10⁻⁴)) - 70 = 5000 - 70 = 4930 ohms.',
      'Unplug 4930 ohms from the high resistance box and connect it in series with the galvanometer.',
      'Connect the converted voltmeter in parallel with the standard voltmeter across the slider of a potential divider.',
      'Vary the potential divider slider to take readings for galvanometer deflections θ = 5, 10, 15, 20, 25, 30 divisions.',
      'Record converted voltage V_converted = θ · (V_max / n) and compare with standard voltmeter reading V_standard.',
      'Plot calibration graph: error Delta V = (V_standard - V_converted) versus V_converted.'
    ],
    observationTableHeaders: [
      'Obs No.',
      'Galvanometer Deflection θ (div)',
      'Converted Voltmeter Reading V1 (V)',
      'Standard Voltmeter Reading V2 (V)',
      'Difference (V2 - V1) (V)'
    ],
    sampleObservationData: [
      {
        sNo: 1,
        readings: { 'Deflection θ': 10, 'V1 (Converted)': 1.0, 'V2 (Standard)': 1.02, 'Difference': 0.02 }
      },
      {
        sNo: 2,
        readings: { 'Deflection θ': 20, 'V1 (Converted)': 2.0, 'V2 (Standard)': 2.01, 'Difference': 0.01 }
      },
      {
        sNo: 3,
        readings: { 'Deflection θ': 30, 'V1 (Converted)': 3.0, 'V2 (Standard)': 2.99, 'Difference': -0.01 }
      }
    ],
    calculationSteps: [
      'Conversion factor per division: c = V_max / n = 3.0 / 30 = 0.1 V/division.',
      'For any deflection θ: V_converted = θ · 0.1 V.',
      'Maximum observed difference does not exceed least count of standard voltmeter (0.05 V), confirming successful conversion.'
    ],
    sourcesOfError: [
      'Imprecision in measuring galvanometer coil resistance G and figure of merit k.',
      'Standard voltmeter zero offset error or mechanical friction in pivot bearings.'
    ],
    precautions: [
      'Always unplug the calculated series resistance R BEFORE closing the circuit to prevent damaging the sensitive galvanometer coil.',
      'Ensure standard voltmeter and converted voltmeter are strictly connected in parallel.'
    ],
    vivaVoceQuestions: [
      {
        question: 'Why is a high resistance connected in SERIES to convert a galvanometer into a voltmeter?',
        expectedAnswer: 'A voltmeter must be connected in parallel across the circuit element whose voltage is to be measured. To avoid altering circuit conditions, it must draw negligible current (I -> 0), which requires extremely high overall resistance (R_total = G + R). Series connection ensures high overall resistance.',
        examinerFocus: 'Circuit theory and voltmeter loading effect.'
      },
      {
        question: 'What is an ideal voltmeter, and what is its resistance?',
        expectedAnswer: 'An ideal voltmeter is one that draws zero current from the circuit under test. Its internal electrical resistance is infinity.',
        examinerFocus: 'Ideal measurement instrument concepts.'
      },
      {
        question: 'What is the figure of merit of a galvanometer?',
        expectedAnswer: 'The figure of merit k is the current required to produce a deflection of one division on the galvanometer scale (k = I / θ), measured in Amperes per division.',
        examinerFocus: 'Definition and physical units.'
      }
    ]
  },

  // Experiment 3: Convex Lens Focal Length (Section B)
  {
    id: 'prac-phy-b-01',
    section: 'Section-B',
    experimentNumber: 3,
    title: 'Focal Length of Convex Lens using u-v Method',
    aim: 'To find the focal length of a convex lens by plotting graphs between u and v or between 1/u and 1/v.',
    apparatusRequired: [
      'Optical bench with 4 uprights (two for needles, one for lens, one for screen/lateral guide)',
      'Double convex glass lens of focal length ~15-20 cm',
      'Two optical needles (object needle and image needle)',
      'Knitting needle for index correction',
      'Spirit level for leveling optical bench'
    ],
    theoreticalPrinciple: 'According to the lens formula for a thin lens: 1/f = 1/v - 1/u (using Cartesian sign conventions: object distance u is negative, real image distance v is positive). Thus: 1/f = 1/v - 1/(-u) = 1/v + 1/u => f = (u · v) / (u + v). When the object is placed at 2F (u = 2f), the real inverted image is formed at 2F (v = 2f) of identical size. On a graph of u versus v, the rectangular hyperbola has a point where u = v = 2f. On a graph of 1/u versus 1/v, the relation is 1/v = -1/u + 1/f (a straight line with slope -1 and intercept 1/f on both axes).',
    circuitOrRayDiagramDescription: 'Optical bench axis: Object needle O placed at distance u from convex lens L. Rays from O refract through the lens and form a real, inverted image at distance v, where image needle I is positioned such that tip-to-tip parallax is completely removed.',
    workingFormulae: [
      {
        name: 'Lens Formula',
        formula: 'f = (u · v) / (u + v)',
        symbolMeanings: 'f = focal length, u = magnitude of object distance, v = magnitude of real image distance'
      },
      {
        name: 'Focal Length from 1/u vs 1/v Graph',
        formula: 'f = 1 / OA = 1 / OB',
        symbolMeanings: 'OA = intercept on 1/v axis, OB = intercept on 1/u axis'
      }
    ],
    procedureSteps: [
      'Determine rough focal length of the convex lens by focusing distant tree/window onto a white wall.',
      'Level the optical bench horizontally using leveling screws and spirit level.',
      'Mount lens at central mark (e.g. 50.0 cm) on optical bench.',
      'Mount object needle on one side at distance greater than rough focal length f (e.g. at 20-35 cm from lens).',
      'Observe inverted real image of object needle looking through the lens from the opposite side.',
      'Adjust position of image needle until the inverted image tip touches the image needle tip.',
      'Remove parallax: Move your eye side to side. If the image tip and needle tip stay aligned without relative displacement, parallax is zero. If not, adjust image needle distance.',
      'Perform index correction between needle tips and lens optical center using knitting needle.',
      'Record positions of lens, object needle, and image needle for 6 different values of u.',
      'Plot u vs v curve and 1/u vs 1/v straight line graph.'
    ],
    observationTableHeaders: [
      'Obs No.',
      'Object Dist u (cm)',
      'Image Dist v (cm)',
      '1/u (cm^-1)',
      '1/v (cm^-1)',
      'Focal Length f = uv/(u+v) (cm)'
    ],
    sampleObservationData: [
      {
        sNo: 1,
        readings: { 'u (cm)': 25.0, 'v (cm)': 37.5, '1/u': 0.040, '1/v': 0.0267, 'f (cm)': 15.0 }
      },
      {
        sNo: 2,
        readings: { 'u (cm)': 30.0, 'v (cm)': 30.0, '1/u': 0.0333, '1/v': 0.0333, 'f (cm)': 15.0 }
      },
      {
        sNo: 3,
        readings: { 'u (cm)': 35.0, 'v (cm)': 26.25, '1/u': 0.0286, '1/v': 0.0381, 'f (cm)': 15.0 }
      }
    ],
    calculationSteps: [
      'Mean focal length from calculation: f = (15.0 + 15.0 + 15.0) / 3 = 15.0 cm.',
      'From 1/u vs 1/v graph: Intercept OA on 1/v axis = 0.0667 cm^-1 => f = 1 / 0.0667 = 15.0 cm.',
      'From u-v graph: Intersection with line u = v gives u = 30 cm, v = 30 cm => 2f = 30 cm => f = 15.0 cm.'
    ],
    sourcesOfError: [
      'Incomplete removal of parallax between needle tip and image tip.',
      'Non-collinearity of optical needle tips with the optical center of the lens.',
      'Index error between physical needle scale index and optical tip.'
    ],
    precautions: [
      'Optical centers and tips of both needles must lie along the same horizontal optical axis.',
      'Parallax must be checked carefully by moving the eye from extreme left to extreme right.',
      'Object needle must be placed beyond focal point F (u > f); if placed inside F, image formed is virtual and cannot be caught on an image needle.'
    ],
    vivaVoceQuestions: [
      {
        question: 'What is parallax and how is it removed?',
        expectedAnswer: 'Parallax is the apparent relative shift in the positions of two objects when the observer changes their viewing angle. It is removed when the two tips coincide in the exact same spatial plane; then, moving the eye left or right causes no relative displacement between them.',
        examinerFocus: 'Experimental technique and parallax optics.'
      },
      {
        question: 'What will happen if the upper half of the convex lens is covered with black paper?',
        expectedAnswer: 'The full image will still be formed at the exact same location and with identical size, because every portion of the lens refracts light from the object. However, the brightness (intensity) of the image will be halved because the light-gathering area is reduced by 50%.',
        examinerFocus: 'Wave/ray optics principles.'
      },
      {
        question: 'What is index error in an optical bench experiment?',
        expectedAnswer: 'Index error is the discrepancy between the actual distance between the lens surface and needle tip, and the distance indicated by the upright index marks on the bench scale.',
        examinerFocus: 'Error correction methodology.'
      }
    ]
  },

  // Experiment 4: Angle of Minimum Deviation of Prism (Section B)
  {
    id: 'prac-phy-b-02',
    section: 'Section-B',
    experimentNumber: 4,
    title: 'Angle of Minimum Deviation for a Glass Prism',
    aim: 'To determine the angle of minimum deviation for a given glass prism by plotting a graph between the angle of incidence and the angle of deviation.',
    apparatusRequired: [
      'Drawing board and drawing pins',
      'White paper sheet',
      'Equilateral glass prism (refracting angle A = 60 degrees)',
      'Office fixing pins (4 sharp optical pins)',
      'Protractor with 0.5-degree graduations',
      'Half-meter wooden scale'
    ],
    theoreticalPrinciple: 'When a ray of light passes through a triangular glass prism, the net angle of deviation delta is related to angle of incidence i, angle of emergence e, and refracting angle of prism A by i + e = A + delta. As angle of incidence i increases, deviation delta initially decreases, reaches a unique minimum value D_m (angle of minimum deviation), and then increases again. At minimum deviation: (1) Angle of incidence equals angle of emergence (i = e), (2) Angle of refraction at first surface equals angle of incidence at second surface (r1 = r2 = A/2), and (3) Refracted ray passes symmetrically parallel to the prism base. The refractive index n of the glass prism is given by n = sin[(A + D_m) / 2] / sin[A / 2].',
    circuitOrRayDiagramDescription: 'Prism ABC with base BC. Incident ray with angle of incidence i, refracted ray inside prism parallel to base BC, emergent ray with angle of emergence e. Extension of incident and emergent rays intersect at angle of deviation delta.',
    workingFormulae: [
      {
        name: 'Prism Formula for Refractive Index',
        formula: 'n = sin((A + D_m) / 2) / sin(A / 2)',
        symbolMeanings: 'n = refractive index of prism glass, A = prism angle (60 deg for equilateral prism), D_m = angle of minimum deviation'
      },
      {
        name: 'General Deviation Relation',
        formula: 'delta = i + e - A',
        symbolMeanings: 'delta = angle of deviation, i = incident angle, e = emergent angle, A = prism angle'
      }
    ],
    procedureSteps: [
      'Fix a white sheet of paper on the drawing board using drawing pins.',
      'Place the prism on the sheet and trace its triangular boundary ABC with a sharp pencil.',
      'Draw a normal at a point on refracting face AB and draw incident lines at angles i = 35°, 40°, 45°, 50°, 55°, 60° to the normal.',
      'Fix two pins P1 and P2 vertically on the incident ray at least 5 cm apart.',
      'Look through face AC and fix two pins P3 and P4 such that pins P1, P2 and the images of P3, P4 lie strictly on the same straight line.',
      'Remove prism and pins, encircle pin pricks, and draw emergent ray through P3 and P4.',
      'Extend incident ray forward and emergent ray backward to measure angle of deviation delta with protractor.',
      'Plot graph between angle of incidence i (x-axis) and angle of deviation delta (y-axis).',
      'Read lowest point of curve to determine D_m.'
    ],
    observationTableHeaders: [
      'Obs No.',
      'Angle of Incidence i (deg)',
      'Angle of Deviation delta (deg)'
    ],
    sampleObservationData: [
      { sNo: 1, readings: { 'i (deg)': 35, 'delta (deg)': 43.0 } },
      { sNo: 2, readings: { 'i (deg)': 40, 'delta (deg)': 39.5 } },
      { sNo: 3, readings: { 'i (deg)': 45, 'delta (deg)': 37.5 } },
      { sNo: 4, readings: { 'i (deg)': 50, 'delta (deg)': 38.0 } },
      { sNo: 5, readings: { 'i (deg)': 55, 'delta (deg)': 40.0 } },
      { sNo: 6, readings: { 'i (deg)': 60, 'delta (deg)': 43.5 } }
    ],
    calculationSteps: [
      'From i-delta curve, the minimum deviation occurs at the trough: D_m = 37.5 degrees.',
      'Prism angle A = 60.0 degrees.',
      '(A + D_m) / 2 = (60.0 + 37.5) / 2 = 97.5 / 2 = 48.75 degrees.',
      'sin(48.75°) = 0.7518; sin(A/2) = sin(30°) = 0.5000.',
      'Refractive index: n = 0.7518 / 0.5000 = 1.5036 ~ 1.50 (Crown glass standard value).'
    ],
    sourcesOfError: [
      'Pins not fixed strictly vertically.',
      'Pin separation less than 5 cm, causing angular misalignment.',
      'Measurement error with protractor parallax.'
    ],
    precautions: [
      'Distance between pins P1-P2 and P3-P4 must be at least 5 to 8 cm for accurate ray alignment.',
      'Pins must be straight and fixed vertically into the board.',
      'The same corner of the prism must be used as refracting edge A for all observations.'
    ],
    vivaVoceQuestions: [
      {
        question: 'What special ray orientation occurs inside the prism at minimum deviation?',
        expectedAnswer: 'At minimum deviation, the refracted ray passes symmetrically through the prism and is strictly parallel to the base BC of an equilateral prism.',
        examinerFocus: 'Symmetry condition at minimum deviation.'
      },
      {
        question: 'Why does light disperse into spectral colors when passing through a prism?',
        expectedAnswer: 'Cauchy\'s dispersion relation states n(lambda) = A + B / lambda². Different colors have different wavelengths (lambda_red > lambda_violet), so the refractive index of glass is higher for violet light than red light. Hence, violet bends the most and red bends the least.',
        examinerFocus: 'Dispersion and wavelength dependence of refractive index.'
      },
      {
        question: 'Can the angle of deviation ever be zero for a glass prism in air?',
        expectedAnswer: 'No, because the refractive index of glass (n ~ 1.5) is strictly greater than air (n = 1.0) and prism faces are inclined at angle A > 0, ensuring non-zero refraction and deviation.',
        examinerFocus: 'Snell\'s law boundary conditions.'
      }
    ]
  }
];
