import { NextFunction } from 'express'
import mongoose from 'mongoose'
import { ErrorResponse } from '../utils/apiResponse'
import { Request, Response } from 'express'

export const validateUploadTarget =
  (model: mongoose.Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return new ErrorResponse(400, 'Invalid or missing ID').send(res)
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
