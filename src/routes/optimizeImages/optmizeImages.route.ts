import { Router } from 'express'
import {
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

export default optimizeImageRouter
