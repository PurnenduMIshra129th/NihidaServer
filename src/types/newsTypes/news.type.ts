export interface IUpdateNews {
  id: string
  heading: string
  description: string
  file?: string
}
export interface ICreateNews {
  heading: string
  description: string
  file?: string
}
export interface IDeleteNews {
  id: string
}
