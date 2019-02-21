// URL of sockets backend API
export const SOCKETS_API_URL = "https://sockets-player-app-sockets.herokuapp.com/";

// URL of REST backend API
export const API_URL = "https://sockets-player-app.herokuapp.com/api/v1";

//  Max number of chat messages. Old messages will be cleared
export const maxChatMessagesNum = 50;

export const initialState = {
  messages: [],
  user: {
    userName: null,
    userId: null,
    token: null,
    googleToken: null,
    isAuth: false
  },
  users: {},
  player: {
    playing: false,
    position: 0,
    positionSeconds: 0,
    updatePosition: false,
    duration: null,
    url: "https://www.youtube.com/watch?v=KRnaqdMQyU0"
  },
  error: null
};
