import mongoose from 'mongoose'

const contactUsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // Person reaching out
      trim: true,
    },

    email: {
      type: String,
      required: true, // For follow-up and recordkeeping
      lowercase: true,
      match: /^\S+@\S+\.\S+$/, // Basic email format validation
    },

    phone: {
      type: String, // Optional contact number
    },

    message: {
      type: String,
      required: true, // Inquiry, suggestion, or interest
    },

    subject: {
      type: String, // Optional: allows categorization
    },

    type: {
      type: String,
      enum: ['volunteer', 'donation', 'partnership', 'general', 'feedback'],
      default: 'general',
    },
    responded: {
      type: Boolean,
      default: false, // Tracks if team has followed up
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const contactUsModel = mongoose.model('ContactUs', contactUsSchema)
