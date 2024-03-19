import createError from 'http-errors'
import UserService from '../services/user.service'
import { updateUserSchema } from '../helpers/validationSchema'
import { Request, Response, NextFunction } from 'express'
import userService from '../services/user.service'
import userModel from '../models/user.model'

export default {
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currUser = await userService.getUser(req.payload.userId)
      if (currUser.isAdmin && req.params) {
        res.send(await userService.getUser(req.params.userId))
      }
      else res.send(currUser)
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  },

  getAllUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currUser = await userService.getUser(req.payload.userId)
      if (currUser.isAdmin) {
        res.send(await userService.getAllUsers())
      }
      else throw createError.Unauthorized()
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload
      const reqBody = await updateUserSchema.validateAsync(req.body)
      const updatedUser = await UserService.handleUpdateUser(userId, reqBody)
      if (updatedUser) {
        res.send(updatedUser)
      } else throw createError.Forbidden()
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, isAdmin } = await userService.getUserIsAdmin(req.payload.userId)
      if (isAdmin || req.payload.userId === req.params.userId) {
        const deletedUser = await userService.deleteUser(req.params.userId)
        res.status(200).send(deletedUser)
      }
      else throw createError.Forbidden()
    } catch (err) {
      console.log((err as Error).message)
      next(err)
    }
  }
}
