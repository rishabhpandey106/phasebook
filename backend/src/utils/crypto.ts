/**
 * Cryptographic utility functions for Cloudflare Workers.
 * Leverages the native WebCrypto API for maximum performance and security.
 */

const SALT_BYTE_LENGTH = 16;
const HASH_ITERATIONS = 100000;
const HASH_KEY_LENGTH = 32;

/**
 * Hashes a plaintext password using PBKDF2 (Password-Based Key Derivation Function 2) and SHA-256.
 * It generates a random salt, derives the key, and returns them concatenated.
 *
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} A promise that resolves to the hex-encoded string containing the salt and the derived hash, separated by a colon (e.g., "saltHex:hashHex").
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTE_LENGTH));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: HASH_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    HASH_KEY_LENGTH * 8
  );

  const saltHex = bufferToHex(salt);
  const hashHex = bufferToHex(new Uint8Array(hashBuffer));

  return `${saltHex}:${hashHex}`;
}

/**
 * Verifies a plaintext password against a previously generated PBKDF2 hash.
 *
 * @param {string} password - The plaintext password attempting to be verified.
 * @param {string} storedHash - The stored hash string (format: "saltHex:hashHex").
 * @returns {Promise<boolean>} A promise that resolves to true if the password is correct, false otherwise.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split(':');
  if (parts.length !== 2) return false;

  const [saltHex, originalHashHex] = parts;
  const salt = hexToBuffer(saltHex);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: HASH_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    HASH_KEY_LENGTH * 8
  );

  const computedHashHex = bufferToHex(new Uint8Array(hashBuffer));

  // Constant-time comparison to prevent timing attacks
  return constantTimeCompare(originalHashHex, computedHashHex);
}

/**
 * Converts a Uint8Array buffer into a hexadecimal string.
 *
 * @param {Uint8Array} buffer - The buffer to convert.
 * @returns {string} The hex-encoded string.
 */
function bufferToHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Converts a hexadecimal string back into a Uint8Array buffer.
 *
 * @param {string} hex - The hex-encoded string to convert.
 * @returns {Uint8Array} The resulting buffer.
 */
function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Compares two strings in constant time to prevent timing attacks.
 *
 * @param {string} a - First string.
 * @param {string} b - Second string.
 * @returns {boolean} True if strings are equal, false otherwise.
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
