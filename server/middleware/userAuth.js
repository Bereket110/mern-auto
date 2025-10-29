import jwt from "jsonwebtoken";
const userAuth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    //  req.body.user = decoded;
    // console.log("Decoded token:", decoded);

    req.user = tokenDecode;
    req.userId = tokenDecode.id;

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, please login again",
      });
    }

    console.log("Decoded user ID:", req.userId);
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
