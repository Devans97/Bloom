const iterations = 310000;
const context = new TextEncoder().encode('BLOOM|vault|1|AES-256-GCM|PBKDF2-SHA256|310000');
let vaultPassphrase = null;
/** Session memory only: callers must not write this value to any persistent store. */
export const setVaultPassphrase = (value) => { vaultPassphrase = value; };
export const getVaultPassphrase = () => vaultPassphrase;
function encode(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i += 8192)
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(binary);
}
function decode(value) {
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value) || value.length % 4)
        throw new Error('The encrypted file is not valid.');
    const binary = atob(value), result = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++)
        result[i] = binary.charCodeAt(i);
    return result;
}
export function isEnvelope(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const v = value;
    return v.format === 'bloom-vault' && v.version === 1 && v.cipher === 'AES-256-GCM' && v.kdf === 'PBKDF2-SHA256' && v.iterations === iterations
        && typeof v.salt === 'string' && typeof v.iv === 'string' && typeof v.ciphertext === 'string';
}
async function derive(passphrase, salt) {
    if (!crypto?.subtle)
        throw new Error('Encryption requires HTTPS or a localhost browser.');
    if (!passphrase || passphrase.length > 1024)
        throw new Error('Enter your vault passphrase.');
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: salt, iterations, hash: 'SHA-256' }, key, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function seal(value, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const text = JSON.stringify(value);
    if (text === undefined)
        throw new Error('There is no data to encrypt.');
    const bytes = new TextEncoder().encode(text);
    if (bytes.length > 20 * 1024 * 1024)
        throw new Error('The vault is too large for this build. Export smaller study files.');
    const key = await derive(passphrase, salt);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: context }, key, bytes);
    return { format: 'bloom-vault', version: 1, cipher: 'AES-256-GCM', kdf: 'PBKDF2-SHA256', iterations, salt: encode(salt), iv: encode(iv), ciphertext: encode(new Uint8Array(encrypted)) };
}
export async function unseal(envelope, passphrase) {
    if (!isEnvelope(envelope) || envelope.ciphertext.length > 28 * 1024 * 1024)
        throw new Error('Choose a supported BLOOM encrypted vault.');
    const salt = decode(envelope.salt), iv = decode(envelope.iv), ciphertext = decode(envelope.ciphertext);
    if (salt.length !== 16 || iv.length !== 12 || ciphertext.length < 16)
        throw new Error('The encrypted vault is damaged.');
    const key = await derive(passphrase, salt);
    try {
        const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv, additionalData: context }, key, ciphertext);
        return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(plain));
    }
    catch {
        throw new Error('The passphrase is incorrect, or the encrypted vault was changed or damaged.');
    }
}
