import { Router } from 'express'

import { userController } from '@/controllers'

export const users = (router: Router): void => {
  router.get('/user/:id', userController.getUserById)
}
