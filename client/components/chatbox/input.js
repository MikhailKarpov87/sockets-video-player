import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import { TextField } from "@material-ui/core";
import { sendMessage } from "../../socket";

const ChatInput = styled.div``;

const styles = {
  Fab: {
    padding: "0px 10px",
    margin: "16px 0 0 15px",
    backgroundColor: "#32ADFF"
  },
  Icon: {
    padding: "0px 5px"
  },
  TextField: {
    marginTop: "0px"
  }
};

class ChatboxInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMessage: ""
    };
  }

  onInputChange(e) {
    this.updateTypingStatus();
    this.setState({ inputMessage: e.target.value });
  }

  sendMessage(text) {
    const { userName, userId } = this.props.user;
    if (text && userName) {
      clearTimeout(this.typingTimeout);
      sendMessage("CHAT_FINISHED_TYPING", { userId, userName });
      sendMessage("CHAT_MESSAGE", { text, userName, userId });
    }

    this.setState({ inputMessage: "" });
  }

  updateTypingStatus() {
    const {
      status: { isTyping },
      user: { userId, userName }
    } = this.props;

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(
      () => sendMessage("CHAT_FINISHED_TYPING", { userId, userName }),
      1500
    );

    !isTyping[userId] &&
      _.debounce(() => sendMessage("CHAT_TYPING", { userId, userName }), 500, {
        leading: true,
        trailing: false
      })();
  }

  render() {
    const { inputMessage } = this.state;

    return (
      <ChatInput>
        <TextField
          label="Enter your message"
          margin="normal"
          value={inputMessage}
          style={styles.TextField}
          onKeyPress={e => e.key === "Enter" && this.sendMessage(inputMessage)}
          onChange={e => this.onInputChange(e)}
        />

        <Fab
          style={styles.Fab}
          variant="extended"
          size="small"
          color="primary"
          aria-label="Add"
          onClick={() => this.sendMessage(inputMessage)}
        >
          <SendIcon style={styles.Icon} />
        </Fab>
      </ChatInput>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    status: state.status
  };
};

export default connect(mapStateToProps)(ChatboxInput);
