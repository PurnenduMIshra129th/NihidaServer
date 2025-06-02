import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateSocialLink } from '../../types/socialLinkTypes/socialLink.type'
import { createSocialLinkModel } from '../../models/socialLinkModels/socialLink.model'

export const createSocialLinkService = async (data: ICreateSocialLink) => {
  try {
    const {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
    } = data

    const existingCount = await createSocialLinkModel.countDocuments()

    if (existingCount >= 1) {
      return sendErrorData(400, 'Only one SocialLink entry is allowed')
    }

    const socialLink = new createSocialLinkModel({
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
    })

    await socialLink.save()
    return sendSuccessData('SocialLink created successfully', socialLink)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
