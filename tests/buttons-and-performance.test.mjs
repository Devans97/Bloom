import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('production quality: design-system and style css enforce 50/50 symmetry', () => {
  const designSystemCss = readFileSync('public/design-system.css', 'utf-8');
  const styleCss = readFileSync('public/style.css', 'utf-8');

  // Verify dashboard columns have exact 50/50 repeat(2, minmax(0, 1fr))
  assert.ok(
    designSystemCss.includes('.dashboard-columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))'),
    'Dashboard columns must use balanced repeat(2, minmax(0, 1fr)) grid'
  );

  // Verify planner grid has symmetrical repeat(2, minmax(0, 1fr))
  assert.ok(
    styleCss.includes('.planner-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))'),
    'Planner grid must use balanced repeat(2, minmax(0, 1fr)) grid'
  );

  // Verify studio quick launcher has symmetrical 8-column grid on desktop
  assert.ok(
    styleCss.includes('.studio-quick-strip') && styleCss.includes('grid-template-columns: repeat(8, minmax(0, 1fr))'),
    'Studio quick launcher must use balanced 8-column grid'
  );
});

test('production quality: focus dock starts hidden and exposes setVisible', () => {
  const focusDockTs = readFileSync('src/focus-dock.ts', 'utf-8');

  assert.ok(
    focusDockTs.includes('private isVisible: boolean = false;'),
    'FocusDock must start with isVisible = false by default'
  );
  assert.ok(
    focusDockTs.includes('public setVisible(visible: boolean): void'),
    'FocusDock must provide a setVisible method'
  );
});

test('production quality: command palette is guarded during onboarding', () => {
  const commandPaletteTs = readFileSync('src/command-palette.ts', 'utf-8');

  assert.ok(
    commandPaletteTs.includes('canOpenCallback'),
    'CommandPalette must support a canOpenCallback guard'
  );
});
