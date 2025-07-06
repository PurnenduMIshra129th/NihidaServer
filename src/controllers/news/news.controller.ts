import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { newsModel } from '../../schema/news/news.schema'
import { createNewsService } from '../../services/news/createNews.service'
import { deleteNewsService } from '../../services/news/deleteNews.service'
import { updateNewsService } from '../../services/news/updateNews.service'

export const createNewsController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    } = req?.body
    const argObj = {
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    }
    const result = await createNewsService(argObj)
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

export const updateNewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid news ID format').send(res)
    }
    const {
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    } = req.body

    const argObj = {
      id,
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    }
    const result = await updateNewsService(argObj)
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
export const deleteNewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid news ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteNewsService(argObj)
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

export const getAllNewsController = async (_: Request, res: Response) => {
  try {
    const newsList = await newsModel.find().sort({ createdAt: -1 })
    if (newsList?.length > 0) {
      return new SuccessResponse('News retrieved successfully', newsList).send(
        res,
      )
    } else {
      return new ErrorResponse(404, 'News not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getNewsByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid news ID format').send(res)
    }

    const news = await newsModel.findById(id)
    if (!news) {
      return new ErrorResponse(404, 'News not found').send(res)
    }

    return new SuccessResponse('News retrieved successfully', news).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
