export interface ICreateDocument {
  title: string
  type:
    | 'certificate'
    | 'recognition'
    | 'legal'
    | 'media'
    | 'annual-report'
    | 'other'
  description?: string
  issuedBy?: string
  issueDate?: string
  expiresAt?: string
  visibility: 'public' | 'internal'
  tags?: string[]
  highlighted?: boolean
  createdBy?: string
}
export interface IUpdateDocument extends ICreateDocument {
  id: string
}
export interface IDeleteDocument {
  id: string
}
