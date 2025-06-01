import * as fs from 'fs'
import * as path from 'path'
import { uploadDir, uploadSubFolder } from './constant'
export const ensureUploadDirExists = async () => {
  try {
    await fs.promises.mkdir(uploadDir, { recursive: true })
    Object.keys(uploadSubFolder).forEach(async (key) => {
      const dir = uploadSubFolder[key as keyof typeof uploadSubFolder]
      await fs.promises.mkdir(path.join(uploadDir, dir), { recursive: true })
    })
    console.log('Upload directory is ready:', uploadDir)
  } catch (error) {
    console.error('Failed to create directory:', error)
  }
}
