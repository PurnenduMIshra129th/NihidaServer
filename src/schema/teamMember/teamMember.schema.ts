import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Full name of team member
    },

    designation: {
      type: String,
      required: true, // Role like 'Coordinator' or 'Field Officer'
    },

    bio: {
      type: String,
      required: true, // Short summary of mission, background, or focus
    },

    contact: {
      email: { type: String },
      phone: { type: String },
    },

    socials: {
      linkedin: { type: String },
      twitter: { type: String },
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

    focusArea: {
      type: String,
      enum: ['education', 'health', 'environment', 'livelihood', 'other'],
      required: true,
    },

    dateJoined: {
      type: Date,
      required: true,
    },

    tags: {
      type: [String], // e.g. ["volunteer", "strategy", "grassroots"]
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
    },
  },
  { timestamps: true },
)
export const teamMemberModel = mongoose.model('TeamMember', teamMemberSchema)
