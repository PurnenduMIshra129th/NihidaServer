export interface IUpdateVideo extends ICreateVideo {
  id: string
}
export interface ICreateVideo {
  title: string
  description?: string
  youtubeUrl: string
  category:
    | 'testimonial'
    | 'project'
    | 'awareness'
    | 'media'
    | 'event'
    | 'other'
  date: string
  visibility: 'public' | 'internal'
  tags?: string[]
  highlighted?: boolean
  uploadedBy?: string
}
export interface IDeleteVideo {
  id: string
}
