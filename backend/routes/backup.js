import express from 'express';
const router = express.Router();
// const { MongoClient } = require('mongodb');
import MongoClient from 'mongodb';

import Promotion from '../models/promotionModel.js';

const MONGO_URL = 'mongodb://localhost:27017/genova';

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

    // Promotions

    Promotion.deleteMany({}, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while deleting data');
      }
      return res.status(200).send('All data deleted successfully');
    });

    console.log(promotion);
  } catch (error) {
    console.error('Error importing JSON data:', error);
    res.status(500).send('Error importing JSON data');
  }
});

export default router;
