import { teamMemberModel } from '../../schema/teamMember/teamMember.schema'
import { IDeleteTeamMember } from '../../types/teamMember/teamMember.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteTeamMemberService = async (data: IDeleteTeamMember) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'TeamMember ID is required')
    }

    // Find the teamMember document
    const teamMember = await teamMemberModel.findById(id)
    if (!teamMember) {
      return sendErrorData(404, 'TeamMember not found')
    }

    // Store file path before deletion for cleanup
    const files = teamMember.files

    // Delete from database first
    await teamMemberModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
    }
    return sendSuccessData('TeamMember deleted successfully', teamMember)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
