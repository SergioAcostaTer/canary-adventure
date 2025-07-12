import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { placeService } from '@/services/placeService'

const getLangFromRequest = (req: Request) =>
  req.headers['accept-language']?.split(',')[0] || 'es'

export const placeController = {
  async getById(req: Request, res: Response) {
    const { id } = req.params
    const lang = getLangFromRequest(req)

    const place = await placeService.getPlaceById(id, lang)
    if (!place) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Place not found' })
    }

    return res.json(place)
  },

  async getBySlug(req: Request, res: Response) {
    const { slug } = req.params
    const lang = getLangFromRequest(req)

    const place = await placeService.getPlaceBySlug(slug, lang)
    if (!place) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Place not found' })
    }

    return res.json(place)
  },

  async search(req: Request, res: Response) {
    const { q = '', page = '1', limit = '20' } = req.query
    const lang = getLangFromRequest(req)

    const results = await placeService.searchPlaces(
      String(q),
      lang,
      Number(page),
      Number(limit)
    )

    return res.json({ results, pagination: { page, limit } })
  },

  async featured(req: Request, res: Response) {
    const { page = '1', limit = '10' } = req.query
    const lang = getLangFromRequest(req)

    const results = await placeService.getFeaturedPlaces(
      lang,
      Number(page),
      Number(limit)
    )

    return res.json({ results, pagination: { page, limit } })
  }
}
