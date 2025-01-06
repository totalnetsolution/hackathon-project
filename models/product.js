import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('Product', productSchema);
