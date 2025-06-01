export interface IUpdateProductAndService {
  id: string
  heading: string
  description: string
  file?: string
}
export interface ICreateProductAndService {
  heading: string
  description: string
  file?: string
}
export interface IDeleteProductAndService {
  id: string
}
