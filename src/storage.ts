/**
 * BLOOM — Local IndexedDB Storage & Vault Persistence
 */

import type { AppState, LearnerProfile } from './types.js';
import { sealVault, unsealVault, isVaultEnvelope, getVaultPassphrase } from './crypto-vault.js';

const DB_NAME = 'bloom-cbse-vault';
const DB_VERSION = 1;
const STORE_NAME = 'learner_data';
const STATE_KEY = 'bloom_state_v1';

export const defaultProfile = (): LearnerProfile => ({
  name: 'Aastha',
  medium: 'English',
  wakeTime: '07:00',
  sleepTime: '23:00',
  schoolStart: '08:00',
  schoolEnd: '14:00',
  tuitionStart: '17:00',
  tuitionEnd: '21:00',
  travelMinutes: 20,
  sessionMinutes: 25,
  breakMinutes: 5,
  preferredPeriods: ['afternoon', 'evening'],
  difficultSubjects: ['physics'],
  confidentSubjects: ['english'],
  onboardingComplete: false
});

export const initialAppState = (): AppState => ({
  profile: defaultProfile(),
  chapterProgress: {},
  dayOverrides: {},
  tasks: [],
  mistakes: [],
  tests: [],
  focusSessions: [],
  practicals: [],
  garden: {
    level: 1,
    bloomsEarned: 0,
    growthPoints: 0,
    plantType: 'Rose'
  },
  reviews: [],
  reduceMotion: false,
  darkMode: false,
  vaultPassphraseSet: false
});

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported in this environment.'));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

export async function loadAppState(): Promise<AppState> {
  try {
    const db = await getDb();
    const raw = await new Promise<unknown>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(STATE_KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (!raw) {
      return initialAppState();
    }

    if (isVaultEnvelope(raw)) {
      const pass = getVaultPassphrase();
      if (!pass) {
        throw new Error('VAULT_LOCKED');
      }
      const decrypted = await unsealVault<AppState>(raw, pass);
      return { ...initialAppState(), ...decrypted };
    }

    if (typeof raw === 'object') {
      return { ...initialAppState(), ...(raw as Partial<AppState>) };
    }

    return initialAppState();
  } catch (err: unknown) {
    if ((err as Error)?.message === 'VAULT_LOCKED') throw err;
    console.warn('Could not load existing state from IndexedDB, using clean defaults:', err);
    return initialAppState();
  }
}

export async function saveAppState(state: AppState): Promise<void> {
  try {
    const db = await getDb();
    const pass = getVaultPassphrase();
    const payload = pass ? await sealVault(state, pass) : state;

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      tx.objectStore(STORE_NAME).put(payload, STATE_KEY);
    });
  } catch (err) {
    console.error('Failed to save app state to IndexedDB:', err);
    throw err;
  }
}
