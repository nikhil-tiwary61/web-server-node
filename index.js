const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const product = data.products[0];

const server = http.createServer((req, res) => {
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    case "/product":
      res.setHeader("Content-Type", "text/html");
      let modifiedProduct = index
        .replace("**title**", product.title)
        .replace("**url**", product.thumbnail)
        .replace("**price**", product.price)
        .replace("**rating**", product.rating);
      res.end(modifiedProduct);
      break;
    default:
      res.writeHead(404);
      res.end();
  }
  console.log("server created");
  // res.setHeader("Dummyheader", "Dummyvalue");
});

server.listen(8080);
