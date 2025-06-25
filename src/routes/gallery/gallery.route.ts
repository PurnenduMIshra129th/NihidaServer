import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import {
  createGalleryController,
  updateGalleryController,
  deleteGalleryController,
  getAllGallerysController,
  getGalleryByIdController,
} from '../../controllers/gallery/gallery.controller'
import { galleryDTO } from '../../dto/gallery/gallery.dto'

const galleryRouter = Router()

galleryRouter.post(
  '/createGallery',
  validateInputs(galleryDTO),
  createGalleryController,
)
galleryRouter.put(
  '/updateGallery/:id',
  validateInputs(galleryDTO),
  updateGalleryController,
)

galleryRouter.delete('/deleteGallery/:id', deleteGalleryController)

galleryRouter.get('/getAllGallery', getAllGallerysController)

galleryRouter.get('/getGalleryById/:id', getGalleryByIdController)

export default galleryRouter
