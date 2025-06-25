import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { galleryModel } from '../../schema/gallery/gallery.schema'
import { createGalleryService } from '../../services/gallery/createGallery.service'
import { deleteGalleryService } from '../../services/gallery/deleteGallery.service'
import { updateGalleryService } from '../../services/gallery/updateGallery.service'

export const createGalleryController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = req?.body
    const argObj = {
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    }
    const result = await createGalleryService(argObj)
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

export const updateGalleryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid gallery ID format').send(res)
    }
    const {
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = req.body

    const argObj = {
      id,
      title,
      category,
      description,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    }
    const result = await updateGalleryService(argObj)
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
export const deleteGalleryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid gallery ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteGalleryService(argObj)
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

export const getAllGallerysController = async (_: Request, res: Response) => {
  try {
    const galleryList = await galleryModel.find().sort({ createdAt: -1 })
    if (galleryList?.length > 0) {
      return new SuccessResponse(
        'Gallerys retrieved successfully',
        galleryList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Gallerys not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getGalleryByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid gallery ID format').send(res)
    }

    const gallery = await galleryModel.findById(id)
    if (!gallery) {
      return new ErrorResponse(404, 'Gallery not found').send(res)
    }

    return new SuccessResponse('Gallery retrieved successfully', gallery).send(
      res,
    )
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
