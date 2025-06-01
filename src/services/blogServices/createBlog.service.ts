import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { ICreateBlog } from '../../types/blogTypes/blog.type'
import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { constructImagePath } from '../../utils/utils'

export const createBlogService = async (data: ICreateBlog) => {
  try {
    const { heading, description, file } = data

    const imageUrl = constructImagePath(uploadSubFolder.blogDir, file)
    const Blog = new createBlogModel({
      heading: heading,
      description: description,
      imagePath: imageUrl,
    })

    await Blog.save()
    return sendSuccessData('Blog created successfully', Blog)
  } catch (error) {
    return sendErrorData(500, error)
  }
}
