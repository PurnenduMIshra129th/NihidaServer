export interface IUpdateBlog {
  id: string
  heading: string
  description: string
  file?: string
}
export interface ICreateBlog {
  heading: string
  description: string
  file?: string
}
export interface IDeleteBlog {
  id: string
}
