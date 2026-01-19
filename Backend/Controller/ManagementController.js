const User = require("../Modal/UserSchema");
const { generateToken, generateRefreshToken } = require("../MiddleWare/JwtAccessToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ManagementController = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email and password are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error?.message || error,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Email and password required" });
      }

      console.log("Login attempt:", email);

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(403)
          .json({ success: false, message: "Invalid password" });
      }

      const payload = { id: user._id, email: user.email, role: user.role };
      const token = generateToken(payload);
      const refreshToken = generateRefreshToken(payload);
      console.log("Token:", token);

      
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 

      });

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: { id: user._id, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error signing user",
        error: error?.message || error,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: { $ne: "admin" } }, "-password");

      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error?.message || error,
      });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { newRole } = req.body;
      const validRoles = ["user", "manager", "admin"];

      if (!validRoles.includes(newRole)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid role specified" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      user.role = newRole;
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "User role updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error updating user role",
        error: error?.message || error,
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ 
          success: false, 
          message: "Refresh token not found" 
        });
      }

     
      const decoded = jwt.verify(
        refreshToken, 
        process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_SECRET_KEY
      );

      // Generate new access token
      const newAccessToken = generateToken(decoded.userData);

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        token: newAccessToken,
      });
    } catch (error) {
      console.error(error);
      res.status(403).json({
        success: false,
        message: "Invalid refresh token",
        error: error?.message || error,
      });
    }
  },
  Test: async (req, res) => {
    console.log("Hello World");
  },
};
module.exports = ManagementController;
