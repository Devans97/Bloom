/**
 * Official CBSE Class XII English Core (Subject Code 301) Literature & Writing Reference
 * Prescribed Syllabus: Flamingo (Prose & Poetry), Vistas (Supplementary Reader), and Writing Skills.
 * Complete authentic analysis: Themes, Character Profiles, Poetic Devices, Tone, and Marking Rubrics.
 */

export interface EnglishCharacterProfile {
  name: string;
  role: string;
  traits: string[];
  psychologicalDilemma: string;
  keyQuotes: string[];
  cbseSignificance: string;
}

export interface PoeticDeviceInstance {
  poem: string;
  device: 'Simile' | 'Metaphor' | 'Personification' | 'Alliteration' | 'Irony' | 'Transferred Epithet' | 'Oxymoron' | 'Hyperbole' | 'Synecdoche' | 'Antithesis' | 'Imagery' | 'Repetition';
  line: string;
  explanation: string;
  markingSignificance: string;
}

export interface EnglishChapterAnalysis {
  id: string;
  book: 'Flamingo (Prose)' | 'Flamingo (Poetry)' | 'Vistas (Supplementary)';
  chapterNumber: number;
  title: string;
  authorOrPoet: string;
  centralTheme: string;
  corePhilosophy: string;
  summaryPoints: string[];
  characters: EnglishCharacterProfile[];
  poeticDevices?: PoeticDeviceInstance[];
  examinerHotspots: string[];
  frequentBoardQuestions: {
    question: string;
    marks: 2 | 5;
    keyPoints: string[];
  }[];
}

export interface WritingFormatRubric {
  id: string;
  title: string;
  wordLimit: '50 words' | '120-150 words';
  marks: 4 | 5;
  markingBreakdown: {
    category: string;
    marks: number;
    criteria: string;
  }[];
  mandatoryFormatElements: string[];
  officialTemplate: string;
  modelAnswer: {
    question: string;
    content: string;
    wordCount: number;
    examinerNotes: string[];
  };
  commonMistakesToAvoid: string[];
}

export const cbseEnglishChapters: EnglishChapterAnalysis[] = [
  // FLAMINGO PROSE
  {
    id: 'eng-fl-p01',
    book: 'Flamingo (Prose)',
    chapterNumber: 1,
    title: 'The Last Lesson',
    authorOrPoet: 'Alphonse Daudet',
    centralTheme: 'Linguistic Chauvinism, Patriotism, and the value of mother tongue in preserving cultural identity and freedom.',
    corePhilosophy: 'Language is the key to prison for an enslaved nation. Procrastination in learning leads to irreversible cultural dispossession.',
    summaryPoints: [
      'Set during the Franco-Prussian War (1870-71) in which France was defeated by Prussia led by Bismarck.',
      'Order arrived from Berlin mandating that only German would be taught in the schools of Alsace and Lorraine.',
      'Franz, a young schoolboy, dreads going to school because he had not prepared his lesson on participles and fears M. Hamel’s ruler.',
      'Franz observes unusual stillness in school: village elders sitting on the back benches with old primers, M. Hamel wearing his ceremonial Sunday green coat and embroidered frilled shirt.',
      'M. Hamel announces gently that this is their last French lesson.',
      'Franz feels immense remorse for neglecting his studies, chasing birds’ eggs and sliding on the Saar.',
      'M. Hamel proclaims that French is the most beautiful, clearest and most logical language in the world, urging them to guard it among themselves and never forget it.',
      'Church clock strikes twelve, Prussian trumpets sound, and an overwhelmed M. Hamel writes "Vive La France!" in giant letters on the blackboard before dismissing the class.'
    ],
    characters: [
      {
        name: 'M. Hamel',
        role: 'Dedicated French teacher serving forty years in Alsace.',
        traits: ['Dignified', 'Passionate Patriot', 'Strict Disciplinarian with Deep Empathy', 'Self-critical'],
        psychologicalDilemma: 'Blames not only parents and students but also himself for sending pupils to water his flowers or giving holidays when he wanted to go fishing.',
        keyQuotes: [
          '"When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison."',
          '"Vive La France!"'
        ],
        cbseSignificance: 'Symbol of French dignity, resistance against cultural assimilation, and educational dedication.'
      },
      {
        name: 'Franz',
        role: 'Young Alsace schoolboy narrator.',
        traits: ['Carefree', 'Sensory and Nature-loving', 'Procrastinator', 'Transformational Learner'],
        psychologicalDilemma: 'Transition from viewing books as a nuisance to feeling sudden anguish and longing for his language upon discovering he will never learn it again.',
        keyQuotes: [
          '"Will they make them sing in German, even the pigeons?"',
          '"I had never listened so carefully, and he had never explained everything with so much patience."'
        ],
        cbseSignificance: 'Represents the voice of youth waking up to national heritage at the exact moment of loss.'
      }
    ],
    examinerHotspots: [
      'Significance of M. Hamel’s Sunday attire and village elders on back benches.',
      'Meaning and irony of Franz’s thought about pigeons singing in German.',
      'Linguistic imperialism vs cultural resistance: How language functions as a key to freedom.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why were the elders of the village seated on the back benches of the classroom in "The Last Lesson"?',
        marks: 2,
        keyPoints: [
          'Showing respect for M. Hamel’s forty years of faithful service.',
          'Expressing remorse for not having attended school more frequently in their youth.',
          'Honouring their country and mother tongue which was no longer theirs under Prussian annexation.'
        ]
      },
      {
        question: '"Linguistic chauvinism can lead to alienation and loss of identity." Elaborate with reference to "The Last Lesson".',
        marks: 5,
        keyPoints: [
          'Define linguistic chauvinism: The aggressive imposition of one language over another.',
          'Prussian order banning French in Alsace-Lorraine aimed at subduing collective French national consciousness.',
          'Daudet illustrates that mother tongue is tied to ancestral memory, pride, and personal dignity.',
          'M. Hamel’s assertion that language serves as a fortress against spiritual enslavement.',
          'Relevance to modern world: Cultural diversity must be protected against linguistic hegemony.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-p02',
    book: 'Flamingo (Prose)',
    chapterNumber: 2,
    title: 'Lost Spring: Stories of Stolen Childhood',
    authorOrPoet: 'Anees Jung',
    centralTheme: 'Grinding poverty, child labour, institutional neglect, and the crushing vicious circle of middlemen, police, and bureaucrats.',
    corePhilosophy: 'Social stratification traps underprivileged children in hereditary labour, stealing their childhood, innocence, and fundamental right to education.',
    summaryPoints: [
      'Two-part analytical narrative depicting child poverty in India: Saheb-e-Alam in Seemapuri and Mukesh in Firozabad.',
      'Saheb-e-Alam ("Lord of the Universe") is a ragpicker in Seemapuri on the periphery of Delhi, having fled floods in Dhaka.',
      'Ragpicking is gold to the impoverished community: for elders it is survival, for children it is wrapped in wonder (finding a coin).',
      'Over 10,000 ragpickers live without sewage, drainage, or running water; identity cards (ration cards) are more vital than voting rights or legal status.',
      'Saheb trades freedom for economic survival by taking a job at a tea stall for 800 rupees and meals; the steel canister is heavier than the plastic rag bag.',
      'Part two focuses on Mukesh in Firozabad, the glass-blowing and bangle-making capital of India.',
      'Over 20,000 children work illegally around high-temperature furnaces in dingy cells without air and light, losing their eyesight before adulthood.',
      'Mukesh dares to dream differently: he wants to become a motor mechanic rather than surrender to the lineage of bangle-makers.',
      'A vicious circle comprising sahukars (moneylenders), middlemen, policemen, keepers of law, bureaucrats, and politicians keeps them disempowered.'
    ],
    characters: [
      {
        name: 'Saheb-e-Alam',
        role: 'Child ragpicker in Seemapuri.',
        traits: ['Innocent', 'Hopeful', 'Resigned to Destiny', 'Deprived'],
        psychologicalDilemma: 'Namesake irony: named Lord of the Universe, but lacks footwear and spends mornings scrounging through garbage dumps.',
        keyQuotes: [
          '"I have nothing else to do... I want to go to school, but there is no school in my neighbourhood."',
          '"The steel canister seemed heavier than the plastic bag he would carry so lightly over his shoulder."'
        ],
        cbseSignificance: 'Embodiment of lost innocence and freedom exchanged for bare economic subsistence.'
      },
      {
        name: 'Mukesh',
        role: 'Spirited child labourer in Firozabad glass factories.',
        traits: ['Resolute', 'Ambitious', 'Non-conformist', 'Realistic Dreamer'],
        psychologicalDilemma: 'Fighting against the karmic resignation ("it is his karam, his destiny") inherited from his blind grandfather and family.',
        keyQuotes: [
          '"I want to be a motor mechanic. I will learn."',
          '"I will walk to a garage and learn, even if the garage is a long way from my home."'
        ],
        cbseSignificance: 'A spark of rebellion and individual agency against multi-generational structural oppression.'
      }
    ],
    examinerHotspots: [
      'Irony in the name "Saheb-e-Alam".',
      'The metaphor of garbage: "survival" for adults vs "wrapped in wonder" for children.',
      'The steel canister vs the plastic bag: loss of autonomy and carefree childhood.',
      'The web of exploitation (sahukars, middlemen, politicians) preventing cooperativism in Firozabad.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why did Saheb take up a job at the tea stall, and was he happy with it?',
        marks: 2,
        keyPoints: [
          'Earned ₹800 and all meals to alleviate financial distress.',
          'Not happy: surrendered his freedom and agency.',
          'The heavy steel canister belonged to the master, whereas the rag bag had been his own.'
        ]
      },
      {
        question: 'Analyse the dual forces that keep the bangle makers of Firozabad trapped in their poverty.',
        marks: 5,
        keyPoints: [
          'Force 1: The stigma of caste and hereditary lineage ("born in the caste of bangle makers").',
          'Force 2: The organized vicious nexus of sahukars, middlemen, policemen, bureaucrats, and politicians.',
          'Absence of collective leadership: Anyone attempting to organize a union is beaten and jailed by police on trumped-up illegal charges.',
          'Physical and psychological toll: working in dark, unventilated furnaces causes loss of eyesight and stifles daring or initiative.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-p03',
    book: 'Flamingo (Prose)',
    chapterNumber: 3,
    title: 'Deep Water',
    authorOrPoet: 'William Douglas',
    centralTheme: 'Overcoming deep-seated childhood trauma and phobia through systematic preparation, indomitable willpower, and perseverance.',
    corePhilosophy: '"All we have to fear is fear itself" (Franklin D. Roosevelt). Terror is in the fear of death, whereas death itself is peaceful.',
    summaryPoints: [
      'Autobiographical essay recounting Douglas’s journey of conquering hydrophobia (fear of water).',
      'First childhood incident: At age 3-4 on California beach with his father, knocked down and swept over by ocean waves.',
      'Second trauma: At age 10-11 at YMCA swimming pool in Yakima, a "big bruiser of a boy" threw him into the deep end (9 feet deep).',
      'Near-death experience described with clinical precision: planning to jump off the bottom like a cork, but rising agonizingly slowly, swallowing water, lungs aching, head throbbing, and succumbing to black oblivion.',
      'The lingering terror haunted him for years, ruining fishing trips in Maine, canoeing on the Deschutes, and swimming in Bumping Lake.',
      'Douglas hires an instructor: builds confidence piece-by-piece using a belt, pulley, and overhead rope for five days a week.',
      'Practised breathing: exhaling underwater and inhaling through the nose above water; practised kicking legs for weeks until muscles obeyed.',
      'To verify complete eradication of fear, Douglas swam two miles across Lake Wentworth in New Hampshire and dived into Warm Lake.',
      'Defeated the residual tiny fear with assertive psychological self-talk: "Well, Mr Terror, what do you think you can do to me?"'
    ],
    characters: [
      {
        name: 'William Douglas',
        role: 'Protagonist and autobiographical narrator.',
        traits: ['Self-aware', 'Tenacious', 'Analytical', 'Uncompromising in self-testing'],
        psychologicalDilemma: 'Refusal to live a compromised life circumscribed by irrational panic; choosing deliberate discomfort over passive surrender.',
        keyQuotes: [
          '"All we have to fear is fear itself."',
          '"The instructor was finished. But I was not finished."',
          '"In death there is peace. There is terror only in the fear of death."'
        ],
        cbseSignificance: 'Archetype of psychological mastery over visceral trauma through structured habit and courage.'
      }
    ],
    examinerHotspots: [
      'The strategy Douglas formulated during his descent into the YMCA pool and why it failed.',
      'The three psychological phases of drowning: panic, suffocation, and serene oblivion.',
      'How the swimming instructor "built a swimmer out of him bit by bit".',
      'The deeper philosophical truth Douglas extracted from his survival.'
    ],
    frequentBoardQuestions: [
      {
        question: 'How did the YMCA pool accident affect Douglas’s everyday life?',
        marks: 2,
        keyPoints: [
          'Left a haunting fear of water that deprived him of canoeing, boating, and swimming joys.',
          'Ruined his fishing expeditions in Oregon and Washington lakes.',
          'Triggered paralyzing physical weakness in his knees whenever he ventured near water.'
        ]
      },
      {
        question: '"Perseverance and methodical practice can conquer the deepest psychological trauma." Justify using William Douglas’s ordeal in "Deep Water".',
        marks: 5,
        keyPoints: [
          'Acknowledge the severity of trauma: Two near-drowning shocks creating paralyzing terror.',
          'Methodical rehabilitation under professional instructor: belt, cable, pulley system reducing sudden panic.',
          'Deconstruction of the skill: inhalation/exhalation coordination followed by leg thrashing.',
          'Incremental progression over months: assembling individual mechanics into an integrated reflex.',
          'Autonomous verification: swimming across Lake Wentworth and Warm Lake to eliminate subjective residual anxiety.',
          'Philosophical synthesis: Roosevelt’s maxim on overcoming existential fear.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-p04',
    book: 'Flamingo (Prose)',
    chapterNumber: 4,
    title: 'The Rattrap',
    authorOrPoet: 'Selma Lagerlöf',
    centralTheme: 'The redemptive power of empathy, unconditional human compassion, and kindness in reviving the latent goodness of an outcast.',
    corePhilosophy: 'The entire world is a giant rattrap offering baits of riches, food, and shelter; succumbing to greed traps the soul, but genuine love unlocks the cage.',
    summaryPoints: [
      'Philosophical fairy-tale style narrative set in the iron ore mining community of Sweden.',
      'A homeless peddler sells wire rattraps; resorts to petty begging and thievery to keep body and soul together.',
      'Philosophizes that the world is a bait-filled rattrap: lands, luxuries, and comforts lure men until the trap snaps shut.',
      'Shelters at a lonely crofter’s cottage: the generous old crofter offers porridge, tobacco, and confides that he earned 30 kronor from his cow.',
      'Next morning, the peddler succumbs to temptation, smashes the windowpane, and steals the 30 kronor.',
      'To avoid police on the highway, he flees into a labyrinthine dense forest, losing his direction and realizing he has fallen into the rattrap.',
      'Collapses near Ramsjö Ironworks; hears the thud of the hammer and seeks shelter in the forge.',
      'Ironmaster mistakes him in the dim light for his old army regimental comrade, Captain Nils Olof, and invites him home.',
      'Peddler refuses fearfully, knowing he carries stolen kronor (like stepping into the lion’s den).',
      'Ironmaster’s daughter, Edla Willmansson, visits the forge with compassionate eyes and persuades him to celebrate Christmas Eve.',
      'In broad daylight, bathed and groomed in the ironmaster’s suit, his true identity is revealed; ironmaster angrily threatens to call the sheriff.',
      'Edla intervenes: pleads that they promised him Christmas cheer and must show hospitality to a destitute soul.',
      'Transformed by Edla’s saintly trust, the peddler leaves the next morning, leaving behind a small package: a tiny rattrap, the stolen 30 kronor with a note asking to return it to the crofter, and a letter signed as "Captain von Stahle".'
    ],
    characters: [
      {
        name: 'The Peddler / Vagabond',
        role: 'Cynical itinerant seller and petty thief.',
        traits: ['Philosophical', 'Cynical', 'Morally conflicted', 'Capable of redemption'],
        psychologicalDilemma: 'Defensive cynicism toward human society that has never treated him with dignity, overturned by unmerited grace.',
        keyQuotes: [
          '"The world was nothing but a big rattrap... It set baits for people."',
          '"The rattrap is a Christmas present from a rat who would have been caught in this world’s rattrap if he had not been raised to captain."'
        ],
        cbseSignificance: 'Illustrates that human depravity is often the consequence of isolation, remediable by genuine kindness.'
      },
      {
        name: 'Edla Willmansson',
        role: 'Daughter of the ironmaster at Ramsjö.',
        traits: ['Compassionate', 'Perceptive', 'Steadfast Moral Conviction', 'Non-judgmental'],
        psychologicalDilemma: 'Stands up against her own father’s authoritarianism to honour an unconditional ethical promise of hospitality.',
        keyQuotes: [
          '"I think he ought to stay with us today... to have one day of peace in the whole year."',
          '"He can sleep here in the house—one day in the year."'
        ],
        cbseSignificance: 'The moral catalyst who raises the vagabond to the status of a gentleman through unconditional respect.'
      }
    ],
    examinerHotspots: [
      'The metaphor of the rattrap and how the peddler himself gets trapped.',
      'Contrast between the Ironmaster’s conditional hospitality and Edla’s unconditional compassion.',
      'Why the peddler signed the letter as "Captain von Stahle".'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why did the peddler sign himself as Captain von Stahle in his letter to Edla?',
        marks: 2,
        keyPoints: [
          'Edla treated him with dignity and respect as if he were a real captain.',
          'It gave him the moral strength to rise above his thieving ways and act with honour.',
          'Signing as the captain symbolized his rebirth into a life of integrity.'
        ]
      },
      {
        question: 'Compare and contrast the reactions of the ironmaster and his daughter Edla when the peddler’s true identity was revealed.',
        marks: 5,
        keyPoints: [
          'Ironmaster’s reaction: Shock, betrayal, indignation, and legalistic anger; threatens to call the sheriff and demands immediate eviction.',
          'Ironmaster judged him purely on social status and utility as an old comrade.',
          'Edla’s reaction: Empathy, remorse, and steadfast moral obligation.',
          'Edla reminded her father that they invited him with false promises of Christmas cheer.',
          'She recognized his desperate plight of being chased and unwelcome all year round, providing him safety regardless of his social deceit.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-p05',
    book: 'Flamingo (Prose)',
    chapterNumber: 5,
    title: 'Indigo',
    authorOrPoet: 'Louis Fischer',
    centralTheme: 'Leadership, peaceful civil disobedience, social self-reliance, and championing agrarian justice against colonial exploitation.',
    corePhilosophy: 'True emancipation requires not merely legal concessions but eradicating the psychological fear of oppressors from the minds of the oppressed.',
    summaryPoints: [
      'Excerpt from Louis Fischer’s biography "The Life of Mahatma Gandhi".',
      'Chronicles Gandhi’s Champaran Satyagraha in 1917, marking the turning point of the Indian freedom struggle.',
      'Rajkumar Shukla, an illiterate but resolute sharecropper from Champaran (Bihar), relentlessly follows Gandhi across India to convince him to intervene.',
      'British landlords coerced tenant farmers into planting 15% of their holdings with Indigo and surrendering the entire harvest as rent (tinkathia system).',
      'When Germany developed synthetic indigo, landlords demanded compensation from peasants to release them from the 15% agreement.',
      'Gandhi arrives in Champaran, collects evidence, ignores British police order to leave, and is summoned to Motihari district court.',
      'Thousands of peasants surround the courthouse; the British administration loses control and requires Gandhi’s help to manage the crowd.',
      'Lt. Governor orders case against Gandhi dropped: Civil disobedience triumphed for the first time in modern India.',
      'Gandhi negotiates an inquiry commission; landlords agree to refund 25% of extorted money.',
      'Gandhi accepts the 25% refund because the landlords were forced to surrender their prestige along with money, shattering their aura of invulnerability.',
      'Gandhi emphasizes social uplift: brings teachers, doctors, and Kasturba to open primary schools and sanitation drives in Champaran villages.',
      'Gandhi refuses Charles Freer Andrews’s help: asserts that relying on an Englishman shows weakness in their cause; self-reliance is vital.'
    ],
    characters: [
      {
        name: 'Mahatma Gandhi',
        role: 'Leader of the Champaran campaign.',
        traits: ['Courageous', 'Strategic Pragmatist', 'Constructive Reformer', 'Champion of Self-reliance'],
        psychologicalDilemma: 'Prioritizing peasant psychological freedom over legalistic grandstanding; declining tactical shortcuts like foreign mediation.',
        keyQuotes: [
          '"The real relief for them is to be free from fear."',
          '"In everything Gandhi did, moreover, he tried to mold a new free Indian who could stand on his own feet and thus make India free."'
        ],
        cbseSignificance: 'Archetype of grassroots leadership combining mass mobilization with constructive social development.'
      },
      {
        name: 'Rajkumar Shukla',
        role: 'Sharecropper from Champaran.',
        traits: ['Resolute', 'Persistent', 'Tenacious', 'Devoted'],
        psychologicalDilemma: 'Carrying the collective agony of an entire district without personal fame or wealth.',
        keyQuotes: ['"He was described as illiterate but resolute."'],
        cbseSignificance: 'The spark that brought Gandhi to Bihar and catalyzed the first nationwide mass campaign.'
      }
    ],
    examinerHotspots: [
      'Why Gandhi agreed to a 25% refund instead of demanding 50%.',
      'The concept of self-reliance demonstrated through Gandhi’s refusal of C.F. Andrews’s assistance.',
      'Why the Champaran Satyagraha is considered a turning point in India’s struggle for independence.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why did Gandhi agree to a settlement of a 25 percent refund to the farmers in Champaran?',
        marks: 2,
        keyPoints: [
          'The amount of money was less important than the principle involved.',
          'British landlords were forced to surrender part of their money and, with it, part of their imperial prestige.',
          'It broke the psychological myth of British invincibility and taught peasants they had defenders.'
        ]
      },
      {
        question: 'Explain how the Champaran episode became a watershed event for the Indian independence movement.',
        marks: 5,
        keyPoints: [
          'First successful demonstration of Satyagraha and civil disobedience on Indian soil.',
          'Shifted the national freedom movement from urban intellectual debate to grassroots peasant mass mobilization.',
          'Eradicated the paralyzing psychological fear of the British Raj among rural masses.',
          'Integrated political agitation with socioeconomic reconstruction (health, hygiene, education).',
          'Established the foundational principle of "Swavalamban" (self-reliance).'
        ]
      }
    ]
  },

  // FLAMINGO POETRY
  {
    id: 'eng-fl-po01',
    book: 'Flamingo (Poetry)',
    chapterNumber: 1,
    title: 'My Mother at Sixty-Six',
    authorOrPoet: 'Kamala Das',
    centralTheme: 'Aging, the universal fear of losing a parent, filial responsibility, and the painful facade of cheerful departure.',
    corePhilosophy: 'Mortality is an inevitable law of nature; human relationships are shadowed by temporal decay, maskable only through fragile smiles.',
    summaryPoints: [
      'Poet driving from her parents’ home to Cochin airport with her elderly mother sitting beside her in the car.',
      'Notices her mother dozing with her mouth open, her face ashen like that of a corpse.',
      'Overcome by visceral childhood ache: the terrifying realization that her mother is frail and approaching death.',
      'To divert her distress, looks out the car window: observes "young trees sprinting" and "merry children spilling out of their homes" (symbols of vibrant youth, vitality, and life in contrast to decay).',
      'At airport security check, standing a few yards away, gazes again at her mother’s pale, worn face, comparing her to a "late winter’s moon".',
      'Hides her agony beneath an optimistic parting facade: "See you soon, Amma" accompanied by an elongated smile.'
    ],
    characters: [
      {
        name: 'The Poet (Kamala Das)',
        role: 'Daughter journeying away from home.',
        traits: ['Introspective', 'Affectionate', 'Emotionally Vulnerable', 'Dutiful'],
        psychologicalDilemma: 'Conflict between personal commitments and career vs the guilt of leaving an aging, vulnerable mother.',
        keyQuotes: [
          '"...looked but soon put that thought away, and looked out at Young Trees sprinting, the merry children spilling..."',
          '"...all I said was, see you soon, Amma, all I did was smile and smile and smile..."'
        ],
        cbseSignificance: 'Universal depiction of the generational helplessness felt by adult children observing parents age.'
      }
    ],
    poeticDevices: [
      {
        poem: 'My Mother at Sixty-Six',
        device: 'Simile',
        line: '...face ashen like that of a corpse',
        explanation: 'Compares the mother’s pale, bloodless, wrinkled face to a dead body, highlighting impending mortality.',
        markingSignificance: 'Direct marker of physiological decay and death.'
      },
      {
        poem: 'My Mother at Sixty-Six',
        device: 'Personification',
        line: 'Young Trees sprinting',
        explanation: 'Trees rushing past the moving vehicle are personified as youthful runners, contrasting fleeting time with youthful vigor.',
        markingSignificance: 'Symbolizes the rapid passage of human life from childhood to senescence.'
      },
      {
        poem: 'My Mother at Sixty-Six',
        device: 'Simile',
        line: '...as a late winter’s moon',
        explanation: 'Compares the mother to the moon obscured by winter fog, lacking brightness, warmth, and luster.',
        markingSignificance: 'Winter represents the final season of life, evoking decline and approaching end.'
      },
      {
        poem: 'My Mother at Sixty-Six',
        device: 'Repetition',
        line: 'smile and smile and smile...',
        explanation: 'Repetition of "smile" underscores the deliberate, strenuous effort to conceal inner torment behind a cheerful facade.',
        markingSignificance: 'Emphasizes the emotional mask maintained by the daughter to reassure her mother.'
      }
    ],
    examinerHotspots: [
      'The dual contrast: Young sprinting trees & merry children vs the ashen corpse-like mother.',
      'Significance of the "late winter’s moon" comparison.',
      'The emotional resonance and irony of the parting words "See you soon, Amma".'
    ],
    frequentBoardQuestions: [
      {
        question: 'What is the significance of the parting words of the poet and her smile in "My Mother at Sixty-Six"?',
        marks: 2,
        keyPoints: [
          '"See you soon, Amma" offers reassurance and hope of reunion despite internal fear of death.',
          'The repetitive smile is a protective emotional facade to mask her agony and childhood fear of abandonment.'
        ]
      },
      {
        question: 'How does Kamala Das use contrasting imagery in "My Mother at Sixty-Six" to convey her emotional turbulence?',
        marks: 5,
        keyPoints: [
          'Contrast between inside the car (decay, aging, stagnation, corpse-like mother) and outside the car (youth, vitality, dynamism).',
          'Sprinting trees symbolize the inexorable and fleeting nature of youth and time.',
          'Merry children spilling out of homes represent spontaneous life force and uninhibited energy.',
          'Late winter’s moon embodies loss of vital glow and the dusk of existence.',
          'Duality between inner existential terror and external cheerful farewell.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-po02',
    book: 'Flamingo (Poetry)',
    chapterNumber: 2,
    title: 'Keeping Quiet',
    authorOrPoet: 'Pablo Neruda',
    centralTheme: 'Universal peace, collective introspection, ecological harmony, and suspension of destructive human ego.',
    corePhilosophy: 'Stillness is not total inactivity or death; it is the prerequisite pause for self-renewal, mutual understanding, and healing the wounded planet.',
    summaryPoints: [
      'Calls for counting up to twelve and maintaining total physical and vocal silence.',
      'Suspension of language barriers: for once on the face of the earth, not speaking in any tongue creates an exotic moment free of rush and engines.',
      'Ecological reprieve: fishermen in the cold sea would not harm whales, and the salt gatherer would look at his hurt hands.',
      'Condemnation of wars: green wars (against nature), wars with gas, wars with fire where victories leave no survivors.',
      'Proposes that warmongers put on clean clothes and walk with their brothers in the shade, doing nothing.',
      'Clarifies that stillness must not be confused with total inactivity (which means death); Neruda advocates engagement with life, not death.',
      'Humankind’s tragic flaw: constant rushing and fear of death preventing introspection and causing chronic sadness.',
      'Earth as supreme teacher: when everything seems dead in winter, life quietly regenerates under the surface to flourish in spring.'
    ],
    characters: [],
    poeticDevices: [
      {
        poem: 'Keeping Quiet',
        device: 'Alliteration',
        line: 'wars with gas, wars with fire... clean clothes',
        explanation: 'Repetition of consonant sounds highlights destructive conflicts and the transformation into purity.',
        markingSignificance: 'Emphasizes mutual brotherhood.'
      },
      {
        poem: 'Keeping Quiet',
        device: 'Personification',
        line: 'Perhaps the Earth can teach us',
        explanation: 'Earth is endowed with the agency of a wise mentor demonstrating regenerative stillness.',
        markingSignificance: 'Earth exemplifies apparent stillness harboring dormant life.'
      },
      {
        poem: 'Keeping Quiet',
        device: 'Metaphor',
        line: 'put on clean clothes',
        explanation: 'Symbolizes shedding bloodstained ideologies of hatred and adopting an uncorrupted perspective of fraternity.',
        markingSignificance: 'A change of heart and mindset.'
      }
    ],
    examinerHotspots: [
      'Difference between total inactivity and quiet introspection.',
      'The lesson taught by the Earth during seasonal transition.',
      'Significance of "exotic moment" without engines and rush.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why does Pablo Neruda urge us not to speak in any language in "Keeping Quiet"?',
        marks: 2,
        keyPoints: [
          'Language differences often create divisions, national boundaries, and misunderstandings among people.',
          'Silence creates a shared universal communion uniting humanity in a singular transcendent bond.'
        ]
      },
      {
        question: 'What is the sadness that Pablo Neruda refers to in "Keeping Quiet"? How can it be cured?',
        marks: 5,
        keyPoints: [
          'Sadness arises from never understanding ourselves and from threatening ourselves with death through frantic busyness.',
          'Blind pursuit of materialistic ambition leaves no time for spiritual reflection.',
          'Cure lies in brief suspension of activity: counting to twelve and observing profound meditative stillness.',
          'A pause allows humanity to witness mutual interconnectedness and heal ecological and social wounds.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-po03',
    book: 'Flamingo (Poetry)',
    chapterNumber: 3,
    title: 'A Thing of Beauty',
    authorOrPoet: 'John Keats',
    centralTheme: 'The immortal, healing power of beauty and art in elevating the human soul beyond despair, melancholy, and mundane suffering.',
    corePhilosophy: '"A thing of beauty is a joy forever." Nature and sublime art offer an endless fountain of immortal nectar pouring from the heaven’s brink.',
    summaryPoints: [
      'Opening line of Endymion: A poetic romance by Keats.',
      'A true thing of beauty’s loveliness increases over time; it never passes into nothingness.',
      'Acts as a quiet bower providing sound sleep filled with sweet dreams, health, and quiet breathing.',
      'Every morning we weave a flowery band to bind us to the earth, despite gloomy days, dearth of noble natures, and unhealthy ways.',
      'Some shape of beauty moves away the dark pall from our darkened spirits.',
      'Catalogue of natural beauties: the sun, moon, old and young trees providing a shady boon for simple sheep, daffodils in green woods, clear rills that make cooling coverts against the hot season, mid-forest brake rich with fair musk-rose blooms.',
      'Beauty extends to the grandeur of the dooms imagined for the mighty dead, and all lovely tales that we have heard or read.',
      'Beauty is an endless fountain of immortal drink poured into human consciousness from heaven.'
    ],
    characters: [],
    poeticDevices: [
      {
        poem: 'A Thing of Beauty',
        device: 'Metaphor',
        line: 'an endless fountain of immortal drink',
        explanation: 'Sublime beauty is compared to an elixir flowing directly from the divine realm to nourish human spirits.',
        markingSignificance: 'Art and nature are spiritual sustainers.'
      },
      {
        poem: 'A Thing of Beauty',
        device: 'Metaphor',
        line: 'wreathing a flowery band to bind us to the earth',
        explanation: 'Our connection with nature is envisioned as a garland of blossoms keeping us attached to life despite hardship.',
        markingSignificance: 'Human resilience grounded in appreciation of beauty.'
      },
      {
        poem: 'A Thing of Beauty',
        device: 'Alliteration',
        line: 'noble natures... cooling covert... band to bind',
        explanation: 'Repetition of consonant sounds enhances musicality and serenity.',
        markingSignificance: 'Auditory reinforcement of harmony.'
      },
      {
        poem: 'A Thing of Beauty',
        device: 'Imagery',
        line: 'mid forest brake, rich with a sprinkling of fair musk-rose blooms',
        explanation: 'Rich olfactory and visual imagery evoking untouched natural splendor.',
        markingSignificance: 'Sensory immersion in pristine natural serenity.'
      }
    ],
    examinerHotspots: [
      'Why Keats associates "grandeur" with the "mighty dead".',
      'The catalogue of things that cause despondency vs things that remove the dark pall.',
      'The metaphor of the "immortal drink".'
    ],
    frequentBoardQuestions: [
      {
        question: 'What rich imagery does Keats use to describe the cooling covert in "A Thing of Beauty"?',
        marks: 2,
        keyPoints: [
          'Clear rills (small streams) running through green landscapes.',
          'Creating a cooling covert against the scorching heat of the summer season.'
        ]
      },
      {
        question: 'Explain the philosophical statement: "A thing of beauty is a joy forever. Its loveliness increases; it will never pass into nothingness."',
        marks: 5,
        keyPoints: [
          'Keatsian aesthetic philosophy: Beauty possesses eternal transcendent value immune to the decay of physical time.',
          'Unlike physical objects that deteriorate, the mental imprint of beauty deepens in contemplation.',
          'Provides refuge ("a bower quiet") during life’s afflictions: malice, despair, and dearth of noble qualities.',
          'Encompasses both the tangible natural cosmos (trees, streams, daffodils) and heroic cultural narratives of the mighty dead.'
        ]
      }
    ]
  },
  {
    id: 'eng-fl-po04',
    book: 'Flamingo (Poetry)',
    chapterNumber: 4,
    title: 'Aunt Jennifer’s Tigers',
    authorOrPoet: 'Adrienne Rich',
    centralTheme: 'Patriarchal oppression, marital subjugation of women, and art as an immortal medium of feminine rebellion and empowerment.',
    corePhilosophy: 'A woman’s physical self may be broken and silenced by domestic tyranny, but her creative art survives immortal, fearless, and free.',
    summaryPoints: [
      'Aunt Jennifer embroiders bright topaz tigers prancing across a screen.',
      'Tigers are fearless, denizens of a green world, sleek with chivalric certainty, unthreatened by men beneath the tree.',
      'In sharp contrast, Aunt Jennifer’s fingers are fluttering through her wool, finding even the ivory needle hard to pull.',
      'The massive weight of Uncle’s wedding band sits heavily upon Aunt Jennifer’s hand (metaphor for matrimonial bondage and domestic tyranny).',
      'Even in death, her terrified hands will lie ringed with ordeals she was mastered by.',
      'The tigers she created in the panel will go on prancing, proud and unafraid, long after her demise.'
    ],
    characters: [
      {
        name: 'Aunt Jennifer',
        role: 'Oppressed married woman and needlework artist.',
        traits: ['Subjugated', 'Artistic', 'Suppressed', 'Frail in Body, Fierce in Creative Soul'],
        psychologicalDilemma: 'Trapped in a domineering marriage where her voice is smothered, channeling her suppressed longing for autonomy into needlework.',
        keyQuotes: [
          '"The massive weight of Uncle’s wedding band sits heavily upon Aunt Jennifer’s hand."',
          '"When Aunt is dead, her terrified hands will lie still ringed with ordeals she was mastered by."'
        ],
        cbseSignificance: 'Victim of historic patriarchal subjugation whose needlework serves as an immortal act of protest.'
      }
    ],
    poeticDevices: [
      {
        poem: 'Aunt Jennifer’s Tigers',
        device: 'Metaphor',
        line: 'bright topaz denizens of a world of green',
        explanation: 'Tigers are compared to glittering gemstones, highlighting their radiant strength, pride, and natural sovereignty.',
        markingSignificance: 'Visual representation of dynamic freedom.'
      },
      {
        poem: 'Aunt Jennifer’s Tigers',
        device: 'Hyperbole',
        line: 'The massive weight of Uncle’s wedding band',
        explanation: 'Exaggeration of a lightweight wedding ring to emphasize the oppressive psychological burden of marital servitude.',
        markingSignificance: 'Symbolizes institutional patriarchal dominance.'
      },
      {
        poem: 'Aunt Jennifer’s Tigers',
        device: 'Irony',
        line: 'A frail woman creating proud, chivalric, fearless tigers',
        explanation: 'Irony that a terrified, subjugated wife creates beasts that fear no man.',
        markingSignificance: 'Contrast between woman’s subjugated reality and her liberated art.'
      },
      {
        poem: 'Aunt Jennifer’s Tigers',
        device: 'Alliteration',
        line: 'prancing, proud... fingers fluttering',
        explanation: 'Contrasts the dynamic certainty of the tigers with the nervous trembling of the artist.',
        markingSignificance: 'Phonetic reinforcement of emotional state.'
      }
    ],
    examinerHotspots: [
      'The symbolic weight of Uncle’s wedding band.',
      'Contrast between Aunt Jennifer’s fluttering fingers and the prancing tigers.',
      'The significance of art surviving the artist’s physical ordeals.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why do Aunt Jennifer’s fingers flutter through her wool in "Aunt Jennifer’s Tigers"?',
        marks: 2,
        keyPoints: [
          'Exhibits physical frailty, trauma, and nervousness resulting from years of marital oppression.',
          'The psychological burden of domestic tyranny makes even pulling the lightweight ivory needle strenuous.'
        ]
      },
      {
        question: 'How do the tigers contrast with Aunt Jennifer’s own personality and life circumstances?',
        marks: 5,
        keyPoints: [
          'Tigers: Confident, fearless, majestic ("chivalric certainty"), prancing proudly, indifferent to men standing beneath the tree.',
          'Aunt Jennifer: Terrified, subdued, nervous ("fingers fluttering"), trapped in domestic servitude.',
          'Tigers represent her subconscious yearning for emancipation, power, and dignity.',
          'Artistic transcendence: While Jennifer will die "ringed with ordeals", her immortal tigers will prance unabashed forever.'
        ]
      }
    ]
  },

  // VISTAS SUPPLEMENTARY
  {
    id: 'eng-vis-s01',
    book: 'Vistas (Supplementary)',
    chapterNumber: 1,
    title: 'The Third Level',
    authorOrPoet: 'Jack Finney',
    centralTheme: 'Psychological escapism, modern existential angst, time travel delusion, and the longing for nostalgic 19th-century serenity.',
    corePhilosophy: 'When modern life becomes inundated with insecurity, war, and stress, the human psyche constructs waking-dream wish fulfillments to seek refuge.',
    summaryPoints: [
      'Narrator Charley, a 31-year-old New York commuter, claims there is a third level at Grand Central Station, while authorities insist there are only two.',
      'Charley’s psychiatrist friend Sam Weiner diagnoses it as a "waking-dream wish fulfillment" stemming from modern insecurity, fear, war, and worry.',
      'Charley’s hobby of stamp collecting is also interpreted as a temporary refuge from reality.',
      'Charley describes entering the third level: smaller rooms, fewer ticket windows, open-flame gaslights, brass spittoons, men with sideburns and handle-bar moustaches wearing derby hats.',
      'Notices an issue of "The World" dated June 11, 1894, with a lead story about President Cleveland.',
      'Attempts to buy two tickets to Galesburg, Illinois—a peaceful paradise with huge trees, frame houses, and unhurried summer evenings.',
      'Clerk threatens to turn him in when Charley offers modern currency.',
      'Charley exchanges modern dollars for old-style currency at a loss, but never finds the third level again.',
      'Climax: Sam Weiner mysteriously disappears; Charley finds a first-day cover in his grandfather’s collection from Galesburg dated July 18, 1894, written by Sam, confirming he has found the third level and urging Charley and Louisa to keep searching.'
    ],
    characters: [
      {
        name: 'Charley',
        role: '31-year-old ordinary city commuter.',
        traits: ['Imaginative', 'Vulnerable to stress', 'Nostalgic', 'Persistent'],
        psychologicalDilemma: 'Coping with post-war existential anxiety by retreating into romanticized memories of peaceful pre-industrial America.',
        keyQuotes: [
          '"Grand Central has been like an exit, a way of escape... maybe that’s how the tunnel I got into was."',
          '"In 1894, summer evenings were twice as long, and people sat out on their lawns..."'
        ],
        cbseSignificance: 'Everyman figure grappling with the alienating velocity of modern industrial civilization.'
      },
      {
        name: 'Sam Weiner',
        role: 'Charley’s psychiatrist friend.',
        traits: ['Analytical', 'Skeptical initially', 'Secretly disillusioned with modern psychiatry', 'Fellow Escapist'],
        psychologicalDilemma: 'Diagnosing escapism in his patient while harboring the identical yearning to flee into a tranquil past.',
        keyQuotes: ['"Charley, you are right. It’s here. Keep looking, you and Louisa, until you find the third level."'],
        cbseSignificance: 'Irony that the rational psychiatric healer succumbs to the identical romantic delusion.'
      }
    ],
    examinerHotspots: [
      'Meaning of "waking-dream wish fulfillment".',
      'Sensory and period details establishing the 1894 atmosphere on the third level.',
      'The mystery and significance of Sam’s first-day cover.'
    ],
    frequentBoardQuestions: [
      {
        question: 'What is a first-day cover and how did it connect Charley to the third level?',
        marks: 2,
        keyPoints: [
          'A first-day cover is a new stamp mailed by collectors to their own address on the first day of issue to preserve the postmark date.',
          'Charley discovered a first-day cover addressed to his grandfather in Galesburg containing a letter from Sam dated July 18, 1894.'
        ]
      },
      {
        question: 'Do you think that the third level was a medium of escape for Charley? Justify your stance.',
        marks: 5,
        keyPoints: [
          'Affirmative: Modern urban existence is riddled with stress, insecurity, work pressures, and war fears.',
          'Charley’s journey down Grand Central’s labyrinthine corridors reflects his subconscious desire to step off the relentless treadmill of routine.',
          'Galesburg represents an idealized agrarian paradise of slow summer evenings, front porch sociability, and peace.',
          'Psychiatric consensus: Sam identified the third level as an imaginary coping mechanism.',
          'The ending leaves an intriguing ambiguity: whether it was a psychological sanctuary or an authentic wrinkle in fourth-dimensional space-time.'
        ]
      }
    ]
  },
  {
    id: 'eng-vis-s02',
    book: 'Vistas (Supplementary)',
    chapterNumber: 2,
    title: 'The Enemy',
    authorOrPoet: 'Pearl S. Buck',
    centralTheme: 'Universal humanism, the Hippocratic medical oath, duty to humanity superseding narrow chauvinistic wartime boundaries.',
    corePhilosophy: 'A doctor’s ethical calling to preserve human life transcends national borders, ethnic enmity, and wartime propaganda.',
    summaryPoints: [
      'Set in Japan during the Second World War when American-Japanese hostilities were at their peak.',
      'Dr. Sadao Hoki, a distinguished Japanese surgeon and scientist researching a discovery to clean wounds completely, lives in a coastal house with his wife Hana.',
      'A wounded American Navy prisoner of war (Tom) washes ashore near their home, bleeding to death with a bullet lodged near his kidney.',
      'Sadao and Hana face an agonizing moral dilemma: if they shelter the enemy they will be arrested for treason; if they throw him back into the sea he will die.',
      'Medical ethics prevail: Sadao brings him into the house, and with Hana washing the patient despite servant revolt, performs surgery and extracts the bullet.',
      'Servants, led by the old gardener and cook, refuse to serve a white enemy, viewing the couple’s actions as unpatriotic, and leave the house en masse.',
      'Sadao informs the General of the Japanese army about the American; the ailing General promises to send private assassins to silently eliminate the prisoner.',
      'For three sleepless nights, Sadao waits in agonizing anxiety, but the self-absorbed General forgets his promise due to severe personal illness.',
      'Sadao decides to save Tom: arranges a sturdy boat, provisions of food, water, quilts, and a flashlight, instructing the prisoner to row to an uninhabited nearby island and signal an American submarine.',
      'Tom escapes safely; Sadao stands on his veranda staring out into the twilight, pondering why he could not kill the American.'
    ],
    characters: [
      {
        name: 'Dr. Sadao Hoki',
        role: 'Eminent Japanese surgeon and patriot.',
        traits: ['Brilliant Clinician', 'Morally Courageous', 'Dutiful', 'Humanitarian'],
        psychologicalDilemma: 'Conflict between patriotic duty as a Japanese citizen in wartime and the inviolable sacred oath of a medical practitioner.',
        keyQuotes: [
          '"My father would never have allowed a white man to sleep in our home... yet I cannot let him die."',
          '"Strange... I wonder why I could not kill him."'
        ],
        cbseSignificance: 'Exemplifies ethical transcendence over nationalistic hatred.'
      },
      {
        name: 'Hana',
        role: 'Sadao’s wife.',
        traits: ['Supportive', 'Resilient', 'Gentle', 'Ethically Committed'],
        psychologicalDilemma: 'Confronting her intense visceral nausea to assist during surgery and clean the bleeding enemy prisoner after servants desert them.',
        keyQuotes: ['"She washed the white man herself when Yumi refused to touch him."'],
        cbseSignificance: 'Represents quiet compassion and domestic fortitude in the face of prejudice.'
      }
    ],
    examinerHotspots: [
      'The moral conflict between patriotism and medical oath.',
      'The General’s self-absorption and why he forgot to dispatch assassins.',
      'The servants’ perspective: why they viewed Sadao’s compassion as treacherous.'
    ],
    frequentBoardQuestions: [
      {
        question: 'Why did the General not take action against Dr. Sadao for sheltering an enemy soldier?',
        marks: 2,
        keyPoints: [
          'The General was in frail health and depended entirely on Dr. Sadao’s surgical skill for his own survival.',
          'Arresting Sadao would risk the General’s own life if an emergency surgery were required.',
          'The General confessed he forgot his promise to send assassins due to his intense personal illness.'
        ]
      },
      {
        question: '"Humanity rises above patriotic prejudices in times of war." Discuss with reference to Pearl S. Buck’s "The Enemy".',
        marks: 5,
        keyPoints: [
          'Acknowledge context: Wartime hostility between Japan and America where aiding an enemy carried death penalty for treason.',
          'Sadao’s dual identity: As a Japanese subject he hated Americans, but as a physician he was sworn to preserve life.',
          'Surgery performed under immense risk: Servants mutinied, Hana suffered physical distress.',
          'General’s failed assassination plot resolved by Sadao through non-violent rescue: equipping the prisoner with escape supplies.',
          'Conclusion: Blood and suffering are universal; humanitarian ethics supersede political warfare.'
        ]
      }
    ]
  }
];

export const cbseWritingFormats: WritingFormatRubric[] = [
  {
    id: 'write-notice',
    title: 'Notice Writing',
    wordLimit: '50 words',
    marks: 4,
    markingBreakdown: [
      { category: 'Format', marks: 1, criteria: 'Name of Issuing Authority/School/Organization, the word "NOTICE" in bold capital letters, Date of issuance, Eye-catching Heading/Title, and Signatory details (Name & Designation) enclosed in a neat rectangular box.' },
      { category: 'Content', marks: 2, criteria: 'Target audience, Purpose of notice, Essential event details: Date, Time, Venue, Agenda/Topic, and Instructions on whom to contact for further clarification.' },
      { category: 'Expression', marks: 1, criteria: 'Grammatical accuracy, formal tone, conciseness, and adherence to the 50-word boundary.' }
    ],
    mandatoryFormatElements: [
      'Square/Rectangular bounding box drawn with ruler',
      'Name of School / Organization centered at top',
      'Word "NOTICE" written in bold uppercase',
      'Date of issue left-aligned (Format: 14 October 2026)',
      'Centered Catchy Title / Subject line',
      'Body addressing 5 Ws: What, When, Where, Who, Whom to contact',
      'Bottom-left: Signature, Name in brackets, Designation'
    ],
    officialTemplate: `+--------------------------------------------------------------------------+
|                       [NAME OF ISSUING AUTHORITY/ORGANISATION]           |
|                                       NOTICE                             |
|                                                                          |
| Date: [DD Month YYYY]                                                    |
|                                                                          |
|                                 [CATCHY TITLE]                           |
|                                                                          |
| All students/members are hereby informed that [Name of Event] is being   |
| organized on [Day, Date] from [Start Time] to [End Time] at [Venue].     |
| [Eligibility/Instructions/Purpose]. Interested candidates must register  |
| their names with the undersigned latest by [Deadline Date].              |
|                                                                          |
| [Signature]                                                              |
| [FULL NAME]                                                              |
| [Designation/Post]                                                       |
+--------------------------------------------------------------------------+`,
    modelAnswer: {
      question: 'You are Aarav/Ananya, Secretary of the Cultural Club, St. Xavier’s School, New Delhi. Draft a notice in not more than 50 words informing students of Classes XI and XII about an upcoming Inter-School Debate Competition.',
      content: `ST. XAVIER'S SENIOR SECONDARY SCHOOL, NEW DELHI
NOTICE

15 November 2026

INTER-SCHOOL DEBATE COMPETITION

All students of Classes XI and XII are hereby informed that the Cultural Club is organizing the Annual Inter-School Debate Competition on 28 November 2026 from 9:30 AM to 1:00 PM in the School Auditorium. 

The topic for the debate is: "Artificial Intelligence: Catalyst for Human Potential or Threat to Creativity?". 

Interested students may submit their names to the undersigned latest by 21 November 2026 for preliminary auditions.

Ananya Sharma
Secretary, Cultural Club`,
      wordCount: 48,
      examinerNotes: [
        'Enclosed in a clear rectangular box.',
        'Mentions all essential parameters: Date, Time, Venue, Topic, and Registration Deadline.',
        'Total body word count strictly 48 words (within 50-word cap).',
        'Impeccable formal passive tone without personal pronouns.'
      ]
    },
    commonMistakesToAvoid: [
      'Forgetting to draw the enclosing box (costs 0.5-1 mark).',
      'Writing date in numeric slash format (15/11/26) instead of standard formal format (15 November 2026).',
      'Exceeding 50 words by including unnecessary background narrative.',
      'Missing the designation of the issuing authority.'
    ]
  },
  {
    id: 'write-job-app',
    title: 'Job Application with Bio-Data / Curriculum Vitae',
    wordLimit: '120-150 words',
    marks: 5,
    markingBreakdown: [
      { category: 'Format', marks: 1, criteria: 'Sender’s address, Date, Receiver’s designation & address, Subject line, Salutation, Covering letter, Complimentary close, Enclosures, followed by structured Bio-Data with personal data, qualifications table, experience, and references.' },
      { category: 'Content', marks: 2, criteria: 'Reference to newspaper advertisement, post applied for, suitability statement, summary of qualifications/experience, and formal request for interview.' },
      { category: 'Organisation', marks: 1, criteria: 'Coherent paragraph transitions and systematic tabular presentation of academic credentials.' },
      { category: 'Accuracy', marks: 1, criteria: 'Appropriate professional register, error-free syntax, spelling, and punctuation.' }
    ],
    mandatoryFormatElements: [
      'Sender’s Address (without name)',
      'Date (Formal text format)',
      'Receiver’s Address (with Designation: The Principal / The HR Manager)',
      'Subject: Application for the post of [Job Title]',
      'Salutation: Sir / Madam',
      '3-Part Covering Letter: (1) Reference to advertisement & post, (2) Competencies & suitability, (3) Interview request & enclosure note',
      'Complimentary Close: Yours faithfully / Yours sincerely',
      'Enclosure note: Encl: Bio-Data and Testimonials',
      'Bio-Data Headings: Name, Father’s Name, DOB, Contact, Academic Qualifications Table (Exam, Board/University, Year, Percentage), Experience, Skills, References (2 people with contacts), Declaration with Date & Signature'
    ],
    officialTemplate: `[Sender's Address Line 1]
[Sender's Address Line 2]

[Date: DD Month YYYY]

The HR Manager / Principal
[Company / Institute Name]
[Address Line 1]
[City, Pincode]

Subject: Application for the post of [Position Title]

Sir / Madam,

In response to your advertisement published in [Name of Daily Newspaper], dated [Date of Ad], inviting applications for the post of [Position Title] in your esteemed organization, I wish to offer my candidature for the same.

I possess the requisite academic qualifications and professional experience demanded by the role. My strong analytical acumen, team-player approach, and dedication to excellence enable me to make meaningful contributions to your institutional goals. 

My detailed curriculum vitae, alongside attested copies of testimonials, is enclosed herewith for your kind perusal. I look forward to the opportunity of a personal interview.

Yours faithfully,
[Full Name]

Encl.: 1. Bio-Data
       2. Attested copies of certificates

-------------------------------- BIO-DATA --------------------------------
1. Full Name            : [Candidate Name]
2. Father's Name        : [Father's Name]
3. Date of Birth        : [DD/MM/YYYY]
4. Gender / Nationality : [Gender] / Indian
5. Contact Address      : [Permanent Address]
6. Mobile / Email       : [Phone] | [Email]
7. Educational Qualifications:
   +------+------------------+--------------------+------+------------+
   | S.No | Examination      | School / College   | Year | Percentage |
   +------+------------------+--------------------+------+------------+
   | 1.   | Class X (AISSE)  | CBSE, New Delhi    | 2018 | 94.2%      |
   | 2.   | Class XII (AISSCE)| CBSE, New Delhi   | 2020 | 95.8%      |
   | 3.   | B.A. / B.Sc.     | Delhi University   | 2023 | 88.0%      |
   | 4.   | B.Ed. / M.Sc.    | Delhi University   | 2025 | 89.5%      |
   +------+------------------+--------------------+------+------------+
8. Work Experience      : 2 years as [Role] at [Institution] (2025-present).
9. Key Skills           : Fluent verbal communication, Curriculum Design, MS Office.
10. Languages Known     : English, Hindi.
11. References          : 1. Dr. R.K. Mehta, HOD, Delhi University (Ph: 9811XXXXXX)
                          2. Mrs. S. Sen, Principal, Modern School (Ph: 9822XXXXXX)
Declaration: I hereby declare that all particulars stated above are authentic.
Date: [DD/MM/YYYY]
Place: [City]                                               Signature: [Name]`,
    modelAnswer: {
      question: 'You are Rohit/Radhika from 24, Mall Road, Shimla. You saw an advertisement in The Tribune for the post of Post Graduate Teacher (PGT) English in DAV Public School, Shimla. Write a job application with complete bio-data in 120-150 words.',
      content: `24, Mall Road
Shimla - 171001

10 November 2026

The Principal
DAV Public School
Circular Road, Shimla - 171002

Subject: Application for the post of PGT English

Sir,

In response to your advertisement in The Tribune dated 5 November 2026 inviting applications for the post of PGT English, I wish to submit my candidature for the same.

I hold a Master’s degree in English Literature from Panjab University, Chandigarh, alongside a Bachelor of Education (B.Ed.). Over the past three years, I have served as a Senior English faculty member at Army Public School, nurturing creative expression and securing commendable board results. I am passionate about dynamic pedagogy, theatre, and linguistic mastery.

My comprehensive bio-data is enclosed herewith for your consideration. I would welcome the opportunity for an interview.

Yours faithfully,
Radhika Verma

Encl.: Bio-Data and Certificates

BIO-DATA
1. Name: Radhika Verma
2. Father’s Name: Shri K.L. Verma
3. Date of Birth: 14 August 1999
4. Marital Status: Single
5. Address: 24, Mall Road, Shimla
6. Qualifications:
   - Class XII (CBSE): 95.4% (2017)
   - B.A. (Hons) English, Delhi University: 82% (2020)
   - M.A. English, Panjab University: 78% (2022)
   - B.Ed., Himachal Pradesh University: 86% (2024)
7. Experience: 2 years as PGT English at Army Public School, Dagshai.
8. Skills: Debate Coaching, Creative Writing, Digital Classroom Tools.
9. References:
   - Prof. A.N. Kaul, Panjab University (98160XXXXX)
   - Col. S. Rawat, Director, APS Dagshai (98170XXXXX)
I hereby declare that the details furnished above are true to the best of my knowledge.
Date: 10 November 2026                                    Radhika Verma`,
      wordCount: 146,
      examinerNotes: [
        'Proper separation between covering letter and comprehensive bio-data.',
        'Qualifications clearly relevant to PGT English requirements (M.A. + B.Ed.).',
        'Includes 2 verified professional references and formal closing declaration.'
      ]
    },
    commonMistakesToAvoid: [
      'Merging the covering letter and bio-data into a single narrative paragraph.',
      'Omitting the qualifications table or omitting mandatory B.Ed. for teaching posts.',
      'Missing the "Encl." line after the covering letter signature.',
      'Writing unrealistic qualifications (e.g., claiming 10 years experience at age 22).'
    ]
  },
  {
    id: 'write-letter-editor',
    title: 'Letter to the Editor',
    wordLimit: '120-150 words',
    marks: 5,
    markingBreakdown: [
      { category: 'Format', marks: 1, criteria: 'Sender’s address, Date, The Editor with newspaper name and city, Subject line, Salutation, 3-paragraph body, Sign-off with Name.' },
      { category: 'Content', marks: 2, criteria: 'Introduction mentioning the medium ("Through the columns of your esteemed newspaper..."), analytical breakdown of causes/effects of the social/civic issue, and actionable remediation proposals.' },
      { category: 'Organisation', marks: 1, criteria: 'Logical progression from issue awareness to systemic intervention and public appeal.' },
      { category: 'Accuracy', marks: 1, criteria: 'Grammar, vocabulary, and formal persuasive register.' }
    ],
    mandatoryFormatElements: [
      'Sender’s Address (at top left, 2-3 lines)',
      'Date in full format',
      'The Editor, [Newspaper Name], [City]',
      'Subject: Underlined or highlighted concise phrase',
      'Salutation: Sir / Madam',
      'Paragraph 1: State the problem and draw public/official attention',
      'Paragraph 2: Detailed analysis of ramifications and grievances',
      'Paragraph 3: Constructive recommendations and call to action (NOT asking editor to fix it personally)',
      'Subscription: Yours truly / Yours sincerely, followed by Name'
    ],
    officialTemplate: `[Sender's Address]

[Date]

The Editor
[The Times of India / The Indian Express / The Hindu]
[City]

Subject: [Concise description of the civic / social problem]

Sir / Madam,

Through the columns of your esteemed daily, I wish to draw the urgent attention of the concerned authorities and the general public toward [Topic / Issue].

[Elaborate on the background and severity of the problem. Mention how citizens are impacted, health hazards, educational disruptions, or infrastructure breakdown caused by this negligence.]

[Highlight systemic root causes: lack of administrative monitoring, public indifference, or inadequate municipal infrastructure.]

To alleviate this crisis, it is imperative that [State 2-3 concrete, realistic policy or community solutions]. Prompt and stringent enforcement by municipal bodies, alongside widespread civic awareness campaigns, is vital.

I hope this issue finds an appropriate space in your revered columns to awaken the conscience of the authorities before the situation deteriorates further.

Yours truly,
[Your Name]`,
    modelAnswer: {
      question: 'You are Aman/Anita of 15, Green Park, New Delhi. Write a letter to the Editor of The Hindu highlighting the escalating menace of e-waste and the absence of organized disposal channels in residential colonies in 120-150 words.',
      content: `15, Green Park
New Delhi - 110016

12 October 2026

The Editor
The Hindu
KG Marg, New Delhi - 110001

Subject: Urgent need for safe and organized e-waste disposal mechanisms

Sir,

Through the columns of your esteemed newspaper, I wish to voice deep concern regarding the alarming accumulation of electronic waste (e-waste) in urban households and the lack of organized recycling infrastructure.

With rapid technological obsolescence, households discard tons of outdated smartphones, batteries, and appliances. In the absence of institutional collection drives, these hazardous devices end up in ordinary garbage dumps or the hands of unorganized scrap dealers. Injudicious dismantling and burning release carcinogenic heavy metals like lead, mercury, and cadmium into our groundwater and soil, posing grave public health risks.

The municipal authorities must establish dedicated e-waste drop-off kiosks in every residential ward. Furthermore, electronics manufacturers must enforce buy-back incentives under Extended Producer Responsibility (EPR) regulations. Citizen sensitization programs on hazardous waste segregation are equally urgent.

I hope this appeal galvanizes civic authorities into formulating proactive measures.

Yours truly,
Anita`,
      wordCount: 148,
      examinerNotes: [
        'Addresses the editor correctly without asking the editor to solve the civic issue.',
        'Uses authentic environmental terminology: "technological obsolescence", "carcinogenic heavy metals", "Extended Producer Responsibility (EPR)".',
        'Provides pragmatic, structural recommendations.'
      ]
    },
    commonMistakesToAvoid: [
      'Writing "I request you to please repair the road" (The editor publishes opinions; the editor does not repair municipal roads).',
      'Using informal language or colloquial slang.',
      'Omitting the opening formulaic reference to the newspaper’s columns.'
    ]
  }
];
