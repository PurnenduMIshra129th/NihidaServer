import { body } from 'express-validator'

export const updateFocusActivityImageDTO = [
  body('oldImagePath')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Old Image Path is required'),
]
