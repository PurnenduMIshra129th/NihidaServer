import { body } from 'express-validator'

export const videoDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('youtubeUrl')
    .notEmpty()
    .withMessage('YouTube URL is required')
    .isURL()
    .withMessage('YouTube URL must be valid'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['testimonial', 'project', 'awareness', 'media', 'event', 'other'])
    .withMessage('Invalid category'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be in ISO 8601 format'),

  body('visibility')
    .notEmpty()
    .withMessage('Visibility is required')
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be either public or internal'),

  body('tags').optional().isArray().withMessage('Tags must be an array'),

  body('tags.*').optional().isString().withMessage('Each tag must be a string'),

  body('highlighted')
    .optional()
    .isBoolean()
    .withMessage('Highlighted must be a boolean'),

  body('uploadedBy')
    .optional()
    .isMongoId()
    .withMessage('uploadedBy must be a valid Mongo ID'),
]
