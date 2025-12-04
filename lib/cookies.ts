/**
 * Cookie utility functions for token management
 * Supports both client-side and server-side operations
 */

interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie (client-side only)
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof window === 'undefined') {
    console.warn('setCookie called on server-side, skipping');
    return;
  }

  const {
    maxAge,
    expires,
    path = '/',
    domain,
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (maxAge !== undefined) {
    cookieString += `; Max-Age=${maxAge}`;
  }

  if (expires) {
    cookieString += `; Expires=${expires.toUTCString()}`;
  }

  cookieString += `; Path=${path}`;

  if (domain) {
    cookieString += `; Domain=${domain}`;
  }

  if (secure) {
    cookieString += '; Secure';
  }

  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value (client-side)
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
}

/**
 * Remove a cookie (client-side)
 */
export function removeCookie(name: string, options: Omit<CookieOptions, 'maxAge' | 'expires'> = {}): void {
  if (typeof window === 'undefined') {
    console.warn('removeCookie called on server-side, skipping');
    return;
  }

  setCookie(name, '', {
    ...options,
    maxAge: -1,
    expires: new Date(0),
  });
}

// Token-specific cookie names
export const TOKEN_COOKIE_NAMES = {
  ACCESS_TOKEN: 'wine_access_token',
  REFRESH_TOKEN: 'wine_refresh_token',
} as const;

/**
 * Set access token in cookie
 */
export function setAccessTokenCookie(token: string, expiresInSeconds?: number): void {
  const options: CookieOptions = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };

  if (expiresInSeconds) {
    options.maxAge = expiresInSeconds;
  }

  setCookie(TOKEN_COOKIE_NAMES.ACCESS_TOKEN, token, options);
}

/**
 * Set refresh token in cookie
 */
export function setRefreshTokenCookie(token: string): void {
  setCookie(TOKEN_COOKIE_NAMES.REFRESH_TOKEN, token, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Get access token from cookie
 */
export function getAccessTokenCookie(): string | null {
  return getCookie(TOKEN_COOKIE_NAMES.ACCESS_TOKEN);
}

/**
 * Get refresh token from cookie
 */
export function getRefreshTokenCookie(): string | null {
  return getCookie(TOKEN_COOKIE_NAMES.REFRESH_TOKEN);
}

/**
 * Remove access token cookie
 */
export function removeAccessTokenCookie(): void {
  removeCookie(TOKEN_COOKIE_NAMES.ACCESS_TOKEN, { path: '/' });
}

/**
 * Remove refresh token cookie
 */
export function removeRefreshTokenCookie(): void {
  removeCookie(TOKEN_COOKIE_NAMES.REFRESH_TOKEN, { path: '/' });
}

/**
 * Remove all token cookies
 */
export function removeAllTokenCookies(): void {
  removeAccessTokenCookie();
  removeRefreshTokenCookie();
}

/**
 * Set both tokens in cookies
 */
export function setTokenCookies(accessToken: string, refreshToken: string, expiresInSeconds?: number): void {
  setAccessTokenCookie(accessToken, expiresInSeconds);
  setRefreshTokenCookie(refreshToken);
}
