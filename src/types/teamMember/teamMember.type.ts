export interface IUpdateTeamMember extends ICreateTeamMember {
  id: string
}
export interface ICreateTeamMember {
  name: string
  designation: string
  bio: string

  contact?: {
    email?: string
    phone?: string
  }

  socials?: {
    linkedin?: string
    twitter?: string
  }

  focusArea: 'education' | 'health' | 'environment' | 'livelihood' | 'other'
  dateJoined: string // ISO date string

  tags?: string[]
  visibility: 'public' | 'internal'
  createdBy?: string // MongoDB ObjectId as string
}
export interface IDeleteTeamMember {
  id: string
}
