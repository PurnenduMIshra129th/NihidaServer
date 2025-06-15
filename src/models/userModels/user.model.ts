import mongoose from 'mongoose'
import { createUserSchema } from '../../schema/userSchema/user.schema'

export const createUserModel = mongoose.model('User', createUserSchema)
