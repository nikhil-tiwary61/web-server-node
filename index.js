require("dotenv").config();
const express = require("express");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// body parser - Inbuilt middleware
server.use(express.json());
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);

server.listen(process.env.PORT, () => {
  console.log("server started");
});
