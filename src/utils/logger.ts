import * as fs from 'fs'
import moment from 'moment'
import * as path from 'path'

class Logger {
  static localTime = moment
    .utc()
    .add(330, 'minutes')
    .format('YYYY-MM-DD HH:mm:ss')
  private static ensureDirectories(): void {
    const logDir = path.join(__dirname, '../../logs')
    const successDir = path.join(logDir, './successLog')
    const errorDir = path.join(logDir, './errorLog')
    const requestDir = path.join(logDir, './requestLog')

    ;[logDir, successDir, errorDir, requestDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
    })
  }

  private static getLogFilePath(type: 'success' | 'error' | 'request'): string {
    this.ensureDirectories()

    const date = moment.utc().add(330, 'minutes').format('YYYY-MM-DD')
    const folder =
      type === 'success'
        ? 'successLog'
        : type === 'error'
          ? 'errorLog'
          : 'requestLog'

    const filePath = path.join(
      __dirname,
      `../../logs/${folder}/${date}-${folder}.log`,
    )

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '')
    }

    return filePath
  }

  static logRequest(req: any) {
    const logMessage = `[${this.localTime}] REQUEST: ${req.method} ${req.url} | Headers: ${JSON.stringify(req.headers)} | Body: ${JSON.stringify(req.body)}\n`
    fs.appendFileSync(this.getLogFilePath('request'), logMessage)
  }

  static logSuccess(message: string, data: any) {
    const logMessage = `[${this.localTime}] SUCCESS: Message: ${message} | Data: ${JSON.stringify(data)}\n`
    fs.appendFileSync(this.getLogFilePath('success'), logMessage)
  }

  static logError(errorCode: number, errorMessage: string, error?: any) {
    const logMessage = `[${this.localTime}] ERROR: Code: ${errorCode} | Message: ${errorMessage} | Details: ${JSON.stringify(error)}\n`
    fs.appendFileSync(this.getLogFilePath('error'), logMessage)
  }
}

export default Logger
