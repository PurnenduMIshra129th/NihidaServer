import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createFocusActivityService } from '../../services/focusActivityServices/createFocusActivity.service'
import { updateFocusActivityService } from '../../services/focusActivityServices/updateFocusActivity.service'
import { focusActivityModel } from '../../schema/focusActivitySchema/focusActivity.schema'
import { deleteFocusActivityService } from '../../services/focusActivityServices/deleteFocusActivity.service'

export const createFocusActivityController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    } = req?.body
    const argObj = {
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    }
    const result = await createFocusActivityService(argObj)
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

export const updateFocusActivityController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid focusActivity ID format').send(res)
    }
    const {
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    } = req.body

    const argObj = {
      id,
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    }
    const result = await updateFocusActivityService(argObj)
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
export const deleteFocusActivityController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid focusActivity ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteFocusActivityService(argObj)
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

export const getAllFocusActivitysController = async (
  _: Request,
  res: Response,
) => {
  try {
    const focusActivityList = await focusActivityModel
      .find()
      .sort({ createdAt: -1 })
    if (focusActivityList?.length > 0) {
      return new SuccessResponse(
        'FocusActivitys retrieved successfully',
        focusActivityList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'FocusActivitys not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getFocusActivityByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid focusActivity ID format').send(res)
    }

    const focusActivity = await focusActivityModel.findById(id)
    if (!focusActivity) {
      return new ErrorResponse(404, 'FocusActivity not found').send(res)
    }

    return new SuccessResponse(
      'FocusActivity retrieved successfully',
      focusActivity,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
