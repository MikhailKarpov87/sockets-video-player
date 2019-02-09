import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case "CHAT_TYPING":
      const {
        payload: { userId }
      } = action;

      if (state.isTyping[userId]) return state;
      return { ...state, isTyping: { ...state.isTyping, [userId]: { ...action.payload } } };

    case "CHAT_FINISHED_TYPING":
      const isTyping = _.pickBy(state.isTyping, (value, key) => key !== action.payload.userId);
      return { ...state, isTyping };

    default:
      return state;
  }
}
