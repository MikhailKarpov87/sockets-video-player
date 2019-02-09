import React, { memo } from "react";
import { Avatar, Typography, Tooltip } from "@material-ui/core";
import styled from "styled-components";

const styles = {
  Avatar: {
    width: "20px",
    height: "20px",
    fontSize: "0.75em",
    margin: "0 3px"
  }
};

const Message = props => {
  const { text, userName, avatarName, avatarColor, messageTime, isOwnMessage } = props;

  const MessageWrapper = styled.div`
    @keyframes fadein {
      from {
        opacity: 0.3;
      }
    }

    display: flex;
    animation: fadein 500ms ease-out;
    ${props =>
      props.isOwnMessage &&
      `flex-direction: row-reverse;
          background-color: #f3f3f3;
          border-radius: 6px;
          padding: 2px 0;`}
    font-size: 16px;
    justify-content: flex-start;
    align-items: center;
    margin: 2px;
    padding: 0 10px;
    opacity: 1;
    transition: opacity 2s linear;
  `;

  return (
    <MessageWrapper isOwnMessage={isOwnMessage}>
      <Tooltip title={userName + " at " + messageTime} key="avatar">
        <Avatar style={{ ...styles.Avatar, backgroundColor: avatarColor }}>{avatarName}</Avatar>
      </Tooltip>
      <Typography variant="body2" style={{ fontWeight: "100", width: "100%" }} key="text">
        {text}
      </Typography>
    </MessageWrapper>
  );
};

export default memo(Message);
