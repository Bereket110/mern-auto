import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieparser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({credentials: true}));
app.use(cookieparser());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from the MERN Auto server!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});``

