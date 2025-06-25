import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import {
  createDocumentController,
  updateDocumentController,
  deleteDocumentController,
  getAllDocumentsController,
  getDocumentByIdController,
} from '../../controllers/document/document.controller'
import { documentDTO } from '../../dto/document/document.dto'

const documentRouter = Router()

documentRouter.post(
  '/createDocument',
  validateInputs(documentDTO),
  createDocumentController,
)
documentRouter.put(
  '/updateDocument/:id',
  validateInputs(documentDTO),
  updateDocumentController,
)

documentRouter.delete('/deleteDocument/:id', deleteDocumentController)

documentRouter.get('/getAllDocument', getAllDocumentsController)

documentRouter.get('/getDocumentById/:id', getDocumentByIdController)

export default documentRouter
