import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { IUpdateCarousal } from '../../types/carousalTypes/carousal.type'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'
import { createCarousalModel } from '../../models/carousalModels/carousal.model'

export const updateCarousalService = async (data: IUpdateCarousal) => {
  try {
    const { id, file } = data

    const carousal = await createCarousalModel.findById(id)
    if (!carousal) {
      return sendErrorData(404, 'Carousal not found')
    }

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.carousalDir,
        carousal.imagePath,
      )
      deleteFileIfExists(localFilePath)
      carousal.imagePath = constructImagePath(uploadSubFolder.carousalDir, file)
    }

    await carousal.save()
    return sendSuccessData('Carousal updated successfully', carousal)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
