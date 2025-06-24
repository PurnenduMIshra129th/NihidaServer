export interface IImpactStat {
  label?: string
  value?: number
  unit?: string
}

export interface ITestimonial {
  name?: string
  quote?: string
  role?: string
}

export interface ICreateFocusActivity {
  title: string
  subtitle: string
  description: string
  impactStats: IImpactStat[]
  testimonials?: ITestimonial[]
  location?: string
  date?: string | Date
}
export interface IUpdateFocusActivity {
  id: string
  title?: string
  subtitle?: string
  description?: string
  impactStats?: IImpactStat[]
  testimonials?: ITestimonial[]
  location?: string
  date?: string | Date
}
export interface IUpdateFocusActivityImage {
  id: string
  oldImagePath: string
  newImagePath: string
}
export interface IDeleteFocusActivityImage {
  id: string
  imagePath: string
}
export interface IDeleteFocusActivity {
  id: string
}
