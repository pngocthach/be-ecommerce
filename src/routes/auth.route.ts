import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post('/login', AuthController.login)

router.post('/register', AuthController.register)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

export default router
