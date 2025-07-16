import express from 'express'
import dbConnect from './config/db'
import indexRouter from './routes/index.route'
import logMiddleware from './middlewares/logger.middleware'
import cors from 'cors'
import { authMiddleware } from './middlewares/auth.middleware'
import { baseUrl, currentEnv, port } from './utils/constant'
import { adminMiddleware } from './middlewares/admin.middleware'
import { cachedEndpoints, doesRouteMatch, getEnvValue } from './utils/utils'
import { initializeAdmin } from './config/authentication'
import { ErrorResponse } from './utils/apiResponse'
import { redisCacheMiddleware, startRedis } from './config/redis'
import { invalidateCacheMiddleware } from './middlewares/invalidateCache.middleware'
import { Request, Response, NextFunction } from 'express'
import compression from 'compression'

const initializeServer = async () => {
  try {
    await dbConnect()
    await initializeAdmin()
    // await startRedis()

    const app = express()
    const corsTargetEndpoint = getEnvValue(currentEnv, 'corsEndpoints')

    app.use(
      cors({
        origin: corsTargetEndpoint,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),
    )

    app.use(logMiddleware)
    app.use(
      '/uploads',
      express.static('uploads', {
        maxAge: '30d',
        immutable: true,
      }),
    )
    app.use(authMiddleware)
    app.use(adminMiddleware)
    app.use(express.json())
    app.use(compression())
    // app.use(invalidateCacheMiddleware)
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //   const shouldCache =
    //     req.method === 'GET' &&
    //     cachedEndpoints.some((routePattern) =>
    //       doesRouteMatch(routePattern, req.path),
    //     )

    //   if (shouldCache) {
    //     return redisCacheMiddleware(300)(req, res, next)
    //   }

    //   next()
    // })
    app.get('/', (req, res) => {
      res.send('Nihida API is running')
    })

    app.use(baseUrl, indexRouter)

    // Catch-all route handler
    app.use((req, res) => {
      new ErrorResponse(
        404,
        `Route ${req.method} ${req.originalUrl} not found`,
      ).send(res)
    })

    const PORT = port
    app.listen(PORT, () => {
      console.log(`Current environment: ${currentEnv}`)
      console.log(`CORS Endpoints: ${corsTargetEndpoint}`)
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server initialization failed:', error)
  }
}

initializeServer()
