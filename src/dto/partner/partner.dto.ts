import { body } from 'express-validator'

export const partnerDTO = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('website')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Website must be a valid URL'),

  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['funder', 'collaborator', 'institutional', 'community', 'strategic'])
    .withMessage('Invalid partner type'),

  body('focusAreas')
    .optional()
    .isArray()
    .withMessage('Focus areas must be an array of strings'),

  body('focusAreas.*')
    .optional()
    .isString()
    .withMessage('Each focus area must be a string'),

  body('visibility')
    .optional()
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be either public or internal'),

  body('contactPerson')
    .optional()
    .isObject()
    .withMessage('Contact person must be an object'),

  body('contactPerson.name')
    .optional()
    .isString()
    .withMessage('Contact name must be a string'),

  body('contactPerson.email')
    .optional()
    .isEmail()
    .withMessage('Contact email must be valid'),

  body('contactPerson.phone')
    .optional()
    .isString()
    .withMessage('Contact phone must be a string'),

  body('partnershipStart')
    .optional()
    .isISO8601()
    .withMessage('Partnership start must be a valid date'),

  body('partnershipEnd')
    .optional()
    .isISO8601()
    .withMessage('Partnership end must be a valid date'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array of strings'),

  body('tags.*').optional().isString().withMessage('Each tag must be a string'),

  body('createdBy').optional().isMongoId().withMessage('Invalid createdBy ID'),
]
