import jwt from 'jsonwebtoken';
const decodeToken=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({success:false,message:"Unauthorized"});
    }
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        //  req.body.user = decoded;
        console.log("Decoded token:", decoded);
        req.body.userId = decoded.id ;

        console.log("Decoded user ID:", req.userId);
        // console.log("Decoded user ID:", decoded);
        next();

    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({success:false,message:"Invalid token"});
    }
}

 export default decodeToken;