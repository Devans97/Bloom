/**
 * BLOOM - CBSE Class XII Examination Paper Generator & Diagnostic Engine
 * 2026-2027 Examination Blueprint Standard
 * Assembles balanced, syllabus-compliant board examination papers and computes
 * fine-grained competency diagnostics and step-mark evaluations.
 */
import { cbsePhysicsQuestionBank } from './data/cbse-question-bank-physics.js';
import { cbseChemistryQuestionBank } from './data/cbse-question-bank-chemistry.js';
import { cbseMathQuestionBank } from './data/cbse-question-bank-math.js';
import { cbseEnglishQuestionBank } from './data/cbse-question-bank-english.js';
import { cbsePEQuestionBank } from './data/cbse-question-bank-pe.js';
export const CBSE_BLUEPRINTS = {
    physics: {
        subjectId: 'physics',
        totalMarks: 70,
        durationMinutes: 180,
        sections: [
            { section: 'A', description: 'MCQs and Assertion-Reasoning', questionCount: 16, marksPerQuestion: 1 },
            { section: 'B', description: 'Very Short Answer', questionCount: 5, marksPerQuestion: 2 },
            { section: 'C', description: 'Short Answer', questionCount: 7, marksPerQuestion: 3 },
            { section: 'D', description: 'Case-Based Integrated Questions', questionCount: 2, marksPerQuestion: 4 },
            { section: 'E', description: 'Long Answer Questions', questionCount: 3, marksPerQuestion: 5 }
        ]
    },
    chemistry: {
        subjectId: 'chemistry',
        totalMarks: 70,
        durationMinutes: 180,
        sections: [
            { section: 'A', description: 'MCQs and Assertion-Reasoning', questionCount: 16, marksPerQuestion: 1 },
            { section: 'B', description: 'Very Short Answer', questionCount: 5, marksPerQuestion: 2 },
            { section: 'C', description: 'Short Answer', questionCount: 7, marksPerQuestion: 3 },
            { section: 'D', description: 'Case-Based Integrated Questions', questionCount: 2, marksPerQuestion: 4 },
            { section: 'E', description: 'Long Answer Questions', questionCount: 3, marksPerQuestion: 5 }
        ]
    },
    math: {
        subjectId: 'math',
        totalMarks: 80,
        durationMinutes: 180,
        sections: [
            { section: 'A', description: 'MCQs and Assertion-Reasoning', questionCount: 20, marksPerQuestion: 1 },
            { section: 'B', description: 'Very Short Answer', questionCount: 5, marksPerQuestion: 2 },
            { section: 'C', description: 'Short Answer', questionCount: 6, marksPerQuestion: 3 },
            { section: 'D', description: 'Long Answer Questions', questionCount: 4, marksPerQuestion: 5 },
            { section: 'E', description: 'Case-Based Integrated Units', questionCount: 3, marksPerQuestion: 4 }
        ]
    },
    english: {
        subjectId: 'english',
        totalMarks: 80,
        durationMinutes: 180,
        sections: [
            { section: 'A', description: 'Reading Skills (Unseen Passages)', questionCount: 2, marksPerQuestion: 11 },
            { section: 'B', description: 'Creative Writing Skills (Notice, Letter, Article)', questionCount: 4, marksPerQuestion: 5 },
            { section: 'C', description: 'Literature Textbooks (Flamingo & Vistas)', questionCount: 6, marksPerQuestion: 5 }
        ]
    },
    pe: {
        subjectId: 'pe',
        totalMarks: 70,
        durationMinutes: 180,
        sections: [
            { section: 'A', description: 'Multiple Choice Questions', questionCount: 18, marksPerQuestion: 1 },
            { section: 'B', description: 'Very Short Answer Questions', questionCount: 5, marksPerQuestion: 2 },
            { section: 'C', description: 'Short Answer Questions', questionCount: 5, marksPerQuestion: 3 },
            { section: 'D', description: 'Case-Based / Data Analysis Questions', questionCount: 3, marksPerQuestion: 4 },
            { section: 'E', description: 'Long Answer Questions', questionCount: 3, marksPerQuestion: 5 }
        ]
    }
};
/**
 * Compute detailed diagnostic breakdown from evaluated test questions
 */
export function evaluateTestDiagnostics(testId, subjectId, evaluatedQuestions) {
    const chapterMap = new Map();
    let totalScored = 0;
    let totalMax = 0;
    for (const q of evaluatedQuestions) {
        totalScored += Math.max(0, q.scoredMarks);
        totalMax += Math.max(0, q.maxMarks);
        const curr = chapterMap.get(q.chapterId) ?? { max: 0, scored: 0 };
        curr.max += q.maxMarks;
        curr.scored += q.scoredMarks;
        chapterMap.set(q.chapterId, curr);
    }
    const diagnostics = [];
    const recommendedFocus = [];
    for (const [chapterId, data] of chapterMap.entries()) {
        const accuracy = data.max > 0 ? (data.scored / data.max) * 100 : 0;
        let strength = 'Needs Work';
        if (accuracy >= 85) {
            strength = 'Mastered';
        }
        else if (accuracy >= 70) {
            strength = 'Competent';
        }
        else if (accuracy >= 50) {
            strength = 'Needs Work';
            recommendedFocus.push(chapterId);
        }
        else {
            strength = 'Critical Review';
            recommendedFocus.push(chapterId);
        }
        diagnostics.push({
            chapterId,
            totalAttemptedMarks: data.max,
            totalScoredMarks: data.scored,
            percentageAccuracy: Math.round(accuracy * 10) / 10,
            strengthCategory: strength
        });
    }
    // Sort diagnostics by accuracy ascending (weakest chapters first)
    diagnostics.sort((a, b) => a.percentageAccuracy - b.percentageAccuracy);
    const overallPercentage = totalMax > 0 ? Math.round((totalScored / totalMax) * 1000) / 10 : 0;
    return {
        testId,
        subjectId,
        totalMarksScored: totalScored,
        maxMarks: totalMax,
        overallPercentage,
        chapterDiagnostics: diagnostics,
        recommendedFocusChapters: recommendedFocus
    };
}
/**
 * Generate a complete syllabus-compliant CBSE Board Diagnostic Examination Paper
 */
export function generateCBSEDiagnosticPaper(subjectId) {
    const blueprint = CBSE_BLUEPRINTS[subjectId] || CBSE_BLUEPRINTS.physics;
    const subjectTitles = {
        physics: { title: 'CBSE Class XII Physics Board Examination 2027', code: '042' },
        chemistry: { title: 'CBSE Class XII Chemistry Board Examination 2027', code: '043' },
        math: { title: 'CBSE Class XII Mathematics Board Examination 2027', code: '041' },
        english: { title: 'CBSE Class XII English Core Board Examination 2027', code: '301' },
        pe: { title: 'CBSE Class XII Physical Education Board Examination 2027', code: '048' }
    };
    const meta = subjectTitles[subjectId] || subjectTitles.physics;
    let rawQuestions = [];
    if (subjectId === 'physics') {
        rawQuestions = cbsePhysicsQuestionBank;
    }
    else if (subjectId === 'chemistry') {
        rawQuestions = cbseChemistryQuestionBank;
    }
    else if (subjectId === 'math') {
        rawQuestions = cbseMathQuestionBank;
    }
    else if (subjectId === 'english') {
        rawQuestions = cbseEnglishQuestionBank;
    }
    else {
        rawQuestions = cbsePEQuestionBank;
    }
    const questions = rawQuestions.map(q => ({
        id: q.id,
        section: q.section,
        marks: q.marks,
        questionText: q.questionText || (q.casePassage ? `${q.casePassage}\n\n${q.subQuestions?.map((sq) => `(${sq.questionNumber}) ${sq.text} [${sq.marks}m]`).join('\n')}` : ''),
        markingScheme: q.modelAnswer || q.stepRubrics?.map((r) => `${r.step} (${r.marks}m)`).join('\n') || q.rubrics?.map((r) => `${r.criterion} (${r.marks}m)`).join('\n') || '',
        options: q.mcqOptions?.map((o) => `${o.key}: ${o.text}`)
    }));
    return {
        id: `diag-paper-${subjectId}-2027`,
        title: meta.title,
        subjectCode: meta.code,
        totalMarks: blueprint.totalMarks,
        durationHours: Math.round(blueprint.durationMinutes / 60),
        questions
    };
}
