import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
export const register=async(req,res)=>{
    const {name,email,password}=req.body;

    if(!name || !email || !password){
        return res.json({success:false,message:"All fields are required"});
    }

    try {
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const user=new userModel({
            name,
            email,
            password:hashedPassword
        });
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })
        //Sending welcome email to user

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Welcome to Bereket's portfolio",
            text:`Hello ${name},\n\nThank you for registering at Bereket's portfolio. We're excited to have you on board!\n\nBest regards,\nBereket Yakob`
        }

        await transporter.sendMail(mailOptions);

        res.json({success:true,message:"User registered successfully"});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return res.json({success:false,message:"Email and password are required"});

    }

    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"Invalid email"})
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid password"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        });

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Welcome to Bereket's portfolio",
            text:`Hello ${user.name},\n\nThank you for login at Bereket's portfolio. We're excited to have you on board!\n\nBest regards,\nBereket Yakob`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"Login successful"});

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie('token',
            {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            }
        )

        const maileOptions={
            from:process.env.SENDER_EMAIL,
            to:req.user.email,
            subject:"Logout Notification from Bereket's portfolio",
            text:`Hello ${req.user.name},\n\nYou have successfully logged out from Bereket's portfolio. We hope to see you again soon!\n\nBest regards,\nBereket Yakob`
        }
        await transporter.sendMail(maileOptions);

        res.json({success:true,message:"Logout successful"});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export const verifyOtp=async (req,res)=>{
    const {email,userId}=req.body;

    if(!userId){
        return res.json({success:false,message:"User id is required"});

    }

    try {
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found"});
        }

       const otp= Math.floor(Math.random()*900000+100000);
       user.verifyOtp=otp;
       user.verifyOtpExpiryAt=Date.now()+10*60*1000; //10 minutes
       await user.save();

       const maileOptions={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"OTP Verification from Bereket's portfolio",
            text:`Hello ${user.name},\n\nYour OTP for verification is ${otp}. It is valid for 10 minutes.\n\nBest regards,\nBereket Yakob`
        }

        await transporter.sendMail(maileOptions);
        return res.json({success:true,message:"OTP sent to email"});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}
