// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createBlogService } from '../../services/blogServices/createBlog.service'
import { updateBlogService } from '../../services/blogServices/updateBlog.service'
import { deleteBlogService } from '../../services/blogServices/deleteBlog.service'
import { createBlogModel } from '../../models/blogModels/createBlog.model'

export const createBlogController = async (req: Request, res: Response) => {
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
    const result = await createBlogService(argObj)
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

export const updateBlogController = async (req: Request, res: Response) => {
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
    const result = await updateBlogService(argObj)
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

export const deleteBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const argObj = {
      id,
    }
    const result = await deleteBlogService(argObj)
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

export const getAllBlogsController = async (_: Request, res: Response) => {
  try {
    const blogList = await createBlogModel.find()
    return new SuccessResponse('Blogs retrieved successfully', blogList).send(
      res,
    )
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getBlogByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid blog ID format').send(res)
    }

    const blog = await createBlogModel.findById(id)
    if (!blog) {
      return new ErrorResponse(404, 'Blog not found').send(res)
    }

    return new SuccessResponse('Blog retrieved successfully', blog).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
