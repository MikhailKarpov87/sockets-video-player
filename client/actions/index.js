import axios from "axios";
import { sendMessage } from "../socket";
import { readFromLocalStorage, writeToLocalStorage, clearLocalStorage } from "../utils/auth";
import * as t from "../constants";
import jwt from "jsonwebtoken";
import { API_URL } from "../config";
import { urlRegexp } from "../constants";

//  Getting JWT token from localStorage and setting it
//  as default header in Axios requests
axios.defaults.headers.common["x-access-token"] = readFromLocalStorage().token || null;

export function videoSeek(position, seconds, seeking) {
  const positionSeconds = Math.floor(seconds);
  return { type: t.VIDEO_SEEK, payload: { position, positionSeconds, seeking } };
}

export function updateVideoInfo({ duration }) {
  return { type: t.VIDEO_UPDATE_INFO, payload: { duration } };
}

export function updatePlayerURL(videoURL) {
  return dispatch => {
    if (videoURL.match(urlRegexp)) {
      sendMessage(t.VIDEO_INPUT_SUBMIT, { videoURL });
    } else {
      dispatch(inputError("Wrong Video URL"));
    }
  };
}

export function inputError(message) {
  return { type: t.INPUT_ERROR, payload: { message } };
}

function startLoading() {
  return { type: t.START_LOADING };
}

//  Sign In
export function signIn() {
  return dispatch => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    return GoogleAuth.signIn({ scope: "profile email" })
      .then(user => {
        const googleToken = user.getAuthResponse().id_token;
        const userName = user.getBasicProfile().getName();

        return axios
          .post(`${API_URL}/auth/google`, { token: googleToken })
          .then(response => {
            const token = response.data.token;
            //  Getting user id from JWT token
            const userId = jwt.decode(token).id;
            dispatch(loginSuccess(token, googleToken, userName, userId));
          })
          .catch(err => dispatch(loginFailed(err)));
      })
      .catch(err => dispatch(loginFailed(err)));
  };
}

export function loginSuccess(token, googleToken, userName, userId) {
  writeToLocalStorage(token, googleToken, userName, userId);
  sendMessage(t.CHAT_USER_CONNECTED, { userId, userName });
  axios.defaults.headers.common["x-access-token"] = token;

  return {
    type: t.LOGIN_SUCCESS,
    payload: { token, googleToken, userName, userId }
  };
}

function loginFailed(err) {
  return { type: t.LOGIN_FAILED, payload: err };
}

//  Sign Out
export function signOut() {
  return dispatch => {
    const GoogleAuth = window.gapi.auth2.getAuthInstance();
    return GoogleAuth.signOut()
      .then(res => dispatch(signoutSuccess()))
      .catch(err => dispatch(signoutFailed(err)));
  };
}

function signoutSuccess() {
  clearLocalStorage();
  return { type: t.LOGOUT_SUCCESS };
}

function signoutFailed(err) {
  return { type: t.LOGOUT_FAILED, payload: err };
}
