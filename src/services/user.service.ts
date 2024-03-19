import User from '../models/user.model'
import { HydratedDocument } from 'mongoose'

function verifyAuthorization(userId: string, reqId: string, isAdmin: boolean) {
  return userId === reqId || isAdmin
}

interface UpdateInfo {
  userId: string,
  email?: string,
  password?: string
}

async function findUserById(userId: string) {
  return await User.findById(userId)
}

async function getUserIsAdmin(userId: string) {
  const user = await User.findById(userId)
  return { user, isAdmin: user?.isAdmin }
}

export default {
  findUserById,
  getUserIsAdmin,

  getUser: async (userId: string): Promise<HydratedDocument<User>> => {
    // const users = await User.findById(userId).lean() as HydratedDocument<User>[]
    const users = await User.findById(userId).lean() as HydratedDocument<User>
    return users
  },

  getAllUsers: async (): Promise<HydratedDocument<User>[]> => {
    const users = await User.find({}).lean() as HydratedDocument<User>[]
    return users
  },

  handleUpdateUser: async (userId: string, updateInfo: UpdateInfo) => {
    let updatedUser
    const currUser = await findUserById(userId)
    if (currUser !== null &&
      verifyAuthorization(userId, updateInfo.userId, currUser.isAdmin)) {
      const update: { email?: string, password?: string } = {}
      if (updateInfo.email) update.email = updateInfo.email
      if (updateInfo.password) update.password = updateInfo.password
      console.log('verify ok')
      updatedUser = await User.findByIdAndUpdate(userId, update, {
        new: true,
      })
    }
    return updatedUser
  },

  deleteUser: async (userId: string) => {
    return await User.findByIdAndDelete(userId)
  }
}
