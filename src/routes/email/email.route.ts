import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { paymentConfirmationDTO } from '../../dto/email/email.dto'
import { paymentConfirmationController } from '../../controllers/email/email.controller'

const emailRouter = Router()

emailRouter.post(
  '/send-payment-confirmation',
  validateInputs(paymentConfirmationDTO),
  paymentConfirmationController,
)
export default emailRouter
