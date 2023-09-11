const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// Create
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  let error;
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    error = err;
    res.status(400).json(error);
  }
};

// Read
exports.getProducts = async (req, res) => {
  const products = await Product.find({ price: { $gt: 500 } });
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

exports.replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

exports.updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
};

exports.deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.json(product);
};
