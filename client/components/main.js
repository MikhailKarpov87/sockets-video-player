import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChatBox from "./chatbox";
import PlayerContainer from "./player";
import ChatToggle from "./chat_toggle";
import ErrorMessage from "./error";

const styles = {
  Paper: {
    minHeight: "80vh",
    padding: "5vh 10px 15vh 10px"
  },
  GridContainer: {
    justifyContent: "space-around"
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseChat: false
    };
  }

  render() {
    const { collapseChat } = this.state;

    return (
      <Paper style={styles.Paper}>
        <Grid container style={styles.GridContainer} spacing={24}>
          <Grid key="video" item xs={12} md={collapseChat ? 12 : 8}>
            <ChatToggle
              collapseChat={collapseChat}
              handleClick={() => this.setState({ collapseChat: !collapseChat })}
            />
            <PlayerContainer />
          </Grid>

          {!collapseChat && (
            <Grid key="chatbox" item xs={12} md={4}>
              <ChatBox />
            </Grid>
          )}
        </Grid>
        <ErrorMessage />
      </Paper>
    );
  }
}

export default Main;
