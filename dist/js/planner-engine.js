/**
 * BLOOM — Deterministic Planning & Revision Engine
 *
 * Implements:
 * - 4-way independent School/Tuition availability matrix (Spec A12)
 * - Deterministic prioritized candidate selection (Spec A11)
 * - Reviewable proposal generation (never auto-mutating confirmed plans)
 * - Spaced revision calculation based on shared Easy(7d) / Okay(3d) / Difficult(1d) rating
 * - Backlog rescue
 */
import { CBSE_CHAPTERS, CBSE_SUBJECTS } from './curriculum.js';
import { buildActionableActivity } from './academic-engine.js';
export const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
};
export const minutesToTime = (m) => {
    const norm = Math.max(0, Math.min(1439, Math.floor(m)));
    const hh = String(Math.floor(norm / 60)).padStart(2, '0');
    const mm = String(norm % 60).padStart(2, '0');
    return `${hh}:${mm}`;
};
export const getIsoDate = (d = new Date()) => {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
};
export const addDays = (dateStr, days) => {
    const d = new Date(dateStr + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
};
export const daysDifference = (dateA, dateB) => {
    const a = Date.parse(dateA + 'T00:00:00Z');
    const b = Date.parse(dateB + 'T00:00:00Z');
    return Math.round((b - a) / 86400000);
};
export const getRevisionIntervalDays = (rating) => {
    switch (rating) {
        case 'Difficult': return 1;
        case 'Okay': return 3;
        case 'Easy': return 7;
    }
};
/**
 * Calculates student availability for a date.
 * Supports all 4 combinations of School (yes/no) and Tuition (yes/no) independently.
 */
export function calculateAvailability(state, dateStr, profileOverride) {
    const profile = profileOverride || state.profile;
    const override = state.dayOverrides[dateStr];
    const dateObj = new Date(dateStr + 'T12:00:00Z');
    const dayOfWeek = dateObj.getUTCDay(); // 0 is Sunday
    // School is infrequent/for tests. Tuition defaults to off on Sunday unless overridden.
    const school = override ? override.school : false;
    const tuition = override ? override.tuition : (dayOfWeek === 0 ? false : true);
    const wake = timeToMinutes(profile.wakeTime || '07:00');
    const sleep = timeToMinutes(profile.sleepTime || '23:00');
    const wakingWindow = { start: wake, end: sleep > wake ? sleep : 1440 };
    const commitments = [];
    const blockedIntervals = [];
    const travel = Math.max(0, profile.travelMinutes || 0);
    if (school) {
        const sStart = timeToMinutes(profile.schoolStart || '08:00');
        const sEnd = timeToMinutes(profile.schoolEnd || '14:00');
        commitments.push({ start: profile.schoolStart || '08:00', end: profile.schoolEnd || '14:00', label: 'School' });
        blockedIntervals.push({
            start: Math.max(wakingWindow.start, sStart - travel),
            end: Math.min(wakingWindow.end, sEnd + travel)
        });
    }
    if (tuition) {
        const tStart = timeToMinutes(profile.tuitionStart || '17:00');
        const tEnd = timeToMinutes(profile.tuitionEnd || '21:00');
        commitments.push({ start: profile.tuitionStart || '17:00', end: profile.tuitionEnd || '21:00', label: 'Tuition' });
        blockedIntervals.push({
            start: Math.max(wakingWindow.start, tStart - travel),
            end: Math.min(wakingWindow.end, tEnd + travel)
        });
    }
    // Merge overlapping blocked windows
    blockedIntervals.sort((a, b) => a.start - b.start);
    const mergedBlocked = [];
    for (const b of blockedIntervals) {
        const last = mergedBlocked[mergedBlocked.length - 1];
        if (last && last.end >= b.start) {
            last.end = Math.max(last.end, b.end);
        }
        else {
            mergedBlocked.push({ ...b });
        }
    }
    // Subtract blocked from waking window to yield usable study windows
    let usable = [{ ...wakingWindow }];
    for (const block of mergedBlocked) {
        usable = usable.flatMap(w => {
            if (block.end <= w.start || block.start >= w.end)
                return [w];
            const res = [];
            if (w.start < block.start)
                res.push({ start: w.start, end: block.start });
            if (w.end > block.end)
                res.push({ start: block.end, end: w.end });
            return res;
        });
    }
    const availableMinutes = usable.reduce((sum, w) => sum + (w.end - w.start), 0);
    return {
        school,
        tuition,
        wakingWindow,
        usableWindows: usable,
        availableMinutes,
        commitments,
        conflicts: []
    };
}
/**
 * Ranks curriculum ideas for the date deterministically.
 * Priority criteria:
 * 1. Confirmed upcoming school tests or official board examinations
 * 2. Official CBSE unit marks allocation
 * 3. Due or overdue revision
 * 4. Learner's Difficult rating
 * 5. Difficult subject preferences
 */
export function getRankedStudyIdeas(state, dateStr) {
    const profile = state.profile;
    const existingDayTasks = state.tasks.filter(t => t.day === dateStr);
    const scheduledChapterIds = new Set(existingDayTasks.map(t => t.chapterId));
    // Combine confirmed school tests and official board exam dates
    const activeTests = [
        ...state.tests.filter(t => t.confirmedByLearner && daysDifference(dateStr, t.day) >= 0),
        ...CBSE_SUBJECTS.map(s => ({
            id: `board-${s.id}`,
            title: `${s.title} Board Exam`,
            day: s.examDate,
            subjectId: s.id,
            coverageChapterIds: CBSE_CHAPTERS.filter(c => c.subjectId === s.id).map(c => c.id),
            maxMarks: s.theoryMarks,
            isTotalOnly: false,
            confirmedByLearner: true
        }))
    ].sort((a, b) => a.day.localeCompare(b.day));
    const ideas = [];
    for (const chapter of CBSE_CHAPTERS) {
        if (scheduledChapterIds.has(chapter.id))
            continue;
        const prog = state.chapterProgress[chapter.id];
        const status = prog?.status || 'Not started';
        const rating = prog?.rating;
        const isRevisionDue = Boolean(prog?.nextReview && prog.nextReview <= dateStr) || status === 'Needs revision';
        const isLearning = status === 'Not started' || status === 'Learning';
        // Find nearest matching test
        const matchingTest = activeTests.find(t => t.coverageChapterIds.includes(chapter.id));
        const testDaysAway = matchingTest ? daysDifference(dateStr, matchingTest.day) : null;
        const hasUrgentTest = testDaysAway !== null && testDaysAway <= 14;
        // Filter: Include if urgent test, revision due, learning in progress, or marked Difficult
        if (!hasUrgentTest && !isRevisionDue && !isLearning && rating !== 'Difficult') {
            continue;
        }
        const mode = isLearning ? 'learning' : isRevisionDue ? 'revision' : rating === 'Difficult' ? 'practice' : 'revision';
        const topic = chapter.topics[0];
        const act = buildActionableActivity(topic, chapter, mode);
        const reasons = [];
        if (matchingTest) {
            reasons.push(`${matchingTest.title} (${testDaysAway === 0 ? 'Today' : testDaysAway + 'd away'})`);
        }
        if (isRevisionDue) {
            reasons.push(prog?.nextReview === dateStr ? 'Revision due today' : 'Revision overdue');
        }
        if (isLearning) {
            reasons.push(status === 'Learning' ? 'Active learning in progress' : 'Syllabus chapter not started');
        }
        if (rating === 'Difficult') {
            reasons.push('Rated Difficult by you');
        }
        if (profile.difficultSubjects.includes(chapter.subjectId)) {
            reasons.push('In your focus subject');
        }
        // Deterministic priority score
        let score = 0;
        if (hasUrgentTest && testDaysAway !== null)
            score += (20 - testDaysAway) * 100;
        score += (chapter.unitMarks || 0) * 10;
        if (isRevisionDue)
            score += 50;
        if (rating === 'Difficult')
            score += 30;
        if (profile.difficultSubjects.includes(chapter.subjectId))
            score += 20;
        ideas.push({
            chapterId: chapter.id,
            topicId: topic.id,
            subjectId: chapter.subjectId,
            title: act.title,
            objective: act.learningObjective,
            steps: act.steps,
            resourceRefs: act.resourceRefs,
            completionEvidence: act.completionEvidence,
            activityType: act.activityType,
            minutes: profile.sessionMinutes || 25,
            reason: reasons.join(' · '),
            priorityScore: score,
            testId: matchingTest?.id,
            dueRevision: isRevisionDue
        });
    }
    // Sort by priorityScore descending, with deterministic tie-breaking by chapterId
    ideas.sort((a, b) => b.priorityScore - a.priorityScore || a.chapterId.localeCompare(b.chapterId));
    // Protect another subject alongside nearest test if budget allows (Spec A11)
    if (ideas.length >= 2 && ideas[0].testId) {
        const firstSubject = ideas[0].subjectId;
        const altSubjectIdx = ideas.findIndex(i => i.subjectId !== firstSubject);
        if (altSubjectIdx > 1) {
            const altIdea = ideas.splice(altSubjectIdx, 1)[0];
            ideas.splice(1, 0, altIdea); // elevate to 2nd position
        }
    }
    return ideas;
}
/**
 * Generates a reviewable daily study plan proposal.
 * Does not mutate state or silently alter confirmed tasks.
 */
export function generatePlanProposal(state, dateStr, targetMinutesRequested) {
    const availability = calculateAvailability(state, dateStr);
    const ideas = getRankedStudyIdeas(state, dateStr);
    const profile = state.profile;
    const sessionMin = profile.sessionMinutes || 25;
    const breakMin = profile.breakMinutes || 5;
    const targetMinutes = targetMinutesRequested ?? Math.min(profile.sessionMinutes * 4, Math.floor((availability.availableMinutes * 0.45) / 5) * 5);
    const existingTasks = state.tasks.filter(t => t.day === dateStr);
    const currentPlannedMinutes = existingTasks.reduce((sum, t) => sum + t.minutes, 0);
    let remainingBudget = Math.max(0, targetMinutes - currentPlannedMinutes);
    const blocks = [];
    const breaks = [];
    const notes = [];
    let windows = [...availability.usableWindows].filter(w => (w.end - w.start) >= sessionMin);
    for (const idea of ideas) {
        if (remainingBudget < 15 || windows.length === 0)
            break;
        const desiredMin = Math.min(idea.minutes, remainingBudget);
        const winIdx = windows.findIndex(w => (w.end - w.start) >= desiredMin);
        if (winIdx === -1)
            continue;
        const win = windows[winIdx];
        const taskStart = win.start;
        const taskEnd = taskStart + desiredMin;
        const block = {
            id: `task-${dateStr}-${idea.chapterId}-${Date.now().toString(36)}`,
            title: idea.title,
            day: dateStr,
            time: minutesToTime(taskStart),
            minutes: desiredMin,
            subjectId: idea.subjectId,
            chapterId: idea.chapterId,
            topicId: idea.topicId,
            activityType: idea.activityType,
            learningObjective: idea.objective,
            steps: idea.steps,
            completedStepIndices: [],
            resourceRefs: idea.resourceRefs,
            completionEvidence: idea.completionEvidence,
            recommendationReason: idea.reason,
            priority: idea.testId ? 'High' : 'Normal',
            done: false,
            origin: 'generated'
        };
        blocks.push(block);
        remainingBudget -= desiredMin;
        const breakEnd = taskEnd + breakMin;
        if (breakEnd <= win.end) {
            breaks.push({
                start: minutesToTime(taskEnd),
                end: minutesToTime(breakEnd),
                label: 'Mindful Rest & Reset'
            });
            win.start = breakEnd;
        }
        else {
            win.start = taskEnd;
        }
        if (win.start >= win.end) {
            windows.splice(winIdx, 1);
        }
    }
    if (blocks.length === 0) {
        notes.push('No new activities generated. Update chapter statuses or availability to create more blocks.');
    }
    return {
        day: dateStr,
        targetMinutes,
        plannedMinutes: currentPlannedMinutes + blocks.reduce((sum, b) => sum + b.minutes, 0),
        blocks,
        breaks,
        availability,
        notes,
        conflicts: []
    };
}
/**
 * Rescues overdue/missed tasks by spreading them across the next 7 days without guilt.
 */
export function rescueBacklogTasks(state, fromDate) {
    const missedTasks = state.tasks.filter(t => t.day < fromDate && !t.done);
    if (missedTasks.length === 0)
        return [];
    const rescheduled = [];
    let dayOffset = 0;
    for (const task of missedTasks) {
        const targetDay = addDays(fromDate, dayOffset % 7);
        rescheduled.push({
            ...task,
            id: `rescue-${task.id}`,
            day: targetDay,
            recommendationReason: `Backlog rescue from ${task.day}`,
            origin: 'generated'
        });
        dayOffset++;
    }
    return rescheduled;
}
