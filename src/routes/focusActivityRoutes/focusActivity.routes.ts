import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import {
  createFocusActivityController,
  updateFocusActivityController,
  deleteFocusActivityController,
  getAllFocusActivitysController,
  getFocusActivityByIdController,
} from '../../controllers/focusActivityController/focusActivity.controller'
import { createFocusActivityDTO } from '../../dto/focusActivityDTO/createFocusActivity.dto'

const focusActivityRouter = Router()

focusActivityRouter.post(
  '/createFocusActivity',
  validateInputs(createFocusActivityDTO),
  createFocusActivityController,
)
focusActivityRouter.put(
  '/updateFocusActivity/:id',
  validateInputs(createFocusActivityDTO),
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
