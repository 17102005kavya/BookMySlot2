const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ msg: "Invalid creds" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
   process.env.JWT_SECRET
  );

  res.json({ token });
};