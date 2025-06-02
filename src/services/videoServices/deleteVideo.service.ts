import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { createVideoModel } from '../../models/videoModels/video.model'
import { IDeleteVideo } from '../../types/videoTypes/video.type'

export const deleteVideoService = async (data: IDeleteVideo) => {
  try {
    const { id } = data

    if (!id) {
      return sendErrorData(400, 'Video ID is required')
    }

    const Video = await createVideoModel.findById(id)
    if (!Video) {
      return sendErrorData(404, 'Video not found')
    }

    const imagePath = Video.imagePath

    await createVideoModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.videoDir,
        imagePath,
      )
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData('Video deleted successfully', Video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
