export const API_URL = "http://localhost:5000/api/v1";

//  Коды/тексты ошибок для отображения
export const errors = [
  { en: "Title must not be empty", ru: "Заголовок не может быть пустым" },
  { en: "Content must not be empty", ru: "Контент не может быть пустым" },
  { en: "Bad news item ID", ru: "Новость не найдена" },
  { en: "No token provided", ru: "В запросе отсутствует токен" },
  { en: "Not authorized to view profile", ru: "Не авторизован для просмотра профайла" },
  { en: "Captcha is not passed", ru: "Не была передана Captcha" },
  { en: "Bad Google cliend ID", ru: "Неверный Google Client ID" },
  { en: "Error on server while verifying token", ru: "Ошибка на сервере при проверке токена" },
  { en: "Bad credentials", ru: "Неверные данные для входа" },
  { en: "News item not found", ru: "Новость не найдена" },
  {
    en: "Not authorized to edit this news item",
    ru: "Вы не авторизованы для редактирования этой новости"
  },
  {
    en: "Not authorized to delete this news item",
    ru: "Вы не авторизованы для удаления этой новости"
  },
  { en: "User not found", ru: "Пользователь не найден" },
  { en: "User already exists", ru: "Пользователь уже существует" },
  {
    en: "Password must contain at least 6 characters",
    ru: "Пароль должен быть минимум 6 символов"
  },
  { en: "Password must not be empty", ru: "Пароль не должен быть пустым" },
  { en: "Username must not be empty", ru: "Имя пользователя не должно быть пустым" },
  { en: "jwt expired", ru: "Токен авторизации устарел. Попробуйте войти еще раз" }
];

export const getErrorText = message => {
  const errorText = errors.find(error => error.en === message);
  return errorText ? errorText.ru : message;
};

//Actions types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const START_LOADING = "START_LOADING";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILED = "GET_NEWS_FAILED";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILED = "GET_POST_FAILED";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILED = "EDIT_POST_FAILED";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILED = "ADD_POST_FAILED";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILED = "DELETE_POST_FAILED";

export const sampleMessages = [
  {
    text: "very first message",
    sentDate: "2019-02-07T14:03:28.110Z",
    userName: "Test",
    userId: "bc7a6b3f1cbad"
  },
  { text: "second", sentDate: "2019-02-07T15:03:28.110Z", userName: "Test", userId: "testid" },
  {
    text: "safasf",
    sentDate: "2019-02-07T15:23:28.110Z",
    userName: "Test Karpov",
    userId: "a5cab9b75dbcd"
  },
  { text: "Test here", sentDate: "2019-02-07T15:33:28.110Z", userName: "Test N", userId: "testid" },
  {
    text: "sfddsf",
    sentDate: "2019-02-07T15:53:28.110Z",
    userName: "Grisha Tester",
    userId: "f74bcbfc45bca"
  },
  {
    text: "☀️ sdfdsfdsf",
    sentDate: "2019-02-07T15:55:28.110Z",
    userName: "Test Var",
    userId: "cabf346a67cb2ac"
  },
  {
    text: "another emoji 😼",
    sentDate: "2019-02-07T16:03:28.110Z",
    userName: "On Test",
    userId: "cbad884cda321"
  },
  { text: "ads", sentDate: "2019-02-07T16:13:28.110Z", userName: "Test", userId: "testid" },
  {
    text: "Its working",
    sentDate: "2019-02-07T16:23:28.110Z",
    userName: "Test",
    userId: "0000000000"
  },
  {
    text: "Another test",
    sentDate: "2019-02-07T16:33:28.110Z",
    userName: "Test",
    userId: "aaaaaaaaa"
  },
  {
    text: "Here we go",
    sentDate: "2019-02-07T17:01:28.110Z",
    userName: "Test",
    userId: "a4bcf67746acbfbac"
  },
  {
    text: "Ok then",
    sentDate: "2019-02-07T17:02:28.110Z",
    userName: "Test",
    userId: "43abcf6bca5bca"
  },
  {
    text: "sadfsdf",
    sentDate: "2019-02-07T17:03:28.110Z",
    userName: "Test",
    userId: "c7abdcdc7abdcad"
  },
  {
    text: "sadfsdf",
    sentDate: "2019-02-07T17:04:28.110Z",
    userName: "Test",
    userId: "0ac8d3ca4bcdc"
  },
  {
    text: "asdfsadf",
    sentDate: "2019-02-07T17:05:28.110Z",
    userName: "Test",
    userId: "25ca465cb7ccb8"
  },
  {
    text: "asdfsadf",
    sentDate: "2019-02-07T18:05:28.110Z",
    userName: "Test",
    userId: "c9ab768bca4bcf4b7"
  }
];
