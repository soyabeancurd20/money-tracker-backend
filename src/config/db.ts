import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URI || '';
export default async function connectDB() {
  try { await mongoose.connect(uri); console.log('MongoDB connected successfully!'); }
  catch (err) { console.error('MongoDB connection error: ', err); throw err; }
}
