import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateContactUs } from '../../types/contactUs/contactUs.type'
import { contactUsModel } from '../../schema/contactUs/contactUs.schema'

export const createContactUsService = async (data: ICreateContactUs) => {
  try {
    const {
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    } = data

    const contactUs = new contactUsModel({
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    })

    await contactUs.save()
    return sendSuccessData('ContactUs created successfully', contactUs)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
