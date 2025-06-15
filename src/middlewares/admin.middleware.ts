import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { extractToken, nonAdminRoutes } from '../utils/utils'
import { ErrorResponse } from '../utils/apiResponse'
import { jwtSecret, role } from '../utils/constant'

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { path } = req

  if (nonAdminRoutes.includes(path)) {
    return next()
  }

  const token = extractToken(req)

  if (!token)
    return new ErrorResponse(401, 'Please Provide a valid token').send(res)

  try {
    const decoded = jwt.verify(token, jwtSecret!) as {
      role: string
    }
    if (decoded.role !== role.admin) {
      return new ErrorResponse(403, 'Access denied: Admins only').send(res)
    }

    req.user = decoded
    next()
  } catch (error) {
    return new ErrorResponse(401, error).send(res)
  }
}
