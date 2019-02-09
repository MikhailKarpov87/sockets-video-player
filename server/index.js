const server = require("http").createServer();
const io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on("CHAT_MESSAGE", function(msg) {
    const sentDate = new Date();
    io.emit("CHAT_MESSAGE", { ...msg, sentDate });
    console.log("CHAT_MESSAGE:" + { ...msg, sentDate });
  });

  socket.on("CHAT_TYPING", function(msg) {
    socket.broadcast.emit("CHAT_TYPING", msg);
    console.log("CHAT_TYPING:" + msg);
  });

  socket.on("CHAT_FINISHED_TYPING", function(msg) {
    socket.broadcast.emit("CHAT_FINISHED_TYPING", msg);
    console.log("CHAT_FINISHED_TYPING:" + msg);
  });

  socket.on("CHAT_USER_CONNECTED", function(msg) {
    socket.broadcast.emit("CHAT_USER_CONNECTED", msg);
    console.log("CHAT_USER_CONNECTED:" + msg);
  });
});

server.listen(3001, function(err) {
  if (err) throw err;
  console.log("listening on port 80");
});
