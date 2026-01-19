
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
    req.userInfo = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token Found" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { jwtMiddleware, generateToken };



module.exports={jwtMiddleware,generateToken};
