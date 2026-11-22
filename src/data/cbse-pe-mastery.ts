/**
 * Official CBSE Class XII Physical Education (Subject Code 048) Mastery Knowledge Base
 * Covers Tournament Management & Fixture Mathematics, Postural Deformities, Female Athlete Triad,
 * Lifestyle Disease Yoga Therapy, Sports Biomechanics, Physiology, Sports Injuries & PRICE Protocol.
 */

export interface KnockoutFixtureCalculation {
  totalTeams: number;
  totalMatches: number; // N - 1
  nextPowerOfTwo: number;
  totalByes: number; // 2^n - N
  teamsUpperHalf: number; // (N + 1) / 2 if odd, N / 2 if even
  teamsLowerHalf: number; // (N - 1) / 2 if odd, N / 2 if even
  byesUpperHalf: number; // (NB - 1) / 2 if odd, NB / 2 if even
  byesLowerHalf: number; // (NB + 1) / 2 if odd, NB / 2 if even
  numberOfRounds: number; // n
  byeAssignmentRule: string[];
}

export interface PosturalDeformityProfile {
  id: string;
  name: string;
  affectedRegion: 'Spine' | 'Legs' | 'Feet' | 'Shoulders';
  anatomicalDescription: string;
  primaryCauses: string[];
  correctiveExercises: string[];
  recommendedAsanas: string[];
  contraindications: string[];
}

export interface LifestyleDiseaseYogaProtocol {
  id: string;
  disease: 'Obesity' | 'Diabetes' | 'Asthma' | 'Hypertension' | 'Back Pain';
  pathology: string;
  asanas: {
    name: string;
    englishTranslation: string;
    procedureSteps: string[];
    physiologicalBenefits: string[];
    contraindications: string[];
  }[];
  lifestyleModifications: string[];
}

export interface BiomechanicsTopic {
  id: string;
  title: string;
  physicalPrinciple: string;
  cbseApplications: {
    sport: string;
    mechanism: string;
    kineticAdvantage: string;
  }[];
  examinerTips: string;
}

export interface SportsInjuryClassification {
  category: 'Soft Tissue Injury' | 'Bone Injury' | 'Joint Injury';
  injuries: {
    name: string;
    description: string;
    symptoms: string[];
    firstAidProtocol: string;
  }[];
}

/**
 * Mathematical Engine for CBSE Knockout Fixtures
 * Strictly implements the official NCERT / CBSE Class 12 tournament calculation formulas.
 */
export function calculateKnockoutFixture(teamsCount: number): KnockoutFixtureCalculation {
  if (teamsCount < 2) {
    throw new Error('A tournament requires at least 2 participating teams.');
  }

  const N = teamsCount;
  const totalMatches = N - 1;

  // Find next power of 2 >= N
  let power = 1;
  let rounds = 0;
  while (power < N) {
    power *= 2;
    rounds++;
  }

  const nextPowerOfTwo = power;
  const totalByes = nextPowerOfTwo - N;

  const isOdd = N % 2 !== 0;
  const teamsUpperHalf = isOdd ? (N + 1) / 2 : N / 2;
  const teamsLowerHalf = isOdd ? (N - 1) / 2 : N / 2;

  const isByesOdd = totalByes % 2 !== 0;
  const byesUpperHalf = isByesOdd ? (totalByes - 1) / 2 : totalByes / 2;
  const byesLowerHalf = isByesOdd ? (totalByes + 1) / 2 : totalByes / 2;

  const byeAssignmentRule = [
    '1st Bye: Allocated to the LAST team of the LOWER HALF.',
    '2nd Bye: Allocated to the FIRST team of the UPPER HALF.',
    '3rd Bye: Allocated to the FIRST team of the LOWER HALF.',
    '4th Bye: Allocated to the LAST team of the UPPER HALF.',
    '5th and subsequent Byes: Continue in the identical cyclic sequence.'
  ];

  return {
    totalTeams: N,
    totalMatches,
    nextPowerOfTwo,
    totalByes,
    teamsUpperHalf,
    teamsLowerHalf,
    byesUpperHalf,
    byesLowerHalf,
    numberOfRounds: rounds,
    byeAssignmentRule
  };
}

/**
 * Calculate League (Round-Robin) tournament matches:
 * Single League formula: N(N - 1) / 2
 * Double League formula: N(N - 1)
 */
export function calculateLeagueMatches(N: number, isDouble = false): number {
  if (N < 2) return 0;
  return isDouble ? N * (N - 1) : (N * (N - 1)) / 2;
}

/**
 * Harvard Step Test Physical Fitness Index (PFI) Calculator
 * High form: (100 * test duration in seconds) / (2 * sum of three 30-sec recovery pulse counts)
 * Rapid form: (100 * test duration in seconds) / (5.5 * single 30-sec pulse count between 1 to 1.5 min)
 */
export function calculateHarvardFitnessIndex(durationSec: number, pulse1: number, pulse2?: number, pulse3?: number): {
  pfi: number;
  rating: 'Excellent' | 'Good' | 'High Average' | 'Low Average' | 'Poor';
} {
  let pfi: number;
  if (pulse2 !== undefined && pulse3 !== undefined) {
    pfi = (100 * durationSec) / (2 * (pulse1 + pulse2 + pulse3));
  } else {
    pfi = (100 * durationSec) / (5.5 * pulse1);
  }

  pfi = Math.round(pfi * 10) / 10;

  let rating: 'Excellent' | 'Good' | 'High Average' | 'Low Average' | 'Poor';
  if (pfi > 90) rating = 'Excellent';
  else if (pfi >= 80) rating = 'Good';
  else if (pfi >= 65) rating = 'High Average';
  else if (pfi >= 55) rating = 'Low Average';
  else rating = 'Poor';

  return { pfi, rating };
}

export const cbsePosturalDeformities: PosturalDeformityProfile[] = [
  {
    id: 'def-kyphosis',
    name: 'Kyphosis (Hunchback)',
    affectedRegion: 'Spine',
    anatomicalDescription: 'Abnormal exaggeration of the posterior convex curvature in the thoracic region of the vertebral column.',
    primaryCauses: [
      'Carrying excessive schoolbag loads on one shoulder',
      'Faulty sitting posture leaning forward while studying',
      'Weak back extensor muscles and rickets malnutrition',
      'Shyness in adolescent girls leading to rounded chest posture'
    ],
    correctiveExercises: [
      'Swimming backstroke',
      'Hanging from a horizontal bar for 30-60 seconds',
      'Backward bending exercises while standing and kneeling',
      'Scapular retractions and chest-opening thoracic extensions'
    ],
    recommendedAsanas: ['Chakrasana', 'Bhujangasana (Cobra Pose)', 'Dhanurasana (Bow Pose)', 'Ushtrasana (Camel Pose)'],
    contraindications: ['Avoid forward bends (Paschimottanasana, Pada Hastasana) which aggravate the thoracic curve.']
  },
  {
    id: 'def-lordosis',
    name: 'Lordosis (Hollow Back / Swayback)',
    affectedRegion: 'Spine',
    anatomicalDescription: 'Abnormal inward (anterior) exaggeration of the lumbar spinal curve, causing the pelvis to tilt forward and abdomen to protrude.',
    primaryCauses: [
      'Sedentary lifestyle weakening abdominal rectus abdominis muscles',
      'Excessive abdominal adipose tissue (obesity)',
      'Wearing high-heeled footwear throwing center of gravity anteriorly',
      'Tight hip flexors (iliopsoas) and weak gluteal muscles'
    ],
    correctiveExercises: [
      'Pelvic tilts on floor with knees bent',
      'Partial curl-ups to strengthen abdominal wall',
      'Hamstring and hip flexor static stretches',
      'Toe touching forward bends without bending knees'
    ],
    recommendedAsanas: ['Paschimottanasana', 'Halasana (Plow Pose)', 'Pavanmuktasana', 'Viparita Karani'],
    contraindications: ['Avoid deep backward bends (Chakrasana, Ushtrasana) which increase lumbar arch.']
  },
  {
    id: 'def-scoliosis',
    name: 'Scoliosis',
    affectedRegion: 'Spine',
    anatomicalDescription: 'Lateral deviation of the spine forming an abnormal "C" or "S" shaped curve with one shoulder or hip visibly higher than the other.',
    primaryCauses: [
      'Congenital vertebral malformations',
      'Carrying heavy asymmetric loads always on the identical side',
      'Leg length discrepancy causing pelvic tilt',
      'Unilateral sports specialization without compensatory conditioning'
    ],
    correctiveExercises: [
      'Single-arm hanging emphasizing the concavity side',
      'Side-planks on the convex side to activate lateral trunk stabilizers',
      'Breaststroke swimming with bilateral balance',
      'Rotational thoracic mobilization'
    ],
    recommendedAsanas: ['Trikonasana (Triangle Pose)', 'Ardhachakrasana', 'Tadasana (Mountain Pose) with lateral reach'],
    contraindications: ['Avoid asymmetric loading and uncontrolled spinal twists.']
  },
  {
    id: 'def-knock-knees',
    name: 'Knock Knees (Genu Valgum)',
    affectedRegion: 'Legs',
    anatomicalDescription: 'Inward angling of the lower legs such that both knees touch or rub against each other during normal standing posture while ankles remain separated.',
    primaryCauses: [
      'Vitamin D and calcium deficiency causing rickets in early development',
      'Obesity placing chronic inward compressive stress on growing knee epiphyses',
      'Weak vastus medialis and excessive tightness in tensor fasciae latae/IT band',
      'Forcing infants to walk excessively early before musculoskeletal readiness'
    ],
    correctiveExercises: [
      'Placing a pillow between knees and compressing while seated',
      'Horse riding and cycling with wide pedal stance',
      'Outward walking on the outer lateral borders of the feet',
      'Strengthening hip abductors and external rotators'
    ],
    recommendedAsanas: ['Padmasana (Lotus Pose)', 'Gomukhasana (Cow Face Pose)', 'Bhadrasana', 'Vrikshasana'],
    contraindications: ['Avoid high-impact jumping and running on hard concrete surfaces.']
  },
  {
    id: 'def-bow-legs',
    name: 'Bow Legs (Genu Varum)',
    affectedRegion: 'Legs',
    anatomicalDescription: 'Outward curving of the legs at knees such that a wide lateral gap exists between both knees when ankles are held together.',
    primaryCauses: [
      'Severe rickets and infantile softening of tibia and femur bones',
      'Early walking in overweight infants',
      'Heavy manual load carrying during growth spurts',
      'Calcium and phosphorus metabolic disturbances'
    ],
    correctiveExercises: [
      'Walking on the inner borders of the feet',
      'Tying a towel or strap firmly around both knees and attempting to sit gently',
      'Squats with internal leg rotation',
      'Strengthening adductor magnus muscles'
    ],
    recommendedAsanas: ['Garudasana (Eagle Pose)', 'Ardha Matsyendrasana', 'Uttanasana with knees pressed together'],
    contraindications: ['Avoid horse riding and external tibial rotation exercises.']
  },
  {
    id: 'def-flat-foot',
    name: 'Flat Foot (Pes Planus)',
    affectedRegion: 'Feet',
    anatomicalDescription: 'Collapse or absence of the medial longitudinal arch of the foot, causing the entire sole to make full contact with the floor surface.',
    primaryCauses: [
      'Congenital laxity of plantar fascia and spring ligament',
      'Wearing ill-fitted, tight, or completely flat footwear without arch support',
      'Sudden rapid weight gain and chronic standing on concrete',
      'Weakness in tibialis posterior and intrinsic foot muscles'
    ],
    correctiveExercises: [
      'Walking barefoot on sandy beaches or irregular grassy terrain',
      'Walking on tiptoes and heels alternately',
      'Picking up marbles or cloth with toes from the ground',
      'Rope skipping on the balls of the feet'
    ],
    recommendedAsanas: ['Tadasana (walking on toes)', 'Vajrasana', 'Adho Mukha Svanasana (Downward Dog)'],
    contraindications: ['Avoid prolonged motionless standing without arch support.']
  }
];

export const cbseLifestyleYogaProtocols: LifestyleDiseaseYogaProtocol[] = [
  {
    id: 'lifestyle-obesity',
    disease: 'Obesity',
    pathology: 'Excessive accumulation of adipose tissue (Body Mass Index BMI >= 30 kg/m2) impairing metabolic function, increasing risks of cardiovascular disorders and type-2 diabetes.',
    asanas: [
      {
        name: 'Tadasana (Palm Tree / Mountain Pose)',
        englishTranslation: 'Palm Tree Pose',
        procedureSteps: [
          'Stand erect with feet together, weight distributed evenly across both soles.',
          'Interlock fingers of both hands, inhale deeply, and raise arms vertically overhead.',
          'Turn palms upward and elevate heels, balancing steadily on tiptoes while gazing at a fixed point ahead.',
          'Hold breath and posture for 10-20 seconds, exhale and gently lower heels.'
        ],
        physiologicalBenefits: [
          'Stimulates full-body axial elongation and corrects spinal posture.',
          'Strengthens calves, ankles, thighs, and stimulates basal metabolic rate.',
          'Enhances neuro-muscular balance and concentration.'
        ],
        contraindications: ['Severe varicose veins, acute low blood pressure, severe dizziness.']
      },
      {
        name: 'Katichakrasana',
        englishTranslation: 'Standing Spinal Twist',
        procedureSteps: [
          'Stand with feet shoulder-width apart, arms relaxed at sides.',
          'Inhale and raise arms parallel to the ground at shoulder height.',
          'Exhale and twist torso smoothly to the right, wrapping right arm around waist and resting left hand on right shoulder.',
          'Look over right shoulder, hold briefly, return to center with inhalation, and repeat on left side.'
        ],
        physiologicalBenefits: [
          'Tones waistline and compresses visceral fat around the abdominal region.',
          'Relieves spinal rigidity and activates peristaltic intestinal motility.'
        ],
        contraindications: ['Acute hernia, spinal disc herniation, recent abdominal surgery.']
      },
      {
        name: 'Pavanmuktasana',
        englishTranslation: 'Wind-Relieving Pose',
        procedureSteps: [
          'Lie supine on back with legs together and arms alongside torso.',
          'Bend both knees, draw them toward the chest, and clasp shins with interlocked fingers.',
          'Exhale, lift head and shoulders, touching nose or chin between knees.',
          'Contract abdominal wall firmly, hold for 15-30 seconds with gentle breathing, then relax.'
        ],
        physiologicalBenefits: [
          'Expels entrapped gastrointestinal flatus and compresses visceral organs.',
          'Burns stubborn lower abdominal adipose tissue and relieves constipation.'
        ],
        contraindications: ['Severe sciatica, cervical spondylosis, high blood pressure.']
      },
      {
        name: 'Matsyasana',
        englishTranslation: 'Fish Pose',
        procedureSteps: [
          'Sit in Padmasana or lie flat on back with legs extended.',
          'Place palms under hips for support, press forearms into floor, and arch chest upward.',
          'Tilt head backward so the crown gently touches the floor while chest expands.',
          'Breathe deeply into the thoracic cavity, expanding ribcage for 20-40 seconds.'
        ],
        physiologicalBenefits: [
          'Stimulates thyroid and parathyroid glands, boosting metabolic hormone release.',
          'Expands lung vital capacity and tones cervical and thoracic spine.'
        ],
        contraindications: ['Severe neck injury, migraine, peptic ulcer.']
      }
    ],
    lifestyleModifications: [
      'Consume balanced negative-calorie or nutrient-dense whole foods rich in dietary fiber.',
      'Maintain caloric deficit through 45-60 minutes daily aerobic physical activity.',
      'Eliminate trans fats, ultra-processed sugars, and late-night meals.'
    ]
  },
  {
    id: 'lifestyle-diabetes',
    disease: 'Diabetes',
    pathology: 'Metabolic disorder characterized by chronic hyperglycemia resulting from defective insulin secretion by pancreatic beta cells or peripheral insulin resistance.',
    asanas: [
      {
        name: 'Bhujangasana',
        englishTranslation: 'Cobra Pose',
        procedureSteps: [
          'Lie prone on abdomen with forehead on floor, feet together with soles facing upward.',
          'Place palms flat beside chest under shoulders, elbows tucked close to ribcage.',
          'Inhale and slowly raise head, neck, and upper chest using back extensor muscles with minimal palm weight.',
          'Gaze upward, maintain navel in gentle contact with floor, hold for 15-30 seconds, exhale and lower down.'
        ],
        physiologicalBenefits: [
          'Compresses and massages abdominal organs, stimulating the pancreas to release insulin.',
          'Strengthens paraspinal musculature and boosts renal and adrenal circulation.'
        ],
        contraindications: ['Abdominal hernia, pregnancy, acute peptic ulcers.']
      },
      {
        name: 'Mandukasana',
        englishTranslation: 'Frog Pose',
        procedureSteps: [
          'Sit comfortably in Vajrasana (kneeling position).',
          'Make fists with both hands, placing thumbs inside fingers.',
          'Position fists firmly on either side of the navel.',
          'Exhale deeply, pull abdomen inward, and bend forward from hips until chest rests on thighs.',
          'Keep head slightly elevated looking forward, hold for 30 seconds with shallow breathing.'
        ],
        physiologicalBenefits: [
          'Direct deep mechanical compression of the pancreas (Islets of Langerhans), enhancing endocrine secretion.',
          'Stimulates liver, spleen, and regulates fasting blood sugar levels.'
        ],
        contraindications: ['Severe knee osteoarthritis, acute lumbar back injury, cardiac ailments.']
      },
      {
        name: 'Ardha Matsyendrasana',
        englishTranslation: 'Half Lord of the Fishes Pose',
        procedureSteps: [
          'Sit with legs extended; bend left knee and place left foot flat outside right thigh.',
          'Bend right knee, bringing right heel close to left buttock.',
          'Bring right arm over left knee, grasping left foot or ankle, and twist torso to the left.',
          'Place left hand behind on the floor, look over left shoulder, and maintain deep abdominal breathing.'
        ],
        physiologicalBenefits: [
          'Intense rotational torsion of abdominal organs, stimulating insulin production and digestive fire (Jatharagni).',
          'Enhances spinal flexibility and relieves gall bladder sluggishness.'
        ],
        contraindications: ['Pregnancy, spinal slip disc, severe pelvic inflammation.']
      }
    ],
    lifestyleModifications: [
      'Low glycemic index (GI) carbohydrates with high fiber (oats, barley, fenugreek).',
      'Daily 30 minutes of brisk walking to sensitize peripheral GLUT-4 glucose transporters.',
      'Routine monitoring of HbA1c and fasting blood sugar levels.'
    ]
  },
  {
    id: 'lifestyle-asthma',
    disease: 'Asthma',
    pathology: 'Chronic inflammatory airway disease marked by hyper-reactive bronchial constriction, mucosal edema, and excessive mucus secretion causing dyspnea and wheezing.',
    asanas: [
      {
        name: 'Sukhasana & Anulom Vilom Pranayama',
        englishTranslation: 'Easy Pose with Alternate Nostril Breathing',
        procedureSteps: [
          'Sit cross-legged in Sukhasana with spine straight and shoulders relaxed.',
          'Use right thumb to close right nostril, inhale slowly and deeply through left nostril for 4 counts.',
          'Close left nostril with ring finger, release right nostril, exhale smoothly for 6-8 counts.',
          'Inhale through right nostril for 4 counts, close right, exhale through left for 6-8 counts. Repeat for 10-15 cycles.'
        ],
        physiologicalBenefits: [
          'Purifies respiratory passages and balances sympathetic and parasympathetic autonomic tone.',
          'Soothes bronchial spasms and enhances functional residual capacity.'
        ],
        contraindications: ['Practice gently without forceful breath retention (Kumbhaka) during acute asthma attacks.']
      },
      {
        name: 'Gomukhasana',
        englishTranslation: 'Cow Face Pose',
        procedureSteps: [
          'Sit with knees stacked one directly above the other (e.g. right knee over left knee).',
          'Raise right arm vertically, bend elbow, reaching hand down the spine between shoulder blades.',
          'Bring left arm behind lower back, reaching hand upward to clasp right fingers.',
          'Keep spine erect, chest open, breathe deeply into the thoracic space for 30-45 seconds.'
        ],
        physiologicalBenefits: [
          'Expands thoracic ribcage and facilitates deep diaphragmatic and intercostal ventilation.',
          'Relieves shoulder stiffness and opens auxiliary respiratory muscles.'
        ],
        contraindications: ['Severe rotator cuff shoulder tear or acute knee ligament damage.']
      }
    ],
    lifestyleModifications: [
      'Avoid allergens (dust, pet dander, pollens, sudden cold air exposure).',
      'Consume warm liquids, ginger, and turmeric; avoid refrigerated cold beverages.'
    ]
  },
  {
    id: 'lifestyle-hypertension',
    disease: 'Hypertension',
    pathology: 'Persistently elevated arterial blood pressure (Systolic >= 140 mmHg or Diastolic >= 90 mmHg) overloading left ventricular myocardium and blood vessels.',
    asanas: [
      {
        name: 'Shavasana',
        englishTranslation: 'Corpse Pose',
        procedureSteps: [
          'Lie flat on back on a mat, legs comfortably separated with feet falling outward.',
          'Arms resting alongside torso, palms facing upward, fingers naturally curled.',
          'Close eyes gently, release all voluntary muscular tension from head to toe.',
          'Focus on slow, rhythmic, natural breath, letting thoughts pass without attachment for 10-15 minutes.'
        ],
        physiologicalBenefits: [
          'Deep activation of parasympathetic vagal tone, slowing heart rate and inducing peripheral vasodilation.',
          'Reduces circulating catecholamines (adrenaline, noradrenaline) and lowers systemic vascular resistance.'
        ],
        contraindications: ['None. Universal therapeutic relaxation pose.']
      },
      {
        name: 'Vakrasana',
        englishTranslation: 'Simple Twisted Pose',
        procedureSteps: [
          'Sit with legs extended straight forward.',
          'Bend right knee, placing right foot beside left knee.',
          'Bring left arm around the outside of the right knee and hold left knee or right ankle.',
          'Place right hand on floor behind spine, twist torso gently to the right, keeping head turned right.',
          'Breathe smoothly without straining, hold for 20 seconds, and reverse sides.'
        ],
        physiologicalBenefits: [
          'Gentle trunk torsion stimulating adrenal glands and regulating autonomic stability.',
          'Relieves tension along sympathetic chain ganglia.'
        ],
        contraindications: ['Acute backache or severe vertebral fusion.']
      }
    ],
    lifestyleModifications: [
      'DASH diet (Dietary Approaches to Stop Hypertension): restrict dietary sodium (< 2g/day), enrich potassium and magnesium.',
      'Regular meditative mindfulness and elimination of smoking and alcohol.'
    ]
  }
];

export const cbseBiomechanicsTopics: BiomechanicsTopic[] = [
  {
    id: 'bio-newton-first-law',
    title: 'Newton’s First Law of Motion (Law of Inertia)',
    physicalPrinciple: 'An object remains at rest or in uniform motion in a straight line unless acted upon by an external net unbalanced force.',
    cbseApplications: [
      {
        sport: 'Sprint Starting Blocks',
        mechanism: 'Sprinter remains stationary on starting blocks due to inertia of rest until explosive muscular force overcomes inertia upon the gunshot.',
        kineticAdvantage: 'Stiff starting blocks provide an immovable surface allowing maximal horizontal ground reaction force.'
      },
      {
        sport: 'Football / Penalty Kick',
        mechanism: 'The football sits static on the penalty spot until struck by the player’s boot. It travels until air resistance and net friction bring it to rest.',
        kineticAdvantage: 'Player converts stored elastic and muscular energy into external force overcoming ball inertia.'
      }
    ],
    examinerTips: 'Always distinguish between Inertia of Rest, Inertia of Motion, and Inertia of Direction with sport-specific examples.'
  },
  {
    id: 'bio-newton-second-law',
    title: 'Newton’s Second Law of Motion (Law of Acceleration: F = ma)',
    physicalPrinciple: 'The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force.',
    cbseApplications: [
      {
        sport: 'Catching a Cricket Ball',
        mechanism: 'A fielder draws hands backward while catching a fast ball. Extending the time of impact (Delta t) reduces the impact force (F = Delta p / Delta t), preventing injury.',
        kineticAdvantage: 'Minimizes impulse peak force on palmar tissues and prevents the ball from rebounding out of hands.'
      },
      {
        sport: 'Shot Put Throwing',
        mechanism: 'Applying greater muscular force through the legs, trunk, and arm accelerates the 7.26kg shot put to higher velocity, maximizing horizontal range.',
        kineticAdvantage: 'High velocity of release at optimal ~37-42 degree angle yields maximal projectile displacement.'
      }
    ],
    examinerTips: 'Board questions frequently test the relationship between impulse (F · Δt) and momentum reduction in catching or landing safely.'
  },
  {
    id: 'bio-newton-third-law',
    title: 'Newton’s Third Law of Motion (Action and Reaction)',
    physicalPrinciple: 'For every action, there is an equal and opposite reaction force acting on different bodies.',
    cbseApplications: [
      {
        sport: 'Swimming Propulsion',
        mechanism: 'Swimmer pushes water backward and downward with hands and feet (Action); the displaced water exerts an equal and opposite forward and upward force (Reaction) propelling swimmer.',
        kineticAdvantage: 'Streamlined body alignment minimizes hydrodynamic drag, maximizing the net forward reaction.'
      },
      {
        sport: 'High Jump / Long Jump Takeoff',
        mechanism: 'Athlete plants takeoff foot forcefully downward into the ground (Action); ground exerts equal upward Ground Reaction Force (Reaction) launching athlete into air.',
        kineticAdvantage: 'Translates horizontal run-up kinetic energy into vertical projectile velocity.'
      }
    ],
    examinerTips: 'Action and reaction forces never cancel each other because they act simultaneously on two completely separate bodies.'
  },
  {
    id: 'bio-levers',
    title: 'Levers in Sports (Class I, II, and III Levers)',
    physicalPrinciple: 'A rigid rod pivoting about a fixed fulcrum (F) to overcome a resistance/load (L) using muscular effort (E). Mechanical Advantage MA = Effort Arm / Load Arm.',
    cbseApplications: [
      {
        sport: 'Class 1 Lever (F in middle - L-F-E): Head Nodding & Triceps Extension',
        mechanism: 'Atlanto-occipital joint acts as fulcrum, facial weight is load, neck extensor muscles exert effort. In triceps extension over elbow, fulcrum is olecranon, effort is triceps tendon, load is dumbbell.',
        kineticAdvantage: 'Can balance forces or alter movement direction.'
      },
      {
        sport: 'Class 2 Lever (Load in middle - F-L-E): Plantar Flexion / Calf Raise in Jumping',
        mechanism: 'Metatarsophalangeal toe joints act as fulcrum, body weight acting down tibia is load, gastrocnemius/soleus calf muscles exert upward effort via Achilles tendon.',
        kineticAdvantage: 'Effort arm > Load arm (MA > 1). Generates immense force capable of lifting entire body weight during jumping takeoff.'
      },
      {
        sport: 'Class 3 Lever (Effort in middle - F-E-L): Biceps Curl, Kicking, Tennis Swing',
        mechanism: 'Elbow joint is fulcrum, biceps insertion on radial tuberosity is effort, weight of forearm and ball is load. Dominant lever system in human musculoskeletal anatomy.',
        kineticAdvantage: 'Load arm > Effort arm (MA < 1). Sacrifices mechanical force for supreme speed, angular velocity, and range of motion.'
      }
    ],
    examinerTips: 'Memorize mnemonic FLE (1-2-3): 1st has Fulcrum in center, 2nd has Load in center, 3rd has Effort in center.'
  }
];

export const cbseSportsInjuries: SportsInjuryClassification[] = [
  {
    category: 'Soft Tissue Injury',
    injuries: [
      {
        name: 'Sprain (Ligament Tear)',
        description: 'Tearing or overstretching of tough fibrous ligaments connecting bone to bone, most frequently occurring at the lateral ankle (anterior talofibular ligament).',
        symptoms: ['Acute sharp pain at joint', 'Rapid localized edema (swelling)', 'Echymosis (bruising)', 'Inability to bear weight'],
        firstAidProtocol: 'PRICE Protocol immediately for the first 48-72 hours.'
      },
      {
        name: 'Strain (Muscle or Tendon Tear)',
        description: 'Overstretching, microscopic tearing, or complete rupture of muscle fibers or tendons, common in hamstrings, quadriceps, and gastrocnemius.',
        symptoms: ['Sudden stabbing pain during explosive contraction', 'Muscle spasm or cramping', 'Loss of muscular function', 'Palpable defect or dent'],
        firstAidProtocol: 'PRICE Protocol; avoid massage or heat during acute inflammatory stage.'
      },
      {
        name: 'Contusion (Bruise)',
        description: 'Blunt compressive trauma causing rupture of underlying capillary blood vessels beneath skin without breaking epidermis.',
        symptoms: ['Discoloration (black/blue turning yellow/green)', 'Dull aching pain', 'Localized swelling'],
        firstAidProtocol: 'Cold compress and elevation to curb hematoma formation.'
      },
      {
        name: 'Abrasion & Laceration',
        description: 'Abrasion is superficial scraping of epidermal layer; laceration is a jagged, irregular tear of skin caused by sharp objects or blunt trauma.',
        symptoms: ['Capillary oozing (abrasion)', 'Profuse arterial or venous bleeding (laceration)', 'High infection risk'],
        firstAidProtocol: 'Clean wound thoroughly with antiseptic saline solution, apply direct pressure with sterile gauze, dress appropriately.'
      }
    ]
  },
  {
    category: 'Bone Injury',
    injuries: [
      {
        name: 'Fractures (Simple, Compound, Greenstick, Comminuted)',
        description: 'Structural disruption in bone continuity. Simple: bone breaks without piercing skin. Compound: bone fragments protrude through skin. Greenstick: incomplete bend and hairline break common in children. Comminuted: bone splinters into multiple small fragments.',
        symptoms: ['Extreme excruciating pain', 'Visible anatomical deformity', 'Crepitus (grating sound on movement)', 'Loss of limb mobility'],
        firstAidProtocol: 'Immobilize limb using rigid splints, do not attempt to realign or push bone back, treat for shock, transport to trauma center.'
      }
    ]
  },
  {
    category: 'Joint Injury',
    injuries: [
      {
        name: 'Dislocation (Glenohumeral Shoulder, Finger, Patella)',
        description: 'Complete separation and displacement of articular bone surfaces forming a joint out of their anatomical socket.',
        symptoms: ['Visible loss of normal joint contour', 'Intense agonizing pain', 'Absolute immobility of joint', 'Numbness or tingling if nerves compressed'],
        firstAidProtocol: 'Support limb in the posture found using triangular sling or splint, apply cold packs, never attempt manual reduction.'
      }
    ]
  }
];

export const priceProtocolDetails = {
  acronym: 'PRICE',
  description: 'Golden Standard First Aid Protocol for Acute Sports Injuries (first 48 to 72 hours)',
  steps: [
    {
      letter: 'P',
      name: 'Protect',
      action: 'Protect the injured athlete and affected limb from further trauma using splints, braces, or crutches.'
    },
    {
      letter: 'R',
      name: 'Rest',
      action: 'Immediately halt all physical activity. Resting allows the clotting cascade and early tissue repair to initiate without re-bleeding.'
    },
    {
      letter: 'I',
      name: 'Ice',
      action: 'Apply crushed ice wrapped in a damp towel for 15-20 minutes every 2-3 hours. Induces vasoconstriction, curtails interstitial fluid swelling, and numbs pain receptors. Never apply ice directly onto bare skin.'
    },
    {
      letter: 'C',
      name: 'Compress',
      action: 'Wrap an elastic compressive crepe bandage firmly starting distal to the injury and moving proximal. Mechanically restricts edema and stabilizes tissue. Ensure bandage is not excessively tight to impede distal arterial pulse.'
    },
    {
      letter: 'E',
      name: 'Elevate',
      action: 'Elevate the injured limb above heart level whenever resting. Employs hydrostatic gravity to promote venous and lymphatic drainage away from the injury site.'
    }
  ],
  contraindicationMnemonic: 'NO HARM during the first 72 hours: No Heat, No Alcohol, No Running/exercise, No Massage.'
};
