import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IGetPaymentByID } from '../../types/payment/payment.type'
import Stripe from 'stripe'
import { stripeConfig } from '../../utils/constant'

export const getPaymentByIdService = async (data: IGetPaymentByID) => {
  try {
    const { id = '' } = data
    const stripe = new Stripe(stripeConfig.stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    })
    const paymentIntent = await stripe.paymentIntents.retrieve(id)

    return sendSuccessData('Transaction fetched successful', {
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
