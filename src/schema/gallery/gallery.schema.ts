import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'event',
        'impact',
        'volunteer',
        'daily-life',
        'community',
        'other',
      ],
    },

    description: {
      type: String,
      required: false,
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
export const galleryModel = mongoose.model('Gallery', gallerySchema)
