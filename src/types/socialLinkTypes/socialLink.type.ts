export interface IUpdateSocialLink {
  id: string
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  whatsappUrl?: string
  telegramUrl?: string
  phoneNumber1?: string
  phoneNumber2?: string
}
export interface ICreateSocialLink {
  instagramUrl: string
  facebookUrl: string
  twitterUrl: string
  linkedinUrl: string
  youtubeUrl: string
  whatsappUrl: string
  telegramUrl: string
  phoneNumber1: string
  phoneNumber2: string
}
export interface IDeleteSocialLink {
  id: string
}
