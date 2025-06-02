import mongoose from 'mongoose'

export const createVideoSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true },
)
