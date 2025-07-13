export interface ImageStoringStrategy {
  maxWidth: number
  quality: number
  format: 'webp' | 'jpeg' | 'png'
  folder: string
}
