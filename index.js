const fs = require("fs");
const express = require("express");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const server = express();

server.get("/", (req, res) => {
  res.json({ type: "GET" });
});
server.post("/", (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});
server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
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
