import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { IDeleteBlog } from '../../types/blogTypes/blog.type'
import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { deleteFileIfExists, getLocalFilePath } from '../../utils/utils'
import { uploadSubFolder } from '../../utils/constant'

export const deleteBlogService = async (data: IDeleteBlog) => {
  try {
    const { id } = data

    // Validate input
    if (!id) {
      return sendErrorData(400, 'Blog ID is required')
    }

    // Find the blog document
    const blog = await createBlogModel.findById(id)
    if (!blog) {
      return sendErrorData(404, 'Blog not found')
    }

    // Store file path before deletion for cleanup
    const imagePath = blog.imagePath

    // Delete from database first
    await createBlogModel.findByIdAndDelete(id)

    if (imagePath) {
      const localFilePath = getLocalFilePath(uploadSubFolder.blogDir, imagePath)
      deleteFileIfExists(localFilePath)
    }

    return sendSuccessData('Blog deleted successfully', blog)
  } catch (error) {
    console.error('Delete blog service error:', error)
    return sendErrorData(
      500,
      'Internal server error occurred while deleting blog',
    )
  }
}
