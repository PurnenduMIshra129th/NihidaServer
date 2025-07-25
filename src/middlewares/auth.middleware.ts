import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { extractToken, nonTokenizedRoutes } from '../utils/utils'
import { ErrorResponse } from '../utils/apiResponse'
import { currentEnv, jwtSecret } from '../utils/constant'

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { path } = req
    if (currentEnv === 'local') return next()
    if (nonTokenizedRoutes.includes(path)) {
      return next()
    }
    const token = extractToken(req)
    if (!token)
      return new ErrorResponse(401, 'User must be logged in to access').send(
        res,
      )
    const decoded = jwt.verify(token, jwtSecret!)
    req.user = decoded
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return new ErrorResponse(
        401,
        'Session expired. Please log in again.',
      ).send(res)
    }

    return new ErrorResponse(500, error).send(res)
  }
}
