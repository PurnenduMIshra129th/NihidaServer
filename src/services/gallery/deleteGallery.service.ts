import { deleteFromR2 } from '../../config/cloudfare'
import { galleryModel } from '../../schema/gallery/gallery.schema'
import { IDeleteGallery } from '../../types/gallery/gallery.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { enableCloudFareStorage } from '../../utils/constant'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteGalleryService = async (data: IDeleteGallery) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Gallery ID is required')
    }

    // Find the gallery document
    const gallery = await galleryModel.findById(id)
    if (!gallery) {
      return sendErrorData(404, 'Gallery not found')
    }

    // Store file path before deletion for cleanup
    const files = gallery.files

    // Delete from database first
    await galleryModel.findByIdAndDelete(id)

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
    return sendSuccessData('Gallery deleted successfully', gallery)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
