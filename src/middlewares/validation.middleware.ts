import { Request, Response, NextFunction } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { ErrorResponse } from '../utils/apiResponse'

/**
 * Middleware to validate input requests based on provided validation rules.
 *
 * @param validations - Array of express-validator validation chains.
 * @returns Express middleware function.
 */
const validateInputs = (validations: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Execute all validation rules
      await Promise.all(validations.map((validation) => validation.run(req)))

      // Check for validation errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return new ErrorResponse(400, errors.array()).send(res)
      }

      next()
    } catch (error) {
      console.error('Validation error:', error)
      return new ErrorResponse(500, error).send(res)
    }
  }
}

export default validateInputs
