import mongoose from 'mongoose'
import { createSocialLinkSchema } from '../../schema/socialLinkSchema/socialLink.schema'

export const createSocialLinkModel = mongoose.model(
  'SocialLink',
  createSocialLinkSchema,
)
