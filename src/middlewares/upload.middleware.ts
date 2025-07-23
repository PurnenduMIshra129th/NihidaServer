import { FileFilterCallback } from 'multer'
import multer = require('multer')
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils/apiResponse'
import { ensureUploadDirExists } from '../utils/uploadDirectory'
import { uploadDir } from '../utils/constant'
import path = require('path')
import sharp = require('sharp')
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { constructImagePath } from '../utils/utils'

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
const processFile = async (file: Express.Multer.File, targetDir: string) => {
  const ext = file.mimetype === 'application/pdf' ? 'pdf' : 'webp'
  const uniqueName = `${uuidv4()}.${ext}`
  const outputPath = path.join(targetDir, uniqueName)

  if (file.mimetype.startsWith('image/')) {
    await sharp(file.buffer)
      .toFormat('webp', { quality: 60 })
      .resize({ width: 800 })
      .toFile(outputPath)
  } else if (file.mimetype === 'application/pdf') {
    fs.writeFileSync(outputPath, file.buffer)
  }

  return {
    fileName: uniqueName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    serverFilePath: outputPath,
    publicFilePath: constructImagePath(path.basename(targetDir), uniqueName),
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
      const storage = multer.memoryStorage()
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

      upload(req, res, async (err: any) => {
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
        try {
          const dynamicUploadDir = path.join(uploadDir, subFolder)

          if (isMultiple && req.files) {
            const processedFiles = await Promise.all(
              (req.files as Express.Multer.File[]).map((file) =>
                processFile(file, dynamicUploadDir),
              ),
            )
            ;(req as any).files = processedFiles
          } else if (req.file) {
            const processedFile = await processFile(req.file, dynamicUploadDir)
            ;(req as any).file = processedFile
          }

          next()
        } catch (error) {
          return new ErrorResponse(500, error).send(res)
        }
      })
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
}

export default uploadMiddleware
