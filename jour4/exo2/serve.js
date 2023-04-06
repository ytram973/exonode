const http = require("http");
const pug = require("pug");
const user = { isAdmin: true };

const server = http.createServer((req, res) => {
  const compiledFunction = pug.compileFile("template.pug");
  const html = compiledFunction({ user });
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});