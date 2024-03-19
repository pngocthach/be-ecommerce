import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema<User, UserModel>({
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
    default: false,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if ((this.isModified && this.isModified('password'))) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()

})

// UserSchema.pre(/^updateOne$|^findByIdAndUpdate$|^findOneAndUpdate$/, async function (next: (err?: Error) => void) {
UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function (next: (err?: Error) => void) {
  const data = this.getUpdate() as User
  if (data) {
    data.password = await bcrypt.hash(data.password, 10)
  }
  next()
})

UserSchema.methods.isValidPassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

export default mongoose.model<User>('Users', UserSchema)
