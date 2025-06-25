import express from 'express'
import dbConnect from './config/db'
import indexRouter from './routes/index.route'
import logMiddleware from './middlewares/logger.middleware'
import cors from 'cors'
import { authMiddleware } from './middlewares/auth.middleware'
import { baseUrl, currentEnv, port } from './utils/constant'
import { adminMiddleware } from './middlewares/admin.middleware'
import { getEnvValue } from './utils/utils'
import { initializeAdmin } from './config/authentication'
import { ErrorResponse } from './utils/apiResponse'

const app = express()
const corsTargetEndpoint = getEnvValue(currentEnv, 'corsEndpoints')
app.use(
  cors({
    origin: corsTargetEndpoint,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)
app.use(logMiddleware)

app.use('/uploads', express.static('uploads'))
app.use(authMiddleware)
app.use(adminMiddleware)
app.use(express.json())
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Nihida API is running')
})

dbConnect()
initializeAdmin()
app.use(baseUrl, indexRouter)
app.use((req, res) => {
  return new ErrorResponse(
    404,
    `Route ${req.method} ${req.originalUrl} not found`,
  ).send(res)
})

const PORT = port
app.listen(PORT, () => {
  console.log('Current environment:', currentEnv)
  console.log(`Server is running in port:${PORT}`)
})
