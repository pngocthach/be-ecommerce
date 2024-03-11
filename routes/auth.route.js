import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'
import { authSchema } from '../helpers/validationSchema.js'
import { signAccessToken } from '../helpers/jwtHelper.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body)

    const user = await User.findOne({ email })
    if (!user) throw createError.NotFound('user not register')

    if (! await user.isValidPassword(password)) throw createError.Unauthorized('password not valid')

    const accessToken = await signAccessToken(user._id.toString())

    res.send({ accessToken })
  } catch (err) {
    if (err.isJoi) err.status = 400
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body)

    const isExisted = await User.findOne({ email })
    if (isExisted) throw createError.Conflict(`${email} is already existed`)
    const user = await User.create({ email, password })
    const accessToken = await signAccessToken(user._id.toString())

    res.send(jwt.verify(accessToken, 'super secret'))

  } catch (err) {
    if (err.isJoi) err.status = 422
    next(err)
  }
})

router.post('/refresh-token', async (req, res, next) => {
  res.send('register')
})

router.delete('/logout', async (req, res, next) => {
  res.send('register')
})


export default router