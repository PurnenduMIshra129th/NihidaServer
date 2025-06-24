import { Router } from 'express'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import {
  deleteUploadFileController,
  updateUploadFileController,
  uploadController,
} from '../../controllers/uploadController/upload.controller'
import { focusActivityModel } from '../../schema/focusActivitySchema/focusActivity.schema'
import { validateUploadTarget } from '../../middlewares/validateTargetUpload'
import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
const uploadRouter = Router()

uploadRouter.post(
  '/createFocusActivityFile/:id',
  validateUploadTarget(focusActivityModel),
  uploadMiddleware(uploadSubFolder.focusActivityDir, true),
  uploadController(focusActivityModel, true),
)

uploadRouter.put(
  '/updateFocusActivityFile/:id/:fileID',
  validateUploadTarget(focusActivityModel),
  uploadMiddleware(uploadSubFolder.focusActivityDir, false),
  updateUploadFileController(focusActivityModel),
)

uploadRouter.delete(
  '/deleteFocusActivityFile/:id/:fileID',
  deleteUploadFileController(focusActivityModel),
)

uploadRouter.post(
  '/createUpcomingEventFile/:id',
  validateUploadTarget(upcomingEventModel),
  uploadMiddleware(uploadSubFolder.upcomingEventDir, true),
  uploadController(upcomingEventModel, true),
)
uploadRouter.put(
  '/updateUpcomingEventFile/:id/:fileID',
  validateUploadTarget(upcomingEventModel),
  uploadMiddleware(uploadSubFolder.upcomingEventDir, false),
  updateUploadFileController(upcomingEventModel),
)

uploadRouter.delete(
  '/deleteUpcomingEventFile/:id/:fileID',
  deleteUploadFileController(upcomingEventModel),
)

export default uploadRouter
