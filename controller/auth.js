const jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.User;

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET);
  user.token = token;
  try {
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
