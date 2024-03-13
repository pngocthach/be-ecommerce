import { verifyAccessToken } from '../helpers/jwtHelper.js'
import authRoute from './auth.route.js'
import express from 'express'

const router = express.Router()

router.get('/home', verifyAccessToken, async (req, res, next) => {
  console.log(req.headers.authorization)
  res.send('hello')
})

router.use('/auth', authRoute)

router.use(async (req, res, next) => {
  next(createError.NotFound('this route does not exit'))
})

router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

export default router