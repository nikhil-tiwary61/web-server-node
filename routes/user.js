const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router
  .post("/", userController.createProduct)
  .get("/", userController.getProducts)
  .get("/:id", userController.getProduct)
  .put("/:id", userController.replaceProduct)
  .patch("/:id", userController.updateProduct)
  .delete("/:id", userController.deleteProduct);

exports.router = router;
