const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/signup", authController.createUser);

exports.router = router;
