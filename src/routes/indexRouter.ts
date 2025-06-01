import { Router } from 'express'
import mediaRouter from './mediaRoutes/media.routes'
import blogRouter from './blogRoutes/blog.routes'
import newsRouter from './newsRoutes/news.routes'
import productAndServiceRouter from './productAndServiceRoutes/productAndService.routes'

const indexRouter = Router()
indexRouter.use('/media', mediaRouter)
indexRouter.use('/blog', blogRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/productAndService', productAndServiceRouter)

export default indexRouter
