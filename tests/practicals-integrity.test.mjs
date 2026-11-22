/**
 * Automated Test Suite: CBSE Laboratory Practicals & Viva-Voce Integrity
 * Verifies apparatus specifications, chemical equations, titration stoichiometry,
 * observation schemas, fitness norms, and external examiner Viva-Voce banks.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { cbsePhysicsPracticals } from '../dist/js/data/cbse-practicals-physics.js';
import { cbseSaltRadicals, cbseTitrations, cbseFunctionalGroupTests } from '../dist/js/data/cbse-practicals-chemistry.js';
import { cbseFitnessTestBattery, cbseMajorSportsSpecs, cbseYogicProtocols, cbsePEVivaQuestions } from '../dist/js/data/cbse-practicals-pe.js';

test('physics practicals: section A and B experiments have full laboratory manual structure', () => {
  assert.ok(Array.isArray(cbsePhysicsPracticals) && cbsePhysicsPracticals.length >= 4, 'Must have >= 4 core physics practicals');

  const sections = new Set(cbsePhysicsPracticals.map(p => p.section));
  assert.ok(sections.has('Section-A'), 'Must have Section-A practicals');
  assert.ok(sections.has('Section-B'), 'Must have Section-B practicals');

  for (const exp of cbsePhysicsPracticals) {
    assert.ok(exp.aim && exp.aim.length > 20, `Aim too short in ${exp.id}`);
    assert.ok(exp.apparatusRequired.length >= 4, `Apparatus list too brief in ${exp.id}`);
    assert.ok(exp.workingFormulae.length >= 1, `Working formulae missing in ${exp.id}`);
    assert.ok(exp.procedureSteps.length >= 4, `Procedure steps too brief in ${exp.id}`);
    assert.ok(exp.observationTableHeaders.length >= 2, `Table headers missing in ${exp.id}`);
    assert.ok(exp.sampleObservationData.length >= 3, `Must provide >= 3 sample readings in ${exp.id}`);
    assert.ok(exp.precautions.length >= 2, `Precautions missing in ${exp.id}`);
    assert.ok(exp.sourcesOfError.length >= 2, `Sources of error missing in ${exp.id}`);
    assert.ok(exp.vivaVoceQuestions.length >= 3, `Must have >= 3 Viva questions in ${exp.id}`);

    for (const v of exp.vivaVoceQuestions) {
      assert.ok(v.question.length > 10, 'Viva question too short');
      assert.ok(v.expectedAnswer.length > 20, 'Viva expected answer too short');
      assert.ok(v.examinerFocus.length > 5, 'Examiner focus missing');
    }
  }
});

test('chemistry salt analysis: acid and basic radicals have valid preliminary and confirmatory tests', () => {
  assert.ok(Array.isArray(cbseSaltRadicals) && cbseSaltRadicals.length >= 6, 'Must have at least 6 qualitative salt radicals');

  const hasAnion = cbseSaltRadicals.some(r => r.radicalType === 'acid-radical-anion');
  const hasCation = cbseSaltRadicals.some(r => r.radicalType === 'basic-radical-cation');
  assert.ok(hasAnion, 'Must contain acid radical anions (CO3, Cl, NO3, SO4)');
  assert.ok(hasCation, 'Must contain basic radical cations (NH4, Pb, Cu, Al)');

  for (const radical of cbseSaltRadicals) {
    assert.ok(radical.groupReagent.length > 3, `Group reagent missing in ${radical.name}`);
    assert.ok(radical.preliminaryTest.length > 10, `Preliminary test missing in ${radical.name}`);
    assert.ok(radical.confirmatoryTests.length >= 1, `Must have >= 1 confirmatory test in ${radical.name}`);

    for (const conf of radical.confirmatoryTests) {
      assert.ok(conf.testName.length > 3, 'Confirmatory test name missing');
      assert.ok(conf.procedure.length > 10, 'Procedure missing');
      assert.ok(conf.observation.length > 10, 'Observation missing');
      assert.ok(conf.chemicalEquation.length > 5, 'Chemical equation missing');
    }
  }
});

test('chemistry titrations: redox experiments contain balanced ionic equations and self-indicator details', () => {
  assert.ok(Array.isArray(cbseTitrations) && cbseTitrations.length >= 2, 'Must have at least 2 standard KMnO4 titrations');

  for (const titr of cbseTitrations) {
    assert.ok(titr.ionicEquation.includes('MnO4^-'), `Ionic equation must involve permanganate in ${titr.id}`);
    assert.ok(titr.indicator.includes('self-indicator') || titr.indicator.includes('KMnO4'), `Must specify self-indicator in ${titr.id}`);
    assert.ok(titr.endPoint.toLowerCase().includes('pink'), `End point must mention pink color in ${titr.id}`);
    assert.ok(titr.sampleTitrationData.length >= 3, `Must provide at least 3 pilot burette readings in ${titr.id}`);
    assert.ok(titr.vivaVoceQuestions.length >= 2, `Must include external examiner Viva questions in ${titr.id}`);
  }
});

test('chemistry functional groups: organic tests cover characteristic identification reactions', () => {
  assert.ok(Array.isArray(cbseFunctionalGroupTests) && cbseFunctionalGroupTests.length >= 5, 'Must cover 5 standard organic functional groups');

  for (const fg of cbseFunctionalGroupTests) {
    assert.ok(fg.groupName.length > 3, 'Group name missing');
    assert.ok(fg.reagent.length > 3, 'Reagent missing');
    assert.ok(fg.observation.length > 10, 'Observation description missing');
    assert.ok(fg.inference.length > 10, 'Inference missing');
  }
});

test('physical education practicals: fitness battery, sports specs, yogic asanas, and viva integrity', () => {
  assert.ok(Array.isArray(cbseFitnessTestBattery) && cbseFitnessTestBattery.length >= 5, 'Fitness battery must have >= 5 items');
  for (const fit of cbseFitnessTestBattery) {
    assert.ok(fit.class12Norms.length >= 2, `Norms must cover male and female in ${fit.id}`);
    assert.ok(fit.protocolSteps.length >= 2, `Protocol steps missing in ${fit.id}`);
  }

  assert.ok(Array.isArray(cbseMajorSportsSpecs) && cbseMajorSportsSpecs.length >= 2, 'Must have major sports specs');
  for (const sport of cbseMajorSportsSpecs) {
    assert.ok(sport.courtOrFieldDimensions.length > 20, `Court dimensions missing for ${sport.sportName}`);
    assert.ok(sport.officialRulesAndViolations.length >= 3, `Rules missing for ${sport.sportName}`);
  }

  assert.ok(Array.isArray(cbseYogicProtocols) && cbseYogicProtocols.length >= 2, 'Must have yogic asanas');
  for (const asana of cbseYogicProtocols) {
    assert.ok(asana.posturalSteps.length >= 3, `Steps missing for ${asana.asanaName}`);
    assert.ok(asana.contraindications.length >= 1, `Contraindications missing for ${asana.asanaName}`);
  }

  assert.ok(Array.isArray(cbsePEVivaQuestions) && cbsePEVivaQuestions.length >= 4, 'Must have PE viva questions');
  for (const v of cbsePEVivaQuestions) {
    assert.ok(v.question.length > 10, 'Question too short');
    assert.ok(v.expectedAnswer.length > 15, 'Answer too short');
  }
});
