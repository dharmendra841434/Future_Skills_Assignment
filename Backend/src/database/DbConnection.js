import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const url =
    process.env.DB_URL ||
    "mongodb+srv://Dhk2182:Dhruvk2182@mystore.c5vrx.mongodb.net/?retryWrites=true&w=majority";
  try {
    const connectionInstance = await mongoose.connect(`${url}`);
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
