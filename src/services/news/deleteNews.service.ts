import { newsModel } from '../../schema/news/news.schema'
import { IDeleteNews } from '../../types/news/news.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists } from '../../utils/utils'

export const deleteNewsService = async (data: IDeleteNews) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'News ID is required')
    }

    // Find the news document
    const news = await newsModel.findById(id)
    if (!news) {
      return sendErrorData(404, 'News not found')
    }

    // Store file path before deletion for cleanup
    const files = news.files

    // Delete from database first
    await newsModel.findByIdAndDelete(id)

    if (files && files.length > 0) {
      const localPaths = files.map((file) => file.serverFilePath)
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
    }
    return sendSuccessData('News deleted successfully', news)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
