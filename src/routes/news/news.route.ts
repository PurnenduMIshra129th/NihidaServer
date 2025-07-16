import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { newsDTO } from '../../dto/news/news.dto'
import {
  createNewsController,
  updateNewsController,
  deleteNewsController,
  getAllNewsController,
  getNewsByIdController,
} from '../../controllers/news/news.controller'
const newsRouter = Router()

newsRouter.post('/createNews', validateInputs(newsDTO), createNewsController)
newsRouter.put('/updateNews/:id', validateInputs(newsDTO), updateNewsController)
newsRouter.delete('/deleteNews/:id', deleteNewsController)

newsRouter.get('/getAllNews', getAllNewsController)

newsRouter.get('/getNewsById/:id', getNewsByIdController)

export default newsRouter
