import dotenv from 'dotenv'
import { Pool } from 'pg'

import logger from '@/infrastructure/logger'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
  // ssl: { rejectUnauthorized: false } // uncomment if needed in production
})

export const postgres = {
  run: async () => {
    try {
      await pool.query('SELECT 1')
      logger.info('✅ Connected to PostgreSQL')
    } catch (error) {
      logger.error('❌ PostgreSQL connection error:', error)
      process.exit(1)
    }
  },

  stop: async () => {
    try {
      await pool.end()
      logger.info('🔌 Disconnected from PostgreSQL')
    } catch (error) {
      logger.error('❌ PostgreSQL disconnection error:', error)
    }
  },

  getPool: () => pool
}
