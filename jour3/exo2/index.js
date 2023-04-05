const http = require("http");
const fs = require("fs");
const path = require("path");

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  // Route: /all
  if (req.url === "/all") {
    // Lecture du fichier JSON all.json
    const allData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "all.json"))
    );
    // Envoi des données en tant que réponse HTTP
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(allData));
  }

  // Route: /search/[Name_user]
  else if (req.url.startsWith("/search/")) {
    const name = req.url.slice("/search/".length);
    const userDataPath = path.join(__dirname, "data", `${name}.json`);
    if (fs.existsSync(userDataPath)) {
      const userData = JSON.parse(fs.readFileSync(userDataPath));

      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(userData));
    } else {
      res.statusCode = 404;
      res.end("User not found");
    }
  } else {
    res.statusCode = 404;
    res.end("Route not found");
  }
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});