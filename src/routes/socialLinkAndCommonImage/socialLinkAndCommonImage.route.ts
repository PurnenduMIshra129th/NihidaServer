import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { socialLinkAndCommonImageDTO } from '../../dto/socialLinkAndCommonImage/socialLinkAndCommonImage.dto'
import {
  createSocialLinkAndCommonImageController,
  updateSocialLinkAndCommonImageController,
  deleteSocialLinkAndCommonImageController,
  getAllSocialLinkAndCommonImageController,
  getSocialLinkAndCommonImageByIdController,
} from '../../controllers/socialLinkAndCommonImage/socialLinkAndCommonImage.controller'
const socialLinkAndCommonImageRouter = Router()

socialLinkAndCommonImageRouter.post(
  '/createSocialLinkAndCommonImage',
  validateInputs(socialLinkAndCommonImageDTO),
  createSocialLinkAndCommonImageController,
)
socialLinkAndCommonImageRouter.put(
  '/updateSocialLinkAndCommonImage/:id',
  validateInputs(socialLinkAndCommonImageDTO),
  updateSocialLinkAndCommonImageController,
)
socialLinkAndCommonImageRouter.delete(
  '/deleteSocialLinkAndCommonImage/:id',
  deleteSocialLinkAndCommonImageController,
)

socialLinkAndCommonImageRouter.get(
  '/getAllSocialLinkAndCommonImage',
  getAllSocialLinkAndCommonImageController,
)

socialLinkAndCommonImageRouter.get(
  '/getSocialLinkAndCommonImageById/:id',
  getSocialLinkAndCommonImageByIdController,
)

export default socialLinkAndCommonImageRouter
