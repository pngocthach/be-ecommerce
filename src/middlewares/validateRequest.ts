import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

export default function (schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body)
    if (result.error) {
      next(createHttpError.BadRequest(result.error.message))
    }
    else {
      req.body = result.value
      next()
    }
  }
}