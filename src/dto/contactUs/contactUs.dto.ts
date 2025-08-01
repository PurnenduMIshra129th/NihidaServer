import { body } from 'express-validator'

export const contactUsDTO = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),

  body('email').isEmail().withMessage('Valid email is required'),

  body('phone')
    .optional()
    .isString()
    .withMessage('Phone number must be a string'),

  body('message').notEmpty().withMessage('Message is required'),

  body('subject').optional().isString(),

  body('type')
    .optional()
    .isIn(['volunteer', 'donation', 'partnership', 'general', 'feedback'])
    .withMessage('Type must be one of the predefined values'),

  body('responded')
    .optional()
    .isBoolean()
    .withMessage('Responded must be a boolean'),

  body('createdBy')
    .optional()
    .isMongoId()
    .withMessage('createdBy must be a valid MongoDB ID'),
]
