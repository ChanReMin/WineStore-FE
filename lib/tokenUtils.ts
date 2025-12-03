/**
 * Utility functions for JWT token handling
 */

interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Decode JWT token without verification
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

/**
 * Check if token is expired or will expire soon
 * @param token - JWT token string
 * @param bufferSeconds - Time buffer in seconds before expiration (default: 300 = 5 minutes)
 * @returns true if token is expired or will expire within buffer time
 */
export const isTokenExpiringSoon = (
  token: string,
  bufferSeconds: number = 300
): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = decoded.exp;
  const timeUntilExpiration = expirationTime - currentTime;

  return timeUntilExpiration <= bufferSeconds;
};

/**
 * Get remaining time until token expiration in seconds
 * @param token - JWT token string
 * @returns Remaining seconds or 0 if expired/invalid
 */
export const getTokenRemainingTime = (token: string): number => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = decoded.exp - currentTime;

  return Math.max(0, remainingTime);
};
