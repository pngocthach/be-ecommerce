import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  res.send('register')
})

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw createError.BadRequest()

    const isExisted = await User.findOne({ email })
    if (isExisted) throw createError.Conflict(`${email} is already existed`)
    const user = await User.create({ email, password })
    res.send(user)

  } catch (err) {
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