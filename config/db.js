const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

// MongoDB connection string
const MONGO_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster3.dcougro.mongodb.net/?retryWrites=true&w=majority&appName=Cluster3`;

let isConnected; // connection cache

const connectDB = async () => {
  if (isConnected) {
    console.log(" Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState; // 1 = connected
    console.log(" New MongoDB connection established");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    throw error;
  }
};

module.exports = connectDB;
