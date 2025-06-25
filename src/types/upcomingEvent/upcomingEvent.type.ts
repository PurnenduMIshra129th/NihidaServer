export interface ICreateUpcomingEvent {
  title: string
  subtitle?: string
  description: string
  date: string
  location: string
  tags?: string[]
  cta?: {
    label?: string
    url?: string
  }
  impactGoals?: string[]
  contactPerson?: {
    name?: string
    phone?: string
    email?: string
  }
  createdBy?: string
  status?: 'upcoming' | 'ongoing' | 'closed'
}
export interface IUpdateUpcomingEvent extends ICreateUpcomingEvent {
  id: string
}
export interface IDeleteUpcomingEvent {
  id: string
}
