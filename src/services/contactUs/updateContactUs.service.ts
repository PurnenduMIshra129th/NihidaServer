import mongoose from 'mongoose'
import { contactUsModel } from '../../schema/contactUs/contactUs.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateContactUs } from '../../types/contactUs/contactUs.type'

export const updateContactUsService = async (data: IUpdateContactUs) => {
  try {
    const {
      id,
      fullName,
      email,
      phone,
      message,
      subject,
      type,
      responded,
      createdBy,
    } = data

    const contactUs = await contactUsModel.findById(id)
    if (!contactUs) {
      return sendErrorData(404, 'contactUs not found')
    }

    if (fullName) contactUs.fullName = fullName
    if (email) contactUs.email = email
    if (phone) contactUs.phone = phone
    if (message) contactUs.message = message
    if (subject) contactUs.subject = subject
    if (type) contactUs.type = type
    if (responded != undefined && responded != null)
      contactUs.responded = responded
    if (createdBy) contactUs.createdBy = new mongoose.Types.ObjectId(createdBy)

    await contactUs.save()
    return sendSuccessData('ContactUs updated successfully', contactUs)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
