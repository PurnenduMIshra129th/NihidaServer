import { Router } from 'express'
import mediaRouter from './mediaRoutes/media.routes'
import blogRouter from './blogRoutes/blog.routes'
import newsRouter from './news/news.route'
import productAndServiceRouter from './productAndServiceRoutes/productAndService.routes'
import videoRouter from './videoRoutes/video.route'
import carousalRouter from './carousalRoutes/carousal.routes'
import socialLinkRouter from './socialLinkRoutes/socialLink.routes'
import authenticationRouter from './authentication/authentication.route'
import focusActivityRouter from './focusActivity/focusActivity.route'
import uploadRouter from './upload/upload.route'
import upcomingEventRouter from './upcomingEvent/upcomingEvent.route'
import documentRouter from './document/document.route'
import galleryRouter from './gallery/gallery.route'

const indexRouter = Router()
indexRouter.use('/media', mediaRouter)
indexRouter.use('/blog', blogRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/productAndService', productAndServiceRouter)
indexRouter.use('/video', videoRouter)
indexRouter.use('/carousel', carousalRouter)
indexRouter.use('/socialLink', socialLinkRouter)
indexRouter.use('/authentication', authenticationRouter)
indexRouter.use('/focusActivity', focusActivityRouter)
indexRouter.use('/upload', uploadRouter)
indexRouter.use('/upcomingEvent', upcomingEventRouter)
indexRouter.use('/document', documentRouter)
indexRouter.use('/gallery', galleryRouter)

export default indexRouter
