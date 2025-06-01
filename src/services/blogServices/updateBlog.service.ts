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
    const { id, heading, description, file } = data

    const blog = await createBlogModel.findById(id)
    if (!blog) {
      return sendErrorData(404, 'blog not found')
    }
    if (heading) blog.heading = heading
    if (description) blog.description = description

    if (file) {
      const localFilePath = getLocalFilePath(
        uploadSubFolder.blogDir,
        blog.imagePath,
      )
      deleteFileIfExists(localFilePath)
      blog.imagePath = constructImagePath(uploadSubFolder.blogDir, file)
    }

    await blog.save()
    return sendSuccessData('Blog updated successfully', blog)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
