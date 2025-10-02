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
export const isTurnOnTokenization = process.env.TURN_ON_TOKENIZATION || 'true'
export const isTurnOnAdminControl = process.env.TURN_ON_ADMIN_CONTROL || 'true'
export const enableCloudFareStorage =
  process.env.ENABLE_CLOUDFARE_STORAGE || 'false'

export const cloudfareConfig = {
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID || '',
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID || '',
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY || '',
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME || '',
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL || '',
}
export const stripeConfig = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  stripeWebhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET || '',
}

export const mailConfig = {
  emailProvider: process.env.EMAIL_PROVIDER || 'gmail',
  emailUser: process.env.EMAIL_USER || '',
  emailAppPassword: process.env.EMAIL_APP_PASSWORD || '',
  fromName: process.env.FROM_NAME || 'NIHIDA',
  businessName: process.env.BUSINESS_NAME || 'NIHIDA',
  contactEmail: process.env.CONTACT_EMAIL || '',
}

export const port = 3000
export const baseUrl = '/NIHIDA'
export const uploadsFolder = '/uploads/'
export const testUploadsFolder = '/testUploads/'
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
  partnerDir: `/partnerUploads/`,
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
    corsEndpoints: ['https://nihidafrontend-ew7h.onrender.com'],
    serverURL: 'https://nihidaserver-9er4.onrender.com/',
    databaseConnectionString: testDbURL,
  },
  prod: {
    corsEndpoints: ['https://www.nihida.org.in'],
    serverURL: 'https://nihidaserver-9er4.onrender.com/',
    databaseConnectionString: prodDbURL,
  },
}
