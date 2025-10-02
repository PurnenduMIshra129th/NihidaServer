import { EmailService } from '../../../config/emailConfig'
import { IPaymentConfirmation } from '../../../types/email/email.type'
import { sendErrorData, sendSuccessData } from '../../../utils/apiResponse'
import { mailConfig } from '../../../utils/constant'
import {
  generatePaymentConfirmationHTML,
  generatePaymentConfirmationText,
} from './paymentConfirmation.template'

export const paymentConfirmationService = async (
  data: IPaymentConfirmation,
) => {
  try {
    const { email, name, paymentId, amount } = data
    const paymentData: IPaymentConfirmation = {
      paymentId,
      amount,
      name,
      email,
    }
    const emailService = new EmailService()
    const isConnected = await emailService.verifyConnection()

    if (!isConnected) {
      return sendErrorData(500, 'SMTP connection failed')
    }
    const mailOptions = {
      from: {
        name: mailConfig.fromName,
        address: mailConfig.emailUser,
      },
      to: email,
      subject: `✅ Payment Confirmation - Order #${paymentData.paymentId}`,
      html: generatePaymentConfirmationHTML(paymentData),
      text: generatePaymentConfirmationText(paymentData),
    }

    const info = await emailService.transporter.sendMail(mailOptions)

    return sendSuccessData('confirmation email sent', {
      success: true,
      messageId: info.messageId,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
