const UserSchema = require("../Modal/UserSchema");

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
      console.log(email, password);
      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });

    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error signing user", error: error.message });
    }

  }

};

module.exports = ManagementController;
