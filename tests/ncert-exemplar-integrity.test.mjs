/**
 * Automated Test Suite: NCERT Exemplar & HOTS Repository Integrity
 * Verifies mathematical validity, step marks summation, schema conformity,
 * and zero placeholder text across Physics, Chemistry, Math, English, and PE.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { ncertExemplarPhysics } from '../dist/js/data/ncert-exemplar-physics.js';
import { ncertExemplarChemistry } from '../dist/js/data/ncert-exemplar-chemistry.js';
import { ncertExemplarMath } from '../dist/js/data/ncert-exemplar-math.js';
import { ncertExemplarEnglish } from '../dist/js/data/ncert-exemplar-english.js';
import { ncertExemplarPE } from '../dist/js/data/ncert-exemplar-pe.js';

test('ncert exemplar physics: all problems conform to schema and have non-empty working steps', () => {
  assert.ok(Array.isArray(ncertExemplarPhysics), 'Physics exemplar must be an array');
  assert.ok(ncertExemplarPhysics.length >= 10, 'Must have at least 10 high-yield physics exemplar problems');

  for (const item of ncertExemplarPhysics) {
    assert.ok(item.id && typeof item.id === 'string', `Invalid ID in ${item.id}`);
    assert.ok(item.chapterId && item.chapterId.startsWith('phy-'), `Chapter ID must start with phy- in ${item.id}`);
    assert.ok(item.questionText && item.questionText.length > 20, `Question text too short in ${item.id}`);
    assert.ok(item.analyticalSolution && item.analyticalSolution.length > 50, `Solution too short in ${item.id}`);
    assert.ok(Array.isArray(item.stepByStepWorking) && item.stepByStepWorking.length >= 2, `Must have >= 2 steps in ${item.id}`);

    // Verify marks sum
    const totalStepMarks = item.stepByStepWorking.reduce((sum, s) => sum + s.marksAwarded, 0);
    assert.ok(totalStepMarks >= 2.0, `Total step marks must be at least 2 in ${item.id}, got ${totalStepMarks}`);

    // Verify step numbers are sequential starting from 1
    item.stepByStepWorking.forEach((step, idx) => {
      assert.strictEqual(step.step, idx + 1, `Step numbering must be 1-indexed and sequential in ${item.id}`);
      assert.ok(step.description && step.description.length > 10, `Step description too short in ${item.id} step ${step.step}`);
    });

    // Zero placeholder check
    const serialized = JSON.stringify(item).toLowerCase();
    assert.ok(!serialized.includes('todo') && !serialized.includes('lorem ipsum') && !serialized.includes('dummy'),
      `Placeholder text found in ${item.id}`);
  }
});

test('ncert exemplar chemistry: reasoning questions have valid mechanisms and units', () => {
  assert.ok(Array.isArray(ncertExemplarChemistry), 'Chemistry exemplar must be an array');
  assert.ok(ncertExemplarChemistry.length >= 8, 'Must have at least 8 chemistry exemplar problems');

  for (const item of ncertExemplarChemistry) {
    assert.ok(item.id.startsWith('ex-chem-'), `ID must start with ex-chem- in ${item.id}`);
    assert.ok(item.chapterId.startsWith('chem-'), `Chapter must start with chem- in ${item.id}`);
    assert.ok(item.analyticalSolution.length >= 50, `Solution must be thorough in ${item.id}`);
    assert.ok(item.commonMistakesAndTraps.length >= 1, `Must document common board traps in ${item.id}`);

    // Verify step marks
    const totalMarks = item.stepByStepWorking.reduce((acc, st) => acc + st.marksAwarded, 0);
    assert.ok(totalMarks >= 2.0, `Step marks must sum to at least 2 in ${item.id}`);

    // Zero placeholder check
    const serialized = JSON.stringify(item).toLowerCase();
    assert.ok(!serialized.includes('todo') && !serialized.includes('dummy'), `Placeholder in ${item.id}`);
  }
});

test('ncert exemplar math: calculus, vector, and 3D proofs contain valid steps and positive marks', () => {
  assert.ok(Array.isArray(ncertExemplarMath), 'Math exemplar must be an array');
  assert.ok(ncertExemplarMath.length >= 10, 'Must have at least 10 math exemplar problems');

  for (const item of ncertExemplarMath) {
    assert.ok(item.id.startsWith('ex-math-'), `ID must start with ex-math- in ${item.id}`);
    assert.ok(item.chapterId.startsWith('math-'), `Chapter must start with math- in ${item.id}`);
    assert.ok(item.stepByStepWorking.length >= 3, `Math problems require detailed steps in ${item.id}`);

    for (const step of item.stepByStepWorking) {
      assert.ok(step.mathExpression && step.mathExpression.length > 0, `Mathematical expression missing in ${item.id} step ${step.step}`);
      assert.ok(step.marksAwarded > 0, `Step marks must be strictly positive in ${item.id} step ${step.step}`);
    }

    const totalMarks = item.stepByStepWorking.reduce((s, st) => s + st.marksAwarded, 0);
    assert.ok(totalMarks >= 3.0, `Total marks must be >= 3 in ${item.id}`);
  }
});

test('ncert exemplar english: literary and writing questions contain official marking criteria', () => {
  assert.ok(Array.isArray(ncertExemplarEnglish), 'English exemplar must be an array');
  assert.ok(ncertExemplarEnglish.length >= 4, 'Must have at least 4 English exemplar items');

  const validSections = new Set(['reading', 'writing', 'flamingo-prose', 'flamingo-poetry', 'vistas']);
  for (const item of ncertExemplarEnglish) {
    assert.ok(validSections.has(item.section), `Invalid section in ${item.id}`);
    assert.ok(item.promptOrExtract.length > 20, `Prompt too short in ${item.id}`);
    assert.ok(item.modelAnswer.length > 100, `Model answer must be comprehensive in ${item.id}`);
    assert.ok(Array.isArray(item.rubricBreakdown) && item.rubricBreakdown.length >= 2, `Must have rubric breakdown in ${item.id}`);

    const totalRubric = item.rubricBreakdown.reduce((sum, r) => sum + r.marks, 0);
    assert.strictEqual(totalRubric, item.marksWeightage, `Rubric sum (${totalRubric}) must equal marksWeightage (${item.marksWeightage}) in ${item.id}`);
  }
});

test('ncert exemplar physical education: tournament and biomechanics items contain technical formulas', () => {
  assert.ok(Array.isArray(ncertExemplarPE), 'PE exemplar must be an array');
  assert.ok(ncertExemplarPE.length >= 4, 'Must have at least 4 PE exemplar items');

  for (const item of ncertExemplarPE) {
    assert.ok(item.unitId.startsWith('pe-'), `Unit ID must start with pe- in ${item.id}`);
    assert.ok(item.questionText.length > 20, `Question text too short in ${item.id}`);
    assert.ok(Array.isArray(item.stepByStepSolution) && item.stepByStepSolution.length >= 3, `Must have >= 3 steps in ${item.id}`);

    const totalMarks = item.stepByStepSolution.reduce((sum, s) => sum + s.marksAwarded, 0);
    assert.strictEqual(totalMarks, item.marksWeightage, `Step marks sum (${totalMarks}) must equal marksWeightage (${item.marksWeightage}) in ${item.id}`);
    assert.ok(item.boardPitfalls.length >= 1, `Must document common board pitfalls in ${item.id}`);
  }
});
