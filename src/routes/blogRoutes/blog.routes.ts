import { Router } from 'express'
import validateInputs from '../../middlewares/validation.middleware'
import uploadMiddleware from '../../middlewares/upload.middleware'
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
} from '../../controllers/blogController/blog.controller'
import { createBlogDTO } from '../../dto/blogDTO/createBlog.dto'
import { uploadSubFolder } from '../../utils/constant'
const blogRouter = Router()

blogRouter.post(
  '/createBlog',
  uploadMiddleware(uploadSubFolder.blogDir),
  validateInputs(createBlogDTO),
  createBlogController,
)
blogRouter.post(
  '/updateBlog/:id',
  uploadMiddleware(uploadSubFolder.blogDir),
  validateInputs(createBlogDTO),
  updateBlogController,
)
blogRouter.delete('/deleteBlog/:id', deleteBlogController)

blogRouter.get('/getAllBlog', getAllBlogsController)

blogRouter.get('/getBlogById/:id', getBlogByIdController)

export default blogRouter
