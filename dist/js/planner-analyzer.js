import { chapters } from './curriculum.js';
import { validPlannerDate } from './import-parser.js';
// Pre-compiled keyword mapping for CBSE Class XII chapters
const chapterKeywords = {
    // Physics
    'physics-1-1': [/electric\s*charges?/i, /coulomb/i, /gauss\s*law/i, /electric\s*flux/i, /electrostatics?/i],
    'physics-1-2': [/electrostatic\s*potential/i, /capacitan(?:ce|tor)/i, /dielectric/i],
    'physics-1-3': [/current\s*electricity/i, /ohm'?s?\s*law/i, /kirchhoff/i, /potentiometer/i, /wheatstone/i],
    'physics-2-1': [/moving\s*charges/i, /magnetic\s*fields?/i, /biot\s*savart/i, /ampere'?s?\s*circuital/i, /lorentz/i, /cyclotron/i],
    'physics-2-2': [/magnetism\s*and\s*matter/i, /magnetic\s*dipole/i, /earth'?s?\s*magnetism/i, /hysteresis/i],
    'physics-2-3': [/electromagnetic\s*induction/i, /emi\b/i, /faraday/i, /lenz'?s?\s*law/i, /eddy\s*currents?/i],
    'physics-2-4': [/alternating\s*current/i, /ac\s*circuits?/i, /transformer/i, /lcr\s*circuit/i, /resonance/i],
    'physics-3-1': [/electromagnetic\s*waves/i, /em\s*waves/i, /displacement\s*current/i, /maxwell/i],
    'physics-3-2': [/ray\s*optics/i, /refraction/i, /reflection/i, /lenses/i, /mirrors?/i, /microscope/i, /telescope/i, /prism/i],
    'physics-3-3': [/wave\s*optics/i, /huygens/i, /interference/i, /diffraction/i, /young'?s?\s*double\s*slit/i, /polarisation/i],
    'physics-4-1': [/dual\s*nature/i, /photoelectric/i, /de\s*broglie/i, /work\s*function/i],
    'physics-4-2': [/atoms?\b/i, /bohr'?s?\s*model/i, /rutherford/i, /hydrogen\s*spectrum/i],
    'physics-4-3': [/nuclei\b/i, /nuclear\s*(?:binding|force|fission|fusion)/i, /mass\s*defect/i, /radioactivity/i],
    'physics-5-1': [/semiconductors?/i, /p-n\s*junction/i, /diodes?/i, /rectifiers?/i, /logic\s*gates?/i, /electronic\s*devices/i],
    // Chemistry
    'chemistry-1-1': [/solutions?\b/i, /raoult'?s?\s*law/i, /colligative/i, /osmotic\s*pressure/i, /molarity/i, /molality/i, /van'?t\s*hoff/i],
    'chemistry-2-1': [/electrochemistry/i, /nernst/i, /galvanic\s*cell/i, /kohlrausch/i, /electrolysis/i, /faraday'?s?\s*laws?/i],
    'chemistry-3-1': [/chemical\s*kinetics/i, /rate\s*of\s*reaction/i, /arrhenius/i, /order\s*of\s*reaction/i, /activation\s*energy/i],
    'chemistry-4-1': [/d[- ]and\s*f[- ]block/i, /transition\s*elements/i, /lanthanoid/i, /actinoid/i],
    'chemistry-5-1': [/coordination\s*compounds?/i, /ligands?/i, /werner/i, /crystal\s*field/i, /isomerism/i],
    'chemistry-6-1': [/haloalkanes?/i, /haloarenes?/i, /sn1/i, /sn2/i, /nucleophilic\s*substitution/i],
    'chemistry-7-1': [/alcohols?/i, /phenols?/i, /ethers?/i, /grignard/i, /kolbe/i, /reimer\s*tiemann/i],
    'chemistry-8-1': [/aldehydes?/i, /ketones?/i, /carboxylic\s*acids?/i, /aldol/i, /cannizzaro/i, /clemmensen/i],
    'chemistry-9-1': [/amines?\b/i, /diazonium/i, /carbylamine/i, /gabriel\s*phthalimide/i, /hoffmann/i],
    'chemistry-10-1': [/biomolecules?/i, /carbohydrates?/i, /glucose/i, /proteins?/i, /amino\s*acids?/i, /dna\b/i, /rna\b/i, /vitamins?/i],
    // Mathematics
    'math-1-1': [/relations?\s*and\s*functions?/i, /equivalence\s*relation/i, /one-one/i, /onto/i],
    'math-1-2': [/inverse\s*trig(?:onometric)?/i, /principal\s*value/i],
    'math-2-1': [/matrices\b|matrix\b/i, /matrix\s*multiplication/i, /transpose/i, /symmetric\s*matrix/i],
    'math-2-2': [/determinants?\b/i, /adjoint/i, /cramer/i, /inverse\s*of\s*matrix/i],
    'math-3-1': [/continuity/i, /differentiability/i, /derivatives?\b/i, /chain\s*rule/i, /logarithmic\s*diff/i],
    'math-3-2': [/applications?\s*of\s*derivatives?/i, /aod\b/i, /maxima\s*and\s*minima/i, /tangents?\s*and\s*normals?/i, /rate\s*of\s*change/i],
    'math-3-3': [/integrals?\b|integration\b/i, /calculus\b/i, /definite\s*integrals?/i, /by\s*parts/i, /partial\s*fractions?/i],
    'math-3-4': [/applications?\s*of\s*integrals?/i, /area\s*under\s*(?:the\s*)?curve/i],
    'math-3-5': [/differential\s*equations?/i, /integrating\s*factor/i, /variable\s*separable/i, /homogeneous\s*diff/i],
    'math-4-1': [/vectors?\b|vector\s*algebra/i, /dot\s*product/i, /cross\s*product/i, /scalar\s*product/i],
    'math-4-2': [/three[- ]dimensional\s*geometry|3d\s*geometry/i, /direction\s*cosines/i, /equation\s*of\s*line/i, /plane/i],
    'math-5-1': [/linear\s*programming/i, /lpp\b/i, /objective\s*function/i, /feasible\s*region/i],
    'math-6-1': [/probability\b/i, /bayes'?\s*theorem/i, /conditional\s*probability/i, /independent\s*events/i],
    // Physical Education
    'pe-1': [/sporting\s*events/i, /planning\s*in\s*sports/i, /fixtures?/i, /knockout/i, /league\s*tournament/i],
    'pe-2': [/children\s*and\s*women/i, /female\s*athlete\s*triad/i, /postural\s*deformities/i],
    'pe-3': [/yoga\b/i, /asanas?\b/i, /lifestyle\s*disease/i, /obesity/i, /diabetes/i, /asthma/i, /hypertension/i],
    'pe-4': [/cwsn\b/i, /special\s*needs/i, /adaptive\s*physical/i],
    'pe-5': [/sports\s*and\s*nutrition/i, /balanced\s*diet/i, /nutritive\s*components/i],
    'pe-6': [/test\s*and\s*measurement/i, /fitness\s*tests?/i, /sai\s*khelo/i, /barrow/i, /rikli\s*and\s*jones/i],
    'pe-7': [/physiology\s*(?:and|&)\s*injuries/i, /sports\s*injuries/i, /first\s*aid/i, /price\s*protocol/i],
    'pe-8': [/biomechanics/i, /newton'?s?\s*laws/i, /levers?\b/i, /equilibrium/i, /projectile/i, /friction/i],
    'pe-9': [/psychology\s*(?:and|&)\s*sports/i, /personality/i, /motivation/i, /aggression/i],
    'pe-10': [/training\s*in\s*sports/i, /strength/i, /endurance/i, /speed/i, /flexibility/i, /circuit\s*training/i],
    // English Literature
    'english-lit-1': [/last\s*lesson/i],
    'english-lit-2': [/lost\s*spring/i],
    'english-lit-3': [/deep\s*water/i],
    'english-lit-4': [/rattrap/i],
    'english-lit-5': [/indigo/i],
    'english-lit-6': [/poets\s*and\s*pancakes/i],
    'english-lit-7': [/interview/i],
    'english-lit-8': [/going\s*places/i],
    'english-lit-9': [/my\s*mother\s*at\s*sixty[- ]six/i],
    'english-lit-10': [/keeping\s*quiet/i],
    'english-lit-11': [/thing\s*of\s*beauty/i],
    'english-lit-12': [/roadside\s*stand/i],
    'english-lit-13': [/aunt\s*jennifer/i],
    'english-lit-14': [/third\s*level/i],
    'english-lit-15': [/tiger\s*king/i],
    'english-lit-16': [/journey\s*to\s*the\s*end/i],
    'english-lit-17': [/enemy/i],
    'english-lit-18': [/on\s*the\s*face\s*of\s*it/i],
    'english-lit-19': [/memories\s*of\s*childhood/i]
};
/** Match chapters mentioned in the source line or surrounding text */
export function matchChapterCoverage(text, subjectId) {
    const subjectChapters = chapters.filter(c => c.subject === subjectId);
    const matched = new Set();
    for (const c of subjectChapters) {
        // Exact chapter title match
        const titleRe = new RegExp('\\b' + c.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
        if (titleRe.test(text)) {
            matched.add(c.id);
            continue;
        }
        // Keyword regex match
        const patterns = chapterKeywords[c.id];
        if (patterns && patterns.some(re => re.test(text))) {
            matched.add(c.id);
        }
    }
    return [...matched];
}
/** Formats a date offset: YYYY-MM-DD + days */
function addDays(isoDate, days) {
    if (!validPlannerDate(isoDate))
        return isoDate;
    const [y, m, d] = isoDate.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    return [
        String(dt.getUTCFullYear()).padStart(4, '0'),
        String(dt.getUTCMonth() + 1).padStart(2, '0'),
        String(dt.getUTCDate()).padStart(2, '0')
    ].join('-');
}
/** Compute day difference: b - a */
function dayDiff(a, b) {
    if (!validPlannerDate(a) || !validPlannerDate(b))
        return 0;
    const dtA = new Date(a + 'T00:00:00Z').getTime();
    const dtB = new Date(b + 'T00:00:00Z').getTime();
    return Math.round((dtB - dtA) / (1000 * 60 * 60 * 24));
}
/**
 * Automatically generate tailored high-yield study sessions leading up to each test.
 * Distributes revision, PYQs, and formula sprints across prep days.
 */
export function generateStudySessionsForTests(tests, state, fromDate) {
    const today = fromDate || new Date().toISOString().slice(0, 10);
    const tasks = [];
    const existingKeys = new Set((state?.tasks || []).map(t => `${t.day}|${t.subject}|${t.title.toLowerCase().trim()}`));
    // Preferred session time slots
    const defaultSlots = ['16:00', '17:30', '19:00', '20:30'];
    for (const test of tests) {
        if (!validPlannerDate(test.day) || !test.subject)
            continue;
        const diff = dayDiff(today, test.day);
        if (diff < 0)
            continue; // Past test
        const subjectChapters = chapters.filter(c => c.subject === test.subject);
        const coveredIds = (test.coverage && test.coverage.length > 0)
            ? test.coverage
            : subjectChapters.slice(0, 2).map(c => c.id);
        const primaryChapter = subjectChapters.find(c => c.id === coveredIds[0]) || subjectChapters[0];
        const secondaryChapter = subjectChapters.find(c => c.id === coveredIds[1]) || primaryChapter;
        // Clean test display name
        const testName = test.title.replace(/^[\d/.\- ]+\s*/, '').trim() || `${test.subject.toUpperCase()} Test`;
        // 1. One day before test (or test day if diff === 0): Formula Sprint & High-Yield Derivations
        const prepDay1 = diff > 0 ? addDays(test.day, -1) : test.day;
        const task1 = {
            id: crypto.randomUUID(),
            title: `${testName} · Formula & Derivations Sprint`,
            day: prepDay1,
            time: defaultSlots[0],
            minutes: 45,
            subject: test.subject,
            chapter: primaryChapter?.id || '',
            priority: 'High',
            due: test.day,
            done: false,
            reason: `Final high-yield revision for upcoming ${testName}`
        };
        const key1 = `${task1.day}|${task1.subject}|${task1.title.toLowerCase().trim()}`;
        if (!existingKeys.has(key1)) {
            tasks.push(task1);
            existingKeys.add(key1);
        }
        // 2. Two or three days before test: CBSE Board PYQs Marathon
        if (diff >= 2) {
            const prepDay2 = addDays(test.day, -2);
            const task2 = {
                id: crypto.randomUUID(),
                title: `${testName} · Board PYQs & Numerical Mastery`,
                day: prepDay2,
                time: defaultSlots[1],
                minutes: 45,
                subject: test.subject,
                chapter: secondaryChapter?.id || primaryChapter?.id || '',
                priority: 'High',
                due: test.day,
                done: false,
                reason: `Exam-pattern question practice for ${testName}`
            };
            const key2 = `${task2.day}|${task2.subject}|${task2.title.toLowerCase().trim()}`;
            if (!existingKeys.has(key2)) {
                tasks.push(task2);
                existingKeys.add(key2);
            }
        }
        // 3. Four or five days before test: Core NCERT Concepts Review
        if (diff >= 4) {
            const prepDay3 = addDays(test.day, -4);
            const task3 = {
                id: crypto.randomUUID(),
                title: `${testName} · Core NCERT Concepts & Diagrams`,
                day: prepDay3,
                time: defaultSlots[2],
                minutes: 45,
                subject: test.subject,
                chapter: primaryChapter?.id || '',
                priority: 'High',
                due: test.day,
                done: false,
                reason: `Foundational concept review for ${testName}`
            };
            const key3 = `${task3.day}|${task3.subject}|${task3.title.toLowerCase().trim()}`;
            if (!existingKeys.has(key3)) {
                tasks.push(task3);
                existingKeys.add(key3);
            }
        }
    }
    // Sort tasks chronologically
    return tasks.sort((a, b) => a.day.localeCompare(b.day) || a.time.localeCompare(b.time));
}
/** Pre-packaged authentic CBSE 2026-27 Sample Test Schedule */
export const SAMPLE_CBSE_PLANNER = `CBSE CLASS XII 2026-27 ASSESSMENT SCHEDULE
28/11/2026 Physics Periodic Test: Electric Charges and Fields, Electrostatic Potential
02/12/2026 Chemistry Unit Test: Solutions and Electrochemistry
05/12/2026 Mathematics Assessment: Matrices and Determinants
09/12/2026 Physical Education Assessment: Management of Sporting Events and Yoga
12/12/2026 English Core Term Paper: The Last Lesson and Notice Writing`;
