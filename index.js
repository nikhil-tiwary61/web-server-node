const express = require("express");
const morgan = require("morgan");
const server = express();
const productController = require("./controller/product");

//Third party middlewares
// server.use(morgan("combined"));
// body parser - Inbuilt middleware
server.use(express.json());

// MVC - model view controller

server.post("/products", productController.createProduct);
server.get("/products", productController.getProducts);
server.get("/products/:id", productController.getProduct);
server.put("/products/:id", productController.replaceProduct);
server.patch("/products/:id", productController.updateProduct);
server.delete("/products/:id", productController.deleteProduct);

server.listen(8080, () => {
  console.log("server started");
});
