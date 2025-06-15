import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { jwtSecret } from '../utils/constant'

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, jwtSecret!, {
    expiresIn: '1h',
  })
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}
