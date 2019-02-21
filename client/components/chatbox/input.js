import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Login from "../login";
import { sendMessage } from "../../socket";

const ChatInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

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
  static propTypes = {
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      inputMessage: ""
    };
    this.ChatInput = React.createRef();
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
    //  Focus should be set back to ChatInput component when submitted via button
    this.ChatInput.current.focus();
  }

  updateTypingStatus() {
    const { userId, userName } = this.props.user;

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(
      () => sendMessage("CHAT_FINISHED_TYPING", { userId, userName }),
      1500
    );

    _.debounce(() => sendMessage("CHAT_TYPING", { userId, userName }), 500, {
      leading: true,
      trailing: false
    })();
  }

  render() {
    const { inputMessage } = this.state;
    const { isAuth } = this.props.user;

    return isAuth ? (
      <ChatInput>
        <TextField
          label="Enter your message"
          margin="normal"
          inputRef={this.ChatInput}
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
    ) : (
      <ChatInput>
        <Login buttonColor="primary" loginMessage="You should log in to send messages" />
      </ChatInput>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ChatboxInput);
