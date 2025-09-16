import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    files: [
      {
        fileName: { type: String, required: true },
        originalName: { type: String, required: true },
        mimeType: { type: String, required: true },
        serverFilePath: { type: String, required: true },
        publicFilePath: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
)
export const partnerModel = mongoose.model('Partner', partnerSchema)
