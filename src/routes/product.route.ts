import express from 'express'
import { verifyAccessToken } from '../helpers/jwtHelper'
import ProductController from '../controllers/product.controller'
import validateRequest from '../middlewares/validateRequest'
import { updateUserSchema } from '../helpers/validationSchema'

const router = express.Router()

router.use(verifyAccessToken)

router.post('/product', ProductController.createProduct)

export default router
