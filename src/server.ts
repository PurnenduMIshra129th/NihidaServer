import express from 'express'
import dbConnect from './config/db'
import indexRouter from './routes/indexRouter'
import logMiddleware from './middlewares/logger.middleware'
import cors from 'cors'
import { authMiddleware } from './middlewares/auth.middleware'
import { baseUrl, currentEnv, port } from './utils/constant'
import { adminMiddleware } from './middlewares/admin.middleware'
import { getCorsTargetEndpoint } from './utils/utils'

const app = express()
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(
  cors({
    origin: getCorsTargetEndpoint(currentEnv),
  }),
)
app.use(logMiddleware)
app.use(authMiddleware)
app.use(adminMiddleware)
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Nihida API is running')
})

dbConnect()
app.use(baseUrl, indexRouter)

const PORT = port
app.listen(PORT, () => {
  console.log(`Server is running in port:${PORT}`)
})
