import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = process.env.ACCESS_TOKEN_SECRET
    const options = {
      expiresIn: '15s',
      audience: userId
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
      return next(createError.Unauthorized())
    }
    req.payload = payload
    next()
  })
}

