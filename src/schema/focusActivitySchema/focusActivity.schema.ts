import mongoose from 'mongoose'

const focusActivitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    files: [
      {
        fileName: { type: String, required: true },
        originalName: { type: String, required: true },
        mimeType: { type: String, required: true },
        serverFilePath: { type: String, required: true },
        publicFilePath: { type: String, required: true },
      },
    ],

    impactStats: [
      {
        label: { type: String, required: true },
        value: { type: Number, required: true },
        unit: { type: String }, // optional
      },
    ],

    testimonials: [
      {
        name: { type: String, required: true },
        quote: { type: String, required: true },
        role: { type: String }, // optional
      },
    ],

    location: { type: String, index: true },
    date: { type: Date },
  },
  { timestamps: true },
)
export const focusActivityModel = mongoose.model(
  'FocusActivity',
  focusActivitySchema,
)
