import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import { IFile } from '../../types/utils/utils.type'
import { cloudfareConfig } from '../../utils/constant'

export const changeToCloudfarePublicPathService = async (
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
        const oldServerPath = file.serverFilePath
        const oldPublicPath = file.publicFilePath
        const relativeServerPath = oldServerPath
          .replace('/opt/render/project/src/', '')
          .replace(/^\/+/, '')
        const relativePublicPath = oldPublicPath
          .replace('https://nihidaapi.onrender.com/', '')
          .replace(/^\/+/, '')

        const newServerPath = relativeServerPath
        const newPublicPath = `${cloudfareConfig.R2_PUBLIC_URL}/${relativePublicPath}`

        const modifiedFile = {
          fileName: file.fileName,
          originalName: file.originalName,
          mimeType: file.mimeType,
          serverFilePath: newServerPath,
          publicFilePath: newPublicPath,
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
