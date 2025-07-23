import path from 'path'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import { IFile } from '../../types/utils/utils.type'

const allowedExtensions = ['.jpg', '.jpeg', '.png']

export const optimizeImagesByModelService = async (
  databaseModel: mongoose.Model<any>,
) => {
  try {
    const documents = await databaseModel.find({})
    const updatedItems: any[] = []
    const unchangedItems: any[] = []
    if (!documents || documents?.length === 0) {
      return sendErrorData(404, 'Documents not found')
    }

    for (const doc of documents) {
      const originalFiles = doc?.files || []
      const updatedFileLogs: any[] = []

      let hasChanges = false

      const updatedFiles = originalFiles.map((file: IFile) => {
        const ext = path.extname(file.fileName).toLowerCase()

        if (!allowedExtensions.includes(ext)) return file

        const base = path.basename(file.fileName, ext)
        const newName = `${base}.webp`

        const modifiedFile = {
          fileName: newName,
          originalName: file.originalName,
          mimeType: 'image/webp',
          serverFilePath: file.serverFilePath.replace(file.fileName, newName),
          publicFilePath: file.publicFilePath.replace(file.fileName, newName),
        }

        updatedFileLogs.push({
          id: file._id,
          original: file,
          modified: modifiedFile,
        })

        hasChanges = true
        return modifiedFile
      })

      if (hasChanges) {
        doc.files = updatedFiles
        await doc.save()

        updatedItems.push({
          _id: doc._id,
          files: updatedFileLogs,
        })
      } else {
        unchangedItems.push({ _id: doc._id })
      }
    }

    return sendSuccessData('Database image paths updated', {
      updatedItems,
      unchangedItems,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
