import mongoose from "mongoose";
import logger from '../utils/logger.js'

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    logger.info(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)

  } catch (error) {
    logger.error("MONGODB connection FAILED ", error)
  }
};

export default connectDB;