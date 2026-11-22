import { empty } from './model.js';
import { studyDefaults } from './study-data.js';
import { emptyAcademicState } from './academic-data.js';
import { lifeDefaults } from './life-data.js';
import { seal, unseal, isEnvelope, getVaultPassphrase, setVaultPassphrase } from './crypto-vault.js';
export class VaultLockedError extends Error {
    constructor() { super('Unlock your local vault to continue.'); this.name = 'VaultLockedError'; }
}
let encryptedOnDisk = false;
let damagedVaultOnDisk = false;
export function isDamagedVaultRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || isEnvelope(value))
        return false;
    const saved = value;
    return saved.format === 'bloom-vault' || ['cipher', 'kdf', 'iterations', 'salt', 'iv', 'ciphertext'].some(key => key in saved);
}
let connection;
function database() {
    return connection ??= new Promise((resolve, reject) => {
        const open = indexedDB.open('bloom-preview', 1);
        open.onupgradeneeded = () => open.result.createObjectStore('local');
        open.onsuccess = () => resolve(open.result);
        open.onerror = () => reject(open.error);
    });
}
export async function load() {
    const db = await database();
    const saved = await new Promise((resolve, reject) => {
        const req = db.transaction('local').objectStore('local').get('profile');
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    if (isDamagedVaultRecord(saved)) {
        damagedVaultOnDisk = true;
        throw new Error('The saved vault appears damaged or unsupported. BLOOM has preserved it and blocked changes to prevent data loss.');
    }
    encryptedOnDisk = isEnvelope(saved);
    const pass = getVaultPassphrase();
    if (encryptedOnDisk && !pass)
        throw new VaultLockedError();
    const raw = (encryptedOnDisk ? await unseal(saved, pass) : saved) ?? {};
    if (typeof raw !== 'object' || Array.isArray(raw))
        throw new Error('The saved profile is invalid.');
    const profile = raw, state = { ...empty(), ...profile };
    state.study = { ...studyDefaults(), ...profile.study };
    state.life = { ...lifeDefaults(), ...profile.life };
    state.academic = { ...emptyAcademicState(), ...(profile.academic && typeof profile.academic === 'object' ? profile.academic : {}),
        topicProgress: profile.academic?.topicProgress && typeof profile.academic.topicProgress === 'object' ? profile.academic.topicProgress : {},
        activities: profile.academic?.activities && typeof profile.academic.activities === 'object' ? profile.academic.activities : {} };
    // A terminated tab cannot prove focused time after its last saved checkpoint.
    if (state.study.activeFocus)
        state.study.activeFocus = { ...state.study.activeFocus, runningSince: null };
    if (state.defaults && !Object.hasOwn(state.defaults, 'lateStart'))
        state.defaults.lateStart = '21:00';
    for (const day of Object.values(state.days))
        if (!Object.hasOwn(day, 'lateStart'))
            day.lateStart = state.defaults?.lateStart;
    return state;
}
export async function unlock(passphrase) {
    setVaultPassphrase(passphrase);
    try {
        return await load();
    }
    catch (error) {
        setVaultPassphrase(null);
        throw error;
    }
}
export async function save(state) {
    if (damagedVaultOnDisk)
        throw new Error('BLOOM cannot replace a damaged vault. The original data remains preserved.');
    const db = await database();
    const pass = getVaultPassphrase();
    if (encryptedOnDisk && !pass)
        throw new VaultLockedError();
    const payload = pass ? await seal(state, pass) : state;
    return new Promise((resolve, reject) => {
        const tx = db.transaction('local', 'readwrite');
        tx.oncomplete = () => { encryptedOnDisk = isEnvelope(payload); resolve(); };
        tx.onabort = () => reject(tx.error);
        tx.onerror = () => reject(tx.error);
        tx.objectStore('local').put(payload, 'profile');
    });
}
