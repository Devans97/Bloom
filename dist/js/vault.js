import { esc } from './host.js';
import { empty, statuses, ratings } from './model.js';
import { subjects, chapterById } from './curriculum.js';
import { studyDefaults, resultError } from './study-data.js';
import { lifeDefaults } from './life-data.js';
import { validPlannerDate } from './import-parser.js';
import { activityById, emptyAcademicState, nodeById } from './academic-data.js';
import { seal, unseal, isEnvelope, getVaultPassphrase, setVaultPassphrase } from './crypto-vault.js';
export { getVaultPassphrase, setVaultPassphrase, isEnvelope } from './crypto-vault.js';
let host, initialized = false, session = null, baseRevision = null;
function config() {
    const candidate = globalThis.BLOOM_CONFIG;
    if (!candidate?.supabaseUrl || !candidate.supabaseAnonKey)
        return null;
    try {
        const url = new URL(candidate.supabaseUrl);
        if (url.protocol !== 'https:' || !url.hostname.endsWith('.supabase.co') || url.username || url.password || url.port || url.pathname !== '/')
            return null;
        return { supabaseUrl: url.origin, supabaseAnonKey: candidate.supabaseAnonKey };
    }
    catch {
        return null;
    }
}
const record = (value) => Boolean(value && typeof value === 'object' && !Array.isArray(value));
const fail = (message) => { throw new Error('This backup cannot be restored: ' + message); };
const text = (value, max = 100000) => typeof value === 'string' && value.length <= max;
const time = (value) => typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const day = (value, optional = false) => typeof value === 'string' && ((optional && value === '') || validPlannerDate(value));
const subject = (value, optional = false) => typeof value === 'string' && ((optional && value === '') || subjects.some(s => s.id === value));
const array = (value, name) => { if (!Array.isArray(value) || value.length > 20000)
    fail(name + ' has an invalid or oversized list.'); return value; };
const finite = (value, min, max) => typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
function checkTree(value, depth = 0) {
    if (depth > 24)
        fail('data is nested too deeply.');
    if (typeof value === 'string' && value.length > 1_500_000)
        fail('a text field is too large.');
    if (Array.isArray(value)) {
        if (value.length > 20000)
            fail('a list is too large.');
        value.forEach(x => checkTree(x, depth + 1));
    }
    else if (record(value)) {
        if (Object.keys(value).length > 20000)
            fail('a record is too large.');
        for (const [key, item] of Object.entries(value)) {
            if (['__proto__', 'constructor', 'prototype'].includes(key))
                fail('an unsafe field was found.');
            checkTree(item, depth + 1);
        }
    }
}
function checkDay(value) {
    return record(value) && time(value.start) && time(value.end) && value.start < value.end && finite(value.limit, 0, 720) && typeof value.school === 'boolean' && typeof value.tuition === 'boolean'
        && (value.lateStart === undefined || time(value.lateStart)) && (value.lateEnd === undefined || time(value.lateEnd));
}
function checkIDs(items, label) {
    const ids = new Set();
    for (const item of items) {
        if (!record(item) || !text(item.id, 200) || !item.id || ids.has(item.id))
            fail(label + ' contains a missing or repeated identifier.');
        ids.add(item.id);
    }
}
/** Reject unsafe or incomplete backups before any record is replaced. No inferred study activity. */
export function validateVaultState(value) {
    checkTree(value);
    if (record(value) && value.format === 'bloom-export' && value.version === 1)
        value = value.data;
    if (!record(value) || !text(value.name, 36))
        fail('the profile is missing.');
    const source = value;
    const tasks = array(source.tasks, 'Tasks'), tests = array(source.tests, 'Tests'), reviews = array(source.reviews, 'Revisions');
    checkIDs(tasks, 'Tasks');
    checkIDs(tests, 'Tests');
    if (source.defaults !== null && !checkDay(source.defaults))
        fail('the study routine is invalid.');
    if (!record(source.days) || !record(source.progress))
        fail('the schedule or progress is invalid.');
    for (const [key, d] of Object.entries(source.days))
        if (!day(key) || !checkDay(d))
            fail('a daily routine is invalid.');
    for (const rawItem of tasks) {
        const item = rawItem;
        if (!record(item) || !text(item.title, 140) || !day(item.day) || !text(item.time, 5) || (item.time !== '' && !time(item.time)) || !finite(item.minutes, 5, 240) || !subject(item.subject, true) || !text(item.chapter, 100) || !['Normal', 'High', 'Low'].includes(String(item.priority)) || typeof item.done !== 'boolean' || !day(item.due, true) || (item.activityId !== undefined && typeof item.activityId !== 'string'))
            fail('a task is invalid.');
        if (item.chapter && chapterById(String(item.chapter))?.subject !== item.subject)
            fail('a task chapter does not match its subject.');
        if (item.activityId && (!activityById(String(item.activityId)) || nodeById(activityById(String(item.activityId)).nodeId)?.chapterId !== item.chapter))
            fail('a task activity does not match its chapter.');
        if (item.finished !== undefined && !day(item.finished))
            fail('a task completion date is invalid.');
        if (item.reason !== undefined && !text(item.reason, 10000))
            fail('a task reason is invalid.');
    }
    for (const item of tests) {
        if (!record(item) || !text(item.title, 100) || !day(item.day) || !subject(item.subject) || !Array.isArray(item.coverage) || item.coverage.some(id => typeof id !== 'string' || chapterById(id)?.subject !== item.subject))
            fail('a test or its coverage is invalid.');
    }
    for (const [id, p] of Object.entries(source.progress)) {
        if (!chapterById(id) || !record(p) || !statuses.includes(p.status) || (p.rating !== undefined && !ratings.includes(p.rating)) || (p.last !== undefined && !day(p.last)) || (p.next !== undefined && !day(p.next)))
            fail('a chapter progress entry is invalid.');
    }
    for (const r of reviews)
        if (!record(r) || typeof r.chapter !== 'string' || !chapterById(r.chapter) || !day(r.date) || !ratings.includes(r.rating))
            fail('a revision entry is invalid.');
    if (source.avatar !== undefined && (!text(source.avatar, 1_500_000) || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(source.avatar)))
        fail('the profile photo is invalid.');
    if (typeof source.reduceMotion !== 'boolean')
        fail('motion preferences are invalid.');
    for (const key of ['dismissedTips', 'tipsSeen'])
        if (source[key] !== undefined && (!Array.isArray(source[key]) || source[key].some(x => !text(x, 200))))
            fail('tour preferences are invalid.');
    if (source.tourStatus !== undefined && !['pending', 'in-progress', 'skipped', 'complete'].includes(String(source.tourStatus)))
        fail('the tour state is invalid.');
    const next = { ...empty(), ...source, academic: { ...emptyAcademicState(), ...(record(source.academic) ? source.academic : {}), topicProgress: record(source.academic) && record(source.academic.topicProgress) ? source.academic.topicProgress : {}, activities: record(source.academic) && record(source.academic.activities) ? source.academic.activities : {} }, study: { ...studyDefaults(), ...(record(source.study) ? source.study : {}) }, life: { ...lifeDefaults(), ...(record(source.life) ? source.life : {}) } };
    if (next.academic.curriculumVersion !== 'cbse-xii-2026-27-v1')
        fail('the academic curriculum version is not supported.');
    if (!record(next.academic.topicProgress) || !record(next.academic.activities))
        fail('topic or activity progress is invalid.');
    const learningStatuses = ['not-started', 'learning', 'learned', 'practice-needed', 'revision-due', 'assessment-ready', 'needs-work'];
    for (const [id, p] of Object.entries(next.academic.topicProgress)) {
        if (!['topic', 'concept'].includes(String(nodeById(id)?.kind)) || !record(p) || !learningStatuses.includes(p.status) || !text(p.updatedAt, 60) || (p.lastStudied !== undefined && !day(p.lastStudied)) || (p.nextReview !== undefined && !day(p.nextReview)) || (p.rating !== undefined && !ratings.includes(p.rating)) || (p.assessmentScore !== undefined && !finite(p.assessmentScore, 0, 10000)) || (p.assessmentMax !== undefined && !finite(p.assessmentMax, 0.01, 10000)))
            fail('a topic progress entry is invalid.');
        if (p.assessmentScore !== undefined && p.assessmentMax !== undefined && p.assessmentScore > p.assessmentMax)
            fail('topic assessment marks are invalid.');
    }
    for (const [id, r] of Object.entries(next.academic.activities)) {
        const definition = activityById(id);
        if (!definition || !record(r) || r.activityId !== id || !['not-started', 'in-progress', 'paused', 'completed'].includes(String(r.status)) || !Array.isArray(r.completedSteps) || r.completedSteps.some(step => typeof step !== 'string' || !definition.steps.some(known => known.id === step)) || new Set(r.completedSteps).size !== r.completedSteps.length || !text(r.updatedAt, 60) || (r.startedAt !== undefined && !text(r.startedAt, 60)) || (r.completedAt !== undefined && !text(r.completedAt, 60)) || (r.questionsAttempted !== undefined && !finite(r.questionsAttempted, 0, 100000)) || (r.questionsCorrect !== undefined && !finite(r.questionsCorrect, 0, 100000)) || (r.questionsIncorrect !== undefined && !finite(r.questionsIncorrect, 0, 100000)) || (r.doubt !== undefined && !text(r.doubt, 4000)) || (r.notes !== undefined && !text(r.notes, 4000)) || (r.understanding !== undefined && !ratings.includes(r.understanding)))
            fail('a learning activity record is invalid.');
        if (r.questionsCorrect !== undefined && r.questionsIncorrect !== undefined && r.questionsAttempted !== undefined && Number(r.questionsCorrect) + Number(r.questionsIncorrect) > Number(r.questionsAttempted))
            fail('practice counts do not match attempts.');
    }
    for (const [list, label] of [[next.study.sessions, 'Focus sessions'], [next.study.mistakes, 'Mistakes'], [next.study.results, 'Test results'], [next.life.papers, 'Papers'], [next.life.practicals, 'Practicals'], [next.life.writing, 'Writing practice'], [next.life.letters, 'Letters']]) {
        array(list, label);
        checkIDs(list, label);
    }
    if (!finite(next.study.focusMinutes, 1, 240) || !finite(next.study.breakMinutes, 1, 60))
        fail('focus preferences are invalid.');
    for (const s of next.study.sessions)
        if (!text(s.title, 200) || !subject(s.subject, true) || !text(s.chapter, 100) || !day(s.day) || !finite(s.seconds, 0, 86400) || !['focus', 'break'].includes(s.kind) || !text(s.endedAt, 60))
            fail('a focus session is invalid.');
    for (const m of next.study.mistakes)
        if (!subject(m.subject) || !text(m.chapter, 100) || !text(m.note) || !text(m.source, 1000) || !day(m.due, true) || typeof m.resolved !== 'boolean' || !Array.isArray(m.retries) || m.retries.some(x => !day(x)))
            fail('a mistake entry is invalid.');
    for (const result of next.study.results) {
        if (!text(result.title, 200) || !day(result.day) || !subject(result.subject) || !finite(result.score, 0, 10000) || !finite(result.max, 0.01, 10000) || !Array.isArray(result.questions) || !['manual', 'checked sheet'].includes(result.source) || !text(result.note))
            fail('a test result is invalid.');
        for (const q of result.questions)
            if (!record(q) || !text(q.id, 200) || !text(q.label, 100) || !finite(q.score, 0, 10000) || !finite(q.max, 0.01, 10000) || !text(q.chapter, 100) || !text(q.category, 100) || !text(q.note))
                fail('a question result is invalid.');
        if (resultError(result))
            fail('test marks do not add up.');
    }
    if (next.study.activeFocus !== null) {
        const f = next.study.activeFocus;
        if (!record(f) || !text(f.id, 200) || !text(f.title, 200) || !subject(f.subject, true) || !text(f.chapter, 100) || !finite(f.targetSeconds, 1, 86400) || !finite(f.elapsedMs, 0, 86400000) || (f.runningSince !== null && !finite(f.runningSince, 0, 1e15)) || !['focus', 'break'].includes(String(f.kind)))
            fail('the active timer is invalid.');
    }
    for (const p of next.life.papers)
        if (!text(p.resource, 1000) || !subject(p.subject) || !text(p.title, 200) || !day(p.day) || !text(p.note))
            fail('a paper attempt is invalid.');
    for (const p of next.life.practicals)
        if (!subject(p.subject) || !text(p.title, 300) || !['Practical', 'Viva', 'Project', 'File', 'Other'].includes(p.kind) || !day(p.due, true) || typeof p.done !== 'boolean')
            fail('a practical entry is invalid.');
    for (const w of next.life.writing)
        if (!text(w.title, 200) || !subject(w.subject) || !text(w.prompt) || !text(w.answer) || !Array.isArray(w.checks) || w.checks.some(x => !text(x, 300)) || !text(w.createdAt, 60) || !text(w.updatedAt, 60))
            fail('a writing entry is invalid.');
    for (const l of next.life.letters)
        if (!text(l.title, 200) || !text(l.body) || !day(l.reveal) || !text(l.createdAt, 60))
            fail('a future letter is invalid.');
    if (typeof next.life.achievements !== 'boolean' || !record(next.life.reminders) || typeof next.life.reminders.enabled !== 'boolean' || !time(next.life.reminders.quietFrom) || !time(next.life.reminders.quietTo) || !Array.isArray(next.life.reminders.notified) || next.life.reminders.notified.some(x => !text(x, 300)))
        fail('reminder preferences are invalid.');
    return next;
}
const account = () => session ? `Signed in as ${session.email}` : 'Not signed in';
const button = (action, label, kind = 'outline') => `<button type="button" class="button ${kind}" data-vault-action="${action}">${esc(label)}</button>`;
export function renderVaultPage(_host) {
    const configured = config(), encrypted = Boolean(getVaultPassphrase());
    return `<div class="page vault-page"><div class="intro"><p class="eyebrow">YOUR RECORDS, YOUR CONTROL</p><h1>Privacy & backup</h1><p class="muted">Keep a private backup and control what leaves this device.</p></div><section class="vault-panel"><div class="section-head"><div><h2>On this device</h2><p>${encrypted ? 'Encrypted with your vault passphrase.' : 'Local records are not encrypted yet.'}</p></div><span class="vault-badge">${encrypted ? 'Encrypted' : 'Device storage'}</span></div><p class="muted">Choose a passphrase only Aastha knows. BLOOM never sends or saves it. If it is lost, encrypted backups cannot be recovered.</p><div class="vault-actions">${encrypted ? button('lock', 'Lock BLOOM') : button('enable', 'Protect local records', 'primary')}${button('export', 'Export encrypted backup')}${button('restore', 'Restore a backup')}</div></section><section class="vault-panel"><div class="section-head"><div><h2>Private cloud copy</h2><p>${esc(account())}</p></div></div>${configured ? `<p class="muted">Optional: connect Aastha’s approved account. Only an encrypted vault and revision number are stored. Signing in does not upload your records.</p><div class="vault-actions">${session ? button('pull', 'Review cloud copy') + button('push', 'Save device to cloud', 'primary') + button('signout', 'Sign out') : button('signin', 'Sign in to Aastha’s account', 'primary')}</div><small class="muted">Sync happens only when you choose it. Your sign-in token stays in memory for this open session.</small>` : '<p class="muted">A private cloud account has not been configured for this build. Local study and encrypted backups work without it. Cross-device sync becomes available after the approved project, account and security policies are set up.</p>'}</section><p class="vault-footnote">A passphrase protects stored data and backups. Anyone controlling the device or hosting the app’s code could still capture data while the vault is open. Use Aastha’s own device and an owner-controlled, trusted deployment.</p><p class="vault-feedback" role="status" aria-live="polite"></p></div>`;
}
function showForm(title, body, submit) {
    const dialog = host.show(title, `<form class="vault-form">${body}<p class="form-error" role="alert"></p><button type="submit" class="button primary">${esc(submit)}</button></form>`);
    return { dialog, form: dialog.querySelector('form'), error: dialog.querySelector('.form-error') };
}
function passphraseForm(title, action, newKey = false) {
    const { dialog, form, error } = showForm(title, `<p class="muted">${newKey ? 'Use at least 12 characters. Save it somewhere only you control; there is no passphrase recovery.' : 'Enter the passphrase used for this vault.'}</p><label>Vault passphrase<input type="password" name="passphrase" autocomplete="${newKey ? 'new-password' : 'current-password'}" required ${newKey ? 'minlength="12"' : ''} maxlength="1024"></label>${newKey ? '<label>Repeat passphrase<input type="password" name="confirm" autocomplete="new-password" required minlength="12" maxlength="1024"></label>' : ''}`, 'Continue');
    form.onsubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(form), pass = String(data.get('passphrase') ?? '');
        error.textContent = '';
        if (newKey && pass !== data.get('confirm')) {
            error.textContent = 'The passphrases do not match.';
            return;
        }
        const submit = form.querySelector('[type=submit]');
        submit.disabled = true;
        try {
            await action(pass);
            if (dialog.open)
                await host.closeDialog(dialog);
        }
        catch (e) {
            error.textContent = e instanceof Error ? e.message : 'This action could not finish.';
            submit.disabled = false;
        }
    };
}
function downloadEnvelope(envelope) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(envelope)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bloom-private-backup-' + new Date().toISOString().slice(0, 10) + '.bloom.json';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function summary(state) {
    return `<dl class="vault-summary"><div><dt>Profile</dt><dd>${esc(state.name || 'No name set')}</dd></div><div><dt>Study tasks</dt><dd>${state.tasks.length}</dd></div><div><dt>School tests</dt><dd>${state.tests.length}</dd></div><div><dt>Chapter records</dt><dd>${Object.keys(state.progress).length}</dd></div><div><dt>Test results</dt><dd>${state.study.results.length}</dd></div><div><dt>Focus sessions</dt><dd>${state.study.sessions.length}</dd></div></dl>`;
}
function reviewRestore(candidate, after) {
    const dialog = host.show('Review your backup', `<div class="vault-review"><p class="muted">This will replace this device’s study records with the checked backup below. Export the current device first if you want to keep both versions.</p>${summary(candidate)}<div class="vault-actions">${button('review-export', 'Back up current device')}${button('review-apply', 'Replace this device’s records', 'primary')}</div><p class="form-error" role="alert"></p></div>`);
    dialog.querySelector('[data-vault-action="review-export"]').addEventListener('click', () => exportBackup());
    dialog.querySelector('[data-vault-action="review-apply"]').addEventListener('click', async () => {
        const btn = dialog.querySelector('[data-vault-action="review-apply"]');
        btn.disabled = true;
        if (await host.commit(candidate, 'Backup restored on this device.')) {
            after?.();
            if (dialog.open)
                await host.closeDialog(dialog);
            host.navigate('vault');
        }
        else {
            btn.disabled = false;
            dialog.querySelector('.form-error').textContent = 'The current records were kept. Could not save the backup.';
        }
    });
}
function exportBackup() {
    const current = structuredClone(host.getState());
    const action = async (pass) => { downloadEnvelope(await seal({ format: 'bloom-export', version: 1, exportedAt: new Date().toISOString(), data: current }, pass)); host.announce('Encrypted backup exported. Keep its passphrase separately.'); };
    const pass = getVaultPassphrase();
    if (pass)
        void action(pass).catch(e => host.announce(e instanceof Error ? e.message : 'Backup failed.'));
    else
        passphraseForm('Encrypt your backup', action, true);
}
function restoreBackup() {
    const dialog = host.show('Restore an encrypted backup', `<div class="vault-form"><p class="muted">Choose a BLOOM encrypted backup. Nothing changes until you enter its passphrase and approve the records.</p><label>Encrypted backup<input id="vault-file" type="file" accept="application/json,.json,.bloom.json"></label><p class="form-error" role="alert"></p></div>`);
    dialog.querySelector('#vault-file').onchange = async (event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const error = dialog.querySelector('.form-error');
        if (file.size > 30 * 1024 * 1024) {
            error.textContent = 'Choose a backup up to 30 MB.';
            return;
        }
        let envelope;
        try {
            envelope = JSON.parse(await file.text());
            if (!isEnvelope(envelope))
                throw new Error('Choose an encrypted BLOOM backup file.');
        }
        catch (e) {
            error.textContent = e instanceof Error ? e.message : 'Could not read that backup.';
            return;
        }
        passphraseForm('Unlock the backup', async (pass) => { const restored = validateVaultState(await unseal(envelope, pass)); window.setTimeout(() => reviewRestore(restored), 0); });
    };
}
async function request(path, method = 'GET', body) {
    const cfg = config();
    if (!cfg)
        throw new Error('Private cloud is not configured.');
    const response = await fetch(cfg.supabaseUrl + path, { method, headers: { apikey: cfg.supabaseAnonKey, 'Content-Type': 'application/json', ...(session ? { Authorization: 'Bearer ' + session.token } : {}) }, body: body === undefined ? undefined : JSON.stringify(body), credentials: 'omit', referrerPolicy: 'no-referrer' });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
        if (response.status === 401)
            throw new Error('Your cloud session expired. Sign in again.');
        if (response.status === 403)
            throw new Error('This account does not have access to the private BLOOM vault.');
        throw new Error(typeof payload?.msg === 'string' ? payload.msg : 'The private cloud request could not finish. Your local records are unchanged.');
    }
    return payload;
}
async function cloudRecord() {
    if (!session)
        throw new Error('Sign in to Aastha’s approved account first.');
    const rows = await request('/rest/v1/private_vault?select=revision,envelope,updated_at&user_id=eq.' + encodeURIComponent(session.userId));
    if (!Array.isArray(rows))
        throw new Error('The cloud returned an invalid vault response.');
    if (!rows.length)
        return null;
    const row = rows[0];
    if (!Number.isSafeInteger(row.revision) || row.revision < 1 || !isEnvelope(row.envelope) || !text(row.updated_at, 100))
        throw new Error('The cloud vault format is not supported. Local records were kept.');
    return row;
}
function signIn() {
    const { dialog, form, error } = showForm('Sign in to your private vault', `<p class="muted">Use the account created for Aastha in her approved project. BLOOM has no public sign-up. Signing in does not send study records.</p><label>Email<input type="email" name="email" autocomplete="username" required></label><label>Account password<input type="password" name="password" autocomplete="current-password" required></label>`, 'Sign in');
    form.onsubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(form), btn = form.querySelector('[type=submit]');
        btn.disabled = true;
        error.textContent = '';
        try {
            const payload = await request('/auth/v1/token?grant_type=password', 'POST', { email: String(data.get('email')), password: String(data.get('password')) });
            if (typeof payload?.access_token !== 'string' || !record(payload.user) || typeof payload.user.id !== 'string' || !/^[-a-f\d]{36}$/i.test(payload.user.id))
                throw new Error('Could not verify this cloud session.');
            session = { token: payload.access_token, userId: payload.user.id, email: String(payload.user.email ?? data.get('email')) };
            baseRevision = null;
            await cloudRecord();
            if (dialog.open)
                await host.closeDialog(dialog);
            host.navigate('vault');
            host.announce('Signed in. No study records were uploaded.');
        }
        catch (e) {
            session = null;
            error.textContent = e instanceof Error ? e.message : 'Sign-in failed.';
            btn.disabled = false;
        }
    };
}
async function pullCloud() {
    const remote = await cloudRecord();
    if (!remote) {
        host.announce('The cloud vault is empty. No local records changed.');
        return;
    }
    passphraseForm('Unlock the cloud copy', async (pass) => { const restored = validateVaultState(await unseal(remote.envelope, pass)); window.setTimeout(() => reviewRestore(restored, () => { baseRevision = remote.revision; }), 0); });
}
async function writeCloud(envelope, expected) {
    const result = await request('/rest/v1/rpc/put_private_vault', 'POST', { p_envelope: envelope, p_expected_revision: expected });
    const payload = Array.isArray(result) ? result[0] : result;
    if (payload?.status === 'saved' && Number.isSafeInteger(payload.revision)) {
        baseRevision = payload.revision;
        host.announce('Encrypted vault saved to your cloud account.');
        host.navigate('vault');
        return;
    }
    if (payload?.status === 'conflict') {
        cloudConflict(envelope);
        return;
    }
    throw new Error('The cloud save was not confirmed. Your local records are unchanged.');
}
function cloudConflict(localEnvelope) {
    const dialog = host.show('Two versions need your choice', `<div class="vault-review"><p class="muted">The cloud has a different revision. This device’s records are kept. Review the cloud copy, or explicitly replace the cloud with this device. Export either version before replacing it if you need both.</p><div class="vault-actions">${button('conflict-review', 'Review cloud copy', 'primary')}${button('conflict-export', 'Export this device')}${button('conflict-replace', 'Replace cloud with this device')}</div><p class="form-error" role="alert"></p></div>`);
    dialog.querySelector('[data-vault-action="conflict-review"]').addEventListener('click', () => void pullCloud().catch(e => host.announce(e.message)));
    dialog.querySelector('[data-vault-action="conflict-export"]').addEventListener('click', () => exportBackup());
    dialog.querySelector('[data-vault-action="conflict-replace"]').addEventListener('click', async () => {
        const latest = await cloudRecord().catch(e => { dialog.querySelector('.form-error').textContent = e.message; return undefined; });
        if (latest === undefined)
            return;
        const replace = async (pass) => { await writeCloud(localEnvelope ?? await seal(host.getState(), pass), latest?.revision ?? 0); };
        passphraseForm('Confirm replacing the cloud copy', replace);
    });
}
async function pushCloud() {
    const remote = await cloudRecord();
    if (remote && baseRevision === null) {
        cloudConflict();
        return;
    }
    if (remote && baseRevision !== remote.revision) {
        cloudConflict();
        return;
    }
    const expected = remote?.revision ?? 0;
    passphraseForm('Encrypt and save your cloud copy', async (pass) => { await writeCloud(await seal(host.getState(), pass), expected); }, !getVaultPassphrase());
}
export function initVault(value) {
    host = value;
    if (initialized)
        return;
    initialized = true;
    document.addEventListener('click', async (event) => {
        const el = event.target.closest('[data-vault-action]');
        if (!el || !host)
            return;
        const action = el.dataset.vaultAction;
        try {
            if (action === 'enable')
                passphraseForm('Protect this device', async (pass) => { const old = getVaultPassphrase(); setVaultPassphrase(pass); if (!await host.commit(structuredClone(host.getState()), 'Local records encrypted.')) {
                    setVaultPassphrase(old);
                    throw new Error('Could not encrypt local records. The previous state was kept.');
                } host.navigate('vault'); }, true);
            if (action === 'lock') {
                setVaultPassphrase(null);
                session = null;
                baseRevision = null;
                location.reload();
            }
            if (action === 'export')
                exportBackup();
            if (action === 'restore')
                restoreBackup();
            if (action === 'signin')
                signIn();
            if (action === 'pull')
                await pullCloud();
            if (action === 'push')
                await pushCloud();
            if (action === 'signout') {
                try {
                    await request('/auth/v1/logout', 'POST');
                }
                finally {
                    session = null;
                    baseRevision = null;
                    host.navigate('vault');
                    host.announce('Signed out. Local records remain on this device.');
                }
            }
        }
        catch (e) {
            host.announce(e instanceof Error ? e.message : 'The vault action could not finish. Local records were kept.');
        }
    });
}
