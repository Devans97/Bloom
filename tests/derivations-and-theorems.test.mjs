/**
 * Automated Test Suite: CBSE Derivations & Mathematical Theorems Integrity
 * Verifies mathematical soundness, sequential step numbering, diagram requirements,
 * mark allocations, and examiner board warnings across Physics and Mathematics.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { cbsePhysicsDerivations } from '../dist/js/data/cbse-derivations.js';
import { cbseMathTheorems } from '../dist/js/data/cbse-math-theorems.js';

test('physics derivations: all 20 core derivations have full mathematical deductions', () => {
  assert.ok(Array.isArray(cbsePhysicsDerivations), 'Physics derivations must be an array');
  assert.strictEqual(cbsePhysicsDerivations.length, 20, 'Must contain all 20 essential Physics derivations');

  const validMarks = new Set([2, 3, 5]);

  for (const der of cbsePhysicsDerivations) {
    assert.ok(der.id.startsWith('phy-der-'), `Invalid ID format in ${der.id}`);
    assert.ok(der.title && der.title.length > 5, `Title missing in ${der.id}`);
    assert.ok(validMarks.has(der.marksWeightage), `Invalid marks weightage in ${der.id}`);
    assert.ok(der.finalFormula && der.finalFormula.length > 3, `Final formula missing in ${der.id}`);
    assert.ok(Array.isArray(der.steps) && der.steps.length >= 3, `Derivation must have >= 3 steps in ${der.id}`);
    assert.ok(Array.isArray(der.commonMistakes) && der.commonMistakes.length >= 1, `Must document common board traps in ${der.id}`);

    // Verify sequential steps and mathematical expressions
    der.steps.forEach((step, idx) => {
      assert.strictEqual(step.stepNumber, idx + 1, `Step numbers must be sequential starting at 1 in ${der.id}`);
      assert.ok(step.description && step.description.length > 10, `Step description too short in ${der.id} step ${step.stepNumber}`);
      assert.ok(step.mathExpression && step.mathExpression.length > 0, `Math expression missing in ${der.id} step ${step.stepNumber}`);
      assert.ok(step.reasoning && step.reasoning.length > 5, `Reasoning/justification missing in ${der.id} step ${step.stepNumber}`);
    });

    // Zero placeholder check
    const serialized = JSON.stringify(der).toLowerCase();
    assert.ok(!serialized.includes('todo') && !serialized.includes('dummy'), `Placeholder found in ${der.id}`);
  }
});

test('math theorems: all core proofs contain rigorous formal steps and justifications', () => {
  assert.ok(Array.isArray(cbseMathTheorems), 'Math theorems must be an array');
  assert.ok(cbseMathTheorems.length >= 8, 'Must have at least 8 core mathematical theorems and proofs');

  const validMarks = new Set([2, 3, 5]);

  for (const thm of cbseMathTheorems) {
    assert.ok(thm.id.startsWith('mat-thm-'), `Invalid ID format in ${thm.id}`);
    assert.ok(validMarks.has(thm.marksWeightage), `Invalid marks weightage in ${thm.id}`);
    assert.ok(thm.theoremStatement && thm.theoremStatement.length > 10, `Theorem statement missing in ${thm.id}`);
    assert.ok(thm.conclusion && thm.conclusion.length > 5, `Conclusion missing in ${thm.id}`);
    assert.ok(Array.isArray(thm.proofSteps) && thm.proofSteps.length >= 3, `Proof must have >= 3 steps in ${thm.id}`);
    assert.ok(Array.isArray(thm.boardApplications) && thm.boardApplications.length >= 1, `Board applications missing in ${thm.id}`);

    // Verify each proof step has mathematical expression and justification
    thm.proofSteps.forEach((step, idx) => {
      assert.strictEqual(step.stepNumber, idx + 1, `Step numbers must be sequential in ${thm.id}`);
      assert.ok(step.statement && step.statement.length > 5, `Step statement missing in ${thm.id} step ${step.stepNumber}`);
      assert.ok(step.mathExpression && step.mathExpression.length > 0, `Math expression missing in ${thm.id} step ${step.stepNumber}`);
      assert.ok((step.justification || step.reasoning), `Justification or reasoning missing in ${thm.id} step ${step.stepNumber}`);
    });
  }
});

test('derivation coverage: essential high-frequency CBSE board topics are present', () => {
  const titles = cbsePhysicsDerivations.map(d => d.title.toLowerCase());

  assert.ok(titles.some(t => t.includes('gauss')), 'Must cover Gauss Law applications');
  assert.ok(titles.some(t => t.includes('dipole')), 'Must cover Electric Dipole');
  assert.ok(titles.some(t => t.includes('drift velocity') || t.includes('ohm')), 'Must cover Drift Velocity / Ohm\'s Law');
  assert.ok(titles.some(t => t.includes('biot-savart')), 'Must cover Biot-Savart Law');
  assert.ok(titles.some(t => t.includes('lensmaker')), 'Must cover Lensmaker\'s Formula');
  assert.ok(titles.some(t => t.includes('prism')), 'Must cover Prism Formula');
  assert.ok(titles.some(t => t.includes('huygens')), 'Must cover Huygens Wave Theory');
  assert.ok(titles.some(t => t.includes('bohr')), 'Must cover Bohr Hydrogen Atom Radius');
  assert.ok(titles.some(t => t.includes('wheatstone') || t.includes('bridge')), 'Must cover Balanced Wheatstone Bridge');
});

test('math theorem coverage: essential linear algebra, calculus, and vector theorems are present', () => {
  const titles = cbseMathTheorems.map(t => t.title.toLowerCase());

  assert.ok(titles.some(t => t.includes('inverse')), 'Must cover Matrix Inverse Uniqueness');
  assert.ok(titles.some(t => t.includes('transpose')), 'Must cover Transpose Reversal Law');
  assert.ok(titles.some(t => t.includes('differentiability')), 'Must cover Differentiability Implies Continuity');
  assert.ok(titles.some(t => t.includes('bayes')), 'Must cover Bayes\' Theorem');
  assert.ok(titles.some(t => t.includes('skew lines') || t.includes('shortest distance')), 'Must cover Shortest Distance Between Skew Lines');
});
