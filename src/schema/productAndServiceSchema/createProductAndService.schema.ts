import mongoose from 'mongoose'

export const createProductAndServiceSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
  },
  { timestamps: true },
)
