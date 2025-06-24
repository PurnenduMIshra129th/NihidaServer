import { body } from 'express-validator'

export const updateBlogImageDTO = [
  body('oldImagePath')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Old Image Path is required'),
]
