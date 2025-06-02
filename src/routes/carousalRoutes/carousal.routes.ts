import { Router } from 'express'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import {
  createCarousalController,
  deleteCarousalController,
  getAllCarousalsController,
  getCarousalByIdController,
  updateCarousalController,
} from '../../controllers/carousalController/carousal.controller'
const carousalRouter = Router()

carousalRouter.post(
  '/createCarousel',
  uploadMiddleware(uploadSubFolder.carousalDir),
  createCarousalController,
)
carousalRouter.post(
  '/updateCarousel/:id',
  uploadMiddleware(uploadSubFolder.carousalDir),
  updateCarousalController,
)
carousalRouter.delete('/deleteCarousel/:id', deleteCarousalController)

carousalRouter.get('/getAllCarousel', getAllCarousalsController)

carousalRouter.get('/getCarouselById/:id', getCarousalByIdController)

export default carousalRouter
