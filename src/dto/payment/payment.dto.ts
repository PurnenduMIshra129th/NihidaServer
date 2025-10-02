import { body } from 'express-validator'

export const createPaymentDTO = [
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('currency')
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter ISO code'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Email must be a valid email'),
  body('message').isString().optional().withMessage('Message must be a string'),
  body('billingName').isString().withMessage('Billing name must be a string'),
  body('billingAddress')
    .isString()
    .withMessage('Billing address must be a string'),
  body('city').isString().withMessage('City must be a string'),
  body('state').isString().withMessage('State must be a string'),
  body('postalCode').isString().withMessage('Postal code must be a string'),
  body('country').isString().withMessage('Country must be a string'),
]
export const updatePaymentDTO = [
  body('status')
    .isString()
    .withMessage('Status must be a string')
    .isIn([
      'requires_payment_method',
      'requires_confirmation',
      'requires_action',
      'processing',
      'requires_capture',
      'canceled',
      'succeeded',
    ])
    .withMessage(
      'Status must be one of the following: requires_payment_method, requires_confirmation, requires_action, processing, requires_capture, canceled, succeeded',
    ),
]
