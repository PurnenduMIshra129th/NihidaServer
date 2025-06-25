import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: false,
    },

    url: {
      type: String,
      required: false,
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

    category: {
      type: String,
      enum: ['press-release', 'impact', 'announcement', 'event', 'other'],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    tags: {
      type: [String],
      required: false,
    },

    visibility: {
      type: String,
      enum: ['public', 'internal'],
      default: 'public',
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
)
export const newsModel = mongoose.model('News', newsSchema)
