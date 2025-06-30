import {
  baseUrl,
  currentEnv,
  environmentConfig,
  uploadsFolder,
} from './constant'
import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { EnvironmentConfig, EnvKey } from '../types/utils/utils.type'

export const constructImagePath = (
  subFolder: string,
  fileName: string | undefined,
) => {
  const serverAddress = getEnvValue(currentEnv, 'serverURL')

  let imagePath = ''
  if (serverAddress && uploadsFolder && subFolder && fileName) {
    const constructPath = path.join(uploadsFolder, subFolder, fileName)
    imagePath = `${serverAddress}${constructPath}`
  }
  return imagePath == '' ? 'Some folder path is missing' : imagePath
}

/**
 * Extracts the local file path from a stored image URL or database entry.
 * Ensures proper path reconstruction within the uploads directory.
 *
 * @param imagePath - The stored path or URL of the image
 * @returns The local path inside `uploads/`
 */
export const getLocalFilePath = (
  subFolder: string,
  imagePath: string,
): string => {
  if (!imagePath) return ''

  // Extract filename from the stored image path
  const fileName = path.basename(imagePath)

  // Reconstruct full local path based on uploads directory
  return path.join(__dirname, '../../', uploadsFolder, subFolder, fileName)
}

/**
 * Deletes a file asynchronously after checking its existence.
 *
 * @param localFilePath - The absolute path of the file to delete
 */
export const deleteFileIfExists = (localFilePath: string): void => {
  if (!localFilePath) return

  fs.access(localFilePath, fs.constants.F_OK, (accessErr) => {
    if (accessErr) {
      console.error('File does not exist:', localFilePath)
      return
    }
    fs.access(localFilePath, fs.constants.R_OK, (err) => {
      if (err) console.log('File is not readable:', localFilePath)
    })
    fs.access(localFilePath, fs.constants.W_OK, (err) => {
      if (err) console.log('File is not writable:', localFilePath)
    })

    fs.unlink(localFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting file:', unlinkErr)
      } else {
        console.log('File deleted successfully:', localFilePath)
      }
    })
  })
}

export const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization
  return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null
}
export const matchRoute = (pattern: string, actual: string): boolean => {
  const patternParts = pattern.split('/')
  const actualParts = actual.split('/')

  if (patternParts.length !== actualParts.length) return false

  return patternParts.every((part, index) => {
    return part === actualParts[index] || part.startsWith(':')
  })
}
export const getEnvValue = <T extends keyof EnvironmentConfig>(
  env: EnvKey,
  key: T,
): EnvironmentConfig[T] => {
  return environmentConfig?.[env]?.[key]
}

export const nonTokenizedRoutes = [
  '/favicon.ico',
  `${baseUrl}/authentication/login`,
  `${baseUrl}/authentication/signUp`,
  `${baseUrl}/blog/getAllBlog`,
  `${baseUrl}/carousel/getAllCarousel`,
  `${baseUrl}/media/getAllMedia`,
  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/productAndService/getAllProductAndService`,
  `${baseUrl}/socialLink/getAllSocialLink`,
  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/focusActivity/getAllFocusActivity`,
  `${baseUrl}/upcomingEvent/getAllUpcomingEvent`,
]
export const nonAdminRoutes = [
  '/favicon.ico',
  `${baseUrl}/authentication/login`,
  `${baseUrl}/authentication/signUp`,
  `${baseUrl}/blog/getAllBlog`,
  `${baseUrl}/blog/getBlogById/:id`,
  `${baseUrl}/carousel/getAllCarousel`,
  `${baseUrl}/media/getAllMedia`,
  `${baseUrl}/media/getMediaById/:id`,
  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/news/getNewsById/:id`,
  `${baseUrl}/productAndService/getAllProduc\tAndService`,
  `${baseUrl}/socialLink/getAllSocialLink`,
  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/focusActivity/getAllFocusActivity`,
  `${baseUrl}/focusActivity/getFocusActivityById/:id`,
  `${baseUrl}/upcomingEvent/getAllUpcomingEvent`,
  `${baseUrl}/upcomingEvent/getUpcomingEventById/:id`,
]
