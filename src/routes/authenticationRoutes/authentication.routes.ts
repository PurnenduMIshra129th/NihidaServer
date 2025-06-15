import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { signUpDTO } from '../../dto/userDTO/signUp.dto'
import {
  loginController,
  signUpController,
} from '../../controllers/authenticationController/authentication.controller'
import { loginDTO } from '../../dto/userDTO/login.dto'
const authenticationRouter = Router()

authenticationRouter.post('/login', validateInputs(loginDTO), loginController)
authenticationRouter.post(
  '/signUp',
  validateInputs(signUpDTO),
  signUpController,
)

export default authenticationRouter
