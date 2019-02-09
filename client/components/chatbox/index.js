import React from "react";
import styled from "styled-components";

import ChatboxInput from "./input";
import MessagesList from "./messages_list";

const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: flex-end;
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
