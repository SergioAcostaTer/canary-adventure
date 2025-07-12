import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import logger from '@/infrastructure/logger'
import { userService } from '@/services'

export const userController = {
  async getUserById(req: Request, res: Response) {
    const { id } = req.params

    try {
      const user = await userService.getUserById(id)

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send('User not found')
      }

      return res.send(user)
    } catch (error) {
      logger.error(`Error fetching user with id ${id}:`, error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Internal server error')
    }
  }
}
