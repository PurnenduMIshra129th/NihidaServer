import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import path from 'path'
import { constructImagePath, deleteFileIfExists } from '../../utils/utils'
import mongoose from 'mongoose'
import { IFile } from '../../types/utils/utils.types'

export const uploadController =
  (model: mongoose.Model<any>, isMultiple: boolean = true) =>
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ErrorResponse(400, 'Invalid ID parameter').send(res)
      }
      // Fetch the existing document
      const existingDoc = await model.findById(id)
      if (!existingDoc) {
        return new ErrorResponse(404, 'Document not found').send(res)
      }

      let files
      if (isMultiple) {
        files = req.files as Express.Multer.File[]
      } else {
        files = req.file as Express.Multer.File
      }
      if (!files || (Array.isArray(files) && files.length === 0)) {
        return new ErrorResponse(400, 'At least one file is required').send(res)
      }
      const fileArray = Array.isArray(files) ? files : [files]
      const uploadContext = {
        folder: path.basename(path.dirname(fileArray[0].path)),
      }

      const fileDetails = fileArray.map((file) => ({
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        serverFilePath: file.path,
        publicFilePath: constructImagePath(uploadContext.folder, file.filename),
      }))
      existingDoc.files = [...(existingDoc.files || []), ...fileDetails]
      await existingDoc.save()
      return new SuccessResponse('Files uploaded successfully', {
        files: fileDetails,
      }).send(res)
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }

export const deleteUploadFileController =
  (model: mongoose.Model<any>) =>
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { id, fileID } = req.params

      if (typeof id !== 'string' || typeof fileID !== 'string') {
        return new ErrorResponse(
          400,
          'Missing or invalid query parameters',
        ).send(res)
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ErrorResponse(400, 'Invalid document ID').send(res)
      }

      if (!mongoose.Types.ObjectId.isValid(fileID)) {
        return new ErrorResponse(400, 'Invalid file ID').send(res)
      }

      const doc = await model.findById(id)
      if (!doc) {
        return new ErrorResponse(404, 'Document not found').send(res)
      }

      if (!Array.isArray(doc.files)) {
        return new ErrorResponse(
          500,
          'File field is not properly defined in document',
        )
      }

      const fileIndex = doc.files.findIndex(
        (file: IFile) => file._id.toString() === fileID,
      )
      if (fileIndex === -1) {
        return new ErrorResponse(404, 'File not found in document').send(res)
      }

      const fileToDelete = doc.files[fileIndex]

      // Delete from server
      if (fileToDelete.serverFilePath) {
        deleteFileIfExists(fileToDelete.serverFilePath)
      }

      // Remove from DB
      doc.files.splice(fileIndex, 1)
      await doc.save()

      return new SuccessResponse('File deleted successfully', {
        deletedFileId: fileID,
        docId: id,
      }).send(res)
    } catch (err) {
      return new ErrorResponse(500, err).send(res)
    }
  }
export const updateUploadFileController =
  (model: mongoose.Model<any>) => async (req: Request, res: Response) => {
    try {
      const { id, fileID } = req.params

      if (typeof id !== 'string' || typeof fileID !== 'string') {
        return new ErrorResponse(
          400,
          'Missing or invalid query parameters',
        ).send(res)
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ErrorResponse(400, 'Invalid document ID').send(res)
      }
      if (!mongoose.Types.ObjectId.isValid(fileID)) {
        return new ErrorResponse(400, 'Invalid file ID').send(res)
      }
      const doc = await model.findById(id)
      if (!doc) {
        return new ErrorResponse(404, 'Document not found').send(res)
      }

      if (!Array.isArray(doc.files)) {
        return new ErrorResponse(
          500,
          'Files field is not defined properly in the model schema',
        ).send(res)
      }

      const fileIndex = doc.files.findIndex(
        (f: IFile) => f._id.toString() === fileID,
      )
      if (fileIndex === -1) {
        return new ErrorResponse(404, 'File not found in document').send(res)
      }

      // Handle new uploaded file (from middleware)
      const uploadedFile = req.file as Express.Multer.File
      if (!uploadedFile) {
        return new ErrorResponse(400, 'No file uploaded for replacement').send(
          res,
        )
      }

      const folder = path.basename(path.dirname(uploadedFile.path))
      const newFileMeta: IFile = {
        _id: fileID, // Keep the same ID to avoid breaking references
        fileName: uploadedFile.filename,
        originalName: uploadedFile.originalname,
        mimeType: uploadedFile.mimetype,
        serverFilePath: uploadedFile.path,
        publicFilePath: constructImagePath(folder, uploadedFile.filename),
      }

      // Delete previous file from server
      const oldFilePath = doc.files[fileIndex].serverFilePath
      if (oldFilePath) deleteFileIfExists(oldFilePath)

      // Replace in DB
      doc.files[fileIndex] = newFileMeta
      await doc.save()

      return new SuccessResponse('File updated successfully', {
        updatedFile: newFileMeta,
        docId: id,
      }).send(res)
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
