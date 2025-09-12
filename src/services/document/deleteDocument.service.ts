import { deleteFromR2 } from '../../config/cloudfare'
import { documentModel } from '../../schema/document/document.schema'
import { IDeleteDocument } from '../../types/document/document.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { enableCloudFareStorage } from '../../utils/constant'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteDocumentService = async (data: IDeleteDocument) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Document ID is required')
    }

    // Find the document document
    const document = await documentModel.findById(id)
    if (!document) {
      return sendErrorData(404, 'Document not found')
    }

    // Store file path before deletion for cleanup
    const files = document.files

    // Delete from database first
    await documentModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        if (enableCloudFareStorage == 'false') {
          deleteFileIfExists(path)
        } else {
          deleteFromR2(path)
        }
      }
    }
    return sendSuccessData('Document deleted successfully', document)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
