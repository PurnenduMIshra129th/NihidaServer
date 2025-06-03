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
    origin: ['http://localhost:5000 , https://nihidafrontend.onrender.com'],
  }),
)
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://nihidafrontend.onrender.com',
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World')
})

app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

dbConnect()
app.use('/api', indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
