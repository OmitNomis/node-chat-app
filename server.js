const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  origins: "https://ffa-chatroom.onrender.com",
});
app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    socket.on("message", (message) => {
      // Add the username to the message object
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Add the username to the message object
      let messageObj = {
        username: username,
        content: message,
        timestamp: currentTime,
      };

      // Broadcast the message to all connected clients
      io.emit("message", messageObj);
    });
  });
});
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
