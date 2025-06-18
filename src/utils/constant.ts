import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config()

export const jwtSecret = process.env.JWT_SECRET
export const dbURL = process.env.DB_URL
export const encryption_key = process.env.ENCRYPTION_KEY
export const currentEnv: keyof typeof nodeENV = 'test'

export const port = 3000
export const baseUrl = '/NIHIDA'
export const uploadsFolder = '/uploads/'
export const uploadDir = path.join(__dirname, `../../${uploadsFolder}`)
export const uploadSubFolder = {
  mediaDir: `/mediaUploads/`,
  blogDir: `/blogUploads/`,
  newsDir: `/newsUploads/`,
  productAndServiceDir: `/productAndServiceUploads/`,
  videoDir: `/videoUploads/`,
  carousalDir: `/carousalUploads/`,
}
export const role = {
  user: 'user',
  admin: 'admin',
}
export const nodeENV = {
  local: 'local',
  test: 'test',
  prod: 'prod',
} as const

export const corsEndpoints: Record<keyof typeof nodeENV, string[]> = {
  local: ['http://localhost:5000'],
  test: ['https://nihidafrontend.onrender.com'],
  prod: ['https://nihidafrontend.onrender.com'],
}
export const serverURL: Record<keyof typeof nodeENV, string> = {
  local: 'http://localhost:3000',
  test: 'https://nihidaapi.onrender.com',
  prod: 'https://nihidaapi.onrender.com',
}
