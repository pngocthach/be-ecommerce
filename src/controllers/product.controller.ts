import { Request, Response, NextFunction } from 'express'
import ProductService from '../services/product.service'

export default {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await ProductService.createProduct(req.body.product_type, req.body.product))
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  }
}