import nodemailer from 'nodemailer'
import { mailConfig } from '../utils/constant'
require('dotenv').config()

interface EmailProviderConfigs {
  [key: string]: {
    service?: string
    host?: string
    port?: number
    secure?: boolean
    auth?: {
      user: string
      pass: string
    }
  }
}
export class EmailService {
  transporter: any
  constructor() {
    this.transporter = this.createTransporter()
  }

  createTransporter() {
    const emailProvider = mailConfig.emailProvider || 'gmail'

    const configs: EmailProviderConfigs = {
      gmail: {
        service: 'gmail',
        auth: {
          user: mailConfig.emailUser,
          pass: mailConfig.emailAppPassword,
        },
      },
      outlook: {
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: mailConfig.emailUser,
          pass: mailConfig.emailAppPassword,
        },
      },
      yahoo: {
        service: 'yahoo',
        auth: {
          user: mailConfig.emailUser,
          pass: mailConfig.emailAppPassword,
        },
      },
      brevo: {
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
          user: mailConfig.emailUser,
          pass: mailConfig.emailAppPassword,
        },
      },
      custom: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: mailConfig.emailUser,
          pass: mailConfig.emailAppPassword,
        },
      },
    }

    return nodemailer.createTransport(configs[emailProvider])
  }

  // Verify SMTP connection
  async verifyConnection() {
    try {
      await this.transporter.verify()
      console.log('SMTP connection verified successfully')
      return true
    } catch (error) {
      console.error('SMTP connection failed:', error)
      return false
    }
  }
  // // Send payment receipt
  // async sendPaymentReceipt(paymentData) {
  //   try {
  //     const mailOptions = {
  //       from: {
  //         name: process.env.FROM_NAME || 'Your Business Name',
  //         address: process.env.EMAIL_USER,
  //       },
  //       to: paymentData.customerEmail,
  //       subject: `🧾 Payment Receipt - #${paymentData.paymentId}`,
  //       html: this.generateReceiptHTML(paymentData),
  //       text: this.generateReceiptText(paymentData),
  //     }

  //     const info = await this.transporter.sendMail(mailOptions)
  //     console.log('✅ Receipt email sent:', info.messageId)
  //     return { success: true, messageId: info.messageId }
  //   } catch (error) {
  //     console.error('❌ Receipt email failed:', error)
  //     return { success: false, error: error.message }
  //   }
  // }

  // // Send welcome email
  // async sendWelcomeEmail(userData) {
  //   try {
  //     const mailOptions = {
  //       from: {
  //         name: process.env.FROM_NAME || 'Your Business Name',
  //         address: process.env.EMAIL_USER,
  //       },
  //       to: userData.email,
  //       subject: `🎉 Welcome to ${process.env.BUSINESS_NAME || 'Our Platform'}!`,
  //       html: this.generateWelcomeHTML(userData),
  //       text: this.generateWelcomeText(userData),
  //     }

  //     const info = await this.transporter.sendMail(mailOptions)
  //     console.log('✅ Welcome email sent:', info.messageId)
  //     return { success: true, messageId: info.messageId }
  //   } catch (error) {
  //     console.error('❌ Welcome email failed:', error)
  //     return { success: false, error: error.message }
  //   }
  // }

  // // Send contact form email
  // async sendContactFormEmail(formData) {
  //   try {
  //     const mailOptions = {
  //       from: {
  //         name: formData.name,
  //         address: process.env.EMAIL_USER,
  //       },
  //       to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
  //       replyTo: formData.email,
  //       subject: `📧 Contact Form: ${formData.subject}`,
  //       html: this.generateContactHTML(formData),
  //       text: `
  //         New contact form submission:

  //         Name: ${formData.name}
  //         Email: ${formData.email}
  //         Subject: ${formData.subject}
  //         Message: ${formData.message}
  //       `,
  //     }

  //     const info = await this.transporter.sendMail(mailOptions)
  //     console.log('✅ Contact form email sent:', info.messageId)
  //     return { success: true, messageId: info.messageId }
  //   } catch (error) {
  //     console.error('❌ Contact form email failed:', error)
  //     return { success: false, error: error.message }
  //   }
  // }

  // // Send password reset email
  // async sendPasswordResetEmail(userData, resetToken) {
  //   try {
  //     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  //     const mailOptions = {
  //       from: {
  //         name: process.env.FROM_NAME || 'Your Business Name',
  //         address: process.env.EMAIL_USER,
  //       },
  //       to: userData.email,
  //       subject: '🔐 Password Reset Request',
  //       html: `
  //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  //           <h2 style="color: #3b82f6;">Password Reset Request</h2>
  //           <p>Hello ${userData.name || 'User'},</p>
  //           <p>You requested a password reset for your account. Click the button below to reset your password:</p>
  //           <div style="text-align: center; margin: 30px 0;">
  //             <a href="${resetUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
  //           </div>
  //           <p>This link will expire in 1 hour for security reasons.</p>
  //           <p>If you didn't request this reset, please ignore this email.</p>
  //           <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
  //           <p style="color: #6b7280; font-size: 12px;">This email was sent by ${process.env.BUSINESS_NAME || 'Your Business'}</p>
  //         </div>
  //       `,
  //       text: `
  //         Password Reset Request

  //         Hello ${userData.name || 'User'},

  //         You requested a password reset. Please visit this link to reset your password:
  //         ${resetUrl}

  //         This link expires in 1 hour.

  //         If you didn't request this reset, please ignore this email.
  //       `,
  //     }

  //     const info = await this.transporter.sendMail(mailOptions)
  //     console.log('✅ Password reset email sent:', info.messageId)
  //     return { success: true, messageId: info.messageId }
  //   } catch (error) {
  //     console.error('❌ Password reset email failed:', error)
  //     return { success: false, error: error.message }
  //   }
  // }

  // // ==========================================
  // // HTML TEMPLATE GENERATORS
  // // ==========================================

  // generateReceiptHTML(paymentData) {
  //   return `
  //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  //       <div style="border: 2px solid #e5e7eb; padding: 30px; border-radius: 8px;">
  //         <div style="text-align: center; margin-bottom: 30px;">
  //           <h1 style="margin: 0; color: #374151;">🧾 Payment Receipt</h1>
  //           <p style="color: #6b7280;">Official receipt for your payment</p>
  //         </div>

  //         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  //           <tr style="background: #f9fafb;">
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold;">Receipt #:</td>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb;">${paymentData.paymentId}</td>
  //           </tr>
  //           <tr>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold;">Date:</td>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb;">${new Date().toLocaleString()}</td>
  //           </tr>
  //           <tr style="background: #f9fafb;">
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold;">Amount:</td>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold; color: #10b981;">$${paymentData.amount}</td>
  //           </tr>
  //           <tr>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; font-weight: bold;">Status:</td>
  //             <td style="padding: 15px; border: 1px solid #e5e7eb; color: #10b981;">✅ Completed</td>
  //           </tr>
  //         </table>

  //         <p style="text-align: center; color: #6b7280; margin-top: 30px;">
  //           Keep this receipt for your records
  //         </p>
  //       </div>
  //     </div>
  //   `
  // }

  // generateWelcomeHTML(userData) {
  //   return `
  //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  //       <div style="background: white; padding: 30px; border-radius: 8px;">
  //         <div style="text-align: center; margin-bottom: 30px;">
  //           <h1 style="color: #3b82f6; margin: 0;">🎉 Welcome!</h1>
  //           <p style="font-size: 18px; color: #374151;">Hello ${userData.name}!</p>
  //         </div>

  //         <p>Thank you for joining ${process.env.BUSINESS_NAME || 'our platform'}! We're excited to have you on board.</p>

  //         <div style="background: #eff6ff; padding: 20px; border-radius: 6px; margin: 20px 0;">
  //           <h3 style="margin-top: 0; color: #1d4ed8;">🚀 Getting Started:</h3>
  //           <ul style="color: #374151; line-height: 1.6;">
  //             <li>Explore our features and services</li>
  //             <li>Complete your profile for better experience</li>
  //             <li>Browse our products and make your first purchase</li>
  //             <li>Join our community and connect with others</li>
  //           </ul>
  //         </div>

  //         <div style="text-align: center; margin: 30px 0;">
  //           <a href="${process.env.FRONTEND_URL}/dashboard" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get Started</a>
  //         </div>

  //         <p>If you have any questions or need help, don't hesitate to reach out to our support team!</p>

  //         <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
  //         <p style="color: #6b7280; font-size: 12px; text-align: center;">
  //           Welcome aboard! 🚀
  //         </p>
  //       </div>
  //     </div>
  //   `
  // }

  // generateContactHTML(formData) {
  //   return `
  //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  //       <h2 style="color: #374151;">📧 New Contact Form Submission</h2>

  //       <div style="background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
  //         <p><strong>Name:</strong> ${formData.name}</p>
  //         <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
  //         <p><strong>Subject:</strong> ${formData.subject}</p>
  //       </div>

  //       <div style="background: white; border: 1px solid #e5e7eb; padding: 20px; border-radius: 6px;">
  //         <h3 style="margin-top: 0;">Message:</h3>
  //         <p style="line-height: 1.6; color: #374151;">${formData.message}</p>
  //       </div>

  //       <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
  //         Received: ${new Date().toLocaleString()}
  //       </p>
  //     </div>
  //   `
  // }

  // // ==========================================
  // // TEXT TEMPLATE GENERATORS (for email clients that don't support HTML)
  // // ==========================================

  // generateReceiptText(paymentData) {
  //   return `
  //     PAYMENT RECEIPT

  //     Receipt #: ${paymentData.paymentId}
  //     Date: ${new Date().toLocaleString()}
  //     Amount: $${paymentData.amount}
  //     Status: Completed

  //     Keep this receipt for your records.
  //   `
  // }

  // generateWelcomeText(userData) {
  //   return `
  //     Welcome to ${process.env.BUSINESS_NAME || 'our platform'}!

  //     Hello ${userData.name}!

  //     Thank you for joining us. We're excited to have you on board.

  //     Getting Started:
  //     - Explore our features and services
  //     - Complete your profile
  //     - Browse our products
  //     - Join our community

  //     If you need any help, contact our support team.

  //     Welcome aboard!
  //   `
  // }
}
