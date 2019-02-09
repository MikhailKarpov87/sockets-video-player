import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import { API_URL } from "../constants";
import { loginSuccess } from "../actions";
import { readFromLocalStorage } from "../utils/auth";
import * as t from "../constants";

//  middleware для проверки и обновления JWT токена
export const jwt = store => next => action => {
  //  Проверяем, что есть google токен и что загрузился объект window.gapi.auth2
  const userData = readFromLocalStorage();
  if (userData.googleToken && window.gapi && window.gapi.hasOwnProperty("auth2")) {
    //  Для передачи в функцию loginSuccess и записи в state нужны userName и googleToken
    const { userName, googleToken } = userData;

    //  Берем из гугловского JWT значение exp и переводим в миллисекунды
    const googleExpire = jsonwebtoken.decode(googleToken).exp * 1000 || null;
    const now = new Date().getTime();

    //  Создаем инстанс с методами Google API
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    //  Проверяем что jwt.decode() вернул значение exp, сравниваем
    //  Если токен expired, запрашиваем и сохраняем новый. Если нет - передаем вызов дальше: next(action)
    //  https://developers.google.com/identity/sign-in/web/reference#googleuserreloadauthresponse
    return googleExpire && now > googleExpire
      ? GoogleAuth.currentUser
          .get()
          .reloadAuthResponse()
          .then(res => {
            const googleToken = res.id_token;
            return axios
              .post(`${API_URL}/auth/google`, { token: googleToken })
              .then(response => {
                const token = response.data.token;
                //  Получаем id пользователя из JWT токена
                const userId = jsonwebtoken.decode(token).id;
                store.dispatch(loginSuccess(token, googleToken, userName, userId));
                next(action);
              })
              .catch(err => store.dispatch({ type: t.LOGIN_FAILED, payload: err }));
          })
          .catch(err => store.dispatch({ type: t.LOGIN_FAILED, payload: err }))
      : next(action);
  } else {
    return next(action);
  }
};
