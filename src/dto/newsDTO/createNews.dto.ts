import { body } from 'express-validator'

export const createNewsDTO = [
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
