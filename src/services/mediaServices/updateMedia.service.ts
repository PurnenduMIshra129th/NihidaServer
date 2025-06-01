import { createMediaModel } from '../../models/mediaModels/createMedia.model'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { IUpdateMedia } from '../../types/mediaTypes/media.type'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'

export const updateMediaService = async (data: IUpdateMedia) => {
  try {
    const { id, heading, description, file } = data

    const media = await createMediaModel.findById(id)
    if (!media) {
      return sendErrorData(404, 'Media not found')
    }
    if (heading) media.heading = heading
    if (description) media.description = description

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.mediaDir,
        media.imagePath,
      )
      deleteFileIfExists(localFilePath)
      media.imagePath = constructImagePath(uploadSubFolder.mediaDir, file)
    }

    await media.save()
    return sendSuccessData('Media updated successfully', media)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
