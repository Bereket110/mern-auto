import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    // await mongoose.connect(`${process.env.MONGO_DB}/mern-auto`);
    await mongoose.connect(`${process.env.MONGO_DB}`);

    // mongoose.connection.on("error", (err) => {
    //   console.log(`MongoDB connection error: ${err}`);
    // });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
