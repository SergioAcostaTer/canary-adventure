import { Router } from 'express'

import { auth } from './auth'
import { places } from './place'
import { users } from './users'

const router: Router = Router()

const routes: {
  [key: string]: (router: Router) => void
} = { auth, users, places }

for (const route in routes) {
  routes[route](router)
}

export { router }
