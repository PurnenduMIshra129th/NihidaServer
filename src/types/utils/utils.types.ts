import { nodeENV } from '../../utils/constant'

export type EnvKey = keyof typeof nodeENV

export interface EnvironmentConfig {
  corsEndpoints: string[]
  serverURL: string
  databaseConnectionString: string
}
