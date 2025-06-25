import mongoose from 'mongoose'
import { newsModel } from '../../schema/news/news.schema'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IUpdateNews } from '../../types/news/news.type'

export const updateNewsService = async (data: IUpdateNews) => {
  try {
    const {
      id,
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

    const news = await newsModel.findById(id)
    if (!news) {
      return sendErrorData(404, 'news not found')
    }
    if (title) news.title = title
    if (summary) news.summary = summary
    if (content) news.content = content
    if (source) news.source = source
    if (url) news.url = url
    if (category) news.category = category
    if (date) news.date = new Date(date)
    if (tags) news.tags = tags
    if (visibility) news.visibility = visibility
    if (createdBy) news.createdBy = new mongoose.Types.ObjectId(createdBy)

    await news.save()
    return sendSuccessData('News updated successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
