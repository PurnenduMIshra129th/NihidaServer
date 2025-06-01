export interface IUpdateMedia {
  id: string
  heading: string
  description: string
  file?: string
}
export interface ICreateMedia {
  heading: string
  description: string
  file?: string
}
export interface IDeleteMedia {
  id: string
}
