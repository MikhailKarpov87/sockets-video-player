import React from "react";
import styled from "styled-components";
import ChatboxInput from "./input";
import MessagesList from "./messages_list";

const ChatBoxWrapper = styled.div`
  display: flex;
  justify-content: flex-center;
  flex-direction: column;
  height: 70vh;
  max-width: 360px;
`;

const ChatBox = props => {
  return (
    <ChatBoxWrapper>
      <MessagesList key="list" />
      <ChatboxInput key="input" />
    </ChatBoxWrapper>
  );
};

export default ChatBox;
