import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'
import { IDeleteFocusActivity } from '../../types/focusActivity/focusActivity.type'
import { focusActivityModel } from '../../schema/focusActivity/focusActivity.schema'
import { deleteFromR2 } from '../../config/cloudfare'
import { enableCloudFareStorage } from '../../utils/constant'

export const deleteFocusActivityService = async (
  data: IDeleteFocusActivity,
) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'FocusActivity ID is required')
    }

    // Find the focusActivity document
    const focusActivity = await focusActivityModel.findById(id)
    if (!focusActivity) {
      return sendErrorData(404, 'FocusActivity not found')
    }

    // Store file path before deletion for cleanup
    const files = focusActivity.files

    // Delete from database first
    await focusActivityModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        if (enableCloudFareStorage == 'false') {
          deleteFileIfExists(path)
        } else {
          deleteFromR2(path)
        }
      }
    }
    return sendSuccessData('FocusActivity deleted successfully', focusActivity)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
