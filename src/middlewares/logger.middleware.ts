import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'
import moment from 'moment'
import { ErrorResponse } from '../utils/apiResponse'

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(`[${timestamp}] Incoming Request: ${req.method} ${req.url}`)
    Logger.logRequest(req)
    next()
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export default logMiddleware
