import { Router } from 'express'

export const auth = (router: Router): void => {
  router.post('/auth/login', (req, res) => {
    res.send('Login endpoint')
  })
}
