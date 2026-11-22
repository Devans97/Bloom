/** Official CBSE Class XII 2026-27 Syllabus URLs */
export const CBSE_SYLLABUS_BASE = 'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/';
export const PHYSICS_SYLLABUS_URL = `${CBSE_SYLLABUS_BASE}Physics_SecP2_2026-27.pdf`;
export const CHEMISTRY_SYLLABUS_URL = `${CBSE_SYLLABUS_BASE}Chemistry_SecP2_2026-27.pdf`;
export const MATH_SYLLABUS_URL = `${CBSE_SYLLABUS_BASE}Maths_SecP2_2026-27.pdf`;
export const ENGLISH_SYLLABUS_URL = `${CBSE_SYLLABUS_BASE}English_core_SecP2_2026-27.pdf`;
export const PE_SYLLABUS_URL = `${CBSE_SYLLABUS_BASE}PhysicalEducation_SecP2_2026-27.pdf`;
/** Construct verified AcademicSource object with official 2026-27 provenance */
export function createSource(subjectTitle, subjectCode, url, pdfPage, section, isVerified = true) {
    return {
        title: `CBSE ${subjectTitle} (${subjectCode}), Class XII syllabus, 2026–27`,
        url,
        session: '2026-27',
        pdfPage,
        section,
        checkedOn: '2026-11-21',
        status: isVerified ? 'verified' : 'unverified'
    };
}
/**
 * Creates 4 standardized, non-punitive academic activities for each verified topic:
 * 1. First Learning (conceptual grounding)
 * 2. Practice (assigned problems)
 * 3. Active Recall (closed-book memory retrieval)
 * 4. Assessment (short honest self-check)
 */
export function buildActivitiesForTopic(node, def) {
    const learnId = `${node.id}-learn`;
    const practiceId = `${node.id}-practice`;
    const recallId = `${node.id}-recall`;
    const assessmentId = `${node.id}-assessment`;
    const recallMinutes = Math.max(10, Math.round(def.minutes * 0.65));
    const assessmentMinutes = Math.max(15, Math.round(def.minutes * 0.8));
    return [
        {
            id: learnId,
            nodeId: node.id,
            kind: 'first-learning',
            title: `Understand ${node.title}`,
            objective: def.objective,
            steps: def.learnSteps.map((instruction, index) => ({
                id: `step-${index + 1}`,
                instruction
            })),
            completionEvidence: [
                'Mark each learning step you actually completed.',
                'Write one short explanation or example in your own words.',
                'Record any concept that requires teacher clarification.'
            ],
            reflectionPrompt: 'How did this topic feel: Easy, Okay or Difficult?',
            estimatedMinutes: def.minutes,
            sourceRefs: [node.source],
            nextActivityId: practiceId
        },
        {
            id: practiceId,
            nodeId: node.id,
            kind: 'practice',
            title: `Apply ${node.title}`,
            objective: 'Attempt topic-matched questions from prescribed NCERT exercises or teacher-assigned sheets.',
            steps: def.practiceSteps.map((instruction, index) => ({
                id: `step-${index + 1}`,
                instruction
            })),
            completionEvidence: [
                'Record the number of questions you attempted.',
                'Record correct and incorrect counts only if you checked your answers against worked solutions.',
                'Save any recurring mistake or misconception to your Mistake Journal.'
            ],
            reflectionPrompt: 'How did this practice feel: Easy, Okay or Difficult?',
            estimatedMinutes: def.minutes,
            sourceRefs: [node.source]
        },
        {
            id: recallId,
            nodeId: node.id,
            kind: 'active-recall',
            title: `Recall ${node.title}`,
            objective: 'Retrieve definitions, key formulas, diagrams, and derivations from memory before consulting notes.',
            steps: [
                {
                    id: 'step-1',
                    instruction: 'Close your textbook and notes. On a blank sheet, write down the central principles, formulas, definitions, and diagrams for this topic.'
                },
                {
                    id: 'step-2',
                    instruction: 'Reopen your NCERT textbook or class notes. Compare your written recall against the official text line-by-line.'
                },
                {
                    id: 'step-3',
                    instruction: 'Highlight in green what you recalled accurately, and note down in your study log any omitted conditions, edge cases, or sign conventions.'
                }
            ],
            completionEvidence: [
                'Save a concise recall summary in your notes.',
                'Identify at least one key point to revisit before tests.'
            ],
            reflectionPrompt: 'How did this recall feel: Easy, Okay or Difficult?',
            estimatedMinutes: recallMinutes,
            sourceRefs: [node.source]
        },
        {
            id: assessmentId,
            nodeId: node.id,
            kind: 'assessment',
            title: `Check your understanding: ${node.title}`,
            objective: 'Complete a timed, unassisted assessment of 3–5 representative CBSE board-level questions.',
            steps: [
                {
                    id: 'step-1',
                    instruction: 'Select 3 to 5 questions from NCERT Exemplar, back-of-chapter exercises, or official CBSE past-year papers matching this topic.'
                },
                {
                    id: 'step-2',
                    instruction: 'Solve each question under timed conditions without checking formulas, answer keys, or notes.'
                },
                {
                    id: 'step-3',
                    instruction: 'Cross-check your solutions using the official CBSE marking scheme rubrics (step marks, units, diagram labels).'
                },
                {
                    id: 'step-4',
                    instruction: 'Record attempted, correct, and incorrect counts accurately. Note key takeaways for revision.'
                }
            ],
            completionEvidence: [
                'Record at least one question attempted with step-by-step working.',
                'Record verified score breakdown according to CBSE marking criteria.',
                'Log any conceptual gap into the Mistake Journal.'
            ],
            reflectionPrompt: 'How did this assessment feel: Easy, Okay or Difficult?',
            estimatedMinutes: assessmentMinutes,
            sourceRefs: [node.source]
        }
    ];
}
