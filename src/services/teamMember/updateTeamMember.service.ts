import mongoose from 'mongoose'
import { teamMemberModel } from '../../schema/teamMember/teamMember.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateTeamMember } from '../../types/teamMember/teamMember.type'

export const updateTeamMemberService = async (data: IUpdateTeamMember) => {
  try {
    const {
      id,
      name,
      designation,
      bio,
      contact,
      socials,
      focusArea,
      dateJoined,
      tags,
      visibility,
      createdBy,
    } = data

    const teamMember = await teamMemberModel.findById(id)
    if (!teamMember) {
      return sendErrorData(404, 'teamMember not found')
    }

    if (name) teamMember.name = name
    if (designation) teamMember.designation = designation
    if (bio) teamMember.bio = bio
    if (contact) teamMember.contact = contact
    if (socials) teamMember.socials = socials
    if (focusArea) teamMember.focusArea = focusArea
    if (dateJoined) teamMember.dateJoined = new Date(dateJoined)
    if (tags) teamMember.tags = tags
    if (visibility) teamMember.visibility = visibility
    if (createdBy) teamMember.createdBy = new mongoose.Types.ObjectId(createdBy)

    await teamMember.save()
    return sendSuccessData('TeamMember updated successfully', teamMember)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
