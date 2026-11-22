/**
 * CBSE Class XII Physical Education (048) - Exemplar Solutions & Technical Systems
 * 2026-2027 Blueprint Standard
 * Authentic tournament fixture calculations, biomechanical physics derivations,
 * physiology protocols, postural corrective asanas, and CBSE step-marking rubrics.
 */

export interface PEExemplarItem {
  id: string;
  unitId: string;
  unitName: string;
  title: string;
  type: 'calculation-fixture' | 'biomechanical-derivation' | 'postural-corrective' | 'injury-protocol' | 'long-answer';
  marksWeightage: 2 | 3 | 4 | 5;
  questionText: string;
  technicalFormulas?: string[];
  stepByStepSolution: {
    step: number;
    heading: string;
    detail: string;
    marksAwarded: number;
  }[];
  cbseMarkingSchemeNote: string;
  boardPitfalls: string[];
}

export const ncertExemplarPE: PEExemplarItem[] = [
  // Unit 1: Management of Sporting Events (pe-1-1)
  {
    id: 'ex-pe-01',
    unitId: 'pe-1-1',
    unitName: 'Management of Sporting Events',
    title: 'Knock-out Tournament Fixture for 21 Teams with Byes Distribution',
    type: 'calculation-fixture',
    marksWeightage: 5,
    questionText: 'Draw a knock-out fixture for 21 teams specifying the distribution of teams in Upper and Lower halves, calculation of byes, byes distribution formula, and total number of rounds and matches.',
    technicalFormulas: [
      'Total Matches: N - 1',
      'Upper Half (N is odd): (N + 1) / 2',
      'Lower Half (N is odd): (N - 1) / 2',
      'Total Byes: 2^x - N (where 2^x is the immediate next power of 2)',
      'Byes Upper Half: (NB - 1) / 2',
      'Byes Lower Half: (NB + 1) / 2',
      'Total Rounds: x (where 2^x is the chosen power of 2)'
    ],
    stepByStepSolution: [
      {
        step: 1,
        heading: 'Total Matches & Halves Division',
        detail: 'Total teams N = 21. Total matches M = N - 1 = 21 - 1 = 20 matches. Since N is odd: Upper Half (UH) = (N + 1)/2 = (21 + 1)/2 = 11 teams (Teams 1 to 11). Lower Half (LH) = (N - 1)/2 = (21 - 1)/2 = 10 teams (Teams 12 to 21).',
        marksAwarded: 1.0
      },
      {
        step: 2,
        heading: 'Calculation of Total Byes and Rounds',
        detail: 'Immediate next power of 2 greater than 21 is 2^5 = 32. Total Byes NB = 32 - 21 = 11 byes. Total Rounds R = 5 rounds (since 2^5 = 32). Byes in Upper Half = (NB - 1)/2 = (11 - 1)/2 = 5 byes. Byes in Lower Half = (NB + 1)/2 = (11 + 1)/2 = 6 byes.',
        marksAwarded: 1.5
      },
      {
        step: 3,
        heading: 'Rule of Byes Allotment',
        detail: '1st Bye -> Last team of Lower Half (Team 21).\n2nd Bye -> 1st team of Upper Half (Team 1).\n3rd Bye -> 1st team of Lower Half (Team 12).\n4th Bye -> Last team of Upper Half (Team 11).\n5th to 11th Byes -> Cycle repeats in identical order until all 11 byes are allocated.',
        marksAwarded: 1.0
      },
      {
        step: 4,
        heading: 'Round-wise Structure',
        detail: 'Round 1: 10 unseeded teams play 5 matches (leaving 5 winners). Round 2: 5 Round 1 winners + 11 teams with byes = 16 teams play 8 matches. Round 3 (Quarter-finals): 8 teams play 4 matches. Round 4 (Semi-finals): 4 teams play 2 matches. Round 5 (Final): 2 teams play 1 match to decide champion.',
        marksAwarded: 1.5
      }
    ],
    cbseMarkingSchemeNote: '1 mark for halves division, 1.5 for byes & rounds formula, 1 mark for allotment sequence, 1.5 for round-wise match breakdown diagram.',
    boardPitfalls: [
      'Confusing the formulas: For teams in Upper Half it is (N+1)/2, but for Byes in Upper Half it is (NB-1)/2.',
      'Assigning byes randomly instead of following the strict 4-step cyclical rule.'
    ]
  },

  // Unit 2: Children and Women in Sports (pe-1-2)
  {
    id: 'ex-pe-02',
    unitId: 'pe-1-2',
    unitName: 'Children and Women in Sports',
    title: 'The Female Athlete Triad: Symptoms, Health Risks, and Prevention',
    type: 'long-answer',
    marksWeightage: 5,
    questionText: 'What is the Female Athlete Triad? Detail its three interrelated components, psychological triggers, long-term physiological hazards, and comprehensive clinical-athletic management.',
    technicalFormulas: [
      'Energy Availability (EA) = (Energy Intake - Exercise Energy Expenditure) / Fat Free Mass (kcal/kg FFM/day)',
      'Clinical Threshold: EA < 30 kcal/kg FFM/day triggers neuroendocrine dysfunction'
    ],
    stepByStepSolution: [
      {
        step: 1,
        heading: 'Definition of Triad',
        detail: 'The Female Athlete Triad is an interrelated syndrome of three clinical conditions commonly observed in competitive female athletes: (1) Low Energy Availability (with or without Disordered Eating), (2) Menstrual Dysfunction (Oligomenorrhea / Functional Hypothalamic Amenorrhea), and (3) Decreased Bone Mineral Density (Osteopenia / Osteoporosis).',
        marksAwarded: 1.0
      },
      {
        step: 2,
        heading: 'Component 1: Low Energy Availability (LEA)',
        detail: 'Occurs when dietary energy intake is insufficient to cover exercise energy expenditure plus basal metabolic processes. Often driven by restrictive eating, intense aesthetic pressures in judged sports (gymnastics, figure skating, distance running), leading to severe energy deficit (EA < 30 kcal/kg FFM/day).',
        marksAwarded: 1.0
      },
      {
        step: 3,
        heading: 'Component 2: Functional Hypothalamic Amenorrhea (FHA)',
        detail: 'Chronic energy deficiency suppresses the hypothalamic release of Gonadotropin-Releasing Hormone (GnRH), blunting Luteinizing Hormone (LH) pulses. This severely diminishes ovarian estrogen and progesterone production, resulting in cessation of menstrual cycles for >= 3 consecutive months.',
        marksAwarded: 1.0
      },
      {
        step: 4,
        heading: 'Component 3: Osteoporosis / Impaired Bone Health',
        detail: 'Estrogen is crucial for bone remodeling as it inhibits osteoclastic bone resorption. Estrogen deficiency combined with elevated cortisol accelerates bone mineral loss, leading to premature low bone mass, stress fractures, and irreversible early-onset osteoporosis.',
        marksAwarded: 1.0
      },
      {
        step: 5,
        heading: 'Prevention & Clinical Intervention',
        detail: 'Multidisciplinary strategy: (a) Increase caloric intake by 300-600 kcal/day to restore EA > 45 kcal/kg FFM/day, (b) De-emphasize body weight and aesthetic judging criteria, (c) Calcium (1000-1300 mg/day) and Vitamin D (800-1000 IU/day) supplementation, (d) Cognitive behavioral therapy (CBT) for disordered eating attitudes.',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for definition, 1 mark for each of the 3 components with biochemical rationale, 1 mark for comprehensive management.',
    boardPitfalls: [
      'Calling amenorrhea a disease rather than a menstrual symptom resulting from endocrine axis suppression.',
      'Omitting the role of estrogen deficiency in accelerating bone mineral density loss.'
    ]
  },

  // Unit 7: Physiology and Injuries in Sports (pe-2-2)
  {
    id: 'ex-pe-03',
    unitId: 'pe-2-2',
    unitName: 'Physiology and Injuries in Sports',
    title: 'Acute Soft Tissue Injuries and the P.R.I.C.E. Protocol',
    type: 'injury-protocol',
    marksWeightage: 4,
    questionText: 'Distinguish between a sprain and a strain. Explain the P.R.I.C.E. treatment protocol for acute soft tissue sports injuries with physiological justification for each step.',
    technicalFormulas: [
      'P = Protect (immobilize to prevent secondary trauma)',
      'R = Rest (halt activity to reduce cardiac output to injured tissue)',
      'I = Ice (cryotherapy induces vasoconstriction, reduces metabolic demand)',
      'C = Compression (counteracts interstitial hydrostatic edema pressure)',
      'E = Elevation (enhances venous and lymphatic drainage above heart level)'
    ],
    stepByStepSolution: [
      {
        step: 1,
        heading: 'Distinction: Sprain vs Strain',
        detail: 'Sprain: An overstretching or tearing of LIGAMENTS (fibrous tissue connecting bone to bone), most common in ankles and wrists.\nStrain: An overstretching, tearing, or rupture of MUSCLE fibers or TENDONS (tissue connecting muscle to bone), common in hamstrings, quadriceps, and groin.',
        marksAwarded: 1.0
      },
      {
        step: 2,
        heading: 'P - Protection & R - Rest',
        detail: 'Protect: Splint or brace the injured segment to prevent further mechanical tissue damage.\nRest: Stop physical activity immediately for 24-48 hours. Continued movement increases heart rate, regional blood flow, and hematoma expansion.',
        marksAwarded: 1.0
      },
      {
        step: 3,
        heading: 'I - Ice (Cryotherapy)',
        detail: 'Apply crushed ice wrapped in a damp towel for 15-20 minutes every 2-3 hours. Physiological mechanism: Induces localized vasoconstriction, reducing capillary permeability, slowing inflammatory enzyme activity, and numbing peripheral nociceptors (pain relief). Never apply ice directly to bare skin.',
        marksAwarded: 1.0
      },
      {
        step: 4,
        heading: 'C - Compression & E - Elevation',
        detail: 'Compression: Apply an elastic crepe bandage from distal to proximal. Mechanism: Increases interstitial hydrostatic pressure, preventing excessive inflammatory fluid and hematoma accumulation.\nElevation: Elevate the injured limb 15-25 cm above heart level. Mechanism: Uses gravity to promote venous return and lymphatic drainage, minimizing edema.',
        marksAwarded: 1.0
      }
    ],
    cbseMarkingSchemeNote: '1 mark for sprain (ligament) vs strain (muscle/tendon), 1 mark for Protect & Rest, 1 mark for Ice with vasoconstriction, 1 mark for Compression & Elevation.',
    boardPitfalls: [
      'Confusing sprain and strain (writing ligament for strain or muscle for sprain loses full mark).',
      'Recommending heat packs immediately (heat during first 48 hours causes vasodilation and worsening edema).'
    ]
  },

  // Unit 8: Biomechanics and Sports (pe-2-3)
  {
    id: 'ex-pe-04',
    unitId: 'pe-2-3',
    unitName: 'Biomechanics and Sports',
    title: 'Newton\'s Laws of Motion Applied to Athletic Performance',
    type: 'biomechanical-derivation',
    marksWeightage: 5,
    questionText: 'State Newton\'s three laws of motion and illustrate each with two concrete, biomechanically accurate examples from sports and track-and-field events.',
    technicalFormulas: [
      'First Law: Sigma F = 0 => dv/dt = 0 (Inertia)',
      'Second Law: F = dp/dt = m · a (Acceleration proportional to net force)',
      'Third Law: F_AB = - F_BA (Action-Reaction)'
    ],
    stepByStepSolution: [
      {
        step: 1,
        heading: 'First Law (Law of Inertia)',
        detail: 'Statement: An object remains in its state of rest or uniform motion in a straight line unless acted upon by an external net unbalanced force.\nSports Application 1: A soccer ball placed on the penalty spot remains stationary until an unbalanced muscular force is applied by the kicker\'s foot.\nSports Application 2: A skater gliding on frictionless ice continues moving forward; stopping requires applying external friction via blade edges against ice.',
        marksAwarded: 1.5
      },
      {
        step: 2,
        heading: 'Second Law (Law of Acceleration: F = ma)',
        detail: 'Statement: The rate of change of momentum of a body is directly proportional to the applied force and occurs in the direction of the force (F = m · a).\nSports Application 1: In shot put, the athlete accelerates the shot by applying maximum force across the throwing circle. Since mass is fixed (7.26 kg for men, 4 kg for women), greater muscular force generates higher release acceleration and greater distance.\nSports Application 2: A baseball fielder pulls their hands backwards while catching a fast ball. Increasing impact time Delta t reduces the rate of momentum change (F = Delta p / Delta t), reducing impact force on the hands.',
        marksAwarded: 2.0
      },
      {
        step: 3,
        heading: 'Third Law (Law of Action and Reaction)',
        detail: 'Statement: To every action, there is an equal and opposite reaction.\nSports Application 1: In sprinting start blocks, the sprinter exerts a powerful backward and downward force against the blocks (Action). The blocks push forward and upward on the sprinter with equal force (Reaction), propelling the athlete into rapid forward acceleration.\nSports Application 2: In swimming (freestyle/breaststroke), the swimmer pushes water backwards with their hands and feet (Action). The water exerts an equal and opposite reaction force pushing the swimmer forward through the pool.',
        marksAwarded: 1.5
      }
    ],
    cbseMarkingSchemeNote: '1.5 marks for First Law with sports examples, 2 marks for Second Law with momentum and cushioning explanation, 1.5 marks for Third Law with starting block/swimming.',
    boardPitfalls: [
      'Giving everyday examples like car braking instead of sports-specific examples.',
      'Failing to mention momentum change (Delta p / Delta t) when explaining the second law in catching a ball.'
    ]
  }
];
