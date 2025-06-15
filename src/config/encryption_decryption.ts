import crypto from 'crypto'
import { encryption_key } from '../utils/constant'

const ENCRYPTION_KEY = encryption_key!
const IV_LENGTH = 16

export const encryptData = (data: any): string => {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )

  let encrypted = cipher.update(JSON.stringify(data))
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decryptData = (encryptedData: string): any => {
  const [ivHex, encryptedTextHex] = encryptedData.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(encryptedTextHex, 'hex')

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return JSON.parse(decrypted.toString())
}
