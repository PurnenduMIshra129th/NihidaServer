import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import { createProductAndServicesDTO } from '../../dto/productAndServicesDTO/productAndServices.dto'
import {
  createProductAndServicesController,
  deleteProductAndServicesController,
  getAllProductAndServicesController,
  getProductAndServicesByIdController,
  updateProductAndServicesController,
} from '../../controllers/productAndServiceController/productAndService.controller'
const productAndServiceRouter = Router()

productAndServiceRouter.post(
  '/createProductAndService',
  uploadMiddleware(uploadSubFolder.productAndServiceDir),
  validateInputs(createProductAndServicesDTO),
  createProductAndServicesController,
)
productAndServiceRouter.post(
  '/updateProductAndService/:id',
  uploadMiddleware(uploadSubFolder.productAndServiceDir),
  validateInputs(createProductAndServicesDTO),
  updateProductAndServicesController,
)
productAndServiceRouter.delete(
  '/deleteProductAndService/:id',
  deleteProductAndServicesController,
)

productAndServiceRouter.get(
  '/getAllProductAndService',
  getAllProductAndServicesController,
)

productAndServiceRouter.get(
  '/getProductAndServiceById/:id',
  getProductAndServicesByIdController,
)

export default productAndServiceRouter
