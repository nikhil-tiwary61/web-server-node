const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const model = require("../model/product");
const Product = model.Product;
// const data = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, "../data.json"), "utf-8")
// );
// const products = data.products;

exports.getProductsSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(
    path.resolve(__dirname, "../pages/index.ejs"),
    { products: products },
    function (err, str) {
      res.send(str);
    }
  );
};
exports.getAddForm = async (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "../pages/add.ejs"),
    function (err, str) {
      res.send(str);
    }
  );
};

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
  const products = await Product.find();
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

// Update
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
