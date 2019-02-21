const server = require("http").createServer();
const io = require("socket.io")(server);

//  Send to all except sender
const broadcastEvents = ["CHAT_TYPING", "CHAT_FINISHED_TYPING", "CHAT_USER_CONNECTED"];

//  Send to all
const emitEvents = [
  "CHAT_MESSAGE",
  "VIDEO_PLAY",
  "VIDEO_PAUSE",
  "VIDEO_SEEK",
  "VIDEO_INPUT_SUBMIT"
];

io.on("connection", function(socket) {
  emitEvents.map(type =>
    socket.on(type, payload => {
      const sentDate = new Date();
      io.emit(type, { ...payload, sentDate });
      console.log(type + ":" + { ...payload, sentDate });
    })
  );

  broadcastEvents.map(type =>
    socket.on(type, payload => {
      const sentDate = new Date();
      socket.broadcast.emit(type, { ...payload, sentDate });
      console.log(type + ":" + { ...payload, sentDate });
    })
  );
});

server.listen(3001, function(err) {
  if (err) throw err;
  console.log("listening on port 80");
});
