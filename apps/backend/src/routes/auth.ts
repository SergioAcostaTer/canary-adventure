import { Router } from 'express'

import { authController } from '@/controllers'
import { authGuard } from '@/guards'
import { authMiddleware } from '@/middlewares'

export const auth = (router: Router): void => {
  /**
   * @openapi
   * /auth/google:
   *   post:
   *     summary: Login con Google ID Token
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - idToken
   *             properties:
   *               idToken:
   *                 type: string
   *                 description: Token JWT de Google
   *     responses:
   *       200:
   *         description: Autenticación exitosa
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 accessToken:
   *                   type: string
   *       400:
   *         description: Token de Google no proporcionado
   *       401:
   *         description: Fallo de autenticación
   */
  router.post(
    '/auth/google',
    authMiddleware,
    authGuard.isGuest,
    authController.loginWithGoogle
  )

  /**
   * @openapi
   * /auth/logout:
   *   post:
   *     summary: Cierra la sesión actual
   *     tags:
   *       - Auth
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout exitoso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *       400:
   *         description: Token de acceso no proporcionado
   *       500:
   *         description: Error al cerrar sesión
   */
  router.post('/auth/logout', authMiddleware, authController.logout)
}
