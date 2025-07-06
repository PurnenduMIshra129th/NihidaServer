import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { videoModel } from '../../schema/video/video.schema'
import { createVideoService } from '../../services/video/createVideo.service'
import { deleteVideoService } from '../../services/video/deleteVideo.service'
import { updateVideoService } from '../../services/video/updateVideo.service'

export const createVideoController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
      youtubeUrl,
    } = req?.body
    const argObj = {
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
      youtubeUrl,
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
      return new ErrorResponse(400, 'Invalid video ID format').send(res)
    }
    const {
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
      youtubeUrl,
    } = req.body

    const argObj = {
      id,
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
      youtubeUrl,
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
      return new ErrorResponse(400, 'Invalid video ID format').send(res)
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
    const videoList = await videoModel.find().sort({ createdAt: -1 })
    if (videoList?.length > 0) {
      return new SuccessResponse(
        'Videos retrieved successfully',
        videoList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Videos not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getVideoByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid video ID format').send(res)
    }

    const video = await videoModel.findById(id)
    if (!video) {
      return new ErrorResponse(404, 'Video not found').send(res)
    }

    return new SuccessResponse('Video retrieved successfully', video).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
