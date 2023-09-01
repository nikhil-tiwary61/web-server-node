const http = require("http");

const server = http.createServer((req, res) => {
  console.log("server created");
  res.end("hello");
});

server.listen(8080);
