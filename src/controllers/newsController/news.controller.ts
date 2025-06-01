// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createNewsModel } from '../../models/newsModels/createNews.model'
import { createNewsService } from '../../services/newsServices/createNews.service'
import { deleteNewsService } from '../../services/newsServices/deleteNews.service'
import { updateNewsService } from '../../services/newsServices/updateNews.service'

export const createNewsController = async (req: Request, res: Response) => {
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
    const result = await createNewsService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const updateNewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
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
    const result = await updateNewsService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const deleteNewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const argObj = {
      id,
    }
    const result = await deleteNewsService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getAllNewsController = async (_: Request, res: Response) => {
  try {
    const NewsList = await createNewsModel.find()
    return new SuccessResponse('News retrieved successfully', NewsList).send(
      res,
    )
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getNewsByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid News ID format').send(res)
    }

    const news = await createNewsModel.findById(id)
    if (!news) {
      return new ErrorResponse(404, 'News not found').send(res)
    }

    return new SuccessResponse('News retrieved successfully', news).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
