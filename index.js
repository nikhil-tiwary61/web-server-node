require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
}

// body parser - Inbuilt middleware
server.use((req, res, next) => {
  const token = req.get("Authorization").split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    decoded.email ? next() : res.sendStatus(401);
  } catch (err) {
    res.sendStatus(401);
  }
});
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
