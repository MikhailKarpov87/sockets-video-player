import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const messageTypes = ["CHAT_MESSAGE", "CHAT_TYPING", "CHAT_FINISHED_TYPING", "CHAT_USER_CONNECTED"];

export const initSockets = store => {
  messageTypes.map(type =>
    socket.on(type, payload => {
      store.dispatch({ type, payload });
      console.log(type + ":" + payload.userId);
    })
  );
};

export const sendMessage = (type, payload) => socket.emit(type, payload);
