import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { ICreateBlog } from '../../types/blogTypes/blog.type'
import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { constructImagePath } from '../../utils/utils'

export const createBlogService = async (data: ICreateBlog) => {
  try {
    const { heading, description, files } = data
    if (!Array.isArray(files) || files.length === 0) {
      return sendErrorData(400, 'Image files are required')
    }
    const imagePaths = files.map((file) =>
      constructImagePath(uploadSubFolder.blogDir, file.filename),
    )
    const Blog = new createBlogModel({
      heading: heading,
      description: description,
      imagePaths: imagePaths,
    })

    await Blog.save()
    return sendSuccessData('Blog created successfully', Blog)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
