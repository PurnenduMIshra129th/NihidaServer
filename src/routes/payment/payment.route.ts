import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'

import {
  createPaymentDTO,
  updatePaymentDTO,
} from '../../dto/payment/payment.dto'
import {
  createPaymentController,
  getAllPaymentController,
  getPaymentByIdController,
  stripeWebHookController,
  updatePaymentController,
} from '../../controllers/payment/payment.controller'
const paymentRouter = Router()

paymentRouter.post(
  '/createPayment',
  validateInputs(createPaymentDTO),
  createPaymentController,
)
paymentRouter.post(
  '/updatePayment/:id',
  validateInputs(updatePaymentDTO),
  updatePaymentController,
)
paymentRouter.get('/getPaymentById/:id', getPaymentByIdController)
paymentRouter.get('/webhook', stripeWebHookController)
paymentRouter.get('/getAllPayment', getAllPaymentController)

export default paymentRouter
