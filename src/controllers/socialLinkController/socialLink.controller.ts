// import sanitizeBody from '../middlewares/sanitizeBody';
import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import mongoose from 'mongoose'
import ErrorCodes from '../../utils/errorCodes'
import { createSocialLinkModel } from '../../models/socialLinkModels/socialLink.model'
import { createSocialLinkService } from '../../services/socialLinkServices/createSocialLink.service'
import { deleteSocialLinkService } from '../../services/socialLinkServices/deleteSocialLink.service'
import { updateSocialLinkService } from '../../services/socialLinkServices/updateSocialLink.service'

export const createSocialLinkController = async (
  req: Request,
  res: Response,
) => {
  try {
    // const sanitizedData = sanitizeBody(req.body);
    const {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      telegramUrl,
      whatsappUrl,
      phoneNumber1,
      phoneNumber2,
    } = req?.body
    const argObj = {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      telegramUrl,
      whatsappUrl,
      phoneNumber1,
      phoneNumber2,
    }
    const result = await createSocialLinkService(argObj)
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

export const updateSocialLinkController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid socialLink ID format').send(res)
    }
    const {
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      telegramUrl,
      whatsappUrl,
      phoneNumber1,
      phoneNumber2,
    } = req.body

    const argObj = {
      id,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      youtubeUrl,
      telegramUrl,
      whatsappUrl,
      phoneNumber1,
      phoneNumber2,
    }
    const result = await updateSocialLinkService(argObj)
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

export const deleteSocialLinkController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid socialLink ID format').send(res)
    }
    const argObj = {
      id,
    }
    const result = await deleteSocialLinkService(argObj)
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

export const getAllSocialLinkController = async (_: Request, res: Response) => {
  try {
    const socialLinkList = await createSocialLinkModel.find()
    if (socialLinkList?.length > 0) {
      return new SuccessResponse(
        'SocialLink retrieved successfully',
        socialLinkList,
      ).send(res)
    } else {
      return new ErrorResponse(404, 'SocialLink not found').send(res)
    }
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}

export const getSocialLinkByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new ErrorResponse(400, 'Invalid socialLink ID format').send(res)
    }

    const socialLink = await createSocialLinkModel.findById(id)
    if (!socialLink) {
      return new ErrorResponse(404, 'SocialLink not found').send(res)
    }

    return new SuccessResponse(
      'SocialLink retrieved successfully',
      socialLink,
    ).send(res)
  } catch (error) {
    return new ErrorResponse(500, error).send(res)
  }
}
