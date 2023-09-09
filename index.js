const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { log } = require("console");

// const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const server = express();

//Third party middlewares
server.use(morgan("combined"));

// body parser - Inbuilt middleware
server.use(express.json());
// server.use(express.static("public"));

// API - Endpoint
// Products
// API ROOT, base URL, example - google.com/api/v2/
// C R U D

// Create POST /products
server.post("/products", (req, res) => {
  products.push(req.body);
  res.status(201).json(req.body);
});

// Read GET /products
server.get("/products", (req, res) => {
  res.json(products);
});

// Read GET /products/:id
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

// Update PUT /products/:id
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
});

// Update PUT /products/:id
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json();
});

server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.get("/demo", (req, res) => {
  // Responses
  // res.sendStatus(404);
  // res.json(products);
  // res.send("hello world");
  // res.sendFile("F:Web DevelopmentNode-Expressweb-server-nodeindex.html");
});

server.listen(8080, () => {
  console.log("server started");
});
