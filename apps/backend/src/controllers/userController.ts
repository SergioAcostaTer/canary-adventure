import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import logger from '@/infrastructure/logger'
import { userService } from '@/services/userService'

export const userController = {
  async getCurrentUser(req: Request, res: Response) {
    try {
      const user = req.context?.user

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'User not authenticated'
        })
      }

      return res.status(StatusCodes.OK).json(user)
    } catch (error) {
      logger.error('userController.getCurrentUser:', error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const user = await userService.getUserById(userId)

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'User not found' })
      }

      return res.status(StatusCodes.OK).json(user)
    } catch (error) {
      logger.error('userController.getUserById:', error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  },

  /** 🗑️ Eliminar cuenta propia */
  async deleteCurrentUser(req: Request, res: Response) {
    try {
      const user = req.context?.user

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'User not authenticated' })
      }

      await userService.softDeleteUser(user.id, user.email)
      return res.status(StatusCodes.OK).json({ success: true })
    } catch (error) {
      logger.error('userController.deleteCurrentUser:', error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to delete user' })
    }
  }
}
