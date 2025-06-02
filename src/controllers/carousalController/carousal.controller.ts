// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createCarousalModel } from '../../models/carousalModels/carousal.model'
import { createCarousalService } from '../../services/carousalServices/createCarousal.servie'
import { deleteCarousalService } from '../../services/carousalServices/deleteCarousal.service'
import { updateCarousalService } from '../../services/carousalServices/updateCarousal.service'

export const createCarousalController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    if (!req.file) {
      return new ErrorResponse(400, 'Image upload required').send(res)
    }
    const file = req?.file?.filename
    const argObj = {
      file,
    }
    const result = await createCarousalService(argObj)
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

export const updateCarousalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid carousal ID format').send(res)
    }
    let file = undefined
    if (req.file) {
      file = req.file?.filename
    }
    const argObj = {
      id,
      file,
    }
    const result = await updateCarousalService(argObj)
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

export const deleteCarousalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid carousal ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteCarousalService(argObj)
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

export const getAllCarousalsController = async (_: Request, res: Response) => {
  try {
    const carousalList = await createCarousalModel.find()
    if (carousalList?.length > 0) {
      return new SuccessResponse(
        'Carousals retrieved successfully',
        carousalList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Carousals not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getCarousalByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid carousal ID format').send(res)
    }

    const carousal = await createCarousalModel.findById(id)
    if (!carousal) {
      return new ErrorResponse(404, 'Carousal not found').send(res)
    }

    return new SuccessResponse(
      'Carousal retrieved successfully',
      carousal,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
