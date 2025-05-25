import { Request, Response, NextFunction } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

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
        res.status(400).json({ errors: errors.array() })
        return
      }

      next()
    } catch (error) {
      console.error('Validation error:', error)
      res.status(500).json({ error: 'Internal server error during validation' })
    }
  }
}

export default validateInputs
