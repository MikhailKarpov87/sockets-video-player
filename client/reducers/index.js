import { combineReducers } from "redux";
import messages from "./messages";
import user from "./user";
import users from "./users";
import player from "./player";
import error from "./error";

const rootReducer = combineReducers({
  messages,
  user,
  users,
  player,
  error
});

export default rootReducer;
