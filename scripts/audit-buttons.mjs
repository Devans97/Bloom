import { spawn } from 'node:child_process';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9226;
const userDataDir = '/tmp/chrome-btn-audit-' + Date.now();

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1280,820',
    'http://127.0.0.1:4180/#today'
  ], { stdio: 'ignore' });

  try {
    let wsUrl = '';
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        if (list?.[0]?.webSocketDebuggerUrl) { wsUrl = list[0].webSocketDebuggerUrl; break; }
      } catch (e) {}
    }

    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = new Map();
    const consoleErrors = [];

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params?.type === 'error') {
        consoleErrors.push(msg.params.args?.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(msg.params?.exceptionDetails?.text || 'Exception thrown');
      }
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) cb.reject(msg.error);
        else cb.resolve(msg.result);
      }
    };

    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const reqId = id++;
      callbacks.set(reqId, { resolve, reject });
      ws.send(JSON.stringify({ id: reqId, method, params }));
    });

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');

    // Setup active state in IndexedDB
    await send('Runtime.evaluate', {
      expression: `
        (async () => {
          const open = indexedDB.open('bloom-preview', 1);
          const db = await new Promise((res, rej) => { open.onsuccess = () => res(open.result); open.onerror = rej; });
          const tx = db.transaction('local', 'readwrite');
          const store = tx.objectStore('local');
          const saved = await new Promise((res, rej) => { const req = store.get('profile'); req.onsuccess = () => res(req.result); req.onerror = rej; });
          const next = saved || {};
          next.name = 'Aastha';
          next.onboarding = { step: 6, completed: true, answered: [0,1,2,3,4,5,6] };
          await new Promise((res, rej) => { const req = store.put(next, 'profile'); req.onsuccess = () => res(); req.onerror = rej; });
          location.hash = '#today';
          location.reload();
        })()
      `,
      awaitPromise: true
    });
    await sleep(1500);

    const routes = [
      'today', 'planner', 'syllabus', 'tests', 'profile', 'garden', 'vault',
      'derivations', 'roadmaps', 'practicals', 'mock-exam', 'formulas',
      'soundscape', 'english-studio', 'pe-studio', 'focus', 'review',
      'results', 'insights', 'resources', 'writing', 'letters', 'reminders'
    ];

    let totalButtonsChecked = 0;
    const deadButtons = [];

    for (const r of routes) {
      await send('Runtime.evaluate', { expression: `location.hash = '#${r}';` });
      await sleep(350);

      const audit = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btns = Array.from(document.querySelectorAll('button, a[data-nav], a[data-action], [role="button"]'));
            const dead = [];
            for (const b of btns) {
              const hasAction = b.dataset.action || b.dataset.studyAction || b.dataset.lifeAction || b.dataset.vaultAction || b.dataset.nav || b.getAttribute('href') || b.onclick || b.type === 'submit';
              const text = (b.textContent || b.getAttribute('aria-label') || b.title || '').trim();
              if (!hasAction && !b.classList.contains('hyp-tab-btn') && !b.classList.contains('hyp-chip')) {
                dead.push(text || b.outerHTML.slice(0, 80));
              }
            }
            return { total: btns.length, dead };
          })()
        `,
        returnByValue: true
      });

      const res = audit.result.value;
      totalButtonsChecked += res.total;
      if (res.dead.length) {
        deadButtons.push({ route: r, dead: res.dead });
      }
    }

    console.log(`Audited ${routes.length} routes across ${totalButtonsChecked} interactive elements.`);
    if (deadButtons.length) {
      console.warn('Potential dead buttons found:', JSON.stringify(deadButtons, null, 2));
    } else {
      console.log('✔ ZERO dead buttons found across all routes!');
    }

    if (consoleErrors.length) {
      console.error('Console errors detected:', consoleErrors);
      throw new Error('Console errors encountered during button audit');
    } else {
      console.log('✔ ZERO console errors across all interactive routes!');
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Button audit failed:', err);
  process.exit(1);
});
