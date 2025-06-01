import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { constructImagePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { ICreateProductAndService } from '../../types/productAndServiceTypes/productAndService.type'
import { createProductAndServiceModel } from '../../models/productAndServiceModels/productAndService.model'

export const createProductAndService = async (
  data: ICreateProductAndService,
) => {
  try {
    const { heading, description, file } = data

    const imageUrl = constructImagePath(
      uploadSubFolder.productAndServiceDir,
      file,
    )
    const productAndService = new createProductAndServiceModel({
      heading: heading,
      description: description,
      imagePath: imageUrl,
    })

    await productAndService.save()
    return sendSuccessData(
      'ProductAndService created successfully',
      productAndService,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
