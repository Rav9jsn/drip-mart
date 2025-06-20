const User = require("../model/userSign");

exports.CreateAccount = async (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;
  const user = new User(name, email, password, confirmPassword, role);
  const result = await user.save();
  if (!result.success) {
    return res.status(409).json({ message: result.message, success: false });
  }
  res
    .status(201)
    .json({ message: "User registered successfully", success: true });
};
exports.loggedAccount = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User(email, password);

  const result = await user.loggedIn(email, password);
  if (result.success) {
    return res.status(201).json(result);
  }
  res.status(201).json({ message: result.message, success: result.success });
};
