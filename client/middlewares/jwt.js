import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import { API_URL } from "../config";
import { loginSuccess } from "../actions";
import { readFromLocalStorage } from "../utils/auth";
import * as t from "../constants";

//  middleware for checking and updating JWT token
export const jwt = store => next => action => {
  // At first checking existense of Google Token and if object widnow.gapi.auth2 has been loaded
  const userData = readFromLocalStorage();
  if (userData.googleToken && window.gapi && window.gapi.hasOwnProperty("auth2")) {
    const { userName, googleToken } = userData;

    //  Taking exp value from google JWT and transforming it to [ms]
    const googleExpire = jsonwebtoken.decode(googleToken).exp * 1000 || null;
    const now = new Date().getTime();

    //  Creating Google API instance with needed methods
    const GoogleAuth = window.gapi.auth2.getAuthInstance();

    //  Checking that jwt.decode() returned exp value and comparing it with previous exp
    //  If token has been expired: requesting and saving new one. Otherwise dispatching call to next()
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
                //  Getting user id from JWT token
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
