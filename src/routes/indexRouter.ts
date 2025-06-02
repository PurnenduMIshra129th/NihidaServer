import { Router } from 'express'
import mediaRouter from './mediaRoutes/media.routes'
import blogRouter from './blogRoutes/blog.routes'
import newsRouter from './newsRoutes/news.routes'
import productAndServiceRouter from './productAndServiceRoutes/productAndService.routes'
import videoRouter from './videoRoutes/video.routes'
import carousalRouter from './carousalRoutes/carousal.routes'
import socialLinkRouter from './socialLinkRoutes/socialLink.routes'

const indexRouter = Router()
indexRouter.use('/media', mediaRouter)
indexRouter.use('/blog', blogRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/productAndService', productAndServiceRouter)
indexRouter.use('/video', videoRouter)
indexRouter.use('/carousel', carousalRouter)
indexRouter.use('/socialLink', socialLinkRouter)

export default indexRouter
