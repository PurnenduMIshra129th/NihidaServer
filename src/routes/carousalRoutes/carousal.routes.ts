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
  '/createCarousal',
  uploadMiddleware(uploadSubFolder.carousalDir),
  createCarousalController,
)
carousalRouter.post(
  '/updateCarousal/:id',
  uploadMiddleware(uploadSubFolder.carousalDir),
  updateCarousalController,
)
carousalRouter.delete('/deleteCarousal/:id', deleteCarousalController)

carousalRouter.get('/getAllCarousal', getAllCarousalsController)

carousalRouter.get('/getCarousalById/:id', getCarousalByIdController)

export default carousalRouter
