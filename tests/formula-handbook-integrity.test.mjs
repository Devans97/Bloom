/**
 * Automated Test Suite: CBSE Formula Handbook & Dimensional Compendium Integrity
 * Verifies mathematical representations, SI units, dimensional formulas,
 * variable legends, boundary constraints, and zero placeholder content.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { cbseFormulaHandbook } from '../dist/js/data/cbse-formula-handbook.js';

test('formula handbook: contains verified equations across physics, chemistry, and mathematics', () => {
  assert.ok(Array.isArray(cbseFormulaHandbook), 'Formula handbook must be an array');
  assert.ok(cbseFormulaHandbook.length >= 15, 'Must contain at least 15 core board examination formulas');

  const subjects = new Set(cbseFormulaHandbook.map(f => f.subjectId));
  assert.ok(subjects.has('physics'), 'Must cover Physics formulas');
  assert.ok(subjects.has('chemistry'), 'Must cover Chemistry formulas');
  assert.ok(subjects.has('math'), 'Must cover Mathematics formulas');

  const validFrequencies = new Set(['High', 'Very High', 'Guaranteed']);

  for (const f of cbseFormulaHandbook) {
    assert.ok(f.id.startsWith('f-'), `Invalid ID prefix in ${f.id}`);
    assert.ok(f.name && f.name.length > 3, `Formula name missing in ${f.id}`);
    assert.ok(f.chapterName && f.chapterName.length > 3, `Chapter name missing in ${f.id}`);
    assert.ok(f.latexExpression && f.latexExpression.length > 3, `LaTeX expression missing in ${f.id}`);
    assert.ok(f.plainTextExpression && f.plainTextExpression.length > 3, `Plain text expression missing in ${f.id}`);
    assert.ok(f.derivedSIUnit && f.derivedSIUnit.length > 0, `SI unit missing in ${f.id}`);
    assert.ok(validFrequencies.has(f.boardFrequency), `Invalid frequency rating in ${f.id}`);
    assert.ok(f.conditionsAndLimitations && f.conditionsAndLimitations.length > 10, `Boundary conditions missing in ${f.id}`);
    assert.ok(Array.isArray(f.variablesLegend) && f.variablesLegend.length >= 2, `Variables legend must have >= 2 items in ${f.id}`);

    // Verify each variable has symbol, meaning, and unit
    for (const v of f.variablesLegend) {
      assert.ok(v.symbol && v.symbol.length > 0, `Symbol missing in ${f.id}`);
      assert.ok(v.meaning && v.meaning.length > 3, `Meaning missing in ${f.id}`);
      assert.ok(v.siUnit && v.siUnit.length > 0, `SI Unit missing in ${f.id}`);
    }

    // Verify physics formulas specify dimensional formulas
    if (f.subjectId === 'physics') {
      assert.ok(f.dimensionalFormula && f.dimensionalFormula.startsWith('['), `Physics formula ${f.id} must have dimensional formula`);
    }

    // Zero placeholder check
    const serialized = JSON.stringify(f).toLowerCase();
    assert.ok(!serialized.includes('todo') && !serialized.includes('dummy') && !serialized.includes('lorem'),
      `Placeholder text found in ${f.id}`);
  }
});

test('physics formulas: cover electrostatics, current, magnetism, ac, optics, and modern physics', () => {
  const phy = cbseFormulaHandbook.filter(f => f.subjectId === 'physics');
  const names = phy.map(f => f.name.toLowerCase());

  assert.ok(names.some(n => n.includes('coulomb')), 'Must include Coulomb\'s law');
  assert.ok(names.some(n => n.includes('dipole')), 'Must include Dipole electric field');
  assert.ok(names.some(n => n.includes('gauss')), 'Must include Gauss law');
  assert.ok(names.some(n => n.includes('drift velocity')), 'Must include Drift velocity');
  assert.ok(names.some(n => n.includes('biot-savart')), 'Must include Biot-Savart law');
  assert.ok(names.some(n => n.includes('lcr') || n.includes('impedance')), 'Must include LCR Impedance');
  assert.ok(names.some(n => n.includes('lensmaker')), 'Must include Lensmaker\'s formula');
  assert.ok(names.some(n => n.includes('einstein') || n.includes('photoelectric')), 'Must include Einstein\'s photoelectric equation');
  assert.ok(names.some(n => n.includes('bohr')), 'Must include Bohr radius and energy levels');
});

test('chemistry formulas: cover colligative properties, nernst equation, kohlrausch, and kinetics', () => {
  const chem = cbseFormulaHandbook.filter(f => f.subjectId === 'chemistry');
  const names = chem.map(f => f.name.toLowerCase());

  assert.ok(names.some(n => n.includes('colligative') || n.includes('van \'t hoff')), 'Must include Colligative properties');
  assert.ok(names.some(n => n.includes('nernst')), 'Must include Nernst equation');
  assert.ok(names.some(n => n.includes('kohlrausch')), 'Must include Kohlrausch law');
  assert.ok(names.some(n => n.includes('arrhenius') || n.includes('rate')), 'Must include Kinetics and Arrhenius equation');
});

test('mathematics formulas: cover matrices, calculus integrals, differential equations, 3d, and probability', () => {
  const math = cbseFormulaHandbook.filter(f => f.subjectId === 'math');
  const names = math.map(f => f.name.toLowerCase());

  assert.ok(names.some(n => n.includes('inverse') || n.includes('matrix')), 'Must include Matrix inverse method');
  assert.ok(names.some(n => n.includes('king') || n.includes('integral')), 'Must include King\'s property of definite integrals');
  assert.ok(names.some(n => n.includes('differential equation') || n.includes('integrating factor')), 'Must include Linear differential equations');
  assert.ok(names.some(n => n.includes('skew lines') || n.includes('distance')), 'Must include Shortest distance between skew lines');
  assert.ok(names.some(n => n.includes('bayes')), 'Must include Bayes\' theorem');
});
