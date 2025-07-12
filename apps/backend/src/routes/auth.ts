import { authController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import { Router } from 'express'

export const auth = (router: Router): void => {
  router.post('/auth/google', authController.loginWithGoogle)
  router.post('/auth/logout', authMiddleware, authController.logout)
}
