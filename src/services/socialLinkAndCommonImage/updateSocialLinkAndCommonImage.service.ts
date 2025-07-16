import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateSocialLinkAndCommonImage } from '../../types/socialLinkAndCommonImage/socialLinkAndCommonImage.type'

export const updateSocialLinkAndCommonImageService = async (
  data: IUpdateSocialLinkAndCommonImage,
) => {
  try {
    const {
      id,
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

    const socialLinkAndCommonImage =
      await socialLinkAndCommonImageModel.findById(id)
    if (!socialLinkAndCommonImage) {
      return sendErrorData(404, 'socialLinkAndCommonImage not found')
    }
    if (instagramUrl) socialLinkAndCommonImage.instagramUrl = instagramUrl
    if (facebookUrl) socialLinkAndCommonImage.facebookUrl = facebookUrl
    if (twitterUrl) socialLinkAndCommonImage.twitterUrl = twitterUrl
    if (linkedinUrl) socialLinkAndCommonImage.linkedinUrl = linkedinUrl
    if (youtubeUrl) socialLinkAndCommonImage.youtubeUrl = youtubeUrl
    if (whatsappUrl) socialLinkAndCommonImage.whatsappUrl = whatsappUrl
    if (telegramUrl) socialLinkAndCommonImage.telegramUrl = telegramUrl
    if (phoneNumber1) socialLinkAndCommonImage.phoneNumber1 = phoneNumber1
    if (phoneNumber2) socialLinkAndCommonImage.phoneNumber2 = phoneNumber2
    if (email) socialLinkAndCommonImage.email = email
    if (addressLine1) socialLinkAndCommonImage.addressLine1 = addressLine1
    if (addressLine2) socialLinkAndCommonImage.addressLine2 = addressLine2
    if (city) socialLinkAndCommonImage.city = city
    if (state) socialLinkAndCommonImage.state = state
    if (country) socialLinkAndCommonImage.country = country
    if (postalCode) socialLinkAndCommonImage.postalCode = postalCode

    await socialLinkAndCommonImage.save()
    return sendSuccessData(
      'SocialLinkAndCommonImage updated successfully',
      socialLinkAndCommonImage,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
