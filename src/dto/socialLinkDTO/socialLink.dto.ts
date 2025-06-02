import { body } from 'express-validator'

export const createSocialLinkDTO = [
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
]
