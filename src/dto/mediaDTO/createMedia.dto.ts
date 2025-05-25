import { body } from 'express-validator'

export const createMediaDTO = [
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
  body('time').trim().isString().notEmpty().withMessage('Time is required'),
]
