const fs = require("fs");
const express = require("express");

// const index = fs.readFileSync("index.html", "utf-8");
// const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const products = data.products;

const server = express();
server.listen(8080, () => {
  console.log("server started");
});
