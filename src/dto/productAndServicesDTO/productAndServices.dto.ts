import { body } from 'express-validator'

export const createProductAndServicesDTO = [
  body('heading')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Heading is required'),
  body('description')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Description is required'),
]
