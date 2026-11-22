/**
 * CBSE Class XII English Core (301) - Exemplar Literary & Writing Solutions
 * 2026-2027 Blueprint Standard
 * Authentic extract-based questions, character psychology analysis, theme synthesis,
 * format rubrics for Notice, Formal Invitation, Job Application with Bio-Data, and Articles.
 */

export interface EnglishExemplarItem {
  id: string;
  section: 'reading' | 'writing' | 'flamingo-prose' | 'flamingo-poetry' | 'vistas';
  chapterOrTopicId: string;
  title: string;
  type: 'extract-based' | 'short-answer' | 'long-answer-evaluative' | 'writing-format-rubric';
  marksWeightage: 1 | 2 | 4 | 5;
  promptOrExtract: string;
  contextAndSubtext: string;
  modelAnswer: string;
  rubricBreakdown: {
    criterion: string;
    marks: number;
    guideline: string;
  }[];
  commonMistakes: string[];
}

export const ncertExemplarEnglish: EnglishExemplarItem[] = [
  // Flamingo Prose: The Last Lesson (eng-flam-1)
  {
    id: 'ex-eng-01',
    section: 'flamingo-prose',
    chapterOrTopicId: 'eng-flam-1',
    title: 'M. Hamel\'s Final Address & Linguistic Chauvinism',
    type: 'long-answer-evaluative',
    marksWeightage: 5,
    promptOrExtract: '"When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison." Analyze M. Hamel\'s statement in the light of the Prussian occupation of Alsace and Lorraine. How does Alphonse Daudet use language as a metaphor for national identity, cultural resilience, and freedom?',
    contextAndSubtext: 'Franco-Prussian War (1870-71). Berlin orders that only German be taught in schools of Alsace and Lorraine. The lesson transforms from a grammar class into an emotional defense of mother tongue.',
    modelAnswer: 'In Alphonse Daudet\'s "The Last Lesson", M. Hamel\'s declaration elevates the French language from a mere medium of communication to the very soul and identity of an enslaved nation. Under the oppressive Prussian edict mandating German in Alsace and Lorraine schools, linguistic annexation serves as a tool of cultural subjugation—erasing indigenous identity, historical roots, and collective consciousness.\n\nHamel asserts that holding fast to one\'s mother tongue is akin to possessing "the key to their prison". Language binds individuals into a unified community; so long as an enslaved populace preserves their native tongue, their psychological autonomy and collective heritage remain unconquered. Daudet masterfully portrays Franz\'s epiphany: the boy who once regarded French participles as a burdensome chore suddenly recognizes the melodic beauty of French as "the clearest, the most logical" language in the world.\n\nThe villagers occupying the back benches—Old Hauser with his worn primer, the former mayor, the former postmaster—symbolize delayed realization and collective repentance for taking their native language for granted. M. Hamel\'s final gesture, writing "Vive La France!" in massive letters on the blackboard until he chokes with grief, immortalizes language as an impregnable fortress of defiance, liberty, and enduring patriotism.',
    rubricBreakdown: [
      {
        criterion: 'Content & Contextual Insight',
        marks: 2.0,
        guideline: 'Analysis of Prussian linguistic imperialism, mother tongue as key to prison, Franz and villagers\' transformation.'
      },
      {
        criterion: 'Expression & Vocabulary',
        marks: 2.0,
        guideline: 'Coherent flow, advanced vocabulary (linguistic annexation, psychological autonomy, repentance), correct grammar.'
      },
      {
        criterion: 'Accuracy & Quotation Integration',
        marks: 1.0,
        guideline: 'Faithful references to M. Hamel\'s blackboard inscription and village elders.'
      }
    ],
    commonMistakes: [
      'Summarizing the entire plot instead of answering the analytical metaphor of language as freedom.',
      'Failing to mention the village elders and their symbolic repentance.'
    ]
  },

  // Flamingo Poetry: My Mother at Sixty-six (eng-poem-1)
  {
    id: 'ex-eng-02',
    section: 'flamingo-poetry',
    chapterOrTopicId: 'eng-poem-1',
    title: 'Contrast of Vitality and Mortality in My Mother at Sixty-six',
    type: 'extract-based',
    marksWeightage: 4,
    promptOrExtract: '"...and looked out at Young / Trees sprinting, the merry children spilling / out of their homes, but after the airport\'s / security check, standing a few yards / away, I looked again at her, wan, pale / as a late winter\'s moon..."',
    contextAndSubtext: 'Kamala Das driving to Cochin airport with her aging mother. The stark juxtaposition between the exuberant youth of nature and the ashen decay of advancing age.',
    modelAnswer: '1. Contrast: The poet juxtaposes the "Young Trees sprinting" and "merry children spilling" with her mother\'s corpse-like, dormant appearance. The sprinting trees and energetic children symbolize youthful vitality, kinetic dynamism, and the relentless forward march of life, contrasting sharply with the mother\'s static, frail, and declining state.\n\n2. Simile Analysis: The mother is compared to a "late winter\'s moon". In winter, the moon loses its customary brilliance, obscured by fog and mist, appearing pale, sluggish, and lifeless. Similarly, advancing senility and impending demise have robbed the mother of her youth, vitality, and facial glow.\n\n3. Poetic Device in sprinting trees: Personification and visual imagery, conveying rapid passing of time.\n\n4. Parting words: "See you soon, Amma" accompanied by an elongated smile represents an emotional mask—a poignant attempt to conceal her childhood fear of separation and reassure both her mother and herself.',
    rubricBreakdown: [
      {
        criterion: 'Juxtaposition Analysis',
        marks: 1.0,
        guideline: 'Explain sprinting trees/merry children vs frail mother.'
      },
      {
        criterion: 'Winter Moon Simile',
        marks: 1.0,
        guideline: 'Explain loss of radiance, misty obscurity, approaching end of annual cycle.'
      },
      {
        criterion: 'Poetic Device Identification',
        marks: 1.0,
        guideline: 'Personification and visual imagery.'
      },
      {
        criterion: 'Emotional Subtext of Parting Smile',
        marks: 1.0,
        guideline: 'Facade of optimism concealing primal separation anxiety.'
      }
    ],
    commonMistakes: [
      'Calling the sprinting trees a metaphor instead of personification.',
      'Missing the symbolic meaning of winter as the final season of life.'
    ]
  },

  // Vistas: The Tiger King (eng-vis-2)
  {
    id: 'ex-eng-03',
    section: 'vistas',
    chapterOrTopicId: 'eng-vis-2',
    title: 'Satire on Power & Ecological Arrogance in The Tiger King',
    type: 'long-answer-evaluative',
    marksWeightage: 5,
    promptOrExtract: 'Kalki\'s "The Tiger King" is a devastating satire on the conceit of those in power and the ecological recklessness of autocrats. Discuss how the Maharaja\'s obsession with defying fate culminates in dramatic irony.',
    contextAndSubtext: 'Jilani Jung Jung Bahadur, Maharaja of Pratibandapuram, warned by astrologer that his death will come from the 100th tiger. He bans tiger hunting for all citizens, neglects governance, and slaughters 99 tigers.',
    modelAnswer: 'In "The Tiger King", Kalki employs biting political satire and dramatic irony to ridicule the self-serving vanities and autocratic arrogance of feudal rulers under colonial suzerainty. The Maharaja\'s life mission—killing one hundred tigers to disprove astrological prophecy—epitomizes ruthless ecological plunder born of unchecked privilege.\n\nTo satisfy his whimsical survival instinct, the king neglects his administrative duties, threatens state officials with dismissal, and subjects innocent villagers to arbitrary taxation. When tigers become extinct in his kingdom, he marries a princess whose father owns large forest reserves purely to continue his slaughter—reducing human relationships and governance to transactional instruments of self-preservation.\n\nThe climax delivers peerless dramatic irony: the Maharaja believes he has vanquished fate after shooting the 100th tiger, unaware that his bullet missed and the faint beast was secretly executed by desperate hunters fearing royal wrath. Ultimately, retribution arrives not through a ferocious living carnivore, but via an inanimate wooden toy tiger crafted by an unskilled carpenter. A microscopic sliver of rough wood pierces the king\'s hand, festering into a fatal suppurating sore that claims his life during surgery. Thus, fate triumphs over megalomania: the dead 100th tiger claims its inevitable revenge, reducing imperial vanity to an absurd farce.',
    rubricBreakdown: [
      {
        criterion: 'Satirical Elements & Power Analysis',
        marks: 2.0,
        guideline: 'Neglect of statecraft, arbitrary power, ecological devastation.'
      },
      {
        criterion: 'Dramatic Irony in Climax',
        marks: 2.0,
        guideline: 'Missed bullet, hunter cover-up, wooden toy sliver causing septic infection.'
      },
      {
        criterion: 'Literary Tone & Quality of Expression',
        marks: 1.0,
        guideline: 'Sophisticated diction (megalomania, suzerainty, dramatic irony, retribution).'
      }
    ],
    commonMistakes: [
      'Omitting the fact that the Maharaja did NOT kill the 100th tiger (the hunters shot it).',
      'Ignoring the satire on sycophantic courtiers like the Dewan.'
    ]
  },

  // Writing Section: Job Application with Bio-Data (eng-writ-3)
  {
    id: 'ex-eng-04',
    section: 'writing',
    chapterOrTopicId: 'eng-writ-3',
    title: 'CBSE Standard Job Application with Detailed Bio-Data',
    type: 'writing-format-rubric',
    marksWeightage: 5,
    promptOrExtract: 'You are Aastha Sharma, M.Sc. Physics with B.Ed., residing at 42, Vasant Kunj, New Delhi. Write a job application in 120-150 words to The Principal, Modern Senior Secondary School, Barakhamba Road, New Delhi, applying for the post of Post Graduate Teacher (PGT) Physics advertised in The Times of India. Enclose a comprehensive Bio-Data.',
    contextAndSubtext: 'CBSE Writing Section Question carrying 5 marks (Format: 1 mark, Content: 2 marks, Expression: 2 marks). Requires covering letter with reference to advertisement, suitability pitch, and structured tabular bio-data with references.',
    modelAnswer: '42, Vasant Kunj\nNew Delhi - 110070\n\n15 October 2026\n\nThe Principal\nModern Senior Secondary School\nBarakhamba Road, New Delhi - 110001\n\nSubject: Application for the post of PGT Physics\n\nSir/Madam,\n\nIn response to your advertisement in The Times of India dated 12 October 2026 inviting applications for the post of Post Graduate Teacher (PGT) Physics, I wish to offer my candidature for the same.\n\nI possess an M.Sc. in Physics with a first-class degree from Delhi University and a B.Ed. from CIE. With over four years of teaching experience at the senior secondary level, I have consistently achieved exceptional board results and fostered a passion for experimental physics. I am proficient in modern educational technology, smart lab management, and student mentoring.\n\nMy detailed resume is enclosed herewith for your kind consideration. Should you find my qualifications suitable, I shall be pleased to present myself for an interview at your earliest convenience.\n\nYours faithfully,\n(Aastha Sharma)\n\nEncl: Bio-Data and Testimonials\n\n---------------- BIO-DATA ----------------\n1. Name: Aastha Sharma\n2. Father\'s Name: Dr. Rajesh Sharma\n3. Date of Birth: 14 August 1998\n4. Marital Status: Unmarried\n5. Address: 42, Vasant Kunj, New Delhi\n6. Contact No.: 98110XXXXX | Email: aastha.sharma@email.com\n7. Academic Qualifications:\n   - M.Sc. Physics (Delhi University) - 2021 (84%)\n   - B.Ed. (Central Institute of Education) - 2022 (88%)\n   - B.Sc. (Hons) Physics (Hindu College, DU) - 2019 (86%)\n   - CBSE Class XII (AISSCE) - 2016 (95.2%)\n8. Work Experience: PGT Physics at Heritage School, Rohini (2022-Present)\n9. Key Skills: Lab demonstration, LaTeX formula authoring, Olympiad coaching\n10. Languages Known: English, Hindi, German (Elementary)\n11. References:\n    (i) Prof. S. K. Mitra, Dept. of Physics, Delhi University (Ph: 98101XXXXX)\n    (ii) Mrs. Sunita Roy, Principal, Heritage School, Rohini (Ph: 98202XXXXX)\n\nDate: 15 October 2026\nPlace: New Delhi\n(Signature: Aastha Sharma)',
    rubricBreakdown: [
      {
        criterion: 'Format (Sender, Date, Receiver, Subject, Salutation, Enclosure, Bio-Data Structure)',
        marks: 1.0,
        guideline: 'All 7 layout elements present with proper spacing and enclosure note.'
      },
      {
        criterion: 'Content of Covering Letter & Educational Match',
        marks: 2.0,
        guideline: 'Advertisement reference, credentials pitch, willingness for interview.'
      },
      {
        criterion: 'Expression, Coherence & Bio-Data Completeness',
        marks: 2.0,
        guideline: 'Tabular education, experience, minimum 2 references, professional tone.'
      }
    ],
    commonMistakes: [
      'Merging Bio-Data into the covering letter body rather than presenting it as a distinct structured annexure.',
      'Omitting references or contact information in Bio-Data.',
      'Forgetting to mention the newspaper source and date of the advertisement.'
    ]
  }
];
