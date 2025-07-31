import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateTeamMember } from '../../types/teamMember/teamMember.type'
import { teamMemberModel } from '../../schema/teamMember/teamMember.schema'

export const createTeamMemberService = async (data: ICreateTeamMember) => {
  try {
    const {
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

    const teamMember = new teamMemberModel({
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
    })

    await teamMember.save()
    return sendSuccessData('TeamMember created successfully', teamMember)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
