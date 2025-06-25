import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { videoModel } from '../../schema/video/video.schema'
import { IUpdateVideo } from '../../types/video/video.type'
import mongoose from 'mongoose'

export const updateVideoService = async (data: IUpdateVideo) => {
  try {
    const {
      id,
      title,
      description,
      category,
      date,
      visibility,
      tags,
      highlighted,
      uploadedBy,
    } = data

    const video = await videoModel.findById(id)
    if (!video) {
      return sendErrorData(404, 'video not found')
    }
    if (title) video.title = title
    if (description) video.description = description
    if (category) video.category = category
    if (date) video.date = new Date(date)
    if (visibility) video.visibility = visibility
    if (tags) video.tags = tags
    if (highlighted) video.highlighted = highlighted
    if (uploadedBy) video.uploadedBy = new mongoose.Types.ObjectId(uploadedBy)

    await video.save()
    return sendSuccessData('Video updated successfully', video)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
