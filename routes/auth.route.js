import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'
import { authSchema } from '../helpers/validationSchema.js'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  res.send('register')
})

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = await authSchema.validateAsync(req.body)

    const isExisted = await User.findOne({ email })
    if (isExisted) throw createError.Conflict(`${email} is already existed`)
    const user = await User.create({ email, password })
    res.send(user)

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