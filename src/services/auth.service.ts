import createError from 'http-errors'
import User from '../models/user.model'
import { authSchema } from '../helpers/validationSchema'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../helpers/jwtHelper.js'
import redis from '../helpers/initRedis.js'

interface Account { email: string, password: string }

const signTokens = async (userId: string) => {
  const accessToken = await signAccessToken(userId)
  const refreshToken = await signRefreshToken(userId)

  return { accessToken, refreshToken }
}

export default {
  login: async (account: Account) => {
    const { email, password } = await authSchema.validateAsync(account)

    const user = await User.findOne({ email })
    if (!user) throw createError.NotFound('user not register')

    if (!(await user.isValidPassword(password)))
      throw createError.Unauthorized('password not valid')

    return await signTokens(user._id.toString())
  },

  register: async (account: Account) => {
    const { email, password } = account

    const isExisted = await User.findOne({ email })
    if (isExisted) throw createError.Conflict(`${email} is already existed`)
    const user = await User.create({ email, password })

    return await signTokens(user._id.toString())
  },

  refreshToken: async (refreshToken: string) => {
    const userId = await verifyRefreshToken(refreshToken)
    return await signTokens(userId)
  },

  logout: async (refreshToken: string) => {
    const userId = await verifyRefreshToken(refreshToken)
    await redis.del(userId)
  },
}
