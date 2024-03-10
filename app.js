import express from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import 'dotenv/config'
import authRoute from './routes/auth.route.js'
import databaseConnection from './helpers/initMongodb.js'
import mongoose from 'mongoose'

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT | 5000

app.get('/', async (req, res, next) => {
  res.send('hello')
})

app.use('/auth', authRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound('this route does not exit'))
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()

  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})