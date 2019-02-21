import * as t from "../constants";
import { maxChatMessagesNum } from "../config";

export default function(state = {}, action) {
  const messagesNum = state.length;
  switch (action.type) {
    case t.CHAT_MESSAGE:
      return messagesNum > maxChatMessagesNum
        ? [...state.slice(1, messagesNum), action.payload]
        : [...state, action.payload];

    case t.CHAT_USER_CONNECTED:
      const sentDate = Date.now();
      return messagesNum > maxChatMessagesNum
        ? [...state.slice(1, messagesNum), { ...action.payload, text: "Connected", sentDate }]
        : [...state, { ...action.payload, text: "Connected", sentDate }];

    case t.CHAT_TYPING: {
      const { userId, userName } = action.payload;
      if (state.find(item => item.userId === userId && item.text === "is typing...")) {
        return state;
      }

      const isTypingMessage = {
        userId,
        userName,
        text: "is typing...",
        sentDate: Date.now()
      };

      return messagesNum > maxChatMessagesNum
        ? [...state.slice(1, messagesNum), isTypingMessage]
        : [...state, isTypingMessage];
    }

    case t.CHAT_FINISHED_TYPING: {
      const { userId } = action.payload;
      return state.filter(item =>
        item.text === "is typing..." ? (item.userId === userId ? false : true) : true
      );
    }

    default:
      return state;
  }
}
