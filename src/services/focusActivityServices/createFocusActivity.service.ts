import { focusActivityModel } from '../../schema/focusActivitySchema/focusActivity.schema'
import { ICreateFocusActivity } from '../../types/focusActivityTypes/focusActivity.types'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const createFocusActivityService = async (
  data: ICreateFocusActivity,
) => {
  try {
    const {
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    } = data

    const FocusActivity = new focusActivityModel({
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      date,
    })

    await FocusActivity.save()
    return sendSuccessData('FocusActivity created successfully', FocusActivity)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
