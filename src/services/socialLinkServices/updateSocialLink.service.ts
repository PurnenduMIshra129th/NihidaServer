import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateSocialLink } from '../../types/socialLinkTypes/socialLink.type'
import { createSocialLinkModel } from '../../models/socialLinkModels/socialLink.model'

export const updateSocialLinkService = async (data: IUpdateSocialLink) => {
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
    } = data

    const socialLink = await createSocialLinkModel.findById(id)
    if (!socialLink) {
      return sendErrorData(404, 'SocialLink not found')
    }
    if (instagramUrl) socialLink.instagramUrl = instagramUrl
    if (facebookUrl) socialLink.facebookUrl = facebookUrl
    if (twitterUrl) socialLink.twitterUrl = twitterUrl
    if (linkedinUrl) socialLink.linkedinUrl = linkedinUrl
    if (youtubeUrl) socialLink.youtubeUrl = youtubeUrl
    if (whatsappUrl) socialLink.whatsappUrl = whatsappUrl
    if (telegramUrl) socialLink.telegramUrl = telegramUrl
    if (phoneNumber1) socialLink.phoneNumber1 = phoneNumber1
    if (phoneNumber2) socialLink.phoneNumber2 = phoneNumber2

    await socialLink.save()
    return sendSuccessData('SocialLink updated successfully', socialLink)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
