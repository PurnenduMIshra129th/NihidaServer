import * as dotenv from 'dotenv'
import path from 'path'
import { EnvKey, EnvironmentConfig } from '../types/utils/utils.type'
dotenv.config()

export const jwtSecret = process.env.JWT_SECRET || ''
export const dbURL = process.env.DB_URL || ''
export const encryption_key = process.env.ENCRYPTION_KEY || ''
export const adminEmail = process.env.ADMIN_EMAIL || ''
export const adminPassword = process.env.ADMIN_PASSWORD || ''
export const jwtExpiration = '1h'
export const currentEnv: keyof typeof nodeENV = 'prod'

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
  focusActivityDir: `/focusActivityUploads/`,
  upcomingEventDir: `/upcomingEventUploads/`,
  documentDir: `/documentUploads/`,
  galleryDir: `/galleryUploads/`,
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

export const environmentConfig: Record<EnvKey, EnvironmentConfig> = {
  local: {
    corsEndpoints: ['http://localhost:5000'],
    serverURL: 'http://localhost:3000',
    databaseConnectionString:
      'mongodb://127.0.0.1:27017/NIHIDA?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.3',
  },
  test: {
    corsEndpoints: ['https://nihidafrontend.onrender.com,'],
    serverURL: 'https://nihidaapi.onrender.com',
    databaseConnectionString:
      'mongodb+srv://purnendumishra129th:C6aMOcsZTkBtF4iZ@nihida.28reeua.mongodb.net/?retryWrites=true&w=majority&appName=NIHIDA',
  },
  prod: {
    corsEndpoints: ['https://nihida.org.in/'],
    serverURL: 'https://nihidaapi.onrender.com',
    databaseConnectionString:
      'mongodb+srv://purnendumishra129th:C6aMOcsZTkBtF4iZ@nihida.28reeua.mongodb.net/?retryWrites=true&w=majority&appName=NIHIDA',
  },
}
