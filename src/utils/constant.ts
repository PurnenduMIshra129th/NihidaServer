import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config()

export const serverAddress = process.env.SERVER_ADDRESS
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
