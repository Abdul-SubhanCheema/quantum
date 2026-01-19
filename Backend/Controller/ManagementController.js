const User = require("../Modal/UserSchema");
const { generateToken } = require("../MiddleWare/JwtAccessToken");
const bcrypt = require("bcrypt");

const ManagementController = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }


      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: "User already exists" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error registering user", error: error?.message || error });
    }
  },
  loginUser : async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password required" });
      }

      console.log("Login attempt:", email);

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(403).json({ success: false, message: "Invalid password" });
      }

      const payload = { id: user._id, email: user.email };
      const token = generateToken(payload);
      console.log("Token:", token);

      
      res.status(200).json({
        success: true,
        email:user.email,
        role:user.role,
        message: "User logged in successfully",
        token,
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
  Test: async (req, res) => {
    console.log("Hello World")
  }

}
module.exports = ManagementController;
