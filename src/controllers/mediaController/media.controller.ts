// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { createMediaModel } from '../../models/MediaModels/createMedia.model'

// Create Media
export const createMediaController = async (req: Request, res: Response) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    const media = new createMediaModel(req.body)
    await media.save()
    res.status(201).json(media)
  } catch (error) {
    console.error('Error creating media:', error)
    res
      .status(500)
      .json({ error: 'Internal server error while creating media' })
  }
}
