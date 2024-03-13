import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  try {
    const passwordHash = await bcrypt.hash(this.password, 10)
    this.password = passwordHash
    next()
  }
  catch (e) {
    next(e)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (e) {
    throw e
  }
}

export default mongoose.model('Users', UserSchema)