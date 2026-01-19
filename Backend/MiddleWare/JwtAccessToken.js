
const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No Authorization header found" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    console.log("Token received:", token?.substring(0, 20) + "...");
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    res.status(401).json({ message: "Invalid Token Found" });
  }
};

const generateToken = (userData) => {
  return jwt.sign({userData}, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
};

const generateRefreshToken = (userData) => {
  return jwt.sign({userData}, process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

module.exports = { jwtMiddleware, generateToken, generateRefreshToken };
