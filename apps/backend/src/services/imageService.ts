import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream/promises'

import axios from 'axios'
import sharp from 'sharp'
import { v4 as uuid } from 'uuid'

const STORAGE_PATH = join(__dirname, '../../storage/uploads')

export const imageService = {
  async downloadImageFromUrl(url: string): Promise<string> {
    try {
      console.log('🌐 Downloading image from URL:', url)

      const response = await axios.get(url, { responseType: 'stream' })
      console.log('✅ Image stream received from', url)

      const filename = `${uuid()}.webp`
      const outputPath = join(STORAGE_PATH, filename)

      if (!existsSync(STORAGE_PATH)) {
        console.log('📂 Creating storage path:', STORAGE_PATH)
        mkdirSync(STORAGE_PATH, { recursive: true })
      }

      console.log('🛠️ Starting image processing and saving to', outputPath)

      await pipeline(
        response.data,
        sharp()
          .resize({ width: 1280, withoutEnlargement: true })
          .webp({ quality: 80 }),
        createWriteStream(outputPath)
      )

      console.log('✅ Image saved and converted:', `uploads/${filename}`)
      return `uploads/${filename}`
    } catch (error) {
      console.error('❌ Error downloading or processing image:', error)
      throw new Error(`Failed to download and process image: ${url}`)
    }
  },

  async downloadMultipleImages(urls: string[]): Promise<string[]> {
    console.log('🔄 Downloading multiple images:', urls)

    const downloadPromises = urls.map(url => this.downloadImageFromUrl(url))
    const paths = await Promise.all(downloadPromises)

    console.log('✅ All images downloaded:', paths)
    return paths
  }
}
