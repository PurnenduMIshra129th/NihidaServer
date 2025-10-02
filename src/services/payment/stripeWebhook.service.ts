import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IStripeWebHook } from '../../types/payment/payment.type'
import Stripe from 'stripe'
import { stripeConfig } from '../../utils/constant'

export const stripeWebHookService = async (data: IStripeWebHook) => {
  try {
    const { sig = '', endpointSecret = '', body } = data
    const stripe = new Stripe(stripeConfig.stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    })
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('Payment succeeded:', paymentIntent.id)
        // Handle successful payment (update database, send email, etc.)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        console.log('Payment failed:', failedPayment.id)
        // Handle failed payment
        break

      default:
        return sendErrorData(500, `Unhandled event type ${event.type}`)
    }

    return sendSuccessData('Transaction successfull', {
      received: true,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
