require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const { Schema } = mongoose;
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// db connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("database connected");
}

// body parser - Inbuilt middleware
server.use(express.json());
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
