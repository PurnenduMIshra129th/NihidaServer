import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import ErrorCodes from '../../utils/errorCodes'
import { IPaymentConfirmation } from '../../types/email/email.type'
import { paymentConfirmationService } from '../../services/email/paymentConfirmation/paymentConfirmation.service'

export const paymentConfirmationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { paymentId = '', amount = '', email = '', name = '' } = req?.body
    const argObj: IPaymentConfirmation = {
      paymentId,
      amount,
      email,
      name,
    }
    const result = await paymentConfirmationService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
