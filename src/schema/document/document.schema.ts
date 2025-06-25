import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        'certificate',
        'recognition',
        'legal',
        'media',
        'annual-report',
        'other',
      ],
    },

    description: {
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

    issuedBy: {
      type: String,
      required: false,
    },

    issueDate: {
      type: Date,
      required: false,
    },

    expiresAt: {
      type: Date,
      required: false,
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  { timestamps: true },
)
export const documentModel = mongoose.model('Document', documentSchema)
