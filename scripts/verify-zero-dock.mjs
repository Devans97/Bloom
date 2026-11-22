import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9240;
const userDataDir = '/tmp/chrome-artifacts-' + Date.now();
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
    '--window-size=1280,900',
    'http://127.0.0.1:4180/'
  ], { stdio: 'ignore' });

  try {
    let wsUrl = '';
    for (let i = 0; i < 25; i++) {
      await sleep(200);
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/list`);
        const list = await res.json();
        if (list && list[0] && list[0].webSocketDebuggerUrl) {
          wsUrl = list[0].webSocketDebuggerUrl;
          break;
        }
      } catch (e) {}
    }

    if (!wsUrl) throw new Error('Failed to connect to Chrome CDP');
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
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise(r => ws.onopen = r);
    await send('Page.enable');
    await send('Runtime.enable');
    await sleep(600);

    // Initialize authenticated onboarding profile in IndexedDB
    await send('Runtime.evaluate', {
      expression: `
        new Promise((resolve, reject) => {
          const req = indexedDB.open('bloom-preview', 1);
          req.onupgradeneeded = (e) => {
            const db = req.result;
            if (!db.objectStoreNames.contains('local')) db.createObjectStore('local');
          };
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('local', 'readwrite');
            const store = tx.objectStore('local');
            const state = {
              profile: {
                studentName: 'Aastha',
                stream: 'PCM',
                targetScore: 95,
                boardYear: 2027,
                examRollNumber: '12345678',
                schoolName: 'Delhi Public School, R.K. Puram'
              },
              onboarding: { completed: true },
              tasks: [],
              progress: {},
              study: { focusMinutes: 25, breakMinutes: 5, activeFocus: null, sessions: [], mistakes: [], results: [] }
            };
            store.put(state, 'profile');
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
          };
          req.onerror = () => reject(req.error);
        });
      `,
      awaitPromise: true,
      returnByValue: true
    });

    // Test pages
    const pages = ['today', 'planner', 'formulas'];
    for (const p of pages) {
      console.log(`Checking #${p}...`);
      await send('Page.navigate', { url: `http://127.0.0.1:4180/#${p}` });
      await sleep(1000);

      // Check DOM for any dock elements
      const checkRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const dock = document.querySelector('#bloom-focus-dock, .focus-dock, [id*="focus-dock"], [id*="dock-timer"]');
            const fixedBottoms = Array.from(document.querySelectorAll('*')).filter(el => {
              const style = window.getComputedStyle(el);
              return style.position === 'fixed' && (parseInt(style.bottom) >= 0 || style.bottom === 'auto') && el.offsetHeight > 0 && el.offsetWidth > 0 && el.id !== 'notice';
            }).map(el => ({ tag: el.tagName, id: el.id, className: el.className, text: el.innerText.trim().slice(0, 40) }));
            return {
              dockFound: Boolean(dock),
              fixedBottomElements: fixedBottoms
            };
          })()
        `,
        returnByValue: true
      });

      console.log(`#${p} DOM inspection:`, JSON.stringify(checkRes.result.value));
      const snap = await send('Page.captureScreenshot', { format: 'png' });
      writeFileSync(`${artifactDir}/zero_dock_${p}.png`, Buffer.from(snap.data, 'base64'));
      console.log(`Saved zero_dock_${p}.png`);
    }

    ws.close();
    chrome.kill();
    console.log('Zero dock verification finished successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    chrome.kill();
    process.exit(1);
  }
}

main();
