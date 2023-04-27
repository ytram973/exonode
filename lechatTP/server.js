const express = require("express");
const app = express();
const port = 9000;
const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);


app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "pug");
app.use(express.static("views"));

const users = [];

const channelMessages = [
  {
    id: 1,
    channelName: "General",
    messages: [],
    users: [],
  },
  {
    id: 2,
    channelName: "Graphisme",
    messages: [],
    users: [],
  },
  {
    id: 3,
    channelName: "Développement",
    messages: [],
    users: [],
  },
  {
    id: 4,
    channelName: "Autre",
    messages: [],
    users: [],
  },
];

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/logged", (req, res) => {
  const username = req.body.username;
  users.push({
    id: undefined,
    name: username,
    currentChannel: "General",
  });
  // redirect to General
  res.redirect("/channel/General?username=" + username);
});

app.post("/logout", (req, res) => {
  const username = req.body.username;
  users.forEach((user, index) => {
    if (user.name === username) {
      users.splice(index, 1);
    }
  });
  res.redirect("/");
});

app.get("/channel/:channelName", (req, res) => {
  const username = req.query.username;

  const channelName = req.params.channelName;
  users.forEach((user) => {
    if (user.name === username) {
      user.currentChannel = channelName;
    }
  });

  // get array of channels
  const channels = channelMessages.map((channel) => channel.channelName);

  channelMessages.forEach((channel) => {
    if (channel.channelName === channelName) {
      channel.users.push(username);
    }
  });

  const channel = channelMessages.find(
    (channel) => channel.channelName === channelName
  );

  const channelUsers = users.filter(
    (user) => user.currentChannel === channelName
  );
  const messages = channel.messages;
  res.render("index", {
    channelName,
    channelUsers,
    channels,
    username,
    messages,
  });
});

app.get("*", (req, res) => {
  res.redirect("/");
});

io.on("connection", (socket) => {
  users.forEach((user) => {
    if (user.id === undefined) {
      user.id = socket.id;
    }
  });

  const connectedUser = users.find((user) => user.id === socket.id);
  io.emit("user connected", connectedUser);
  socket.on("disconnect", () => {
    // get the disconnected user
    const disconnectedUser = users.find((user) => user.id === socket.id);


    users.forEach((user) => {
      if (user.id === socket.id) {
        user.id = undefined;
      }
    });

    io.emit("user disconnected", disconnectedUser);
  });

  socket.on("message", (data) => {

    channelMessages.forEach((channel) => {
      if (channel.channelName === data.channelName) {
        channel.messages.push({
          user: data.user,
          content: data.message,
          date: new Date(data.date).toLocaleTimeString("fr-FR"),
        });
      }
    });

    io.emit("message", {
      user: data.user,
      message: data.message,
      channelName: data.channelName,
      date: data.date,
    });
  });

  socket.on("notify:typing", (data) => {
    io.emit("notify:typing", data);
  });
});

server.listen(port, () => {
  console.log(`server is running on port on http://localhost:${port}`);
});
