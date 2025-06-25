import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { extractToken, matchRoute, nonAdminRoutes } from '../utils/utils'
import { ErrorResponse } from '../utils/apiResponse'
import { jwtSecret, role } from '../utils/constant'

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isNonAdminRoute = nonAdminRoutes.some((routePattern) =>
      matchRoute(routePattern, req.path),
    )

    if (isNonAdminRoute) return next()

    const token = extractToken(req)

    if (!token)
      return new ErrorResponse(401, 'Please Provide a valid token').send(res)

    const decoded = jwt.verify(token, jwtSecret!) as {
      role: string
    }
    if (decoded.role !== role.admin) {
      return new ErrorResponse(403, 'Access denied: Admins only').send(res)
    }
    req.user = decoded
    next()
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
