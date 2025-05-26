import { Router } from 'express'
import {
  createMediaController,
  deleteMediaController,
  getAllMediaController,
  updateMediaController,
} from '../../controllers/mediaController/media.controller'
import validateInputs from '../../middlewares/validation.middleware'
import { createMediaDTO } from '../../dto/mediaDTO/createMedia.dto'
import upload from '../../middlewares/upload.middleware'
const mediaRouter = Router()

mediaRouter.post(
  '/createMedia',
  upload.single('image'),
  validateInputs(createMediaDTO),
  createMediaController,
)
mediaRouter.put(
  '/updateMedia/:id',
  upload.single('image'),
  validateInputs(createMediaDTO),
  updateMediaController,
)
mediaRouter.delete('/deleteMedia/:id', deleteMediaController)
mediaRouter.get('/getAllMedia', getAllMediaController)

export default mediaRouter
