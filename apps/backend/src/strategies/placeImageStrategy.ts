import { ImageStoringStrategy } from '@/@types/strategies/imageStrategy'

export const placeImageStrategy: ImageStoringStrategy = {
  maxWidth: 1280,
  quality: 80,
  format: 'webp',
  folder: '/public/uploads/places'
}
