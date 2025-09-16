import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { partnerModel } from '../../schema/partner/partner.schema'
import { createPartnerService } from '../../services/partner/createPartner.service'
import { deletePartnerService } from '../../services/partner/deletePartner.service'
import { updatePartnerService } from '../../services/partner/updatePartner.service'

export const createPartnerController = async (req: Request, res: Response) => {
  try {
    const { name } = req?.body
    const argObj = {
      name,
    }
    const result = await createPartnerService(argObj)
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

export const updatePartnerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid partner ID format').send(res)
    }
    const { name } = req.body

    const argObj = {
      id,
      name,
    }
    const result = await updatePartnerService(argObj)
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
export const deletePartnerController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid partner ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deletePartnerService(argObj)
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

export const getAllPartnerController = async (_: Request, res: Response) => {
  try {
    const partnerList = await partnerModel.find().sort({ createdAt: -1 })
    if (partnerList?.length > 0) {
      return new SuccessResponse(
        'Partner retrieved successfully',
        partnerList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Partner not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getPartnerByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid partner ID format').send(res)
    }

    const partner = await partnerModel.findById(id)
    if (!partner) {
      return new ErrorResponse(404, 'Partner not found').send(res)
    }

    return new SuccessResponse('Partner retrieved successfully', partner).send(
      res,
    )
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
