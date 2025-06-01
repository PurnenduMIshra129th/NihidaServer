import { serverAddress, uploadsFolder } from './constant'
import path from 'path'
import fs from 'fs'

export const constructImagePath = (
  subFolder: string,
  fileName: string | undefined,
) => {
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
