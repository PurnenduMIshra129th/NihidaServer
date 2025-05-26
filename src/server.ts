import * as express from 'express'
import dbConnect from './config/db'
import indexRouter from './routes'
import logMiddleware from './middlewares/logger.middleware'
const app = express()
app.use(express.json())
app.use(logMiddleware)
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
