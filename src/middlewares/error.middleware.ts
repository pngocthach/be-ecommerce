import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'


export default {
  notFound: async (req: Request, res: Response, next: NextFunction) => {
    next(createError.NotFound('this route does not exist'))
  },

  catchAllError: (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
  }
}
