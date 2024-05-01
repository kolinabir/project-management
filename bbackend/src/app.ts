import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './routes'
// import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import router from './app/routes'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
