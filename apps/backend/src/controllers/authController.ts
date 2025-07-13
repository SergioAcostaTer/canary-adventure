import { Request, Response } from 'express'

import { authService } from '@/services/authService'
import { cookieUtils } from '@/utils/cookies'

export const authController = {
  async loginWithGoogle(req: Request, res: Response) {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({ error: 'Missing Google ID token' })
    }

    try {
      const { user, accessToken } =
        await authService.authenticateWithGoogle(idToken)
      cookieUtils.setAccessToken(res, accessToken)
      return res.status(200).json({ user, accessToken })
    } catch (error) {
      return res.status(401).json({ error: 'Authentication failed' })
    }
  },

  async logout(req: Request, res: Response) {
    const token = req.context?.accessToken

    if (!token) {
      return res.status(400).json({ error: 'No access token provided' })
    }

    try {
      await authService.revokeToken(token)
      cookieUtils.clearAccessToken(res)
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: 'Logout failed' })
    }
  }
}
