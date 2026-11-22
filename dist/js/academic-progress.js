import { activityById } from './academic-data.js';
import { ratings, revisionDate } from './model.js';
/** Durable activity evidence without implicit topic/chapter mastery. */
export function saveAcademicActivity(state, id, input, day, now = new Date().toISOString()) {
    const definition = activityById(id);
    if (!definition)
        return { error: 'This learning activity is no longer available.' };
    if (state.academic.activities[id]?.status === 'completed')
        return { error: 'This activity is already recorded as complete. Your saved result was kept.' };
    const steps = [...new Set(input.completedSteps)];
    if (steps.some(step => !definition.steps.some(known => known.id === step)))
        return { error: 'This activity has an unknown step. Reload it and try again.' };
    const counts = [input.questionsAttempted, input.questionsCorrect, input.questionsIncorrect];
    if (counts.some(value => value !== undefined && (!Number.isInteger(value) || value < 0 || value > 100000)))
        return { error: 'Question counts must be whole numbers.' };
    if ((input.questionsCorrect !== undefined || input.questionsIncorrect !== undefined) && input.questionsAttempted === undefined)
        return { error: 'Record the number attempted before entering checked counts.' };
    if (input.questionsAttempted !== undefined && (input.questionsCorrect ?? 0) + (input.questionsIncorrect ?? 0) > input.questionsAttempted)
        return { error: 'Correct and incorrect counts cannot exceed attempted questions.' };
    if (input.understanding !== undefined && !ratings.includes(input.understanding))
        return { error: 'Choose Easy, Okay or Difficult.' };
    if (input.status === 'completed') {
        if (steps.length !== definition.steps.length)
            return { error: 'Complete each activity step before marking this activity done.' };
        if (!input.understanding)
            return { error: 'Choose Easy, Okay or Difficult to finish this activity.' };
        if ((definition.kind === 'practice' || definition.kind === 'assessment') && input.questionsAttempted === undefined)
            return { error: 'Record how many questions you attempted.' };
        if (!input.notes.trim())
            return { error: 'Write a short note about what you understood or where to resume.' };
    }
    const next = structuredClone(state), old = next.academic.activities[id];
    const record = { activityId: id, status: input.status, completedSteps: steps, updatedAt: now, startedAt: old?.startedAt ?? now,
        ...(input.status === 'completed' ? { completedAt: now } : {}), ...(input.questionsAttempted !== undefined ? { questionsAttempted: input.questionsAttempted } : {}),
        ...(input.questionsCorrect !== undefined ? { questionsCorrect: input.questionsCorrect } : {}), ...(input.questionsIncorrect !== undefined ? { questionsIncorrect: input.questionsIncorrect } : {}),
        ...(input.doubt.trim() ? { doubt: input.doubt.trim() } : {}), ...(input.notes.trim() ? { notes: input.notes.trim() } : {}), ...(input.understanding ? { understanding: input.understanding } : {}) };
    next.academic.activities[id] = record;
    const progress = next.academic.topicProgress[definition.nodeId];
    if (progress) {
        progress.updatedAt = now;
        progress.lastStudied = day;
        if (input.understanding)
            progress.rating = input.understanding;
        if (definition.kind === 'active-recall' && input.understanding)
            progress.nextReview = revisionDate(day, input.understanding);
    }
    return { state: next };
}
