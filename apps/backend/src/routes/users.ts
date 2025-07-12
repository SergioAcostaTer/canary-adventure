import { Router } from 'express'

import { userController } from '@/controllers'
import { authGuard } from '@/guards/authGuard'
import { authMiddleware } from '@/middlewares/authMiddleware'

export const users = (router: Router): void => {
  // ✅ Obtener perfil autenticado
  router.get(
    '/user/me',
    authMiddleware,
    authGuard.isAuth,
    userController.getCurrentUser
  )

  // 🗑️ Eliminar cuenta autenticada
  router.delete(
    '/user/me',
    authMiddleware,
    authGuard.isAuth,
    userController.deleteCurrentUser
  )
}
