import mongoose from 'mongoose'
import { createVideoSchema } from '../../schema/videoSchema/video.schema'

export const createVideoModel = mongoose.model('Video', createVideoSchema)
