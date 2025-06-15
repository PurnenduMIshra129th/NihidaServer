import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { dbURL } from '../utils/constant'
dotenv.config()

const dbConnect = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const connectionString = dbURL
      if (!connectionString) {
        throw new Error('Database URL not found in environment variables!')
      }

      await mongoose.connect(connectionString)
      console.log('Database connected successfully')
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export default dbConnect
