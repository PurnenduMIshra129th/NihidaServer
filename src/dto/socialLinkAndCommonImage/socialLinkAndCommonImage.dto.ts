import { body } from 'express-validator'

export const socialLinkAndCommonImageDTO = [
  body('instagramUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('instagram URL is required'),
  body('facebookUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('facebook URL is required'),
  body('twitterUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('twitter URL is required'),
  body('linkedinUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('linkedin URL is required'),
  body('youtubeUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('youtube URL is required'),
  body('whatsappUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('whatsapp URL is required'),
  body('telegramUrl')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('telegram URL is required'),
  body('phoneNumber1')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('phone number 1 is required'),
  body('phoneNumber2')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('phone number 2 is required'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('addressLine1').notEmpty().withMessage('Address Line 1 is required'),

  body('addressLine2')
    .optional()
    .isString()
    .withMessage('Address Line 2 must be a string'),

  body('city').notEmpty().withMessage('City is required'),

  body('state').notEmpty().withMessage('State is required'),

  body('country').notEmpty().withMessage('Country is required'),

  body('postalCode')
    .notEmpty()
    .withMessage('Postal code is required')
    .isPostalCode('any')
    .withMessage('Invalid postal code'),
]
