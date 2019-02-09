import { combineReducers } from "redux";
import messages from "./messages";
import user from "./user";
import users from "./users";
import status from "./status";

const rootReducer = combineReducers({
  messages,
  user,
  users,
  status
});

export default rootReducer;
