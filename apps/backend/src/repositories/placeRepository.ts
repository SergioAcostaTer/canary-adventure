import { redis } from '@/dataSources'
import { postgres } from '@/dataSources/postgres'
import logger from '@/infrastructure/logger'

const TTL = 60 * 60 * 6 // 6 horas

const cacheKey = {
  byId: (id: string, lang: string) => `place:${id}:${lang}`,
  bySlug: (slug: string, lang: string) => `place:slug:${slug}:${lang}`
}

export const placeRepository = {
  async findById(id: string, lang = 'es') {
    const key = cacheKey.byId(id, lang)
    try {
      const cached = await redis.get(key)
      if (cached) return JSON.parse(cached)

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `
        SELECT p.*, pt.name, pt.description, pt.short_description, pt.tips
        FROM places p
        JOIN place_translations pt ON pt.place_id = p.id
        WHERE p.id = $1 AND pt.language_code = $2 AND p.deleted_at IS NULL
        `,
        [id, lang]
      )

      const place = rows[0]
      if (place) await redis.set(key, JSON.stringify(place), { EX: TTL })

      return place || null
    } catch (error) {
      logger.error('placeRepository.findById:', error)
      throw new Error('Failed to fetch place')
    }
  },

  async findBySlug(slug: string, lang = 'es') {
    const key = cacheKey.bySlug(slug, lang)
    try {
      const cached = await redis.get(key)
      if (cached) return JSON.parse(cached)

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `
        SELECT p.*, pt.name, pt.description, pt.short_description, pt.tips
        FROM places p
        JOIN place_translations pt ON pt.place_id = p.id
        WHERE p.slug = $1 AND pt.language_code = $2 AND p.deleted_at IS NULL
        `,
        [slug, lang]
      )

      const place = rows[0]
      if (place) await redis.set(key, JSON.stringify(place), { EX: TTL })

      return place || null
    } catch (error) {
      logger.error('placeRepository.findBySlug:', error)
      throw new Error('Failed to fetch place by slug')
    }
  },

  async searchByName(query: string, lang = 'es', page = 1, limit = 20) {
    try {
      const offset = (page - 1) * limit

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `
        SELECT p.id, p.slug, pt.name, pt.short_description, p.image_urls
        FROM places p
        JOIN place_translations pt ON pt.place_id = p.id
        WHERE pt.language_code = $1
          AND pt.name ILIKE $2
          AND p.deleted_at IS NULL
          AND p.is_active = true
        ORDER BY pt.name ASC
        LIMIT $3 OFFSET $4
        `,
        [lang, `%${query}%`, limit, offset]
      )

      return rows
    } catch (error) {
      logger.error('placeRepository.searchByName:', error)
      throw new Error('Search failed')
    }
  },

  async findFeatured(lang = 'es', page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit

      const pool = postgres.getPool()
      const { rows } = await pool.query(
        `
        SELECT p.id, p.slug, pt.name, pt.short_description, p.image_urls
        FROM places p
        JOIN place_translations pt ON pt.place_id = p.id
        WHERE pt.language_code = $1
          AND p.is_featured = true
          AND p.is_active = true
          AND p.deleted_at IS NULL
        ORDER BY p.updated_at DESC
        LIMIT $2 OFFSET $3
        `,
        [lang, limit, offset]
      )

      return rows
    } catch (error) {
      logger.error('placeRepository.findFeatured:', error)
      throw new Error('Failed to fetch featured places')
    }
  }
}
