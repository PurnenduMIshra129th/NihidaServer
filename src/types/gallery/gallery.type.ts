export interface ICreateGallery {
  title: string
  category:
    | 'event'
    | 'impact'
    | 'volunteer'
    | 'daily-life'
    | 'community'
    | 'other'
  description?: string
  date: string
  visibility: 'public' | 'internal'
  tags?: string[]
  highlighted?: boolean
  uploadedBy?: string
}

export interface IUpdateGallery extends ICreateGallery {
  id: string
}

export interface IDeleteGallery {
  id: string
}
