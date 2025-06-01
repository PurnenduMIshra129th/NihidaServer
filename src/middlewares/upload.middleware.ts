import { FileFilterCallback } from 'multer'
import multer = require('multer')
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '../utils/apiResponse'
import { ensureUploadDirExists } from '../utils/uploadDirectory'
import { uploadDir } from '../utils/constant'
import path = require('path')

ensureUploadDirExists()

// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void,
//   ) => {
//     cb(null, uploadDir)
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void,
//   ) => {
//     try {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
//       cb(null, `${uniqueSuffix}-${file.originalname}`)
//     } catch (error) {
//       throw error
//     }
//   },
// })

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  try {
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error('Only image files are allowed') as any, false)
    }
    cb(null, true)
  } catch (error) {
    throw error
  }
}

const uploadMiddleware = (subFolder: string) => {
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
      const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 },
      }).single('image')

      upload(req, res, (err: any) => {
        if (err) return new ErrorResponse(400, err).send(res)
        next()
      })
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
}

// const uploadMiddleware = (subFolder: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const dynamicUploadDir = path.join(uploadDir, subFolder)

//       // ✅ Ensure directory exists before storing files
//       fs.mkdir(dynamicUploadDir, { recursive: true }, (mkdirErr) => {
//         if (mkdirErr) return new ErrorResponse(500, mkdirErr).send(res)

//         const storage = multer.diskStorage({
//           destination: (_, __, cb) => cb(null, dynamicUploadDir),
//           filename: (_, file, cb) => {
//             const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
//             cb(null, `${uniqueSuffix}-${file.originalname}`)
//           },
//         })

//         const upload = multer({
//           storage,
//           fileFilter,
//           limits: { fileSize: 5 * 1024 * 1024 },
//         }).single('image')

//         upload(req, res, (err) => {
//           if (err) return new ErrorResponse(400, err).send(res)
//           next()
//         })
//       })
//     } catch (error) {
//       return new ErrorResponse(500, error).send(res)
//     }
//   }
// }

export default uploadMiddleware
