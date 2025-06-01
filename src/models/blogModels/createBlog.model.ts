import mongoose from 'mongoose'
import { createBlogSchema } from '../../schema/blogSchema/createBlog.schema'

export const createBlogModel = mongoose.model('Blog', createBlogSchema)
