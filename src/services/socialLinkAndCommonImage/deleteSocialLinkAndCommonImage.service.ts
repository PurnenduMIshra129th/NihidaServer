import { deleteFromR2 } from '../../config/cloudfare'
import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
import { IDeleteSocialLinkAndCommonImage } from '../../types/socialLinkAndCommonImage/socialLinkAndCommonImage.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { enableCloudFareStorage } from '../../utils/constant'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteSocialLinkAndCommonImageService = async (
  data: IDeleteSocialLinkAndCommonImage,
) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'SocialLinkAndCommonImage ID is required')
    }

    // Find the socialLinkAndCommonImage document
    const socialLinkAndCommonImage =
      await socialLinkAndCommonImageModel.findById(id)
    if (!socialLinkAndCommonImage) {
      return sendErrorData(404, 'SocialLinkAndCommonImage not found')
    }

    // Store file path before deletion for cleanup
    const files = socialLinkAndCommonImage.files

    // Delete from database first
    await socialLinkAndCommonImageModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        if (enableCloudFareStorage == 'false') {
          deleteFileIfExists(path)
        } else {
          deleteFromR2(path)
        }
      }
    }
    return sendSuccessData(
      'SocialLinkAndCommonImage deleted successfully',
      socialLinkAndCommonImage,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
