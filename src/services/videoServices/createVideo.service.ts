import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { constructImagePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { createVideoModel } from '../../models/videoModels/video.model'
import { ICreateVideo } from '../../types/videoTypes/video.type'

export const createVideoService = async (data: ICreateVideo) => {
  try {
    const { heading, description, file, videoUrl } = data

    const imageUrl = constructImagePath(uploadSubFolder.videoDir, file)
    const video = new createVideoModel({
      heading: heading,
      description: description,
      imagePath: imageUrl,
      videoUrl: videoUrl,
    })

    await video.save()
    return sendSuccessData('Video created successfully', video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
