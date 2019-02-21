import io from "socket.io-client";
import { SOCKETS_API_URL } from "./config";
import { messageTypes } from "./constants";

const socket = io.connect(SOCKETS_API_URL);

//  Setting up listener fo each message type
export const initSockets = store => {
  messageTypes.map(type =>
    socket.on(type, payload => {
      store.dispatch({ type, payload });
    })
  );
};

export const sendMessage = (type, payload) => socket.emit(type, payload);
