import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9231;
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
    '--window-size=1280,840',
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
    await sleep(500);

    // 2. Initialize IndexedDB with completed onboarding & clean slate
    await send('Runtime.evaluate', {
      expression: `
        new Promise((resolve, reject) => {
          const req = indexedDB.open("bloom-preview", 1);
          req.onupgradeneeded = () => req.result.createObjectStore("local");
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction("local", "readwrite");
            const s = {
              name: "Aastha",
              darkMode: false,
              reduceMotion: true,
              defaults: { start: "14:30", end: "17:00", school: false, tuition: true, limit: 150, lateStart: "21:00" },
              days: {},
              tasks: [],
              tests: [],
              progress: {},
              reviews: [],
              onboarding: { completed: true, completedAt: "2026-11-21T00:00:00Z", step: 7, totalSteps: 7 },
              academic: { curriculumVersion: "cbse-xii-2026-27-v1", topicProgress: {}, activities: {} },
              study: { focusMinutes: 25, breakMinutes: 5, sessions: [], mistakes: [], results: [] }
            };
            tx.objectStore("local").put(s, "profile");
            tx.oncomplete = () => resolve("stored");
            tx.onerror = () => reject(tx.error);
          };
          req.onerror = () => reject(req.error);
        })
      `,
      awaitPromise: true
    });

    await send('Runtime.evaluate', { expression: 'location.hash = "#today"; location.reload();' });
    await sleep(1500);

    // 3. Capture Today dashboard with new CBSE Board Preparation card
    console.log('3. Capturing today_board_study_plans.png');
    const todayShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/today_board_study_plans.png`, Buffer.from(todayShot.data, 'base64'));

    // 4. Click "⚡ Choose Board Study Plan" and capture modal
    console.log('4. Opening CBSE Board Study Plans modal');
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-action="apply-guided-mission"]')?.click();`
    });
    await sleep(600);
    const modalShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/board_study_plans_modal.png`, Buffer.from(modalShot.data, 'base64'));

    // 5. Apply Full-Chapter Mastery Plan
    console.log('5. Applying Full-Chapter Mastery Plan');
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-action="apply-board-plan"][data-value="full-chapter"]')?.click();`
    });
    await sleep(800);

    // 6. Navigate to Planner and capture added sessions
    console.log('6. Navigating to Planner and capturing planner_full_chapter_added.png');
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-nav="planner"]')?.click();`
    });
    await sleep(800);
    const plannerShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/planner_full_chapter_added.png`, Buffer.from(plannerShot.data, 'base64'));

    // 7. Open Task Composer, select "Whole Unit (16-35M)", and capture modal
    console.log('7. Opening Task Composer with Whole Unit scope');
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-action="add-task"]')?.click();`
    });
    await sleep(600);
    await send('Runtime.evaluate', {
      expression: `document.querySelector('[data-scope="unit"]')?.click();`
    });
    await sleep(500);
    const unitShot = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/task_composer_unit_scope.png`, Buffer.from(unitShot.data, 'base64'));

    console.log('✅ ALL SCREENSHOT ARTIFACTS CAPTURED SUCCESSFULLY!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

main().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
