import { chapters, chapterById, subjects, subjectById } from './curriculum.js';
import { studyDefaults } from './study-data.js';
import { lifeDefaults } from './life-data.js';
import { emptyAcademicState, academicNodes, nextActivityForNode } from './academic-data.js';
export const statuses = ['Pending', 'Learning', 'Completed', 'Practising', 'Revised', 'Exam Ready', 'Needs revision'];
export const learningStatuses = ['Pending', 'Learning', 'Completed', 'Needs revision'];
export const statusLabel = (value) => ({ 'Pending': 'Not started', 'Completed': 'Learned', 'Practising': 'Learned · practising', 'Revised': 'Learned · revised', 'Exam Ready': 'Learned · exam ready' }[value] ?? value);
export const ratings = ['Difficult', 'Okay', 'Easy'];
export const empty = () => ({ study: studyDefaults(), life: lifeDefaults(), academic: emptyAcademicState(), darkMode: false, name: '', defaults: null, days: {}, tasks: [], tests: [], progress: {}, reviews: [], reduceMotion: false, tourStatus: 'pending', tourStep: 0, dismissedTips: [], tipsSeen: [] });
// Editable preview default based on the routine supplied for Aastha. Per-day edits
// always win; Sundays default to no tuition and school attendance is never assumed.
export const defaultDay = { start: '14:30', end: '17:00', school: false, tuition: true, limit: 150, lateStart: '21:00' };
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const stamp = (day) => Date.parse(day + 'T00:00:00Z');
export const gap = (a, b) => Math.round((stamp(b) - stamp(a)) / 86400000);
export const plus = (day, n) => new Date(stamp(day) + n * 86400000).toISOString().slice(0, 10);
export const labelDay = (day, short = false) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: short ? 'short' : 'long', month: short ? 'short' : 'long', day: 'numeric' }).format(stamp(day));
export const minute = (s) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3, 5));
export const clock = (m) => [Math.floor(m / 60), m % 60].map(n => String(n).padStart(2, '0')).join(':');
export const labelTime = (s) => new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date('2000-01-01T' + s + ':00Z'));
export const dayFor = (s, date) => {
    if (Object.hasOwn(s.days, date))
        return s.days[date];
    if (!s.defaults)
        return null;
    return { ...s.defaults, tuition: new Date(stamp(date)).getUTCDay() === 0 ? false : s.defaults.tuition };
};
export const reserve = (d) => Math.min(25, Math.floor(d.limit / 5));
const validTime = (s) => /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
const collision = (a, b, r) => a < r.b && b > r.a;
export function commitments(s, date, subject = '') {
    const d = dayFor(s, date);
    if (!d)
        return [];
    const blocks = [];
    if (d.school)
        blocks.push({ a: 480, b: 870, label: 'School and travel' });
    if (d.tuition)
        blocks.push({ a: 1020, b: 1260, label: 'Tuition' });
    const focus = focusTest(s, date)?.subject;
    if (focus && d.limit > 0) {
        const duration = reserve(d);
        for (let end = minute(d.end); duration > 0 && end - duration >= minute(d.start); end--) {
            if (!blocks.some(b => collision(end - duration, end, b))) {
                blocks.push({ a: end - duration, b: end, label: 'Protected revision', protected: true });
                break;
            }
        }
        if (!blocks.some(b => b.label === 'Protected revision') && duration > 0)
            blocks.push({ a: minute(d.start), b: minute(d.end), label: 'Protected revision', protected: true });
    }
    return blocks;
}
export function conflict(s, t) {
    if (!t.title.trim() || !t.day || !Number.isInteger(t.minutes) || t.minutes < 5 || t.minutes > 240)
        return 'Enter a title, date and a duration of 5–240 minutes.';
    const other = s.tasks.filter(x => x.id !== t.id && x.day === t.day && x.time);
    if (!t.time)
        return '';
    if (!validTime(t.time))
        return 'Choose a valid time.';
    const a = minute(t.time), b = a + t.minutes, d = dayFor(s, t.day);
    if (b >= 1440)
        return 'Choose a time that finishes before midnight.';
    const mainTest = focusTest(s, t.day);
    const block = commitments(s, t.day, t.subject).find(x => collision(a, b, x) && (!x.protected || !t.subject || t.subject === mainTest?.subject));
    if (block)
        return 'That overlaps ' + block.label.toLowerCase() + '.';
    const inMain = Boolean(d) && a >= minute(d.start) && b <= minute(d.end);
    const lateStart = d?.lateStart && validTime(d.lateStart) ? minute(d.lateStart) : undefined;
    const lateEnd = d?.lateEnd && validTime(d.lateEnd) ? minute(d.lateEnd) : 1440;
    const inLate = lateStart !== undefined && a >= lateStart && b <= lateEnd;
    if (d && !inMain && !inLate)
        return 'That time is outside your study windows.';
    const mainTasks = other.filter(x => x.time && d && minute(x.time) >= minute(d.start) && minute(x.time) + x.minutes <= minute(d.end));
    if (inMain && d && t.subject && focusTest(s, t.day)?.subject === t.subject && mainTasks.filter(x => x.subject === t.subject).reduce((n, x) => n + x.minutes, 0) + t.minutes > d.limit - reserve(d))
        return 'That would use the time set aside for other subjects.';
    if (inMain && d && mainTasks.reduce((n, x) => n + x.minutes, 0) + t.minutes > d.limit)
        return 'That would exceed the minutes set for this window.';
    const overlap = other.find(x => collision(a, b, { a: minute(x.time), b: minute(x.time) + x.minutes, label: x.title }));
    return overlap ? 'That overlaps “' + overlap.title + '”.' : '';
}
export function freeSlot(s, t) {
    const d = dayFor(s, t.day);
    if (!d)
        return '';
    const windows = [[minute(d.start), minute(d.end)]];
    if (d.lateStart && validTime(d.lateStart))
        windows.push([minute(d.lateStart), d.lateEnd && validTime(d.lateEnd) ? minute(d.lateEnd) : 1440]);
    for (const [start, end] of windows) {
        for (let m = Math.ceil(start / 5) * 5; m + t.minutes <= end; m += 5) {
            const time = clock(m);
            if (!conflict(s, { ...t, time }))
                return time;
        }
    }
    return '';
}
export function calendarTests(s) {
    return [...s.tests, ...subjects.map(x => ({ id: 'board-' + x.id, title: x.title + ' board exam', day: x.date, subject: x.id, coverage: chapters.filter(c => c.subject === x.id).map(c => c.id) }))];
}
function eligible(s, t, day, chapter) {
    const n = gap(day, t.day), p = s.progress[chapter];
    if (n < 0)
        return false;
    if (n > 14)
        return t.id.startsWith('board-') && (!p || p.status === 'Pending' || p.status === 'Learning' || p.rating === 'Difficult' || Boolean(p.next && p.next <= day));
    return !p || p.status === 'Pending' || p.status === 'Learning' || !p.rating || p.rating === 'Difficult' || n <= (p.rating === 'Okay' ? 7 : 3);
}
export function focusTest(s, day) {
    return calendarTests(s).filter(t => t.coverage.some(c => eligible(s, t, day, c)) || (!t.coverage.length && gap(day, t.day) >= 0 && gap(day, t.day) <= 7)).sort((a, b) => a.day.localeCompare(b.day))[0];
}
const certainty = (p) => p?.rating ? 3 - ratings.indexOf(p.rating) : 0;
const age = (p, date) => p?.last ? Math.max(0, gap(p.last, date)) : p?.status === 'Pending' || p?.status === 'Learning' ? 10000 : 0;
const rate = (c) => c.allocationMarks === null ? -1 : c.allocationMarks / (subjectById(c.subject)?.max ?? 100);
export function suggestions(s, day) {
    const open = s.tasks.filter(t => t.day === day);
    const activeTests = calendarTests(s).sort((a, b) => a.day.localeCompare(b.day));
    const recent = new Map();
    for (const t of [...s.tasks].sort((a, b) => b.day.localeCompare(a.day))) {
        if (t.day < day && !t.done && !recent.has(t.id))
            recent.set(t.id, t);
    }
    const rollovers = [...recent.values()].map(t => ({ ...t, key: 'roll-' + t.id, reason: 'Unfinished from ' + labelDay(t.day, true), rollover: t }));
    const ranked = academicNodes.flatMap(node => {
        const progress = s.academic.topicProgress[node.id];
        const activity = nextActivityForNode(node.id, progress, s.academic.activities);
        if (!progress || !activity || open.some(task => task.activityId === activity.id))
            return [];
        const c = chapterById(node.chapterId), test = activeTests.find(t => t.coverage.includes(node.chapterId) && eligible(s, t, day, node.chapterId));
        if (!c)
            return [];
        const reasons = [];
        if (test)
            reasons.push('Included in your confirmed ' + test.title + ' · ' + (gap(day, test.day) === 0 ? 'today' : gap(day, test.day) + ' days away'));
        if (progress.nextReview && progress.nextReview <= day)
            reasons.push(progress.nextReview === day ? 'Your topic review is due today' : 'Your topic review is overdue');
        if (progress.rating === 'Difficult')
            reasons.push('You rated this topic Difficult');
        if (!reasons.length)
            reasons.push(progress.status === 'not-started' ? 'You marked this topic not started' : progress.status === 'practice-needed' ? 'You marked this topic for practice' : progress.status === 'revision-due' ? 'You marked this topic for revision' : 'Next activity after your recorded progress');
        return [{ key: activity.id, activityId: activity.id, title: activity.title, reason: reasons.join(' · '), subject: node.subjectId, chapter: node.chapterId, minutes: activity.estimatedMinutes, test, weight: rate(c), age: progress.lastStudied ? Math.max(0, gap(progress.lastStudied, day)) : 0, clarity: progress.rating === 'Difficult' ? 3 : progress.rating === 'Okay' ? 2 : progress.rating === 'Easy' ? 1 : 0 }];
    }).sort((a, b) => {
        if (Boolean(a.test) !== Boolean(b.test))
            return a.test ? -1 : 1;
        if (a.test && b.test && a.test.day !== b.test.day)
            return a.test.day.localeCompare(b.test.day);
        return b.weight - a.weight || b.age - a.age || b.clarity - a.clarity || a.key.localeCompare(b.key);
    });
    return [...ranked.filter(x => x.test), ...rollovers, ...ranked.filter(x => !x.test)];
}
export const revisionDate = (day, r) => plus(day, ({ Difficult: 1, Okay: 3, Easy: 7 })[r]);
export function markDone(s, id, date, rating) {
    const t = s.tasks.find(x => x.id === id);
    if (!t || t.done)
        return;
    t.done = true;
    t.finished = date;
    // A task checkbox records only this task. Academic state changes happen in
    // the topic workspace after the learner records the matching evidence.
    void rating;
}
export function proposePlan(s, start, days = 1, testId = '') {
    const draft = structuredClone(s), tasks = [];
    let unplaced = 0;
    for (let n = 0; n < days; n++) {
        const day = plus(start, n), all = suggestions(draft, day);
        const test = testId ? calendarTests(s).find(t => t.id === testId) : undefined;
        if (test && day > test.day)
            break;
        const ideas = test ? all.filter(x => test.coverage.includes(x.chapter) || x.key === 'test-' + test.id) : all;
        const candidates = [...ideas.slice(0, 4)];
        const main = focusTest(draft, day), other = all.find(x => x.subject !== main?.subject && !candidates.some(c => c.key === x.key));
        if (main && other)
            candidates.push(other);
        for (const x of candidates) {
            const t = { id: x.rollover?.id ?? crypto.randomUUID(), title: x.title, day, time: '', minutes: x.minutes, subject: x.subject, chapter: x.chapter, priority: 'Normal', due: test?.day ?? '', done: false, reason: x.reason, originalDay: x.rollover?.originalDay ?? x.rollover?.day, activityId: x.activityId };
            t.time = freeSlot(draft, t);
            if (!t.time) {
                unplaced++;
                continue;
            }
            const index = draft.tasks.findIndex(y => y.id === t.id);
            if (index < 0)
                draft.tasks.push(t);
            else
                draft.tasks[index] = t;
            tasks.push(t);
        }
    }
    return { tasks, unplaced };
}
