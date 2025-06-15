import { body } from 'express-validator'

export const loginDTO = [
  body('email').trim().isString().notEmpty().withMessage('Email is required'),
  body('password')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Password is required'),
]
