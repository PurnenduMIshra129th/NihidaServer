import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { extractToken, nonTokenizedRoutes } from '../utils/utils'
import { ErrorResponse } from '../utils/apiResponse'
import { jwtSecret } from '../utils/constant'

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
  const { path } = req

  if (nonTokenizedRoutes.includes(path)) {
    return next()
  }

  const token = extractToken(req)

  if (!token)
    return new ErrorResponse(401, 'User must be logged in to access').send(res)

  try {
    const decoded = jwt.verify(token, jwtSecret!)
    req.user = decoded
    next()
  } catch (error) {
    return new ErrorResponse(401, error).send(res)
  }
}
