// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createBlogService } from '../../services/blogServices/createBlog.service'
import { updateBlogService } from '../../services/blogServices/updateBlog.service'
import { deleteBlogService } from '../../services/blogServices/deleteBlog.service'
import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { updateBlogImageService } from '../../services/blogServices/updateBlogImageService'
import { deleteBlogImageService } from '../../services/blogServices/deleteBlogImageService'

export const createBlogController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    const files = req?.files as Express.Multer.File[]

    if (!files || files.length === 0) {
      return new ErrorResponse(400, 'At least one image is required').send(res)
    }
    const { heading, description } = req?.body
    const argObj = {
      heading,
      description,
      files,
    }
    const result = await createBlogService(argObj)
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

export const updateBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid blog ID format').send(res)
    }
    const { heading, description } = req.body
    const files = req.files as Express.Multer.File[] | undefined
    const filePaths = files?.map((file) => file.filename) || []

    const argObj = {
      id,
      heading,
      description,
      filePaths,
    }
    const result = await updateBlogService(argObj)
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

export const updateBlogImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req?.params
    const { oldImagePath } = req?.body
    const newFile = req?.file as Express.Multer.File

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid blog ID').send(res)
    }

    if (!oldImagePath || !newFile) {
      return new ErrorResponse(
        400,
        'Target image and new image file are required',
      ).send(res)
    }
    const newImagePath = newFile?.filename
    if (!newImagePath) {
      return new ErrorResponse(400, 'New Image is not found').send(res)
    }
    const argObj = {
      id,
      oldImagePath,
      newImagePath,
    }
    const result = await updateBlogImageService(argObj)
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
export const deleteBlogImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    const { imagePath } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid blog ID').send(res)
    }

    if (!imagePath) {
      return new ErrorResponse(400, 'Image filename is required').send(res)
    }
    const argObj = {
      id,
      imagePath,
    }
    const result = await deleteBlogImageService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (err) {
    return new ErrorResponse(500, err).send(res)
  }
}
export const deleteBlogController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid blog ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteBlogService(argObj)
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

export const getAllBlogsController = async (_: Request, res: Response) => {
  try {
    const blogList = await createBlogModel.find().sort({ createdAt: -1 })
    if (blogList?.length > 0) {
      return new SuccessResponse('Blogs retrieved successfully', blogList).send(
        res,
      )
    } else {
      return new ErrorResponse(404, 'Blogs not found').send(res)
    }
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
