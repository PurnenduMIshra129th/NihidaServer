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

  partnershipStart?: string
  partnershipEnd?: string

  tags?: string[]
  createdBy?: string
}
export interface IDeletePartner {
  id: string
}
