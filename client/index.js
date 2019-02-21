import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { sendMessage, initSockets } from "./socket";
import { jwt } from "./middlewares/jwt";
import { readFromLocalStorage } from "./utils/auth";
import { initGoogleAPI } from "./utils/auth";
import Header from "./components/header";
import { initialState } from "./config";
import Main from "./components/main";

//  Initializing Google API
initGoogleAPI();

let store;

// Settings up store: with/without Redux DevTools
// https://github.com/zalmoxisus/redux-devtools-extension
if (
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
) {
  const myStore = composeWithDevTools(applyMiddleware(jwt, thunk.withExtraArgument(sendMessage)))(
    createStore
  );
  store = myStore(reducer, initialState);
} else {
  store = createStore(
    reducer,
    initialState,
    applyMiddleware(jwt, thunk.withExtraArgument(sendMessage))
  );
}

initSockets(store);

//  Checking local storage for JWT token and dispatching AUTH_SUCCESS action if token was found
const userData = readFromLocalStorage();
if (userData.token) {
  const { userId, userName } = userData;

  //  Sending chat message: [name] connected..
  sendMessage("CHAT_USER_CONNECTED", { userId, userName });

  store.dispatch({
    type: "LOGIN_SUCCESS",
    payload: userData
  });
}

const App = props => {
  return (
    <Provider store={store}>
      <Header />
      <Main />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
