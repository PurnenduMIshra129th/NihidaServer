import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { ICreateUpcomingEvent } from '../../types/upcomingEvent/upcomingEvent.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const createUpcomingEventService = async (
  data: ICreateUpcomingEvent,
) => {
  try {
    const {
      title,
      subtitle,
      description,
      fromDate,
      toDate,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    } = data

    const UpcomingEvent = new upcomingEventModel({
      title,
      subtitle,
      description,
      fromDate,
      toDate,
      location,
      tags,
      cta,
      impactGoals,
      contactPerson,
      createdBy,
      status,
    })

    await UpcomingEvent.save()
    return sendSuccessData('UpcomingEvent created successfully', UpcomingEvent)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
