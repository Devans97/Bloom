const base = 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/';
export const dateSource = 'https://www.cbse.gov.in/cbsenew/documents/Datesheet_ClassX%20_XII_2027_Main_06112026.pdf';
export const subjects = [
    { id: 'physics', title: 'Physics', code: '042', date: '2027-02-16', source: base + 'Physics_SecP2_2026-27.pdf#page=12', max: 70, note: 'Marks are shared across each listed group.', groups: [
            ['Electrostatics and Current Electricity', 16, ['Electric Charges and Fields', 'Electrostatic Potential and Capacitance', 'Current Electricity']],
            ['Magnetism, Induction and Alternating Currents', 17, ['Moving Charges and Magnetism', 'Magnetism and Matter', 'Electromagnetic Induction', 'Alternating Current']],
            ['Electromagnetic Waves and Optics', 18, ['Electromagnetic Waves', 'Ray Optics and Optical Instruments', 'Wave Optics']],
            ['Dual Nature, Atoms and Nuclei', 12, ['Dual Nature of Radiation and Matter', 'Atoms', 'Nuclei']],
            ['Electronic Devices', 7, ['Semiconductor Electronics: Materials, Devices and Simple Circuits']]
        ] },
    { id: 'pe', title: 'Physical Education', code: '048', date: '2027-02-18', source: base + 'PhysicalEducation_SecP2_2026-27.pdf#page=13', max: 70, note: 'Current-session topic content is in the 2026–27 section. The nearby unit-weightage table is labelled 2025–26, so 2026–27 unit allocations are unavailable here.', groups: [
            ['Management of Sporting Events', null, ['Management of Sporting Events']], ['Children and Women in Sports', null, ['Children and Women in Sports']], ['Yoga as Preventive Measure for Lifestyle Disease', null, ['Yoga as Preventive Measure for Lifestyle Disease']], ['Physical Education & Sports for CWSN', null, ['Physical Education & Sports for CWSN']], ['Sports & Nutrition', null, ['Sports & Nutrition']], ['Test and Measurement in Sports', null, ['Test and Measurement in Sports']], ['Physiology & Injuries in Sport', null, ['Physiology & Injuries in Sport']], ['Biomechanics and Sports', null, ['Biomechanics and Sports']], ['Psychology and Sports', null, ['Psychology and Sports']], ['Training in Sports', null, ['Training in Sports']]
        ] },
    { id: 'chemistry', title: 'Chemistry', code: '043', date: '2027-02-27', source: base + 'Chemistry_SecP2_2026-27.pdf#page=8', max: 70, note: 'Course structure allocations are guidance; CBSE does not guarantee chapter-wise marks.', groups: [
            ['Solutions', 7, ['Solutions']], ['Electrochemistry', 9, ['Electrochemistry']], ['Chemical Kinetics', 7, ['Chemical Kinetics']], ['d- and f-Block Elements', 7, ['d- and f-Block Elements']], ['Coordination Compounds', 7, ['Coordination Compounds']], ['Haloalkanes and Haloarenes', 6, ['Haloalkanes and Haloarenes']], ['Alcohols, Phenols and Ethers', 6, ['Alcohols, Phenols and Ethers']], ['Aldehydes, Ketones and Carboxylic Acids', 8, ['Aldehydes, Ketones and Carboxylic Acids']], ['Amines', 6, ['Amines']], ['Biomolecules', 7, ['Biomolecules']]
        ] },
    { id: 'english', title: 'English Core', code: '301', date: '2027-03-05', source: base + 'English_core_SecP2_2026-27.pdf#page=10', max: 80, note: 'The detailed Reading and Creative Writing outline in this PDF is labelled 2025–26; its 2026–27 section allocation remains unverified. Literature titles are listed in the current section.', groups: [
            ['Reading Skills · 2026–27 allocation unverified', null, ['Reading Comprehension']], ['Creative Writing Skills · 2026–27 allocation unverified', null, ['Notice Writing', 'Invitations and Replies', 'Letters', 'Articles and Reports']],
            ['Literature', 40, ['The Last Lesson', 'Lost Spring', 'Deep Water', 'The Rattrap', 'Indigo', 'Poets and Pancakes', 'The Interview', 'Going Places', 'My Mother at Sixty-Six', 'Keeping Quiet', 'A Thing of Beauty', 'A Roadside Stand', 'Aunt Jennifer’s Tigers', 'The Third Level', 'The Tiger King', 'Journey to the End of the Earth', 'The Enemy', 'On the Face of It', 'Memories of Childhood']]
        ] },
    { id: 'math', title: 'Mathematics', code: '041', date: '2027-03-09', source: base + 'Maths_SecP2_2026-27.pdf#page=7', max: 80, note: 'Marks shown are course structure allocations, not chapter-wise weightage.', groups: [
            ['Relations and Functions', 8, ['Relations and Functions', 'Inverse Trigonometric Functions']], ['Algebra', 10, ['Matrices', 'Determinants']], ['Calculus', 35, ['Continuity and Differentiability', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations']], ['Vectors and Three-Dimensional Geometry', 14, ['Vector Algebra', 'Three-Dimensional Geometry']], ['Linear Programming', 5, ['Linear Programming']], ['Probability', 8, ['Probability']]
        ] }
];
export const chapters = subjects.flatMap(subject => subject.groups.flatMap(([allocation, allocationMarks, titles], group) => titles.map((title, index) => ({ id: `${subject.id}-${group + 1}-${index + 1}`, title, subject: subject.id, allocation, allocationMarks, allocationGroup: `${subject.id}-${group + 1}` }))));
export const chapterById = (id) => chapters.find(chapter => chapter.id === id);
export const subjectById = (id) => subjects.find(subject => subject.id === id);
