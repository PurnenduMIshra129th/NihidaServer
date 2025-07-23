import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { deleteFileIfExists, getImageMetadata } from '../../utils/utils'

const allowedExtensions = ['.jpg', '.jpeg', '.png']

export const optimizeImagesByFolderService = async (subFolder: string) => {
  try {
    const folderPath = path.join(__dirname, '../../../uploads', subFolder)
    const files = fs.readdirSync(folderPath)

    const optimizedImages: any[] = []
    const failedImages: any[] = []

    for (const fileName of files) {
      const ext = path.extname(fileName).toLowerCase()
      if (allowedExtensions.includes(ext)) {
        const baseName = path.basename(fileName, ext)
        const inputPath = path.join(folderPath, fileName)
        const outputName = `${baseName}.webp`
        const outputPath = path.join(folderPath, outputName)

        try {
          const preMeta = await getImageMetadata(inputPath)

          await sharp(inputPath)
            .resize({ width: 800 })
            .toFormat('webp', { quality: 60 })
            .toFile(outputPath)

          const postMeta = await getImageMetadata(outputPath)
          deleteFileIfExists(inputPath)
          optimizedImages.push({
            original: { ...preMeta, fileName },
            optimized: { ...postMeta, fileName: outputName },
          })
        } catch (error) {
          failedImages.push({
            fileName,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      } else {
        continue
      }
    }

    return sendSuccessData('Image optimization complete', {
      optimizedImages,
      failedImages,
    })
  } catch (error) {
    return sendErrorData(500, error)
  }
}
