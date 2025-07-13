// services/imageService.ts
import { ImageStoringStrategy } from '@/@types/strategies/imageStrategy'
import logger from '@/infrastructure/logger'
import { imageStorage } from '@/infrastructure/storage/imageStorage'
import { storageService } from '@/infrastructure/storage/storageService'

async function downloadImageFromUrl(
  url: string,
  config: ImageStoringStrategy,
  baseName: string
): Promise<string> {
  try {
    const relativePath = await imageStorage.downloadAndStoreImageFromUrl(
      url,
      config,
      baseName
    )
    return storageService.getPublicUrl(relativePath)
  } catch (err) {
    logger.error(`Failed to process image from ${url}`, err)
    throw new Error('Image processing failed')
  }
}

async function downloadMultipleImages(
  urls: string[],
  config: ImageStoringStrategy,
  baseName: string
): Promise<string[]> {
  return await Promise.all(
    urls.map((url, idx) =>
      downloadImageFromUrl(url, config, `${baseName}-${idx}`)
    )
  )
}

export const imageService = {
  downloadImageFromUrl,
  downloadMultipleImages
}
