import { contactUsModel } from '../../schema/contactUs/contactUs.schema'
import { IDeleteContactUs } from '../../types/contactUs/contactUs.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const deleteContactUsService = async (data: IDeleteContactUs) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'ContactUs ID is required')
    }

    // Find the contactUs document
    const contactUs = await contactUsModel.findById(id)
    if (!contactUs) {
      return sendErrorData(404, 'ContactUs not found')
    }

    // Delete from database first
    await contactUsModel.findByIdAndDelete(id)
    return sendSuccessData('ContactUs deleted successfully', contactUs)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
