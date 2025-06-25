import mongoose from 'mongoose'
import { documentModel } from '../../schema/document/document.schema'
import { IUpdateDocument } from '../../types/document/document.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const updateDocumentService = async (data: IUpdateDocument) => {
  try {
    const {
      id,
      title,
      type,
      description,
      issuedBy,
      issueDate,
      expiresAt,
      visibility,
      tags,
      highlighted,
      createdBy,
    } = data

    const document = await documentModel.findById(id)
    if (!document) {
      return sendErrorData(404, 'document not found')
    }
    if (title) document.title = title
    if (type) document.type = type
    if (description) document.description = description
    if (issuedBy) document.issuedBy = issuedBy
    if (issueDate) document.issueDate = new Date(issueDate)
    if (expiresAt) document.expiresAt = new Date(expiresAt)
    if (visibility) document.visibility = visibility
    if (tags) document.tags = tags
    if (highlighted) document.highlighted = highlighted
    if (createdBy) document.createdBy = new mongoose.Types.ObjectId(createdBy)

    await document.save()
    return sendSuccessData('Document updated successfully', document)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
