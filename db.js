import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
// const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
export default connectDB;
// module.exports = connectDB;
