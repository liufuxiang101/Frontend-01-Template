const http = require("http");
const fs = require("fs");

// Create an HTTP server
const server = http.createServer((req, res) => {
  console.log(req);

  let matched = req.url.match(/filename=([^&]+)/);
  let filename = matched && matched[1];

  console.log(filename);

  if (!filename) {
    return;
  }

  let writeStream = fs.createWriteStream("../server/public/" + filename);

  // req.pipe(writeStream);

  req.on("data", (thunk) => {
    writeStream.write(thunk);
  });

  req.on("end", (thunk) => {
    writeStream.end(thunk);
  });

  req.on("end", () => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("okay");
  });
});

server.listen(8081);
