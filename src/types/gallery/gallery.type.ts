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
  date: string // ISO string format (e.g., '2025-07-05T00:00:00Z')
  visibility: 'public' | 'internal'
  tags?: string[]
  highlighted?: boolean
  uploadedBy?: string // MongoDB ObjectId as string
}

export interface IUpdateGallery extends ICreateGallery {
  id: string
}

export interface IDeleteGallery {
  id: string
}
