import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IDeleteCarousal } from '../../types/carousalTypes/carousal.type'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { createCarousalModel } from '../../models/carousalModels/carousal.model'

export const deleteCarousalService = async (data: IDeleteCarousal) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Carousal ID is required')
    }

    // Find the carousal document
    const carousal = await createCarousalModel.findById(id)
    if (!carousal) {
      return sendErrorData(404, 'Carousal not found')
    }

    // Store file path before deletion for cleanup
    const imagePath = carousal.imagePath

    // Delete from database first
    await createCarousalModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.carousalDir,
        imagePath,
      )
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData('Carousal deleted successfully', carousal)
  } catch (error) {
    console.error('Delete carousal service error:', error)
    return sendErrorData(
      500,
      'Internal server error occurred while deleting carousal',
    )
  }
}
