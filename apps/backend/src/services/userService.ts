// src/services/user.service.ts
import { postgres } from '@/dataSources/postgres'

export const userService = {
  async getUserById(userId: string) {
    const pool = postgres.getPool()
    const query = 'SELECT * FROM users WHERE id = $1'
    const values = [userId]

    try {
      const res = await pool.query(query, values)
      return res.rows[0]
    } catch (error) {
      throw new Error('Error fetching user: ' + (error as Error).message)
    }
  }
}
