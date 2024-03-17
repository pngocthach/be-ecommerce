import User from '../models/user.model'

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

export default {
  findUserById,

  handleUpdateUser: async (userId: string, updateInfo: UpdateInfo) => {
    let updatedUser
    const currUser = await findUserById(userId)
    if (currUser !== null && verifyAuthorization(userId, updateInfo.userId, currUser.isAdmin)) {
      const update: { email?: string, password?: string } = {}
      if (updateInfo.email) update.email = updateInfo.email
      if (updateInfo.password) update.password = updateInfo.password
      console.log('verify ok')
      updatedUser = await User.findByIdAndUpdate(userId, update, {
        new: true,
      }).lean()
    }
    return updatedUser
  },
}
