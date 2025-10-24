import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);
    });
    await mongoose.connect(`${process.env.MONGO_DB}/mern-auto`)
}

export default connectDB