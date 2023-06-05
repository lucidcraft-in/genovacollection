import express from 'express';
const router = express.Router();
// const { MongoClient } = require('mongodb');
import MongoClient from 'mongodb';

 
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import connectDB from '../config/db.js';
import Category from '../models/categoryModel.js';
import SubCategory from '../models/subcategoryModel.js';
import Promotion from '../models/promotionModel.js';
import Stock from '../models/stockModel.js';

const MONGO_URL = 'mongodb://genova:123@localhost:27017/genova';

// Backup route
router.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    // Get all collections
    const collections = await db.listCollections().toArray();

    // Prepare the data to send back
    const data = {};

    for (const collection of collections) {
      const name = collection.name;
      const docs = await db.collection(name).find({}).toArray();
      data[name] = docs;
    }

    // Close the MongoDB connection
    await client.close();

    // Send the backup data as the response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to perform backup' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const obj = req.body;

    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Promotion.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Stock.deleteMany();

    const createdCategory = await Category.insertMany(obj.categories);
    const createdSubCategory = await SubCategory.insertMany(obj.subcategories);
    const createdPromotion = await Promotion.insertMany(obj.promotions);
    const createdOrder = await Order.insertMany(obj.orders);
    const createdProduct = await Product.insertMany(obj.products);
    const createdUser = await User.insertMany(obj.users);
    const createdStock = await Stock.insertMany(obj.stocks);

    res.status(200).send('Successfully imported');
  } catch (error) {
    console.error('Error importing JSON data:', error);
    res.status(500).send('Error importing JSON data');
  }
});

export default router;
