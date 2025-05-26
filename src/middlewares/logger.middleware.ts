import { Request, Response, NextFunction } from 'express'
import Logger from '../utils/logger'
import moment = require('moment')

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(`[${timestamp}] Incoming Request: ${req.method} ${req.url}`)
  Logger.logRequest(req)
  next()
}

export default logMiddleware
