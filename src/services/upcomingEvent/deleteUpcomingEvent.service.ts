import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { IDeleteUpcomingEvent } from '../../types/upcomingEvent/upcomingEvent.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteUpcomingEventService = async (
  data: IDeleteUpcomingEvent,
) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'UpcomingEvent ID is required')
    }

    // Find the upcomingEvent document
    const upcomingEvent = await upcomingEventModel.findById(id)
    if (!upcomingEvent) {
      return sendErrorData(404, 'UpcomingEvent not found')
    }

    // Store file path before deletion for cleanup
    const files = upcomingEvent.files

    // Delete from database first
    await upcomingEventModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
    }
    return sendSuccessData('UpcomingEvent deleted successfully', upcomingEvent)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
