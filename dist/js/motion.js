import { animate as motionAnimate, hover, inView, press } from 'motion';
/** BLOOM motion: soft continuity, clear feedback, and activity-linked progress. */
export const motionTokens = Object.freeze({ press: 95, control: 220, page: 420, layout: 420, dialog: 360, exit: 160, mass: 1, stiffness: 260, damping: 30, ease: 'cubic-bezier(.2,.75,.3,1)' });
const reduced = () => document.documentElement.classList.contains('reduce') || matchMedia('(prefers-reduced-motion: reduce)').matches;
const visible = (rect) => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
let ready = false;
const managed = new Set();
const revealed = new Set();
const progressValues = new Map();
const completed = new Set();
let stopReveals;
function play(element, keyframes, options = {}) {
    if (reduced() || !element.isConnected)
        return null;
    const animation = motionAnimate(element, keyframes, options);
    managed.add(animation);
    animation.finished.catch(() => { }).finally(() => managed.delete(animation));
    return animation;
}
const rowSelector = '[data-motion-key],.task-row,.chapter-row,.idea,.test-row,.life-row,.resource-item,.writing-item,.letter-item,.milestone-list article';
function keyFor(element) {
    if (element.dataset.motionKey)
        return element.dataset.motionKey;
    if (element.dataset.drag)
        return 'task:' + element.dataset.drag;
    if (element.dataset.suggest)
        return 'idea:' + element.dataset.suggest;
    const selected = element.querySelector('[data-select]');
    if (selected)
        return 'chapter:' + selected.dataset.select;
    const check = element.querySelector('[data-life-practical]');
    if (check)
        return 'practical:' + check.dataset.lifePractical;
    const action = element.querySelector('[data-value]');
    if (action?.dataset.value)
        return (element.classList[0] ?? 'row') + ':' + action.dataset.value;
    return (element.classList[0] ?? 'row') + ':' + (element.querySelector('strong,h2,h3')?.textContent ?? '').trim();
}
export function captureLayout() {
    if (reduced())
        return [];
    const entries = [], keys = new Set();
    for (const node of document.querySelectorAll(rowSelector)) {
        const rect = node.getBoundingClientRect();
        if (!visible(rect))
            continue;
        const key = keyFor(node);
        if (!key || keys.has(key))
            continue;
        keys.add(key);
        entries.push({ key, rect, text: node.textContent ?? '', element: node });
        if (entries.length >= 10)
            break;
    }
    return entries;
}
export function animateLayout(previous = []) {
    refreshNavIndicator();
    if (reduced())
        return;
    const before = new Map(previous.map(record => [record.key, record])), seen = new Set();
    let count = 0;
    for (const node of document.querySelectorAll(rowSelector)) {
        const rect = node.getBoundingClientRect(), key = keyFor(node);
        if (!visible(rect) || seen.has(key))
            continue;
        seen.add(key);
        if (count >= 10)
            break;
        const old = before.get(key);
        if (!old) {
            play(node, { opacity: [0, 1], y: [10, 0] }, { duration: .28, ease: 'easeOut' });
            count++;
            continue;
        }
        before.delete(key);
        const x = old.rect.left - rect.left, y = old.rect.top - rect.top;
        if (Math.abs(x) > .5 || Math.abs(y) > .5) {
            play(node, { x: [x, 0], y: [y, 0] }, { type: 'spring', stiffness: 280, damping: 28 });
            count++;
        }
        else if (old.text !== node.textContent) {
            const status = node.querySelector('.status') ?? node.querySelector('strong') ?? node;
            play(status, { opacity: [.48, 1], y: [3, 0] }, { duration: .22, ease: 'easeOut' });
            count++;
        }
    }
    for (const old of before.values()) {
        if (count >= 10)
            break;
        if (old.element.isConnected)
            continue;
        const ghost = old.element.cloneNode(true);
        ghost.removeAttribute('id');
        ghost.setAttribute('aria-hidden', 'true');
        ghost.classList.add('motion-row-ghost');
        Object.assign(ghost.style, { left: old.rect.left + 'px', top: old.rect.top + 'px', width: old.rect.width + 'px', height: old.rect.height + 'px' });
        document.body.append(ghost);
        const animation = play(ghost, { opacity: [.72, 0], scale: [1, .985], y: [0, -4] }, { duration: motionTokens.exit / 1000, ease: 'easeOut' });
        if (animation)
            animation.finished.catch(() => { }).finally(() => ghost.remove());
        else
            ghost.remove();
        count++;
    }
}
/** Animate the new page and briefly fade the outgoing page in its old position. */
export function animatePage(direction = 'forward', outgoing) {
    refreshNavIndicator();
    if (reduced())
        return;
    const page = document.querySelector('#content>.page') ?? document.querySelector('main>.page');
    if (!page)
        return;
    const sign = direction === 'back' || (typeof direction === 'number' && direction < 0) ? -1 : 1;
    if (outgoing && outgoing !== page && outgoing.childElementCount < 80) {
        const rect = page.getBoundingClientRect(), ghost = outgoing.cloneNode(true);
        ghost.removeAttribute('id');
        ghost.setAttribute('aria-hidden', 'true');
        ghost.classList.add('motion-page-ghost');
        Object.assign(ghost.style, { top: rect.top + 'px', left: rect.left + 'px', width: rect.width + 'px', maxHeight: Math.max(0, innerHeight - rect.top) + 'px' });
        document.body.append(ghost);
        const exit = play(ghost, { opacity: [.58, 0], x: [0, -sign * 10] }, { duration: motionTokens.exit / 1000, ease: 'easeOut' });
        if (exit)
            exit.finished.catch(() => { }).finally(() => ghost.remove());
        else
            ghost.remove();
    }
    play(page, { opacity: [0, 1], x: [sign * 24, 0], y: [5, 0] }, { type: 'spring', visualDuration: .38, bounce: .02 });
}
let indicator, lastNavRect, navObserver, observedNav;
export function refreshNavIndicator() {
    const nav = document.querySelector('.sidebar nav'), active = nav?.querySelector('a[aria-current]');
    if (!nav || !active) {
        indicator?.remove();
        lastNavRect = undefined;
        return;
    }
    const rect = active.getBoundingClientRect(), base = nav.getBoundingClientRect();
    if (!visible(rect))
        return;
    if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'motion-nav-indicator';
        indicator.setAttribute('aria-hidden', 'true');
    }
    if (indicator.parentElement !== nav)
        nav.prepend(indicator);
    nav.classList.add('has-motion-indicator');
    const old = lastNavRect;
    Object.assign(indicator.style, { left: rect.left - base.left + 'px', top: rect.top - base.top + 'px', width: rect.width + 'px', height: rect.height + 'px' });
    if (old && !reduced()) {
        const x = old.left - rect.left, y = old.top - rect.top, sx = old.width / rect.width, sy = old.height / rect.height;
        if (Math.abs(x) > .5 || Math.abs(y) > .5)
            play(indicator, { x: [x, 0], y: [y, 0], scaleX: [sx, 1], scaleY: [sy, 1] }, { type: 'spring', visualDuration: .38, bounce: .02 });
    }
    lastNavRect = rect;
    if (typeof ResizeObserver !== 'undefined' && observedNav !== nav) {
        navObserver?.disconnect();
        navObserver = new ResizeObserver(() => refreshNavIndicator());
        navObserver.observe(nav);
        observedNav = nav;
    }
}
const revealSelector = [
    ':scope > section', ':scope > .focus-band', ':scope > .day-pulse', ':scope > .dashboard-columns',
    ':scope > .planner-grid > section', ':scope > .calendar-grid', ':scope > .rows',
    ':scope > .subject-tabs', ':scope > .syllabus-head', ':scope > .bulk-bar',
    ':scope > .import-banner', ':scope > .board-list', ':scope > .profile-page > section',
    '.life-page > section', '.life-page .life-section', '.life-page .writing-grid', '.life-page .letter-list',
    '.vault-panel', '.study-section', '.insight-grid > section', '.space-links'
].join(',');
export function observeReveals(root, route) {
    stopReveals?.();
    stopReveals = undefined;
    if (reduced() || !('IntersectionObserver' in window))
        return;
    const elements = [...root.querySelectorAll(revealSelector)];
    const fresh = elements.flatMap((element, index) => {
        const key = route + ':' + (element.className || element.tagName) + ':' + index;
        if (revealed.has(key))
            return [];
        element.dataset.motionReveal = key;
        element.dataset.motionPending = '';
        return [{ element, key, index }];
    });
    if (!fresh.length)
        return;
    stopReveals = inView(fresh.map(entry => entry.element), (target) => {
        const entry = fresh.find(item => item.element === target);
        if (!entry)
            return;
        delete entry.element.dataset.motionPending;
        revealed.add(entry.key);
        play(entry.element, { opacity: [0, 1], y: [18, 0], scale: [.99, 1] }, { type: 'spring', visualDuration: .44, bounce: .015, delay: Math.min(entry.index * .055, .22) });
    }, { amount: .12, margin: '0px 0px -28px 0px' });
}
const presses = new Set();
/** Give recently completed work one crisp, activity-linked acknowledgement. */
export function animateTaskCompletion(id) {
    if (!id || completed.has(id) || reduced())
        return;
    const escaped = CSS.escape(id), button = document.querySelector(`[data-action="complete"][data-value="${escaped}"]`), row = button?.closest('.task-row');
    if (!row || !button)
        return;
    completed.add(id);
    play(row, { backgroundColor: ['rgba(125,143,121,0)', 'rgba(125,143,121,.15)', 'rgba(125,143,121,0)'], y: [0, -2, 0] }, { duration: .52, ease: 'easeOut' });
    play(button, { scale: [.78, 1.12, 1], rotate: [-8, 0] }, { type: 'spring', stiffness: 440, damping: 22 });
    const path = button.querySelector('svg path');
    if (path)
        play(path, { pathLength: [0, 1] }, { duration: .34, ease: 'easeOut' });
}
/** Animate a progress value only when the recorded value changes. */
export function animateProgress(element, key, value) {
    const target = Math.max(0, Math.min(1, value)), previous = progressValues.get(key);
    progressValues.set(key, target);
    if (previous !== undefined && Math.abs(previous - target) < .0001)
        return;
    play(element, { scaleX: [previous ?? 0, target] }, { duration: .62, ease: [.2, .65, .3, 1] });
}
export function animateDialogExit(dialog) {
    if (reduced() || !dialog.open) {
        dialog.close();
        return Promise.resolve();
    }
    const animation = play(dialog, { opacity: [1, 0], y: [0, 7], scale: [1, .985] }, { duration: motionTokens.exit / 1000, ease: 'easeOut' });
    if (!animation) {
        dialog.close();
        return Promise.resolve();
    }
    return animation.finished.catch(() => { }).then(() => { if (dialog.open)
        dialog.close(); });
}
export function initMotion() {
    if (ready)
        return;
    ready = true;
    document.documentElement.classList.add('motion-ready');
    press('button:not([disabled]),a.button,a[data-nav],.tool,.segments button,.subject-tabs button', (element) => {
        presses.add(element);
        motionAnimate(element, { scale: .97 }, { type: 'spring', stiffness: 520, damping: 32 });
        return () => { presses.delete(element); motionAnimate(element, { scale: 1 }, { type: 'spring', stiffness: 520, damping: 32 }); };
    });
    hover('.button:not(:disabled),.tool,a[data-nav]', element => {
        if (reduced())
            return;
        motionAnimate(element, { y: -1, scale: 1.012 }, { type: 'spring', stiffness: 420, damping: 30 });
        return () => motionAnimate(element, { y: 0, scale: 1 }, { type: 'spring', stiffness: 420, damping: 30 });
    });
    document.addEventListener('change', event => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement) || !['checkbox', 'radio'].includes(input.type))
            return;
        const element = input.closest('.switch')?.querySelector('span:last-child') ?? input;
        play(element, { scale: [.92, 1] }, { type: 'spring', stiffness: 420, damping: 28 });
    });
    document.addEventListener('click', event => {
        if (reduced() || event.defaultPrevented)
            return;
        const summary = event.target.closest('summary');
        if (!summary)
            return;
        const details = summary.parentElement;
        if (!(details instanceof HTMLDetailsElement))
            return;
        event.preventDefault();
        const start = details.getBoundingClientRect().height, closing = details.open && details.dataset.motionClosing !== 'true';
        detailsAnimations.get(details)?.cancel();
        details.dataset.motionClosing = String(closing);
        details.open = true;
        const end = closing ? summary.getBoundingClientRect().height + Math.max(0, parseFloat(getComputedStyle(details).paddingTop)) : details.scrollHeight;
        details.style.overflow = 'hidden';
        const animation = play(details, { height: [start, end] }, { duration: motionTokens.control / 1000, ease: 'easeOut' });
        if (!animation) {
            details.open = !closing;
            details.style.overflow = '';
            delete details.dataset.motionClosing;
            return;
        }
        detailsAnimations.set(details, animation);
        const settle = () => { if (detailsAnimations.get(details) !== animation)
            return; details.open = !closing; details.style.overflow = ''; delete details.dataset.motionClosing; detailsAnimations.delete(details); };
        animation.finished.then(settle, settle);
    });
    const detailsAnimations = new WeakMap();
    const observer = new MutationObserver(records => {
        for (const record of records) {
            const dialog = record.target;
            if (!(dialog instanceof HTMLDialogElement) || !dialog.open || reduced())
                continue;
            play(dialog, { opacity: [0, 1], y: [12, 0], scale: [.985, 1] }, { type: 'spring', visualDuration: .36, bounce: .015 });
        }
    });
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
    const cancel = () => {
        if (reduced()) {
            for (const animation of managed)
                animation.cancel();
            document.querySelectorAll('.motion-row-ghost,.motion-page-ghost').forEach(node => node.remove());
            document.querySelectorAll('[data-motion-pending]').forEach(node => { delete node.dataset.motionPending; });
            for (const stop of presses)
                motionAnimate(stop, { scale: 1 }, { duration: 0 });
            presses.clear();
        }
        refreshNavIndicator();
    };
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', cancel);
    new MutationObserver(cancel).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', () => refreshNavIndicator(), { passive: true });
    document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('motion-paused', document.visibilityState !== 'visible'));
    refreshNavIndicator();
}
