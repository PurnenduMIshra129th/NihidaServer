import { partnerModel } from '../../schema/partner/partner.schema'
import { IDeletePartner } from '../../types/partner/partner.types'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'

export const deletePartnerService = async (data: IDeletePartner) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Partner ID is required')
    }

    // Find the partner document
    const partner = await partnerModel.findById(id)
    if (!partner) {
      return sendErrorData(404, 'Partner not found')
    }

    // Store file path before deletion for cleanup
    const files = partner.files

    // Delete from database first
    await partnerModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
    }
    return sendSuccessData('Partner deleted successfully', partner)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
