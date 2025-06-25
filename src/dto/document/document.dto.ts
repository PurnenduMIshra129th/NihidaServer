import { body } from 'express-validator'

export const documentDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn([
      'certificate',
      'recognition',
      'legal',
      'media',
      'annual-report',
      'other',
    ])
    .withMessage('Invalid document type'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('issuedBy')
    .optional()
    .isString()
    .withMessage('IssuedBy must be a string'),

  body('issueDate')
    .optional()
    .isISO8601()
    .withMessage('Issue date must be a valid ISO date'),

  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('Expiry date must be a valid ISO date'),

  body('visibility')
    .notEmpty()
    .withMessage('Visibility is required')
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be either public or internal'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('tags.*').optional().isString().withMessage('Each tag must be a string'),

  body('highlighted')
    .optional()
    .isBoolean()
    .withMessage('Highlighted must be a boolean'),

  body('createdBy')
    .optional()
    .isMongoId()
    .withMessage('CreatedBy must be a valid Mongo ID'),
]
