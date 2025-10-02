import { IPaymentConfirmation } from '../../../types/email/email.type'
import { EnvKey } from '../../../types/utils/utils.type'
import { currentEnv } from '../../../utils/constant'
import { getEnvValue } from '../../../utils/utils'

export function generatePaymentConfirmationHTML(
  paymentData: IPaymentConfirmation,
) {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin: 0;">✅ Payment Successful!</h1>
            <p style="color: #6b7280; margin: 10px 0;">Thank you for your purchase</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Order ID:</strong></td><td style="text-align: right; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${paymentData.paymentId}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Payment ID:</strong></td><td style="text-align: right; padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${paymentData.paymentId}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Amount:</strong></td><td style="text-align: right; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #10b981; font-weight: bold;">$${paymentData.amount}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Date:</strong></td><td style="text-align: right; padding: 8px 0;">${new Date().toLocaleDateString()}</td></tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Your order is being processed and you'll receive updates via email.</p>
            <div style="margin: 20px 0;">
              <a href="${getEnvValue(currentEnv as EnvKey, 'corsEndpoints')}/orders/${paymentData.paymentId}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Track Your Order</a>
            </div>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            Questions? Contact us at ${process.env.CONTACT_EMAIL || process.env.EMAIL_USER}
          </p>
        </div>
      </div>
    `
}

export function generatePaymentConfirmationText(
  paymentData: IPaymentConfirmation,
) {
  return `
      PAYMENT SUCCESSFUL!
      
      Thank you for your purchase. Your payment has been processed successfully.
      
      ORDER DETAILS:
      Order ID: ${paymentData.paymentId}
      Payment ID: ${paymentData.paymentId}
      Amount: $${paymentData.amount}
      Date: ${new Date().toLocaleDateString()}
      
      Your order is being processed and you'll receive updates via email.
      
      Questions? Contact us at ${process.env.CONTACT_EMAIL || process.env.EMAIL_USER}
    `
}
