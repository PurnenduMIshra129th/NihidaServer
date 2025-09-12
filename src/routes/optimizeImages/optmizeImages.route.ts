import { Router } from 'express'
import {
  changeToCloudfarePublicPathController,
  downloadUploadedFileController,
  optimizeImageFileInServerController,
  optimizeImagePathInDatabaseController,
} from '../../controllers/optimizeImages/optimizeImages.controller'
const optimizeImageRouter = Router()

optimizeImageRouter.get(
  '/imageFileInServer/:subFolderKey',
  optimizeImageFileInServerController,
)
optimizeImageRouter.get(
  '/imagePathInDatabase/:databaseModelKey',
  optimizeImagePathInDatabaseController,
)
optimizeImageRouter.get(
  '/download-uploads/:folderKey',
  downloadUploadedFileController,
)
optimizeImageRouter.get(
  '/changeToCloudfarePublicPath/:folderKey',
  changeToCloudfarePublicPathController,
)

export default optimizeImageRouter
