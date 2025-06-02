import mongoose from 'mongoose'
import { createCarousalSchema } from '../../schema/carousalSchema/carousal.schema'

export const createCarousalModel = mongoose.model(
  'Carousal',
  createCarousalSchema,
)
