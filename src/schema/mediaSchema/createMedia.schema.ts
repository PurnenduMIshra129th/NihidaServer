import mongoose from 'mongoose'

export const createMediaSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
})
