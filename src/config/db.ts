import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

dotenv.config()

const dbConnect = async () => {
  try {
    const dbURL = process.env.DB_URL
    if (!dbURL)
      throw new Error('Database URL not found in environment variables!')

    await mongoose.connect(dbURL)

    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1) // Exit process if connection fails
  }
}

export default dbConnect
