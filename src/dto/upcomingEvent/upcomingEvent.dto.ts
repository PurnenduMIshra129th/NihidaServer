import { body } from 'express-validator'

export const upcomingEventDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('description').trim().notEmpty().withMessage('Description is required'),

  body('fromDate')
    .notEmpty()
    .withMessage('From date is required')
    .isISO8601()
    .withMessage('From date must be a valid ISO date'),

  body('toDate')
    .notEmpty()
    .withMessage('To date is required')
    .isISO8601()
    .withMessage('To date must be a valid ISO date'),

  body('location').trim().notEmpty().withMessage('Location is required'),

  body('subtitle')
    .optional()
    .isString()
    .withMessage('Subtitle must be a string'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('tags.*').optional().isString().withMessage('Each tag must be a string'),

  body('cta.label')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('CTA label must be a string'),

  body('cta.url')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('CTA URL must be a valid URL'),

  body('impactGoals')
    .optional()
    .isArray()
    .withMessage('Impact goals must be an array'),

  body('impactGoals.*')
    .optional()
    .isString()
    .withMessage('Each impact goal must be a string'),

  body('contactPerson.name')
    .optional()
    .isString()
    .withMessage('Contact name must be a string'),

  body('contactPerson.phone')
    .optional()
    .isString()
    .withMessage('Contact phone must be a string'),

  body('contactPerson.email')
    .optional()
    .isEmail()
    .withMessage('Contact email must be valid'),

  body('status')
    .optional()
    .isIn(['upcoming', 'ongoing', 'closed'])
    .withMessage('Status must be one of: upcoming, ongoing, closed'),
]
