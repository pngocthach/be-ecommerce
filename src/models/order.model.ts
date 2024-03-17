import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  address: { type: Object, required: true },
  status: { type: String, required: true, default: 'pending' }
}, {
  timestamps: true
})

export default mongoose.model('Orders', OrderSchema)