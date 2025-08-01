export interface ICreateContactUs {
  fullName: string

  email: string

  phone?: string

  message: string

  subject?: string

  type?: 'volunteer' | 'donation' | 'partnership' | 'general' | 'feedback'

  responded?: boolean

  createdBy?: string // Should be a valid MongoDB ObjectId string
}
export interface IUpdateContactUs extends ICreateContactUs {
  id: string
}
export interface IDeleteContactUs {
  id: string
}
