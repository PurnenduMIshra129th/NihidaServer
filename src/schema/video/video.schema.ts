import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    youtubeUrl: {
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

    category: {
      type: String,
      enum: ['testimonial', 'project', 'awareness', 'media', 'event', 'other'],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    visibility: {
      type: String,
      enum: ['public', 'internal'],
      default: 'public',
      required: true,
    },

    tags: {
      type: [String],
      required: false,
    },

    highlighted: {
      type: Boolean,
      default: false,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
)
export const videoModel = mongoose.model('Video', videoSchema)
