import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { IDeleteNews } from '../../types/newsTypes/news.type'
import { createNewsModel } from '../../models/newsModels/createNews.model'

export const deleteNewsService = async (data: IDeleteNews) => {
  try {
    const { id } = data

    if (!id) {
      return sendErrorData(400, 'News ID is required')
    }

    const news = await createNewsModel.findById(id)
    if (!news) {
      return sendErrorData(404, 'News not found')
    }

    const imagePath = news.imagePath

    await createNewsModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(uploadSubFolder.newsDir, imagePath)
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData('News deleted successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
