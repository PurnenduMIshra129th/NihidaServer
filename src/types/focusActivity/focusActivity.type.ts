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
  fromDate: Date
  toDate: Date
}
export interface IUpdateFocusActivity extends ICreateFocusActivity {
  id: string
}
export interface IDeleteFocusActivity {
  id: string
}
