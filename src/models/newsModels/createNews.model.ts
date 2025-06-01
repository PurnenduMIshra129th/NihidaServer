import mongoose from 'mongoose'
import { createMediaSchema } from '../../schema/mediaSchema/createMedia.schema'

export const createNewsModel = mongoose.model('News', createMediaSchema)
