import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Partner organization or sponsor name
    },

    description: {
      type: String,
      required: true, // Short summary of their role or impact
    },

    website: {
      type: String, // External link to their official site
    },

    type: {
      type: String,
      enum: [
        'funder',
        'collaborator',
        'institutional',
        'community',
        'strategic',
      ],
      required: true, // Classification for filtering & badges
    },

    focusAreas: {
      type: [String], // e.g. ['education', 'health']
    },

    visibility: {
      type: String,
      enum: ['public', 'internal'],
      default: 'public',
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

    contactPerson: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },

    partnershipStart: {
      type: Date,
    },

    partnershipEnd: {
      type: Date,
    },

    tags: {
      type: [String], // Optional labels for search/filter
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)
export const partnerModel = mongoose.model('Partner', partnerSchema)
