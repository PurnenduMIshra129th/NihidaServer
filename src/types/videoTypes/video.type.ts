export interface IUpdateVideo {
  id: string
  heading: string
  description: string
  videoUrl?: string
  file?: string
}
export interface ICreateVideo {
  heading: string
  description: string
  videoUrl?: string
  file?: string
}
export interface IDeleteVideo {
  id: string
}
