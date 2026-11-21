import test from 'node:test';
import assert from 'node:assert/strict';
import { sealVault, unsealVault, isVaultEnvelope } from '../dist/js/crypto-vault.js';

test('Web Crypto vault encrypts and decrypts state safely with passphrase', async () => {
  const mockState = {
    profile: { name: 'Aastha', medium: 'English' },
    secretNotes: 'Aastha private handwritten reflections'
  };

  const passphrase = 'AasthaSecureVault2027!';
  const envelope = await sealVault(mockState, passphrase);

  assert.ok(isVaultEnvelope(envelope), 'Must produce valid vault envelope');
  assert.equal(envelope.format, 'bloom-vault-v1');
  assert.notEqual(envelope.ciphertext, JSON.stringify(mockState), 'Ciphertext must be encrypted');

  const decrypted = await unsealVault(envelope, passphrase);
  assert.deepEqual(decrypted, mockState, 'Decrypted state must match original exactly');

  // Wrong passphrase must fail decryption
  await assert.rejects(
    async () => unsealVault(envelope, 'WrongPassphrase!'),
    /operation failed|bad decrypt|tag mismatch/i,
    'Incorrect passphrase must fail closed'
  );
});
