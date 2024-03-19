import { verifyAccessToken } from '../helpers/jwtHelper'
import authRoute from './auth.route'
import userRoute from './user.route'
import express from 'express'

const router = express.Router()

router.get('/home', verifyAccessToken, async (req, res) => {
  console.log(req.headers.authorization)
  res.send('hello')
})

router.use('/auth', authRoute)

router.use('/api', userRoute)

export default router
