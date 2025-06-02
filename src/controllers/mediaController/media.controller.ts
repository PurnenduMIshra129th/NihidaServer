// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { createMediaModel } from '../../models/mediaModels/createMedia.model'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import { updateMediaService } from '../../services/mediaServices/updateMedia.service'
import ErrorCodes from '../../utils/errorCodes'
import { createMediaService } from '../../services/mediaServices/createMedia.service'
import { deleteMediaService } from '../../services/mediaServices/deleteMedia.Service'

export const createMediaController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    if (!req.file) {
      return new ErrorResponse(400, 'Image upload required').send(res)
    }
    const { heading, description } = req?.body
    const file = req?.file?.filename
    const argObj = {
      heading,
      description,
      file,
    }
    const result = await createMediaService(argObj)
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

export const updateMediaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid media ID format').send(res)
    }
    const { heading, description } = req.body
    let file = undefined
    if (req.file) {
      file = req.file?.filename
    }
    const argObj = {
      id,
      heading,
      description,
      file,
    }
    const result = await updateMediaService(argObj)
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

export const deleteMediaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid media ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteMediaService(argObj)
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

export const getAllMediaController = async (_: Request, res: Response) => {
  try {
    const mediaList = await createMediaModel.find()
    if (mediaList?.length > 0) {
      return new SuccessResponse(
        'Media retrieved successfully',
        mediaList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Media not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getMediaByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid media ID format').send(res)
    }

    const media = await createMediaModel.findById(id)
    if (!media) {
      return new ErrorResponse(404, 'Media not found').send(res)
    }

    return new SuccessResponse('Media retrieved successfully', media).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
