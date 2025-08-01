export interface IUpdatePartner extends ICreatePartner {
  id: string
}
export interface ICreatePartner {
  name: string
  description: string
  website?: string
  type: 'funder' | 'collaborator' | 'institutional' | 'community' | 'strategic'
  focusAreas?: string[]
  visibility?: 'public' | 'internal'

  contactPerson?: {
    name?: string
    email?: string
    phone?: string
  }

  partnershipStart?: string // ISO8601 date
  partnershipEnd?: string

  tags?: string[]
  createdBy?: string // Mongo ObjectId as string
}
export interface IDeletePartner {
  id: string
}
