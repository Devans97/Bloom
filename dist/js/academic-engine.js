/**
 * BLOOM — Academic Engine
 * Generates Actionable Learning Activities, manages subject-specific workflows,
 * and computes honest syllabus metrics without fabricated predictions.
 */
import { CBSE_CHAPTERS, CBSE_SUBJECTS } from './curriculum.js';
/**
 * Builds an actionable study activity for a topic and mode.
 * Strictly complies with Spec A7: clear action verb, concrete steps,
 * NCERT reference, expected effort, completion evidence, and understanding check.
 */
export function buildActionableActivity(topic, chapter, mode) {
    const isScienceMath = ['physics', 'chemistry', 'math'].includes(chapter.subjectId);
    if (mode === 'learning') {
        return {
            title: `Master ${topic.title}`,
            activityType: 'concept',
            learningObjective: `Understand the core theoretical foundation of ${topic.title} and derive principal equations step-by-step.`,
            steps: [
                `Read official verified section: ${topic.ncertRef}.`,
                `Study key principles: ${topic.coreConcepts.slice(0, 3).join(', ')}.`,
                topic.keyDerivations?.length
                    ? `Work through derivation on paper: ${topic.keyDerivations[0]}.`
                    : `Analyze the main textbook worked illustration and note steps.`,
                `Summarize definitions and formulas in your notes.`,
                `Reflect on your confidence: rate as Easy, Okay, or Difficult.`
            ],
            resourceRefs: [topic.ncertRef, chapter.ncertRef],
            completionEvidence: 'Handwritten concept notes, derivation/illustration steps reviewed, reflection rating logged.',
            expectedMinutes: 30
        };
    }
    if (mode === 'practice') {
        const actType = isScienceMath ? 'numerical' : 'board_practice';
        const verb = isScienceMath ? 'Solve Board Numericals on' : 'Practice Board Questions on';
        return {
            title: `${verb} ${topic.title}`,
            activityType: actType,
            learningObjective: `Apply formulas and definitions from ${topic.title} to solve board-pattern questions with proper step presentation.`,
            steps: [
                `Recall key formulas from memory: ${topic.keyFormulas?.slice(0, 2).join(', ') || 'core principles'}.`,
                `Solve 2 representative questions without looking at worked solutions.`,
                `Self-check solution steps against CBSE marking criteria (formula, substitution, units).`,
                `If any step was incorrect, log the root cause in the Mistake Journal for retry.`
            ],
            resourceRefs: [topic.ncertRef],
            completionEvidence: 'Independent problem solutions on paper; any calculation or concept doubts logged in Mistake Journal.',
            expectedMinutes: 25
        };
    }
    if (mode === 'retry') {
        return {
            title: `Re-solve Mistake on ${topic.title}`,
            activityType: 'mistake_retry',
            learningObjective: `Overcome recorded mistake root-cause by re-solving the problem cleanly from blank paper.`,
            steps: [
                `Review the recorded mistake note and why the error occurred.`,
                `Identify the exact failure point (formula recall, algebra slip, question misread).`,
                `Re-solve the complete question on blank paper without looking at hints.`,
                `Verify final answer and mark mistake entry as resolved if confident.`
            ],
            resourceRefs: [topic.ncertRef],
            completionEvidence: 'Clean handwritten working from blank paper; mistake status updated.',
            expectedMinutes: 15
        };
    }
    // mode === 'revision'
    return {
        title: `Active Recall on ${topic.title}`,
        activityType: 'recall',
        learningObjective: `Reinforce spaced retention through active recall of formulas, definitions, and board question patterns.`,
        steps: [
            `Without checking notes, write down key equations: ${topic.keyFormulas?.join(', ') || topic.coreConcepts.slice(0, 2).join(', ')}.`,
            `Review typical board question angles: ${topic.boardQuestionTypes.slice(0, 2).join('; ')}.`,
            `Verify accuracy against ${topic.ncertRef}.`,
            `Log your shared understanding rating (Easy = 7d, Okay = 3d, Difficult = 1d).`
        ],
        resourceRefs: [topic.ncertRef],
        completionEvidence: 'Formula sheet recalled from memory; next revision interval calculated.',
        expectedMinutes: 20
    };
}
/**
 * Computes honest curriculum metrics.
 * The denominator is always total official CBSE chapters (never invented or truncated).
 * Unmarked chapters are strictly recorded as "unknown", never assumed learned or pending.
 */
export function computeAcademicProgress(state) {
    const totalChapters = CBSE_CHAPTERS.length;
    let markedCount = 0;
    let learnedCount = 0;
    let learningCount = 0;
    let notStartedCount = 0;
    let needsRevisionCount = 0;
    let difficultCount = 0;
    const subjectStats = {
        physics: { total: 0, marked: 0, learned: 0, percent: 0 },
        pe: { total: 0, marked: 0, learned: 0, percent: 0 },
        chemistry: { total: 0, marked: 0, learned: 0, percent: 0 },
        english: { total: 0, marked: 0, learned: 0, percent: 0 },
        math: { total: 0, marked: 0, learned: 0, percent: 0 }
    };
    for (const c of CBSE_CHAPTERS) {
        subjectStats[c.subjectId].total++;
        const p = state.chapterProgress[c.id];
        if (p && p.status) {
            markedCount++;
            subjectStats[c.subjectId].marked++;
            if (['Learned', 'Practising', 'Exam ready', 'Needs revision'].includes(p.status)) {
                learnedCount++;
                subjectStats[c.subjectId].learned++;
            }
            else if (p.status === 'Learning') {
                learningCount++;
            }
            else if (p.status === 'Not started') {
                notStartedCount++;
            }
            if (p.status === 'Needs revision') {
                needsRevisionCount++;
            }
            if (p.rating === 'Difficult') {
                difficultCount++;
            }
        }
    }
    for (const s of CBSE_SUBJECTS) {
        const item = subjectStats[s.id];
        item.percent = item.total > 0 ? Math.round((item.learned / item.total) * 100) : 0;
    }
    const overallPercent = totalChapters > 0 ? Math.round((learnedCount / totalChapters) * 100) : 0;
    const unknownCount = totalChapters - markedCount;
    return {
        totalChapters,
        markedCount,
        unknownCount,
        learnedCount,
        learningCount,
        notStartedCount,
        needsRevisionCount,
        difficultCount,
        overallPercent,
        subjectStats
    };
}
