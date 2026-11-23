import { chapters, subjects, subjectById } from './curriculum.js';
import { esc } from './host.js';
import { icon } from './icons.js';
import { defaultPlanningProfile } from './planning.js';
const steps = ['Your workspace', 'Your day', 'Your commitments', 'Study rhythm', 'Your preparation', 'Your priorities', 'Ready to begin'];
const learningStates = [['Pending', 'Not started'], ['Learning', 'Learning'], ['Completed', 'Learned'], ['Needs revision', 'Needs revision']];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const periods = [['morning', 'Morning', 'Before noon'], ['afternoon', 'Afternoon', 'Noon to 5 pm'], ['evening', 'Evening', 'After 5 pm']];
let registered = false, selectedSubject = 'physics', selection = new Set(), saving = Promise.resolve(), saveTimer = 0;
const profile = (state) => ({ ...defaultPlanningProfile(), ...state.personalisation });
const checked = (value) => value ? ' checked' : '';
const option = (value, label, current = '') => `<option value="${esc(value)}"${value === current ? ' selected' : ''}>${esc(label)}</option>`;
const button = (action, label, kind = 'quiet', value = '') => `<button type="button" class="button ${kind}" data-onboarding="${action}" data-value="${esc(value)}">${esc(label)}</button>`;
const time = (name, label, value) => `<label>${esc(label)}<input type="time" name="${name}" value="${esc(value)}" required></label>`;
const duration = (name, label, value, min, max) => `<label>${esc(label)}<input type="number" name="${name}" value="${value}" min="${min}" max="${max}" step="1" required></label>`;
const days = (name, values) => `<div class="onboarding-days" role="group" aria-label="Usual ${name === 'schoolDays' ? 'school' : 'tuition'} days">${weekdays.map((day, index) => `<label><input type="checkbox" name="${name}" value="${index}"${checked(values.includes(index))}><span>${day}</span></label>`).join('')}</div>`;
const subjectCards = (name, values) => `<div class="onboarding-subject-picks">${subjects.map(subject => `<label><input type="checkbox" name="${name}" value="${subject.id}"${checked(values.includes(subject.id))}><span>${esc(subject.title)}</span></label>`).join('')}</div>`;
const dayNames = (values) => values.length ? values.map(day => weekdays[day]).join(', ') : 'Choose separately in the daily planner';
const timeLabel = (value) => { const [hours, minutes] = value.split(':').map(Number); return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours >= 12 ? 'pm' : 'am'}`; };
function welcomeFields(state) {
    return `<div class="onboarding-question"><label class="onboarding-name-label">What would you like me to call you?<input name="name" autocomplete="given-name" maxlength="36" required value="${esc(state.name)}" placeholder="Your name or nickname"></label><label>Medium of instruction <span class="onboarding-optional">Optional</span><select name="medium">${option('', 'Choose later', state.onboarding?.medium)}${['English', 'Hindi', 'English and Hindi', 'Other'].map(value => option(value, value, state.onboarding?.medium)).join('')}</select></label></div>
  <div class="onboarding-academic"><div>${icon('book-open')}<span><strong>CBSE Class XII · 2027</strong><small>Your confirmed academic workspace</small></span></div><div class="onboarding-subjects">${subjects.map(subject => `<span>${esc(subject.title)} <small>${subject.code}</small></span>`).join('')}</div></div>`;
}
function dayFields(p) {
    return `<div class="onboarding-question"><div class="onboarding-pair">${time('wake', 'I usually wake up at', p.wake)}${time('sleep', 'I usually sleep at', p.sleep)}</div><div class="onboarding-explainer">${icon('moon')}<p>Sleep stays protected. BLOOM will leave room for breaks and recommend a manageable amount of study.</p></div><details class="onboarding-details"><summary>Meals and other regular commitments <span>Optional</span></summary><p class="onboarding-help">Add the times you want kept free each day. Leave blank if they vary; you can edit them later.</p><div data-onboard-ranges="meals">${rangeFields('meals', p.meals)}</div>${button('add-meal', 'Add a meal or rest break', 'outline')}<div data-onboard-ranges="commitments">${rangeFields('commitments', p.commitments)}</div>${button('add-commitment', 'Add another commitment', 'outline')}</details></div>`;
}
function commitmentFields(p) {
    return `<div class="onboarding-commitments"><section><div class="onboarding-field-head">${icon('book-open')}<div><h3>School</h3><p>Usual times, only on the days you select.</p></div></div><div class="onboarding-pair">${time('schoolStart', 'Starts', p.schoolStart)}${time('schoolEnd', 'Finishes', p.schoolEnd)}</div>${days('schoolDays', p.schoolDays)}</section><section><div class="onboarding-field-head">${icon('clock-3')}<div><h3>Tuition</h3><p>Independent of school. Change either for any date.</p></div></div><div class="onboarding-pair">${time('tuitionStart', 'Starts', p.tuitionStart)}${time('tuitionEnd', 'Finishes', p.tuitionEnd)}</div>${days('tuitionDays', p.tuitionDays)}</section></div><div class="onboarding-travel">${duration('travelMinutes', 'Travel buffer each way (minutes)', p.travelMinutes, 0, 180)}<p class="onboarding-help">BLOOM keeps this time free around school and tuition. Use 0 if travel is already included.</p></div><p class="onboarding-help">No days selected means no repeating commitment is assumed. School and tuition always have separate switches in Planner.</p>`;
}
function rhythmFields(state, p) {
    return `<div class="onboarding-question"><fieldset class="onboarding-fieldset"><legend>When does studying usually feel best?</legend><div class="onboarding-choice-grid">${periods.map(([value, label, detail]) => `<label class="onboarding-choice"><input type="checkbox" name="preferredPeriods" value="${value}"${checked(p.preferredPeriods.includes(value))}><span>${icon(value === 'evening' ? 'moon' : 'sun')}<strong>${label}</strong><small>${detail}</small></span></label>`).join('')}</div><p class="onboarding-help">Choose any that suit you. BLOOM uses these periods around your commitments.</p></fieldset><div class="onboarding-pair">${duration('sessionMinutes', 'A comfortable study session (minutes)', p.sessionMinutes, 10, 90)}${duration('breakMinutes', 'A break between sessions (minutes)', p.breakMinutes, 5, 30)}</div><fieldset class="onboarding-fieldset"><legend>What kind of encouragement helps?</legend><div class="onboarding-choice-grid two"><label class="onboarding-choice"><input name="motivation" type="radio" value="gentle"${checked(state.onboarding?.motivation !== 'structured')}><span><strong>A gentle nudge</strong><small>Quiet encouragement, no milestones.</small></span></label><label class="onboarding-choice"><input name="motivation" type="radio" value="structured"${checked(state.onboarding?.motivation === 'structured')}><span><strong>Celebrate milestones</strong><small>See achievements from real study.</small></span></label></div></fieldset><label class="onboarding-toggle"><input type="checkbox" name="reminders"${checked(state.life.reminders.enabled)}>Show gentle in-app reminders <span>Device notifications remain off until you enable them.</span></label></div>`;
}
function rangeFields(kind, ranges) {
    return ranges.map((range, index) => `<div class="onboarding-range" data-range="${kind}"><label><span class="sr">${kind === 'meals' ? 'Meal or rest break' : 'Commitment'} name</span><input data-range-field="label" value="${esc(range.label)}" placeholder="${kind === 'meals' ? 'Lunch or rest break' : 'Commitment'}" maxlength="70"></label><label><span class="sr">From</span><input data-range-field="start" type="time" value="${esc(range.start)}"></label><label><span class="sr">Until</span><input data-range-field="end" type="time" value="${esc(range.end)}"></label><button type="button" class="tool" data-onboarding="remove-range" aria-label="Remove ${esc(range.label || 'time')}" data-value="${index}">${icon('x')}</button></div>`).join('');
}
function preparationFields(state) {
    const list = chapters.filter(chapter => chapter.subject === selectedSubject), recorded = list.filter(chapter => state.progress[chapter.id]).length;
    const subCount = (subId) => {
        const sc = chapters.filter(c => c.subject === subId), marked = sc.filter(c => state.progress[c.id]).length;
        return `${marked}/${sc.length}`;
    };
    return `<div class="onboarding-preparation">
    <div class="onboarding-subject-tabs" role="tablist" aria-label="Choose a subject">
      ${subjects.map(subject => `<button type="button" role="tab" class="onboarding-sub-tab${selectedSubject === subject.id ? ' active' : ''}" data-onboarding="subject" data-value="${subject.id}" aria-selected="${selectedSubject === subject.id}" aria-pressed="${selectedSubject === subject.id}"><span>${esc(subject.title)}</span> <small class="onboarding-sub-count">${subCount(subject.id)}</small></button>`).join('')}
    </div>
    <div class="onboarding-selection-head">
      <div class="onboarding-prep-meta">
        <strong>${recorded} of ${list.length} chapters marked</strong>
        <span class="onboarding-sel-pill" data-selection-badge>${selection.size ? `${selection.size} selected` : 'Select chapters to batch-rate'}</span>
      </div>
      <div class="onboarding-sel-buttons">
        ${button('select-all', selection.size === list.length ? 'Clear selection' : 'Select all chapters', 'outline')}
      </div>
    </div>
    <div class="onboarding-fast-bulk" role="toolbar" aria-label="Quick batch actions">
      <div class="fast-bulk-label"><span>Batch difficulty:</span></div>
      <div class="fast-bulk-actions">
        <button type="button" class="bulk-diff-pill diff-difficult" data-onboarding="bulk-rating" data-rating="Difficult"${selection.size ? '' : ' disabled'} title="Mark selected chapters as Difficult">
          🔴 Mark Difficult
        </button>
        <button type="button" class="bulk-diff-pill diff-okay" data-onboarding="bulk-rating" data-rating="Okay"${selection.size ? '' : ' disabled'} title="Mark selected chapters as Okay">
          🟡 Mark Okay
        </button>
        <button type="button" class="bulk-diff-pill diff-easy" data-onboarding="bulk-rating" data-rating="Easy"${selection.size ? '' : ' disabled'} title="Mark selected chapters as Easy">
          🟢 Mark Easy
        </button>
        <button type="button" class="bulk-diff-pill bulk-status-btn" data-onboarding="bulk-status" data-status="Completed"${selection.size ? '' : ' disabled'} title="Mark selected chapters as Learned">
          ⚡ Mark Learned
        </button>
        <button type="button" class="bulk-diff-pill bulk-status-btn" data-onboarding="bulk-status" data-status="Needs revision"${selection.size ? '' : ' disabled'} title="Mark selected chapters as Needs Revision">
          🔄 Needs Revision
        </button>
      </div>
    </div>
    <div class="onboarding-chapters" role="list">
      ${list.map(chapter => {
        const progress = state.progress[chapter.id];
        const status = progress ? learningStates.find(([value]) => value === progress.status)?.[1] ?? progress.status : 'Not yet marked';
        const rating = progress?.rating;
        const isChecked = selection.has(chapter.id);
        return `<div class="onboarding-chapter-row${isChecked ? ' is-selected' : ''}${progress ? ' is-marked' : ''}" data-row-chapter="${chapter.id}">
          <label class="onboarding-chapter-label" title="Select ${esc(chapter.title)}">
            <input type="checkbox" data-onboarding-chapter="${chapter.id}"${checked(isChecked)}>
            <div class="chapter-label-content">
              <span class="chapter-name">${esc(chapter.title)}</span>
              <div class="chapter-badges">
                <span class="chapter-badge status-tag ${progress ? 'has-status' : 'unmarked'}">${esc(status)}</span>
                ${rating ? `<span class="chapter-badge rating-tag rating-${rating.toLowerCase()}">★ ${rating}</span>` : ''}
              </div>
            </div>
          </label>
          <div class="onboarding-diff-group" role="group" aria-label="1-click difficulty for ${esc(chapter.title)}">
            <button type="button" class="diff-btn diff-easy${rating === 'Easy' ? ' active' : ''}" data-onboarding="set-chapter-rating" data-chapter="${chapter.id}" data-rating="Easy" title="Rate Easy">
              🟢 Easy
            </button>
            <button type="button" class="diff-btn diff-okay${rating === 'Okay' ? ' active' : ''}" data-onboarding="set-chapter-rating" data-chapter="${chapter.id}" data-rating="Okay" title="Rate Okay">
              🟡 Okay
            </button>
            <button type="button" class="diff-btn diff-difficult${rating === 'Difficult' ? ' active' : ''}" data-onboarding="set-chapter-rating" data-chapter="${chapter.id}" data-rating="Difficult" title="Rate Difficult">
              🔴 Difficult
            </button>
          </div>
        </div>`;
    }).join('')}
    </div>
    <div class="onboarding-bulk-advanced">
      <details>
        <summary>Custom status dropdowns <span>(optional)</span></summary>
        <div class="onboarding-bulk">
          <label><span class="sr">Status for selected chapters</span><select name="bulkStatus">${option('', 'Choose a learning status')}${learningStates.map(([value, label]) => option(value, label)).join('')}</select></label>
          <label><span class="sr">Difficulty for selected chapters</span><select name="bulkRating">${option('', 'Difficulty (optional)')}${['Easy', 'Okay', 'Difficult'].map(value => option(value, value)).join('')}</select></label>
          <button type="button" class="button primary" data-onboarding="apply-status"${selection.size ? '' : ' disabled'}>Apply to ${selection.size}</button>
        </div>
      </details>
    </div>
    <p class="onboarding-help">Click <strong>Easy</strong>, <strong>Okay</strong>, or <strong>Difficult</strong> directly on any chapter to rate it in one tap. You can also select chapters using the checkboxes and rate them together above.</p>
  </div>`;
}
function priorityFields(p) {
    return `<div class="onboarding-question"><fieldset class="onboarding-fieldset"><legend>Which subjects need a little more support?</legend>${subjectCards('difficultSubjects', p.difficultSubjects)}</fieldset><fieldset class="onboarding-fieldset"><legend>Where do you feel more confident?</legend>${subjectCards('confidentSubjects', p.confidentSubjects)}</fieldset><label>What would help most right now?<select name="focus">${option('balanced', 'A balance of learning and revision', p.focus)}${option('learning', 'Getting through first-time learning', p.focus)}${option('revision', 'Making revision more consistent', p.focus)}</select></label><div class="onboarding-explainer">${icon('clipboard-list')}<p>Have a test coming up? Add it in Tests or upload your school planner after setup. Confirmed dates and coverage will shape your plan.</p></div></div>`;
}
function reviewFields(state, p) {
    const answered = state.onboarding?.answered ?? [], recorded = Object.keys(state.progress).filter(id => chapters.some(chapter => chapter.id === id)).length;
    return `<div class="onboarding-review"><p class="onboarding-review-name">A study space for <strong>${esc(state.name || 'you')}.</strong></p><dl><div><dt>Academic profile</dt><dd>CBSE Class XII · 2027${state.onboarding?.medium ? ' · ' + esc(state.onboarding.medium) : ''}</dd>${button('edit-step', 'Edit', 'quiet', '0')}</div><div><dt>Your day ${answered.includes(1) ? '' : '· editable preset'}</dt><dd>${timeLabel(p.wake)} to ${timeLabel(p.sleep)}<small>${p.meals.length} meal or rest periods · ${p.commitments.length} other commitments</small></dd>${button('edit-step', 'Edit', 'quiet', '1')}</div><div><dt>School</dt><dd>${timeLabel(p.schoolStart)} to ${timeLabel(p.schoolEnd)}<small>${esc(dayNames(p.schoolDays))}</small></dd>${button('edit-step', 'Edit', 'quiet', '2')}</div><div><dt>Tuition</dt><dd>${timeLabel(p.tuitionStart)} to ${timeLabel(p.tuitionEnd)}<small>${esc(dayNames(p.tuitionDays))}</small></dd>${button('edit-step', 'Edit', 'quiet', '2')}</div><div><dt>Study rhythm ${answered.includes(3) ? '' : '· editable preset'}</dt><dd>${p.sessionMinutes} minutes of focus · ${p.breakMinutes}-minute breaks</dd>${button('edit-step', 'Edit', 'quiet', '3')}</div><div><dt>Personal preparation</dt><dd>${recorded ? recorded + ' chapters with your status' : 'No chapter statuses added'}<small>Everything else stays unknown.</small></dd>${button('edit-step', 'Edit', 'quiet', '4')}</div><div><dt>Extra support</dt><dd>${p.difficultSubjects.length ? p.difficultSubjects.map(id => esc(subjectById(id)?.title ?? id)).join(', ') : 'No preference added'}</dd>${button('edit-step', 'Edit', 'quiet', '5')}</div></dl><div class="onboarding-explainer">${icon('leaf')}<p>BLOOM will propose a realistic first plan. You can review and change every session before adding it. All these answers stay editable.</p></div></div>`;
}
const titles = ['Let’s make this yours.', 'Make room for real life.', 'What does your week look like?', 'Find your study rhythm.', 'Where are you starting?', 'What needs more care?', 'A good place to begin.'];
const descriptions = ['A few things about you will help BLOOM find a useful next step. Your five confirmed subjects are already here.', 'Tell me the edges of your day. The times below are editable planning presets until you confirm them.', 'Set usual times and choose only the days that actually repeat. Every individual date can be different.', 'Short or long, early or late. Your plan should fit the way you can actually study.', 'Choose a subject, select a few chapters, and tell me where you are. You can do the rest whenever you’re ready.', 'Your answers help balance study within exam priorities. Choose only what you know about yourself.', 'Here’s what your workspace will use. No study history, marks or progress has been invented.'];
export function renderOnboarding(host) {
    const state = host.getState(), p = profile(state), step = Math.min(6, Math.max(0, state.onboarding?.step ?? 0));
    const body = [() => welcomeFields(state), () => dayFields(p), () => commitmentFields(p), () => rhythmFields(state, p), () => preparationFields(state), () => priorityFields(p), () => reviewFields(state, p)][step]();
    return `<main id="content" class="onboarding" data-onboarding-screen data-step="${step}" tabindex="-1"><header class="onboarding-top"><a href="#content" class="wordmark" aria-label="BLOOM"><img src="./art/mark.svg" alt="" aria-hidden="true">BLOOM</a><div class="onboarding-accessibility"><label><input type="checkbox" name="onboardingReduceMotion"${checked(state.reduceMotion)}>Reduce motion</label><span data-onboarding-save role="status">Your answers save on this device</span></div></header><div class="onboarding-layout"><aside class="onboarding-aside"><p class="eyebrow">YOUR PERSONAL STUDY COMPANION</p><h2>A little clarity.<br>Room to bloom.</h2><p>We’ll handle the organisation.<br>You can focus on learning.</p><div class="onboarding-botanical" aria-hidden="true"><img src="./art/cosmos.webp" alt=""></div><ol aria-label="Personalisation steps">${steps.map((label, index) => `<li${index === step ? ' aria-current="step"' : ''}><span>${index < step ? icon('check') : String(index + 1).padStart(2, '0')}</span>${label}</li>`).join('')}</ol></aside><section class="onboarding-card"><div class="onboarding-progress" role="progressbar" aria-label="Setup progress" aria-valuemin="0" aria-valuemax="7" aria-valuenow="${step + 1}"><span style="width:${(step + 1) / 7 * 100}%"></span></div><div class="onboarding-step-label">${step + 1} of 7 <span>${step === 0 ? 'Essential' : 'Optional · editable later'}</span></div><div class="onboarding-heading"><h1 tabindex="-1">${titles[step]}</h1><p>${descriptions[step]}</p></div><form id="onboarding-form" data-step="${step}">${body}<p class="form-error" data-onboarding-error role="alert"></p><footer class="onboarding-footer">${step ? button('back', 'Back', 'outline') : '<span></span>'}<div>${step > 0 && step < 6 ? button('skip', 'Skip for now') : ''}<button type="submit" class="button primary">${step === 6 ? 'Prepare my first plan' : step === 0 ? 'Let’s begin' : 'Continue'}${icon('arrow-right')}</button></div></footer>${step > 0 && step < 6 ? `<button type="button" class="onboarding-start-essential" data-onboarding="essentials">Start with essentials instead</button>` : ''}</form><p class="onboarding-privacy">${icon('leaf')}Your preparation is personal. No viewer or sharing account is created.</p></section></div></main>`;
}
function rangesFrom(form, kind) {
    return [...form.querySelectorAll(`[data-range="${kind}"]`)].flatMap(row => { const get = (key) => (row.querySelector(`[data-range-field="${key}"]`)?.value ?? '').trim(), start = get('start'), end = get('end'); return start && end && start < end ? [{ start, end, label: get('label') || (kind === 'meals' ? 'Meal or rest' : 'Personal commitment') }] : []; });
}
function readStep(state, form, step) {
    const next = structuredClone(state), data = new FormData(form), p = profile(next), onboarding = { step: 0, completed: false, ...next.onboarding };
    const get = (key) => String(data.get(key) ?? '').trim();
    const all = (key) => data.getAll(key).map(String);
    const times = (keys) => { for (const key of keys) {
        const value = get(key);
        if (/^([01]\d|2[0-3]):[0-5]\d$/.test(value))
            p[key] = value;
    } };
    const number = (key, min, max) => { const value = Number(get(key)); if (Number.isInteger(value) && value >= min && value <= max)
        p[key] = value; };
    if (step === 0) {
        next.name = get('name').slice(0, 36);
        onboarding.medium = get('medium') || undefined;
    }
    if (step === 1) {
        times(['wake', 'sleep']);
        p.meals = rangesFrom(form, 'meals');
        p.commitments = rangesFrom(form, 'commitments');
    }
    if (step === 2) {
        times(['schoolStart', 'schoolEnd', 'tuitionStart', 'tuitionEnd']);
        number('travelMinutes', 0, 180);
        p.schoolDays = all('schoolDays').map(Number).filter(n => n >= 0 && n <= 6);
        p.tuitionDays = all('tuitionDays').map(Number).filter(n => n >= 0 && n <= 6);
    }
    if (step === 3) {
        number('sessionMinutes', 10, 90);
        number('breakMinutes', 5, 30);
        p.preferredPeriods = all('preferredPeriods').filter(value => ['morning', 'afternoon', 'evening'].includes(value));
        onboarding.motivation = get('motivation') === 'structured' ? 'structured' : 'gentle';
        next.life.achievements = onboarding.motivation === 'structured';
        next.life.reminders.enabled = data.has('reminders');
        next.study.focusMinutes = p.sessionMinutes;
        next.study.breakMinutes = p.breakMinutes;
    }
    if (step === 5) {
        p.difficultSubjects = all('difficultSubjects').filter(id => subjects.some(subject => subject.id === id));
        p.confidentSubjects = all('confidentSubjects').filter(id => subjects.some(subject => subject.id === id) && !p.difficultSubjects.includes(id));
        p.focus = ['learning', 'revision', 'balanced'].includes(get('focus')) ? get('focus') : 'balanced';
    }
    next.personalisation = p;
    next.onboarding = onboarding;
    return next;
}
function validation(form, step) {
    const value = (name) => form.elements.namedItem(name)?.value ?? '';
    if (step === 0 && !value('name').trim())
        return 'What name or nickname would you like to use?';
    if (step === 1 && value('wake') >= value('sleep'))
        return 'Choose a sleep time later than your wake-up time. Overnight routines can be added as individual commitments.';
    if (step === 2 && (value('schoolStart') >= value('schoolEnd') || value('tuitionStart') >= value('tuitionEnd')))
        return 'Each commitment needs a finish time later than its start.';
    if (step === 1) {
        for (const row of form.querySelectorAll('[data-range]')) {
            const start = row.querySelector('[data-range-field="start"]').value, end = row.querySelector('[data-range-field="end"]').value;
            if ((start || end) && (!start || !end || start >= end))
                return 'Add both a start and finish for each commitment, with the finish later than the start.';
        }
    }
    return '';
}
function showError(message, form) { const target = (form ?? document).querySelector('[data-onboarding-error]'); if (target)
    target.textContent = message; }
function restoreFocus(name, start, end) {
    requestAnimationFrame(() => { const element = document.getElementById('onboarding-form')?.querySelector(`[name="${CSS.escape(name)}"]`); element?.focus({ preventScroll: true }); if (element && start !== null)
        try {
            element.setSelectionRange(start, end ?? start);
        }
        catch { /* Time and numeric inputs do not expose selections. */ } });
}
async function storeForm(host, form, step, nextStep = step, answered = false) {
    const focus = document.activeElement, name = focus?.name ?? '', start = focus?.selectionStart ?? null, end = focus?.selectionEnd ?? null;
    const next = readStep(host.getState(), form, step);
    next.onboarding = { ...next.onboarding, step: nextStep, answered: answered ? [...new Set([...(next.onboarding?.answered ?? []), step])] : next.onboarding?.answered };
    const saved = await host.commit(next);
    if (saved && nextStep === step && name)
        restoreFocus(name, start, end);
    if (!saved)
        showError('Your answers could not be saved. Please try again.');
    return saved;
}
function focusHeading() { requestAnimationFrame(() => document.querySelector('.onboarding-heading h1')?.focus({ preventScroll: true })); window.scrollTo({ top: 0, behavior: 'instant' }); }
/** Edit one section in place; changing preferences does not restart setup or apply a plan. */
export function openPersonalisation(host, section = 'day') {
    const state = host.getState(), p = profile(state), step = { profile: 0, day: 1, commitments: 2, rhythm: 3, priorities: 5 }[section];
    const content = step === 0 ? welcomeFields(state) : step === 1 ? dayFields(p) : step === 2 ? commitmentFields(p) : step === 3 ? rhythmFields(state, p) : priorityFields(p);
    const dialog = host.show(steps[step], `<form class="onboarding-edit" id="onboarding-edit" data-step="${step}">${content}<p class="form-error" data-onboarding-error role="alert"></p><div class="dialog-actions"><button type="submit" class="button primary">Save changes ${icon('check')}</button></div><p class="onboarding-help">Your existing study plan stays unchanged. Review a new proposal in Planner whenever you’re ready.</p></form>`);
    dialog.querySelector('form').onsubmit = async (event) => { event.preventDefault(); const form = event.currentTarget, error = validation(form, step); if (error) {
        showError(error, form);
        return;
    } const next = readStep(host.getState(), form, step); next.onboarding = { ...next.onboarding, answered: [...new Set([...(next.onboarding?.answered ?? []), step])] }; await host.commit(next, 'Your preferences are saved.'); };
}
function updateSelectionDom() {
    const count = selection.size;
    const badge = document.querySelector('[data-selection-badge]');
    if (badge)
        badge.textContent = count ? `${count} selected` : 'Select chapters to batch-rate';
    const apply = document.querySelector('[data-onboarding="apply-status"]');
    if (apply) {
        apply.disabled = !count;
        apply.textContent = `Apply to ${count}`;
    }
    const bulkBtns = document.querySelectorAll('[data-onboarding="bulk-rating"], [data-onboarding="bulk-status"]');
    bulkBtns.forEach(btn => { btn.disabled = !count; });
    const list = chapters.filter(chapter => chapter.subject === selectedSubject);
    const selectAllBtn = document.querySelector('[data-onboarding="select-all"]');
    if (selectAllBtn)
        selectAllBtn.textContent = count === list.length ? 'Clear selection' : 'Select all chapters';
    document.querySelectorAll('.onboarding-chapter-row').forEach(row => {
        const chId = row.dataset.rowChapter;
        if (chId)
            row.classList.toggle('is-selected', selection.has(chId));
    });
}
export function initOnboarding(host, onComplete) {
    if (registered)
        return;
    registered = true;
    document.addEventListener('submit', event => {
        const form = event.target;
        if (form.id !== 'onboarding-form')
            return;
        event.preventDefault();
        clearTimeout(saveTimer);
        const step = Number(form.dataset.step), error = validation(form, step);
        if (error) {
            showError(error, form);
            return;
        }
        if (!form.reportValidity())
            return;
        const snapshot = form.cloneNode(true);
        copyValues(form, snapshot);
        saving = saving.then(async () => { if (step === 6) {
            const next = structuredClone(host.getState());
            next.onboarding = { ...next.onboarding, step: 6, completed: true };
            if (await host.commit(next))
                onComplete();
            return;
        } if (await storeForm(host, snapshot, step, step + 1, true))
            focusHeading(); });
    });
    document.addEventListener('input', event => { const input = event.target, form = input.closest('#onboarding-form'); if (!form || input.type === 'checkbox' || input.type === 'radio')
        return; clearTimeout(saveTimer); saveTimer = window.setTimeout(() => persist(host), 600); });
    document.addEventListener('change', event => {
        const input = event.target;
        if (input.name === 'onboardingReduceMotion') {
            const next = structuredClone(host.getState());
            next.reduceMotion = input.checked;
            void host.commit(next);
            return;
        }
        if (input.dataset.onboardingChapter) {
            const id = input.dataset.onboardingChapter;
            if (input.checked)
                selection.add(id);
            else
                selection.delete(id);
            updateSelectionDom();
            return;
        }
        if (input.closest('#onboarding-form')) {
            clearTimeout(saveTimer);
            persist(host);
        }
    });
    document.addEventListener('click', event => {
        const element = event.target.closest('[data-onboarding]');
        if (!element)
            return;
        const action = element.dataset.onboarding, value = element.dataset.value ?? '', form = element.closest('form') ?? document.querySelector('#onboarding-form');
        if (!action || !form)
            return;
        const step = Number(form.dataset.step);
        if (action === 'add-meal' || action === 'add-commitment') {
            const kind = action === 'add-meal' ? 'meals' : 'commitments';
            form.querySelector(`[data-onboard-ranges="${kind}"]`)?.insertAdjacentHTML('beforeend', rangeFields(kind, [{ label: '', start: '', end: '' }]));
            return;
        }
        if (action === 'remove-range') {
            element.closest('[data-range]')?.remove();
            if (form.id === 'onboarding-form')
                persist(host);
            return;
        }
        clearTimeout(saveTimer);
        if (action === 'subject') {
            selectedSubject = value;
            selection.clear();
            persist(host);
            return;
        }
        if (action === 'select-all') {
            const list = chapters.filter(chapter => chapter.subject === selectedSubject);
            if (selection.size === list.length)
                selection.clear();
            else
                selection = new Set(list.map(chapter => chapter.id));
            document.querySelectorAll('input[data-onboarding-chapter]').forEach(input => {
                input.checked = selection.has(input.dataset.onboardingChapter);
            });
            updateSelectionDom();
            return;
        }
        if (action === 'set-chapter-rating') {
            const chapterId = element.dataset.chapter, rating = element.dataset.rating;
            if (!chapterId || !rating)
                return;
            saving = saving.then(async () => {
                const next = structuredClone(host.getState());
                const current = next.progress[chapterId];
                if (current?.rating === rating) {
                    if (current.status && current.status !== 'Needs revision') {
                        delete current.rating;
                    }
                    else {
                        delete next.progress[chapterId];
                    }
                }
                else {
                    const defaultStatus = current?.status ?? (rating === 'Difficult' ? 'Needs revision' : rating === 'Okay' ? 'Learning' : 'Completed');
                    next.progress[chapterId] = {
                        ...current,
                        status: defaultStatus,
                        rating
                    };
                }
                await host.commit(next, `Rated ${rating}.`);
            });
            return;
        }
        if (action === 'bulk-rating') {
            const rating = element.dataset.rating;
            if (!rating || !selection.size)
                return;
            const selectedIds = [...selection];
            selection.clear();
            saving = saving.then(async () => {
                const next = structuredClone(host.getState());
                for (const id of selectedIds) {
                    const current = next.progress[id];
                    const defaultStatus = current?.status ?? (rating === 'Difficult' ? 'Needs revision' : rating === 'Okay' ? 'Learning' : 'Completed');
                    next.progress[id] = {
                        ...current,
                        status: defaultStatus,
                        rating
                    };
                }
                await host.commit(next, `${selectedIds.length} chapter${selectedIds.length > 1 ? 's' : ''} marked ${rating}.`);
            });
            return;
        }
        if (action === 'bulk-status') {
            const status = element.dataset.status;
            if (!status || !selection.size)
                return;
            const selectedIds = [...selection];
            selection.clear();
            saving = saving.then(async () => {
                const next = structuredClone(host.getState());
                for (const id of selectedIds) {
                    if (status === 'Pending') {
                        delete next.progress[id];
                    }
                    else {
                        next.progress[id] = {
                            ...next.progress[id],
                            status
                        };
                    }
                }
                await host.commit(next, `${selectedIds.length} chapter${selectedIds.length > 1 ? 's' : ''} updated.`);
            });
            return;
        }
        if (action === 'apply-status') {
            const status = form.elements.namedItem('bulkStatus')?.value, rating = form.elements.namedItem('bulkRating')?.value;
            if (!learningStates.some(([value]) => value === status) && !rating) {
                showError('Choose a learning status or difficulty to apply.', form);
                return;
            }
            const selectedIds = [...selection];
            selection.clear();
            saving = saving.then(async () => {
                const next = structuredClone(host.getState());
                for (const id of selectedIds) {
                    const current = next.progress[id];
                    const finalStatus = status || current?.status || (rating === 'Difficult' ? 'Needs revision' : rating === 'Okay' ? 'Learning' : 'Completed');
                    next.progress[id] = {
                        ...current,
                        status: finalStatus,
                        ...(rating ? { rating } : {})
                    };
                }
                await host.commit(next, 'Chapter preparation saved.');
            });
            return;
        }
        if (['back', 'skip', 'essentials', 'edit-step'].includes(action)) {
            const target = action === 'back' ? Math.max(0, step - 1) : action === 'skip' ? Math.min(6, step + 1) : action === 'essentials' ? 6 : Number(value), snapshot = form.cloneNode(true);
            copyValues(form, snapshot);
            saving = saving.then(async () => { if (await storeForm(host, snapshot, step, target, false))
                focusHeading(); });
        }
    });
}
function copyValues(source, target) {
    const old = [...source.querySelectorAll('input,select,textarea')], fresh = [...target.querySelectorAll('input,select,textarea')];
    old.forEach((input, index) => { fresh[index].value = input.value; if (input instanceof HTMLInputElement && fresh[index] instanceof HTMLInputElement)
        fresh[index].checked = input.checked; });
}
function persist(host) {
    const form = document.querySelector('#onboarding-form');
    if (!form)
        return;
    const snapshot = form.cloneNode(true);
    copyValues(form, snapshot);
    const step = Number(form.dataset.step);
    saving = saving.then(async () => { const current = host.getState().onboarding; if (current?.completed || current?.step !== undefined && current.step !== step)
        return; await storeForm(host, snapshot, step); });
}
