import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
import { authMiddleware } from './middleware/auth.js';
import authController from './controllers/authController.js';
import productController from './controllers/productController.js';
import orderController from './controllers/orderController.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
// Authentication
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);

// Products
app.post('/products', authMiddleware, upload.single('image'), productController.createProduct);
app.get('/products', productController.getProducts);
app.put('/products/:id', authMiddleware, productController.updateProduct);
app.delete('/products/:id', authMiddleware, productController.deleteProduct);

// Orders
app.post('/orders', authMiddleware, orderController.createOrder);
app.get('/orders', authMiddleware, orderController.getOrders);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
