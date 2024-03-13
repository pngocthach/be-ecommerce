import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import mongodbConnection from './helpers/initMongodb.js'
import redis from './helpers/initRedis.js'
import router from './routes/index.route.js'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

export default app