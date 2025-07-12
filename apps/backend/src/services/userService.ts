import { STATUS_CODES } from 'http'

import { redis } from '@/dataSources'
import { postgres } from '@/dataSources/postgres'
import logger from '@/infrastructure/logger'

const TTL_ONE_HOUR = 3600

export const userService = {
  async getUserById(userId: string) {
    try {
      const cacheKey = `user:${userId}`
      const cachedUser = await redis.get(cacheKey)

      if (cachedUser) {
        return JSON.parse(cachedUser)
      }

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL',
        [userId]
      )
      const user = rows[0]

      if (!user) return null

      await redis.set(cacheKey, JSON.stringify(user), { EX: TTL_ONE_HOUR })
      return user
    } catch (error) {
      logger.error('Error fetching user:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  },

  async getUserByEmail(email: string) {
    try {
      const pool = postgres.getPool()
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL',
        [email]
      )
      return rows[0] || null
    } catch (error) {
      logger.error('Error fetching user by email:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  },

  async createUser(user: {
    email: string
    username: string
    full_name?: string
    avatar_url?: string
    oauth_provider: string
    oauth_id: string
    locale?: string
  }) {
    try {
      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `INSERT INTO users (
          email, username, full_name, avatar_url,
          oauth_provider, oauth_id, locale
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          user.email,
          user.username,
          user.full_name || null,
          user.avatar_url || null,
          user.oauth_provider,
          user.oauth_id,
          user.locale || 'en'
        ]
      )

      return rows[0]
    } catch (error) {
      logger.error('Error creating user:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  },

  async updateLastLogin(userId: string) {
    try {
      const pool = postgres.getPool()
      await pool.query(
        'UPDATE users SET last_login_at = now(), updated_at = now() WHERE id = $1',
        [userId]
      )
      await redis.del(`user:${userId}`) // Invalidate cache
    } catch (error) {
      logger.error('Error updating last login:', error)
    }
  },

  async softDeleteUser(userId: string) {
    try {
      const pool = postgres.getPool()
      await pool.query(
        'UPDATE users SET deleted_at = now(), is_active = false, updated_at = now() WHERE id = $1',
        [userId]
      )
      await redis.del(`user:${userId}`)
    } catch (error) {
      logger.error('Error soft deleting user:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  }
}
