import { createSource, ENGLISH_SYLLABUS_URL, buildActivitiesForTopic } from './curriculum-builder.js';
const englishSource = (section, page = 10, isVerified = true) => createSource('English Core', '301', ENGLISH_SYLLABUS_URL, page, section, isVerified);
export const englishTopicDefinitions = [
    // Section A: Reading Skills (english-1-1)
    {
        id: 'english-301-xii-2026-27-secA-topic01',
        chapterId: 'english-1-1',
        subjectId: 'english',
        title: 'Discursive and factual reading passages',
        officialScope: 'Section A: Reading Skills - One unseen discursive passage and one unseen case-based factual passage with verbal/visual inputs. Questions test comprehension, interpretation, analysis, inference, and vocabulary.',
        source: englishSource('Section A: Reading Skills', 10, true),
        objective: 'Skim and scan unseen passages, infer vocabulary from context, and answer analytical MCQs and short answers.',
        minutes: 35,
        learnSteps: [
            'Read strategy for discursive passages: read questions first to identify keywords before reading text.',
            'Analyze tone, mood, perspective, and rhetorical techniques used by author.',
            'Practice case-based factual passage analysis: interpret statistical charts, bar graphs, and survey summaries accurately.',
            'Infer meanings of unfamiliar vocabulary words by examining preceding and succeeding sentence context clues.'
        ],
        practiceSteps: [
            'Attempt one full 12-mark CBSE discursive reading comprehension passage under a strict 20-minute timer.',
            'Attempt one full 10-mark case-based factual passage with visual graph inputs under 15 minutes.',
            'Check answers against official CBSE scoring rubrics for point-to-point accuracy.'
        ]
    },
    // Section B: Creative Writing Skills (english-2-1 to 2-4)
    {
        id: 'english-301-xii-2026-27-secB-topic01',
        chapterId: 'english-2-1',
        subjectId: 'english',
        title: 'Notice writing format and rubrics',
        officialScope: 'Notice Writing (50 words) - Format, Content, Expression. Clear announcement of events, meetings, lost/found, tours, and competitions.',
        source: englishSource('Section B: Creative Writing Skills, Notice Writing', 10, true),
        objective: 'Draft concise 50-word notices inside a neat box following official CBSE format (organization, date, heading, body, signature).',
        minutes: 25,
        learnSteps: [
            'Review official 4-mark CBSE Notice rubric: Format (1 mark: Box, Issuing Authority in capitals, word NOTICE, Date, Heading, Name & Designation), Content (2 marks: What, When, Where, Who, Whom to contact), Expression (1 mark: grammatical accuracy and spelling).',
            'Ensure strict adherence to 50-word limit; keep language formal, passive, and objective (avoid 1st person "I" / "we").',
            'Study model notices for annual sports day, blood donation camp, debate competition, and lost wrist watch.'
        ],
        practiceSteps: [
            'Draft a notice as Cultural Secretary inviting participants for Inter-School Classical Music Competition.',
            'Enclose in a rectangular box and count words strictly.',
            'Self-check against the 4-mark rubric checklist.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-secB-topic02',
        chapterId: 'english-2-2',
        subjectId: 'english',
        title: 'Invitations and replies (Formal and Informal)',
        officialScope: 'Formal and Informal Invitations and Replies (50 words) - Card format, letter format, formal acceptance, informal refusal with specific reasons.',
        source: englishSource('Section B: Creative Writing Skills, Invitations', 10, true),
        objective: 'Draft formal printed invitation cards, formal letters, and concise acceptance/refusal replies.',
        minutes: 30,
        learnSteps: [
            'Review Formal Invitation Card format: 3rd person narration ("request the pleasure of your company"), central alignment, no signature, RSVP at bottom-left.',
            'Review Formal Letter invitation format for inviting Chief Guests, judges, or resource persons.',
            'Review Formal Replies (written in 3rd person, thanking host, state pleasure in accepting or regret with genuine inability reason).',
            'Review Informal Invitations and Replies (written in 1st/2nd person letter format with warm, cordial tone).'
        ],
        practiceSteps: [
            'Design a formal wedding invitation card and an informal letter inviting a childhood friend.',
            'Draft formal replies accepting and politely declining an invitation to judge a debate.',
            'Check against CBSE 4-mark criteria.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-secB-topic03',
        chapterId: 'english-2-3',
        subjectId: 'english',
        title: 'Letters: Application for a job and Letter to the Editor',
        officialScope: 'Letters based on verbal/visual input (120–150 words) - Application for a job with bio-data/resume, and Letter to the Editor regarding public issues.',
        source: englishSource('Section B: Creative Writing Skills, Letters', 10, true),
        objective: 'Draft formal 5-mark letters with sender address, date, receiver designation, subject, body paragraphs, and structured bio-data.',
        minutes: 35,
        learnSteps: [
            'Review official 5-mark CBSE Letter rubric: Format (1 mark), Content (2 marks), Expression (2 marks: grammatical accuracy, coherence).',
            'Application for Job structure: Cover letter referencing advertisement + separate comprehensive Bio-data / Resume (Personal details, Educational qualifications table, Experience, Skills, References).',
            'Letter to Editor structure: Paragraph 1 (cite column of newspaper and state concern), Paragraph 2 (detailed causes, impacts, social fallout), Paragraph 3 (remedial suggestions and appeal to authorities).'
        ],
        practiceSteps: [
            'Draft a complete application with Resume for post of PGT Chemistry in response to newspaper ad.',
            'Draft Letter to Editor of national daily highlighting hazardous reckless e-rickshaw driving and lack of regulation.',
            'Verify 120–150 word count constraint.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-secB-topic04',
        chapterId: 'english-2-4',
        subjectId: 'english',
        title: 'Articles and reports writing',
        officialScope: 'Article and Report Writing (120–150 words) - Descriptive and analytical reporting on school and community events, and well-argued articles on social/educational themes.',
        source: englishSource('Section B: Creative Writing Skills, Articles & Reports', 10, true),
        objective: 'Write engaging 120–150 word articles with compelling titles and factual reports with byline, date, and eyewitness quotes.',
        minutes: 35,
        learnSteps: [
            'Article writing layout: Catchy Title, Byline, Introductory paragraph stating topic relevance, 2 body paragraphs analyzing causes/effects, Concluding paragraph offering progressive solutions.',
            'Report writing layout: Headline, Byline, Place & Date line, Lead paragraph answering 5 Ws (What, When, Where, Why, Who), chronological details of events/speeches, concluding feedback/reaction.',
            'Ensure objective, past tense narration for reports; persuasive, cohesive discourse markers for articles.'
        ],
        practiceSteps: [
            'Write an article for school magazine on "Impact of Artificial Intelligence on Future Employment for Students".',
            'Write a newspaper report on a massive Fire Breakout in a commercial market and rescue operations.',
            'Cross-check paragraph transitions and vocabulary richness.'
        ]
    },
    // Literature: Flamingo Prose (english-3-1 to 3-8)
    {
        id: 'english-301-xii-2026-27-lit-ch01',
        chapterId: 'english-3-1',
        subjectId: 'english',
        title: 'The Last Lesson (Alphonse Daudet)',
        officialScope: 'The Last Lesson by Alphonse Daudet - Themes of linguistic chauvinism, cultural identity, regret of procrastination in learning, M. Hamel’s farewell, and Franz’s emotional awakening.',
        source: englishSource('Flamingo Prose, Chapter 1: The Last Lesson', 11, true),
        objective: 'Analyze themes of linguistic imperialism, M. Hamel’s transformation, and symbolisms (blackboard message Vive La France).',
        minutes: 30,
        learnSteps: [
            'Examine historical context: Franco-Prussian War (1870–71) and Bismarck’s Prussian annexation of Alsace and Lorraine.',
            'Analyze Franz’s shift from fearing M. Hamel’s ruler and skipping school to viewing grammar books as "old friends".',
            'Examine M. Hamel’s dignified character: green coat, frilled shirt, holding mother tongue as key to prison of enslavement.',
            'Explain emotional climax: church clock striking twelve, trumpet of Prussian soldiers, Hamel writing "Vive La France!" in giant letters.'
        ],
        practiceSteps: [
            'Answer 5-mark CBSE question: "When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison." Explain with reference to the text.',
            'Analyze character sketch of M. Hamel as a dedicated yet introspective teacher.',
            'Review 2-mark short answer questions on village elders occupying back benches.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch02',
        chapterId: 'english-3-2',
        subjectId: 'english',
        title: 'Lost Spring: Stories of Stolen Childhood (Anees Jung)',
        officialScope: 'Lost Spring by Anees Jung - Plight of migrant child ragpickers in Seemapuri (Saheb-e-Alam) and glass bangle workers in Firozabad (Mukesh); cycles of poverty, caste, and police nexus.',
        source: englishSource('Flamingo Prose, Chapter 2: Lost Spring', 11, true),
        objective: 'Contrast Saheb’s lost freedom at the tea stall with Mukesh’s daring dream to become a motor mechanic.',
        minutes: 30,
        learnSteps: [
            'Part 1 analysis: Saheb-e-Alam (meaning "Lord of the Universe") scrounging for gold in garbage dumps of Seemapuri; garbage as wonder for children vs survival for elders.',
            'Saheb taking up a job at tea stall: earning Rs 800 and meals, but losing carefree look and independence to steel canister.',
            'Part 2 analysis: Firozabad glass bangle industry, children working in dingy cells near blazing furnaces losing eyesight before adulthood.',
            'Vicious circle: sahukars, middlemen, policemen, bureaucrats, and politicians trapping bangle makers.',
            'Mukesh’s spark of rebellion: insisting on becoming a motor mechanic rather than resigning to lineage.'
        ],
        practiceSteps: [
            'Write analytical response: "The steel canister seemed heavier than the plastic bag he would carry so lightly over his shoulder." Explain.',
            'Compare attitudes of Saheb and Mukesh towards their circumstances.',
            'Discuss how caste stigma and administrative apathy perpetuate child labor.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch03',
        chapterId: 'english-3-3',
        subjectId: 'english',
        title: 'Deep Water (William Douglas)',
        officialScope: 'Deep Water by William Douglas - Psychological fear of water (hydrophobia) originating from California beach and YMCA pool drowning accident; systematic training by instructor to conquer phobia.',
        source: englishSource('Flamingo Prose, Chapter 3: Deep Water', 11, true),
        objective: 'Chart Douglas’s near-death trauma, nine-foot descent panic, and rigorous instructor-led desensitization.',
        minutes: 30,
        learnSteps: [
            'Analyze Douglas’s early childhood trauma at California surf with father and terror at YMCA pool when tossed into 9-foot deep end by a bully.',
            'Examine psychological experience of drowning: stark terror, paralyzed lungs, failing strategy to jump from bottom, curtain of life falling.',
            'Study rehabilitation process: instructor using belt and pulley cable across pool, teaching breathing rhythms (exhale under water, inhale above), kicking legs for months.',
            'Douglas testing himself solo at Lake Wentworth and Warm Lake, laughing at tiny remnants of fear.',
            'Extract central message: "All we have to fear is fear itself" (Roosevelt).'
        ],
        practiceSteps: [
            'Explain how Douglas proved that "The will to live somehow grew in intensity." citing textual evidence.',
            'Detail the methodical steps the instructor employed to build a swimmer piece by piece.',
            'Answer short extract-based questions on the psychological stages of terror.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch04',
        chapterId: 'english-3-4',
        subjectId: 'english',
        title: 'The Rattrap (Selma Lagerlöf)',
        officialScope: 'The Rattrap by Selma Lagerlöf - Metaphor of the world as a giant rattrap with bait of riches and food; vagabond peddler, old crofter’s betrayal, ironmaster’s mistaken identity, and Edla’s transformative compassion.',
        source: englishSource('Flamingo Prose, Chapter 4: The Rattrap', 11, true),
        objective: 'Trace the peddler’s moral journey from stealing 30 kronor to signing his redemption letter as Captain von Stahle.',
        minutes: 30,
        learnSteps: [
            'Understand the philosophical metaphor: the whole world is nothing but a giant rattrap setting bait (cheese and pork / riches and shelter) to trap humans.',
            'Crofter episode: generous host serving porridge and tobacco, betrayed by peddler stealing 30 kronor notes.',
            'Ramsjö ironworks episode: ironmaster mistaking peddler for old comrade Captain Nils Olof von Stahle; peddler’s fear of being exposed at manor house.',
            'Edla Willmansson’s role: perceptive empathy, understanding his frightened eyes, insisting on Christmas cheer, treating him with genuine dignity.',
            'Peddler’s redemption: leaving behind the 30 kronor for crofter, a small rattrap gift, and signing letter as Captain von Stahle because her nobility elevated him.'
        ],
        practiceSteps: [
            'Discuss how unconditional human kindness and trust can redeem a cynical soul.',
            'Contrast ironmaster’s superficial hospitality with Edla’s genuine empathy.',
            'Analyze the peddler’s inner monologue while lost in the cold dense forest.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch05',
        chapterId: 'english-3-5',
        subjectId: 'english',
        title: 'Indigo (Louis Fischer)',
        officialScope: 'Indigo by Louis Fischer - Champaran satyagraha (1917), Rajkumar Shukla’s persistence, plight of sharecroppers under 15% tinkathia contract, Gandhi’s non-violent civil disobedience, social reform.',
        source: englishSource('Flamingo Prose, Chapter 5: Indigo', 11, true),
        objective: 'Detail the Champaran satyagraha, legal battle for sharecroppers, and Gandhi’s lessons in self-reliance.',
        minutes: 35,
        learnSteps: [
            'Context: British planters forcing peasants into tinkathia system (planting 15% holding with indigo and surrendering entire harvest as rent); German synthetic indigo collapsing market prices.',
            'Rajkumar Shukla’s resolute pursuit of Gandhi from Lucknow Congress to Kanpur, Ahmedabad, Calcutta, and Patna.',
            'Gandhi in Champaran: defying expulsion order, spontaneous gathering of thousands of peasants outside Motihari court baffling British magistrates.',
            'Legal triumph: official commission recommending 25% refund; Gandhi accepting 25% to break prestige of British planters.',
            'Social work: opening primary schools, sanitation drives, Kasturba teaching hygiene, doctor volunteers treating ailments; Gandhi refusing Charles Freer Andrews’ help to teach self-reliance.'
        ],
        practiceSteps: [
            'Why did Gandhi agree to a planter refund of only 25 percent instead of full amount?',
            'How was the Champaran movement a turning point in Indian national freedom struggle?',
            'Explain Gandhi’s concept of self-reliance as demonstrated through the C.F. Andrews episode.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch06',
        chapterId: 'english-3-6',
        subjectId: 'english',
        title: 'Poets and Pancakes (Asokamitran)',
        officialScope: 'Poets and Pancakes by Asokamitran - Gemini Studios in Chennai, Pancake makeup brand, hierarchy in makeup department, Kothamangalam Subbu (No. 2), the cynical office boy, the legal advisor, visits of Frank Buchman’s MRA and Stephen Spender.',
        source: englishSource('Flamingo Prose, Chapter 6: Poets and Pancakes', 11, true),
        objective: 'Appreciate witty satire, studio politics, Subbu’s versatile genius, and Spender’s puzzling visit.',
        minutes: 30,
        learnSteps: [
            'Gemini Studios makeup department: trucks of Pancake brand makeup transforming actors into monsters under incandescent lights.',
            'Makeup hierarchy: chief makeup man (hero/heroine), senior assistant (second hero), junior assistant (comedian), office boy (crowd).',
            'Character of Kothamangalam Subbu: cheerful, loyal, sycophantic, creative problem solver offering 14 film alternatives instantly, author of novel Thillana Mohanambal.',
            'The Legal Advisor (Story Department lawyer): neutral, cynical, destroying career of a talented actress by recording her temper tantrum.',
            'Visits of Moral Re-Armament (MRA) army with plays Jotham Valley and The Forgotten Factor, and puzzling British poet Stephen Spender’s speech on English poetry.'
        ],
        practiceSteps: [
            'Contrast Subbu’s resourceful adaptability with the frustrated office boy’s jealousy.',
            'Explain why Stephen Spender’s visit to Gemini Studios remained an unsolved mystery for years.',
            'Analyze author’s gentle humor and satirical tone throughout the narrative.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch07',
        chapterId: 'english-3-7',
        subjectId: 'english',
        title: 'The Interview (Christopher Silvester)',
        officialScope: 'The Interview by Christopher Silvester - History, virtues, and criticism of interviews as an invasion of privacy (V.S. Naipaul, Lewis Carroll, H.G. Wells, Rudyard Kipling); Part II: Interview with Umberto Eco on semiotics, interstitial moments, and The Name of the Rose.',
        source: englishSource('Flamingo Prose, Chapter 7: The Interview', 11, true),
        objective: 'Contrast celebrated writers’ aversion to interviews with Umberto Eco’s relaxed theory of interstitial working time.',
        minutes: 30,
        learnSteps: [
            'Part I: Duality of interview genre: supremely serviceable medium of communication vs "unwarranted intrusion" stealing soul (primitive belief / Naipaul / Kipling / Carroll).',
            'Part II: Umberto Eco interview with Mukund Padmanabhan.',
            'Eco’s academic identity: semiotician, university professor who writes novels only on Sundays.',
            'Theory of Interstices: utilizing empty spaces/gaps in time (waiting for elevator) to write essays and thoughts.',
            'Enormous runaway success of The Name of the Rose (selling 10–15 million copies) combining medieval history, theology, metaphysics, and detective plot.'
        ],
        practiceSteps: [
            'What are the conflicting views about the impact and morality of interviews expressed in Part I?',
            'How does Umberto Eco explain his ability to produce such a massive volume of intellectual work?',
            'Why did The Name of the Rose become a global literary phenomenon despite its demanding intellectual content?'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch08',
        chapterId: 'english-3-8',
        subjectId: 'english',
        title: 'Going Places (A. R. Barton)',
        officialScope: 'Going Places by A. R. Barton - Adolescent hero-worship, fantasizing, socio-economic reality of lower-middle-class life: Sophie’s wild delusions of opening boutiques and meeting Irish football prodigy Danny Casey; pragmatic Jansie and silent brother Geoff.',
        source: englishSource('Flamingo Prose, Chapter 8: Going Places', 11, true),
        objective: 'Examine adolescent escapism, romantic daydreaming, and harsh socio-economic constraints in Sophie’s story.',
        minutes: 30,
        learnSteps: [
            'Sophie’s daydreams of becoming boutique manager, actress, or fashion designer, contrasted with classmate Jansie’s realistic reminder that they are earmarked for biscuit factory.',
            'Sophie’s working-class household: father watching television in dirty vest, mother bent over sink, cluttered steamy room.',
            'Brother Geoff: apprentice mechanic, quiet, secretive world Sophie longs to be part of.',
            'Fabricated encounter with Irish footballer Danny Casey outside Royce’s arcade, convincing herself to wait at canal bench where heartbreak dawns.',
            'Psychological study of unfulfilled youth seeking glamor to escape grim domestic monotony.'
        ],
        practiceSteps: [
            'Contrast Sophie’s personality and aspirations with those of Jansie.',
            'Why did Sophie choose Geoff to confide her fantasy about Danny Casey?',
            'Analyze the concluding scene by the canal: was Sophie a liar or a victim of her own vivid imagination?'
        ]
    },
    // Literature: Flamingo Poetry (english-3-9 to 3-13)
    {
        id: 'english-301-xii-2026-27-lit-ch09',
        chapterId: 'english-3-9',
        subjectId: 'english',
        title: 'My Mother at Sixty-six (Kamala Das)',
        officialScope: 'My Mother at Sixty-six by Kamala Das - Complex subtleties of human relationships, fear of ageing and mortality, contrasting vitality of young sprinting trees and merry children with corpse-like mother, the brave parting smile.',
        source: englishSource('Flamingo Poetry, Poem 1: My Mother at Sixty-six', 12, true),
        objective: 'Analyze imagery of decay vs life, poetic devices (simile, personification), and poignant parting words.',
        minutes: 25,
        learnSteps: [
            'Poet driving to Cochin airport with her sixty-six-year-old mother dozing beside her, face ashen like that of a corpse.',
            'Poetic devices: Simile ("ashen like that of a corpse", "pale as a late winter’s moon").',
            'Contrast of vitality: "young trees sprinting" and "merry children spilling out of their homes" juxtaposed with frail, silent mother.',
            'Airport security check: seeing mother again from yards away, feeling familiar childhood ache of impending loss.',
            'Final brave masking of agony: "see you soon, Amma" accompanied by repeated smile ("all I did was smile and smile and smile...").'
        ],
        practiceSteps: [
            'What poetic effect is achieved by comparing the mother to a "late winter’s moon"?',
            'Explain the significance of the image of "trees sprinting" and "merry children spilling".',
            'Analyze the emotional undertone of the poet’s parting smile.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch10',
        chapterId: 'english-3-10',
        subjectId: 'english',
        title: 'Keeping Quiet (Pablo Neruda)',
        officialScope: 'Keeping Quiet by Pablo Neruda - Quiet introspection, counting up to twelve, suspension of destructive human activities (fishermen harming whales, war mongers), distinguishing quiet stillness from total inactivity or death, learning from Earth.',
        source: englishSource('Flamingo Poetry, Poem 2: Keeping Quiet', 12, true),
        objective: 'Explore Neruda’s call for universal fraternity, stillness vs death, and the metaphor of Earth’s silent regeneration.',
        minutes: 25,
        learnSteps: [
            'Call to pause: counting to twelve (representing hours of clock or months of year) and keeping still in all languages.',
            'Exotic moment without rush, without engines, creating sudden strangeness and mutual harmony.',
            'Call to cease violence: fishermen not harming whales in cold sea, salt gatherer looking at hurt hands, war mongers (green wars, gas wars, fire wars) putting on clean clothes to walk with brothers.',
            'Crucial distinction: "total inactivity" is death; the poet wants life, not death or funeral trucks.',
            'Metaphor of the Earth: in winter everything seems dead, yet later proves to be alive, illustrating productive renewal through quietude.'
        ],
        practiceSteps: [
            'How does the poet differentiate quiet contemplation from complete inactivity or death?',
            'What is the "sadness" that the poet refers to in the poem?',
            'Explain how the Earth can teach us a lesson in quiet renewal.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch11',
        chapterId: 'english-3-11',
        subjectId: 'english',
        title: 'A Thing of Beauty (John Keats)',
        officialScope: 'A Thing of Beauty (from Endymion) by John Keats - Beauty as perennial source of joy, lifting dark pall from gloomy human spirits; specific beautiful objects in nature (sun, moon, daffodils, clear rills) and art (grandeur of dooms of the mighty dead, endless fountain of immortal drink).',
        source: englishSource('Flamingo Poetry, Poem 3: A Thing of Beauty', 12, true),
        objective: 'Interpret Keatsian romanticism, imagery of nature, and beauty as an endless fountain of immortal drink.',
        minutes: 30,
        learnSteps: [
            'Opening affirmation: "A thing of beauty is a joy forever; its loveliness increases; it will never pass into nothingness."',
            'Beauty creates a quiet bower, restful sleep full of sweet dreams, health, and quiet breathing.',
            'Human condition: despondence, inhuman dearth of noble natures, gloomy days, unwholesome ways casting dark pall over spirit.',
            'Catalogue of beauties: sun, moon, old and young trees offering bower for simple sheep, daffodils in green world, clear rills making cooling covert, musk-rose blooms in forest brake.',
            'Beauty in literature and history: grandeur of dooms imagined for the mighty dead, immortal tales poured into us like heavenly nectar.'
        ],
        practiceSteps: [
            'List the things of beauty mentioned by Keats that remove the pall of gloom from human hearts.',
            'Explain: "An endless fountain of immortal drink, pouring unto us from the heaven’s brink."',
            'What makes human beings love life in spite of troubles and suffering?'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch12',
        chapterId: 'english-3-12',
        subjectId: 'english',
        title: 'A Roadside Stand (Robert Frost)',
        officialScope: 'A Roadside Stand by Robert Frost - Economic disparity between rural peasants running roadside stalls and affluent urban motorists zooming past; cynical critique of predatory philanthropists and plea for empathetic relief.',
        source: englishSource('Flamingo Poetry, Poem 4: A Roadside Stand', 12, true),
        objective: 'Critique rural neglect, superficial city indifference, predatory charity, and Frost’s painful empathy.',
        minutes: 30,
        learnSteps: [
            'The setting: little new shed extending outside old house at road edge, pleading pathetically for some city cash to flow into rural hands.',
            'City drivers’ indifference: cars speeding past with mindless focus ahead; if they stop, it is only to complain about roadside signs marring landscape, or to ask directions, turn car, or inquire about gas.',
            'Critique of "greedy good-doers" and "beneficent beasts of prey": calculating politicians promising resettlement in villages near theatres and stores only to lull rural folk into stupor and rob them of ancient habits.',
            'Poet’s sorrow: childish longing in vain, waiting all day by open window for brake squeaks and sound of stopping car.',
            'Poet’s raw concluding struggle between desperate wish to end their pain at one stroke vs sober realization of reality.'
        ],
        practiceSteps: [
            'Why does Frost refer to the roadside stand owners as pleading "pathetically"?',
            'Explain the oxymoron "greedy good-doers, beneficent beasts of prey".',
            'What is the childish longing that the poet says is in vain?'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch13',
        chapterId: 'english-3-13',
        subjectId: 'english',
        title: 'Aunt Jennifer’s Tigers (Adrienne Rich)',
        officialScope: 'Aunt Jennifer’s Tigers by Adrienne Rich - Feminist critique of patriarchal oppression, domestic marital subjugation symbolized by heavy wedding band, and art as timeless defiance where embroidered tigers prance proud and fearless.',
        source: englishSource('Flamingo Poetry, Poem 5: Aunt Jennifer’s Tigers', 12, true),
        objective: 'Analyze symbols of tigers (freedom/chivalry), ivory needle/fluttering fingers, wedding ring weight, and art surviving artist.',
        minutes: 25,
        learnSteps: [
            'Stanza 1: Tigers embroidered on screen prancing across panel: bright topaz denizens of world of green, fearless of men beneath tree, stepping with sleek chivalric certainty.',
            'Stanza 2: Aunt Jennifer’s physical and mental trauma: fluttering fingers finding even lightweight ivory needle hard to pull.',
            'Symbol of the wedding band: "The massive weight of Uncle’s wedding band sits heavily upon Aunt Jennifer’s hand" representing patriarchal subjugation and marital burden.',
            'Stanza 3: Posthumous fate: even when dead, her terrified hands will remain ringed with ordeals she was mastered by.',
            'Ultimate triumph of art: the tigers in the panel she made will go on prancing, proud and unafraid, outliving their oppressed creator.'
        ],
        practiceSteps: [
            'Contrast Aunt Jennifer’s terrified, constrained reality with the fearless tigers she creates.',
            'Explain the symbolic meaning of "Uncle’s wedding band" sitting heavily on her hand.',
            'How does the poem present art as an enduring medium of feminist defiance and liberation?'
        ]
    },
    // Literature: Vistas Supplementary Reader (english-3-14 to 3-19)
    {
        id: 'english-301-xii-2026-27-lit-ch14',
        chapterId: 'english-3-14',
        subjectId: 'english',
        title: 'The Third Level (Jack Finney)',
        officialScope: 'The Third Level by Jack Finney - Psychological escapism, Grand Central Station’s mysterious third level transporting to Galesburg Illinois (1894), Sam Weiner’s psychiatrist diagnosis and subsequent disappearance.',
        source: englishSource('Vistas Supplementary Reader, Chapter 1: The Third Level', 13, true),
        objective: 'Explore psychological refuge from modern wartime insecurity, time travel motif, and Sam’s confirming letter.',
        minutes: 30,
        learnSteps: [
            'Protagonist Charley claiming existence of 3rd level at Grand Central Station (railroad authorities acknowledge only two).',
            'Psychiatrist friend Sam Weiner calling it a "waking-dream wish fulfillment" to escape modern insecurity, fear, war, and worry.',
            'Charley wandering down arched tunnel into Victorian 1894 world: brass spittoons, flickering gas lights, derby hats, pocket watches, Currier & Ives locomotives.',
            'Attempting to buy two train tickets to Galesburg, Illinois for himself and Louisa; clerk suspecting counterfeit currency.',
            'Sam disappearing and turning up in 1894 Galesburg, sending a first-day cover letter to Charley urging him to keep looking for the third level.'
        ],
        practiceSteps: [
            'Is the third level a literal physical realm or a psychological sanctuary? Discuss with textual evidence.',
            'What role does stamp collection (philately) play as a temporary refuge from reality in Charley’s life?',
            'Analyze the twist ending with Sam Weiner’s first-day cover letter.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch15',
        chapterId: 'english-3-15',
        subjectId: 'english',
        title: 'The Tiger King (Kalki)',
        officialScope: 'The Tiger King by Kalki - Satire on royal autocracy, cruelty, arrogance of power, astrologer’s prophecy predicting Maharaja Sir Jilani Jung Jung Bahadur’s death by 100th tiger, dramatic irony of wooden tiger fatality.',
        source: englishSource('Vistas Supplementary Reader, Chapter 2: The Tiger King', 13, true),
        objective: 'Analyze satirical mockery of princely rulers, British colonial sycophancy, and dramatic irony in destiny.',
        minutes: 30,
        learnSteps: [
            'Astrologer prophecy at infant prince’s birth: child will die by a tiger; 10-day-old infant miraculously speaking to question death.',
            'Maharaja hunting 70 tigers in Pratibandapuram; marrying princess of kingdom with highest tiger population to kill 29 more.',
            'British officer episode: Maharaja refusing British officer permission to hunt tiger or take photo with carcass, bribing officer’s wife with 50 diamond rings worth 3 lakh rupees to save throne.',
            'The 100th tiger: brought secretly from People’s Park Madras by Dewan, shot by Maharaja who misses, later killed by hunters to avoid royal fury.',
            'Dramatic irony of death: playing with cheap wooden toy tiger bought for son’s 3rd birthday; wooden sliver piercing right hand causing fatal infection.'
        ],
        practiceSteps: [
            'How does Kalki use satire to expose the utter callousness of powerful autocrats toward wildlife?',
            'Explain how the 100th tiger ultimately took its revenge on the Tiger King.',
            'Discuss the humor and absurdity of the Dewan’s frantic attempts to supply the 100th tiger.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch16',
        chapterId: 'english-3-16',
        subjectId: 'english',
        title: 'Journey to the End of the Earth (Tishani Doshi)',
        officialScope: 'Journey to the End of the Earth by Tishani Doshi - Expedition to Antarctica on Russian vessel Akademik Shokalskiy under Geoff Green’s "Students on Ice" programme; geological history of Gondwana supercontinent, climate change warning, microscopic phytoplankton.',
        source: englishSource('Vistas Supplementary Reader, Chapter 3: Journey to the End of the Earth', 13, true),
        objective: 'Examine geological history of Gondwana, Antarctica as climate benchmark, and microscopic ecological balance.',
        minutes: 30,
        learnSteps: [
            'Author traveling across 9 time zones, 6 checkpoints, and 3 bodies of water to reach frozen white expanse of Antarctica.',
            'Geological history: 650 million years ago, giant southern supercontinent Gondwana centered roughly around present-day Antarctica before drifting into modern continents.',
            'Antarctica holds 90% of Earth’s total ice volume, zero human trees/billboards, simple ecosystem making it the ultimate laboratory to study past, present, and future of planet.',
            'Geoff Green’s "Students on Ice" rationale: giving high school students life-changing polar experiences so future policymakers respect environmental stewardship.',
            'Microscopic phytoplankton: single-celled grass of southern ocean nourishing marine food chain, threatened by ozone depletion.'
        ],
        practiceSteps: [
            'Why is Antarctica considered the most crucial place to study the past, present, and future of Earth?',
            'What was the rationale behind taking high school students to Antarctica in the Students on Ice programme?',
            'Explain how tiny single-celled phytoplankton impact the entire global ecological food chain.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch17',
        chapterId: 'english-3-17',
        subjectId: 'english',
        title: 'The Enemy (Pearl S. Buck)',
        officialScope: 'The Enemy by Pearl S. Buck - Moral dilemma during World War II: Dr. Sadao Hoki and Hana sheltering wounded American POW sailor Tom; professional medical ethics vs hyper-nationalist duty; General Takima’s secret deal and Sadao’s final humanitarian aid.',
        source: englishSource('Vistas Supplementary Reader, Chapter 4: The Enemy', 13, true),
        objective: 'Analyze conflict between medical Hippocratic duty and patriotic loyalty, racial prejudice, and humanity.',
        minutes: 35,
        learnSteps: [
            'Setting: Japan during World War II; Dr. Sadao Hoki’s house on Japanese coast, married to Hana strictly in traditional Japanese manner arranged by father.',
            'Wounded American prisoner of war (Tom, US Navy sailor) washed ashore near Sadao’s veranda with gunshot wound near kidney.',
            'Moral conflict: throwing him back into sea vs treating him; servant rebellion (Yumi, gardener, cook abandoning household in protest against sheltering white enemy).',
            'Sadao performing successful bullet extraction operation assisted by trembling Hana.',
            'General Takima’s role: ailing General keeping Sadao close due to needing surgery himself, promising to send private assassins to silently eliminate the American.',
            'Resolution: General forgetting assassins due to illness; Sadao giving Tom food, water, flashlight, and boat to escape to nearby Korean fishing boat island.'
        ],
        practiceSteps: [
            'How did Dr. Sadao rise above narrow geopolitical prejudices to uphold his sacred medical calling?',
            'Contrast the servants’ reaction to the American prisoner with Sadao and Hana’s ethical stance.',
            'Explain why the General did not arrest Sadao for harboring an enemy prisoner of war.'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch18',
        chapterId: 'english-3-18',
        subjectId: 'english',
        title: 'On the Face of It (Susan Hill)',
        officialScope: 'On the Face of It by Susan Hill - Deep psychological alienation of young Derry (acid-burned face) and old Mr. Lamb (tin leg); contrasting cynical bitterness with philosophical optimism, friendship in an open crab-apple garden.',
        source: englishSource('Vistas Supplementary Reader, Chapter 5: On the Face of It', 13, true),
        objective: 'Contrast Derry’s defensive hostility with Mr. Lamb’s welcoming optimism, overcoming self-pity and alienation.',
        minutes: 30,
        learnSteps: [
            'Setting: Mr. Lamb’s garden with open gates and uncurtained windows, crab apples, bees buzzing in hives.',
            'Derry’s psychological defense mechanism: sneaking over garden wall, terrified of people staring at his acid-burned cheek, believing everyone considers him ugly and repulsive.',
            'Mr. Lamb’s physical handicap (tin leg lost in war, children calling him "Lamey-Lamb") and radical philosophy: weeds are flowers too; beauty is in eye of beholder; isolation destroys.',
            'Story of the man who locked himself in a room out of fear of getting run over or struck by lightning, only to be killed by a picture falling off the wall.',
            'Transformation of Derry: returning to Lamb’s garden against mother’s objections, only to find Lamb fallen from ladder, dead in the grass, yet leaving Derry forever transformed.'
        ],
        practiceSteps: [
            'How does Mr. Lamb’s perspective on weeds, bees, and open windows challenge Derry’s bitter isolation?',
            'Explain the significance of the title "On the Face of It".',
            'What makes Derry promise to return to Mr. Lamb despite his mother’s warnings?'
        ]
    },
    {
        id: 'english-301-xii-2026-27-lit-ch19',
        chapterId: 'english-3-19',
        subjectId: 'english',
        title: 'Memories of Childhood (Zitkala-Sa & Bama)',
        officialScope: 'Memories of Childhood - Two autobiographical accounts of social discrimination: 1. "The Cutting of My Long Hair" by Zitkala-Sa (Gertrude Simmons Bonnin): cultural stripping and forced assimilation in Native American Carlisle Indian School; 2. "We Too Are Human Beings" by Bama: caste discrimination in Tamil Nadu and elder brother Annan’s advice on dignity through education.',
        source: englishSource('Vistas Supplementary Reader, Chapter 6: Memories of Childhood', 13, true),
        objective: 'Contrast indigenous cultural decimation with Dalit caste untouchability, and evaluate education as liberation.',
        minutes: 35,
        learnSteps: [
            'Account 1 (Zitkala-Sa): First day at Carlisle Indian School: harsh regimentation of bell signals, uncomfortable stiff shoes and tight clothes.',
            'Friend Judewin warning that pale-faced matrons intend to cut her long hair; in Dakota culture, short hair was worn by mourners and shingled hair by captured cowards.',
            'Zitkala-Sa hiding under bed in upstairs room, dragged down, tied to chair, and shrieking as scissors shear her thick braids; feeling like an animal herded by herder.',
            'Account 2 (Bama): Young Dalit schoolgirl in third standard walking home amused by street performers, bazaars, and threshing floors.',
            'Witnessing an elder of her community carrying a small packet of vadai held carefully by string without touching it to hand it to upper-caste landlord.',
            'Innocent laughter turning to rage and indignity when elder brother Annan explains untouchability and caste degradation.',
            'Annan’s inspiring counsel: because they are born into low caste, they are denied honor; study hard, learn with all your might, and people will attach themselves to you; Bama standing first in her class.'
        ],
        practiceSteps: [
            'Compare how Zitkala-Sa and Bama rebelled against systemic oppression in their childhood.',
            'Why did Zitkala-Sa resist the cutting of her hair so fiercely?',
            'How did Annan’s advice transform Bama’s childhood worldview into academic excellence?'
        ]
    }
];
export const englishTopicNodes = englishTopicDefinitions.map(def => ({
    id: def.id,
    subjectId: def.subjectId,
    chapterId: def.chapterId,
    parentId: def.chapterId,
    kind: 'topic',
    title: def.title,
    officialScope: def.officialScope,
    source: def.source
}));
export const englishActivityDefinitions = englishTopicDefinitions.flatMap(def => {
    const node = englishTopicNodes.find(n => n.id === def.id);
    return buildActivitiesForTopic(node, {
        learnSteps: def.learnSteps,
        practiceSteps: def.practiceSteps,
        objective: def.objective,
        minutes: def.minutes
    });
});
