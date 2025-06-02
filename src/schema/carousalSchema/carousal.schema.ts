import mongoose from 'mongoose'

export const createCarousalSchema = new mongoose.Schema(
  {
    imagePath: { type: String, required: true },
  },
  { timestamps: true },
)
