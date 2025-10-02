import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import ErrorCodes from '../../utils/errorCodes'
import { createPaymentService } from '../../services/payment/createPayment.service'
import { getPaymentByIdService } from '../../services/payment/getPaymentById.service'
import { stripeConfig } from '../../utils/constant'
import { stripeWebHookService } from '../../services/payment/stripeWebhook.service'
import { paymentModel } from '../../schema/payment/payment.schema'
import mongoose from 'mongoose'
import { updatePaymentService } from '../../services/payment/updatePayment.service'

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const {
      amount = '',
      currency = '',
      metadata = {},
      name = '',
      email = '',
      message = '',
      billingName = '',
      billingAddress = '',
      city = '',
      state = '',
      postalCode = '',
      country = '',
    } = req?.body
    const argObj = {
      amount,
      currency,
      metadata,
      name,
      email,
      message,
      billingName,
      billingAddress,
      city,
      state,
      postalCode,
      country,
    }
    const result = await createPaymentService(argObj)
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

export const updatePaymentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid payment ID format').send(res)
    }
    const { status } = req.body

    const argObj = {
      id,
      status,
    }
    const result = await updatePaymentService(argObj)
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

export const getAllPaymentController = async (_: Request, res: Response) => {
  try {
    const paymentList = await paymentModel.find().sort({ createdAt: -1 })
    if (paymentList?.length > 0) {
      return new SuccessResponse(
        'Payment retrieved successfully',
        paymentList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Payment not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const { id = '' } = req?.params
    if (id === '') {
      return new ErrorResponse(400, 'Invalid payment ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await getPaymentByIdService(argObj)
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
export const stripeWebHookController = async (req: Request, res: Response) => {
  try {
    const sig = req.headers['stripe-signature'] || ''
    const endpointSecret = stripeConfig.stripeWebhookSecretKey
    const body = req.body
    const argObj = {
      sig,
      endpointSecret,
      body,
    }
    const result = await stripeWebHookService(argObj)
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
