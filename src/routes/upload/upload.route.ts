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
import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
const uploadRouter = Router()

uploadRouter.post(
  '/createFocusActivityFile',
  validateUploadTarget(focusActivityModel),
  uploadMiddleware(uploadSubFolder.focusActivityDir, true),
  uploadController(focusActivityModel, true),
)

uploadRouter.post(
  '/updateFocusActivityFile',
  validateUploadTarget(focusActivityModel),
  uploadMiddleware(uploadSubFolder.focusActivityDir, false),
  updateUploadFileController(focusActivityModel),
)

uploadRouter.delete(
  '/deleteFocusActivityFile',
  deleteUploadFileController(focusActivityModel),
)

uploadRouter.post(
  '/createUpcomingEventFile',
  validateUploadTarget(upcomingEventModel),
  uploadMiddleware(uploadSubFolder.upcomingEventDir, false),
  uploadController(upcomingEventModel, false),
)
uploadRouter.post(
  '/updateUpcomingEventFile',
  validateUploadTarget(upcomingEventModel),
  uploadMiddleware(uploadSubFolder.upcomingEventDir, false),
  updateUploadFileController(upcomingEventModel),
)

uploadRouter.delete(
  '/deleteUpcomingEventFile',
  deleteUploadFileController(upcomingEventModel),
)

uploadRouter.post(
  '/createDocumentFile',
  validateUploadTarget(documentModel),
  uploadMiddleware(uploadSubFolder.documentDir, true, 'pdf'),
  uploadController(documentModel, true),
)
uploadRouter.post(
  '/updateDocumentFile',
  validateUploadTarget(documentModel),
  uploadMiddleware(uploadSubFolder.documentDir, false, 'pdf'),
  updateUploadFileController(documentModel),
)

uploadRouter.delete(
  '/deleteDocumentFile',
  deleteUploadFileController(documentModel),
)
uploadRouter.post(
  '/createGalleryFile',
  validateUploadTarget(galleryModel),
  uploadMiddleware(uploadSubFolder.galleryDir, true),
  uploadController(galleryModel, true),
)
uploadRouter.post(
  '/updateGalleryFile',
  validateUploadTarget(galleryModel),
  uploadMiddleware(uploadSubFolder.galleryDir, false),
  updateUploadFileController(galleryModel),
)

uploadRouter.delete(
  '/deleteGalleryFile',
  deleteUploadFileController(galleryModel),
)
uploadRouter.post(
  '/createNewsFile',
  validateUploadTarget(newsModel),
  uploadMiddleware(uploadSubFolder.newsDir, true),
  uploadController(newsModel, true),
)
uploadRouter.post(
  '/updateNewsFile',
  validateUploadTarget(newsModel),
  uploadMiddleware(uploadSubFolder.newsDir, false),
  updateUploadFileController(newsModel),
)

uploadRouter.delete('/deleteNewsFile', deleteUploadFileController(newsModel))
uploadRouter.post(
  '/createVideoFile',
  validateUploadTarget(videoModel),
  uploadMiddleware(uploadSubFolder.videoDir, false),
  uploadController(videoModel, false),
)
uploadRouter.post(
  '/updateVideoFile',
  validateUploadTarget(videoModel),
  uploadMiddleware(uploadSubFolder.videoDir, false),
  updateUploadFileController(videoModel),
)

uploadRouter.delete('/deleteVideoFile', deleteUploadFileController(videoModel))

uploadRouter.post(
  '/createSocialLinkAndCommonImageFile',
  validateUploadTarget(socialLinkAndCommonImageModel),
  uploadMiddleware(uploadSubFolder.socialLinkAndCommonImageDir, true),
  uploadController(socialLinkAndCommonImageModel, true),
)
uploadRouter.post(
  '/updateSocialLinkAndCommonImageFile',
  validateUploadTarget(socialLinkAndCommonImageModel),
  uploadMiddleware(uploadSubFolder.socialLinkAndCommonImageDir, false),
  updateUploadFileController(socialLinkAndCommonImageModel),
)

uploadRouter.delete(
  '/deleteSocialLinkAndCommonImageFile',
  deleteUploadFileController(socialLinkAndCommonImageModel),
)

export default uploadRouter
