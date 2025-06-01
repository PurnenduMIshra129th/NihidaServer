import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { IDeleteProductAndService } from '../../types/productAndServiceTypes/productAndService.type'
import { createProductAndServiceModel } from '../../models/productAndServiceModels/productAndService.model'

export const deleteProductAndService = async (
  data: IDeleteProductAndService,
) => {
  try {
    const { id } = data

    if (!id) {
      return sendErrorData(400, 'ProductAndService ID is required')
    }

    const ProductAndService = await createProductAndServiceModel.findById(id)
    if (!ProductAndService) {
      return sendErrorData(404, 'ProductAndService not found')
    }

    const imagePath = ProductAndService.imagePath

    await createProductAndServiceModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.productAndServiceDir,
        imagePath,
      )
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData(
      'ProductAndService deleted successfully',
      ProductAndService,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
