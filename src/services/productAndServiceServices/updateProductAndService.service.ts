import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'
import { IUpdateProductAndService } from '../../types/productAndServiceTypes/productAndService.type'
import { createProductAndServiceModel } from '../../models/productAndServiceModels/productAndService.model'

export const updateProductAndService = async (
  data: IUpdateProductAndService,
) => {
  try {
    const { id, heading, description, file } = data

    const productAndService = await createProductAndServiceModel.findById(id)
    if (!productAndService) {
      return sendErrorData(404, 'ProductAndService not found')
    }
    if (heading) productAndService.heading = heading
    if (description) productAndService.description = description

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.productAndServiceDir,
        productAndService.imagePath,
      )
      deleteFileIfExists(localFilePath)
      productAndService.imagePath = constructImagePath(
        uploadSubFolder.productAndServiceDir,
        file,
      )
    }

    await productAndService.save()
    return sendSuccessData(
      'ProductAndService updated successfully',
      productAndService,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
