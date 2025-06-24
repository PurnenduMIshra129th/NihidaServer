import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { IDeleteBlogImage } from '../../types/blogTypes/blog.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import { getLocalFilePath, deleteFileIfExists } from '../../utils/utils'

export const deleteBlogImageService = async (data: IDeleteBlogImage) => {
  try {
    const { id, imagePath } = data
    const blog = await createBlogModel.findById(id)
    if (!blog) return sendErrorData(404, 'Blog not found')

    const matchIndex = blog.imagePaths.findIndex((img) =>
      img.includes(imagePath),
    )
    if (matchIndex === -1)
      return sendErrorData(
        404,
        'Image you want to delete not match with stored images',
      )
    const localPath = getLocalFilePath(uploadSubFolder.blogDir, imagePath)
    deleteFileIfExists(localPath)

    blog.imagePaths.splice(matchIndex, 1)
    await blog.save()

    return sendSuccessData('Blog image deleted successfully', blog)
  } catch (err) {
    return sendErrorData(500, err)
  }
}
