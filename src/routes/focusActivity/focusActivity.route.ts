import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import {
  createFocusActivityController,
  updateFocusActivityController,
  deleteFocusActivityController,
  getAllFocusActivitysController,
  getFocusActivityByIdController,
} from '../../controllers/focusActivity/focusActivity.controller'
import { focusActivityDTO } from '../../dto/focusActivity/focusActivity.dto'

const focusActivityRouter = Router()

focusActivityRouter.post(
  '/createFocusActivity',
  validateInputs(focusActivityDTO),
  createFocusActivityController,
)
focusActivityRouter.put(
  '/updateFocusActivity/:id',
  validateInputs(focusActivityDTO),
  updateFocusActivityController,
)

focusActivityRouter.delete(
  '/deleteFocusActivity/:id',
  deleteFocusActivityController,
)

focusActivityRouter.get('/getAllFocusActivity', getAllFocusActivitysController)

focusActivityRouter.get(
  '/getFocusActivityById/:id',
  getFocusActivityByIdController,
)

export default focusActivityRouter
