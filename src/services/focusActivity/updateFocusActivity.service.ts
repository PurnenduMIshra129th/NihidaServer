import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateFocusActivity } from '../../types/focusActivity/focusActivity.type'
import { focusActivityModel } from '../../schema/focusActivity/focusActivity.schema'

export const updateFocusActivityService = async (
  data: IUpdateFocusActivity,
) => {
  try {
    const {
      id,
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    } = data

    const focusActivity = await focusActivityModel.findById(id)
    if (!focusActivity) {
      return sendErrorData(404, 'focusActivity not found')
    }
    if (title) focusActivity.title = title
    if (subtitle) focusActivity.subtitle = subtitle
    if (description) focusActivity.description = description
    if (impactStats) focusActivity.impactStats = impactStats as any
    if (testimonials) focusActivity.testimonials = testimonials as any
    if (location) focusActivity.location = location
    if (date) focusActivity.date = new Date(date)

    await focusActivity.save()
    return sendSuccessData('FocusActivity updated successfully', focusActivity)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
