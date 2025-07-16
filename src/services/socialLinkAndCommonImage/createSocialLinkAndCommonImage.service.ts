import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
import { ICreateSocialLinkAndCommonImage } from '../../types/socialLinkAndCommonImage/socialLinkAndCommonImage.type'

export const createSocialLinkAndCommonImageService = async (
  data: ICreateSocialLinkAndCommonImage,
) => {
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
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    } = data

    const socialLinkAndCommonImage = new socialLinkAndCommonImageModel({
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    })

    await socialLinkAndCommonImage.save()
    return sendSuccessData(
      'SocialLinkAndCommonImage created successfully',
      socialLinkAndCommonImage,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
