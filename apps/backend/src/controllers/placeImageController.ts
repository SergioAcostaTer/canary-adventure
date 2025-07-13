import { existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

import { Request, Response } from 'express'

import { postgres } from '@/dataSources'
import logger from '@/infrastructure/logger'
import { imageService } from '@/services/imageService'
import { placeImageStrategy } from '@/strategies/placeImageStrategy'

const STORAGE_ROOT = resolve(process.env.STORAGE_PATH || 'storage/uploads')

export const placeImageController = {
  async addImagesToPlace(req: Request, res: Response) {
    const { slug } = req.params
    const { imageUrls } = req.body

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res
        .status(400)
        .json({ error: 'imageUrls must be a non-empty array' })
    }

    let savedUrls: string[] = []

    try {
      savedUrls = await imageService.downloadMultipleImages(
        imageUrls,
        placeImageStrategy,
        slug
      )

      console.log('Saved URLs:', savedUrls)

      const pool = postgres.getPool()
      const query = `
        UPDATE places
        SET image_urls = 
          CASE 
            WHEN image_urls IS NOT NULL 
            THEN array_cat(image_urls, $1::text[]) 
            ELSE $1::text[] 
          END,
            updated_at = now()
        WHERE slug = $2
        RETURNING id, slug, image_urls
      `
      const { rows } = await pool.query(query, [savedUrls, slug])

      if (!rows.length) {
        logger.warn(`Place not found: ${slug}`)
        return res.status(404).json({ error: 'Place not found' })
      }

      logger.info(`Images added to place: ${slug}`)
      return res.status(200).json({ success: true, place: rows[0] })
    } catch (error) {
      logger.error('Failed to add images to place:', error)

      for (const publicUrl of savedUrls) {
        try {
          const relativePath = publicUrl.replace(`${process.env.APP_URL}`, '')
          const absolutePath = resolve(STORAGE_ROOT, `.${relativePath}`)
          if (existsSync(absolutePath)) {
            unlinkSync(absolutePath)
          }
        } catch (unlinkError) {
          logger.error(`Failed to delete image: ${unlinkError}`)
        }
      }

      return res.status(500).json({ error: 'Failed to add images to place' })
    }
  }
}
