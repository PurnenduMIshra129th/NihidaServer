import { Router } from 'express'
import {
  createMediaController,
  deleteMediaController,
  getAllMediaController,
  getMediaByIdController,
  updateMediaController,
} from '../../controllers/mediaController/media.controller'
import validateInputs from '../../middlewares/validation.middleware'
import { createMediaDTO } from '../../dto/mediaDTO/createMedia.dto'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
const mediaRouter = Router()

mediaRouter.post(
  '/createMedia',
  uploadMiddleware(uploadSubFolder.mediaDir),
  validateInputs(createMediaDTO),
  createMediaController,
)
mediaRouter.post(
  '/updateMedia/:id',
  uploadMiddleware(uploadSubFolder.mediaDir),
  validateInputs(createMediaDTO),
  updateMediaController,
)
mediaRouter.delete('/deleteMedia/:id', deleteMediaController)

mediaRouter.get('/getAllMedia', getAllMediaController)

mediaRouter.get('/getMediaById/:id', getMediaByIdController)

export default mediaRouter
