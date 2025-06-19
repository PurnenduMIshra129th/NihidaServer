import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { currentEnv, dbURL } from '../utils/constant'
import { getEnvValue } from '../utils/utils'
dotenv.config()

const dbConnect = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const connectionString =
        getEnvValue(currentEnv, 'databaseConnectionString') || dbURL
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
