import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { partnerModel } from '../../schema/partner/partner.schema'
import { ICreatePartner } from '../../types/partner/partner.types'

export const createPartnerService = async (data: ICreatePartner) => {
  try {
    const { name } = data

    const partner = new partnerModel({
      name,
    })

    await partner.save()
    return sendSuccessData('Partner created successfully', partner)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
