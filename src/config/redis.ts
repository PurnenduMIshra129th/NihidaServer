import { Request, Response, NextFunction } from 'express'
import { createClient } from 'redis'
import { redisURL } from '../utils/constant'
import { ErrorResponse } from '../utils/apiResponse'

export const redisClient = createClient({
  url: redisURL,
})

export const startRedis = async () => {
  try {
    await redisClient.connect()
    console.log('Redis client connected successfully')
  } catch (error) {
    console.error('Redis connection failed:', error)
  }
}

export const redisCacheMiddleware = (ttl: number = 300) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (req.method !== 'GET') return next()

      const cacheKey = req.originalUrl
      const cachedData = await redisClient.get(cacheKey)

      if (cachedData) {
        res.setHeader('X-Cache', 'HIT')
        const parsed = JSON.parse(cachedData)

        if (parsed?.statusCode === 0) {
          // Cached error → return as-is
          res.status(200).json(parsed)
          return
        }

        // Cached success → tag isCached and return
        parsed.isCached = true
        res.status(200).json(parsed)
        return
      }
      const originalSend = res.send.bind(res)
      res.setHeader('X-Cache', 'MISS')
      res.send = (body: any) => {
        try {
          const toCache = typeof body === 'string' ? body : JSON.stringify(body)
          redisClient.setEx(cacheKey, ttl, toCache)
        } catch (cacheErr) {
          console.warn('⚠️ Redis caching failed:', cacheErr)
        }
        return originalSend(body)
      }

      next()
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
}
