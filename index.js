const http = require("http");

const data = { age: 5 };
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log("server created");
  res.setHeader("Dummyheader", "Dummyvalue");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

server.listen(8080);
