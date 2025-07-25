// src/infrastructure/logger.ts
import { createLogger, format, transports } from 'winston'

const logFilename = process.env.API_LOG_FILENAME || 'logs/api.log'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFilename })
  ]
})

export default logger
