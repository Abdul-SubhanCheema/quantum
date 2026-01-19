const User = require("../Modal/UserSchema");
const { generateToken } = require("../MiddleWare/JwtAccessToken")

const ManagementController = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email, password);

      //   const newUser = new UserSchema({ email, password });
      //   await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error registering user", error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
       if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
      console.log(email, password);

      const payload = { email };
      const token = generateToken(payload);
      console.log("Token:", token);

      res.status(200).json({
        success: true,
        message: "User Login successfully",
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error signing user",
        error: error?.message || error,
      });


    };
  },
  Test:async(req,res)=>{
    console.log("Hello World")
  }

}
module.exports = ManagementController;
