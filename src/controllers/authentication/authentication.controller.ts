import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import ErrorCodes from '../../utils/errorCodes'
import { loginService } from '../../services/authentication/login.service'
import { signUpService } from '../../services/authentication/signUp.service'
import { userModel } from '../../schema/user/user.schema'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../../utils/constant'

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
export const getUserController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new ErrorResponse(
        401,
        'Authorization token missing or malformed',
      ).send(res)
    }

    const token = authHeader.split(' ')[1]

    let decoded: any
    try {
      decoded = jwt.verify(token, jwtSecret!)
    } catch {
      return new ErrorResponse(401, 'Invalid or expired token').send(res)
    }

    const userId = decoded?.userId
    if (!userId) {
      return new ErrorResponse(400, 'Invalid token payload').send(res)
    }

    const user = await userModel.findById(userId).select('-password') // exclude password
    if (!user) {
      return new ErrorResponse(404, 'User not found').send(res)
    }

    return new SuccessResponse('User fetched successfully', user).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
