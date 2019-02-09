import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Message from "./message";
import _ from "lodash";
import { getAvatarName, getMessageTime, colorize, isEmpty } from "../../utils/messages";

const MessagesWrapper = styled.div`
  overflow-y: scroll;
  min-height: 0px;
`;

class MessagesList extends PureComponent {
  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages.length !== prevProps.messages.length) {
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
      users,
      status: { isTyping }
    } = this.props;

    let messagesList = messages;

    //  If somebody is typing - add 'Typing' message to all messages
    if (!isEmpty(isTyping)) {
      const usersAreTyping = _.map(isTyping, (userIsTyping, userId) => {
        return {
          ...users[userId],
          text: "Typing...",
          isOwnMessage: false,
          sentDate: Date.now(),
          userId
        };
      });

      messagesList = messagesList.concat(usersAreTyping);
    }

    return (
      <MessagesWrapper ref={this.messagesList} key="test">
        {messagesList.map(message => {
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
    users: state.users,
    status: state.status
  };
}

export default connect(mapStateToProps)(MessagesList);
