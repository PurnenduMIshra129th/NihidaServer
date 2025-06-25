import mongoose from 'mongoose'

const upcomingEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String }, // optional tagline
    description: { type: String, required: true },

    date: { type: Date, required: true },
    location: { type: String, required: true },

    files: [
      {
        fileName: { type: String, required: true },
        originalName: { type: String, required: true },
        mimeType: { type: String, required: true },
        serverFilePath: { type: String, required: true },
        publicFilePath: { type: String, required: true },
      },
    ], // optional: image path or URL
    tags: [{ type: String }], // optional: "health", "education", etc.

    cta: {
      label: { type: String },
      url: { type: String },
    },

    impactGoals: [{ type: String }], // optional: e.g. "Distribute 100 kits"

    contactPerson: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'closed'],
      default: 'upcoming',
    },
  },
  { timestamps: true },
)

export const upcomingEventModel = mongoose.model(
  'UpcomingEvent',
  upcomingEventSchema,
)
