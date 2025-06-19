import { Response } from 'express'
import ErrorCodes from './errorCodes'
import Logger from './logger'

class SuccessResponse<T> {
  statusCode: number
  message: string
  data: T

  constructor(message: string, data: T) {
    this.statusCode = 1
    this.message = message
    this.data = data
  }

  send(res: Response) {
    Logger.logSuccess(this.message, this.data)
    res.status(200).json(this)
  }
}

class ErrorResponse {
  statusCode: number
  errorCode: number
  errorMessage: string
  shortHand: string
  error: any

  constructor(errorCode: keyof typeof ErrorCodes, error?: any) {
    const errorInfo = ErrorCodes[errorCode] || ErrorCodes[500]

    this.statusCode = 0
    this.errorCode = errorInfo.code
    this.errorMessage = errorInfo.message
    this.shortHand = errorInfo.shortHand
    if (error instanceof Error && typeof error.message === 'string') {
      this.error = error.message
    } else {
      this.error = error
    }
  }
  send(res: Response) {
    console.log(this.errorCode, this.errorMessage, this.error)
    Logger.logError(this.errorCode, this.errorMessage, this.error)
    res.status(200).json(this)
  }
}

const sendSuccessData = <T>(message: string, data: T) => {
  return new SuccessResponse<T>(message, data)
}

const sendErrorData = (errorCode: keyof typeof ErrorCodes, error?: any) => {
  return new ErrorResponse(errorCode, error)
}

export { SuccessResponse, ErrorResponse, sendSuccessData, sendErrorData }
