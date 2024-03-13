import express from 'express'
import createError from 'http-errors'
import User from '../models/user.model.js'
import { authSchema } from '../helpers/validationSchema.js'
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../helpers/jwtHelper.js'
import redis from '../helpers/initRedis.js'
import AuthController from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/login', AuthController.login)

router.post('/register', AuthController.register)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

export default router