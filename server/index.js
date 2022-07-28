const express = require("express");
const app = express();
const server = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  let name;
  let currentRoom;

  socket.on("join_room", (room, user) => {
    name = user;
    socket.join(room);
    socket
      .to(room)
      .emit("messages", { user: "admin", message: `${user} joined the room` });
  });

  socket.on("message", (data) => {
    currentRoom = data.room;
    io.to(currentRoom).emit("messages", data);
  });

  socket.on("pre-disconnect", (user) => {
    socket.leave(currentRoom);
    socket
      .to(currentRoom)
      .emit("messages", { user: "admin", message: `${user} left the room` });
  });

  // socket.on("disconnect", () => {
  //   socket.leave(currentRoom);
  //   socket.to(currentRoom).emit("messages", {user: "admin", message: `${name} left the room`})
  // });
});

server.listen(PORT, () =>
  console.log(`server started & dancing on port ${PORT}`)
);
