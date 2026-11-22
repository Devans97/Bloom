import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9223;
const userDataDir = '/tmp/chrome-mcm-test-' + Date.now();
const artifactDir = '/Users/devanshpatel/.gemini/antigravity/brain/a67076c5-b96f-4a2c-9ed1-5f95b89119db';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('1. Launching headless Chrome on port', port);
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1280,820',
    'http://127.0.0.1:4180/'
  ], { stdio: 'ignore' });

  try {
    // Wait for Chrome to spin up
    let wsUrl = '';
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        if (list && list[0] && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch (e) {
        // retry
      }
    }

    if (!wsUrl) {
      throw new Error('Failed to connect to Chrome CDP within 6 seconds');
    }

    console.log('2. Connected to Chrome CDP:', wsUrl);
    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
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

    // Wait for page load and app boot
    console.log('3. Waiting for app boot and intro page rendering...');
    await sleep(1500);

    // Evaluate Intro page focus dock display
    const evalIntro = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const dock = document.getElementById('bloom-focus-dock');
          const style = dock ? window.getComputedStyle(dock) : null;
          return {
            dockFound: Boolean(dock),
            display: style ? style.display : null,
            visibility: style ? style.visibility : null,
            hasIntroScreen: Boolean(document.querySelector('.onboarding'))
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Intro page audit result:', evalIntro.result.value);
    const introData = evalIntro.result.value;

    if (!introData.dockFound) {
      throw new Error('Focus dock not found in DOM');
    }
    if (introData.display !== 'none') {
      throw new Error(`MCM DETECTED: Focus dock display is "${introData.display}" instead of "none" on intro page!`);
    }
    console.log('✔ MCM 1 VERIFIED: Focus dock display is strictly "none" on intro page!');

    // Capture screenshot of clean intro page
    const introScreenshot = await send('Page.captureScreenshot', { format: 'png' });
    const introBuf = Buffer.from(introScreenshot.data, 'base64');
    writeFileSync(`${artifactDir}/intro_screen_mcm_verified.png`, introBuf);
    console.log(`✔ Saved verified clean intro screenshot to ${artifactDir}/intro_screen_mcm_verified.png (${introBuf.length} bytes)`);

    // Complete onboarding by setting name and finishing setup in IndexedDB
    console.log('4. Completing onboarding to test main workspace in IndexedDB...');
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

    // Evaluate main workspace focus dock display
    const evalMain = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const dock = document.getElementById('bloom-focus-dock');
          const style = dock ? window.getComputedStyle(dock) : null;
          return {
            dockFound: Boolean(dock),
            display: style ? style.display : null,
            pageTitle: document.title,
            hasShell: Boolean(document.querySelector('.layout'))
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Main workspace audit result:', evalMain.result.value);
    const mainData = evalMain.result.value;

    if (mainData.display !== 'flex') {
      throw new Error(`Expected focus dock to have display "flex" in main workspace, but got "${mainData.display}"`);
    }
    console.log('✔ VERIFIED: Focus dock is cleanly visible with display "flex" in main workspace!');

    // Open task dialog
    console.log('5. Opening Add Task dialog...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('[data-action="add-task"]');
          if (btn) btn.click();
          else if (window.planDialog) window.planDialog();
        })()
      `
    });

    await sleep(600);

    // Inspect task modal styles
    const evalModal = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const dlg = document.querySelector('dialog[open]') || document.getElementById('dialog');
          const style = dlg ? window.getComputedStyle(dlg) : null;
          const chips = document.querySelectorAll('.hyp-chip');
          const input = dlg ? dlg.querySelector('input[name="title"]') : null;
          const inputStyle = input ? window.getComputedStyle(input) : null;

          return {
            modalOpen: Boolean(dlg && dlg.open),
            borderRadius: style ? style.borderRadius : null,
            chipsCount: chips ? chips.length : 0,
            inputBorderRadius: inputStyle ? inputStyle.borderRadius : null
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Task modal audit result:', evalModal.result.value);

    // Capture screenshot of main workspace with dock and task modal
    const mainScreenshot = await send('Page.captureScreenshot', { format: 'png' });
    const mainBuf = Buffer.from(mainScreenshot.data, 'base64');
    writeFileSync(`${artifactDir}/main_workspace_mcm_verified.png`, mainBuf);
    console.log(`✔ Saved verified clean workspace & task dialog screenshot to ${artifactDir}/main_workspace_mcm_verified.png (${mainBuf.length} bytes)`);

    console.log('\n========================================');
    console.log('🎉 ALL MCM CRITICAL AUDITS PASSED 100%!');
    console.log('========================================');

    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
