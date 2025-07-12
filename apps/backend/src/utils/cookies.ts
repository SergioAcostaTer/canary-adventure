import { Response } from 'express'

import { ACCESS_TOKEN_COOKIE, COOKIE_MAX_AGE_MS } from '@/config/auth'

export const cookieUtils = {
  setAccessToken(res: Response, token: string) {
    res.cookie(ACCESS_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE_MS
    })
  },

  clearAccessToken(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
  }
}
