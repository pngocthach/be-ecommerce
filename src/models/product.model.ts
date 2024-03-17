import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true,
    default: false
  },
  categories: {
    type: Array
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Products', ProductSchema)