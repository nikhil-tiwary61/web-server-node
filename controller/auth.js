const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");
const User = model.User;

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.signUp = async (req, res) => {
  const user = new User(req.body);
  const token = jwt.sign({ email: req.body.email }, privateKey, {
    algorithm: "RS256",
  });
  const hash = bcrypt.hashSync(req.body.password, 10);
  user.password = hash;
  user.token = token;
  try {
    await user.save();
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      const token = jwt.sign({ email: req.body.email }, privateKey, {
        algorithm: "RS256",
      });
      doc.token = token;
      await doc.save();
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
