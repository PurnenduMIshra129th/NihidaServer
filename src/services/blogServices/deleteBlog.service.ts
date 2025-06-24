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
    const imagePaths = blog.imagePaths

    // Delete from database first
    await createBlogModel.findByIdAndDelete(id)

    if (imagePaths && imagePaths.length > 0) {
      const localPaths = imagePaths.map((storedPath: string) =>
        getLocalFilePath(uploadSubFolder.blogDir, storedPath),
      )
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
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
