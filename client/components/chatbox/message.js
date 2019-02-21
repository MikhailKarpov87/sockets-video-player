import React, { memo } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
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
      <Typography variant="body2" style={{ fontWeight: "100" }} key="text">
        {text}
      </Typography>
    </MessageWrapper>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  messageTime: PropTypes.string.isRequired,
  avatarColor: PropTypes.string.isRequired,
  isOwnMessage: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  avatarName: PropTypes.string.isRequired
};

export default memo(Message);
