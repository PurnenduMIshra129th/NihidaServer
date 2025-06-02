import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'
import { IUpdateVideo } from '../../types/videoTypes/video.type'
import { createVideoModel } from '../../models/videoModels/video.model'

export const updateVideoService = async (data: IUpdateVideo) => {
  try {
    const { id, heading, description, file, videoUrl } = data

    const video = await createVideoModel.findById(id)
    if (!video) {
      return sendErrorData(404, 'Video not found')
    }
    if (heading) video.heading = heading
    if (description) video.description = description
    if (videoUrl) video.videoUrl = videoUrl

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.videoDir,
        video.imagePath,
      )
      deleteFileIfExists(localFilePath)
      video.imagePath = constructImagePath(uploadSubFolder.videoDir, file)
    }

    await video.save()
    return sendSuccessData('Video updated successfully', video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
