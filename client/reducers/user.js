import * as t from "../constants";

export default function(state = {}, action) {
  switch (action.type) {
    case t.LOGIN_SUCCESS:
      return { ...action.payload, isAuth: true };

    case t.LOGOUT_SUCCESS:
      return { userName: null, userId: null, token: null, googleToken: null, isAuth: false };

    default:
      return state;
  }
}
