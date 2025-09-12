import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3'
import {
  cloudfareConfig,
  currentEnv,
  testUploadsFolder,
  uploadsFolder,
} from '../utils/constant'

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${cloudfareConfig.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: cloudfareConfig?.R2_ACCESS_KEY_ID as string,
    secretAccessKey: cloudfareConfig?.R2_SECRET_ACCESS_KEY as string,
  },
})

export const uploadToR2 = async (
  file: Express.Multer.File,
  subFolder: string,
) => {
  const ext = file.mimetype === 'application/pdf' ? 'pdf' : 'webp'
  const uniqueName = `${uuidv4()}.${ext}`
  const tempPath = path.join('/tmp', uniqueName)

  if (file.mimetype.startsWith('image/')) {
    await sharp(file.buffer)
      .toFormat('webp', { quality: 80 })
      .resize({ width: 800 })
      .toFile(tempPath)
  } else {
    fs.writeFileSync(tempPath, file.buffer)
  }

  const fileBuffer = fs.readFileSync(tempPath)
  const sanitizePath = (segment: string) => segment.replace(/^\/+|\/+$/g, '')

  const folder = `${sanitizePath(currentEnv == 'prod' ? uploadsFolder : testUploadsFolder)}/${sanitizePath(subFolder)}`
  const key = `${folder}/${uniqueName}`

  // Upload to R2
  await r2Client.send(
    new PutObjectCommand({
      Bucket: cloudfareConfig.R2_BUCKET_NAME!,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }),
  )
  fs.unlinkSync(tempPath)

  const publicUrl = `${cloudfareConfig.R2_PUBLIC_URL}/${key}`

  return {
    fileName: uniqueName,
    originalName: file.originalname,
    mimeType: file.mimetype,
    serverFilePath: key,
    publicFilePath: publicUrl,
  }
}
export const deleteFromR2 = async (key: string): Promise<void> => {
  try {
    const result = await r2Client.send(
      new DeleteObjectCommand({
        Bucket: cloudfareConfig.R2_BUCKET_NAME!,
        Key: key,
      }),
    )
    console.log(`Deleted from R2: ${key}`, result)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteObjectInCloudfare = async () => {
  //here change the prefix whatevr you want to delete
  const prefix = 'uploads/newsUploads'

  const listCommand = new ListObjectsV2Command({
    Bucket: cloudfareConfig.R2_BUCKET_NAME!,
    Prefix: prefix,
  })

  const listedObjects = await r2Client.send(listCommand)

  if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
    console.log('No objects found with leading slash')
    return
  }

  const deleteCommand = new DeleteObjectsCommand({
    Bucket: cloudfareConfig.R2_BUCKET_NAME!,
    Delete: {
      Objects: listedObjects.Contents.map((obj) => ({ Key: obj.Key! })),
    },
  })

  const result = await r2Client.send(deleteCommand)
  console.log(
    `deleted ${result.Deleted?.length || 0} objects with leading slash`,
  )
}
// deleteObjectInCloudfare()
