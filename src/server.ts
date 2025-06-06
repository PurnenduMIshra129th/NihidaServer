import express from 'express'
import dbConnect from './config/db'
import indexRouter from './routes/indexRouter'
import logMiddleware from './middlewares/logger.middleware'
import cors from 'cors'

const app = express()
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use(logMiddleware)
app.use(
  cors({
    origin: ['http://localhost:5000', 'https://nihidafrontend.onrender.com'],
  }),
)
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Nihida API is running')
})

dbConnect()
app.use('/api', indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
