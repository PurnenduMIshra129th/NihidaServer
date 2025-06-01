import mongoose from 'mongoose'
import { createProductAndServiceSchema } from '../../schema/productAndServiceSchema/createProductAndService.schema'

export const createProductAndServiceModel = mongoose.model(
  'ProductAndService',
  createProductAndServiceSchema,
)
