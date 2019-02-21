//  Codes/messages of errors from backend
export const errors = [
  { en: "No token provided", ru: "В запросе отсутствует токен" },
  { en: "Bad Google cliend ID", ru: "Неверный Google Client ID" },
  { en: "Error on server while verifying token", ru: "Ошибка на сервере при проверке токена" },
  { en: "Bad credentials", ru: "Неверные данные для входа" },
  { en: "jwt expired", ru: "Токен авторизации устарел. Попробуйте войти еще раз" }
];

//  Message types for sockets
export const messageTypes = [
  "CHAT_MESSAGE",
  "CHAT_TYPING",
  "CHAT_FINISHED_TYPING",
  "CHAT_USER_CONNECTED",
  "VIDEO_PLAY",
  "VIDEO_PAUSE",
  "VIDEO_SEEK",
  "VIDEO_INPUT_SUBMIT"
];

export const getErrorText = message => {
  const errorText = errors.find(error => error.en === message);
  return errorText ? errorText.ru : message;
};

//  Actions types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const START_LOADING = "START_LOADING";
export const VIDEO_PLAY = "VIDEO_PLAY";
export const VIDEO_PAUSE = "VIDEO_PAUSE";
export const VIDEO_SEEK = "VIDEO_SEEK";
export const VIDEO_INPUT_CHANGE = "VIDEO_INPUT_CHANGE";
export const VIDEO_INPUT_SUBMIT = "VIDEO_INPUT_SUBMIT";
export const CHAT_USER_CONNECTED = "CHAT_USER_CONNECTED";
export const CHAT_TYPING = "CHAT_TYPING";
export const CHAT_FINISHED_TYPING = "CHAT_FINISHED_TYPING";
export const CHAT_MESSAGE = "CHAT_MESSAGE";
export const INPUT_ERROR = "INPUT_ERROR";
export const VIDEO_UPDATE_INFO = "VIDEO_UPDATE_INFO";

export const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
