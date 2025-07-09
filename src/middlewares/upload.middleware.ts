import { FileFilterCallback } from 'multer'
import multer = require('multer')
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils/apiResponse'
import { ensureUploadDirExists } from '../utils/uploadDirectory'
import { uploadDir } from '../utils/constant'
import path = require('path')

ensureUploadDirExists()

type AllowedFileType = 'image' | 'pdf' | 'any'
const createFileFilter = (type: AllowedFileType) => {
  const mimeTypes: { [key: string]: string } = {
    image: 'image/',
    pdf: 'application/pdf',
    any: '',
  }
  return (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    try {
      const allowedMimeType = mimeTypes[type]
      if (!allowedMimeType || !file.mimetype.startsWith(allowedMimeType)) {
        return cb(new Error(`Only ${type} files are allowed`) as any, false)
      }
      cb(null, true)
    } catch (error) {
      throw error
    }
  }
}
const uploadMiddleware = (
  subFolder: string,
  isMultiple: boolean = true,
  allowedFileTypes: AllowedFileType = 'image',
  fieldName: string = 'files',
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dynamicUploadDir = path.join(uploadDir, subFolder)
      const storage = multer.diskStorage({
        destination: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, destination: string) => void,
        ) => {
          cb(null, dynamicUploadDir)
        },
        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          try {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
            cb(null, `${uniqueSuffix}-${file.originalname}`)
          } catch (error) {
            throw error
          }
        },
      })
      let upload
      const fileFilter = createFileFilter(allowedFileTypes)
      if (isMultiple) {
        upload = multer({
          storage,
          fileFilter,
          limits: { fileSize: 5 * 1024 * 1024 },
        }).array(`${fieldName}`, 10)
      } else {
        upload = multer({
          storage,
          fileFilter,
          limits: { fileSize: 5 * 1024 * 1024 },
        }).single(`${fieldName}`)
      }

      upload(req, res, (err: any) => {
        if (err) {
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return new ErrorResponse(
              400,
              'Unexpected file field. Please check the field name or upload limit.',
            ).send(res)
          }

          // Handle other Multer-specific errors
          if (err.code === 'LIMIT_FILE_SIZE') {
            return new ErrorResponse(
              400,
              'File size exceeds the allowed limit.',
            ).send(res)
          }

          // Generic fallback
          return new ErrorResponse(400, err).send(res)
        }

        next()
      })
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
}

export default uploadMiddleware
