import cookieParser from 'cookie-parser'
import 'dotenv/config'
import express, { Express } from 'express'

import { setupSwagger } from './infrastructure/docs/swagger'
import { storageService } from './infrastructure/storage'
import { languageMiddleware } from './middlewares/languageMiddleware'

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

setupSwagger(app)

app.use(
  `/${storageService.STORAGE_FOLDER}`,
  express.static(storageService.STORAGE_BASE_PATH, {
    setHeaders: res => {
      res.setHeader('Cache-Control', 'public, max-age=315576000')
    }
  })
)
app.use(cookieParser())

app.use(
  express.json({ limit: '10mb' }),
  express.urlencoded({ limit: '10mb', extended: true }),
  corsMiddleware,
  authMiddleware,
  languageMiddleware,
  router,
  notFoundMiddleware
)

app.listen(process.env.APP_PORT, () => {
  logger.info(`🚀 Server is running on port ${process.env.APP_PORT}`)
})
