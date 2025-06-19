import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ILoginUser } from '../../types/authenticationTypes/authentication.type'
import { comparePasswords, generateToken } from '../../config/authentication'
import { createUserModel } from '../../models/userModels/user.model'

export const loginService = async (data: ILoginUser) => {
  try {
    const { email, password } = data
    const user = await createUserModel.findOne({ email })

    if (!user || !(await comparePasswords(password, user.password))) {
      return sendErrorData(400, 'Passwords do not match or user not found')
    }

    const token = generateToken(user._id.toString(), user.role)
    return sendSuccessData('Login successful', { token, user })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
