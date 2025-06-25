import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { documentModel } from '../../schema/document/document.schema'
import { createDocumentService } from '../../services/document/createDocument.service'
import { deleteDocumentService } from '../../services/document/deleteDocument.service'
import { updateDocumentService } from '../../services/document/updateDocument.service'

export const createDocumentController = async (req: Request, res: Response) => {
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
    } = req?.body
    const argObj = {
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
    }
    const result = await createDocumentService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const updateDocumentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid document ID format').send(res)
    }
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
    } = req.body

    const argObj = {
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
    }
    const result = await updateDocumentService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
export const deleteDocumentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid document ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteDocumentService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.error,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getAllDocumentsController = async (_: Request, res: Response) => {
  try {
    const documentList = await documentModel.find().sort({ createdAt: -1 })
    if (documentList?.length > 0) {
      return new SuccessResponse(
        'Documents retrieved successfully',
        documentList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'Documents not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getDocumentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid document ID format').send(res)
    }

    const document = await documentModel.findById(id)
    if (!document) {
      return new ErrorResponse(404, 'Document not found').send(res)
    }

    return new SuccessResponse(
      'Document retrieved successfully',
      document,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
