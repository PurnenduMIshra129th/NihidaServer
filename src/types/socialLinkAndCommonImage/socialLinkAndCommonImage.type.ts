export interface IUpdateSocialLinkAndCommonImage
  extends ICreateSocialLinkAndCommonImage {
  id: string
}
export interface ICreateSocialLinkAndCommonImage {
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  youtubeUrl: string
  whatsappUrl: string
  telegramUrl: string
  phoneNumber1: string
  phoneNumber2: string
  email: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  country: string
  postalCode: string
}
export interface IDeleteSocialLinkAndCommonImage {
  id: string
}
