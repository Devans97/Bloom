/**
 * CBSE Class XII Physical Education (048) - Practical Examination Manual & Fitness Assessment Systems
 * 2026-2027 Blueprint Standard (30 Marks Scheme)
 * Authentic SAI Khelo India Fitness Test battery, major sports field dimensions & officiating rules,
 * therapeutic yogic asanas demonstration protocols, and official external examiner Viva-Voce banks.
 */
export const cbseFitnessTestBattery = [
    // Test 1: BMI
    {
        id: 'fit-01',
        testName: 'Body Mass Index (BMI)',
        componentMeasured: 'Body Composition (Weight-to-Height ratio)',
        equipmentRequired: ['Stadiometer (height scale)', 'Calibrated digital weighing scale'],
        protocolSteps: [
            'Subject removes shoes, heavy outerwear, and socks.',
            'Measure standing stature with stadiometer: heels together, buttocks and upper back touching vertical measuring rod, head in Frankfurt plane.',
            'Measure body weight in kilograms on digital scale.',
            'Compute BMI = Weight (kg) / [Height (m)]^2.'
        ],
        scoringMetric: 'kg/m^2',
        class12Norms: [
            {
                gender: 'male',
                excellent: '18.5 - 22.9 kg/m^2 (Normal)',
                good: '23.0 - 24.9 kg/m^2 (Overweight Grade 1)',
                average: '< 18.5 kg/m^2 (Underweight)',
                needsImprovement: '>= 25.0 kg/m^2 (Obese)'
            },
            {
                gender: 'female',
                excellent: '18.5 - 22.9 kg/m^2 (Normal)',
                good: '23.0 - 24.9 kg/m^2 (Overweight Grade 1)',
                average: '< 18.5 kg/m^2 (Underweight)',
                needsImprovement: '>= 25.0 kg/m^2 (Obese)'
            }
        ]
    },
    // Test 2: 50m Standing Start Sprint
    {
        id: 'fit-02',
        testName: '50-Meter Standing Start Sprint',
        componentMeasured: 'Acceleration and Maximum Running Speed',
        equipmentRequired: ['Marked 50-meter running track', 'Digital stopwatch (0.01s precision)', 'Clapper/whistle', 'Two visual cones'],
        protocolSteps: [
            'Subject adopts standing stationary starting position behind the start line (one foot forward).',
            'On command "Ready" followed by sound of clapper/whistle, subject sprints at 100% effort through the 50-meter finish line.',
            'Timer stops when subject\'s chest crosses the finish plane.'
        ],
        scoringMetric: 'Time in seconds (nearest 0.01s)',
        class12Norms: [
            {
                gender: 'male',
                excellent: '< 6.8 seconds',
                good: '6.9 - 7.5 seconds',
                average: '7.6 - 8.2 seconds',
                needsImprovement: '> 8.2 seconds'
            },
            {
                gender: 'female',
                excellent: '< 7.8 seconds',
                good: '7.9 - 8.6 seconds',
                average: '8.7 - 9.4 seconds',
                needsImprovement: '> 9.4 seconds'
            }
        ]
    },
    // Test 3: 600m Run/Walk
    {
        id: 'fit-03',
        testName: '600-Meter Run / Walk',
        componentMeasured: 'Cardiovascular / Aerobic Endurance',
        equipmentRequired: ['400m athletic track with marked 600m starting point', 'Stopwatches', 'Recording sheets'],
        protocolSteps: [
            'Standing start at 600m mark.',
            'On signal, subjects run/walk 600 meters in the shortest possible time.',
            'Walking is permitted, but subjects are encouraged to maintain continuous running pace.'
        ],
        scoringMetric: 'Minutes and seconds',
        class12Norms: [
            {
                gender: 'male',
                excellent: '< 2 min 15 sec',
                good: '2 min 16 sec - 2 min 40 sec',
                average: '2 min 41 sec - 3 min 10 sec',
                needsImprovement: '> 3 min 10 sec'
            },
            {
                gender: 'female',
                excellent: '< 2 min 45 sec',
                good: '2 min 46 sec - 3 min 15 sec',
                average: '3 min 16 sec - 3 min 50 sec',
                needsImprovement: '> 3 min 50 sec'
            }
        ]
    },
    // Test 4: Sit and Reach
    {
        id: 'fit-04',
        testName: 'Sit and Reach Box Test',
        componentMeasured: 'Lower Back and Hamstring Extensibility / Flexibility',
        equipmentRequired: ['Standard Sit and Reach Box with zero mark set at 25 cm or 23 cm footplate'],
        protocolSteps: [
            'Subject sits barefoot on floor with legs fully extended and soles pressed flat against the vertical face of the box.',
            'Knees must be held flat against floor by tester.',
            'Subject places hands with palms facing down (one hand over the other), reaches forward along the graduated scale smoothly without jerking.',
            'Hold maximum reach position for at least 2 full seconds.'
        ],
        scoringMetric: 'Centimeters (recorded to nearest 0.5 cm)',
        class12Norms: [
            {
                gender: 'male',
                excellent: '> +14 cm',
                good: '+7 to +13 cm',
                average: '0 to +6 cm',
                needsImprovement: '< 0 cm'
            },
            {
                gender: 'female',
                excellent: '> +16 cm',
                good: '+9 to +15 cm',
                average: '+1 to +8 cm',
                needsImprovement: '< +1 cm'
            }
        ]
    },
    // Test 5: Partial Curl-Up (30 seconds)
    {
        id: 'fit-05',
        testName: 'Partial Curl-Up (30 Seconds)',
        componentMeasured: 'Abdominal Muscular Strength and Local Endurance',
        equipmentRequired: ['Exercise mat', 'Cardboard template with parallel tape lines 11.4 cm apart', 'Metronome or stopwatch'],
        protocolSteps: [
            'Subject lies supine on cushioned mat with knees flexed at 90 degrees and feet flat on floor (feet not anchored).',
            'Arms straight at sides with fingertips resting on the nearer tape mark.',
            'Subject curls trunk upward until fingertips slide forward 11.4 cm to touch the second tape line.',
            'Lower back smoothly to mat. Repeat as many controlled repetitions as possible in 30 seconds.'
        ],
        scoringMetric: 'Number of completed curl-ups in 30 seconds',
        class12Norms: [
            {
                gender: 'male',
                excellent: '> 25 reps',
                good: '20 - 24 reps',
                average: '14 - 19 reps',
                needsImprovement: '< 14 reps'
            },
            {
                gender: 'female',
                excellent: '> 22 reps',
                good: '17 - 21 reps',
                average: '11 - 16 reps',
                needsImprovement: '< 11 reps'
            }
        ]
    }
];
export const cbseMajorSportsSpecs = [
    // Basketball
    {
        sportName: 'Basketball',
        courtOrFieldDimensions: 'Rectangular court: Length = 28 meters, Width = 15 meters. Rim height = 3.05 meters (10 feet) above floor. Backboard = 1.80m horizontal x 1.05m vertical. Three-point arc = 6.75 meters from center of basket.',
        equipmentSpecifications: [
            'Basketball size: Size 7 for men (circumference 75-77 cm, weight 567-650 g), Size 6 for women (circumference 72-74 cm, weight 510-567 g)',
            'Game duration: Four quarters of 10 minutes each (FIBA international standard)',
            'Shot clock: 24 seconds shot clock reset; 8-second backcourt transition rule'
        ],
        fundamentalSkills: [
            'Dribbling: Low defensive dribble, crossover dribble, behind-the-back dribble',
            'Passing: Chest pass, bounce pass, overhead pass, baseball pass',
            'Shooting: Set shot, jump shot, layup shot, free throw'
        ],
        officialRulesAndViolations: [
            'Traveling (walking): Moving pivot foot without releasing dribble',
            'Double Dribble: Dribbling with both hands simultaneously or resuming dribble after coming to a complete stop',
            'Three Seconds Rule: Offensive player cannot remain in opponent\'s restricted area (key) for > 3 seconds',
            'Foul Limits: 5 personal fouls disqualify a player in FIBA'
        ],
        refereeHandSignals: [
            'Traveling: Rotating fists around each other in a circular motion in front of chest',
            'Stop Clock for Foul: Clenched fist raised vertically with one arm, other arm pointing toward offender',
            'Three-Point Attempt: Three fingers raised on one hand; successful basket indicated by raising both arms with three fingers'
        ]
    },
    // Badminton
    {
        sportName: 'Badminton',
        courtOrFieldDimensions: 'Court Length = 13.40 meters. Singles Width = 5.18 meters; Doubles Width = 6.10 meters. Net height = 1.55 meters at posts and 1.524 meters at center of court. Short service line = 1.98 meters from net.',
        equipmentSpecifications: [
            'Racket: Frame length <= 680 mm, overall width <= 230 mm',
            'Shuttlecock: 16 feathers fixed in cork base, weight between 4.74 to 5.50 grams',
            'Scoring: Best of 3 games to 21 points (Rally point system); must win by 2 clear points up to maximum cap of 30 points'
        ],
        fundamentalSkills: [
            'Grip: Forehand (V-grip) and Backhand thumb-grip',
            'Footwork: Split-step, scissor kick, lunges',
            'Strokes: Forehand high clear, smash (jump smash), drop shot, net kill, backhand lift'
        ],
        officialRulesAndViolations: [
            'Service Fault: Shuttle must be struck below waist (1.15m fixed height) with racket head pointing downward',
            'Net Touch: Touching net or its supports with racket, body, or clothing during rally',
            'Line Rule: Boundary lines are considered inside the court'
        ],
        refereeHandSignals: [
            'Fault: Right arm raised vertically with palm forward',
            'Service Too High: Hand held horizontally at waist level',
            'Shuttle Out: Both arms extended horizontally sideways'
        ]
    }
];
export const cbseYogicProtocols = [
    {
        asanaName: 'Bhujangasana',
        englishTranslation: 'Cobra Pose',
        lifestyleConditionTargeted: 'Obesity',
        posturalSteps: [
            'Lie prone on mat with forehead resting on floor, legs together and toes pointing backward.',
            'Place palms flat on floor beside chest, elbows close to torso.',
            'Inhaling slowly, gently lift head, neck, and chest off the floor using spinal muscles; keep navel touching floor.',
            'Arch backward gently, looking upward; hold position for 15-30 seconds with normal breathing.',
            'Exhaling smoothly, return to prone starting position.'
        ],
        physiologicalBenefits: [
            'Compresses abdominal visceral organs, stimulating pancreatic beta-cells and metabolic enzymes.',
            'Strengthens erector spinae, deep multifidus, and rhomboid muscles.',
            'Expands thoracic chest cavity, increasing tidal volume.'
        ],
        contraindications: [
            'Severe abdominal hernia, peptic ulcers, or recent abdominal surgery.',
            'Pregnancy after first trimester.',
            'Severe lumbar disc herniation (sciatica).'
        ]
    },
    {
        asanaName: 'Pavanmuktasana',
        englishTranslation: 'Wind-Relieving Pose',
        lifestyleConditionTargeted: 'Diabetes',
        posturalSteps: [
            'Lie supine on back with legs straight and arms at sides.',
            'Inhaling, bend both knees and bring thighs tightly toward chest.',
            'Interlock fingers around shins just below knees.',
            'Exhaling, lift head and neck off floor, bringing chin or nose to touch knees.',
            'Maintain deep abdominal compression for 20-30 seconds; release slowly.'
        ],
        physiologicalBenefits: [
            'Applies direct mechanical pressure on pancreas and liver, enhancing insulin sensitivity.',
            'Massages descending and sigmoid colon, eliminating gastrointestinal trapped gases.',
            'Relieves chronic lower back muscular tension.'
        ],
        contraindications: [
            'Acute cervical spondylosis or neck injuries (keep head flat on mat instead of lifting).',
            'Severe hypertension or cardiac disorders.'
        ]
    }
];
export const cbsePEVivaQuestions = [
    {
        question: 'What is the formula to calculate Byes in a knock-out tournament?',
        expectedAnswer: 'Total Byes = 2^x - N, where N is the total number of participating teams and 2^x is the immediate next power of 2 greater than or equal to N.',
        examinerFocus: 'Knock-out tournament mechanics.'
    },
    {
        question: 'What is the difference between active and passive flexibility?',
        expectedAnswer: 'Active flexibility is the ability to execute joint movements with greater range without any external assistance (relying purely on one\'s own muscular contractions). Passive flexibility is the ability to achieve maximum range of motion with the help of an external partner or equipment.',
        examinerFocus: 'Components of physical fitness.'
    },
    {
        question: 'What is the full form and clinical significance of the P.R.I.C.E. protocol in sports injuries?',
        expectedAnswer: 'P - Protect (immobilize), R - Rest (stop movement), I - Ice (vasoconstriction and pain relief), C - Compress (control swelling), E - Elevate (venous drainage above heart). It is the gold standard immediate first-aid protocol for acute soft tissue sports injuries during the initial 24 to 48 hours.',
        examinerFocus: 'First aid and sports medicine.'
    },
    {
        question: 'What is the Female Athlete Triad and why is it dangerous?',
        expectedAnswer: 'It is a syndrome consisting of three interrelated conditions: (1) Low Energy Availability (disordered eating), (2) Menstrual dysfunction (amenorrhea), and (3) Low Bone Mineral Density (osteoporosis). It causes irreversible bone density loss, chronic fatigue, stress fractures, and endocrine collapse.',
        examinerFocus: 'Women in sports physiology.'
    }
];
