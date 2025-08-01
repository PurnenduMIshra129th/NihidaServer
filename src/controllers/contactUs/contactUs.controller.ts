import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { contactUsModel } from '../../schema/contactUs/contactUs.schema'
import { createContactUsService } from '../../services/contactUs/createContactUs.service'
import { deleteContactUsService } from '../../services/contactUs/deleteContactUs.service'
import { updateContactUsService } from '../../services/contactUs/updateContactUs.service'

export const createContactUsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    } = req.body ?? {}
    const argObj = {
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    }
    const result = await createContactUsService(argObj)
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

export const updateContactUsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid contactUs ID format').send(res)
    }
    const {
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    } = req.body

    const argObj = {
      id,
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    }
    const result = await updateContactUsService(argObj)
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
export const deleteContactUsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid contactUs ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteContactUsService(argObj)
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

export const getAllContactUsController = async (_: Request, res: Response) => {
  try {
    const contactUsList = await contactUsModel.find().sort({ createdAt: -1 })
    if (contactUsList?.length > 0) {
      return new SuccessResponse(
        'ContactUs retrieved successfully',
        contactUsList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'ContactUs not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getContactUsByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid contactUs ID format').send(res)
    }

    const contactUs = await contactUsModel.findById(id)
    if (!contactUs) {
      return new ErrorResponse(404, 'ContactUs not found').send(res)
    }

    return new SuccessResponse(
      'ContactUs retrieved successfully',
      contactUs,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
