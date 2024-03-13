import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import redis from './initRedis.js'

export function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '5m',
    }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message)
        reject(createError.InternalServerError())
      }
      resolve(token)
    })
  })
}

export function verifyAccessToken(req, res, next) {
  if (!req.headers.authorization) return next(createError.Unauthorized())
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const errMess = err.name === 'JsonWebTokenError' ? null : err.message
      return next(createError.Unauthorized(errMess))
    }
    req.payload = payload
    next()
  })
}

export function signRefreshToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.REFRESH_TOKEN_SECRET
    const options = {
      expiresIn: '1y',
    }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message)
        reject(createError.InternalServerError())
      }

      try {
        redis.SET(userId, token, { EX: 60 * 60 * 24 * 365 })
      } catch (error) {
        console.error(err.message)
        reject(createError.InternalServerError())
      }

      resolve(token)
    })
  })
}

export function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        console.log(err.message)
        reject(createError.Unauthorized())
      }

      else {
        const { userId } = payload
        try {
          const redisRt = await redis.get(userId)
          if (redisRt === refreshToken) {
            return resolve(userId)
          }
          reject(createError.Unauthorized())
        } catch (error) {
          console.error(err.message)
          reject(createError.InternalServerError())
        }
      }
    })
  })
}