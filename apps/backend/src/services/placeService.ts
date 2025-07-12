import { placeRepository } from '@/repositories/placeRepository'

export const placeService = {
  async getPlaceById(id: string, lang = 'es') {
    return await placeRepository.findById(id, lang)
  },

  async getPlaceBySlug(slug: string, lang = 'es') {
    return await placeRepository.findBySlug(slug, lang)
  },

  async searchPlaces(query: string, lang = 'es', page = 1, limit = 20) {
    return await placeRepository.searchByName(query, lang, page, limit)
  },

  async getFeaturedPlaces(lang = 'es', page = 1, limit = 10) {
    return await placeRepository.findFeatured(lang, page, limit)
  }
}
