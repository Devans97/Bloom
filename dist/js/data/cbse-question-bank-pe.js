/**
 * CBSE Class XII Physical Education (048) - Official Question Bank & Step-Marking Rubrics
 * 2026-2027 Examination Blueprint Standard
 * Authentic CBSE questions across Fixtures, Yoga, Biomechanics, Physiology, and Training.
 */
export const cbsePEQuestionBank = [
    // SECTION A: 1-Mark MCQs
    {
        id: 'pe-q-001',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'How many total matches will be played in a knock-out tournament of 21 teams?',
        mcqOptions: [
            { key: 'A', text: '20' },
            { key: 'B', text: '21' },
            { key: 'C', text: '42' },
            { key: 'D', text: '11' }
        ],
        correctOption: 'A',
        rubrics: [
            { criterion: 'Use formula for knock-out total matches: N - 1', marks: 1.0 }
        ],
        modelAnswer: 'Option (A): 20. In any knock-out tournament, each match eliminates exactly one team. To find one champion among N teams, N - 1 teams must be eliminated. Hence, Total Matches = N - 1 = 21 - 1 = 20 matches.',
        examinerNotes: 'In league tournaments, the formula is N · (N - 1) / 2; in knock-out tournaments it is simply N - 1.'
    },
    {
        id: 'pe-q-002',
        chapterId: 'pe-2-1',
        subjectId: 'pe',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'Which of the following postural deformities is characterized by an abnormal lateral (sideway) curvature of the vertebral column?',
        mcqOptions: [
            { key: 'A', text: 'Kyphosis' },
            { key: 'B', text: 'Lordosis' },
            { key: 'C', text: 'Scoliosis' },
            { key: 'D', text: 'Knock Knees' }
        ],
        correctOption: 'C',
        rubrics: [
            { criterion: 'Identify Scoliosis as lateral spine curvature', marks: 1.0 }
        ],
        modelAnswer: 'Option (C): Scoliosis. Scoliosis is a sideways deviation of the human spine in an "S" or "C" shape. In contrast, Kyphosis is an exaggerated posterior curvature (hunchback) and Lordosis is an inward lumbar curvature (hollow back).',
        examinerNotes: 'Corrective asanas for Scoliosis include Trikonasana and hanging on horizontal bars.'
    },
    // SECTION B & C: 2-Mark and 3-Mark Questions
    {
        id: 'pe-q-003',
        chapterId: 'pe-7-1',
        subjectId: 'pe',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'What does the acronym PRICE stand for in sports first aid? Briefly describe the significance of "I" (Ice).',
        rubrics: [
            { criterion: 'Full expansion of PRICE: Protect, Rest, Ice, Compress, Elevate', marks: 1.0 },
            { criterion: 'Significance of Ice: Vasoconstriction, reduces swelling/edema, numbs pain', marks: 1.0 }
        ],
        modelAnswer: '1. Expansion of PRICE:\n- P: Protect (immobilize the injured part)\n- R: Rest (cease all physical exertion)\n- I: Ice (apply cold packs)\n- C: Compress (wrap with elastic crepe bandage)\n- E: Elevate (raise limb above heart level)\n\n2. Significance of "I" (Ice):\nApplying cold packs for 15–20 minutes every 2 hours induces local vasoconstriction (narrowing of blood vessels), thereby arresting internal capillary bleeding, reducing inflammatory edema (swelling), lowering cellular metabolic rate, and numbing peripheral nerve endings to alleviate acute pain.',
        examinerNotes: 'Never apply ice directly to bare skin without a cloth barrier to prevent cold burns/frostbite.'
    },
    {
        id: 'pe-q-004',
        chapterId: 'pe-8-1',
        subjectId: 'pe',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Explain the three factors that affect the trajectory and horizontal range of a projectile in sports (e.g. shot put or javelin throw).',
        rubrics: [
            { criterion: 'Initial Velocity of Release: Most critical, range proportional to v^2', marks: 1.0 },
            { criterion: 'Angle of Release: Optimum theoretical 45 deg, practical 35-42 deg', marks: 1.0 },
            { criterion: 'Height of Release: Greater release height extends flight time and range', marks: 1.0 }
        ],
        modelAnswer: '1. Initial Velocity of Projection (v):\nInitial velocity is the most decisive factor determining range, because horizontal distance is directly proportional to the square of initial velocity (R proportional to v^2). A small percentage increase in release speed yields a substantial increase in throwing distance.\n\n2. Angle of Projection (theta):\nIn physics, the maximum theoretical range over level ground occurs at 45 degrees. However, in sports where the projectile is released from above ground level (like shot put at shoulder height ~2 m), the optimal angle of release is slightly less than 45 degrees, typically between 37 and 42 degrees.\n\n3. Height of Release (h):\nIf the initial velocity and release angle remain constant, increasing the height from which the implement is released increases the projectile’s total time of flight before hitting the ground, directly increasing the total horizontal distance.',
        examinerNotes: 'Mentioning that release height causes the optimal angle to be less than 45 degrees shows high competency.'
    },
    // SECTION E: 5-Mark Long Answer Question
    {
        id: 'pe-q-005',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        section: 'E',
        marks: 5,
        questionType: 'LA',
        questionText: 'Draw a knock-out fixture for 19 teams participating in an Inter-School Basketball Tournament, clearly showing calculations for total matches, number of teams in upper and lower halves, total number of byes, and bye allocation sequence.',
        rubrics: [
            { criterion: 'Total matches calculation: N - 1 = 18 matches', marks: 0.5 },
            { criterion: 'Upper/Lower half formula: Upper = (19+1)/2 = 10; Lower = (19-1)/2 = 9', marks: 1.0 },
            { criterion: 'Total Byes calculation: Next power of 2 (32) - 19 = 13 byes; Byes in upper = (13-1)/2 = 6, lower = (13+1)/2 = 7', marks: 1.0 },
            { criterion: 'Correct 4-step bye allocation procedure', marks: 1.0 },
            { criterion: 'Neat fixture diagram showing 5 rounds (Round 1 to Final)', marks: 1.5 }
        ],
        modelAnswer: `1. Mathematical Calculations:
- Total number of teams (N) = 19
- Total number of matches = N - 1 = 19 - 1 = 18 matches
- Number of teams in Upper Half (N_U) = (N + 1) / 2 = (19 + 1) / 2 = 10 teams (Teams 1 to 10)
- Number of teams in Lower Half (N_L) = (N - 1) / 2 = (19 - 1) / 2 = 9 teams (Teams 11 to 19)

2. Bye Calculations:
- Next higher power of 2 greater than 19 = 32 (2^5 = 32, meaning 5 total rounds)
- Total Number of Byes (NB) = 32 - 19 = 13 Byes
- Byes in Upper Half (NB_U) = (NB - 1) / 2 = (13 - 1) / 2 = 6 Byes
- Byes in Lower Half (NB_L) = (NB + 1) / 2 = (13 + 1) / 2 = 7 Byes

3. Standard Bye Allocation Sequence:
- 1st Bye: Bottom of Lower Half (Team 19)
- 2nd Bye: Top of Upper Half (Team 1)
- 3rd Bye: Top of Lower Half (Team 11)
- 4th Bye: Bottom of Upper Half (Team 10)
- Sequence repeats: 5th Bye (Team 18), 6th Bye (Team 2), 7th Bye (Team 12), 8th Bye (Team 9)...

4. Round 1 Fixture:
- In Round 1, only the 6 unseeded teams without byes play 3 matches:
  * Team 3 vs Team 4
  * Team 5 vs Team 6
  * Team 7 vs Team 8
- All 13 teams receiving byes advance directly to Round 2 (Round of 16).
- Round 2 features 8 matches, Round 3 (Quarterfinals) 4 matches, Round 4 (Semifinals) 2 matches, and Round 5 (Final) 1 match.
- Total matches = 3 + 8 + 4 + 2 + 1 = 18 matches.`,
        examinerNotes: 'Check that bye allocation strictly follows the official 4-point rule. Byes must be awarded to correct team numbers.'
    },
    {
        id: 'pe-q-005',
        chapterId: 'pe-1-6',
        subjectId: 'pe',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'In the Rikli and Jones Senior Citizen Fitness Test, which test item is specifically designed to assess upper body flexibility (shoulder range of motion)?',
        mcqOptions: [
            { key: 'A', text: 'Chair Stand Test' },
            { key: 'B', text: 'Arm Curl Test' },
            { key: 'C', text: 'Back Scratch Test' },
            { key: 'D', text: 'Eight Foot Up and Go Test' }
        ],
        correctOption: 'C',
        stepRubrics: [
            { step: 'Option C: Back Scratch Test measures shoulder flexibility by measuring distance between middle fingers behind back', marks: 1.0 }
        ],
        modelAnswer: 'Correct Option: (C). The Back Scratch Test is specifically designed to evaluate upper body (shoulder) flexibility by attempting to touch or overlap the middle fingers of both hands behind the back. Chair Stand measures lower body strength; Arm Curl measures upper body strength; Eight Foot Up and Go measures agility and dynamic balance.',
        examinerNotes: 'Standard 1-mark question from Unit 6 Test & Measurement.'
    },
    {
        id: 'pe-q-006',
        chapterId: 'pe-2-5',
        subjectId: 'pe',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'Distinguish between Isometric and Isotonic exercises with suitable examples of each.',
        stepRubrics: [
            { step: 'Isometric: Muscle tension increases without change in muscle length or external movement (e.g. wall sit, plank)', marks: 1.0 },
            { step: 'Isotonic: Muscle length changes (concentric/eccentric) with visible joint movement (e.g. push-ups, bicep curls)', marks: 1.0 }
        ],
        modelAnswer: '1. Isometric Exercises (Static):\n- The word "iso" means same, and "metric" means length.\n- In isometric contractions, muscle tension develops against an immovable resistance without any change in the external length of the muscle fibers.\n- No mechanical work is performed (Work = Force · 0 = 0).\n- Examples: Pushing against a solid wall, static plank hold, wall-sit.\n\n2. Isotonic Exercises (Dynamic):\n- The word "iso" means same, and "tonic" means tone/tension.\n- Muscle length changes visibly during contraction, consisting of concentric shortening and eccentric lengthening phases.\n- Mechanical work is performed with joint motion.\n- Examples: Push-ups, pull-ups, bicep curls, squats.',
        examinerNotes: 'Must mention that work done is zero in isometric exercises.'
    },
    {
        id: 'pe-q-007',
        chapterId: 'pe-2-5',
        subjectId: 'pe',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Explain the Fartlek training method for developing aerobic endurance. State its origin, operational principle, and four key advantages.',
        stepRubrics: [
            { step: 'Origin: Swedish word meaning "Speed Play", formulated by Gosta Holmer in 1937', marks: 1.0 },
            { step: 'Principle: Continuous running on natural cross-country terrain alternating pace between jogging, sprinting, and walking', marks: 1.0 },
            { step: 'Advantages: Heart rate variation (140-180 bpm), no specialized equipment required, breaks training monotony', marks: 1.0 }
        ],
        modelAnswer: '1. Origin & Meaning:\n"Fartlek" is a Swedish term that translates to "speed play". It was developed by Swedish coach Gösta Holmér in 1937 to combine continuous steady running with explosive interval bursts.\n\n2. Operational Principle:\n- Fartlek training is conducted on natural, unstructured terrain (forest trails, sandy beaches, hilly paths).\n- The athlete self-regulates pace based on physical intuition and terrain features, alternating between gentle jogging, steady aerobic pacing, uphill surging, and all-out sprinting, followed by active recovery walking.\n- Athlete heart rate fluctuates continuously between 140 to 180 beats per minute, training both aerobic and anaerobic energy systems simultaneously.\n\n3. Four Key Advantages:\n(a) Versatile Conditioning: Simultaneously trains aerobic and anaerobic metabolic pathways.\n(b) Psychological Freshness: Eliminates the boredom and monotony of track running.\n(c) Adaptable: Natural terrain conditions joint proprioception and stabilising muscles.\n(d) Economical: Requires no expensive gym machinery or athletic track.',
        examinerNotes: 'Emphasize that athlete regulates speed according to terrain and stamina (not predetermined whistle timer).'
    },
    {
        id: 'pe-q-008',
        chapterId: 'pe-1-2',
        subjectId: 'pe',
        section: 'E',
        marks: 5,
        questionType: 'LA',
        questionText: 'Explain the postural deformities Kyphosis, Lordosis, and Flat Foot. Discuss their anatomical causes and recommend two corrective yogic asanas for each.',
        stepRubrics: [
            { step: 'Kyphosis: Definition (excessive thoracic curvature), causes (heavy schoolbags, weak back muscles), and corrective asanas (Chakrasana, Bhujangasana)', marks: 1.5 },
            { step: 'Lordosis: Definition (inward lumbar curvature), causes (obesity, weak abdominals), and corrective asanas (Paschimottanasana, Halasana)', marks: 1.5 },
            { step: 'Flat Foot: Definition (absence of medial longitudinal arch), causes (excess weight, improper footwear), and corrective exercises/asanas (Tadasana, walking on heels/toes)', marks: 2.0 }
        ],
        modelAnswer: '1. Kyphosis (Round Upper Back / Humpback):\n- Nature: An abnormal outward convex curvature of the thoracic spine, leading to rounded shoulders and drooping neck.\n- Causes: Carrying excessively heavy backpacks on one shoulder, malnutrition (rickets), habitual slouching over study desks, and weak erector spinae muscles.\n- Corrective Asanas: (i) Bhujangasana (Cobra Pose) - extends thoracic spine backward; (ii) Dhanurasana (Bow Pose) - powerfully stretches chest and retracts scapulae.\n\n2. Lordosis (Swayback / Hollow Back):\n- Nature: An exaggerated inward concave curvature of the lumbar spine, causing the abdomen to protrude forward and pelvis to tilt anteriorly.\n- Causes: Excessive abdominal obesity, sedentary lifestyle, weak core and hamstring muscles, and wearing extreme high-heeled footwear.\n- Corrective Asanas: (i) Paschimottanasana (Seated Forward Bend) - flexes the lumbar spine forward; (ii) Halasana (Plow Pose) - reverses lumbar hyperextension and strengthens abdominal wall.\n\n3. Flat Foot (Pes Planus):\n- Nature: The collapse or absence of the natural medial longitudinal arch of the foot, causing the entire sole to make complete flat contact with the floor.\n- Causes: Wearing ill-fitting, rigid, or arch-less shoes, premature standing in early infancy, excessive body weight, and weak intrinsic plantar muscles.\n- Corrective Asanas & Exercises: (i) Tadasana (Mountain Pose on Tiptoes) - strengthens plantar fascia and gastrocnemius; (ii) Walking on heels and outer edges of feet; (iii) Picking up marbles with toes.',
        examinerNotes: 'Must provide both definition, anatomical causes, and two corrective exercises for all 3 deformities.'
    },
    {
        id: 'pe-q-009',
        chapterId: 'pe-2-2',
        subjectId: 'pe',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'In the acute management of soft tissue sports injuries, the physiological purpose of applying Ice (Cryotherapy) in the P.R.I.C.E. protocol is:',
        mcqOptions: [
            { key: 'A', text: 'To cause immediate local vasodilation and increase arterial blood flow' },
            { key: 'B', text: 'To cause local vasoconstriction, reduce metabolic rate and suppress edema formation' },
            { key: 'C', text: 'To soften ligamentous collagen fibers and facilitate stretching' },
            { key: 'D', text: 'To elevate deep core muscle temperature prior to competition' }
        ],
        correctOption: 'B',
        stepRubrics: [
            { step: 'Option B: Cryotherapy induces vasoconstriction, reduces capillary permeability and decreases swelling', marks: 1.0 }
        ],
        modelAnswer: 'Correct Option: (B). The physiological mechanism of cryotherapy (ice application) is to induce localized vasoconstriction of blood vessels. This reduces regional blood flow, decreases capillary membrane permeability, lowers the cellular metabolic demand of injured tissues, and numbs sensory nerve endings (analgesia), thereby preventing progressive hematoma and inflammatory edema.',
        examinerNotes: 'Emphasize vasoconstriction, not vasodilation.'
    },
    {
        id: 'pe-q-010',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        section: 'A',
        marks: 1,
        questionType: 'MCQ',
        questionText: 'What is the distinctive feature of "Special Seeding" in a knock-out tournament?',
        mcqOptions: [
            { key: 'A', text: 'Seeded teams play all their matches on home grounds only' },
            { key: 'B', text: 'Specially seeded teams bypass preliminary rounds and enter directly into the Quarterfinals or Semifinals' },
            { key: 'C', text: 'Teams are exempted from entry fees and medical screenings' },
            { key: 'D', text: 'Teams are given extra playing time during tie-breakers' }
        ],
        correctOption: 'B',
        stepRubrics: [
            { step: 'Option B: Special seeding allows outstanding players/teams to skip preliminary rounds directly to Quarterfinals/Semifinals', marks: 1.0 }
        ],
        modelAnswer: 'Correct Option: (B). In Special Seeding, defending champions or top-ranked international performers are directly seeded into advanced rounds of the tournament (such as the Quarterfinals or Semifinals), completely bypassing all preliminary knockout rounds to prevent premature elimination and ensure high spectator interest in later stages.',
        examinerNotes: 'Distinguish from ordinary seeding (ordinary seeded teams receive byes in Round 1 only).'
    },
    {
        id: 'pe-q-011',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        section: 'B',
        marks: 2,
        questionType: 'VSA',
        questionText: 'State four key differences between a Knock-out Tournament and a League (Round Robin) Tournament.',
        stepRubrics: [
            { step: 'Four contrasting criteria: Elimination vs chances, number of matches, duration/budget, true winner determination', marks: 2.0 }
        ],
        modelAnswer: 'Key Differences:\n1. Defeat Elimination: In a knock-out tournament, a team is eliminated immediately upon losing a single match. In a league tournament, every team plays against every other participating team regardless of wins or losses.\n\n2. Number of Matches: Knock-out requires far fewer matches [N - 1], whereas league tournaments require extensive matches [N(N - 1) / 2], demanding greater time, officials, and budgetary expenditure.\n\n3. Determination of Champion: In knockout tournaments, an exceptional team may be eliminated early due to a single bad day or unfair officiating. League tournaments reliably reward the most consistent and skilled team over time.\n\n4. Spectator Interest: Knock-out tournaments maintain high dramatic tension in every match due to elimination stakes, while league tournaments can have dull dead-rubber matches towards the end.',
        examinerNotes: 'Check that 4 distinct comparative points are made.'
    },
    {
        id: 'pe-q-012',
        chapterId: 'pe-2-3',
        subjectId: 'pe',
        section: 'C',
        marks: 3,
        questionType: 'SA',
        questionText: 'Explain the concept of Equilibrium in sports. Differentiate between Dynamic Equilibrium and Static Equilibrium with suitable sports illustrations.',
        stepRubrics: [
            { step: 'Equilibrium definition: State of balance when resultant of all forces acting on body is zero', marks: 1.0 },
            { step: 'Static equilibrium definition and sports example (handstand in gymnastics, archery stance)', marks: 1.0 },
            { step: 'Dynamic equilibrium definition and sports example (slalom skiing, figure skating spin)', marks: 1.0 }
        ],
        modelAnswer: '1. Concept of Equilibrium:\nIn biomechanics, equilibrium is defined as a state of balance in which the algebraic vector sum of all external forces acting upon a body equals zero (Sigma F = 0) and the sum of all external torques is zero (Sigma tau = 0).\n\n2. Static Equilibrium:\n- Definition: The ability of a stationary athlete to maintain body balance and postural stability when at rest.\n- Principles: Center of gravity (CG) must fall well within a wide base of support; lower CG provides greater stability.\n- Sports Examples: A gymnast holding a motionless "Iron Cross" on the rings, an archer maintaining steady aim before arrow release, or a wrestler holding a defensive bridge.\n\n3. Dynamic Equilibrium:\n- Definition: The ability of an athlete to maintain postural control, trajectory, and balance while in rapid motion or performing complex athletic movements.\n- Sports Examples: A downhill skier maintaining balance through high-speed slalom turns, a basketball guard executing a dynamic crossover dribble, or a figure skater executing a multi-rotation jump landing on a thin blade edge.',
        examinerNotes: 'Distinguish between static (at rest, low CG, wide base) and dynamic (in motion, rapidly shifting base of support).'
    }
];
export const peQuestionById = (id) => cbsePEQuestionBank.find(q => q.id === id);
