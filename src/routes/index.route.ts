import { Router } from 'express'
import newsRouter from './news/news.route'
import videoRouter from './video/video.route'
import authenticationRouter from './authentication/authentication.route'
import focusActivityRouter from './focusActivity/focusActivity.route'
import uploadRouter from './upload/upload.route'
import upcomingEventRouter from './upcomingEvent/upcomingEvent.route'
import documentRouter from './document/document.route'
import galleryRouter from './gallery/gallery.route'
import socialLinkAndCommonImageRouter from './socialLinkAndCommonImage/socialLinkAndCommonImage.route'
import optimizeImageRouter from './optimizeImages/optmizeImages.route'
import teamMemberRouter from './teamMember/teamMember.route'

const indexRouter = Router()
indexRouter.use('/upload', uploadRouter)
indexRouter.use('/news', newsRouter)
indexRouter.use('/video', videoRouter)
indexRouter.use('/authentication', authenticationRouter)
indexRouter.use('/focusActivity', focusActivityRouter)
indexRouter.use('/upcomingEvent', upcomingEventRouter)
indexRouter.use('/document', documentRouter)
indexRouter.use('/gallery', galleryRouter)
indexRouter.use('/socialLinkAndCommonImage', socialLinkAndCommonImageRouter)
indexRouter.use('/optimize', optimizeImageRouter)
indexRouter.use('/teamMember', teamMemberRouter)

export default indexRouter
