import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {
  adminEmail,
  adminPassword,
  jwtExpiration,
  jwtSecret,
} from '../utils/constant'
import { createUserModel } from '../models/userModels/user.model'

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, jwtSecret!, {
    expiresIn: jwtExpiration,
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

export const initializeAdmin = async (): Promise<void> => {
  try {
    const adminExists = await createUserModel.findOne({ email: adminEmail })

    if (adminExists) {
      console.log('Admin user already exists')
      return
    }

    const hashedPassword = await hashPassword(adminPassword || 'Admin@123')

    const newAdmin = new createUserModel({
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      name: 'Admin',
    })

    await newAdmin.save()
    console.log('Admin user created successfully')
  } catch (err) {
    console.error('Failed to initialize admin user:', err)
  }
}
