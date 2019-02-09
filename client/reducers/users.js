import * as t from "../constants";
import { getAvatarName, colorize } from "../utils/messages";

export default function(state = {}, action) {
  switch (action.type) {
    case "CHAT_MESSAGE":
    case "CHAT_USER_CONNECTED":
    case "CHAT_TYPING":
      const { userId, userName } = action.payload;
      if (state[userId]) {
        return state;
      }
      const avatarColor = colorize(action.payload.userId);
      const avatarName = getAvatarName(userName);
      return { ...state, [userId]: { userName, avatarName, avatarColor } };

    default:
      return state;
  }
}
