// config/auth.ts
export const JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7
export const COOKIE_MAX_AGE_MS = JWT_EXPIRES_IN_SECONDS * 1000
export const ACCESS_TOKEN_COOKIE = 'accessToken'
