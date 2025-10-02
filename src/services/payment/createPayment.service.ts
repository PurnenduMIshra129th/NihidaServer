import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreatePayment } from '../../types/payment/payment.type'
import Stripe from 'stripe'
import { stripeConfig } from '../../utils/constant'
import { paymentModel } from '../../schema/payment/payment.schema'
import { database } from 'firebase-admin'

export const createPaymentService = async (data: ICreatePayment) => {
  try {
    const {
      metadata,
      currency,
      amount,
      name,
      email,
      message,
      billingName,
      billingAddress,
      city,
      state,
      postalCode,
      country,
    } = data
    const stripe = new Stripe(stripeConfig.stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || 'usd',
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    })

    const payment = new paymentModel({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      metadata: paymentIntent.metadata,
      status: paymentIntent.status,
      name,
      email,
      message,
      billingName,
      billingAddress,
      city,
      state,
      postalCode,
      country,
    })

    await payment.save()
    return sendSuccessData('Transaction initiated successfully', {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      databaseId: payment._id,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
