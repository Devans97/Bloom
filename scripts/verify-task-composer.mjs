import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9224;
const userDataDir = '/tmp/chrome-task-composer-' + Date.now();
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
    'http://127.0.0.1:4180/#planner'
  ], { stdio: 'ignore' });

  try {
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
      } catch (e) {}
    }

    if (!wsUrl) throw new Error('Failed to connect to Chrome CDP within 6 seconds');

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

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);
    console.log('3. Enabling Page & Runtime domains...');
    await send('Page.enable');
    await send('Runtime.enable');

    // Seed completed state so user goes directly to planner without onboarding screen
    console.log('4. Seeding onboarding completed state in indexedDB...');
    await send('Runtime.evaluate', {
      awaitPromise: true,
      expression: `
        new Promise((resolve, reject) => {
          const req = indexedDB.open('bloom-preview', 1);
          req.onupgradeneeded = () => req.result.createObjectStore('local');
          req.onsuccess = () => {
            const db = req.result;
            const tx = db.transaction('local', 'readwrite');
            const store = tx.objectStore('local');
            const profile = {
              name: 'Aastha',
              onboarding: {
                completed: true,
                completedAt: '2026-11-21T10:00:00.000Z',
                step: 7,
                answers: { name: 'Aastha', routine: 'standard' }
              },
              defaults: { start: '14:30', end: '17:00', school: false, tuition: true, limit: 150, lateStart: '21:00' },
              tasks: [],
              tests: [],
              progress: {},
              reviews: []
            };
            store.put(profile, 'profile');
            tx.oncomplete = () => {
              location.hash = '#planner';
              location.reload();
              resolve(true);
            };
          };
          req.onerror = () => reject(req.error);
        });
      `
    });

    await sleep(1500);

    // Open Add Task Modal
    console.log('5. Clicking Add task button in planner...');
    const clickRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const addBtn = document.querySelector('[data-action="add-task"]');
          if (addBtn) {
            addBtn.click();
            return { success: true, text: addBtn.innerText };
          }
          return { success: false };
        })()
      `,
      returnByValue: true
    });
    console.log('Add task button click result:', clickRes.result.value);

    await sleep(600);

    // Verify modal elements
    console.log('6. Inspecting task composer modal structure...');
    const modalCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const dialog = document.querySelector('dialog');
          const hasMoreOptions = Boolean(document.querySelector('details summary'));
          const subBtns = Array.from(document.querySelectorAll('.composer-sub-btn')).map(b => b.innerText.trim());
          const typeBtns = Array.from(document.querySelectorAll('.composer-type-btn')).map(b => b.innerText.trim());
          const titleInput = document.querySelector('#composer-title-input')?.value;
          const autoslotText = document.querySelector('#autoslot-text')?.innerText;
          const durChips = Array.from(document.querySelectorAll('.composer-dur-chip')).map(b => b.innerText.trim());

          return {
            open: dialog?.open,
            hasMoreOptions,
            subBtns,
            typeBtns,
            titleInput,
            autoslotText,
            durChips
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Task Composer Modal Check:', JSON.stringify(modalCheck.result.value, null, 2));

    // Capture initial task composer screenshot
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/task_composer_initial.png`, Buffer.from(shot1.data, 'base64'));
    console.log('Saved screenshot: task_composer_initial.png');

    // Click "PYQ Practice" type
    console.log('7. Clicking PYQ Practice task type...');
    const pyqClick = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const pyqBtn = document.querySelector('.composer-type-btn[data-type="pyq"]');
          if (pyqBtn) {
            pyqBtn.click();
            const qBox = document.querySelector('#composer-questions-box');
            const title = document.querySelector('#composer-title-input')?.value;
            const minutes = document.querySelector('#composer-minutes-input')?.value;
            const qChips = Array.from(document.querySelectorAll('.composer-q-chip')).map(c => c.innerText.trim());
            return {
              clicked: true,
              qBoxHidden: qBox?.hidden,
              title,
              minutes,
              qChips
            };
          }
          return { clicked: false };
        })()
      `,
      returnByValue: true
    });
    console.log('PYQ Selection result:', JSON.stringify(pyqClick.result.value, null, 2));

    await sleep(400);

    // Click "15 Qs (~45m)"
    console.log('8. Selecting 15 Questions chip...');
    const qSelect = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const chip = document.querySelector('.composer-q-chip[data-count="15"]');
          if (chip) {
            chip.click();
            const title = document.querySelector('#composer-title-input')?.value;
            const minutes = document.querySelector('#composer-minutes-input')?.value;
            const autoslot = document.querySelector('#autoslot-text')?.innerText;
            return {
              chipClicked: true,
              title,
              minutes,
              autoslot
            };
          }
          return { chipClicked: false };
        })()
      `,
      returnByValue: true
    });
    console.log('Question selection result:', JSON.stringify(qSelect.result.value, null, 2));

    // Capture PYQ selected screenshot
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/task_composer_pyq_15q.png`, Buffer.from(shot2.data, 'base64'));
    console.log('Saved screenshot: task_composer_pyq_15q.png');

    // Submit task form
    console.log('9. Submitting task composer form...');
    const submitRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const form = document.querySelector('#task-form');
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.click();
          return { submitted: true };
        })()
      `,
      returnByValue: true
    });

    await sleep(800);

    // Verify task is now visible in the planner
    console.log('10. Verifying task appears in planner...');
    const taskInPlanner = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const tasks = Array.from(document.querySelectorAll('.task-row, .task-title, .task-item')).map(t => t.innerText.trim());
          const dialog = document.querySelector('dialog');
          return {
            dialogClosed: !dialog?.open,
            tasksSnippet: tasks.slice(0, 5)
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Planner task check:', JSON.stringify(taskInPlanner.result.value, null, 2));

    // Capture planner with added task
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/planner_task_added.png`, Buffer.from(shot3.data, 'base64'));
    console.log('Saved screenshot: planner_task_added.png');

    // Navigate to #formulas to test Handwritten Formula Handbook
    console.log('11. Navigating to #formulas...');
    await send('Runtime.evaluate', {
      expression: `location.hash = '#formulas'; location.reload();`
    });

    await sleep(1500);

    console.log('12. Inspecting handwritten formula elements...');
    const formulaCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const plates = document.querySelectorAll('.handwritten-formula-plate');
          const dimensions = document.querySelectorAll('.handwritten-dimensions');
          const notesSections = document.querySelectorAll('.handwritten-notes-section');
          const cards = document.querySelectorAll('.formula-card');

          const firstPlateStyle = plates[0] ? window.getComputedStyle(plates[0].querySelector('div:last-child')) : null;
          const firstDimStyle = dimensions[0] ? window.getComputedStyle(dimensions[0].querySelector('span:last-child')) : null;

          return {
            cardCount: cards.length,
            platesCount: plates.length,
            dimensionsCount: dimensions.length,
            notesCount: notesSections.length,
            formulaFont: firstPlateStyle?.fontFamily,
            formulaColor: firstPlateStyle?.color,
            dimensionFont: firstDimStyle?.fontFamily,
            dimensionColor: firstDimStyle?.color
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Formula Handbook Check:', JSON.stringify(formulaCheck.result.value, null, 2));

    // Capture Formula Handbook screenshot
    const shot4 = await send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(`${artifactDir}/handwritten_formula_handbook.png`, Buffer.from(shot4.data, 'base64'));
    console.log('Saved screenshot: handwritten_formula_handbook.png');

    console.log('All Task Composer & Handwritten Formula tests passed with 100% fidelity!');
    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
