import { join } from 'path'

import 'dotenv/config'
import express, { Express } from 'express'

import { postgres, redis } from '@/dataSources'
import logger from '@/infrastructure/logger'
import {
  authMiddleware,
  corsMiddleware,
  notFoundMiddleware
} from '@/middlewares'
import { router } from '@/routes'

postgres.run()
redis.run()

const app: Express = express()

app.use(
  join('/', process.env.STORAGE_PATH),
  express.static(join(__dirname, process.env.STORAGE_PATH))
)

app.use(
  express.json({ limit: '10mb' }),
  express.urlencoded({ limit: '10mb', extended: true }),
  corsMiddleware,
  authMiddleware,
  router,
  notFoundMiddleware
)

app.listen(process.env.APP_PORT, () => {
  logger.info(`🚀 Server is running on port ${process.env.APP_PORT}`)
})
