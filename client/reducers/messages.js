export default function(state = {}, action) {
  const messagesNum = state.length;
  switch (action.type) {
    case "CHAT_MESSAGE":
      return messagesNum > 50
        ? [...state.slice(1, messagesNum), action.payload]
        : [...state, action.payload];

    case "CHAT_USER_CONNECTED":
      const sentDate = Date.now();
      return messagesNum > 50
        ? [...state.slice(1, messagesNum), { ...action.payload, text: "Connected", sentDate }]
        : [...state, { ...action.payload, text: "Connected", sentDate }];

    default:
      return state;
  }
}
