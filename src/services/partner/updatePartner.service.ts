import { partnerModel } from '../../schema/partner/partner.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdatePartner } from '../../types/partner/partner.types'

export const updatePartnerService = async (data: IUpdatePartner) => {
  try {
    const { id, name } = data

    const partner = await partnerModel.findById(id)
    if (!partner) {
      return sendErrorData(404, 'partner not found')
    }

    if (name) partner.name = name

    await partner.save()
    return sendSuccessData('Partner updated successfully', partner)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
