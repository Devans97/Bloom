import test from 'node:test';
import assert from 'node:assert/strict';
import {
  seal,
  unseal,
  isEnvelope,
  setVaultPassphrase,
  getVaultPassphrase
} from '../dist/js/crypto-vault.js';

test('crypto vault: round-trip encrypts and decrypts state with Web Crypto AES-256-GCM', async () => {
  const secretPayload = {
    learner: 'Aastha',
    exam: 'CBSE Class XII 2027',
    notes: 'Mastered Gauss theorem derivations and organic reaction mechanisms.',
    studyMinutes: 1420
  };
  const passphrase = 'AasthaBoardExam#2027SecurePassphrase!';

  const envelope = await seal(secretPayload, passphrase);
  assert.ok(isEnvelope(envelope));
  assert.equal(envelope.format, 'bloom-vault');
  assert.equal(envelope.version, 1);
  assert.equal(envelope.cipher, 'AES-256-GCM');
  assert.equal(envelope.kdf, 'PBKDF2-SHA256');
  assert.equal(envelope.iterations, 310000);

  const restored = await unseal(envelope, passphrase);
  assert.deepEqual(restored, secretPayload);
});

test('crypto vault security: incorrect passphrase strictly throws authentication error', async () => {
  const payload = { secret: 'Confidential CBSE notes' };
  const envelope = await seal(payload, 'CorrectPassphrase123');

  await assert.rejects(
    async () => {
      await unseal(envelope, 'WrongPassphrase456');
    },
    /The passphrase is incorrect, or the encrypted vault was changed or damaged/
  );
});

test('crypto vault tamper resistance: modifying 1 bit of ciphertext causes AES-GCM auth tag rejection', async () => {
  const payload = { secret: 'Integrity-checked content' };
  const envelope = await seal(payload, 'TestPass123');

  // Flip the first character of the ciphertext
  const tamperedCiphertext =
    (envelope.ciphertext[0] === 'A' ? 'B' : 'A') + envelope.ciphertext.slice(1);

  const tamperedEnvelope = {
    ...envelope,
    ciphertext: tamperedCiphertext
  };

  await assert.rejects(
    async () => {
      await unseal(tamperedEnvelope, 'TestPass123');
    },
    /The passphrase is incorrect, or the encrypted vault was changed or damaged/
  );
});

test('crypto vault validation: rejects non-envelope objects and invalid structures', async () => {
  assert.equal(isEnvelope(null), false);
  assert.equal(isEnvelope(undefined), false);
  assert.equal(isEnvelope({}), false);
  assert.equal(isEnvelope({ format: 'other' }), false);

  await assert.rejects(
    async () => {
      await unseal({ invalid: true }, 'passphrase');
    },
    /Choose a supported BLOOM encrypted vault/
  );
});

test('session memory: passphrase is kept in volatile memory only and clearable', () => {
  setVaultPassphrase('temporary-session-pass');
  assert.equal(getVaultPassphrase(), 'temporary-session-pass');

  setVaultPassphrase(null);
  assert.equal(getVaultPassphrase(), null);
});
