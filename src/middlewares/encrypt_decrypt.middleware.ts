import { Request, Response, NextFunction } from 'express'
import { decryptData, encryptData } from '../config/encryption_decryption'
import { ErrorResponse } from '../utils/apiResponse'

export const decryptionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.encryptedData) {
      req.body = decryptData(req.body.encryptedData)
    }
    next()
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const encryptionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalSend = res.send

  res.send = function (data: any) {
    const encryptedResponse = encryptData(data)
    return originalSend.call(this, { encryptedData: encryptedResponse })
  }

  next()
}
