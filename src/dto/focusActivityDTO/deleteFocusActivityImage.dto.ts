import { body } from 'express-validator'

export const deleteFocusActivityImageDTO = [
  body('imagePath')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Image Path is required'),
]
