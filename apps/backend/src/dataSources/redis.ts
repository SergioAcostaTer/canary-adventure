import { createClient, RedisClientType } from 'redis'

import logger from '@/infrastructure/logger'

class Redis {
  private static instance: Redis
  private readonly redisUri: string
  public client: RedisClientType
  private isConnected: boolean = false

  private constructor(redisUri: string) {
    this.redisUri = redisUri
    this.client = createClient({ url: this.redisUri })

    this.client.on('error', err => {
      logger.error(`Redis Client Error: ${err}`)
      this.isConnected = false
    })

    this.client.on('connect', () => {
      this.isConnected = true
      logger.info('Redis connected')
    })

    this.client.on('end', () => {
      this.isConnected = false
      logger.info('Redis disconnected')
    })
  }

  public async run() {
    if (!this.isConnected) {
      try {
        await this.client.connect()
      } catch (error) {
        logger.error('Failed to connect to Redis:', error)
      }
    }
  }

  public async stop() {
    if (this.isConnected) {
      try {
        await this.client.disconnect()
      } catch (error) {
        logger.error('Failed to disconnect Redis:', error)
      }
    }
  }

  public static getInstance(): Redis {
    if (!Redis.instance) {
      const redisUri = process.env.REDIS_URI
      if (!redisUri) {
        throw new Error('REDIS_URI environment variable is not defined')
      }
      Redis.instance = new Redis(redisUri)
    }

    return Redis.instance
  }

  public async get(key: string): Promise<string | null> {
    if (!this.isConnected) await this.run()
    return this.client.get(key)
  }

  public async set(key: string, value: string, options?: { EX?: number }) {
    if (!this.isConnected) await this.run()
    return this.client.set(key, value, options)
  }
}

export const redis = Redis.getInstance()
