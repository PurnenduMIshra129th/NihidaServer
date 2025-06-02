import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateCarousal } from '../../types/carousalTypes/carousal.type'
import { constructImagePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { createCarousalModel } from '../../models/carousalModels/carousal.model'

export const createCarousalService = async (data: ICreateCarousal) => {
  try {
    const { file } = data

    const imageUrl = constructImagePath(uploadSubFolder.carousalDir, file)
    const carousal = new createCarousalModel({
      imagePath: imageUrl,
    })

    await carousal.save()
    return sendSuccessData('Carousal created successfully', carousal)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
