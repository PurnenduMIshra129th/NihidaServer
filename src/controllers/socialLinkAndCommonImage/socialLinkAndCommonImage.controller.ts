import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
import { createSocialLinkAndCommonImageService } from '../../services/socialLinkAndCommonImage/createSocialLinkAndCommonImage.service'
import { deleteSocialLinkAndCommonImageService } from '../../services/socialLinkAndCommonImage/deleteSocialLinkAndCommonImage.service'
import { updateSocialLinkAndCommonImageService } from '../../services/socialLinkAndCommonImage/updateSocialLinkAndCommonImage.service'

export const createSocialLinkAndCommonImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    } = req?.body
    const argObj = {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    }
    const result = await createSocialLinkAndCommonImageService(argObj)
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

export const updateSocialLinkAndCommonImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(
        400,
        'Invalid socialLinkAndCommonImage ID format',
      ).send(res)
    }
    const {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    } = req.body

    const argObj = {
      id,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      whatsappUrl,
      telegramUrl,
      phoneNumber1,
      phoneNumber2,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
    }
    const result = await updateSocialLinkAndCommonImageService(argObj)
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
export const deleteSocialLinkAndCommonImageController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(
        400,
        'Invalid socialLinkAndCommonImage ID format',
      ).send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteSocialLinkAndCommonImageService(argObj)
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

export const getAllSocialLinkAndCommonImageController = async (
  _: Request,
  res: Response,
) => {
  try {
    const socialLinkAndCommonImageList = await socialLinkAndCommonImageModel
      .find()
      .sort({ createdAt: -1 })
    if (socialLinkAndCommonImageList?.length > 0) {
      return new SuccessResponse(
        'SocialLinkAndCommonImage retrieved successfully',
        socialLinkAndCommonImageList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'SocialLinkAndCommonImage not found').send(
        res,
      )
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getSocialLinkAndCommonImageByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(
        400,
        'Invalid socialLinkAndCommonImage ID format',
      ).send(res)
    }

    const socialLinkAndCommonImage =
      await socialLinkAndCommonImageModel.findById(id)
    if (!socialLinkAndCommonImage) {
      return new ErrorResponse(404, 'SocialLinkAndCommonImage not found').send(
        res,
      )
    }

    return new SuccessResponse(
      'SocialLinkAndCommonImage retrieved successfully',
      socialLinkAndCommonImage,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
