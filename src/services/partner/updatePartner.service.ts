import mongoose from 'mongoose'
import { partnerModel } from '../../schema/partner/partner.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdatePartner } from '../../types/partner/partner.types'

export const updatePartnerService = async (data: IUpdatePartner) => {
  try {
    const {
      id,
      name,
      description,
      website,
      type,
      focusAreas,
      visibility,
      contactPerson,
      partnershipStart,
      partnershipEnd,
      tags,
      createdBy,
    } = data

    const partner = await partnerModel.findById(id)
    if (!partner) {
      return sendErrorData(404, 'partner not found')
    }

    if (name) partner.name = name
    if (description) partner.description = description
    if (website) partner.website = website
    if (type) partner.type = type
    if (focusAreas) partner.focusAreas = focusAreas
    if (contactPerson) partner.contactPerson = contactPerson
    if (partnershipStart) partner.partnershipStart = new Date(partnershipStart)
    if (partnershipEnd) partner.partnershipEnd = new Date(partnershipEnd)
    if (tags) partner.tags = tags
    if (visibility) partner.visibility = visibility
    if (createdBy) partner.createdBy = new mongoose.Types.ObjectId(createdBy)

    await partner.save()
    return sendSuccessData('Partner updated successfully', partner)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
