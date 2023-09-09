const express = require("express");
const server = express();
const productRouter = require("./routes/product");

// body parser - Inbuilt middleware
server.use(express.json());
server.use("/products", productRouter.router);

server.listen(8080, () => {
  console.log("server started");
});
