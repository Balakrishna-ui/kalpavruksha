import crypto from 'crypto';

/**
 * Generates a cryptographically secure 6-digit OTP
 */
export const generateOTP = (): string => {
  // Use crypto to generate a random number between 100000 and 999999
  const randomBuffer = crypto.randomBytes(4);
  const randomNumber = randomBuffer.readUInt32BE(0);
  const otp = (randomNumber % 900000) + 100000;
  return otp.toString();
};
