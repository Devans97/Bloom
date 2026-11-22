import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateKnockoutFixture,
  calculateLeagueMatches,
  calculateHarvardFitnessIndex,
  cbsePosturalDeformities,
  cbseLifestyleYogaProtocols,
  cbseBiomechanicsTopics,
  priceProtocolDetails
} from '../dist/js/data/cbse-pe-mastery.js';

test('knockout fixture engine: computes mathematically exact CBSE tournament distributions', () => {
  // Case 1: N = 11 (Odd teams, Byes required)
  const f11 = calculateKnockoutFixture(11);
  assert.equal(f11.totalTeams, 11);
  assert.equal(f11.totalMatches, 10, 'Total matches = N - 1');
  assert.equal(f11.nextPowerOfTwo, 16);
  assert.equal(f11.totalByes, 5, 'Total Byes = 16 - 11 = 5');
  assert.equal(f11.teamsUpperHalf, 6, 'Upper half = (11 + 1)/2 = 6');
  assert.equal(f11.teamsLowerHalf, 5, 'Lower half = (11 - 1)/2 = 5');
  assert.equal(f11.byesUpperHalf, 2, 'Byes Upper = (5 - 1)/2 = 2');
  assert.equal(f11.byesLowerHalf, 3, 'Byes Lower = (5 + 1)/2 = 3');
  assert.equal(f11.numberOfRounds, 4, '16 = 2^4, so 4 rounds');

  // Case 2: N = 16 (Perfect power of 2, zero Byes)
  const f16 = calculateKnockoutFixture(16);
  assert.equal(f16.totalMatches, 15);
  assert.equal(f16.totalByes, 0, 'No byes when N is power of 2');
  assert.equal(f16.teamsUpperHalf, 8);
  assert.equal(f16.teamsLowerHalf, 8);
  assert.equal(f16.byesUpperHalf, 0);
  assert.equal(f16.byesLowerHalf, 0);

  // Case 3: N = 19
  const f19 = calculateKnockoutFixture(19);
  assert.equal(f19.totalMatches, 18);
  assert.equal(f19.nextPowerOfTwo, 32);
  assert.equal(f19.totalByes, 13);
  assert.equal(f19.teamsUpperHalf, 10);
  assert.equal(f19.teamsLowerHalf, 9);
  assert.equal(f19.byesUpperHalf, 6);
  assert.equal(f19.byesLowerHalf, 7);
  assert.equal(f19.numberOfRounds, 5);

  // Error case: N < 2
  assert.throws(() => calculateKnockoutFixture(1), /at least 2 participating teams/);
});

test('league matches formula: validates single and double round-robin calculations', () => {
  // Single League: N(N - 1) / 2
  assert.equal(calculateLeagueMatches(6), 15);
  assert.equal(calculateLeagueMatches(8), 28);
  assert.equal(calculateLeagueMatches(10), 45);

  // Double League: N(N - 1)
  assert.equal(calculateLeagueMatches(6, true), 30);
  assert.equal(calculateLeagueMatches(8, true), 56);
});

test('harvard step test PFI: accurately evaluates aerobic physical fitness ratings', () => {
  // 300 seconds test, pulse sum = 75 + 65 + 55 = 195
  // PFI = (100 * 300) / (2 * 195) = 30000 / 390 = 76.92
  const res1 = calculateHarvardFitnessIndex(300, 75, 65, 55);
  assert.equal(res1.pfi, 76.9);
  assert.equal(res1.rating, 'High Average');

  // Rapid form with single pulse count
  // PFI = (100 * 300) / (5.5 * 60) = 30000 / 330 = 90.9
  const res2 = calculateHarvardFitnessIndex(300, 60);
  assert.equal(res2.pfi, 90.9);
  assert.equal(res2.rating, 'Excellent');

  // Low score
  const res3 = calculateHarvardFitnessIndex(180, 95, 90, 85);
  assert.ok(res3.pfi < 55);
  assert.equal(res3.rating, 'Poor');
});

test('postural deformities: complete anatomical and corrective coverage', () => {
  assert.equal(cbsePosturalDeformities.length, 6, 'Must cover all 6 official CBSE deformities');

  const names = cbsePosturalDeformities.map(d => d.name);
  assert.ok(names.some(n => n.includes('Kyphosis')), 'Must include Kyphosis');
  assert.ok(names.some(n => n.includes('Lordosis')), 'Must include Lordosis');
  assert.ok(names.some(n => n.includes('Scoliosis')), 'Must include Scoliosis');
  assert.ok(names.some(n => n.includes('Knock Knees')), 'Must include Knock Knees');
  assert.ok(names.some(n => n.includes('Bow Legs')), 'Must include Bow Legs');
  assert.ok(names.some(n => n.includes('Flat Foot')), 'Must include Flat Foot');

  for (const def of cbsePosturalDeformities) {
    assert.ok(def.primaryCauses.length >= 3, `${def.name} must list at least 3 causes`);
    assert.ok(def.correctiveExercises.length >= 3, `${def.name} must list at least 3 exercises`);
    assert.ok(def.recommendedAsanas.length >= 2, `${def.name} must list at least 2 asanas`);
    assert.ok(def.contraindications.length >= 1, `${def.name} must specify contraindications`);
  }
});

test('lifestyle yoga protocols: covers 5 lifestyle disorders and PRICE protocol', () => {
  assert.equal(cbseLifestyleYogaProtocols.length, 4, 'Must cover official lifestyle diseases');

  for (const proto of cbseLifestyleYogaProtocols) {
    assert.ok(proto.pathology.length > 20, `${proto.disease} must have pathology explanation`);
    assert.ok(proto.asanas.length >= 2, `${proto.disease} must have at least 2 asanas`);
    for (const asana of proto.asanas) {
      assert.ok(asana.procedureSteps.length >= 3, `${asana.name} must have step-by-step procedure`);
      assert.ok(asana.physiologicalBenefits.length >= 1, `${asana.name} must have physiological benefits`);
    }
  }

  // Verify PRICE protocol
  assert.equal(priceProtocolDetails.acronym, 'PRICE');
  assert.equal(priceProtocolDetails.steps.length, 5);
  const letters = priceProtocolDetails.steps.map(s => s.letter).join('');
  assert.equal(letters, 'PRICE');
  assert.ok(priceProtocolDetails.contraindicationMnemonic.includes('NO HARM'));
});

test('sports biomechanics: covers newton laws of motion and 3 lever classes', () => {
  assert.ok(cbseBiomechanicsTopics.length >= 4, 'Must cover 3 Newton laws and Levers');

  const titles = cbseBiomechanicsTopics.map(t => t.title);
  assert.ok(titles.some(t => t.includes('First Law')), 'Must cover Newton First Law');
  assert.ok(titles.some(t => t.includes('Second Law')), 'Must cover Newton Second Law');
  assert.ok(titles.some(t => t.includes('Third Law')), 'Must cover Newton Third Law');
  assert.ok(titles.some(t => t.includes('Levers in Sports')), 'Must cover Levers');

  for (const topic of cbseBiomechanicsTopics) {
    assert.ok(topic.physicalPrinciple.length > 10, 'Topic must state physical principle');
    assert.ok(topic.cbseApplications.length >= 2, 'Topic must have at least 2 sports applications');
    for (const app of topic.cbseApplications) {
      assert.ok(app.sport, 'Application must state sport');
      assert.ok(app.mechanism.length > 20, 'Application must describe biomechanical mechanism');
      assert.ok(app.kineticAdvantage.length > 10, 'Application must describe kinetic advantage');
    }
  }
});
