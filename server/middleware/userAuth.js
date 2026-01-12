import jwt from "jsonwebtoken";
const userAuth = (req, res, next) => {
  // const { token } = req.cookies;

  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  let token = authHeader;

  // Check if the header contains "Bearer " and strip it
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7); // "Bearer " is 7 characters long
  }

  // console.log(token);
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(tokenDecode);
    req.user = tokenDecode;
    req.userId = tokenDecode.id;
    return next();
  } catch (error) {
    console.error("JWT Verification Error:", error.name, error.message);
    return res.json({ success: false, message: "Invalid token" });
  }
  //  req.body.user = decoded;
  // console.log("Decoded token:", decoded);

  // req.user = tokenDecode;
  // req.userId = tokenDecode.id;

  // if (!req.userId) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Not authorized, please login again",
  //   });
  // }

  // console.log("Decoded user ID:", req.userId);
  // next();
  // } catch (error) {
  //   console.error("Token verification failed:", error);
  //   return res.status(401).json({ success: false, message: "Invalid token" });
  // }
};

export default userAuth;
