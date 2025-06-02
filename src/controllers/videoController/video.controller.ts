// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createVideoService } from '../../services/videoServices/createVideo.service'
import { updateVideoService } from '../../services/videoServices/updateVideo.service'
import { deleteVideoService } from '../../services/videoServices/deleteVideo.service'
import { createVideoModel } from '../../models/videoModels/video.model'

export const createVideoController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    if (!req.file) {
      return new ErrorResponse(400, 'Image upload required').send(res)
    }
    const { heading, description, videoUrl } = req?.body
    const file = req?.file?.filename
    const argObj = {
      heading,
      description,
      videoUrl,
      file,
    }
    const result = await createVideoService(argObj)
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

export const updateVideoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid Video ID format').send(res)
    }
    const { heading, description, videoUrl } = req.body
    let file = undefined
    if (req.file) {
      file = req.file?.filename
    }
    const argObj = {
      id,
      heading,
      description,
      videoUrl,
      file,
    }
    const result = await updateVideoService(argObj)
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

export const deleteVideoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid Video ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteVideoService(argObj)
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

export const getAllVideoController = async (_: Request, res: Response) => {
  try {
    const VideoList = await createVideoModel.find()
    if (VideoList && VideoList.length > 0) {
      return new SuccessResponse(
        'Video retrieved successfully',
        VideoList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Video not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getVideoByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid Video ID format').send(res)
    }

    const video = await createVideoModel.findById(id)
    if (!video) {
      return new ErrorResponse(404, 'Video not found').send(res)
    }

    return new SuccessResponse('Video retrieved successfully', video).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
