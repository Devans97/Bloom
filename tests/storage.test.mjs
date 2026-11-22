import test from 'node:test';
import assert from 'node:assert/strict';
import {isDamagedVaultRecord} from '../dist/js/storage.js';

test('damaged or unsupported local vault records are detected before writes',()=>{
  assert.equal(isDamagedVaultRecord({format:'bloom-vault',version:2}),true);
  assert.equal(isDamagedVaultRecord({format:'bloom-vault',version:1,ciphertext:'partial'}),true);
  assert.equal(isDamagedVaultRecord({format:'bloom-vault',version:1,cipher:'AES-256-GCM',kdf:'PBKDF2-SHA256',iterations:310000,salt:'s',iv:'i',ciphertext:'c'}),false);
  assert.equal(isDamagedVaultRecord({name:'Aastha',tasks:[],tests:[]}),false);
  assert.equal(isDamagedVaultRecord(undefined),false);
});
