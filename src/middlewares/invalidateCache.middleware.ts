import { redisClient } from '../config/redis'
import { NextFunction, Request, Response } from 'express'

export const invalidateCacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isMutation = ['POST', 'PUT', 'DELETE'].includes(req.method)
    if (!isMutation) return next()

    const entity = req.path.split('/')[2]

    if (!entity) return next()

    // Find all keys that match the entity pattern
    const pattern = `*/${entity}/*`
    const keysToInvalidate = await redisClient.keys(pattern)

    if (keysToInvalidate.length > 0) {
      redisClient.del(keysToInvalidate)
      console.log('Cache invalidated for keys:', keysToInvalidate)
    }

    next()
  } catch (error) {
    console.error('Cache invalidation middleware failed:', error)
    next()
  }
}
