import mongoose from "mongoose";

const connectDb = async (url: string) => {
  mongoose.set("debug", true);
  return mongoose.connect(url);
};

export default connectDb;
