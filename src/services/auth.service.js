import authService from '../services/auth.service.js'
import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'
import { authSchema } from '../helpers/validationSchema.js'
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../helpers/jwtHelper.js'
import redis from '../helpers/initRedis.js'
import authController from '../controllers/auth.controller.js'

const signTokens = async (userId) => {
  const accessToken = await signAccessToken(userId)
  const refreshToken = await signRefreshToken(userId)

  return { accessToken, refreshToken }
}

export default {
  login: async (account) => {
    const { email, password } = await authSchema.validateAsync(account)

    const user = await User.findOne({ email })
    if (!user) throw createError.NotFound('user not register')

    if (! await user.isValidPassword(password)) throw createError.Unauthorized('password not valid')

    return await signTokens(user._id.toString())
  },

  register: async (account) => {
    const { email, password } = await authSchema.validateAsync(account)

    const isExisted = await User.findOne({ email })
    if (isExisted) throw createError.Conflict(`${email} is already existed`)
    const user = await User.create({ email, password })

    return await signTokens(user._id.toString())
  },

  refreshToken: async (refreshToken) => {
    const userId = await verifyRefreshToken(refreshToken)
    return await signTokens(userId)
  },

  logout: async (refreshToken) => {
    const userId = await verifyRefreshToken(refreshToken)
    await redis.del(userId)
  }
}