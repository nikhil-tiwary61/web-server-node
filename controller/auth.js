const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const model = require("../model/user");
const User = model.User;

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  user.token = token;
  try {
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(400).json(err);
  }
};
