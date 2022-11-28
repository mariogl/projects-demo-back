import mongoose from "mongoose";

const connectDb = async (url: string) => {
  mongoose.set("debug", true);
  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  });

  return mongoose.connect(url);
};

export default connectDb;
