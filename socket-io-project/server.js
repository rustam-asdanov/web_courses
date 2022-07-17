const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
import { onMount } from "svelte";

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.post("/save", (req, res) => {
  const username = req.body["username"];

  onMount(() => {
    sessionStorage.setItem("activeUser", username);
  });

  res.redirect("/chat");
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a use is connected");

  //   socket.broadcast.emit("hi");

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${sessionStorage.getItem("activeUser")} : ` + msg);
  });
});

server.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
