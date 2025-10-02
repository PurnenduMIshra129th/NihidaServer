import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdatePaymentByID } from '../../types/payment/payment.type'
import { paymentModel } from '../../schema/payment/payment.schema'

export const updatePaymentService = async (data: IUpdatePaymentByID) => {
  try {
    const { id, status } = data

    const payment = await paymentModel.findById(id)
    if (!payment) {
      return sendErrorData(404, 'payment not found')
    }
    if (status) payment.status = status

    await payment.save()
    return sendSuccessData(
      'Payment status updated successfully',
      payment.status,
    )
  } catch (error) {
    return sendErrorData(500, error)
  }
}
