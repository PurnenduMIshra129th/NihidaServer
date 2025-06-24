import { body } from 'express-validator'

export const upcomingEventDTO = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('description').trim().notEmpty().withMessage('Description is required'),

  body('date')
    .notEmpty()
    .withMessage('Event date is required')
    .isISO8601()
    .withMessage('Invalid date format'),

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
    .optional()
    .isString()
    .withMessage('CTA label must be a string'),

  body('cta.url').optional().isURL().withMessage('CTA URL must be a valid URL'),

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
