// Import required modules
const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (client-side assets)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/bord.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/public/admin.html");
});
io.on("connection", (Socket) => {
  console.log("new connection extablised");
  Socket.on("disconnect", () => {
    console.log("disconneccte");
  });
  Socket.on("message", (msg) => {
    console.log(msg);
    io.emit("bord_content", msg);
  });
});
// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
