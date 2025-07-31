import { body } from 'express-validator'

export const teamMemberDTO = [
  body('name').trim().notEmpty().withMessage('Name is required'),

  body('designation').trim().notEmpty().withMessage('Designation is required'),

  body('bio').trim().notEmpty().withMessage('Bio is required'),

  body('contact.email').optional().isEmail().withMessage('Email must be valid'),

  body('contact.phone')
    .optional()
    .isString()
    .withMessage('Phone number must be a string'),

  body('socials.linkedin')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('LinkedIn URL must be valid'),

  body('socials.twitter')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Twitter URL must be valid'),

  body('focusArea')
    .notEmpty()
    .isIn(['education', 'health', 'environment', 'livelihood', 'other'])
    .withMessage('Invalid focus area'),

  body('dateJoined')
    .notEmpty()
    .isISO8601()
    .withMessage('Date joined must be a valid date'),

  body('tags').optional().isArray().withMessage('Tags must be an array'),

  body('visibility')
    .notEmpty()
    .isIn(['public', 'internal'])
    .withMessage('Visibility must be public or internal'),

  body('createdBy').optional().isMongoId().withMessage('Invalid createdBy ID'),
]
