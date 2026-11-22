import test from 'node:test';
import assert from 'node:assert/strict';
import { parsePlannerText,validPlannerDate,plannerIdentity } from '../dist/js/import-parser.js';

test('planner dates come from explicit source rows and preserve unknown chapter coverage',()=>{
  const rows=parsePlannerText('24/11/2026 Physics unit test\n26 November 2026 Chemistry\nEnglish 2026-12-04');
  assert.deepEqual(rows.map(x=>[x.day,x.subject]),[['2026-11-24','physics'],['2026-11-26','chemistry'],['2026-12-04','english']]);
  assert.ok(rows.every(x=>x.coverage.length===0));
});

test('an explicit month/year heading supports shortened rows but missing years stay unknown',()=>{
  assert.equal(parsePlannerText('November 2026\n24 Physics')[0].day,'2026-11-24');
  const incomplete=parsePlannerText('24 November Physics');
  assert.equal(incomplete[0].day,'');
  assert.equal(incomplete[0].selected,false);
  assert.match(incomplete[0].warnings.join(' '),/correction/);
});

test('invalid dates, ambiguous date order and mixed subjects require review',()=>{
  const rows=parsePlannerText('31/11/2026 Mathematics\n03/04/2026 Chemistry\n24/11/2026 Physics and Mathematics');
  assert.equal(rows[0].day,'');
  assert.equal(rows[0].selected,false);
  assert.match(rows[1].warnings.join(' '),/DD\/MM/);
  assert.equal(rows[2].subject,'');
  assert.equal(rows[2].selected,false);
});

test('source repeats stay visible for review and stable identities prevent duplicate commits',()=>{
  const rows=parsePlannerText('24/11/2026 Physics\n24/11/2026 Physics');
  assert.equal(rows.length,2);
  assert.equal(plannerIdentity(rows[0]),plannerIdentity(rows[1]));
  assert.equal(plannerIdentity({title:'  Physics  Test ',day:'2026-11-24',subject:'physics'}),'2026-11-24|physics|physics test');
});

test('academic year spans cannot silently supply a full calendar year for shortened dates',()=>{
  const rows=parsePlannerText('Test planner 2026–27\n24/11 Physics');
  assert.equal(rows[0].day,'');
});

test('source date validation rejects rollover and accepts real leap days',()=>{
  assert.equal(validPlannerDate('2026-02-29'),false);
  assert.equal(validPlannerDate('2028-02-29'),true);
  assert.equal(validPlannerDate('2026-13-01'),false);
  assert.equal(validPlannerDate('2026-11-24'),true);
});
