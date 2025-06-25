import { Router } from 'express'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import {
  deleteUploadFileController,
  updateUploadFileController,
  uploadController,
} from '../../controllers/upload/upload.controller'
import { focusActivityModel } from '../../schema/focusActivity/focusActivity.schema'
import { validateUploadTarget } from '../../middlewares/validateTargetUpload'
import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { documentModel } from '../../schema/document/document.schema'
import { galleryModel } from '../../schema/gallery/gallery.schema'
import { newsModel } from '../../schema/news/news.schema'
import { videoModel } from '../../schema/video/video.schema'
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
  uploadMiddleware(uploadSubFolder.upcomingEventDir, false),
  uploadController(upcomingEventModel, false),
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

uploadRouter.post(
  '/createDocumentFile/:id',
  validateUploadTarget(documentModel),
  uploadMiddleware(uploadSubFolder.documentDir, true),
  uploadController(documentModel, true),
)
uploadRouter.put(
  '/updateDocumentFile/:id/:fileID',
  validateUploadTarget(documentModel),
  uploadMiddleware(uploadSubFolder.documentDir, false),
  updateUploadFileController(documentModel),
)

uploadRouter.delete(
  '/deleteDocumentFile/:id/:fileID',
  deleteUploadFileController(documentModel),
)
uploadRouter.post(
  '/createGalleryFile/:id',
  validateUploadTarget(galleryModel),
  uploadMiddleware(uploadSubFolder.galleryDir, true),
  uploadController(galleryModel, true),
)
uploadRouter.put(
  '/updateGalleryFile/:id/:fileID',
  validateUploadTarget(galleryModel),
  uploadMiddleware(uploadSubFolder.galleryDir, false),
  updateUploadFileController(galleryModel),
)

uploadRouter.delete(
  '/deleteGalleryFile/:id/:fileID',
  deleteUploadFileController(galleryModel),
)
uploadRouter.post(
  '/createNewsFile/:id',
  validateUploadTarget(newsModel),
  uploadMiddleware(uploadSubFolder.newsDir, true),
  uploadController(newsModel, true),
)
uploadRouter.put(
  '/updateNewsFile/:id/:fileID',
  validateUploadTarget(newsModel),
  uploadMiddleware(uploadSubFolder.newsDir, false),
  updateUploadFileController(newsModel),
)

uploadRouter.delete(
  '/deleteNewsFile/:id/:fileID',
  deleteUploadFileController(newsModel),
)
uploadRouter.post(
  '/createVideoFile/:id',
  validateUploadTarget(videoModel),
  uploadMiddleware(uploadSubFolder.videoDir, false),
  uploadController(videoModel, false),
)
uploadRouter.put(
  '/updateVideoFile/:id/:fileID',
  validateUploadTarget(videoModel),
  uploadMiddleware(uploadSubFolder.videoDir, false),
  updateUploadFileController(videoModel),
)

uploadRouter.delete(
  '/deleteVideoFile/:id/:fileID',
  deleteUploadFileController(videoModel),
)

export default uploadRouter
