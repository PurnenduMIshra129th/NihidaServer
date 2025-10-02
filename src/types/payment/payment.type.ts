export interface ICreatePayment {
  metadata: {
    [key: string]: string
  }
  currency: string
  amount: number
  name: string
  email: string
  message?: string
  billingName: string
  billingAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}
export interface IGetPaymentByID {
  id: string
}
export interface IUpdatePaymentByID {
  id: string
  status:
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'requires_capture'
    | 'canceled'
    | 'succeeded'
}
export interface IStripeWebHook {
  sig: string | string[]
  endpointSecret: string
  body: any
}
