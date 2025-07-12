import { Router } from 'express'

import { placeController } from '@/controllers/placeController'

export const places = (router: Router): void => {
  router.get('/places/:id', placeController.getById)
  router.get('/places/slug/:slug', placeController.getBySlug)
  router.get('/places/search', placeController.search)
  router.get('/places/featured', placeController.featured)
}
