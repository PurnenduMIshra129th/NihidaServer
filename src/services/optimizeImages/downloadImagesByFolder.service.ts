import path from 'path'
import fs from 'fs'
import archiver from 'archiver'
import { sendErrorData, sendSuccessData } from '../../utils/apiResponse'
import { Response } from 'express'

interface IArgObj {
  targetDir: string
  folderName: string
}
export const downloadImagesByFolderService = async (
  argObj: IArgObj,
  res: Response,
) => {
  try {
    const { targetDir, folderName } = argObj
    const sanitizedFolderName = folderName.replace(/^\/+|\/+$/g, '')
    const zipName = `${sanitizedFolderName}-download.zip`

    // Create zip in a temp directory outside targetDir to avoid recursion
    const tempDir = path.join(path.dirname(targetDir), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    const zipPath = path.join(tempDir, zipName)

    // Check if directory exists and has files
    if (!fs.existsSync(targetDir)) {
      return sendErrorData(404, 'Directory not found')
    }

    const files = fs.readdirSync(targetDir)
    const imageFiles = files.filter((file) => {
      const filePath = path.join(targetDir, file)
      const stats = fs.statSync(filePath)
      return stats.isFile() && !file.endsWith('.zip')
    })

    if (imageFiles.length === 0) {
      return sendErrorData(404, 'No files found to download')
    }

    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    // Use Promise to handle async archiving
    const createZip = new Promise<void>((resolve, reject) => {
      output.on('close', () => {
        console.log(`Archive created with ${archive.pointer()} total bytes`)
        resolve()
      })

      output.on('error', reject)
      archive.on('error', reject)

      archive.pipe(output)

      // Add files to archive
      for (const file of imageFiles) {
        const filePath = path.join(targetDir, file)
        const stats = fs.statSync(filePath)
        console.log(
          `Adding file: ${file} (${(stats.size / 1024).toFixed(2)} KB)`,
        )
        archive.file(filePath, { name: file })
      }

      archive.finalize()
    })

    await createZip

    // Now download the file
    const stats = fs.statSync(zipPath)
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
    console.log(`Zip file size: ${sizeInMB} MB`)

    // Download and cleanup
    res.download(zipPath, zipName, (err) => {
      // Always cleanup temp file
      fs.unlink(zipPath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting temp zip:', unlinkErr)
      })

      // Try to cleanup temp directory if empty
      fs.rmdir(tempDir, (rmdirErr) => {
        // Ignore error if directory is not empty
        console.log(rmdirErr)
      })

      if (err) {
        console.error('Download error:', err)
      } else {
        console.log('Images downloaded successfully', { zipName, sizeInMB })
        return sendSuccessData('Images downloaded successfully', {
          zipName,
          sizeInMB,
        })
      }
    })
  } catch (error) {
    console.error('Service error:', error)
    return sendErrorData(500, error)
  }
}
