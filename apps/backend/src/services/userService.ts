// src/services/user.service.ts
import { redis } from '@/dataSources'
import { postgres } from '@/dataSources/postgres'
import logger from '@/infrastructure/logger'

export const userService = {
  async getUserById(userId: string) {
    try {
      const cacheKey = `user:${userId}`
      const cachedUser = await redis.get(cacheKey)

      if (cachedUser) {
        return JSON.parse(cachedUser)
      }

      const pool = postgres.getPool()
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [
        userId
      ])
      const user = result.rows[0]

      if (!user) {
        return null
      }

      await redis.set(cacheKey, JSON.stringify(user), { EX: 3600 })
      return user
    } catch (error) {
      logger.error('Error fetching user:', error)
      throw new Error('Internal server error')
    }
  }
}
