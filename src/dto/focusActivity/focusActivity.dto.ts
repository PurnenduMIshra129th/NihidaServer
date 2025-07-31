import { body } from 'express-validator'

export const focusActivityDTO = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),

  body('subtitle')
    .notEmpty()
    .withMessage('Subtitle is required')
    .isString()
    .withMessage('Subtitle must be a string'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),

  body('impactStats')
    .isArray({ min: 1 })
    .withMessage('At least one impact stat is required'),

  body('impactStats.*.label')
    .notEmpty()
    .withMessage('Impact stat label is required')
    .isString(),

  body('impactStats.*.value')
    .isNumeric()
    .withMessage('Impact stat value must be numeric'),

  body('impactStats.*.unit')
    .optional()
    .isString()
    .withMessage('Impact stat unit must be a string'),

  body('testimonials')
    .optional()
    .isArray()
    .withMessage('Testimonials must be an array'),

  body('testimonials.*.name')
    .notEmpty()
    .withMessage('Testimonial name is required')
    .isString(),

  body('testimonials.*.quote')
    .notEmpty()
    .withMessage('Testimonial quote is required')
    .isString(),

  body('testimonials.*.role').optional().isString(),

  body('location').optional().isString(),

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
]
