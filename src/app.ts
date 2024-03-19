import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import './helpers/initMongodb'
import './helpers/initRedis'
import router from './routes/index.route'
import 'express-async-errors'
import errorRoute from './middlewares/error.middleware'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.use(errorRoute.notFound)
app.use(errorRoute.catchAllError)

export default app