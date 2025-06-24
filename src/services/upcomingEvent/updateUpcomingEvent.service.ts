import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { IUpdateUpcomingEvent } from '../../types/upcomingEvent/upcomingEvent.types'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const updateUpcomingEventService = async (
  data: IUpdateUpcomingEvent,
) => {
  try {
    const {
      id,
      title,
      subtitle,
      description,
      date,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      status,
    } = data

    const upcomingEvent = await upcomingEventModel.findById(id)
    if (!upcomingEvent) {
      return sendErrorData(404, 'upcomingEvent not found')
    }
    if (title) upcomingEvent.title = title
    if (subtitle) upcomingEvent.subtitle = subtitle
    if (description) upcomingEvent.description = description
    if (tags) upcomingEvent.tags = tags
    if (cta) upcomingEvent.cta = cta
    if (impactGoals) upcomingEvent.impactGoals = impactGoals
    if (contactPerson) upcomingEvent.contactPerson = contactPerson
    if (status) upcomingEvent.status = status
    if (location) upcomingEvent.location = location
    if (date) upcomingEvent.date = new Date(date)

    await upcomingEvent.save()
    return sendSuccessData('UpcomingEvent updated successfully', upcomingEvent)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
