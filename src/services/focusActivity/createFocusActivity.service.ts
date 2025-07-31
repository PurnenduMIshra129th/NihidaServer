import { focusActivityModel } from '../../schema/focusActivity/focusActivity.schema'
import { ICreateFocusActivity } from '../../types/focusActivity/focusActivity.type'
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
      fromDate,
      toDate,
    } = data

    const FocusActivity = new focusActivityModel({
      title,
      subtitle,
      description,
      impactStats,
      testimonials,
      location,
      fromDate,
      toDate,
    })

    await FocusActivity.save()
    return sendSuccessData('FocusActivity created successfully', FocusActivity)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
