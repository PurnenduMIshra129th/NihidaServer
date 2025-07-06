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
} from '../../controllers/video/video.controller'
import { videoDTO } from '../../dto/video/video.dto'

const videoRouter = Router()

videoRouter.post(
  '/createVideo',
  uploadMiddleware(uploadSubFolder.videoDir),
  validateInputs(videoDTO),
  createVideoController,
)
videoRouter.put(
  '/updateVideo/:id',
  uploadMiddleware(uploadSubFolder.videoDir),
  validateInputs(videoDTO),
  updateVideoController,
)
videoRouter.delete('/deleteVideo/:id', deleteVideoController)

videoRouter.get('/getAllVideo', getAllVideoController)

videoRouter.get('/getVideoById/:id', getVideoByIdController)

export default videoRouter
