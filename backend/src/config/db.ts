import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;
    if (!db) throw new Error('Database connection is not established');

    await db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
