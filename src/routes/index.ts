import { Router } from 'express'
import mediaRouter from './mediaRoutes/media.routes'

const indexRouter = Router()
indexRouter.use('/media', mediaRouter)

export default indexRouter
