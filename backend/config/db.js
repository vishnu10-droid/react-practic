import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connect successfully");
  } catch (error) {
    console.log("mongoose connection failed", error.message);
    process.exit(1);
  }
};
export default connectDB;
