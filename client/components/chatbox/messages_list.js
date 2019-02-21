import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Message from "./message";
import _ from "lodash";
import { getAvatarName, getMessageTime, colorize } from "../../utils/messages";

const MessagesWrapper = styled.div`
  overflow-y: scroll;
  min-height: 0px;
`;

class MessagesList extends PureComponent {
  static propTypes = {
    messages: PropTypes.array,
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string
    }),
    users: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.messagesList && this.props.messages.length !== prevProps.messages.length) {
      const node = this.messagesList.current;
      node.scrollTop = node.scrollHeight;
    }
  }

  componentDidMount() {
    const node = this.messagesList.current;
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const {
      messages,
      user: { userId },
      users
    } = this.props;

    return (
      <MessagesWrapper ref={this.messagesList} key="messages_list">
        {messages.map(message => {
          return (
            <Message
              text={message.text}
              messageTime={getMessageTime(message.sentDate)}
              key={message.sentDate + message.userId}
              avatarColor={
                users[message.userId] ? users[message.userId].avatarColor : colorize(message.userId)
              }
              isOwnMessage={userId && message.userId === userId}
              userName={message.userName}
              avatarName={
                users[message.userId]
                  ? users[message.userId].avatarName
                  : getAvatarName(message.userName)
              }
            />
          );
        })}
      </MessagesWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user,
    users: state.users
  };
}

export default connect(mapStateToProps)(MessagesList);
