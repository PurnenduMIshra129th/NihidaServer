import * as dotenv from 'dotenv'
import path from 'path'
import { EnvKey, EnvironmentConfig } from '../types/utils/utils.type'
dotenv.config()

export const jwtSecret = process.env.JWT_SECRET || ''
export const prodDbURL = process.env.PROD_DB_URL || ''
export const testDbURL = process.env.TEST_DB_URL || ''
export const localDbURL = process.env.LOCAL_DB_URL || ''
export const encryption_key = process.env.ENCRYPTION_KEY || ''
export const adminEmail = process.env.ADMIN_EMAIL || ''
export const adminPassword = process.env.ADMIN_PASSWORD || ''
export const jwtExpiration = '1h'
export const currentEnv = process.env.NODE_ENV || 'local'
export const redisURL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

export const port = 3000
export const baseUrl = '/NIHIDA'
export const uploadsFolder = '/uploads/'
export const uploadDir = path.join(__dirname, `../../${uploadsFolder}`)
export const uploadSubFolder = {
  newsDir: `/newsUploads/`,
  videoDir: `/videoUploads/`,
  focusActivityDir: `/focusActivityUploads/`,
  upcomingEventDir: `/upcomingEventUploads/`,
  documentDir: `/documentUploads/`,
  galleryDir: `/galleryUploads/`,
  socialLinkAndCommonImageDir: `/socialLinkAndCommonImageUploads/`,
  teamMemberDir: `/teamMemberUploads/`,
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
    databaseConnectionString: localDbURL,
  },
  test: {
    corsEndpoints: ['https://nihidafrontend.onrender.com'],
    serverURL: 'https://nihidaapi.onrender.com',
    databaseConnectionString: testDbURL,
  },
  prod: {
    corsEndpoints: ['https://nihida.org.in'],
    serverURL: 'https://nihidaapi.onrender.com',
    databaseConnectionString: prodDbURL,
  },
}
