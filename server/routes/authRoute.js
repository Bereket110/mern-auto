import express from 'express';
import { login, logout, register, verifyOtp } from '../controller/authController.js';
import decodeToken from '../middleware/userAuth.js';

export const authRouter=express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/verify-otp',decodeToken,verifyOtp);