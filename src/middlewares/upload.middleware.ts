import { FileFilterCallback } from 'multer'
import multer = require('multer')
import * as path from 'path'
import { Request } from 'express'
import * as fs from 'fs'

// ✅ Ensure upload directory exists before storing files
const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// ✅ Define storage settings for uploaded images
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, uploadDir)
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  },
})

// ✅ Filter to allow only image uploads
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new Error('Only image files are allowed') as any, false)
  }
  cb(null, true)
}

// ✅ Multer instance with proper TypeScript support
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ Limit file size to 5MB
})

export default upload
