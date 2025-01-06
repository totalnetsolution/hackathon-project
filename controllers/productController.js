import { Product } from '../models/product.js';

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      image: req.file.path,
      user: req.user._id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).send('Product not found');
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
