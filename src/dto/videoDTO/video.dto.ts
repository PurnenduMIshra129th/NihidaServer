import { body } from 'express-validator'

export const createVideoDTO = [
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
  body('videoUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Video URL is required'),
]
