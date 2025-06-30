import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import { signUpDTO } from '../../dto/user/signUp.dto'
import {
  getUserController,
  loginController,
  signUpController,
} from '../../controllers/authentication/authentication.controller'
import { loginDTO } from '../../dto/user/login.dto'
const authenticationRouter = Router()

authenticationRouter.post('/login', validateInputs(loginDTO), loginController)
authenticationRouter.post(
  '/signUp',
  validateInputs(signUpDTO),
  signUpController,
)
authenticationRouter.get('/getUser', getUserController)

export default authenticationRouter
