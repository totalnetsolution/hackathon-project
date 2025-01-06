import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
