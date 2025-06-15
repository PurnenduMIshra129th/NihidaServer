import { body } from 'express-validator'

export const signUpDTO = [
  body('name').trim().isString().notEmpty().withMessage('Name is required'),
  body('email').trim().isString().notEmpty().withMessage('Email is required'),
  body('role')
    .trim()
    .isString()
    .notEmpty()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either "user" or "admin"'),
  body('password')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Password is required'),
]
