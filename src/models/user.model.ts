import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface User {
  email: string,
  password: string,
  isAdmin: boolean,
  isValidPassword(password: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// UserSchema.pre('save', async function (next) {
//   try {
//     const passwordHash = await bcrypt.hash(this.password, 10)
//     this.password = passwordHash
//     next()
//   }
//   catch (e) {
//     next(e)
//   }
// })

UserSchema.pre('save', async function (next) {
  if ((this.isModified && this.isModified('password'))) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()

})

// UserSchema.pre(/^updateOne$|^findByIdAndUpdate$|^findOneAndUpdate$/, async function (next: (err?: Error) => void) {
UserSchema.pre('updateOne', async function (next: (err?: Error) => void) {

  const data = this.getUpdate() as User
  if (data) {
    data.password = await bcrypt.hash(data.password, 10)
  }
  next()

})

UserSchema.methods.isValidPassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model('Users', UserSchema)
