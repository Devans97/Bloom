import test from 'node:test';
import assert from 'node:assert/strict';
import { CBSE_SUBJECTS, CBSE_CHAPTERS, getSubject } from '../dist/js/curriculum.js';

test('exactly five board subjects appear with official codes and 2027 dates', () => {
  assert.equal(CBSE_SUBJECTS.length, 5);
  const subjectCodes = CBSE_SUBJECTS.map(s => s.code).sort();
  assert.deepEqual(subjectCodes, ['041', '042', '043', '048', '301']);

  // Verified Exam Dates from CBSE Signed Date Sheet (06 Nov 2026)
  assert.equal(getSubject('physics')?.examDate, '2027-02-16');
  assert.equal(getSubject('pe')?.examDate, '2027-02-18');
  assert.equal(getSubject('chemistry')?.examDate, '2027-02-27');
  assert.equal(getSubject('english')?.examDate, '2027-03-05');
  assert.equal(getSubject('math')?.examDate, '2027-03-09');

  // Strict non-negotiable: Yoga is not a 6th board subject
  assert.equal(CBSE_SUBJECTS.some(s => s.title.toLowerCase().includes('yoga')), false);
  const peChapters = CBSE_CHAPTERS.filter(c => c.subjectId === 'pe');
  assert.ok(peChapters.some(c => c.title.toLowerCase().includes('yoga')), 'Yoga must be an internal unit of PE');
});

test('marks allocations are preserved at unit level without fabricated chapter predictions', () => {
  const phyChapters = CBSE_CHAPTERS.filter(c => c.subjectId === 'physics');
  // First two chapters share the 16 marks allocation of Units I-II
  assert.equal(phyChapters[0].unitMarks, 16);
  assert.equal(phyChapters[1].unitMarks, 16);
  assert.match(phyChapters[0].unitGroup, /16 Marks/);
});
