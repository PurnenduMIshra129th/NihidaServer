import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'
import { videoModel } from '../../schema/video/video.schema'
import { IDeleteVideo } from '../../types/video/video.type'
import { deleteFromR2 } from '../../config/cloudfare'
import { enableCloudFareStorage } from '../../utils/constant'

export const deleteVideoService = async (data: IDeleteVideo) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Video ID is required')
    }

    // Find the video document
    const video = await videoModel.findById(id)
    if (!video) {
      return sendErrorData(404, 'Video not found')
    }

    // Store file path before deletion for cleanup
    const files = video.files

    // Delete from database first
    await videoModel.findByIdAndDelete(id)

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
    return sendSuccessData('Video deleted successfully', video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
