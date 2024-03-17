import AuthService from '../services/auth.service'
import { authSchema } from '../helpers/validationSchema'
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokens = await AuthService.login(req.body)
      res.send(tokens)
    } catch (err) {
      if ((err as Error).isJoi) (err as Error).status = 400
      next(err)
    }
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await authSchema.validateAsync(req.body)
      const tokens = await AuthService.register(account)
      res.send(tokens)
    } catch (err) {
      if ((err as Error).isJoi) (err as Error).status = 422
      next(err)
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const tokens = await AuthService.refreshToken(refreshToken)
      res.send(tokens)
    } catch (error) {
      next(error)
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      await AuthService.logout(refreshToken)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  },
}
