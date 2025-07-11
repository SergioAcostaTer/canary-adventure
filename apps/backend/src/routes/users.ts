import { Router } from 'express'

import { authGuard } from '@/guards'

export const users = (router: Router): void => {
  router.get('/me', authGuard.isAuth, (req, res) => {
    res.send('User profile endpoint')
  })
}
