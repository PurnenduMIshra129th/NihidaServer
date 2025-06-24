import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { createUpcomingEventService } from '../../services/upcomingEvent/createUpcomingEvent.service'
import { deleteUpcomingEventService } from '../../services/upcomingEvent/deleteUpcomingEvent.service'
import { updateUpcomingEventService } from '../../services/upcomingEvent/updateUpcomingEvent.service'

export const createUpcomingEventController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      title,
      subtitle,
      description,
      date,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    } = req?.body
    const argObj = {
      title,
      subtitle,
      description,
      date,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    }
    const result = await createUpcomingEventService(argObj)
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

export const updateUpcomingEventController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid upcomingEvent ID format').send(res)
    }
    const {
      title,
      subtitle,
      description,
      date,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    } = req.body

    const argObj = {
      id,
      title,
      subtitle,
      description,
      date,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    }
    const result = await updateUpcomingEventService(argObj)
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
export const deleteUpcomingEventController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid upcomingEvent ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteUpcomingEventService(argObj)
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

export const getAllUpcomingEventsController = async (
  _: Request,
  res: Response,
) => {
  try {
    const upcomingEventList = await upcomingEventModel
      .find()
      .sort({ createdAt: -1 })
    if (upcomingEventList?.length > 0) {
      return new SuccessResponse(
        'UpcomingEvents retrieved successfully',
        upcomingEventList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'UpcomingEvents not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getUpcomingEventByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid upcomingEvent ID format').send(res)
    }

    const upcomingEvent = await upcomingEventModel.findById(id)
    if (!upcomingEvent) {
      return new ErrorResponse(404, 'UpcomingEvent not found').send(res)
    }

    return new SuccessResponse(
      'UpcomingEvent retrieved successfully',
      upcomingEvent,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
