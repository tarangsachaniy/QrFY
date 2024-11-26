import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    // Directly log the connection status once connected
    console.log("Connected to MongoDB");

    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
