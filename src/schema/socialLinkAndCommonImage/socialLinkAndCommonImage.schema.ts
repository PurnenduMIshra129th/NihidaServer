import mongoose from 'mongoose'

export const socialLinkAndCommonImageSchema = new mongoose.Schema(
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
    email: { type: String, required: true },

    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },

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
export const socialLinkAndCommonImageModel = mongoose.model(
  'SocialLinkAndCommonImage',
  socialLinkAndCommonImageSchema,
)
