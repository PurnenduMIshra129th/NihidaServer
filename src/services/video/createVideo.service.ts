import { videoModel } from '../../schema/video/video.schema'
import { ICreateVideo } from '../../types/video/video.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const createVideoService = async (data: ICreateVideo) => {
  try {
    const {
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = data

    const Video = new videoModel({
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    })

    await Video.save()
    return sendSuccessData('Video created successfully', Video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
