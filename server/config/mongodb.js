import mongoose from "mongoose";


const connectDB = async () => {
    try {
          await mongoose.connect(`${process.env.MONGO_DB}/mern-auto`);
          mongoose.connection.on('connected', () => {
          console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log(`MongoDB connection error: ${err}`);
    });
    
} catch (error) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
}
   
   
}

export default connectDB