import { ImageStoringStrategy } from '@/@types/strategies/imageStrategy'

export const avatarImageStrategy: ImageStoringStrategy = {
  maxWidth: 512,
  quality: 70,
  format: 'webp',
  folder: '/public/uploads/avatars'
}
