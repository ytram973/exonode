const http = require("http");
const fs = require("fs");
const path = require("path");

const students = [{ name: "Sonia" }, { name: "Antoine" }];

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.end(fs.readFileSync(path.join(__dirname, "view", "home.html")));

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        // split string "name=user" => { name: "user" }
        students.push({ name: body.split("=")[1] });
        console.log(students);
        res.statusCode = 200;
        res.end();
      });
    }
  } else if (req.url === "/bootstrap") {
    res.writeHead(200, { "Content-Type": "text/css" });
    const css = fs.readFileSync("./assets/css/bootstrap.min.css"); // on envoit le fichier au client
    res.write(css);
    res.end();

    return;
  } else if (req.url === "/users") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(students));
  } else {
    res.statusCode = 404;
    res.end("Route not found");
  }
});

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});