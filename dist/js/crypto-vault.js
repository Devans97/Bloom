/**
 * BLOOM — Web Crypto Vault Encryption (AES-GCM 256-bit + PBKDF2)
 * Client-side cryptographic envelope for Aastha's private study records.
 */
let activePassphrase = null;
export const setVaultPassphrase = (p) => { activePassphrase = p; };
export const getVaultPassphrase = () => activePassphrase;
export function isVaultEnvelope(value) {
    if (!value || typeof value !== 'object')
        return false;
    const env = value;
    return env.format === 'bloom-vault-v1' &&
        typeof env.salt === 'string' &&
        typeof env.iv === 'string' &&
        typeof env.ciphertext === 'string';
}
function bufferToBase64(buf) {
    const bytes = new Uint8Array(buf);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
function base64ToBuffer(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}
async function deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({
        name: 'PBKDF2',
        salt,
        iterations: 250000,
        hash: 'SHA-256'
    }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function sealVault(payload, passphrase) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt.buffer);
    const jsonStr = JSON.stringify(payload);
    const enc = new TextEncoder();
    const ciphertextBuffer = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(jsonStr));
    return {
        format: 'bloom-vault-v1',
        salt: bufferToBase64(salt.buffer),
        iv: bufferToBase64(iv.buffer),
        ciphertext: bufferToBase64(ciphertextBuffer)
    };
}
export async function unsealVault(envelope, passphrase) {
    const salt = base64ToBuffer(envelope.salt);
    const iv = base64ToBuffer(envelope.iv);
    const ciphertext = base64ToBuffer(envelope.ciphertext);
    const key = await deriveKey(passphrase, salt);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, ciphertext);
    const dec = new TextDecoder();
    return JSON.parse(dec.decode(decrypted));
}
