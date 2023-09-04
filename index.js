const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");

const data = { age: 5 };
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log("server created");
  res.setHeader("Dummyheader", "Dummyvalue");
  // res.setHeader("Content-Type", "application/json");
  res.end(index);
});

server.listen(8080);
