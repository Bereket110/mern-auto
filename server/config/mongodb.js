import mongoose from "mongoose";

const connectDB = async () => {
     await mongoose.connect(`${process.env.MONGO_DB}/mern-auto`);

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);
    });
   
}

export default connectDB