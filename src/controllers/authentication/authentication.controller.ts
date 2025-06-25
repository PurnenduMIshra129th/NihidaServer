import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import ErrorCodes from '../../utils/errorCodes'
import { loginService } from '../../services/authentication/login.service'
import { signUpService } from '../../services/authentication/signUp.service'

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req?.body
    const argObj = {
      email,
      password,
    }
    const result = await loginService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { userName: name, email, password, role } = req.body
    const argObj = {
      name,
      email,
      password,
      role,
    }
    const result = await signUpService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
