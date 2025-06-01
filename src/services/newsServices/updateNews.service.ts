import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'
import { IUpdateNews } from '../../types/newsTypes/news.type'
import { createNewsModel } from '../../models/newsModels/createNews.model'

export const updateNewsService = async (data: IUpdateNews) => {
  try {
    const { id, heading, description, file } = data

    const news = await createNewsModel.findById(id)
    if (!news) {
      return sendErrorData(404, 'News not found')
    }
    if (heading) news.heading = heading
    if (description) news.description = description

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.newsDir,
        news.imagePath,
      )
      deleteFileIfExists(localFilePath)
      news.imagePath = constructImagePath(uploadSubFolder.newsDir, file)
    }

    await news.save()
    return sendSuccessData('News updated successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
