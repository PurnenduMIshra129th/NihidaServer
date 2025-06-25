import { nodeENV } from '../../utils/constant'

export type EnvKey = keyof typeof nodeENV

export interface EnvironmentConfig {
  corsEndpoints: string[]
  serverURL: string
  databaseConnectionString: string
}
export interface IFile {
  _id: string
  fileName: string
  originalName: string
  mimeType: string
  serverFilePath: string
  publicFilePath: string
}
