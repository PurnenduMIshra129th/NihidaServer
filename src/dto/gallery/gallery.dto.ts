import { body } from 'express-validator'

export const galleryDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['event', 'impact', 'volunteer', 'daily-life', 'community', 'other'])
    .withMessage('Invalid category'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO format'),

  body('visibility')
    .notEmpty()
    .withMessage('Visibility is required')
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be public or internal'),

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
