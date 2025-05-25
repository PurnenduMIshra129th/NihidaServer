import mongoose from 'mongoose'
import { createMediaSchema } from '../../schema/mediaSchema/createMedia.schema'

export const createMediaModel = mongoose.model('Media', createMediaSchema)
