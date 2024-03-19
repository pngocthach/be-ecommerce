import express from 'express'
import { verifyAccessToken } from '../helpers/jwtHelper'
import UserController from '../controllers/user.controller'
import validateRequest from '../middlewares/validateRequest'
import { updateUserSchema } from '../helpers/validationSchema'

const router = express.Router()

router.get('/user/', verifyAccessToken, UserController.getUser)

router.get('/user/:userId', verifyAccessToken, UserController.getUser)

router.get('/allUser', verifyAccessToken, UserController.getAllUser)

router.put('/updateUser', validateRequest(updateUserSchema), verifyAccessToken, UserController.updateUser)

router.delete('/deleteUser/:userId', verifyAccessToken, UserController.deleteUser)

export default router
