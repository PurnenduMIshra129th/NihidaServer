import { Request, Response } from 'express'
import { ErrorResponse, SuccessResponse } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { optimizeImagesByFolderService } from '../../services/optimizeImages/optimizeImagesByFolder.service'
import ErrorCodes from '../../utils/errorCodes'
import { newsModel } from '../../schema/news/news.schema'
import { videoModel } from '../../schema/video/video.schema'
import { focusActivityModel } from '../../schema/focusActivity/focusActivity.schema'
import { upcomingEventModel } from '../../schema/upcomingEvent/upcomingEvent.schema'
import { documentModel } from '../../schema/document/document.schema'
import { galleryModel } from '../../schema/gallery/gallery.schema'
import { socialLinkAndCommonImageModel } from '../../schema/socialLinkAndCommonImage/socialLinkAndCommonImage.schema'
import { optimizeImagesByModelService } from '../../services/optimizeImages/optimizeImagePathByModel.service'
import { downloadImagesByFolderService } from '../../services/optimizeImages/downloadImagesByFolder.service'
import path from 'path'
import fs from 'fs'
import { changeToCloudfarePublicPathService } from '../../services/optimizeImages/changeToCloudfarePublicPath.service'
import { teamMemberModel } from '../../schema/teamMember/teamMember.schema'
import { partnerModel } from '../../schema/partner/partner.schema'

const databaseModels = {
  news: newsModel,
  video: videoModel,
  focusActivity: focusActivityModel,
  upcomingEvent: upcomingEventModel,
  document: documentModel,
  gallery: galleryModel,
  socialLinkAndCommonImage: socialLinkAndCommonImageModel,
  teamMember: teamMemberModel,
  partner: partnerModel,
}
export const optimizeImageFileInServerController = async (
  req: Request,
  res: Response,
) => {
  try {
    const folderKey = req.params.subFolderKey
    const folderName =
      uploadSubFolder[folderKey as keyof typeof uploadSubFolder]

    if (!folderName) {
      return new ErrorResponse(404, 'Folder not found').send(res)
    }
    const result = await optimizeImagesByFolderService(folderName)
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
export const optimizeImagePathInDatabaseController = async (
  req: Request,
  res: Response,
) => {
  try {
    const modelKey = req.params.databaseModelKey
    const databaseModel =
      databaseModels[modelKey as keyof typeof databaseModels]

    if (!databaseModel) {
      return new ErrorResponse(404, 'Model not found').send(res)
    }
    const result = await optimizeImagesByModelService(databaseModel)
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
export const changeToCloudfarePublicPathController = async (
  req: Request,
  res: Response,
) => {
  try {
    const modelKey = req.params.folderKey
    const databaseModel =
      databaseModels[modelKey as keyof typeof databaseModels]

    if (!databaseModel) {
      return new ErrorResponse(404, 'Model not found').send(res)
    }
    const result = await changeToCloudfarePublicPathService(databaseModel)
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

export const downloadUploadedFileController = async (
  req: Request,
  res: Response,
) => {
  try {
    const folderKey = req.params.folderKey
    const folderName =
      uploadSubFolder[folderKey as keyof typeof uploadSubFolder]

    if (!folderName) {
      return new ErrorResponse(404, 'Check folder key').send(res)
    }

    const targetDir = path.join(__dirname, '../../../uploads', folderName)

    if (!fs.existsSync(targetDir)) {
      return new ErrorResponse(404, 'Requested folder not found').send(res)
    }
    const argObj = {
      targetDir,
      folderName,
    }
    const result = await downloadImagesByFolderService(argObj, res)
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
