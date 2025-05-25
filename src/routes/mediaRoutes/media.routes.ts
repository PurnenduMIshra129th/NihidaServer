import { Router } from 'express'
import { createMediaController } from '../../controllers/mediaController/media.controller'
import validateInputs from '../../middlewares/validation.middlewares'
import { createMediaDTO } from '../../dto/mediaDTO/createMedia.dto'
const mediaRouter = Router()

mediaRouter.post(
  '/createMedia',
  validateInputs(createMediaDTO),
  createMediaController,
)

export default mediaRouter
