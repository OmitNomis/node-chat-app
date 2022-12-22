const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { origins: "*:*" });
app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    socket.on("message", (message) => {
      // Add the username to the message object
      let messageObj = {
        username: username,
        content: message,
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
