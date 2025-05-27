// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { createMediaModel } from '../../models/MediaModels/createMedia.model'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import * as fs from 'fs'

export const createMediaController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    if (!req.file) {
      return new ErrorResponse(400, 'Image upload required').send(res)
    }
    // Define the server address (modify if deployed)
    const serverAddress = 'http://localhost:3000' // Change this if running on a different port
    const uploadsFolder = '/uploads/'

    // Generate a public URL for the image
    const imageUrl = `${serverAddress}${uploadsFolder}${req.file.filename}`
    console.log(imageUrl)
    const media = new createMediaModel({
      heading: req.body.heading,
      description: req.body.description,
      imagePath: imageUrl,
    })

    await media.save()
    return new SuccessResponse('Media created successfully', media).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const updateMediaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const media = await createMediaModel.findById(id)
    if (!media) {
      return new ErrorResponse(404, 'Media not found').send(res)
    }
    media.heading = req.body.heading || media.heading
    media.description = req.body.description || media.description
    if (req.file) {
      media.imagePath = req.file.path
    }

    await media.save()
    return new SuccessResponse('Media updated successfully', media).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const deleteMediaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const media = await createMediaModel.findById(id)
    if (!media) {
      return new ErrorResponse(404, 'Media not found').send(res)
    }

    if (media.imagePath) {
      fs.unlinkSync(media.imagePath)
    }

    await createMediaModel.findByIdAndDelete(id)
    return new SuccessResponse('Media deleted successfully', null).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getAllMediaController = async (_: Request, res: Response) => {
  try {
    const mediaList = await createMediaModel.find()
    return new SuccessResponse('Media retrieved successfully', mediaList).send(
      res,
    )
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
