import {
  baseUrl,
  currentEnv,
  environmentConfig,
  uploadsFolder,
} from './constant'
import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { pathToRegexp } from 'path-to-regexp'
import { EnvironmentConfig, EnvKey } from '../types/utils/utils.type'
import sharp from 'sharp'

export const constructImagePath = (
  subFolder: string,
  fileName: string | undefined,
) => {
  const serverAddress = getEnvValue(currentEnv as EnvKey, 'serverURL')

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
export const doesRouteMatch = (pattern: string, path: string): boolean => {
  const regex = pathToRegexp(pattern)
  return regex.regexp.test(path)
}
export const getImageMetadata = async (filePath: string) => {
  const { size } = fs.statSync(filePath)
  const { width, height } = await sharp(filePath).metadata()
  return {
    sizeKB: +(size / 1024).toFixed(2),
    resolution: `${width}x${height}`,
  }
}
export const extractR2KeyFromUrl = (url: string): string => {
  try {
    const parsed = new URL(url)
    const key = parsed.pathname.replace(/^\/+/, '') // remove leading slashes
    if (!key) throw new Error('Key extraction failed: empty path')
    return key
  } catch (err) {
    console.error('Error extracting R2 key:', err)
    return ''
  }
}

export const nonTokenizedRoutes = [
  '/favicon.ico',
  `${baseUrl}/authentication/login`,
  `${baseUrl}/authentication/signUp`,
  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/socialLinkAndCommonImage/getAllSocialLinkAndCommonImage`,
  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/focusActivity/getAllFocusActivity`,
  `${baseUrl}/upcomingEvent/getAllUpcomingEvent`,
  `${baseUrl}/document/getAllDocument`,
  `${baseUrl}/gallery/getAllGallery`,
  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/teamMember/getAllTeamMember`,
  `${baseUrl}/teamMember/getTeamMemberById/:id`,
  `${baseUrl}/contactUs/getAllContactUs`,
  `${baseUrl}/partner/getAllPartner`,
  `${baseUrl}/partner/getPartnerById/:id`,
]
export const nonAdminRoutes = [
  '/favicon.ico',
  `${baseUrl}/authentication/login`,
  `${baseUrl}/authentication/signUp`,
  `${baseUrl}/authentication/getUser`,

  `${baseUrl}/socialLinkAndCommonImage/getAllSocialLinkAndCommonImage`,
  `${baseUrl}/socialLinkAndCommonImage/getSocialLinkAndCommonImageById/:id`,

  `${baseUrl}/focusActivity/getAllFocusActivity`,
  `${baseUrl}/focusActivity/getFocusActivityById/:id`,

  `${baseUrl}/upcomingEvent/getAllUpcomingEvent`,
  `${baseUrl}/upcomingEvent/getUpcomingEventById/:id`,

  `${baseUrl}/document/getAllDocument`,
  `${baseUrl}/document/getDocumentById/:id`,

  `${baseUrl}/gallery/getAllGallery`,
  `${baseUrl}/gallery/getGalleryById/:id`,

  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/video/getVideoById/:id`,

  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/news/getNewsById/:id`,

  `${baseUrl}/teamMember/getAllTeamMember`,
  `${baseUrl}/teamMember/getTeamMemberById/:id`,

  `${baseUrl}/partner/getAllPartner`,
  `${baseUrl}/partner/getPartnerById/:id`,

  `${baseUrl}/contactUs/getAllContactUs`,
]
export const cachedEndpoints = [
  '/favicon.ico',

  `${baseUrl}/news/getAllNews`,
  `${baseUrl}/news/getNewsById/:id`,

  `${baseUrl}/socialLinkAndCommonImage/getAllSocialLinkAndCommonImage`,
  `${baseUrl}/socialLinkAndCommonImage/getSocialLinkAndCommonImageById/:id`,

  `${baseUrl}/focusActivity/getAllFocusActivity`,
  `${baseUrl}/focusActivity/getFocusActivityById/:id`,

  `${baseUrl}/upcomingEvent/getAllUpcomingEvent`,
  `${baseUrl}/upcomingEvent/getUpcomingEventById/:id`,

  `${baseUrl}/document/getAllDocument`,
  `${baseUrl}/document/getDocumentById/:id`,

  `${baseUrl}/gallery/getAllGallery`,
  `${baseUrl}/gallery/getGalleryById/:id`,

  `${baseUrl}/video/getAllVideo`,
  `${baseUrl}/video/getVideoById/:id`,
]
