/**
 * Automated Test Suite: CBSE Organic Reactions & Chemical Distinction Tests Integrity
 * Verifies all 29 official named reactions, reaction mechanisms, balanced equations,
 * one-step distinction tests, and synthetic roadmap pathways.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { cbseNamedReactions } from '../dist/js/data/cbse-organic-reactions.js';
import { cbseDistinctionTests, cbseSyntheticRoadmaps } from '../dist/js/reaction-roadmap-ui.js';

test('organic reactions: all 29 official CBSE named reactions are present and fully specified', () => {
  assert.ok(Array.isArray(cbseNamedReactions), 'Named reactions must be an array');
  assert.strictEqual(cbseNamedReactions.length, 29, 'Must contain all 29 official CBSE named organic reactions');

  const validMechanismTypes = new Set([
    'Electrophilic Addition',
    'Nucleophilic Addition',
    'Electrophilic Substitution',
    'Nucleophilic Substitution',
    'Elimination',
    'Oxidation-Reduction',
    'Rearrangement',
    'Condensation'
  ]);

  for (const rxn of cbseNamedReactions) {
    assert.ok(rxn.id.startsWith('che-rxn-'), `Invalid ID format in ${rxn.id}`);
    assert.ok(rxn.name && rxn.name.length > 3, `Reaction name missing in ${rxn.id}`);
    assert.ok(rxn.chapterId.startsWith('chemistry-'), `Chapter must start with chemistry- in ${rxn.id}`);
    assert.ok(Array.isArray(rxn.reactants) && rxn.reactants.length >= 1, `Reactants missing in ${rxn.id}`);
    assert.ok(rxn.reagents && rxn.reagents.length > 2, `Reagents missing in ${rxn.id}`);
    assert.ok(rxn.conditions && rxn.conditions.length > 2, `Conditions missing in ${rxn.id}`);
    assert.ok(Array.isArray(rxn.products) && rxn.products.length >= 1, `Products missing in ${rxn.id}`);
    assert.ok(rxn.balancedEquation && rxn.balancedEquation.length > 5, `Balanced equation missing in ${rxn.id}`);
    assert.ok(validMechanismTypes.has(rxn.mechanismType), `Invalid mechanism type in ${rxn.id}`);
    assert.ok(rxn.syntheticUtility && rxn.syntheticUtility.length > 10, `Synthetic utility missing in ${rxn.id}`);
    assert.ok(Array.isArray(rxn.commonBoardTraps) && rxn.commonBoardTraps.length >= 1, `Board traps missing in ${rxn.id}`);
  }
});

test('named reactions coverage: essential board organic reactions are verified', () => {
  const names = cbseNamedReactions.map(r => r.name.toLowerCase());

  assert.ok(names.some(n => n.includes('sandmeyer')), 'Must include Sandmeyer Reaction');
  assert.ok(names.some(n => n.includes('finkelstein')), 'Must include Finkelstein Reaction');
  assert.ok(names.some(n => n.includes('swarts')), 'Must include Swarts Reaction');
  assert.ok(names.some(n => n.includes('wurtz-fittig') || n.includes('wurtz')), 'Must include Wurtz / Wurtz-Fittig');
  assert.ok(names.some(n => n.includes('kolbe')), 'Must include Kolbe\'s Reaction');
  assert.ok(names.some(n => n.includes('reimer-tiemann')), 'Must include Reimer-Tiemann Reaction');
  assert.ok(names.some(n => n.includes('williamson')), 'Must include Williamson Ether Synthesis');
  assert.ok(names.some(n => n.includes('rosenmund')), 'Must include Rosenmund Reduction');
  assert.ok(names.some(n => n.includes('stephen')), 'Must include Stephen Reaction');
  assert.ok(names.some(n => n.includes('etard')), 'Must include Etard Reaction');
  assert.ok(names.some(n => n.includes('clemmensen')), 'Must include Clemmensen Reduction');
  assert.ok(names.some(n => n.includes('wolff-kishner')), 'Must include Wolff-Kishner Reduction');
  assert.ok(names.some(n => n.includes('tollens')), 'Must include Tollens\' Test');
  assert.ok(names.some(n => n.includes('fehling')), 'Must include Fehling\'s Test');
  assert.ok(names.some(n => n.includes('iodoform') || n.includes('haloform')), 'Must include Iodoform Reaction');
  assert.ok(names.some(n => n.includes('aldol')), 'Must include Aldol Condensation');
  assert.ok(names.some(n => n.includes('cannizzaro')), 'Must include Cannizzaro Reaction');
  assert.ok(names.some(n => n.includes('hell-volhard-zelinsky') || n.includes('hvz')), 'Must include HVZ Reaction');
  assert.ok(names.some(n => n.includes('gabriel phthalimide')), 'Must include Gabriel Phthalimide Synthesis');
  assert.ok(names.some(n => n.includes('hoffmann bromamide')), 'Must include Hoffmann Bromamide Degradation');
  assert.ok(names.some(n => n.includes('carbylamine')), 'Must include Carbylamine Reaction');
  assert.ok(names.some(n => n.includes('hinsberg')), 'Must include Hinsberg Reaction');
  assert.ok(names.some(n => n.includes('diazotization')), 'Must include Diazotization');
  assert.ok(names.some(n => n.includes('coupling')), 'Must include Azo Coupling Reaction');
});

test('chemical distinction tests: all compound pairs have unique visible observations and equations', () => {
  assert.ok(Array.isArray(cbseDistinctionTests), 'Distinction tests must be an array');
  assert.ok(cbseDistinctionTests.length >= 6, 'Must cover at least 6 standard distinction test pairs');

  for (const pair of cbseDistinctionTests) {
    assert.ok(pair.compoundA && pair.compoundA.length > 3, 'Compound A missing');
    assert.ok(pair.compoundB && pair.compoundB.length > 3, 'Compound B missing');
    assert.ok(pair.testReagent && pair.testReagent.length > 3, 'Test reagent missing');
    assert.ok(pair.observationA && pair.observationA.length > 5, 'Observation A missing');
    assert.ok(pair.observationB && pair.observationB.length > 5, 'Observation B missing');
    assert.notStrictEqual(pair.observationA, pair.observationB, 'Observations must be distinct between the two compounds');
    assert.ok(pair.chemicalEquationA && pair.chemicalEquationA.length > 5, 'Equation A missing');
  }
});

test('synthetic roadmaps: pathways contain step-up, step-down, and aromatic conversion strategies', () => {
  assert.ok(Array.isArray(cbseSyntheticRoadmaps), 'Synthetic roadmaps must be an array');
  assert.ok(cbseSyntheticRoadmaps.length >= 3, 'Must have at least 3 master conversion roadmaps');

  for (const map of cbseSyntheticRoadmaps) {
    assert.ok(map.title && map.title.length > 5, 'Title missing');
    assert.ok(map.startingMaterial && map.targetProduct, 'Starting and target materials required');
    assert.strictEqual(map.steps.length, map.numberOfSteps, 'Number of steps must match step array length');

    map.steps.forEach((step, idx) => {
      assert.strictEqual(step.stepNumber, idx + 1, 'Steps must be sequential');
      assert.ok(step.reagentAndCondition && step.reagentAndCondition.length > 3, 'Reagents missing');
      assert.ok(step.intermediateProduct && step.intermediateProduct.length > 3, 'Product missing');
      assert.ok(step.cbseKeyNote && step.cbseKeyNote.length > 10, 'CBSE key note missing');
    });
  }
});
