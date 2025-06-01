// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createProductAndService } from '../../services/productAndServiceServices/createProductAndService.service'
import { deleteProductAndService } from '../../services/productAndServiceServices/deleteProductAndService.service'
import { updateProductAndService } from '../../services/productAndServiceServices/updateProductAndService.service'
import { createProductAndServiceModel } from '../../models/productAndServiceModels/productAndService.model'

export const createProductAndServicesController = async (
  req: Request,
  res: Response,
) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    if (!req.file) {
      return new ErrorResponse(400, 'Image upload required').send(res)
    }
    const { heading, description } = req?.body
    const file = req?.file?.filename
    const argObj = {
      heading,
      description,
      file,
    }
    const result = await createProductAndService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const updateProductAndServicesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    const { heading, description } = req.body
    let file = undefined
    if (req.file) {
      file = req.file?.filename
    }
    const argObj = {
      id,
      heading,
      description,
      file,
    }
    const result = await updateProductAndService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const deleteProductAndServicesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    const argObj = {
      id,
    }
    const result = await deleteProductAndService(argObj)
    if (result instanceof SuccessResponse && result.statusCode === 1) {
      return new SuccessResponse(result.message, result.data).send(res)
    } else if (result instanceof ErrorResponse) {
      return new ErrorResponse(
        result.errorCode as keyof typeof ErrorCodes,
        result.errorMessage,
      ).send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getAllProductAndServicesController = async (
  _: Request,
  res: Response,
) => {
  try {
    const ProductAndServicesList = await createProductAndServiceModel.find()
    return new SuccessResponse(
      'ProductAndServices retrieved successfully',
      ProductAndServicesList,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getProductAndServicesByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid ProductAndService ID format').send(
        res,
      )
    }

    const ProductAndService = await createProductAndServiceModel.findById(id)
    if (!ProductAndService) {
      return new ErrorResponse(404, 'ProductAndService not found').send(res)
    }

    return new SuccessResponse(
      'ProductAndService retrieved successfully',
      ProductAndService,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
