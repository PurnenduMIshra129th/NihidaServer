import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import {
  createVideoController,
  updateVideoController,
  deleteVideoController,
  getAllVideoController,
  getVideoByIdController,
} from '../../controllers/videoController/video.controller'
import { createVideoDTO } from '../../dto/videoDTO/video.dto'

const videoRouter = Router()

videoRouter.post(
  '/createVideo',
  uploadMiddleware(uploadSubFolder.videoDir),
  validateInputs(createVideoDTO),
  createVideoController,
)
videoRouter.post(
  '/updateVideo/:id',
  uploadMiddleware(uploadSubFolder.videoDir),
  validateInputs(createVideoDTO),
  updateVideoController,
)
videoRouter.delete('/deleteVideo/:id', deleteVideoController)

videoRouter.get('/getAllVideo', getAllVideoController)

videoRouter.get('/getVideoById/:id', getVideoByIdController)

export default videoRouter
