import axios from 'axios'

import { redis } from '@/dataSources'
import logger from '@/infrastructure/logger'
import { userService } from '@/services'
import { jwtSign, jwtVerify } from '@/utils/jwt'

const GOOGLE_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'

export const authService = {
  async authenticateWithGoogle(idToken: string) {
    try {
      const { data: payload } = await axios.get(
        `${GOOGLE_TOKEN_INFO_URL}?id_token=${idToken}`
      )

      const { email, name, sub: oauthId, picture: avatarUrl, locale } = payload

      let user = await userService.getUserByEmail(email)

      if (!user) {
        const username = email.split('@')[0]
        user = await userService.createUser({
          email,
          username,
          full_name: name,
          avatar_url: avatarUrl,
          oauth_provider: 'google',
          oauth_id: oauthId,
          locale
        })
      }

      await userService.updateLastLogin(user.id)

      const { accessToken } = jwtSign(user.id)
      return { user, accessToken }
    } catch (error) {
      logger.error('authService.authenticateWithGoogle:', error)
      throw new Error('Google authentication failed')
    }
  },

  verifyJWT(token: string) {
    try {
      return jwtVerify({ accessToken: token })
    } catch (err) {
      throw new Error('Invalid token')
    }
  },

  async revokeToken(token: string) {
    try {
      const decoded = jwtVerify({ accessToken: token })
      const ttlSeconds = 60 * 60 * 24 * 7

      await redis.set(`expiredToken:${token}`, 'true', { EX: ttlSeconds })
      await userService.invalidateUserSession(decoded.id)

      return { success: true }
    } catch (error) {
      logger.error('authService.revokeToken:', error)
      throw new Error('Failed to revoke token')
    }
  }
}
