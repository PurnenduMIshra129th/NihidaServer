export interface IUpdateNews extends ICreateNews {
  id: string
}
export interface ICreateNews {
  title: string
  summary: string
  content: string
  source?: string
  url?: string
  category: 'press-release' | 'impact' | 'announcement' | 'event' | 'other'
  date: string
  tags?: string[]
  visibility: 'public' | 'internal'
  createdBy?: string
}
export interface IDeleteNews {
  id: string
}
