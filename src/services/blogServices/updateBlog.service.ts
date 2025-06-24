import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { IUpdateBlog } from '../../types/blogTypes/blog.type'
import { createBlogModel } from '../../models/blogModels/createBlog.model'
import {
  constructImagePath,
  deleteFileIfExists,
  getLocalFilePath,
} from '../../utils/utils'

export const updateBlogService = async (data: IUpdateBlog) => {
  try {
    const { id, heading, description, filePaths } = data

    const blog = await createBlogModel.findById(id)
    if (!blog) {
      return sendErrorData(404, 'blog not found')
    }
    if (heading) blog.heading = heading
    if (description) blog.description = description
    if (filePaths && filePaths.length > 0) {
      const oldFilePaths = blog.imagePaths || []
      const localPaths = oldFilePaths.map((storedPath: string) =>
        getLocalFilePath(uploadSubFolder.blogDir, storedPath),
      )
      for (const path of localPaths) {
        deleteFileIfExists(path)
      }
      const newImagePaths = filePaths.map((file: string) =>
        constructImagePath(uploadSubFolder.blogDir, file),
      )
      blog.imagePaths = newImagePaths
    }

    await blog.save()
    return sendSuccessData('Blog updated successfully', blog)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
