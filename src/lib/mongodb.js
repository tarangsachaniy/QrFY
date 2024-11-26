
import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log("Using existing database connection");
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = connection.connections[0].readyState === 1; 
    console.log("Connected to MongoDB");

    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
