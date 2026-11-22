export const lifeDefaults = () => ({ achievements: false, papers: [], practicals: [], writing: [], letters: [], reminders: { enabled: true, quietFrom: '22:00', quietTo: '07:00', notified: [] } });
export function gardenStats(state) {
    const completed = state.tasks.filter(task => task.done).length;
    const reviews = state.reviews.length;
    const seconds = (state.study?.sessions ?? []).filter(session => session.kind === 'focus').reduce((sum, session) => sum + Math.max(0, session.seconds), 0);
    const focusMinutes = Math.floor(seconds / 60), focusGrowth = Math.floor(seconds / 1500);
    const growth = completed + reviews + focusGrowth;
    return { completed, reviews, focusMinutes, growth, flowers: Math.floor(growth / 5), leaves: growth % 5 };
}
export function quietNow(from, to, date = new Date()) {
    if (!/^\d\d:\d\d$/.test(from) || !/^\d\d:\d\d$/.test(to) || from === to)
        return false;
    const now = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    return from < to ? now >= from && now < to : now >= from || now < to;
}
