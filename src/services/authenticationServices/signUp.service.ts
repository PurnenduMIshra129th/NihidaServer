import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ISignUpUser } from '../../types/authenticationTypes/authentication.type'
import { generateToken, hashPassword } from '../../config/authentication'
import { createUserModel } from '../../models/userModels/user.model'

export const signUpService = async (data: ISignUpUser) => {
  try {
    const { name, role, email, password } = data

    const existingUser = await createUserModel.findOne({ email })
    if (existingUser) {
      return sendErrorData(400, 'User already exists')
    }

    const hashedPassword = await hashPassword(password)
    const user = new createUserModel({
      name,
      email,
      password: hashedPassword,
      role,
    })

    await user.save()
    const token = generateToken(user._id.toString(), user.role)
    return sendSuccessData('User registered', { token, user })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
