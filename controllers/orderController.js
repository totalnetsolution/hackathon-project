import { Order } from '../models/order.js';
import { Product } from '../models/product.js';

exports.createOrder = async (req, res) => {
  const { products } = req.body;

  try {
    const productDocs = await Product.find({ _id: { $in: products } });
    const totalPrice = productDocs.reduce((sum, prod) => sum + prod.price, 0);

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products');
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
