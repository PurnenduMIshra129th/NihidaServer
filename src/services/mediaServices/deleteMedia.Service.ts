import { createMediaModel } from '../../models/mediaModels/createMedia.model'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IDeleteMedia } from '../../types/mediaTypes/media.type'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'

export const deleteMediaService = async (data: IDeleteMedia) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Media ID is required')
    }

    // Find the media document
    const media = await createMediaModel.findById(id)
    if (!media) {
      return sendErrorData(404, 'Media not found')
    }

    // Store file path before deletion for cleanup
    const imagePath = media.imagePath

    // Delete from database first
    await createMediaModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.mediaDir,
        imagePath,
      )
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData('Media deleted successfully', media)
  } catch (error) {
    console.error('Delete media service error:', error)
    return sendErrorData(
      500,
      'Internal server error occurred while deleting media',
    )
  }
}
