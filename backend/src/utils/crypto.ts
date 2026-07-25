import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// Ensure the key is exactly 32 bytes (64 hex characters)
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set.');
  }
  return Buffer.from(key, 'hex');
};

/**
 * Encrypts a plain text string using AES-256-GCM.
 * @param text The plain text to encrypt
 * @returns The encrypted string in the format "iv:content:authTag"
 */
export const encrypt = (text: string | null | undefined): string | null => {
  if (!text) return null;

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV is standard for GCM
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${encrypted}:${authTag}`;
};

/**
 * Decrypts a hash string (format: "iv:content:authTag") back to plain text.
 * @param hash The encrypted string
 * @returns The decrypted plain text
 */
export const decrypt = (hash: string | null | undefined): string | null => {
  if (!hash) return null;

  try {
    const parts = hash.split(':');
    if (parts.length !== 3) {
      // If the string doesn't match the format, it might be unencrypted legacy data.
      // In a real migration, we might want to return it as-is or handle differently.
      return hash; 
    }

    const [ivHex, encryptedHex, authTagHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
