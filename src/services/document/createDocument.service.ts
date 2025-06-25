import { documentModel } from '../../schema/document/document.schema'
import { ICreateDocument } from '../../types/document/document.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'

export const createDocumentService = async (data: ICreateDocument) => {
  try {
    const {
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

    const Document = new documentModel({
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
    })

    await Document.save()
    return sendSuccessData('Document created successfully', Document)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
