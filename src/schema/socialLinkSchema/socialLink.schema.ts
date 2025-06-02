import mongoose from 'mongoose'

export const createSocialLinkSchema = new mongoose.Schema(
  {
    instagramUrl: { type: String, required: true },
    facebookUrl: { type: String, required: true },
    twitterUrl: { type: String, required: true },
    linkedinUrl: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    whatsappUrl: { type: String, required: true },
    telegramUrl: { type: String, required: true },
    phoneNumber1: { type: String, required: true },
    phoneNumber2: { type: String, required: true },
  },
  { timestamps: true },
)
