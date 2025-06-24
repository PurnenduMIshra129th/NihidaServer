import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import uploadMiddleware from '../../middlewares/upload.middleware'
import {
  createBlogController,
  deleteBlogController,
  deleteBlogImageController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  updateBlogImageController,
} from '../../controllers/blogController/blog.controller'
import { createBlogDTO } from '../../dto/blogDTO/createBlog.dto'
import { uploadSubFolder } from '../../utils/constant'
import { deleteBlogImageDTO } from '../../dto/blogDTO/deleteBlogImage.dto'
import { updateBlogImageDTO } from '../../dto/blogDTO/updateBlogImage.dto'
const blogRouter = Router()

blogRouter.post(
  '/createBlog',
  uploadMiddleware(uploadSubFolder.blogDir, true),
  validateInputs(createBlogDTO),
  createBlogController,
)
blogRouter.post(
  '/updateBlog/:id',
  uploadMiddleware(uploadSubFolder.blogDir, true),
  validateInputs(createBlogDTO),
  updateBlogController,
)

blogRouter.patch(
  '/updateImage/:id',
  uploadMiddleware(uploadSubFolder.blogDir, false, 'image'),
  validateInputs(updateBlogImageDTO),
  updateBlogImageController,
)

blogRouter.delete(
  '/deleteImage/:id',
  validateInputs(deleteBlogImageDTO),
  deleteBlogImageController,
)

blogRouter.delete('/deleteBlog/:id', deleteBlogController)

blogRouter.get('/getAllBlog', getAllBlogsController)

blogRouter.get('/getBlogById/:id', getBlogByIdController)

export default blogRouter
