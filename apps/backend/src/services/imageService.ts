import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream/promises'

import axios from 'axios'
import { nanoid } from 'nanoid'
import sharp from 'sharp'

import { fileOptimizationConfig } from '@/config/fileOptimization'

const STORAGE_PATH = join(
  __dirname,
  '../../',
  fileOptimizationConfig.image.folder
)

const { APP_URL = 'http://localhost:3000' } = process.env

export const imageService = {
  async downloadImageFromUrl(url: string, slug?: string): Promise<string> {
    try {
      const response = await axios.get(url, { responseType: 'stream' })

      const filename = slug
        ? `${slug}-${nanoid(6)}.${fileOptimizationConfig.image.format}`
        : `${nanoid(8)}.${fileOptimizationConfig.image.format}`
      const outputPath = join(STORAGE_PATH, filename)

      if (!existsSync(STORAGE_PATH)) {
        mkdirSync(STORAGE_PATH, { recursive: true })
      }

      await pipeline(
        response.data,
        sharp()
          .resize({
            width: fileOptimizationConfig.image.maxWidth,
            withoutEnlargement: true
          })
          .webp({ quality: fileOptimizationConfig.image.quality }),
        createWriteStream(outputPath)
      )

      return `${APP_URL}/${fileOptimizationConfig.image.folder}/${filename}`
    } catch (error) {
      throw new Error(`Failed to download and process image: ${url}`)
    }
  },

  async downloadMultipleImages(
    urls: string[],
    slug?: string
  ): Promise<string[]> {
    const downloadPromises = urls.map(url =>
      this.downloadImageFromUrl(url, slug)
    )
    return await Promise.all(downloadPromises)
  }
}
