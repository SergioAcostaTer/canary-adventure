import { Request, Response } from 'express'

import { postgres } from '@/dataSources'
import { imageService } from '@/services/imageService'

export const placeImageController = {
  async addImagesToPlace(req: Request, res: Response) {
    const { slug } = req.params
    const { imageUrls } = req.body

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res
        .status(400)
        .json({ error: 'imageUrls must be a non-empty array' })
    }

    try {
      const newPaths = await imageService.downloadMultipleImages(imageUrls)

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
      const { rows } = await pool.query(query, [newPaths, slug])

      if (!rows.length) {
        return res.status(404).json({ error: 'Place not found' })
      }

      return res.status(200).json({ success: true, place: rows[0] })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add images to place' })
    }
  }
}
