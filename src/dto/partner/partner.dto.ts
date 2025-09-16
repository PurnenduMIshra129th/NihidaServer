import { body } from 'express-validator'

export const partnerDTO = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
]
