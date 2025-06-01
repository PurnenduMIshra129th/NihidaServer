import { createMediaModel } from '../../models/mediaModels/createMedia.model'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateMedia } from '../../types/mediaTypes/media.type'
import { constructImagePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'

export const createMediaService = async (data: ICreateMedia) => {
  try {
    const { heading, description, file } = data

    const imageUrl = constructImagePath(uploadSubFolder.mediaDir, file)
    const media = new createMediaModel({
      heading: heading,
      description: description,
      imagePath: imageUrl,
    })

    await media.save()
    return sendSuccessData('Media created successfully', media)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
