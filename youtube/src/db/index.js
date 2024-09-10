import mongoose from "mongoose";
import dotenv from "dotenv";
import {DB_NAME} from "../constants.js"

dotenv.config({path: './env'}); // Load environment variables from .env file

// Function to connect to MongoDB Atlas
const connectDB = async () => {
  try {
  //  console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
    
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
