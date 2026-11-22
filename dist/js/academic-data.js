import { chapters, subjects } from './curriculum.js';
export * from './academic-data-types.js';
import { physicsTopicNodes, physicsActivityDefinitions } from './data/physics-curriculum.js';
import { chemistryTopicNodes, chemistryActivityDefinitions } from './data/chemistry-curriculum.js';
import { mathTopicNodes, mathActivityDefinitions } from './data/math-curriculum.js';
import { englishTopicNodes, englishActivityDefinitions } from './data/english-curriculum.js';
import { peTopicNodes, peActivityDefinitions } from './data/pe-curriculum.js';
/**
 * Builds official outline hierarchy (Subject -> Unit -> Chapter)
 * for CBSE Class XII 2026-27 Board Examination.
 */
const officialOutlineNodes = subjects.flatMap(subject => {
    const sourceFor = (chapterTitle, allocationGroup) => ({
        title: `CBSE ${subject.title} (${subject.code}), Class XII syllabus, 2026–27`,
        url: subject.source.split('#')[0],
        ...(subject.id === 'physics' && allocationGroup === 'physics-1'
            ? { pdfPage: 12 }
            : subject.id === 'chemistry'
                ? { pdfPage: 8 }
                : subject.id === 'math'
                    ? { pdfPage: 7 }
                    : subject.id === 'english' && allocationGroup === 'english-3'
                        ? { pdfPage: 11 }
                        : subject.id === 'pe'
                            ? { pdfPage: 13 }
                            : {}),
        session: '2026-27',
        section: `Class XII (2026–27) course structure entry: ${chapterTitle}`,
        checkedOn: '2026-11-21',
        status: 'verified'
    });
    const subjectSource = sourceFor(subject.title, '');
    const subjectNode = {
        id: `subject-${subject.id}-xii-2026-27`,
        subjectId: subject.id,
        chapterId: '',
        parentId: '',
        kind: 'subject',
        title: subject.title,
        officialScope: `CBSE Class XII subject code ${subject.code}; 2026–27 syllabus.`,
        source: subjectSource
    };
    const unitByGroup = new Map();
    for (const chapter of chapters.filter(item => item.subject === subject.id)) {
        const source = sourceFor(chapter.title, chapter.allocationGroup);
        if (!unitByGroup.has(chapter.allocationGroup)) {
            unitByGroup.set(chapter.allocationGroup, {
                id: chapter.allocationGroup,
                subjectId: subject.id,
                chapterId: chapter.id,
                parentId: subject.id,
                kind: 'unit',
                title: chapter.allocation,
                officialScope: `Official 2026–27 course-structure row: ${chapter.allocation}. Published allocation is shown only at this source row’s scope.`,
                source
            });
        }
    }
    const units = [...unitByGroup.values()];
    const chapterNodes = chapters
        .filter(item => item.subject === subject.id)
        .map(chapter => ({
        id: chapter.id,
        subjectId: subject.id,
        chapterId: chapter.id,
        parentId: chapter.allocationGroup,
        kind: 'chapter',
        title: chapter.title,
        officialScope: `Chapter title in the 2026–27 CBSE subject source. Verified curriculum topic slice available.`,
        source: sourceFor(chapter.title, chapter.allocationGroup)
    }));
    return [subjectNode, ...units, ...chapterNodes];
});
/** Aggregate all verified topic nodes across all 5 official CBSE subjects */
export const verifiedTopicNodes = [
    ...physicsTopicNodes,
    ...chemistryTopicNodes,
    ...mathTopicNodes,
    ...englishTopicNodes,
    ...peTopicNodes
];
/** Complete node graph: Subjects + Units + Chapters + Granular Verified Topics */
export const academicNodes = [
    ...officialOutlineNodes,
    ...verifiedTopicNodes
];
/** Complete collection of verified 4-phase learning activity definitions */
export const activityDefinitions = [
    ...physicsActivityDefinitions,
    ...chemistryActivityDefinitions,
    ...mathActivityDefinitions,
    ...englishActivityDefinitions,
    ...peActivityDefinitions
];
/** Returns an empty academic state object for fresh initializations */
export const emptyAcademicState = () => ({
    curriculumVersion: 'cbse-xii-2026-27-v1',
    topicProgress: {},
    activities: {}
});
/** Fast lookup for academic node by unique ID */
export const nodeById = (id) => academicNodes.find(node => node.id === id);
/** Retrieve all activity definitions tied to a specific node */
export const activitiesForNode = (id) => activityDefinitions.filter(activity => activity.nodeId === id);
/** Fast lookup for activity definition by unique ID */
export const activityById = (id) => activityDefinitions.find(activity => activity.id === id);
/**
 * Next activity follows strictly what the learner recorded.
 * Unmarked stays a conscious choice, not inferred mastery.
 */
export function nextActivityForNode(id, progress, records) {
    const activities = activitiesForNode(id);
    if (!progress)
        return undefined;
    const learn = activities.find(activity => activity.kind === 'first-learning');
    if ((progress.status === 'not-started' || progress.status === 'learning') &&
        learn &&
        records[learn.id]?.status === 'completed') {
        const practice = activities.find(activity => activity.kind === 'practice' && records[activity.id]?.status !== 'completed');
        if (practice)
            return practice;
        const assessment = activities.find(activity => activity.kind === 'assessment' && records[activity.id]?.status !== 'completed');
        if (assessment)
            return assessment;
    }
    const desired = {
        'not-started': ['first-learning'],
        'learning': ['first-learning', 'concept-check'],
        'learned': ['active-recall', 'practice', 'assessment'],
        'practice-needed': ['practice', 'assessment'],
        'revision-due': ['active-recall', 'practice', 'assessment'],
        'assessment-ready': ['assessment'],
        'needs-work': ['practice', 'first-learning', 'assessment']
    };
    for (const kind of desired[progress.status]) {
        const activity = activities.find(candidate => candidate.kind === kind && records[candidate.id]?.status !== 'completed');
        if (activity)
            return activity;
    }
    return undefined;
}
