import { createSocialLinkModel } from '../../models/socialLinkModels/socialLink.model'
import { IDeleteSocialLink } from '../../types/socialLinkTypes/socialLink.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const deleteSocialLinkService = async (data: IDeleteSocialLink) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'SocialLink ID is required')
    }

    // Find the socialLink document
    const socialLink = await createSocialLinkModel.findById(id)
    if (!socialLink) {
      return sendErrorData(404, 'SocialLink not found')
    }

    // Delete from database first
    await createSocialLinkModel.findByIdAndDelete(id)

    return sendSuccessData('SocialLink deleted successfully', socialLink)
  } catch (error) {
    console.error('Delete socialLink service error:', error)
    return sendErrorData(
      500,
      'Internal server error occurred while deleting socialLink',
    )
  }
}
