/**
 * CBSE Class XII English Core (301) - Official Question Bank & Step-Marking Rubrics
 * 2026-2027 Examination Blueprint Standard
 * Authentic CBSE questions across Reading, Writing, and Literature sections with strict marking rubrics.
 */
export const cbseEnglishQuestionBank = [
    // SECTION B: Creative Writing Skills (4 marks and 5 marks)
    {
        id: 'eng-q-001',
        chapterId: 'english-2-1',
        subjectId: 'english',
        section: 'B',
        marks: 4,
        questionType: 'Notice',
        wordLimit: '50 words',
        questionText: 'You are Sunita / Sunil, Head Girl / Head Boy of St. Mary’s Senior Secondary School, New Delhi. Your school is organizing an Inter-School Classical Dance Competition. Draft a notice in not more than 50 words inviting students of Classes IX to XII to submit their names for the audition.',
        rubrics: [
            { criterion: 'Format: Box, Name of School/Issuing Authority, Word NOTICE, Date, Catchy Heading, Name & Designation', marks: 1.0 },
            { criterion: 'Content: Target audience (Classes IX-XII), Date, Time, Venue of audition, Last date for registration, Contact person', marks: 2.0 },
            { criterion: 'Expression: Grammatical accuracy, formal tone, adherence to 50-word limit', marks: 1.0 }
        ],
        modelAnswer: `+-------------------------------------------------------------------+
|               ST. MARY'S SENIOR SECONDARY SCHOOL, NEW DELHI       |
|                                                                   |
|                              NOTICE                               |
|                                                                   |
|  21 November 2026                                                 |
|                                                                   |
|               INTER-SCHOOL CLASSICAL DANCE AUDITIONS              |
|                                                                   |
|  All students of Classes IX to XII are hereby informed that an    |
|  audition for the upcoming Inter-School Classical Dance           |
|  Competition will be conducted on 28 November 2026 at 10:00 AM in |
|  the School Auditorium. Forms (Kathak, Bharatanatyam, Odissi).    |
|                                                                   |
|  Interested candidates may submit their names to the undersigned  |
|  latest by 25 November 2026.                                      |
|                                                                   |
|  Sunita                                                           |
|  Head Girl                                                        |
+-------------------------------------------------------------------+`,
        examinerNotes: 'Drawing the box is mandatory (0.5 mark deduction if box is missing). Deduct 1 mark if word limit is exceeded significantly.'
    },
    {
        id: 'eng-q-002',
        chapterId: 'english-2-3',
        subjectId: 'english',
        section: 'B',
        marks: 5,
        questionType: 'Letter',
        wordLimit: '120-150 words',
        questionText: 'You are Ananya / Akash, residing at 42-B, Model Town, Jaipur. You saw an advertisement in The Rajasthan Times for the post of PGT Chemistry at Oxford International School, Jaipur. Write a formal application for the job with a complete curriculum vitae (bio-data).',
        rubrics: [
            { criterion: 'Format: Sender address, Date, Receiver designation & address, Subject, Salutation, Body paragraphs, Complimentary close', marks: 1.0 },
            { criterion: 'Content: Reference to advertisement, suitability statement, attached structured Bio-data with academic table, experience, references', marks: 2.0 },
            { criterion: 'Expression: Grammatical correctness, cohesive vocabulary, professional tone', marks: 2.0 }
        ],
        modelAnswer: `42-B, Model Town
Jaipur - 302017

21 November 2026

The Principal
Oxford International School
C-Scheme, Jaipur - 302001

Subject: Application for the post of PGT Chemistry

Respected Sir/Madam,

In response to your advertisement published in The Rajasthan Times dated 19 November 2026 for the post of PGT Chemistry, I wish to offer my candidature for the same. 

I hold a Master's degree in Chemistry (M.Sc.) with first division from Delhi University and a Bachelor of Education (B.Ed.). Over the past four years, I have been teaching senior secondary students, successfully preparing them for CBSE Board Examinations. I am passionate about experiential laboratory learning and possess excellent communication skills.

My detailed curriculum vitae is enclosed herewith for your kind perusal. I look forward to the opportunity of an interview.

Yours faithfully,
Ananya Sharma

ENCLOSURE: BIO-DATA

BIO-DATA
1. Name: Ananya Sharma
2. Father's Name: Dr. R. K. Sharma
3. Date of Birth: 14 August 1998
4. Address: 42-B, Model Town, Jaipur
5. Contact: 98290XXXXX | ananya.sharma@email.com
6. Educational Qualifications:
   - M.Sc. (Chemistry) | Delhi University | 2021 | 82%
   - B.Ed. | Central Institute of Education, DU | 2022 | 86%
   - B.Sc. (Hons) Chemistry | Hindu College, DU | 2019 | 84%
   - Class XII (CBSE) | St. Xavier's Jaipur | 2016 | 94.2%
7. Experience: 4 years as PGT Chemistry at Cambridge Public School, Jaipur
8. Languages Known: English, Hindi
9. References:
   - Prof. V. K. Malhotra, Dept. of Chemistry, University of Rajasthan
   - Dr. Sunita Mehra, Principal, Cambridge Public School, Jaipur`,
        examinerNotes: 'The bio-data must be formatted clearly with educational qualifications in a table or distinct chronological lines.'
    },
    // SECTION C: Literature (Flamingo & Vistas)
    {
        id: 'eng-q-003',
        chapterId: 'english-3-9',
        subjectId: 'english',
        section: 'C',
        marks: 1,
        questionType: 'Extract-Poem',
        questionText: 'Read the following extract and answer the question:\n\n"I looked again at her, wan, pale\nas a late winter’s moon and felt that old\nfamiliar ache, my childhood’s fear..."\n\nWhat is the poet’s "childhood’s fear"?',
        mcqOptions: [
            { key: 'A', text: 'Fear of darkness and cold weather' },
            { key: 'B', text: 'Fear of missing her flight at Cochin airport' },
            { key: 'C', text: 'Fear of losing her mother and eventual separation by death' },
            { key: 'D', text: 'Fear of getting old herself' }
        ],
        correctOption: 'C',
        rubrics: [
            { criterion: 'Identify the psychological fear of losing the ageing mother to mortality', marks: 1.0 }
        ],
        modelAnswer: 'Option (C): Fear of losing her mother and eventual separation by death. Since early childhood, the poet Kamala Das harbored the deep, agonizing fear of being separated from her mother. Seeing her mother’s frail, corpse-like countenance in the car rekindled this latent dread of impending loss and death.',
        examinerNotes: 'Poetic device in this line is Simile ("as a late winter’s moon").'
    },
    {
        id: 'eng-q-004',
        chapterId: 'english-3-1',
        subjectId: 'english',
        section: 'C',
        marks: 2,
        questionType: 'Short-Answer',
        wordLimit: '40-50 words',
        questionText: 'Why were the elderly village people sitting in the back of the classroom during the last French lesson?',
        rubrics: [
            { criterion: 'Remorse for not having attended school more often in their youth', marks: 1.0 },
            { criterion: 'Expressing gratitude to M. Hamel for 40 years of dedicated service and showing respect for their annexed country', marks: 1.0 }
        ],
        modelAnswer: 'The village elders (Old Hauser, the former mayor, the former postmaster) sat at the back benches because they felt remorseful that they had not gone to school more in their youth. It was also their humble way of thanking M. Hamel for his forty years of faithful service, and of showing patriotic respect for their mother tongue and native land which was no longer theirs.',
        examinerNotes: 'Mentioning both regret for lost learning and respect for M. Hamel/country is essential for full 2 marks.'
    },
    {
        id: 'eng-q-005',
        chapterId: 'english-3-4',
        subjectId: 'english',
        section: 'C',
        marks: 5,
        questionType: 'Long-Answer',
        wordLimit: '120-150 words',
        questionText: '"The essential goodness in a human being can be awakened through understanding and love." Discuss this statement with reference to the story "The Rattrap".',
        rubrics: [
            { criterion: 'Initial cynical worldview: Peddler viewing humanity as trapped by baits of worldly riches, stealing crofter’s 30 kronor', marks: 1.5 },
            { criterion: 'Contrasting behavior: Ironmaster’s superficial hospitality vs Edla’s genuine, compassionate empathy', marks: 1.5 },
            { criterion: 'Redemption climax: Peddler returning money with letter signed as Captain von Stahle, liberated by dignity', marks: 2.0 }
        ],
        modelAnswer: `Selma Lagerlöf’s "The Rattrap" beautifully illustrates that latent human virtue can be revived through unconditional empathy and compassion. 

Initially, the peddler was a bitter, cynical vagrant who viewed the world as a giant rattrap setting baits of food, shelter, and warmth to trap gullible souls. Hardened by poverty and social callousness, he betrayed the trusting old crofter by stealing his hard-earned thirty kronor notes.

When the ironmaster mistakenly identified him as Captain Nils Olof von Stahle, his hospitality was merely rooted in social familiarity; upon discovering the truth, the ironmaster angrily threatened to summon the sheriff. 

In sharp contrast, Edla Willmansson perceived the peddler's profound fear and loneliness. She interceded on his behalf, offering unconditional warmth, respect, and peaceful Christmas cheer without demanding any pretense. Being treated with genuine dignity awakened the gentleman within him. 

Transformed by this selfless love, he left behind the stolen money to be returned to the crofter, along with a small rattrap gift for Edla, signing himself as "Captain von Stahle." Edla’s nobility provided him the moral strength to extricate himself from the world’s rattrap.`,
        examinerNotes: 'Check that student emphasizes Edla’s transformative compassion rather than just retelling the plot.'
    },
    {
        id: 'eng-q-005',
        chapterId: 'english-2-2',
        subjectId: 'english',
        section: 'B',
        marks: 4,
        questionType: 'Invitation',
        wordLimit: '50 words',
        questionText: 'You are the Principal of Bal Bharati Public School, Sector 14, Rohini, New Delhi. Draft a formal printed invitation card for the Annual Sports Day to be held on 18 December 2026. Shri Anurag Thakur, Hon’ble Minister for Youth Affairs and Sports, has consented to be the Chief Guest.',
        rubrics: [
            { criterion: 'Format: Third person formal phrasing, enclosed in a neat single box', marks: 1.0 },
            { criterion: 'Content: Host name, event title, date, time, venue, chief guest details, RSVP, and special instructions', marks: 2.0 },
            { criterion: 'Expression: Formal layout, center alignment, correct spacing and grammar', marks: 1.0 }
        ],
        modelAnswer: `+-------------------------------------------------------------------+
|               The Management, Staff and Students of               |
|               BAL BHARATI PUBLIC SCHOOL, ROHINI                   |
|                                                                   |
|          cordially invite you to the auspicious occasion of       |
|                                                                   |
|                        ANNUAL SPORTS MEET - 2026                  |
|                                                                   |
|                      on Friday, 18 December 2026                  |
|                           at 9:30 AM                              |
|                   in the School Sports Complex                    |
|                                                                   |
|                       SHRI ANURAG THAKUR                          |
|         Hon'ble Minister for Youth Affairs & Sports, Govt. of India|
|            has graciously consented to be the Chief Guest         |
|                     and distribute the prizes.                    |
|                                                                   |
|  R.S.V.P.                                       Special Note:     |
|  Principal                                      Please be seated  |
|  Ph: 011-2751XXXX                               by 9:15 AM. Entry |
|  E-mail: bbpsrohini@school.edu                  by invitation card|
+-------------------------------------------------------------------+`,
        examinerNotes: 'Formal printed card invitations must always be written in third person ("The Principal and Staff invite...") without "I" or "We". Box is compulsory.'
    },
    {
        id: 'eng-q-006',
        chapterId: 'english-3-3',
        subjectId: 'english',
        section: 'C',
        marks: 4,
        questionType: 'Extract-Poem',
        wordLimit: '40 words',
        extractPassage: '"A thing of beauty is a joy forever:\nIts loveliness increases; it will never\nPass into nothingness; but still will keep\nA bower quiet for us, and a sleep\nFull of sweet dreams, and health, and quiet breathing."',
        questionText: '(a) How does a thing of beauty provide everlasting joy according to John Keats? (b) What does the word "bower" signify in this context? (c) Name the poetic device used in the line "A bower quiet for us".',
        rubrics: [
            { criterion: 'Subpart (a): Loveliness multiplies over time, immortalized in human memory, immune to temporal decay', marks: 2.0 },
            { criterion: 'Subpart (b): Bower signifies a peaceful, shady grove of trees offering restful sanctuary from tribulations', marks: 1.0 },
            { criterion: 'Subpart (c): Metaphor (beauty compared directly to a tranquil shady bower)', marks: 1.0 }
        ],
        modelAnswer: '(a) According to John Keats, a thing of beauty provides perennial, everlasting joy because its loveliness increases as time elapses. It leaves an indelible impression on our psyche that never fades into nothingness, transcending temporal decay and sorrow.\n\n(b) In this context, a "bower" signifies a secluded, shady retreat created by interlaced tree branches. Metaphorically, beauty functions as a soothing bower, offering a calm oasis that shields human beings from life\'s suffering and harsh realities.\n\n(c) Poetic Device: Metaphor (tranquil beauty is directly identified with a shady bower).',
        examinerNotes: 'Make sure the student explains that Keats\' beauty is immortal and never fades.'
    },
    {
        id: 'eng-q-007',
        chapterId: 'english-4-2',
        subjectId: 'english',
        section: 'C',
        marks: 5,
        questionType: 'Long-Answer',
        wordLimit: '120-150 words',
        questionText: 'In Pearl S. Buck’s story "The Enemy", Dr. Sadao Hoki faces a severe moral conflict between his duty as a patriotic Japanese citizen and his commitment as a medical professional. How does he resolve this dilemma, and what message does the story convey?',
        rubrics: [
            { criterion: 'Dual conflict: Sheltering an American POW during wartime (treason) vs oath of Hippocrates as surgeon to save human life', marks: 1.5 },
            { criterion: 'Courageous humanitarianism: Operating on wounded soldier Tom despite domestic servant rebellion and General Takima\'s threat', marks: 2.0 },
            { criterion: 'Resolution and universal theme: Assisting Tom\'s nocturnal escape to safety, showing humanitarian empathy transcends national boundaries', marks: 1.5 }
        ],
        modelAnswer: `In Pearl S. Buck’s "The Enemy", Dr. Sadao Hoki is confronted with an agonizing moral dilemma: whether to hand over a wounded American prisoner of war, Tom, to the Japanese military police as a loyal subject of Imperial Japan, or to honor his sacred medical oath by operating on a dying human being.

Harboring an enemy soldier during World War II invited the lethal charge of high treason. Dr. Sadao’s household servants revolted and abandoned the house in protest. Even General Takima, preoccupied with his own health, forgot his promise to dispatch private assassins to quietly eliminate the soldier.

Ultimately, Dr. Sadao’s professional ethics and universal humanitarianism conquer national bigotry. Refusing to let a wounded patient bleed to death on his shore, he surgically extracts the bullet, nurses Tom back to health with his wife Hana, and covertly provides him with a boat, provisions, and Japanese clothes to escape safely to an uninhabited island.

The story delivers a profound universal message: the brotherhood of humanity and the preservation of human life transcend narrow geopolitical borders, racial prejudices, and the destructive passions of war.`,
        examinerNotes: 'Emphasize that Sadao never compromised his professional integrity as a doctor.'
    },
    {
        id: 'eng-q-008',
        chapterId: 'english-1-1',
        subjectId: 'english',
        section: 'A',
        marks: 1,
        questionType: 'Reading-MCQ',
        questionText: 'Read the following line from an unseen comprehension passage on environmental sustainability:\n"The relentless exploitation of groundwater aquifers is an ecological debt passed down to unrepresented future generations."\nThe phrase "ecological debt" in this context refers to:',
        mcqOptions: [
            { key: 'A', text: 'Financial loans acquired by green energy companies from international banks' },
            { key: 'B', text: 'Irreversible natural resource depletion that future generations will suffer without having caused' },
            { key: 'C', text: 'Taxes imposed on carbon emissions by sovereign governments' },
            { key: 'D', text: 'Subsidies granted to organic farmers by municipal corporations' }
        ],
        correctOption: 'B',
        rubrics: [
            { criterion: 'Identification of metaphorical meaning of ecological debt as resource overconsumption passed down', marks: 1.0 }
        ],
        modelAnswer: 'Correct Option: (B). The phrase "ecological debt" is a metaphor describing the catastrophic consumption and exhaustion of finite planetary resources by the present generation, forcing future generations to inherit environmental deficits and shortages they had no voice in creating.',
        examinerNotes: 'Assess comprehension of figurative economic metaphors applied to ecology.'
    },
    {
        id: 'eng-q-009',
        chapterId: 'english-2-4',
        subjectId: 'english',
        section: 'B',
        marks: 5,
        questionType: 'Article',
        wordLimit: '120-150 words',
        questionText: 'You are Aarav / Ananya. Write an article for your school magazine in 120-150 words on "The Transformative Role of Artificial Intelligence in School Education: Opportunities and Ethical Safeguards".',
        rubrics: [
            { criterion: 'Format: Catchy title and Byline', marks: 1.0 },
            { criterion: 'Content: Opportunities (adaptive learning, personalized feedback, automated grading) and Ethical Safeguards (critical thinking preservation, digital equity, data privacy)', marks: 2.0 },
            { criterion: 'Expression: Coherence, paragraph transitions, advanced vocabulary, correct grammar', marks: 2.0 }
        ],
        modelAnswer: `THE TRANSFORMATIVE ROLE OF ARTIFICIAL INTELLIGENCE IN SCHOOL EDUCATION
By Aarav, Class XII-A

The advent of Artificial Intelligence is reshaping the contours of modern pedagogy, evolving education from a standardized, one-size-fits-all model into an adaptive, personalized learning journey. Intelligent tutoring systems analyze individual cognitive pace, offering tailored explanations in complex subjects like quantum physics and calculus while freeing educators from repetitive clerical assessments.

However, unchecked technological integration carries significant pedagogical pitfalls. Over-reliance on generative AI risks eroding foundational cognitive faculties—specifically independent critical thinking, creative problem-solving, and original analytical writing. Furthermore, unequal access to high-speed broadband and AI subscriptions threatens to widen the existing socio-economic digital divide among Indian learners.

To harness AI as a catalyst rather than a crutch, schools must establish rigorous ethical safeguards. Institutions must foster critical media literacy, train pupils to query algorithmic hallucinations, and protect student biometric data privacy. Ultimately, artificial intelligence must augment—never supplant—the irreplaceable empathetic mentorship of the human teacher.`,
        examinerNotes: 'Check for Title, Byline, balanced discussion of advantages vs ethics, and adherence to word limit.'
    },
    {
        id: 'eng-q-010',
        chapterId: 'english-3-5',
        subjectId: 'english',
        section: 'C',
        marks: 4,
        questionType: 'Extract-Prose',
        wordLimit: '40 words',
        extractPassage: '"The battle of Champaran is won," he exclaimed. Then he took a piece of paper and divided the group into pairs and put down the order in which each pair was to court arrest.',
        questionText: '(a) Who said "The battle of Champaran is won" and under what circumstances? (b) How did the lawyers\' decision change Mahatma Gandhi\'s perception of the Champaran campaign?',
        rubrics: [
            { criterion: 'Subpart (a): Mahatma Gandhi exclaimed this when prominent local lawyers withdrew their plan to return home and declared they would follow him to jail', marks: 2.0 },
            { criterion: 'Subpart (b): Lawyers overcoming selfishness and showing solidarity with poor sharecroppers symbolized the triumph of collective fearlessness over British subjugation', marks: 2.0 }
        ],
        modelAnswer: '(a) Mahatma Gandhi said these words when Rajendra Prasad and fellow prominent Bihari lawyers, initially planning to return home if Gandhi were imprisoned, had a moral awakening. Recognizing that a total stranger was willing to go to prison for poor peasants, they resolved to court arrest alongside him.\n\n(b) The lawyers\' willingness to sacrifice their elite privilege and face imprisonment alongside impoverished sharecroppers convinced Gandhi that fear had been vanquished. He recognized that self-reliance and collective unity had triumphed, marking the true spiritual victory of Champaran.',
        examinerNotes: 'Emphasize the moral transformation of the lawyers from self-interest to selfless solidarity.'
    },
    {
        id: 'eng-q-011',
        chapterId: 'english-4-6',
        subjectId: 'english',
        section: 'C',
        marks: 5,
        questionType: 'Long-Answer',
        wordLimit: '120-150 words',
        questionText: 'Both Zitkala-Sa in "The Cutting of My Long Hair" and Bama in "We Too Are Human Beings" experience the trauma of systemic oppression in their childhood. Contrast the nature of their discrimination and examine how both used education as a tool of rebellion and emancipation.',
        rubrics: [
            { criterion: 'Forms of oppression: Zitkala-Sa facing cultural erasure/assimilation at Carlisle Indian School vs Bama facing caste-based untouchability in Tamil Nadu', marks: 2.0 },
            { criterion: 'Emotional trauma: Forced shearing of Native American hair (shingling) vs humiliating sight of elder carrying vadai packet by string', marks: 1.5 },
            { criterion: 'Emancipation through education: Annan’s advice to Bama to study hard to gain dignity; Zitkala-Sa using the power of the written word to resist subjugation', marks: 1.5 }
        ],
        modelAnswer: `In "Memories of Childhood", both Zitkala-Sa and Bama recount poignant autobiographical episodes of childhood oppression, yet their victimhood stems from distinct socio-cultural structures: racial assimilation versus caste untouchability.

Zitkala-Sa, a Native American enrolled at the Carlisle Indian Industrial School, suffers brutal cultural erasure. Her long hair—a sacred tribal emblem worn long except by cowards and mourners—is forcibly shingled like a captive's, stripping her of cultural identity and reducing her to "a wooden puppet."

Bama, a Dalit girl in Tamil Nadu, discovers the grotesque reality of caste untouchability upon observing an elderly community elder carrying a parcel of vadai by its string to avoid polluting upper-caste hands. The realization fills her with rebellious indignation and sorrow.

Crucially, both protagonists transform trauma into defiant agency through education. Bama heeds her brother Annan’s wise counsel that education alone can break caste shackles and command dignity; she excels academically and becomes a pioneering author. Similarly, Zitkala-Sa masters the language of the colonizers to chronicle Native American heritage, turning literacy into an impregnable instrument of political rebellion and human dignity.`,
        examinerNotes: 'Ensure both Zitkala-Sa (racial/cultural) and Bama (caste) are addressed with textual balance.'
    }
];
export const englishQuestionById = (id) => cbseEnglishQuestionBank.find(q => q.id === id);
