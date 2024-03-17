import createError from 'http-errors'
import UserService from '../services/user.service'
import { updateUserSchema } from '../helpers/validationSchema'
import { Request, Response, NextFunction } from 'express'

export default {
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload
      const reqBody = await updateUserSchema.validateAsync(req.body)
      const updatedUser = await UserService.handleUpdateUser(userId, reqBody)
      if (updatedUser) {
        res.send(updatedUser)
      } else throw createError.Forbidden()
      // res.send('ok')
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  },
}
