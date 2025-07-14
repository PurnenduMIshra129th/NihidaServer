import { NextFunction } from 'express'
import mongoose from 'mongoose'
import { ErrorResponse } from '../utils/apiResponse'
import { Request, Response } from 'express'

export const validateUploadTarget =
  (model: mongoose.Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query

      if (!id) {
        return new ErrorResponse(400, 'Missing id in query parameters').send(
          res,
        )
      }
      if (
        Array.isArray(id) ||
        typeof id === 'object' ||
        typeof id !== 'string'
      ) {
        return new ErrorResponse(400, 'ID must be a string').send(res)
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return new ErrorResponse(400, 'Invalid ID').send(res)
      }

      const doc = await model.findById(id)
      if (!doc) {
        return new ErrorResponse(404, 'Document not found').send(res)
      }
      next()
    } catch (error) {
      return new ErrorResponse(500, error).send(res)
    }
  }
