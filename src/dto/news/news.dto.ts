import { body } from 'express-validator'

export const newsDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('summary').trim().notEmpty().withMessage('Summary is required'),

  body('content').trim().notEmpty().withMessage('Content is required'),

  body('source').optional().isString().withMessage('Source must be a string'),

  body('url').optional().isURL().withMessage('URL must be a valid link'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['press-release', 'impact', 'announcement', 'event', 'other'])
    .withMessage('Invalid category'),

  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be in a valid ISO 8601 format'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('tags.*').optional().isString().withMessage('Each tag must be a string'),

  body('visibility')
    .notEmpty()
    .withMessage('Visibility is required')
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be public or internal'),

  body('createdBy')
    .optional()
    .isMongoId()
    .withMessage('createdBy must be a valid Mongo ID'),
]
