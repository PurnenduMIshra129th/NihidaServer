import { body } from 'express-validator'

export const deleteBlogImageDTO = [
  body('imagePath')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Image Path is required'),
]
