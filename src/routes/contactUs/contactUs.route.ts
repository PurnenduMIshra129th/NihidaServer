import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { contactUsDTO } from '../../dto/contactUs/contactUs.dto'
import {
  createContactUsController,
  updateContactUsController,
  deleteContactUsController,
  getAllContactUsController,
  getContactUsByIdController,
} from '../../controllers/contactUs/contactUs.controller'
const contactUsRouter = Router()

contactUsRouter.post(
  '/createContactUs',
  validateInputs(contactUsDTO),
  createContactUsController,
)
contactUsRouter.put(
  '/updateContactUs/:id',
  validateInputs(contactUsDTO),
  updateContactUsController,
)
contactUsRouter.delete('/deleteContactUs/:id', deleteContactUsController)

contactUsRouter.get('/getAllContactUs', getAllContactUsController)

contactUsRouter.get('/getContactUsById/:id', getContactUsByIdController)

export default contactUsRouter
