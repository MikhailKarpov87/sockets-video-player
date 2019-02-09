import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChatBox from "./components/chatbox";
import Player from "./components/player";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { sendMessage, initSockets } from "./socket";
import { Paper, Grid } from "@material-ui/core";
import { jwt } from "./middlewares/jwt";
import { readFromLocalStorage } from "./utils/auth";
import { initGoogleAPI } from "./utils/auth";
import Login from "./components/login";
import { sampleMessages } from "./constants";

const initialState = {
  messages: sampleMessages,
  user: {
    userName: null,
    userId: null,
    token: null,
    googleToken: null,
    isAuth: false
  },
  users: {},
  status: {
    isTyping: {}
  }
};

//  Initializing Google API
initGoogleAPI();

let store;
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

//  Checking local storage for JWT token
//  Dispatch AUTH_SUCCESS if found
const userData = readFromLocalStorage();
if (userData.token) {
  const { userId, userName } = userData;

  sendMessage("CHAT_USER_CONNECTED", { userId, userName });

  store.dispatch({
    type: "LOGIN_SUCCESS",
    payload: userData
  });
}

const styles = {
  Paper: {
    height: "80vh",
    padding: "5vh 10vw"
  },
  GridContainer: {
    justifyContent: "center"
  }
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Paper style={styles.Paper}>
          <Login />
          <Grid container style={styles.GridContainer}>
            <Grid key="video" item>
              <Player />
            </Grid>

            <Grid key="chatbox" item>
              <ChatBox />
            </Grid>
          </Grid>
        </Paper>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
