import { createBlogModel } from '../../models/blogModels/createBlog.model'
import { IUpdateBlogImage } from '../../types/blogTypes/blog.type'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { uploadSubFolder } from '../../utils/constant'
import {
  getLocalFilePath,
  deleteFileIfExists,
  constructImagePath,
} from '../../utils/utils'

export const updateBlogImageService = async (data: IUpdateBlogImage) => {
  try {
    const { id, oldImagePath, newImagePath } = data
    const blog = await createBlogModel.findById(id)
    if (!blog) return sendErrorData(404, 'Blog not found')

    const oldIndex = blog.imagePaths.findIndex((img) =>
      img.includes(oldImagePath),
    )
    if (oldIndex === -1) return sendErrorData(404, 'Target image not found')

    const localOldPath = getLocalFilePath(uploadSubFolder.blogDir, oldImagePath)
    deleteFileIfExists(localOldPath)

    const constructedImagePath = constructImagePath(
      uploadSubFolder.blogDir,
      newImagePath,
    )
    blog.imagePaths[oldIndex] = constructedImagePath

    await blog.save()
    return sendSuccessData('Blog image updated successfully', blog)
  } catch (err) {
    return sendErrorData(500, err)
  }
}
