import { Router } from 'express'
import {
  createSocialLinkController,
  deleteSocialLinkController,
  getAllSocialLinkController,
  getSocialLinkByIdController,
  updateSocialLinkController,
} from '../../controllers/socialLinkController/socialLink.controller'
import validateInputs from '../../middlewares/validation.middleware'
import { createSocialLinkDTO } from '../../dto/socialLinkDTO/socialLink.dto'
const socialLinkRouter = Router()

socialLinkRouter.post(
  '/createSocialLink',
  validateInputs(createSocialLinkDTO),
  createSocialLinkController,
)
socialLinkRouter.post(
  '/updateSocialLink/:id',
  validateInputs(createSocialLinkDTO),
  updateSocialLinkController,
)
socialLinkRouter.delete('/deleteSocialLink/:id', deleteSocialLinkController)

socialLinkRouter.get('/getAllSocialLink', getAllSocialLinkController)

socialLinkRouter.get('/getSocialLinkById/:id', getSocialLinkByIdController)

export default socialLinkRouter
