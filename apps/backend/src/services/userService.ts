import { STATUS_CODES } from 'http'

import { imageService } from './imageService'

import { redis } from '@/dataSources'
import { postgres } from '@/dataSources/postgres'
import logger from '@/infrastructure/logger'
import { avatarImageStrategy } from '@/strategies/avatarImageStrategy'

/** 🔧 Configuración del cache de usuarios */
const USER_CACHE_TTL = 3600 * 24

const userCache = {
  byId: (id: string) => `user:${id}`,
  byEmail: (email: string) => `user:email:${email.toLowerCase()}`
}

export const userService = {
  async getUserById(userId: string) {
    try {
      const cacheKey = userCache.byId(userId)
      const cached = await redis.get(cacheKey)
      if (cached) return JSON.parse(cached)

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `
        SELECT
          email,
          username,
          full_name,
          avatar_url,
          role,
          plan,
          locale,
          is_active
        FROM users
        WHERE id = $1 AND deleted_at IS NULL
      `,
        [userId]
      )

      const row = rows[0]
      if (!row) return null

      const user = {
        email: row.email,
        username: row.username,
        fullName: row.full_name,
        avatarUrl: row.avatar_url,
        role: row.role,
        plan: row.plan,
        locale: row.locale,
        isActive: row.is_active
      }

      await redis.set(cacheKey, JSON.stringify(user), { EX: USER_CACHE_TTL })
      return user
    } catch (error) {
      logger.error('userService.getUserById:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  },
  async getUserByEmail(email: string) {
    try {
      const cacheKey = userCache.byEmail(email)
      const cached = await redis.get(cacheKey)
      if (cached) return JSON.parse(cached)

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL',
        [email]
      )

      const user = rows[0]
      if (user) {
        await redis.set(cacheKey, JSON.stringify(user), { EX: USER_CACHE_TTL })
      }

      return user || null
    } catch (error) {
      logger.error('userService.getUserByEmail:', error)
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
      let localAvatarPath: string | null = null

      if (user.avatar_url?.startsWith('http')) {
        try {
          localAvatarPath = await imageService.downloadImageFromUrl(
            user.avatar_url,
            avatarImageStrategy,
            user.username
          )
        } catch (err) {
          logger.warn(`Failed to download avatar for ${user.email}`, err)
          localAvatarPath = null
        }
      }

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
          user.full_name ?? null,
          localAvatarPath ?? user.avatar_url ?? null,
          user.oauth_provider,
          user.oauth_id,
          user.locale ?? 'en'
        ]
      )

      const createdUser = rows[0]

      // Invalida caché por email (en caso de que existiera antes)
      await redis.del(userCache.byEmail(user.email))

      return createdUser
    } catch (error) {
      logger.error('userService.createUser:', error)
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

      // Invalida caché
      await redis.del(userCache.byId(userId))
    } catch (error) {
      logger.error('userService.updateLastLogin:', error)
    }
  },

  async softDeleteUser(userId: string, email?: string) {
    try {
      const pool = postgres.getPool()
      await pool.query(
        'UPDATE users SET deleted_at = now(), is_active = false, updated_at = now() WHERE id = $1',
        [userId]
      )

      await redis.del(userCache.byId(userId))

      if (email) {
        await redis.del(userCache.byEmail(email))
      }
    } catch (error) {
      logger.error('userService.softDeleteUser:', error)
      throw new Error(STATUS_CODES[500] || 'Internal Server Error')
    }
  },

  async invalidateUserSession(userId: string, email?: string) {
    try {
      await redis.del(userCache.byId(userId))
      if (email) {
        await redis.del(userCache.byEmail(email))
      }
    } catch (error) {
      logger.error('userService.invalidateUserSession:', error)
    }
  }
}
