import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { ICreateNews } from '../../types/news/news.type'
import { newsModel } from '../../schema/news/news.schema'

export const createNewsService = async (data: ICreateNews) => {
  try {
    const {
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    } = data

    const news = new newsModel({
      title,
      summary,
      content,
      source,
      url,
      category,
      date,
      tags,
      visibility,
      createdBy,
    })

    await news.save()
    return sendSuccessData('News created successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
