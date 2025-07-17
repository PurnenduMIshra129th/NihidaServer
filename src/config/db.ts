import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { currentEnv, localDbURL } from '../utils/constant'
import { getEnvValue } from '../utils/utils'
import { EnvKey } from '../types/utils/utils.type'
dotenv.config()

const dbConnect = async (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const connectionString =
        getEnvValue(currentEnv as EnvKey, 'databaseConnectionString') ||
        localDbURL
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
