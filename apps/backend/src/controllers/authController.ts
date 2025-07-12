import { authService } from '@/services/authService'
import { Request, Response } from 'express'

export const authController = {
  async loginWithGoogle(req: Request, res: Response) {
    const { idToken } = req.body

    if (!idToken) {
      return res.status(400).json({ error: 'Missing Google ID token' })
    }

    try {
      const { user, accessToken } =
        await authService.authenticateWithGoogle(idToken)
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
      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ error: 'Logout failed' })
    }
  }
}
