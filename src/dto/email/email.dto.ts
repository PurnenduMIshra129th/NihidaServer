import { body } from 'express-validator'

export const paymentConfirmationDTO = [
  body('email').trim().notEmpty().withMessage('Email is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('paymentId').trim().notEmpty().withMessage('Payment ID is required'),
  body('amount').trim().notEmpty().withMessage('Amount is required'),
]
