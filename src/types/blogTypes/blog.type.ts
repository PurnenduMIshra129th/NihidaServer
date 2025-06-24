export interface IUpdateBlog {
  id: string
  heading: string
  description: string
  filePaths?: string[]
}
export interface IUpdateBlogImage {
  id: string
  oldImagePath: string
  newImagePath: string
}
export interface IDeleteBlogImage {
  id: string
  imagePath: string
}
export interface ICreateBlog {
  heading: string
  description: string
  files?: Express.Multer.File[]
}
export interface IDeleteBlog {
  id: string
}
