import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import uploadMiddleware from '../../middlewares/upload.middleware'
import { uploadSubFolder } from '../../utils/constant'
import { createNewsDTO } from '../../dto/newsDTO/createNews.dto'
import {
  createNewsController,
  updateNewsController,
  deleteNewsController,
  getAllNewsController,
  getNewsByIdController,
} from '../../controllers/newsController/news.controller'
const newsRouter = Router()

newsRouter.post(
  '/createNews',
  uploadMiddleware(uploadSubFolder.newsDir),
  validateInputs(createNewsDTO),
  createNewsController,
)
newsRouter.post(
  '/updateNews/:id',
  uploadMiddleware(uploadSubFolder.newsDir),
  validateInputs(createNewsDTO),
  updateNewsController,
)
newsRouter.delete('/deleteNews/:id', deleteNewsController)

newsRouter.get('/getAllNews', getAllNewsController)

newsRouter.get('/getNewsById/:id', getNewsByIdController)

export default newsRouter
