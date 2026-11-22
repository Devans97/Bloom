import { createSource, PE_SYLLABUS_URL, buildActivitiesForTopic } from './curriculum-builder.js';
const peSource = (section, page = 13) => createSource('Physical Education', '048', PE_SYLLABUS_URL, page, section, true);
export const peTopicDefinitions = [
    // Unit 1: Management of Sporting Events (pe-1-1)
    {
        id: 'pe-048-xii-2026-27-u01-topic01',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        title: 'Sports event management functions and committees',
        officialScope: 'Functions of Sports Events Management (Planning, Organising, Staffing, Directing & Controlling). Various Committees & their Responsibilities (pre; during & post).',
        source: peSource('Unit 1: Management of Sporting Events', 13),
        objective: 'Explain the 5 management functions in sports and delineate pre-, during-, and post-event committee duties.',
        minutes: 30,
        learnSteps: [
            'Define sports management functions: Planning (setting objectives, policies, budgets), Organizing (structural distribution of roles), Staffing (recruitment of officials and referees), Directing (motivating and guiding teams), Controlling (monitoring execution against targets).',
            'Pre-tournament committees: Publicity, Finance, Accommodation and Food, Ground and Equipment, Reception, Technical officials.',
            'During-tournament committees: Referees and Judges, First Aid and Medical, Refreshment, Discipline, Scoreboard and Announcement.',
            'Post-tournament committees: Prize Distribution, Transport, Accounts audit, Press report release, Cleaning and ground restoration.'
        ],
        practiceSteps: [
            'Construct organizational flow chart for conducting State Level Athletics Meet in school.',
            'Specify responsibilities of Technical Committee versus Reception Committee.',
            'Answer past CBSE 3-mark questions on post-meet administrative responsibilities.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u01-topic02',
        chapterId: 'pe-1-1',
        subjectId: 'pe',
        title: 'Fixtures: Knock-out (bye/seeding) and League (round robin)',
        officialScope: 'Fixtures and its Procedure - Knock-Out (Bye & Seeding) & League (Staircase & Cyclic). Intramural & Extramural tournaments; Community Sports Program.',
        source: peSource('Unit 1: Management of Sporting Events', 13),
        objective: 'Calculate byes and draw knock-out and league tournament fixtures (cyclic and staircase methods).',
        minutes: 35,
        learnSteps: [
            'Knock-out tournament rules: total matches = N - 1; number of teams in upper half = (N + 1)/2, lower half = (N - 1)/2 for odd N.',
            'Calculate byes: total byes = next power of 2 minus N; bye allocation sequence (1st bye to bottom of lower half, 2nd bye to top of upper half, 3rd bye to top of lower half, 4th bye to bottom of upper half).',
            'Explain seeding (placing top teams in different halves so they do not clash in early rounds) and special seeding.',
            'League tournament fixture rules: total matches = N · (N - 1) / 2; draw fixtures using Cyclic method (fixing team 1 for odd/even N) and Staircase method.',
            'Differentiate Intramural (competitions within walls of single institution) from Extramural (inter-school/inter-district meets).',
            'Review community sports: Sports Day, Health Run, Run for Fun, Run for Unity, Run for Awareness.'
        ],
        practiceSteps: [
            'Draw knock-out fixture for 19 teams showing upper/lower halves, rounds, and bye allocations.',
            'Draw league fixture for 7 teams using cyclic method and calculate total matches.',
            'Explain difference between standard seeding and special seeding with diagram.'
        ]
    },
    // Unit 2: Children and Women in Sports (pe-2-1)
    {
        id: 'pe-048-xii-2026-27-u02-topic01',
        chapterId: 'pe-2-1',
        subjectId: 'pe',
        title: 'Common postural deformities and corrective exercises',
        officialScope: 'Common Postural Deformities - Knock Knee; Flat Foot; Round Shoulders; Lordosis, Kyphosis, Bow Legs and Scoliosis and their corrective measures.',
        source: peSource('Unit 2: Children and Women in Sports', 13),
        objective: 'Identify spine and leg postural deformities, root causes, and prescribe specific corrective yoga/exercises.',
        minutes: 35,
        learnSteps: [
            'Spinal deformities: Kyphosis (abnormal convex curvature of thoracic spine / hunchback; causes: weak muscles, carrying heavy loads; corrective: Bhujangasana, Dhanurasana, backward bending).',
            'Lordosis: inward curvature of lumbar spine; causes: obesity, weak abdominal muscles; corrective: Paschimottanasana, Halasana, sit-ups.',
            'Scoliosis: lateral sideways S or C deviation of spine; causes: carrying heavy bags on one shoulder, short leg; corrective: Trikonasana, Ardha Matsyendrasana, hanging on horizontal bar.',
            'Leg deformities: Knock Knees (genu valgum, knees touch when feet apart; corrective: Padmasana, horse riding, keeping pillow between knees).',
            'Bow Legs (genu varum, gap between knees when feet touch; corrective: walking on inner edge of feet, Garudasana, Ardha Matsyendrasana).',
            'Flat Foot (pes planus, absence of medial longitudinal arch; corrective: walking on toes, picking marbles with toes, Vajrasana).'
        ],
        practiceSteps: [
            'Match deformities with corrective exercises in past board question formats.',
            'Explain causes and remedies for Round Shoulders (Chakrasana, Dhanurasana).',
            'Describe tests used to diagnose Flat Foot (wet footprint test).'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u02-topic02',
        chapterId: 'pe-2-1',
        subjectId: 'pe',
        title: 'Women in sports: Menarche, dysfunction and Female Athlete Triad',
        officialScope: 'Special consideration (Menarche and Menstrual Dysfunction). Female Athlete Triad (Osteoporosis, Amenorrhea, Eating Disorders).',
        source: peSource('Unit 2: Children and Women in Sports', 13),
        objective: 'Explain menarche, menstrual dysfunction, and analyze components of the Female Athlete Triad.',
        minutes: 30,
        learnSteps: [
            'Define Menarche (onset of first menstrual cycle in adolescent females) and Menstrual Dysfunction (irregular cycles, dysmenorrhea, oligomenorrhea).',
            'Female Athlete Triad: interrelationship between energy availability, menstrual function, and bone mineral density.',
            'Component 1 - Osteoporosis: low bone mineral density, microarchitectural deterioration, high susceptibility to stress fractures due to suppressed estrogen levels.',
            'Component 2 - Amenorrhea: primary amenorrhea (no menarche by age 15) and secondary amenorrhea (absence of menstrual periods for 3 or more consecutive months in previously cycling female athletes due to low energy availability).',
            'Component 3 - Eating Disorders: Anorexia Nervosa (severe restriction of energy intake, intense fear of gaining weight, distorted body image) and Bulimia Nervosa (cycles of binge eating followed by compensatory purging, vomiting, or laxative abuse).'
        ],
        practiceSteps: [
            'Explain physiological mechanisms linking low energy availability with amenorrhea and early osteoporosis in female runners and gymnasts.',
            'Compare symptoms and psychological profiles of Anorexia Nervosa vs Bulimia Nervosa.',
            'State strategies for coaches to prevent and address Female Athlete Triad.'
        ]
    },
    // Unit 3: Yoga as Preventive Measure for Lifestyle Disease (pe-3-1)
    {
        id: 'pe-048-xii-2026-27-u03-topic01',
        chapterId: 'pe-3-1',
        subjectId: 'pe',
        title: 'Yoga for Obesity, Diabetes and Asthma',
        officialScope: 'Obesity: Procedure, Benefits & Contraindications for Tadasana, Katichakrasana, Pavanmuktasana, Matsyasana, Halasana, Paschimottanasana, Ardha Matsyendrasana, Dhanurasana. Diabetes: Procedure, Benefits & Contraindications for Katichakrasana, Pavanmuktasana, Bhujangasana, Shalabhasana, Dhanurasana, Supta-vajrasana, Paschimottanasana, Ardha Matsyendrasana, Mandukasana, Gomukhasana, Yogmudra. Asthma: Tadasana, Urdhwahastottanasana, Uttan Mandukasana, Bhujangasana, Dhanurasana, Gomukhasana, Gorakshasana, Matsyasana, Anuloma-Viloma.',
        source: peSource('Unit 3: Yoga as Preventive Measure for Lifestyle Disease', 14),
        objective: 'Detail procedure, health benefits, and medical contraindications of preventive yoga asanas.',
        minutes: 35,
        learnSteps: [
            'Obesity management: Paschimottanasana (seated forward bend stretches hamstrings and compresses abdomen, contraindication: slipped disc), Dhanurasana (bow pose stimulates thyroid, burns belly fat, contraindication: high BP, hernia), Halasana (plough pose stimulates pancreas, contraindication: cervical spondylitis).',
            'Diabetes management: Mandukasana (frog pose presses fists into abdomen stimulating beta-cells of Islets of Langerhans to secrete insulin, contraindication: abdominal surgery), Ardha Matsyendrasana (half spinal twist massages internal organs, improves digestion).',
            'Asthma management: Bhujangasana (cobra pose opens thoracic chest cavity, expands lung vital capacity), Gomukhasana (cow face pose opens bronchial tubes, strengthens respiratory muscles), Matsyasana (fish pose relieves respiratory congestion), Anuloma-Viloma pranayama (alternate nostril breathing regulates oxygen flow).'
        ],
        practiceSteps: [
            'Write step-by-step execution procedure and contraindications for Mandukasana for diabetic patients.',
            'Identify two asanas contraindicated for individuals suffering from severe cervical spondylitis or hernia.',
            'Explain how Dhanurasana acts as a multi-benefit asana for both obesity and asthma.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u03-topic02',
        chapterId: 'pe-3-1',
        subjectId: 'pe',
        title: 'Yoga for Hypertension and back pain',
        officialScope: 'Hypertension: Procedure, Benefits & Contraindications for Tadasana, Katichakrasana, Uttanpadasana, Ardha Halasana, Sarvangasana, Gomukhasana, Uttan Mandukasana, Vakrasana, Bhujangasana, Makarasana, Shavasana, Nadi-shodhana pranayama. Back pain and Arthritis: Tadasana, Urdhawahastottansana, Ardh-Chakrasana, Vakrasana, Bhujangasana, Makarasana, Shalabhasana, Nadi-shodhan pranayama.',
        source: peSource('Unit 3: Yoga as Preventive Measure for Lifestyle Disease', 14),
        objective: 'Describe relaxing and spinal asanas for managing hypertension, stress, and chronic lumbar back pain.',
        minutes: 30,
        learnSteps: [
            'Hypertension physiology: high blood pressure (>140/90 mmHg) caused by stress, arterial stiffness, sedentary lifestyle.',
            'Shavasana (corpse pose): total physical and mental relaxation, stimulates parasympathetic nervous system, lowers adrenaline and heart rate.',
            'Nadi-Shodhana Pranayama: calms autonomic nervous system, regulates blood flow, reduces cortisol levels.',
            'Sarvangasana & Ardha Halasana: promotes venous return, contraindications: high blood pressure patients should avoid inverted postures without expert supervision.',
            'Back pain and Arthritis: Makarasana (crocodile pose relieves lower lumbar spine tension), Bhujangasana (strengthens erector spinae muscles), Shalabhasana (locust pose reinforces lower back and sacrum, contraindications: acute ulcer).'
        ],
        practiceSteps: [
            'Explain why inverted asanas like Sarvangasana and Shirshasana are strictly contraindicated during acute hypertension.',
            'Write the procedure and benefits of Makarasana for chronic lower backache.',
            'Contrast active forward-bending asanas with passive restorative asanas in therapeutic yoga.'
        ]
    },
    // Unit 4: Physical Education & Sports for CWSN (pe-4-1)
    {
        id: 'pe-048-xii-2026-27-u04-topic01',
        chapterId: 'pe-4-1',
        subjectId: 'pe',
        title: 'Disability sports organizations and classification',
        officialScope: 'Organizations promoting Disability Sports (Special Olympics; Paralympics; Deaflympics). Concept of Classification and Divisioning in Sports.',
        source: peSource('Unit 4: Physical Education & Sports for CWSN', 14),
        objective: 'Compare Special Olympics, Paralympics, and Deaflympics, and explain classification/divisioning rules.',
        minutes: 30,
        learnSteps: [
            'Special Olympics: founded in 1968 by Eunice Kennedy Shriver for individuals with intellectual disabilities; oath: "Let me win, but if I cannot win, let me be brave in the attempt."',
            'Paralympics: international multi-sport event for athletes with physical, visual, and intellectual impairments; governed by International Paralympic Committee (IPC); originated from 1948 Stoke Mandeville games for war veterans with spinal injuries.',
            'Deaflympics: organized by International Committee of Sports for the Deaf (ICSD) since 1924; non-verbal starting signals (flashing lights, waving flags).',
            'Concept of Classification: grouping athletes into classes based on functional ability rather than medical diagnosis to ensure fair and equitable competition.',
            'Divisioning: used in Special Olympics to match athletes of similar ability, age, and gender, keeping performance variance within 10–15% across competitors in a heat.'
        ],
        practiceSteps: [
            'Differentiate Special Olympics from Paralympics on basis of athlete eligibility, philosophy, and governing bodies.',
            'Explain how divisioning in Special Olympics guarantees every participant a fair chance to succeed.',
            'List non-verbal communication methods employed in Deaflympics track and field events.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u04-topic02',
        chapterId: 'pe-4-1',
        subjectId: 'pe',
        title: 'Inclusion in sports and accessible activity strategies',
        officialScope: 'Concept of Inclusion in sports, its need & Implementation. Advantages of Physical Activities for children with special needs. Strategies to make Physical Activities Assessible for children with special needs.',
        source: peSource('Unit 4: Physical Education & Sports for CWSN', 14),
        objective: 'Explain inclusive sports philosophy, psychological benefits, and pedagogical adaptive strategies for CWSN.',
        minutes: 30,
        learnSteps: [
            'Concept of Inclusion: educating and engaging children with special needs (CWSN) alongside peers in mainstream physical activities without segregation.',
            'Need and implementation: builds social integration, eradicates stigma, fosters peer empathy, promotes legal rights to play.',
            'Physical and psychological advantages: improves motor coordination, cardiorespiratory fitness, muscular endurance, self-esteem, cognitive focus, reduces anxiety and depression.',
            'Adaptive strategies for accessibility: modified equipment (beeper balls for visually impaired, lower basketball hoops, lighter bats), modified rules (extra bounces in tennis/volleyball), accessible environments (ramps, tactile markings, acoustic dampening), multi-sensory teaching (verbal prompts, visual demonstrations, tactile guidance).'
        ],
        practiceSteps: [
            'Suggest 4 adaptive modifications to conduct an inclusive cricket game involving a child with visual impairment.',
            'Explain the psychological benefits of regular sports participation for children on autism spectrum.',
            'Answer CBSE 5-mark question on comprehensive strategies to make school sports facilities accessible.'
        ]
    },
    // Unit 5: Sports & Nutrition (pe-5-1)
    {
        id: 'pe-048-xii-2026-27-u05-topic01',
        chapterId: 'pe-5-1',
        subjectId: 'pe',
        title: 'Balanced diet, macronutrients and micronutrients',
        officialScope: 'Concept of balanced diet and nutrition. Macro and Micro Nutrients: Food sources & functions. Nutritive & Non-Nutritive Components of Diet.',
        source: peSource('Unit 5: Sports & Nutrition', 15),
        objective: 'Plan balanced athletic diets and delineate sources and functions of macro/micronutrients and non-nutritive components.',
        minutes: 35,
        learnSteps: [
            'Balanced Diet: diet containing all essential food constituents (carbohydrates, fats, proteins, vitamins, minerals, water, roughage) in correct proportions according to age, gender, and physical workload.',
            'Macronutrients: Carbohydrates (primary energy source, 4 kcal/g, simple vs complex starches), Proteins (building blocks of muscle tissue, 4 kcal/g, essential vs non-essential amino acids), Fats (energy reserve, 9 kcal/g, saturated vs unsaturated fatty acids).',
            'Micronutrients: Minerals (Macrominerals: Calcium for bones, Phosphorus, Magnesium, Sodium, Potassium for fluid balance; Trace minerals: Iron for hemoglobin, Iodine for thyroid hormone), Vitamins (Fat-soluble: A, D, E, K; Water-soluble: B-complex, C).',
            'Nutritive vs Non-Nutritive components: Nutritive provide calories; Non-Nutritive include Water (temperature regulation, metabolic solvent), Roughage/fiber (peristalsis, prevents constipation), Phytochemicals, Artificial sweeteners, Flavoring compounds.'
        ],
        practiceSteps: [
            'Calculate daily caloric requirements for an endurance athlete vs a sedentary individual.',
            'State deficiency symptoms and rich dietary sources of Iron and Vitamin D.',
            'Explain the athletic importance of water and electrolyte replenishment during high-intensity training.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u05-topic02',
        chapterId: 'pe-5-1',
        subjectId: 'pe',
        title: 'Weight management, dieting pitfalls and food myths',
        officialScope: 'Eating for weight control – A healthy weight, The pitfalls of dieting, food intolerance, and food myths.',
        source: peSource('Unit 5: Sports & Nutrition', 15),
        objective: 'Calculate BMI, identify pitfalls of extreme crash dieting, explain food intolerances, and debunk food myths.',
        minutes: 30,
        learnSteps: [
            'Healthy Weight determination: Body Mass Index (BMI = weight in kg / (height in meters)^2); WHO categories: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese Class I (30–34.9).',
            'Pitfalls of crash dieting: extreme calorie restriction leads to metabolic slowdown, loss of lean muscle mass, dehydration, nutrient deficiencies, gallstones, and rapid rebound weight gain (yo-yo effect).',
            'Food Intolerance: non-allergic difficulty in digesting particular foods due to enzyme deficiency (e.g. Lactose intolerance from lack of lactase enzyme, celiac gluten intolerance), causing bloating, cramps, nausea without immune antibody involvement.',
            'Debunking common food myths: myth that skipping meals promotes fat loss, myth that carbohydrates make you fat, myth that water during meals impairs digestion, myth that fat-free foods are always healthy.'
        ],
        practiceSteps: [
            'Calculate BMI for an individual of height 1.75 m and weight 82 kg, and identify their category.',
            'Contrast Food Allergy (immunological IgE response) with Food Intolerance (enzymatic/digestive breakdown).',
            'Explain 3 biological reasons why crash dieting fails to achieve long-term weight control.'
        ]
    },
    // Unit 6: Test and Measurement in Sports (pe-6-1)
    {
        id: 'pe-048-xii-2026-27-u06-topic01',
        chapterId: 'pe-6-1',
        subjectId: 'pe',
        title: 'SAI Khelo India Fitness Test and Barrow Motor Ability',
        officialScope: 'Fitness Test - SAI Khelo India Fitness Assessment in school: Age group 5-8 yrs (BMI, Flamingo Balance, Plate Tapping); Age group 9-18 yrs (BMI, 50mt Speed test, 600mt Run/Walk, Sit & Reach, Partial Curl-Up, Push-Ups for boys, Modified Push-Ups for girls). General Motor Fitness - Barrow three-item test.',
        source: peSource('Unit 6: Test and Measurement in Sports', 15),
        objective: 'Administer SAI Khelo India fitness battery and Barrow motor fitness test, recording objective performance data.',
        minutes: 35,
        learnSteps: [
            'SAI Khelo India test battery for school children (9–18 years):',
            '1. 50 m Sprint: measures acceleration and maximum running speed from standing start.',
            '2. 600 m Run/Walk: measures cardiorespiratory and aerobic endurance capacity.',
            '3. Sit and Reach test: measures hamstring and lower back flexibility using standardized box with scale.',
            '4. Partial Curl-Up test: measures abdominal muscular strength and endurance over 30 seconds with knees bent at 90 degrees.',
            '5. Push-Ups (boys) and Modified Push-Ups on knees (girls): measures upper body pectoral, deltoid, and tricep muscular strength.',
            'General Motor Fitness: Barrow Three-Item Test: Standing Broad Jump (explosive leg power), Zig-Zag Run (agility), Medicine Ball Put (upper body power).'
        ],
        practiceSteps: [
            'Describe test administration procedure, scoring, and equipment required for Sit and Reach test.',
            'Explain difference between standard Push-Up and Modified Push-Up for girls.',
            'State purpose and test setup for Barrow Motor Ability Zig-Zag run.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u06-topic02',
        chapterId: 'pe-6-1',
        subjectId: 'pe',
        title: 'Rikli & Jones Senior Citizen Test and BMR computation',
        officialScope: 'Measurement of Cardio-Vascular Fitness - Harvard Step Test. Computing Basal Metabolic Rate (BMR). Rikli & Jones - Senior Citizen Fitness Test (Chair Stand, Arm Curl, Chair Sit & Reach, Back Scratch, Eight Foot Up & Go, 6-Minute Walk).',
        source: peSource('Unit 6: Test and Measurement in Sports', 15),
        objective: 'Administer the 6 tests of Rikli & Jones battery for elderly functional fitness and calculate BMR using Mifflin-St Jeor formula.',
        minutes: 35,
        learnSteps: [
            'Rikli & Jones Senior Citizen Fitness Test (Fullerton Functional Test) battery for older adults (60+ years):',
            '1. Chair Stand Test (30 seconds): measures lower body muscular strength for climbing stairs and getting up.',
            '2. Arm Curl Test (30 seconds with 5 lb dumbbell for women, 8 lb for men): measures upper body muscular strength.',
            '3. Chair Sit and Reach Test: measures lower body flexibility, particularly hamstrings.',
            '4. Back Scratch Test: measures upper body and shoulder girdle flexibility (measuring overlap or distance between fingertips).',
            '5. Eight Foot Up and Go Test: measures dynamic balance, agility, and motor coordination (timing standing from chair, walking around cone 8 feet away, returning).',
            '6. Six-Minute Walk Test: measures aerobic endurance capacity.',
            'Computing Basal Metabolic Rate (BMR): minimum daily energy expenditure in post-absorptive resting state; calculated using Harris-Benedict or Mifflin-St Jeor equation.'
        ],
        practiceSteps: [
            'List all 6 tests in Rikli & Jones battery and specify physical parameters each assesses.',
            'Explain test procedure and safety protocols for Eight Foot Up and Go test for elderly individuals.',
            'Compute BMR for a 65-year-old male of given weight, height, and daily physical activity factor.'
        ]
    },
    // Unit 7: Physiology & Injuries in Sport (pe-7-1)
    {
        id: 'pe-048-xii-2026-27-u07-topic01',
        chapterId: 'pe-7-1',
        subjectId: 'pe',
        title: 'Physiological factors of fitness and exercise adaptations',
        officialScope: 'Physiological factors determining components of physical fitness. Effect of exercise on Muscular System. Effect of exercise on Cardiorespiratory System.',
        source: peSource('Unit 7: Physiology & Injuries in Sport', 16),
        objective: 'Explain physiological factors of strength, speed, endurance, flexibility, and long-term exercise adaptations.',
        minutes: 35,
        learnSteps: [
            'Physiological factors determining strength: muscle cross-sectional area, muscle fiber type composition (fast twitch white fibers vs slow twitch red fibers), neuromuscular coordination, testosterone levels.',
            'Physiological factors determining endurance: VO2 max (maximum oxygen uptake), cardiac output, stroke volume, vital capacity, hemoglobin concentration, capillary density, lactic acid tolerance threshold.',
            'Physiological factors determining speed: neuromuscular reaction time, ratio of fast-twitch fibers, flexibility, nerve impulse conduction speed.',
            'Effects of exercise on Muscular System: muscle hypertrophy (increase in size of muscle fibers), increased mitochondrial density, enhanced glycogen storage, capillary proliferation, delayed onset of muscle fatigue.',
            'Effects of exercise on Cardiorespiratory System: cardiac hypertrophy ("athlete’s heart"), increased stroke volume, resting bradycardia (decreased resting pulse rate), increased tidal volume, enhanced vital capacity, increased alveolar gas exchange surface.'
        ],
        practiceSteps: [
            'Explain physiological mechanisms responsible for athlete’s heart and resting bradycardia.',
            'Contrast slow-twitch (Type I) and fast-twitch (Type II) muscle fibers regarding endurance and sprint performance.',
            'Explain why VO2 max is the gold standard indicator of cardiorespiratory endurance fitness.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u07-topic02',
        chapterId: 'pe-7-1',
        subjectId: 'pe',
        title: 'Sports injuries classification and PRICE protocol',
        officialScope: 'Sports injuries: Classification (Soft Tissue Injuries: Abrasion, Contusion, Laceration, Incision, Sprain & Strain; Bone & Joint Injuries: Dislocation, Fractures: Greenstick, Comminuted, Transverse, Oblique & Impacted). Prevention & First Aid - PRICE treatment.',
        source: peSource('Unit 7: Physiology & Injuries in Sport', 16),
        objective: 'Classify soft tissue and bone/joint injuries, recognize symptoms, and execute immediate PRICE treatment.',
        minutes: 35,
        learnSteps: [
            'Classification of Soft Tissue Injuries:',
            'Skin injuries: Abrasion (friction scrape of epidermal skin layer), Contusion (blunt impact bruising without breaking skin, hematoma), Laceration (irregular jagged tear of skin/tissue), Incision (clean sharp cut caused by sharp object).',
            'Connective tissue injuries: Sprain (injury to ligament caused by excessive twisting/stretching; grades I, II, III), Strain (injury to muscle belly or tendon caused by overstretching or violent contraction).',
            'Bone and Joint Injuries:',
            'Dislocation: displacement of articulating bone ends at joint (shoulder, elbow, hip, finger).',
            'Fractures: Greenstick (incomplete bending fracture common in children’s pliable bones), Comminuted (bone shattered into 3 or more fragments), Transverse (straight horizontal fracture line across shaft), Oblique (diagonal fracture line), Impacted (broken ends driven into each other), Open/Compound (bone pierces skin).',
            'PRICE First Aid Protocol: Protect (immobilize with splint), Rest (cease activity immediately), Ice (apply cold pack 15–20 minutes every 2 hours to cause vasoconstriction and reduce edema), Compress (wrap elastic bandage firmly without cutting off circulation), Elevate (raise injured limb above heart level to assist venous drainage).'
        ],
        practiceSteps: [
            'Differentiate between a Sprain (ligament) and a Strain (muscle/tendon) in terms of affected anatomy and symptoms.',
            'Explain step-by-step application of the PRICE procedure immediately following an ankle sprain.',
            'Identify fracture types from clinical case scenarios (e.g. child falling on outstretched arm).'
        ]
    },
    // Unit 8: Biomechanics and Sports (pe-8-1)
    {
        id: 'pe-048-xii-2026-27-u08-topic01',
        chapterId: 'pe-8-1',
        subjectId: 'pe',
        title: 'Newton’s laws of motion applied to sports',
        officialScope: 'Newton’s Law of Motion & its application in sports. Equilibrium – Dynamic & Static and Centre of Gravity and its application in sports. Friction & Sports. Projectile in Sports.',
        source: peSource('Unit 8: Biomechanics and Sports', 16),
        objective: 'Apply Newton’s 3 laws of motion to sprinting, jumping, batting, and swimming actions.',
        minutes: 30,
        learnSteps: [
            'Newton’s First Law (Law of Inertia): a body remains at rest or in uniform motion unless acted upon by an external unbalanced force; application: sprinters staying in starting blocks until push-off, heavy shot put requiring greater force to initiate motion, soccer ball rolling until slowed by friction.',
            'Newton’s Second Law (Law of Acceleration): F = m · a; acceleration of an object is directly proportional to net force and inversely proportional to mass; application: throwing a lighter javelin with greater acceleration, follow-through in cricket/baseball giving longer duration for force application.',
            'Newton’s Third Law (Law of Action and Reaction): for every action there is an equal and opposite reaction; application: high jumpers pushing downward and backward into ground to achieve vertical lift, swimmer pushing water backward with hand/foot strokes to propel forward, track athletes pushing against starting blocks.'
        ],
        practiceSteps: [
            'Explain how Newton’s Third Law explains propulsion in swimming and rowing.',
            'Show how Newton’s Second Law dictates shot put release acceleration.',
            'Analyze why a sprinter requires spikes to exploit reactive ground forces.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u08-topic02',
        chapterId: 'pe-8-1',
        subjectId: 'pe',
        title: 'Equilibrium, center of gravity, friction and projectile motion',
        officialScope: 'Equilibrium – Dynamic & Static and Centre of Gravity and its application in sports. Friction & Sports. Projectile in Sports.',
        source: peSource('Unit 8: Biomechanics and Sports', 16),
        objective: 'Analyze stability principles, center of gravity shifts, friction optimization, and projectile trajectory factors.',
        minutes: 35,
        learnSteps: [
            'Equilibrium: Static (body at rest, e.g. standing balance in yoga) vs Dynamic (body in steady motion, e.g. cycling, skating).',
            'Principles of Stability and Centre of Gravity (CG): stability increases when CG is lower, base of support is wider, and line of gravity falls inside base of support; application: wrestlers crouching low with spread feet for maximum defensive stability, sprinters raising CG at starting line for instant forward unbalancing.',
            'Friction in Sports: Static, Rolling, and Sliding friction; Friction as necessity (running spikes, chalk on gymnast hands, studs on soccer boots to prevent slipping) vs detriment (waxing skis to reduce snow friction, cycling aerodynamics).',
            'Projectile Motion in Sports: factors determining horizontal range of projectile (shot put, javelin, discus, basketball): angle of projection (optimal theoretical 45°, practical 35°–42° due to air resistance and release height above ground), initial velocity of release (most critical determinant since range is proportional to v^2), height of release, and aerodynamic air resistance/spin.'
        ],
        practiceSteps: [
            'Explain why a wrestler spreads feet wide apart and bends knees when defending against a takedown.',
            'Analyze the four factors affecting the trajectory and maximum range of a shot put release.',
            'Explain two sporting scenarios where friction must be increased and two where it must be minimized.'
        ]
    },
    // Unit 9: Psychology and Sports (pe-9-1)
    {
        id: 'pe-048-xii-2026-27-u09-topic01',
        chapterId: 'pe-9-1',
        subjectId: 'pe',
        title: 'Personality theories and motivation techniques',
        officialScope: 'Personality; its definition & types - Trait & Types (Sheldon & Jung Classification) & Big Five Theory. Motivation, its types & technique. Exercise Adherence; Meaning, Reasons, Benefits & Strategies for enhancing it.',
        source: peSource('Unit 9: Psychology and Sports', 16),
        objective: 'Classify personalities via Jung and Big Five models, explain intrinsic/extrinsic motivation, and exercise adherence.',
        minutes: 35,
        learnSteps: [
            'Personality definitions: dynamic organization within individual of psychophysical systems determining unique adjustments to environment.',
            'Jung’s Classification: Introverts (reserved, reflective, quiet, excel in individual solo sports like archery, marathon), Extroverts (outgoing, social, assertive, thrive in team contact sports like football, rugby), Ambiverts (balanced blend).',
            'Big Five (OCEAN) Personality Model: Openness to experience, Conscientiousness (discipline, goal-directed), Extraversion, Agreeableness, Neuroticism (emotional instability).',
            'Motivation: Intrinsic (internal drive, self-satisfaction, mastery, joy of playing) vs Extrinsic (external rewards, trophies, cash prizes, fame, social approval).',
            'Motivational techniques in sports: goal setting (SMART goals), positive self-talk, mental imagery/visualization, verbal encouragement, music, reward systems.',
            'Exercise Adherence: strategies to maintain long-term physical activity commitment: social support groups, convenient scheduling, variety in exercise routines, progress monitoring.'
        ],
        practiceSteps: [
            'Contrast intrinsic vs extrinsic motivation in long-term athletic development.',
            'Describe the Big Five personality traits and their relevance to sports teamwork.',
            'Design a 4-point exercise adherence program for sedentary school students.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u09-topic02',
        chapterId: 'pe-9-1',
        subjectId: 'pe',
        title: 'Aggression in sports: Types, causes and control',
        officialScope: 'Meaning, Concept & Types of Aggression in Sports. Psychological Attributes in Sports – Self Esteem, Mental Imagery, Self Talk, Goal Setting.',
        source: peSource('Unit 9: Psychology and Sports', 16),
        objective: 'Distinguish hostile, instrumental, and assertive behaviors, and apply mental imagery and goal setting.',
        minutes: 30,
        learnSteps: [
            'Define Aggression in sports: physical or verbal behavior directed toward another human being with intention to cause harm or injury.',
            'Hostile Aggression: primary goal is to inflict physical injury or psychological pain on opponent, fueled by anger (e.g. violent retaliation after a foul).',
            'Instrumental Aggression: aggression used as a means/instrument to achieve a higher goal (winning match, tackling cleanly, breaking up a play) without primary malicious intent.',
            'Assertive Behavior: forceful, confident, high-intensity play within formal rules of game without intent to harm (e.g. strong legal rebounding in basketball).',
            'Causes of aggression: frustration-aggression hypothesis, high emotional arousal, perceived unfair refereeing, crowd hostility, home-court pressure.',
            'Psychological attributes: Mental Imagery (mental rehearsal of motor skills), Self-Talk (positive cognitive reframing), SMART Goal Setting (Specific, Measurable, Achievable, Relevant, Time-bound).'
        ],
        practiceSteps: [
            'Classify given sports actions into Hostile Aggression, Instrumental Aggression, or Assertive Behavior.',
            'Explain how frustration leads to aggressive behavior during high-stakes competitive matches.',
            'Outline mental imagery rehearsal steps for a basketball free-throw shooter.'
        ]
    },
    // Unit 10: Training in Sports (pe-10-1)
    {
        id: 'pe-048-xii-2026-27-u10-topic01',
        chapterId: 'pe-10-1',
        subjectId: 'pe',
        title: 'Sports training cycles and developing strength/endurance',
        officialScope: 'Concept of Talent Identification and Talent Development in Sports. Introduction to Sports Training Cycle – Micro, Meso & Macro Cycle. Types & Method to Develop – Strength, Endurance and Speed.',
        source: peSource('Unit 10: Training in Sports', 17),
        objective: 'Plan training cycles (micro, meso, macro) and design training protocols for strength and endurance.',
        minutes: 35,
        learnSteps: [
            'Concept of Sports Training: systematic, planned preparation of athletes aimed at peak competitive performance.',
            'Periodization and Training Cycles:',
            'Macrocycle: longest training phase (several months to one full year / quadrennial Olympic cycle), composed of Preparatory, Competition, and Transition phases.',
            'Mesocycle: medium-duration training block (typically 3 to 6 weeks) targeting specific fitness adaptations.',
            'Microcycle: shortest operational training cycle (typically 3 to 7 days, weekly schedule).',
            'Strength Development methods:',
            'Isometric exercises: muscle tension increases without change in muscle length or visible joint movement (static pushing against wall).',
            'Isotonic exercises: muscle tension remains relatively constant while muscle changes length (concentric shortening and eccentric lengthening, e.g. bicep curls, bench press).',
            'Isokinetic exercises: muscle contraction performed at constant controlled speed throughout full range of motion using specialized dynamometers.',
            'Endurance Development methods: Continuous training (slow and fast long-distance running), Interval training (work-rest-work ratio based on heart rate recovery to 120–130 bpm), Fartlek training (Swedish speed-play over natural undulating terrain combining sprints and jogging).'
        ],
        practiceSteps: [
            'Design a 1-week Microcycle training schedule for a high school track runner.',
            'Compare Isometric, Isotonic, and Isokinetic training methods in table format.',
            'Explain the physiological mechanism of Interval Training based on heart rate recovery.'
        ]
    },
    {
        id: 'pe-048-xii-2026-27-u10-topic02',
        chapterId: 'pe-10-1',
        subjectId: 'pe',
        title: 'Developing speed, flexibility, coordinative abilities and circuit training',
        officialScope: 'Types & Method to Develop – Speed, Flexibility and Coordinative Abilities. Circuit Training - Introduction & its importance.',
        source: peSource('Unit 10: Training in Sports', 17),
        objective: 'Design training methods for speed (acceleration runs, pace runs), flexibility (PNF), coordinative abilities, and circuit training stations.',
        minutes: 35,
        learnSteps: [
            'Speed Development methods: Acceleration Runs (running short distances 30–50 m at maximum speed from stationary start with complete recovery) and Pace Races (running complete distance at constant uniform speed, e.g. 800 m / 1500 m).',
            'Flexibility Development methods: Ballistic method (rhythmic bobbing/bouncing stretches, risk of muscle tearing), Static stretching (holding stretch position for 15–30 seconds), Dynamic stretching, PNF technique (Proprioceptive Neuromuscular Facilitation: isometric contraction followed by passive assisted stretch, most effective).',
            'Coordinative Abilities: Orientation ability, Differentiation ability, Coupling ability, Reaction ability, Balance ability, Rhythm ability, Adaptation ability.',
            'Circuit Training: training method where athlete completes a series of 6 to 12 exercise stations arranged in a circuit targeting different muscle groups successively (e.g. push-ups -> squats -> burpees -> crunches -> jumping jacks -> pull-ups) with minimal rest between stations, developing both muscular endurance and cardiorespiratory fitness simultaneously.'
        ],
        practiceSteps: [
            'Design an 8-station Circuit Training layout for developing general motor fitness in school athletes.',
            'Explain how the PNF stretching technique increases range of motion via muscle spindle inhibition.',
            'Differentiate Acceleration Runs from Pace Races in track coaching.'
        ]
    }
];
export const peTopicNodes = peTopicDefinitions.map(def => ({
    id: def.id,
    subjectId: def.subjectId,
    chapterId: def.chapterId,
    parentId: def.chapterId,
    kind: 'topic',
    title: def.title,
    officialScope: def.officialScope,
    source: def.source
}));
export const peActivityDefinitions = peTopicDefinitions.flatMap(def => {
    const node = peTopicNodes.find(n => n.id === def.id);
    return buildActivitiesForTopic(node, {
        learnSteps: def.learnSteps,
        practiceSteps: def.practiceSteps,
        objective: def.objective,
        minutes: def.minutes
    });
});
