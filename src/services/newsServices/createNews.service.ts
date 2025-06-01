import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { constructImagePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'
import { ICreateNews } from '../../types/newsTypes/news.type'
import { createNewsModel } from '../../models/newsModels/createNews.model'

export const createNewsService = async (data: ICreateNews) => {
  try {
    const { heading, description, file } = data

    const imageUrl = constructImagePath(uploadSubFolder.newsDir, file)
    const news = new createNewsModel({
      heading: heading,
      description: description,
      imagePath: imageUrl,
    })

    await news.save()
    return sendSuccessData('News created successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
