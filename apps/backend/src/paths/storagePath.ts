import path from 'path'

export const STORAGE_PATH = path.join(
  __dirname,
  '../../',
  process.env.STORAGE_PATH || 'storage'
)
