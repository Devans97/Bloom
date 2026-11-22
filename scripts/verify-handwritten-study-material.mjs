import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9235;
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

    // 1. FORMULAS SCREENSHOT
    console.log('2. Navigating to #formulas...');
    await send('Page.navigate', { url: 'http://127.0.0.1:4180/#formulas' });
    await sleep(1000);
    const snapFormulas = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/handwritten_formulas_verified.png`, Buffer.from(snapFormulas.data, 'base64'));
    console.log('Saved handwritten_formulas_verified.png');

    // 2. DERIVATIONS SCREENSHOT
    console.log('3. Navigating to #derivations...');
    await send('Page.navigate', { url: 'http://127.0.0.1:4180/#derivations' });
    await sleep(1000);
    const snapDerivations = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/handwritten_derivations_verified.png`, Buffer.from(snapDerivations.data, 'base64'));
    console.log('Saved handwritten_derivations_verified.png');

    // 3. ROADMAPS SCREENSHOT
    console.log('4. Navigating to #roadmaps...');
    await send('Page.navigate', { url: 'http://127.0.0.1:4180/#roadmaps' });
    await sleep(1000);
    const snapRoadmaps = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/handwritten_roadmaps_verified.png`, Buffer.from(snapRoadmaps.data, 'base64'));
    console.log('Saved handwritten_roadmaps_verified.png');

    // 4. PRACTICALS SCREENSHOT
    console.log('5. Navigating to #practicals...');
    await send('Page.navigate', { url: 'http://127.0.0.1:4180/#practicals' });
    await sleep(1000);
    const snapPracticals = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/handwritten_practicals_verified.png`, Buffer.from(snapPracticals.data, 'base64'));
    console.log('Saved handwritten_practicals_verified.png');

    ws.close();
    chrome.kill();
    console.log('All handwritten study material verification screenshots captured successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
    chrome.kill();
    process.exit(1);
  }
}

main();
